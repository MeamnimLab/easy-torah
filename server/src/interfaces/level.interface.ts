import { ISubLevel } from "./subLevel.interface";

export interface ILevel {
    id: number;
    name: {title: string, description: string};
    subLevels: ISubLevel[];
    icon: {name: string, color: string};
    hasGame: boolean;
}