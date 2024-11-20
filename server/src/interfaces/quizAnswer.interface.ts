import { ILanguage } from "./languageString.interface";

export interface IQuizAnswer {
    id: number;
    answer: ILanguage;
    description: ILanguage;
}