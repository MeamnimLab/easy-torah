class Level {
    constructor(id, level, name,icon, hasGame = false) {
        this.id = id;
        this.level = level;
        this.name = name;
        this.icon = icon
        this.hasGame = hasGame;
    }
  }
  
  export default Level;