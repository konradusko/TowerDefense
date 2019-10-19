const myGameArea = {
    canvas: document.getElementById("canvas"),
    canvasHeight: document.getElementById("canvas").offsetHeight,
    canvasWidth: document.getElementById("canvas").offsetWidth,
    number: 0,
    ourBlocks: undefined,
    enemyPathBlock: {
        one: 3,
        two: 4
    },
    enemypathArray: [],
    castleFields: [],
    check: function () {
        //rysowanie drogi dla oponetów
        //oraz pola zamku
        this.enemypathArray.forEach(element => {
            this.ourBlocks[element].classList = "enemyPath";
        });
        this.castleFields.forEach(el => {
            this.ourBlocks[el].classList = "castleField";
        });
    },
    init: function () {
        //obliczanie drogi dla oponętów i zamku
        this.enemypathArray.push(this.enemyPathBlock.one, this.enemyPathBlock.two)
        for (let j = 0; j < 6; j++) {
            this.enemyPathBlock.one = this.enemyPathBlock.one + 20;
            this.enemyPathBlock.two = this.enemyPathBlock.two + 20;
            this.enemypathArray.push(this.enemyPathBlock.one, this.enemyPathBlock.two)
        }
        let lastIndexofArray = this.enemypathArray[this.enemypathArray.length - 1];
        let secondPath = lastIndexofArray - 20;
        let thirdPath;
        console.log(secondPath);
        for (let k = 0; k < 12; k++) {
            lastIndexofArray++
            secondPath++
            this.enemypathArray.push(lastIndexofArray, secondPath)
        }
        lastIndexofArray = lastIndexofArray + 20;
        secondPath = lastIndexofArray - 1;
        this.enemypathArray.push(lastIndexofArray, secondPath);
        for (let p = 0; p < 7; p++) {
            lastIndexofArray = lastIndexofArray + 20;
            secondPath = secondPath + 20;
            this.enemypathArray.push(lastIndexofArray, secondPath);
        }
        lastIndexofArray = lastIndexofArray - 1;
        secondPath = lastIndexofArray - 20;
        for (let x = 0; x < 11; x++) {
            lastIndexofArray--;
            secondPath--;
            this.enemypathArray.push(lastIndexofArray, secondPath);
        }
        lastIndexofArray--;
        secondPath = lastIndexofArray - 20;
        thirdPath = secondPath - 20;
        this.castleFields.push(lastIndexofArray, secondPath, thirdPath);
        for (let m = 0; m < 3; m++) {
            lastIndexofArray--;
            secondPath--;
            thirdPath--;
            this.castleFields.push(lastIndexofArray, secondPath, thirdPath);
        }
        return this.draw();
    },
    draw: function () {
        //rysowanie kwadratów
        this.number = this.canvasHeight / 40 * this.canvasWidth / 40;
        console.log(this.number);
        for (let i = 0; i < this.number; i++) {
            let test = document.createElement("div");
            test.classList = "canvasBlock";
            test.innerHTML = i;
            this.canvas.append(test);
        }
        this.ourBlocks = document.querySelectorAll(".canvasBlock");
        return this.check();
    },
}
myGameArea.init();