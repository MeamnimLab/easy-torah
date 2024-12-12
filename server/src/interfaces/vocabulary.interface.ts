import { IGame } from "./game.interface";
import { IHardSentences } from "./hardSentences.interface";
import { ILanguage } from "./languageString.interface";

export interface IVocabulary extends IGame {
    text: ILanguage;
    hardSentences: IHardSentences
}