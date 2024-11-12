import Game from "../game";

class Vocabulary extends Game {
  constructor(id, type, parentId, text, hardSentences) {
    super(id, type, parentId);
    this.text = text;
    this.hardSentences = hardSentences;
  }
}

export default Vocabulary;
