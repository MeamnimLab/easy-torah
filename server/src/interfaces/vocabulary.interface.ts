import { IGame } from "./game.interface";
import { IHardSentence } from "./hardSentence.interface";
import { ILanguage } from "./languageString.interface";

export interface IVocabulary extends IGame {
    text: ILanguage;
    hardSentences: IHardSentence[]
}