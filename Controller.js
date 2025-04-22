class Controller {
    constructor(maze) {
        this.maze = maze;
        this.keyPressed = {};
    }

    subscribe(_maze) {
        this.maze = _maze;
    }

    /**
     * Handles keyboard events
     */
    handleEvent(event) {
        if (!this.maze)
            return;

        if (event.type === 'keydown') {
            if (this.keyPressed[event.key]) {
                return;
            }
            this.keyPressed[event.key] = true;

            switch (event.key) {
                case 'ArrowUp':
                    this.maze.move(0, -2);
                    break;
                case 'ArrowDown':
                    this.maze.move(0, 2);
                    break;
                case 'ArrowLeft':
                    this.maze.move(-2, 0);
                    break;
                case 'ArrowRight':
                    this.maze.move(2, 0);
                    break;
                default:
                    return;
            }
        } else if (event.type === 'keyup') {
            this.keyPressed[event.key] = false;
        }
    }
}

