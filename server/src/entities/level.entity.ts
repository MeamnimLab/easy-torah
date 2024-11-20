import { Entity, Column, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { SubLevel } from './subLevel.entity';
import { ILevel } from '../interfaces/level.interface';
import { ILevelName } from '../interfaces/levelName.interface';
import { IIcon } from '../interfaces/icon.interface';
import { validateAndNormalizeLevelName } from '../utils/validation.util';

@Entity('levels')
export class Level implements ILevel {
    @PrimaryColumn()
    id!: number;

    @Column("jsonb")
    name!: ILevelName;

    @Column("jsonb", { default: { name: "help-outline", color: "default" } })
    icon!: IIcon;

    @Column({default: false})
    hasGame!: boolean;

    @OneToMany(() => SubLevel, (subLevel) => subLevel.level)
    subLevels!: SubLevel[];

    @BeforeInsert()
    @BeforeUpdate()
    validateAndNormalizeName() {
        this.name = validateAndNormalizeLevelName(this.name);
    }
}
