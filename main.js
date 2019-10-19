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
        return enemyGenerator.init(5);
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
            let create = document.createElement("div");
            create.classList = "canvasBlock";
            create.id = i;
           // create.innerHTML = i;
            this.canvas.append(create);
        }
        this.ourBlocks = document.querySelectorAll(".canvasBlock");
        return this.check();
    },
}
/*
const enemyGenerator = {
    numberOfEnemy: 0,
    test:0,
    generate: function () {
        console.log("done");
        setTimeout(() => {
            let create = document.createElement("span");
            create.classList = "enemy";
            
          //  myGameArea.canvas.append(create);
            document.getElementById(3).append(create);
       
            let test = document.querySelectorAll(".enemy").length;
            console.log(test)
            return test;

        }, 1000);
    },
    init: function (lvl) {
        for (let i = 0; i < lvl; i++) {
            this.generate();
            console.log("working?")
        }
    }
}

*/
const enemyGenerator = {
    arr: new Array(),
    init:function(x){
for(let o = 0; o< x; o++){
    let test = new Object();
    test = {
               name:"Enemy" + o,
               healt: 100,
               x: 1,
               y: 2,
               class: "enemy",
               speed:10,
               width:40 + "40px",
               height:40 + "40px"
    }
    this.arr.push(test);
    
    
}
this.arr.forEach(element => {
    let teste = document.createElement("div");
    teste.className= this.arr[element].name;
    myGameArea.canvas.append()
});
console.log(this.arr)
    }
}
myGameArea.init();