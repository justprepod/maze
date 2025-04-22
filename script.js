document.addEventListener('DOMContentLoaded', function() {
    const loadScreen = document.getElementById('load-screen');
    const gameContainer = document.getElementById('game-container');
    
    // Hide all game elements initially
    gameContainer.style.display = 'none';
    
    function startGame() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const closeOnFinish = urlParams.get("close-on-finish");
        console.log(closeOnFinish);
        
        document.removeEventListener('keydown', startGame);
        document.removeEventListener('click', startGame);
        // Start the game
        loadScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
        const game = new Game(closeOnFinish);
        game.start();
    }

    // Add event listener for keydown events
    document.addEventListener('keydown', startGame);
    document.addEventListener('click', startGame);
});
