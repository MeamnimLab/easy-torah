import { IUser } from '../interfaces/user.interface';
import { Role } from '../enums/role.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import UserProgress from './userProgress.entity';
import UserSubLevelProgress from './userSubLevelProgress.entity';

@Entity()
@Unique(['username'])
export default class User implements IUser {
  constructor(userData: Partial<User>) {
    Object.assign(this, userData);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  role!: Role;


  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date | undefined) => (value ? value.toISOString() : value),
      from: (value: string) => value
    }
  })
  createdAt!: string;

  @OneToMany(() => UserProgress, (userProgress) => userProgress.level)
  levelProgress!: UserProgress[];

  @OneToMany(() => UserSubLevelProgress, (userProgress) => userProgress.subLevel)
  subLevelProgress!: UserSubLevelProgress[];
}
