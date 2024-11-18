import { IGame } from "./game.interface";
import { IHardSentence } from "./hardSentence.interface";

export interface IVocabulary extends IGame {
    text: string;
    hardSentences: IHardSentence[]
}