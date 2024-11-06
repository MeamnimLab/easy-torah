import Game from "../game";

class Trivia extends Game {
    constructor(id, type, question, answersAmount, correctAnswersIds, answers) {
        super(id, type);
        this.question = question;
        this.answersAmount = answersAmount;
        this.correctAnswersIds = correctAnswersIds;
        this.answers = answers
    }
  }
  
  export default Trivia;