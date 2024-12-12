import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { IVocabulary } from "../interfaces/vocabulary.interface";
import { Game } from "./game.entity";
import { ILanguage } from "../interfaces/languageString.interface";
import {
  validateAndNormalizeLanguage,
  validateAndNormalizeVocabularyHardSentences,
} from "../utils/validation.util";
import { IHardSentences } from "../interfaces/hardSentences.interface";

@Entity("vocabulary_games")
export class VocabularyGame implements IVocabulary {
  constructor(game: Partial<VocabularyGame>) {
    Object.assign(this, game);
  }

  @PrimaryColumn()
  id!: number;

  @Column("jsonb")
  text!: ILanguage;

  @Column("jsonb")
  hardSentences!: IHardSentences;

  @ManyToOne(() => Game, (game) => game.vocabularyGames)
  @JoinColumn({ name: "gameId" })
  game!: Game;

  type!: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateAndNormalize() {
    this.text = validateAndNormalizeLanguage(this.text);
    this.hardSentences = validateAndNormalizeVocabularyHardSentences(
      this.hardSentences
    );
  }
}
