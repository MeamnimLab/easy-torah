import { createSlice } from "@reduxjs/toolkit";
import Trivia from "../models/games/trivia";
import trueFalse from "../models/games/trueFalse";
import TrueFalse from "../models/games/trueFalse";

const initialState = {
  games: [
    new Trivia(
      1,
      "trivia",
      1,
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1.1", comment: "comment 1" },
        { id: 2, answer: "answer 2.1", comment: "comment 2" },
        { id: 3, answer: "answer 3.1", comment: "comment 3" },
        { id: 4, answer: "answer 4.1", comment: "comment 4" },
      ]
    ),
    new Trivia(
      2,
      "trivia",
      1,
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1.2", comment: "comment 1" },
        { id: 2, answer: "answer 2.2", comment: "comment 2" },
        { id: 3, answer: "answer 3.2", comment: "comment 3" },
        { id: 4, answer: "answer 4.2", comment: "comment 4" },
      ]
    ),
    new Trivia(
      3,
      "trivia",
      1,
      "question A",
      1,
      [1],
      [
        { id: 1, answer: "answer 1.3", comment: "comment 1" },
        { id: 2, answer: "answer 2.3", comment: "comment 2" },
        { id: 3, answer: "answer 3.3", comment: "comment 3" },
        { id: 4, answer: "answer 4.3", comment: "comment 4" },
      ]
    ),
    new TrueFalse(4, 'trueFalse', 1, 'this is a true false question 1', true),
    new TrueFalse(5, 'trueFalse', 1, 'this is a true false question 2', true),
    new TrueFalse(6, 'trueFalse',1, 'this is a true false question 3', false),
  ]
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
