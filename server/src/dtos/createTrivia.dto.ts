import { ITrivia } from "../interfaces/trivia.interface";

export interface ICreateTriviaDto extends Pick<ITrivia, 'question' | 'answers' | 'correctAnswersIds'> {
}