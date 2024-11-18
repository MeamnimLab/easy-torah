import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";
import { SubLevel } from "./subLevel.entity";
import UserProgress from "./userProgress.entity";

@Entity()
export default class UserSubLevelProgress {
  constructor(userSubLevelProgressData: Partial<UserSubLevelProgress>) {
    Object.assign(this, userSubLevelProgressData);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  completed!: boolean;

  @Column()
  score!: number;

  @ManyToOne(() => SubLevel)
  @JoinColumn({ name: "subLevelId" })
  subLevel!: SubLevel;

  @ManyToOne(() => User, (user) => user.subLevelProgress)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => UserProgress, (userProgress) => userProgress.subLevelsProgress)
  @JoinColumn({ name: "levelProgressId" })
  levelProgress!: UserProgress;
}
