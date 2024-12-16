import { IGame } from "./game.interface";
import { ILanguage } from "./languageString.interface";

export interface ISubLevel {
    id: number;
    name: {title: ILanguage, description: ILanguage};
    icon: {name: string, color: string};
    hasGame: boolean;
    games: IGame[];
}