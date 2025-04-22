class SliderShow {
    constructor(cinematicsFadeElement) {
        this.cinematicsFadeElement = cinematicsFadeElement;
    }

    play(pres, onEnded) {
        console.log(`showSlides(${pres})`);

        const cinematicsFadeElement = this.cinematicsFadeElement;
        const cinematicsSlideElement = cinematicsFadeElement.querySelector('#cinematics-slide');
        const subtitles = cinematicsSlideElement.querySelector('#subtitles');

        cinematicsSlideElement.style.display = 'flex';

        let currentIndex = -1;

        // Start the music
        const sound = new Audio(pres.sound);
        sound.autoplay = true;

        const onNextSlide = () => {
            if (currentIndex === pres.slides.length - 1){
                cinematicsSlideElement.style.display = 'none';
                if (onEnded)
                    onEnded();
            } else {
                currentIndex++;
                //reset transition
                cinematicsFadeElement.classList.remove('fade-out');
                cinematicsSlideElement.classList.remove('cinematics-animation');
                void cinematicsSlideElement.offsetWidth;
                cinematicsSlideElement.classList.add('cinematics-animation');

                // Set the slide image and subtitle
                cinematicsSlideElement.style.backgroundImage = `url(${pres.slides[currentIndex].image})`;

                if (currentIndex === pres.slides.length - 1){
                    cinematicsFadeElement.classList.add('fade-out');
                    cinematicsFadeElement.style["animation-delay"] = `${(pres.slides[currentIndex].delay || 5) - 3}s`;
                }

                if (pres.slides[currentIndex].sub){
                    subtitles.style.display = 'block';
                    subtitles.innerText = pres.slides[currentIndex].sub;
                } else {
                    subtitles.style.display = 'none';                    
                }

                setTimeout(onNextSlide, (pres.slides[currentIndex].delay || 5) * 1000);
            }
        }

        // Start the slideshow
        onNextSlide();

    }
}