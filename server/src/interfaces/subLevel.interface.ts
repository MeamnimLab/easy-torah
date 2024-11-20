import { IGame } from "./game.interface";
import { ILanguage } from "./languageString.interface";

export interface ISubLevel {
    id: number;
    name: ILanguage;
    hasGame: boolean;
    games: IGame[];
}