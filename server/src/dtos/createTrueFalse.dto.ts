import { ITrueFalse } from "../interfaces/trueFalse.interface";

export interface ICreateTrueFalseDto extends Pick<ITrueFalse, 'question' | 'answer'> {
}