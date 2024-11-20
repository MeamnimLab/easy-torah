import { ILanguage } from "./languageString.interface";
import { ISubLevel } from "./subLevel.interface";

export interface ILevel {
    id: number;
    name: {title: ILanguage, description: ILanguage};
    subLevels: ISubLevel[];
    icon: {name: string, color: string};
    hasGame: boolean;
}