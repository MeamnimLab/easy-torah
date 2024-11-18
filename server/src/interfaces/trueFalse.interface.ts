import { IGame } from "./game.interface";

export interface ITrueFalse extends IGame {
    question: string;
    answer: boolean;
}