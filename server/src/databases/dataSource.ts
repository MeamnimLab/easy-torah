import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";

import { dbConfig } from "../configs/dbConfig";


const { host, user, password, database, ssl, port } = dbConfig;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: parseInt(port || "5432"),
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  ssl: ssl,
  entities: [path.join(__dirname, "../entities/*.entity{.ts,.js}")],
  migrations: [],
  subscribers: [],
});
