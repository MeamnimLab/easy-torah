import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { ITrueFalse } from "../interfaces/trueFalse.interface";
import { Game } from "./game.entity";
import { ILanguage } from "../interfaces/languageString.interface";
import { validateAndNormalizeLanguage } from "../utils/validation.util";

@Entity("true_false_games")
export class TrueFalseGame implements ITrueFalse {
  constructor(game: Partial<TrueFalseGame>) {
    Object.assign(this, game);
  }

  @PrimaryColumn()
  id!: number;

  @Column("jsonb")
  question!: ILanguage;

  @Column()
  answer!: boolean;

  @ManyToOne(() => Game, (game) => game.trueFalseGames)
  @JoinColumn({ name: "gameId" })
  game!: Game;

  type!: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateAndNormalizeQuestion() {
    this.question = validateAndNormalizeLanguage(this.question);
  }
}
