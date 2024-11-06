import { createSlice } from "@reduxjs/toolkit";
import Trivia from "../models/games/trivia";
import trueFalse from "../models/games/trueFalse";
import TrueFalse from "../models/games/trueFalse";

const initialState = {
  games: [
    new Trivia(
      1,
      "trivia",
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1", comment: "comment 1" },
        { id: 2, answer: "answer 2", comment: "comment 2" },
        { id: 3, answer: "answer 3", comment: "comment 3" },
        { id: 4, answer: "answer 4", comment: "comment 4" },
      ]
    ),
    new Trivia(
      2,
      "trivia",
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1", comment: "comment 1" },
        { id: 2, answer: "answer 2", comment: "comment 2" },
        { id: 3, answer: "answer 3", comment: "comment 3" },
        { id: 4, answer: "answer 4", comment: "comment 4" },
      ]
    ),
    new Trivia(
      3,
      "trivia",
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1", comment: "comment 1" },
        { id: 2, answer: "answer 2", comment: "comment 2" },
        { id: 3, answer: "answer 3", comment: "comment 3" },
        { id: 4, answer: "answer 4", comment: "comment 4" },
      ]
    ),
    new TrueFalse(4, 'trueFalse', 'this is a true false question 1', true),
    new TrueFalse(5, 'trueFalse', 'this is a true false question 2', true),
    new TrueFalse(6, 'trueFalse', 'this is a true false question 3', false),
  ]
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
