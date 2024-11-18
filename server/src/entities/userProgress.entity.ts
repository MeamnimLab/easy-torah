import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IUserProgress } from "../interfaces/userProgress.interface";
import { Level } from "./level.entity";
import User from "./user.entity";
import UserSubLevelProgress from "./userSubLevelProgress.entity";

@Entity()
export default class UserProgress implements IUserProgress {
  constructor(userProgressData: Partial<UserProgress>) {
    Object.assign(this, userProgressData);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  completed!: boolean;

  @Column()
  score!: number;

  @Column()
  subLevelsCompleted!: number;

  @ManyToOne(() => Level)
  @JoinColumn({ name: "levelId" })
  level!: Level;

  @ManyToOne(() => User, (user) => user.levelProgress)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => UserSubLevelProgress, (subLevelProgress) => subLevelProgress.levelProgress)
  subLevelsProgress!: UserSubLevelProgress[];
}
