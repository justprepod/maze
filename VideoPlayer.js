class VideoPlayer {
    constructor(element) {
        this.cinematicsVideoElement = element;
    }

    play(videoSrc, onEnded) {
        console.log(`showCinematics(${videoSrc})`);
        
        this.cinematicsVideoElement.style.display = 'flex';
        this.cinematicsVideoElement.src = videoSrc;
        this.cinematicsVideoElement.muted = true;
        this.cinematicsVideoElement.play();

        this.cinematicsVideoElement.addEventListener('ended', () => {
            this.cinematicsVideoElement.style.display = 'none';
            if (onEnded)
                onEnded();
        }, {once: true});
    }
}