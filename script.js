class GUI {
    constructor() {
        this.currentLevelElement = document.getElementById('current-level');
        this.totalLevelsElement = document.getElementById('total-levels');
        this.wordPart1Element = document.getElementById('word-part-1');
        this.wordPart2Element = document.getElementById('word-part-2');
        this.wordImageElement = document.getElementById('word-image');
        this.mazeElement = document.getElementById('maze');
        this.progressBarFillElement = document.getElementById('progress-fill');
        this.cinematicsPopupElement = document.getElementById('cinematics-popup');
        this.cinematicsVideoElement = document.getElementById('cinematics-video');
    }

    // Interfaces to update elements
    updateCurrentLevel(level) {}
    updateTotalLevels(levels) {}
    updateWordPart1(text) {}
    updateWordPart2(text) {}
    updateWordImage(src) {}
    updateMaze(mazeData) {}
    updateProgressBar(progress) {}
    showCinematics(videoSrc) {}
    hideCinematics() {}
}
