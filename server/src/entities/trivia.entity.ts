import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ITrivia } from '../interfaces/trivia.interface';
import { IQuizAnswer } from '../interfaces/quizAnswer.interface';
import { Game } from './game.entity';

@Entity('trivia_games')
export class TriviaGame implements ITrivia {
    @PrimaryColumn()
    id!: number;
    
    @Column()
    question!: string;
    
    @Column('int', { array: true })
    correctAnswersIds!: number[];
    
    @Column('jsonb')
    answers!: IQuizAnswer[];
    
    @ManyToOne(() => Game, (game) => game.triviaGames)
    @JoinColumn({ name: 'gameId' })
    game!: Game;

    type!: string;
}
