import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { SubLevel } from './subLevel.entity';
import { ILevel } from '../interfaces/level.interface';

@Entity('levels')
export class Level implements ILevel {
    @PrimaryColumn()
    id!: number;

    @Column("jsonb")
    name!: {title: string, description: string};

    @Column("jsonb", { default: { name: "help-outline", color: "default" } })
    icon!: { name: string; color: string };

    @Column({default: false})
    hasGame!: boolean;

    @OneToMany(() => SubLevel, (subLevel) => subLevel.level)
    subLevels!: SubLevel[];
}
