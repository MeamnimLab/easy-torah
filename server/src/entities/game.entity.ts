import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SubLevel } from './subLevel.entity';
import { IGame } from '../interfaces/game.interface';
import { TrueFalseGame } from './trueFalse.entity';
import { TriviaGame } from './trivia.entity';
import { VocabularyGame } from './vocabulary.entity';

@Entity('games')
export class Game implements IGame {
    @PrimaryColumn()
    id!: number;

    @Column()
    type!: string;

    @ManyToOne(() => SubLevel, (subLevel) => subLevel.games)
    @JoinColumn({ name: 'subLevelId' })
    subLevel!: SubLevel;

    @OneToMany(() => TrueFalseGame, (trueFalseGames) => trueFalseGames.game)
    trueFalseGames!: TrueFalseGame[];

    @OneToMany(() => TriviaGame, (triviaGames) => triviaGames.game)
    triviaGames!: TriviaGame[];

    @OneToMany(() => VocabularyGame, (vocabularyGames) => vocabularyGames.game)
    vocabularyGames!: VocabularyGame[];

}
