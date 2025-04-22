class Puzzle {
    constructor(targetString, gui, imagePath) {
        if (!targetString || targetString.length === 0) {
            throw new Error("Target string cannot be empty.");
        }
        this.typedString = "";
        this.remainingString = targetString;
        this.gui = gui;
        this.gui.updateWordPart1('');
        this.gui.updateWordPart2('');
        this.gui.updateWordPart3(targetString);
        this.gui.updateWordImage(imagePath);
    }

    onCompleted(handler){
        this.onCompleted = handler;        
    }

    onFailed(handler){
        this.onFailed = handler;        
    }

    getWord() {
        return this.typedString + this.remainingString;
    }

    next(char) {
        console.log(char);
        if (typeof char !== 'string' || char.length !== 1) {
            return false;
        }

        if (this.remainingString.startsWith(char)) {
            this.gui.updateWordPart1(this.typedString);
            this.gui.updateWordPart2(char);
            this.typedString += char;
            this.remainingString = this.remainingString.slice(1);
            this.gui.updateWordPart3(this.remainingString);
        } else {
            this.onFailed();
        }

        if (this.remainingString.length === 0){
            this.onCompleted();
        }

        return true;
    }

    completed() {
        return this.remainingString.length === 0;
    }
}