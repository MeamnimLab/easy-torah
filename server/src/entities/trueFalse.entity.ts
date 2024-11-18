import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ITrueFalse } from '../interfaces/trueFalse.interface';
import { Game } from './game.entity';

@Entity('true_false_games')
export class TrueFalseGame implements ITrueFalse {
    @PrimaryColumn()
    id!: number;
    
    @Column()
    question!: string;
    
    @Column()
    answer!: boolean;
    
    @ManyToOne(() => Game, (game) => game.trueFalseGames)
    @JoinColumn({ name: 'gameId' })
    game!: Game;

    type!: string;
}
