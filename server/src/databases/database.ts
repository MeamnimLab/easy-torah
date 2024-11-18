import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { dbConfig } from '../configs/dbConfig';
import path from "path";
import fs from "fs/promises";
import User from "../entities/user.entity";
import { TriviaGame } from "../entities/trivia.entity";
import { Level } from "../entities/level.entity";
import { SubLevel } from "../entities/subLevel.entity";
import { Game } from "../entities/game.entity";
import { TrueFalseGame } from "../entities/trueFalse.entity";
import { VocabularyGame } from "../entities/vocabulary.entity";
import UserProgress from "../entities/userProgress.entity";
import UserSubLevelProgress from "../entities/userSubLevelProgress.entity";

export class Database {
  private static instance: Database;
  public dataSource: DataSource | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(synchronize: boolean = true): Promise<void> {
    if (this.dataSource) {
      return;
    }

    const { host, user, password, database, ssl } = dbConfig;

    this.dataSource = new DataSource({
      type: "postgres",
      host: host,
      port: 6543,
      username: user,
      password: password,
      database: database,
      synchronize: synchronize,
      logging: false,
      ssl: ssl,
      entities: [path.join(__dirname, "../entities/*.entity{.ts,.js}")],
      migrations: [],
      subscribers: [],
    });

    await this.initializeConnection();
  }

  private async initializeConnection(): Promise<void> {
    try {
      await this.dataSource!.initialize();
      console.log("🛠️ Database connected successfully!");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw new Error(`Database connection failed`);
    }
  }

  public async getRepository<T extends ObjectLiteral>(
    entityClass: EntityTarget<T>
  ): Promise<Repository<T>> {
    if (!this.dataSource) {
      await this.connect();
    }
    return this.dataSource!.getRepository(entityClass);
  }

  public async getManager(): Promise<EntityManager> {
    if (!this.dataSource) {
      await this.connect();
    }
    return this.dataSource!.manager;
  }

  public async deleteAllTables(): Promise<void> {
    await await (await Database.getInstance())
      .connect(false)
      .then(async (c) => {
        try {
          // Get all table names in the public schema
          const tables = await this.dataSource!.query(`
            SELECT tablename FROM pg_tables 
            WHERE schemaname = 'public' AND tablename != 'typeorm_metadata'
          `);

          // Drop all tables
          for (const { tablename } of tables) {
            await this.dataSource!.query(
              `DROP TABLE IF EXISTS "${tablename}" CASCADE`
            );
            console.log(`Table "${tablename}" dropped.`);
          }

          console.log("All tables dropped successfully.");
        } catch (error) {
          console.error("Error dropping tables:", error);
          throw new Error("Failed to drop tables");
        }
      });
  }

  public async initializeData(): Promise<void> {
    await this.deleteAllTables();
    await this.dataSource!.synchronize();
    await (await Database.getInstance()).connect().then(async (c) => {
      await this.addData("user", User);
      await this.addData("level", Level);
      await this.addData("subLevel", SubLevel);
      await this.addData("game", Game);
      await this.addData("trivia", TriviaGame);
      await this.addData("trueFalse", TrueFalseGame);
      await this.addData("vocabulary", VocabularyGame);
      // await this.addData("userProgress", UserProgress);
      // await this.addData("userSubLevelProgress", UserSubLevelProgress);
    });

    console.log("All data initalize successfully.");
  }

  private async addData<T extends ObjectLiteral>(
    name: string,
    entity: EntityTarget<T>
  ) {
    const filePath: string = path.join(__dirname, `../data/${name}.data.json`);
    const fileData: string = await fs.readFile(filePath, "utf-8");
    const records: any[] = JSON.parse(fileData);
    if (name === "subLevel") {
      const levelRepository: Repository<Level> = this.dataSource!.getRepository(Level);
      for (const subLevel of records) {
        subLevel.level = await levelRepository.findOneBy({
          id: subLevel.levelId,
        });
      }
    } else if (name === "game") {
      const subLevelRepository: Repository<SubLevel> = this.dataSource!.getRepository(SubLevel);
      for (const game of records) {
        game.subLevel = await subLevelRepository.findOneBy({
          id: game.subLevelId,
        });
      }
    } else if (name === "trivia" || name === 'trueFalse' || name === 'vocabulary') {
      const gameRepository: Repository<Game> = this.dataSource!.getRepository(Game);
      for (const gameData of records) {
        gameData.game = await gameRepository.findOneBy({
          id: gameData.gameId,
        });
      }
    } else if (name === "userProgress") {
      const levelRepository: Repository<Level> = this.dataSource!.getRepository(Level);
      const userRepository: Repository<User> = this.dataSource!.getRepository(User);
      for (const userProgress of records) {
        userProgress.level = await levelRepository.findOneBy({
          id: userProgress.levelId,
        });
        userProgress.user = await userRepository.findOneBy({
          id: userProgress.userId,
        });
      }
    } else if (name === "userSubLevelProgress") {
      const subLevelRepository: Repository<SubLevel> = this.dataSource!.getRepository(SubLevel);
      const userRepository: Repository<User> = this.dataSource!.getRepository(User);
      const userProgressRepository: Repository<UserProgress> = this.dataSource!.getRepository(UserProgress);
      for (const userProgress of records) {
        userProgress.subLevel = await subLevelRepository.findOneBy({
          id: userProgress.subLevelId,
        });
        userProgress.user = await userRepository.findOneBy({
          id: userProgress.userId,
        });
        userProgress.levelProgress = await userProgressRepository.findOneBy({
          id: userProgress.levelProgressId,
        });
      }
    }

    await this.dataSource!.manager.createQueryBuilder()
      .insert()
      .into(entity)
      .values(records)
      .execute();
  }
}
