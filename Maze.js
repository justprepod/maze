class Maze {
    constructor(m, n, gui, puzzle) {
        this.M = m;
        this.N = n;
        this.gui = gui;
        this.puzzle = puzzle;
        this.charPos = { x: 1, y: 1 };

        do {
            this.cells = Array.from(Array(this.N), () => new Array(this.M));
            this.generate(0, 0, this.N, this.M, true);
            this.addLettersToMaze();
        } while (!this.validate())
        this.border(0, 0, this.N, this.M);

        this.gui.updateMaze(this.cells);
        this.gui.setCharacterPos(this.charPos.x, this.charPos.y);
    }

    border() {
        for (let i = 0; i < this.N; i++)
            this.cells[i][0] = this.cells[i][this.M - 1] = true;
        for (let i = 0; i < this.M; i++)
            this.cells[0][i] = this.cells[this.N - 1][i] = true;
        //delete this.cells[this.N - 1][this.M - 2];
    }

    validate() {
        return true;
        for (let i = 2; i < this.N - 1; i++)
            for (let j = 2; j < this.M - 1; j++)
                if (this.cells[i][j] && !this.cells[i + 1][j] && !this.cells[i - 1][j] && !this.cells[i][j + 1] && !this.cells[i][j - 1])
                    return false;
        return true;
    }

    generate(x1, y1, x2, y2, vertical, indent = 0) {
        if ((x2 - x1 < 3) || (y2 - y1 < 3)) return;
        //console.log(`${' '.repeat(indent)}generate(${x1}, ${y1}, ${x2}, ${y2}, ${vertical})`);

        if (vertical) {
            const wall = getRandomEvenInRange(x1, x2 - 1);
            const passage = getRandomOddInRange(y1, y2 - 1);
            const passage2 = getRandomOddInRange(y1, y2 - 1);
            //console.log(`${' '.repeat(indent)}wall = ${wall}, passage = ${passage}`);
            for (let i = y1; i < y2; i++) {
                this.cells[wall][i] = true;
            }
            delete this.cells[wall][passage];// = false;
            //a[wall][passage2] = false;

            this.generate(x1, y1, wall, y2, false, indent + 1);
            this.generate(wall, y1, x2, y2, false, indent + 1);
        } else {
            const wall = getRandomEvenInRange(y1, y2 - 1);
            const passage = getRandomOddInRange(x1, x2 - 1);
            const passage2 = getRandomOddInRange(x1, x2 - 1);
            //console.log(`${' '.repeat(indent)}wall = ${wall}, passage = ${passage}`);
            for (let i = x1; i < x2; i++)
                this.cells[i][wall] = true;
            delete this.cells[passage][wall];// = false;
            //a[passage2][wall] = false;

            this.generate(x1, y1, x2, wall, true, indent + 1);
            this.generate(x1, wall, x2, y2, true, indent + 1);
        }
   }

    placeLettersInMaze(cells, word) {
       let start = [1, 1], end = [cells.length - 2, cells.length - 2];
    
        // Check if start and end are found
        if (!start || !end) {
            throw new Error("Start or end position not found in the maze.");
        }
    
        // Function to check if a cell is valid for placing a letter
        function isValidCell(row, col) {
            return row >= 0 && row < cells.length && col >= 0 && col < cells[row].length && !cells[row][col];
        }
    
        // Function to get all valid neighboring cells
        function getNeighbors(row, col) {
            const neighbors = [];
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of directions) {
                const nr = row + dr;
                const nc = col + dc;
                if (isValidCell(nr, nc)) {
                    neighbors.push([nr, nc]);
                }
            }
            return neighbors;
        }
    
        // Perform BFS to find a path from start to end
        function bfs(start, end) {
            const queue = [[start]];
            const visited = new Set();
            visited.add(`${start[0]},${start[1]}`);
            while (queue.length > 0) {
                const path = queue.shift();
                const [row, col] = path[path.length - 1];
                if (row === end[0] && col === end[1]) {
                    return path;
                }
                for (const [nr, nc] of getNeighbors(row, col)) {
                    if (!visited.has(`${nr},${nc}`)) {
                        visited.add(`${nr},${nc}`);
                        queue.push([...path, [nr, nc]]);
                    }
                }
            }
            return null; // No path found
        }
    
        // Find a path from start to end
        let path = bfs(start, end);
        path = path.filter((v) => v[0]%2==1 && v[1]%2==1);
        path.splice(0, 1);
        path.splice(path.length - 1);
        if (!path) {
            throw new Error("No path found from start to end in the maze.");
        }
    
        // Randomly select positions along the path for the letters
        const interval = Math.floor(path.length / word.length);
        const remainder = path.length % word.length;
        const positions = [];
        let offset = 0;
        for (let i = 0; i < word.length; i++) {
            const intervalSize = interval + (i < remainder ? 1 : 0);
            const positionIndex = offset + Math.floor(Math.random() * intervalSize);
            positions.push(positionIndex);
            offset += intervalSize;
        }
    
        // Sort positions to ensure letters are collected in order
        positions.sort((a, b) => a - b);
    
        // Place letters at the selected positions along the path
        for (let i = 0; i < word.length; i++) {
            const [row, col] = path[positions[i]];
            cells[col][row] = word[i];
        }
    }

    addLettersToMaze() {
        const word = this.puzzle.getWord();

        this.placeLettersInMaze(this.cells, word);
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.M && y >= 0 && y < this.N;
    }

    move(dx, dy) {
        let newX = this.charPos.x + dx;
        let newY = this.charPos.y + dy;

        if (this.isInBounds(newX, newY) /*&& !this.cells[newX][newY]*/ && !this.cells[this.charPos.x + (newX - this.charPos.x) / 2][this.charPos.y + (newY - this.charPos.y) / 2]) {
            if (typeof this.cells[newY][newX] === 'string') {
                // If character moves into a cell with a letter
                const letter = this.cells[newY][newX];
                this.puzzle.next(letter); // Send the letter to the puzzle
                this.cells[newY][newX] = false; // Remove letter from cell
                this.gui.updateCell(this.cells, newX, newY);                
            }

            this.gui.updateCharacterPos(this.charPos.x, this.charPos.y, newX, newY);
            this.charPos.x = newX;
            this.charPos.y = newY;
        }
    }
}
