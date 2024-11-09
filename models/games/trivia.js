import Game from "../game";

class Trivia extends Game {
    constructor(id, type, parentId, question, answersAmount, correctAnswersIds, answers) {
        super(id, type, parentId);
        this.question = question;
        this.answersAmount = answersAmount;
        this.correctAnswersIds = correctAnswersIds;
        this.answers = answers
    }
  }
  
  export default Trivia;