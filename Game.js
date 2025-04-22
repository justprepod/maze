class Game {
    constructor(closeOnFinish) {
      this.controller = new Controller();
      this.gui = new GUI();
      this.totalLevels = 3;
      this.currentLevel = 1;
      this.closeOnFinish = closeOnFinish;
    }
  
    start() {
      this.puzzles = puzzle_list.sort(() => 0.5 - Math.random() ).slice(0, this.totalLevels);
      console.log(this.puzzles);
      //this.gui.showCinematics('assets/intro.mp4', this.startGame.bind(this));
      this.gui.showCinematics({slides:[
        {image:'assets/intro1.jpg', delay:8},
        {image:'assets/intro2.jpg', delay:8},
        {image:'assets/intro3.jpg', delay:8},
      ], sound: 'assets/intro.mp3'}, this.startGame.bind(this));
    }
  
    startGame() {
        document.addEventListener('keydown', this.controller.handleEvent.bind(this.controller), false);
        document.addEventListener('keyup', this.controller.handleEvent.bind(this.controller), false);
        this.gui.hideCinematics();
        this.generatePuzzleAndMaze();
    }
  
    generatePuzzleAndMaze() {
      const word = this.puzzles[this.currentLevel - 1];
      const puzzle = new Puzzle(word.toUpperCase(), this.gui, `puzzles/${word}.jpg`);
      const maze = new Maze(21, 21, this.gui, puzzle);

      puzzle.onCompleted(this.levelCompleted.bind(this));
      puzzle.onFailed(this.levelFailed.bind(this));

      this.controller.subscribe(maze);

      this.gui.updateProgressBar(this.currentLevel , this.totalLevels);
    }
  
    levelCompleted() {
      if (this.currentLevel < this.totalLevels) {
        this.controller.subscribe();
        //this.gui.showCinematics('assets/transition.mp4', this.nextLevel.bind(this));
        this.gui.showCinematics({slides:[
          {image:'assets/transition1.jpg', delay:8},
        ], sound: 'assets/transition.mp3'}, this.nextLevel.bind(this));
      } else {
        //this.gui.showCinematics('assets/outro.mp4', this.gameCompleted.bind(this));
        this.gui.showCinematics({slides:[
          {image:'assets/outro1.jpg', delay:8},
          {image:'assets/outro2.jpg', delay:8},
        ], sound: 'assets/outro.mp3'}, this.gameCompleted.bind(this));
      }
    }
  
    nextLevel() {
      this.gui.hideCinematics();
      this.currentLevel++;
      this.generatePuzzleAndMaze();
    }
  
    levelFailed() {
      this.gui.showCinematics('assets/loss.mp4', this.gameOver.bind(this));
    }
  
    gameOver() {
      this.controller.subscribe();
      console.log('over')
    }

    gameCompleted() {
      //this.controller.subscribe();
      console.log('completed')
      this.gui.showCredits(this.closeOnFinish);
      //window.location.reload();
    }
}
  