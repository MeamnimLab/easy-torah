import { IHardSentences } from "../interfaces/hardSentences.interface";
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
 * Validates and normalizes an IHardSentences object.
 * The function ensures that the input matches one of the allowed formats:
 * { he: [] }, { en: [] }, or { en: [], he: [] }.
 * Each array can either be empty or contain objects with specific properties.
 *
 * @param value - The input value to validate and normalize.
 * @returns A normalized IHardSentences object.
 * @throws Error if the input does not match the required format.
 */
export function validateAndNormalizeVocabularyHardSentences(value: any): IHardSentences {
  if (!value || typeof value !== "object") {
    throw new Error(
      "Invalid IHardSentences format. Expected an object with `he` and/or `en` properties."
    );
  }

  const allowedKeys = ["he", "en"];
  const keys = Object.keys(value);

  // Validate that the object contains only allowed keys.
  if (!keys.every((key) => allowedKeys.includes(key))) {
    throw new Error("Invalid keys in IHardSentences object. Only `he` and/or `en` are allowed.");
  }

  // Function to validate an array of hard sentence objects.
  const validateSentenceArray = (arr: any): void => {
    if (!Array.isArray(arr)) {
      throw new Error("Each `he` or `en` property must be an array.");
    }

    arr.forEach((item, index) => {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.sentence !== "string" ||
        typeof item.start !== "number" ||
        typeof item.end !== "number" ||
        typeof item.explanation !== "string"
      ) {
        throw new Error(
          `Invalid hard sentence object at index ${index}. Expected an object with sentence (string), start (number), end (number), and explanation (string).`
        );
      }

      if (item.start < 0 || item.end < item.start) {
        throw new Error(
          `Invalid start or end values in hard sentence at index ${index}. Ensure start >= 0 and end >= start.`
        );
      }
    });
  };

  const he = value.he || value.en;
  const en = value.en || value.he;

  validateSentenceArray(he);
  validateSentenceArray(en);

  return { he, en };
}
