import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { ITrivia } from "../interfaces/trivia.interface";
import { IQuizAnswer } from "../interfaces/quizAnswer.interface";
import { Game } from "./game.entity";
import { ILanguage } from "../interfaces/languageString.interface";
import {
  validateAndNormalizeLanguage,
  validateAndNormalizeTriviaAnswers,
} from "../utils/validation.util";

@Entity("trivia_games")
export class TriviaGame implements ITrivia {
  constructor(game: Partial<TriviaGame>) {
    Object.assign(this, game);
  }
  
  @PrimaryColumn()
  id!: number;

  @Column("jsonb")
  question!: ILanguage;

  @Column("int", { array: true })
  correctAnswersIds!: number[];

  @Column("jsonb")
  answers!: IQuizAnswer[];

  @ManyToOne(() => Game, (game) => game.triviaGames)
  @JoinColumn({ name: "gameId" })
  game!: Game;

  type!: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateAndNormalize() {
    this.question = validateAndNormalizeLanguage(this.question);
    this.answers = validateAndNormalizeTriviaAnswers(this.answers);
  }
}
