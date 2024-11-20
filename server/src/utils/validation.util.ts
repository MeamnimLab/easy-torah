import { IHardSentence } from "../interfaces/hardSentence.interface";
import { ILanguage } from "../interfaces/languageString.interface";
import { ILevelName } from "../interfaces/levelName.interface";
import { IQuizAnswer } from "../interfaces/quizAnswer.interface";

/**
 * Validates and normalizes an ILanguage object.
 * @param value - The input value to validate and normalize.
 * @returns A normalized ILanguage object.
 */
export function validateAndNormalizeLanguage(value: any): ILanguage {
  if (typeof value === "string") {
    return { he: value, en: value };
  }

  if (typeof value === "object" && value !== null) {
    const he = value.he || value.en || "";
    const en = value.en || value.he || "";
    if (typeof he === "string" && typeof en === "string") {
      return { he, en };
    }
  }

  throw new Error(
    "Invalid ILanguage format. Expected string or object with valid `he` and/or `en` properties."
  );
}

/**
 * Validates and normalizes an ILevelName object.
 * @param value - The input value to validate and normalize.
 * @returns A normalized ILevelName object.
 */
export function validateAndNormalizeLevelName(value: any): ILevelName {
  if (!value || typeof value !== "object") {
    throw new Error(
      "Invalid ILevelName format. Expected an object with `title` and `description` properties."
    );
  }

  if (!("title" in value) || !("description" in value)) {
    throw new Error(
      "ILevelName must have `title` and `description` properties."
    );
  }

  return {
    title: validateAndNormalizeLanguage(value.title),
    description: validateAndNormalizeLanguage(value.description),
  };
}

/**
 * Validates and normalizes an IQuizAnswer[] object.
 * @param value - The input value to validate and normalize.
 * @returns A normalized IQuizAnswer[] object.
 */
export function validateAndNormalizeTriviaAnswers(value: any): IQuizAnswer[] {
  if (!Array.isArray(value)) {
    throw new Error(
      "Invalid IQuizAnswer[] format. Expected an array of IQuizAnswer objects."
    );
  }

  return value.map((answer: any) => {
    if (!answer || typeof answer !== "object") {
      throw new Error("Each IQuizAnswer must be an object.");
    }

    const { id, answer: answerText, description } = answer;

    if (typeof id !== "number") {
      throw new Error("IQuizAnswer must have a valid `id` of type number.");
    }

    if (!answerText) {
      throw new Error(
        "Each IQuizAnswer must have a valid `answer` of type ILanguage object."
      );
    }

    if (!description) {
      throw new Error(
        "Each IQuizAnswer must have a valid `description` of type ILanguage object."
      );
    }

    return {
      id,
      answer: validateAndNormalizeLanguage(answerText),
      description: validateAndNormalizeLanguage(description),
    };
  });
}

/**
 * Validates and normalizes an IHardSentence[] object.
 * @param value - The input value to validate and normalize.
 * @returns A normalized IHardSentence[] object.
 */
export function validateAndNormalizeVocabularyHardSentences(value: any): IHardSentence[] {
  if (!Array.isArray(value)) {
    throw new Error(
      "Invalid IHardSentence[] format. Expected an array of IHardSentence objects."
    );
  }

  return value.map((hardSentence: any) => {
    if (!hardSentence || typeof hardSentence !== "object") {
      throw new Error("Each IHardSentence must be an object.");
    }

    const { id, sentence, explanation } = hardSentence;

    if (typeof id !== "number") {
      throw new Error("IHardSentence must have a valid `id` of type number.");
    }

    if (!sentence) {
      throw new Error(
        "Each IHardSentence must have a valid `sentence` of type ILanguage object."
      );
    }

    if (!explanation) {
      throw new Error(
        "Each IHardSentence must have a valid `explanation` of type ILanguage object."
      );
    }

    return {
      id,
      sentence: validateAndNormalizeLanguage(sentence),
      explanation: validateAndNormalizeLanguage(explanation),
    };
  });
}