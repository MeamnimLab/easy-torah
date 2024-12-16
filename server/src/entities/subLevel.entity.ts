import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Level } from './level.entity';
import { Game } from './game.entity';
import { ISubLevel } from '../interfaces/subLevel.interface';
import { validateAndNormalizeLevelName } from '../utils/validation.util';
import { ILevelName } from '../interfaces/levelName.interface';
import { IIcon } from '../interfaces/icon.interface';


@Entity('sub_levels')
export class SubLevel implements ISubLevel {

    @PrimaryColumn()
    id!: number;

    @Column("jsonb")
    name!: ILevelName;

    @Column("jsonb", { default: { name: "help-outline", color: "default" } })
    icon!: IIcon;

    @Column({default: false})
    hasGame!: boolean;

    @ManyToOne(() => Level, (level) => level.subLevels)
    @JoinColumn({ name: 'levelId' })
    level!: Level;

    @OneToMany(() => Game, (game) => game.subLevel) 
    games!: Game[];

    @BeforeInsert()
    @BeforeUpdate()
    validateAndNormalizeName() {
        this.name = validateAndNormalizeLevelName(this.name);
    }
}
