import { IGame } from "./game.interface";

export interface ISubLevel {
    id: number;
    name: string;
    hasGame: boolean;
    games: IGame[];
}