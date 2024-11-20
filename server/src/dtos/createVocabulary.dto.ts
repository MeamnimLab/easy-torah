import { IVocabulary } from "../interfaces/vocabulary.interface";

export interface ICreateVocabularyDto extends Pick<IVocabulary, 'text' | 'hardSentences'> {
}