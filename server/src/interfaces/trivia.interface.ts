import { IGame } from "./game.interface";
import { ILanguage } from "./languageString.interface";
import { IQuizAnswer } from "./quizAnswer.interface";

export interface ITrivia extends IGame {
    question: ILanguage;
    correctAnswersIds: number[];
    answers: IQuizAnswer[];
}