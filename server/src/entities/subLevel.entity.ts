import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Level } from './level.entity';
import { Game } from './game.entity';
import { ISubLevel } from '../interfaces/subLevel.interface';
import { ILanguage } from '../interfaces/languageString.interface';
import { validateAndNormalizeLanguage } from '../utils/validation.util';


@Entity('sub_levels')
export class SubLevel implements ISubLevel {

    @PrimaryColumn()
    id!: number;

    @Column("jsonb")
    name!: ILanguage;

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
        this.name = validateAndNormalizeLanguage(this.name);
    }
}
