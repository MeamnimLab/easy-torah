import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Level } from './level.entity';
import { Game } from './game.entity';
import { ISubLevel } from '../interfaces/subLevel.interface';


@Entity('sub_levels')
export class SubLevel implements ISubLevel {

    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({default: false})
    hasGame!: boolean;

    @ManyToOne(() => Level, (level) => level.subLevels)
    @JoinColumn({ name: 'levelId' })
    level!: Level;

    @OneToMany(() => Game, (game) => game.subLevel) 
    games!: Game[];
}
