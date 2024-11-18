import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IVocabulary } from "../interfaces/vocabulary.interface";
import { Game } from "./game.entity";
import { IHardSentence } from "../interfaces/hardSentence.interface";

@Entity('vocabulary_games')
export class VocabularyGame implements IVocabulary {
    @PrimaryColumn()
    id!: number;
    
    @Column("text")
    text!: string;
  
    @Column("jsonb")
    hardSentences!: IHardSentence[];
    
    @ManyToOne(() => Game, (game) => game.vocabularyGames)
    @JoinColumn({ name: 'gameId' })
    game!: Game;

    type!: string;
}
