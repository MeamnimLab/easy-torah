import Game from "../game";

class TrueFalse extends Game {
    constructor(id, type, parentId, question, answer) {
        super(id, type, parentId);
        this.question = question;
        this.answer = answer;
    }
  }
  
  export default TrueFalse;