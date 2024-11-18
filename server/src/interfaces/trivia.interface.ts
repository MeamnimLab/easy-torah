import { IGame } from "./game.interface";
import { IQuizAnswer } from "./quizAnswer.interface";

export interface ITrivia extends IGame {
    question: string;
    correctAnswersIds: number[];
    answers: IQuizAnswer[];
}