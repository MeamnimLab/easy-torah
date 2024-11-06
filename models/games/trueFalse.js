import Game from "../game";

class TrueFalse extends Game {
    constructor(id, type, question, answer) {
        super(id, type);
        this.question = question;
        this.answer = answer;
    }
  }
  
  export default TrueFalse;