class GUI {
    constructor() {
        this.placeholderUrl = 'assets/progress-bar-placeholder.png';
        this.completeUrl = 'assets/progress-bar-complete.png';
        this.currentUrl = 'assets/progress-bar-current.png';

        this.currentLevelElement = document.getElementById('current-level');
        this.totalLevelsElement = document.getElementById('total-levels');
        this.wordPart1Element = document.getElementById('word-part-1');
        this.wordPart2Element = document.getElementById('word-part-2');
        this.wordPart3Element = document.getElementById('word-part-3');
        this.wordImageElement = document.getElementById('word-image');
        this.mazeElement = document.getElementById('maze');
        this.progressBarFillElement = document.getElementById('progress-fill');
        this.progressBarElement = document.getElementById('progress-bar');
        this.cinematicsPopupElement = document.getElementById('cinematics-popup');
        this.cinematicsVideoElement = document.getElementById('cinematics-video');
        this.cinematicsSlideElement = document.getElementById('cinematics-slide');
        this.cinematicsFadeElement = document.getElementById('cinematics-fade');
        this.creditsElement = document.getElementById('credits-screen');

        this.initProgressBar();

        this.characterElement = document.createElement('img');
        this.characterElement.src = 'assets/char.png';
        this.characterElement.classList.add('character');
    }

    updateWordPart1(text) {
        document.getElementById('word-part-1').innerText = text;
    }

    updateWordPart2(text) {
        const e = document.getElementById('word-part-2');
        e.style.animation = 'none';
        e.textContent = text;
        void e.offsetWidth;
        e.style.animation = null; 
    }

    updateWordPart3(text) {
        document.getElementById('word-part-3').innerText = text;
    }

    updateWordImage(src) {
        this.wordImageElement.src = src;
    }

    updateMaze(cells) {
        this.mazeElement.innerHTML = '';
        for (let i = 0; i < cells.length; i++) {
            const row = document.createElement('div');
            row.classList.add('maze-row');
            for (let j = 0; j < cells[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('maze-cell');
                cell.style.width = (j % 2 === 1) ? '60px' : '4px';
                cell.style.height = (i % 2 === 1) ? '60px' : '4px';
                cell.style.backgroundColor = (i % 2 && j % 2) ? 'rgba(250,240,230)' : cells[j][i] === true ? 'black' : 'white';
                if (typeof cells[i][j] === 'string') {
                    cell.innerText = cells[i][j];
                }
                row.appendChild(cell);
            }
            this.mazeElement.appendChild(row);
        }
        // If the character is not already added, add it to the maze        
        if (!this.mazeElement.contains(this.characterElement)) {
            this.mazeElement.appendChild(this.characterElement);
        }
    }
    
    updateCell(cells, x, y) {
        const rows = this.mazeElement.children;
        const targetRow = rows[y];
        const cells_ = targetRow.children;
        const targetCell = cells_[x];
        if (typeof cells[y][x] === 'string') {
            targetCell.innerText = cells[y][x];
        } else {
            targetCell.innerText = '';
        }
        // Fix for accessing cells array correctly
        if (typeof cells[y][x] === 'string') {
            targetCell.innerText = cells[y][x];
        } else {
            targetCell.innerText = '';
        }
        // Corrected logic to access cells array
        if (typeof cells[y][x] === 'string') {
            targetCell.innerText = cells[y][x];
        } else {
            targetCell.innerText = '';
        }
        // Correct approach to update cell text
        if (typeof cells[y][x] === 'string') {
            targetCell.innerText = cells[y][x];
        } else {
            targetCell.innerText = '';
        }
        // Corrected logic to access and update cell text
        const cellText = typeof cells[y][x] === 'string' ? cells[y][x] : '';
        targetCell.innerText = cellText;
    }

    setCharacterPos(newX, newY) {
        // Add the no-transition class
        this.characterElement.classList.add('no-transition');
    
        const rows = this.mazeElement.children;
        const newRow = rows[newX]; // Assuming newX is the column index and newY is the row index
        const newCells = newRow.children;
        const newCell = newCells[newY];
    
        // Calculate the position of the new cell
        const rect = newCell.getBoundingClientRect();
        const mazeRect = this.mazeElement.getBoundingClientRect();
    
        // Move the character to the new position
        this.characterElement.style.top = `${rect.top - mazeRect.top + (rect.height - this.characterElement.height) / 2}px`;
        this.characterElement.style.left = `${rect.left - mazeRect.left + (rect.width - this.characterElement.width) / 2}px`;
    
        // Remove the no-transition class after a short delay
        setTimeout(() => {
            this.characterElement.classList.remove('no-transition');
        }, 50); // A small delay to ensure the character is placed before re-enabling transitions
    }    
    
    updateCharacterPos(oldX, oldY, newX, newY) {
        const rows = this.mazeElement.children;
        const newRow = rows[newY];
        const newCells = newRow.children;
        const newCell = newCells[newX];
    
        // Calculate the position of the new cell
        const rect = newCell.getBoundingClientRect();
        const mazeRect = this.mazeElement.getBoundingClientRect();
    
        // Move the character to the new position
        this.characterElement.style.top = `${rect.top - mazeRect.top + (rect.height - this.characterElement.height) / 2}px`;
        this.characterElement.style.left = `${rect.left - mazeRect.left + (rect.width - this.characterElement.width) / 2}px`;
    }
    
    initProgressBar() {
        for (let i = 0; i < 3; i++) {
            const img = document.createElement('img');
            img.src = this.placeholderUrl;
            img.style.width = 'auto';
            img.style.height = '100%';
            img.style.margin = '2px';
            this.progressBarElement.appendChild(img);
        }
    }

    updateProgressBar(current, total) {
        console.log(`progress bar ${current}/${total}`);
        this.currentLevelElement.innerText = `${current}`;
        this.totalLevelsElement.innerText = `${total}`;

        const images = this.progressBarElement.children;

        for (let i = 0; i < images.length; i++) {
            if (i < current - 1) {
                images[i].src = this.completeUrl;
            } else if (i == current - 1) {
                images[i].src = this.currentUrl;
            } else {
                images[i].src = this.placeholderUrl;
            }
        }
    }

    async showCinematics(src, onEnded) {
        let player;
        if (typeof src === 'string' || src instanceof String){
            player = new VideoPlayer(this.cinematicsVideoElement);
        } else {
            player = new SliderShow(this.cinematicsFadeElement);
        }

        this.cinematicsPopupElement.style.display = 'flex';
        player.play(src, onEnded);
    }

    showCredits(closeOnFinish) {
        this.creditsElement.style.display = 'flex';
        if (closeOnFinish){
            document.addEventListener('keydown', ()=>{
                window.close();
            });            
        }
    }

    hideCinematics() {
        console.log('hideCinematics');
        this.cinematicsPopupElement.style.display = 'none';
    }
}