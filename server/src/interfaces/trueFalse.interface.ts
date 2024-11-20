import { IGame } from "./game.interface";
import { ILanguage } from "./languageString.interface";

export interface ITrueFalse extends IGame {
    question: ILanguage;
    answer: boolean;
}