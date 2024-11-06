// // triviaSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   score: 0,
//   currentQuestion: -1,
//   data: [
//     {
//       question: "What is my Name?",
//       answers: [
//         { id: 1, answer: "Rivky", isValid: true, comment: "good job!" },
//         { id: 2, answer: "Racheli", isValid: false, comment: "Wrong answer! she is my sister" },
//         { id: 3, answer: "Daniel", isValid: false, comment: "Wrong answer! He is my oldest brother" },
//         { id: 4, answer: "Zevi", isValid: false, comment: "Wrong answer! He is my brother" },
//       ],
//     },
//     {
//       question: "What is my age?",
//       answers: [
//         { id: 1, answer: "23", isValid: true, comment: "good job!" },
//         { id: 2, answer: "22", isValid: false, comment: "Wrong answer!" },
//         { id: 3, answer: "21", isValid: false, comment: "Wrong answer!" },
//         { id: 4, answer: "24", isValid: false, comment: "Wrong answer!" },
//       ],
//     },
//     {
//       question: "Where do I live?",
//       answers: [
//         { id: 1, answer: "Beit Hilkia", isValid: true, comment: "good job!" },
//         { id: 2, answer: "Jerusalem", isValid: false, comment: "Wrong answer!" },
//         { id: 3, answer: "Netivot", isValid: false, comment: "Wrong answer!" },
//         { id: 4, answer: "Tzrifin", isValid: false, comment: "Wrong answer!" },
//       ],
//     },
//   ],
// };

// const triviaSlice = createSlice({
//   name: "trivia",
//   initialState,
//   reducers: {
//     increaseScore: (state) => {
//       state.score += 1;
//     },
//     nextQuestion: (state) => {
//       if (state.currentQuestion < state.data.length - 1) {
//         state.currentQuestion += 1;
//       } else {
//         state.currentQuestion = -1;
//       }
//     },
//   },
// });

// export const { increaseScore, nextQuestion } = triviaSlice.actions;
// export default triviaSlice.reducer;
