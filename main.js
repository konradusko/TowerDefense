const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"),
    ctx_2: undefined,
    oneBox: 40,
    buttons: {
        play: document.getElementById("buttonPlay"),
    },
    castle: {
        width: 160,
        height: 120,
        x: 0,
        y: 480,
        img: document.getElementById("castleImg"),
        health: 100
    },
    grass: {
        width: 40,
        height: 40,
        x: 0,
        y: 0,
        img: document.getElementById("grassImg")
    },
    enemyPath: {
        width: 40,
        height: 40,
        x: 0,
        y: 40,
        img: document.getElementById("enemyPathImg")
    },
    number: {
        width: 0,
        height: 0
    },
    enemyOne: {
        width: 30,
        height: 30,
        x: 5,
        y: 45,
        img: document.getElementById("grassImg"), //testowo to i trawa dobra
        health: 100
    },
    interval: undefined,
    lvl: 10,
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
    breakPoints: [], //dla potworków break pointy
    promise: undefined,
    start: function () {
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = 600;
        this.canvas.width = 800;
        this.ctx_2 = this.canvas_2.getContext("2d");
        this.canvas_2.height = 600;
        this.canvas_2.width = 800;
        // obliczanie sciezki
        for (let i = 0; i < 4; i++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let j = 0; j < 5; j++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let k = 0; k < 6; k++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let o = 0; o < 5; o++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y - this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let x = 0; x < 8; x++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        console.log(this.breakPoints)
        for (let z = 0; z < 10; z++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let l = 0; l < 10; l++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let c = 0; c < 3; c++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        for (let v = 0; v < 5; v++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        };
        //   this.breakPoints.push(this.enemypathArray.slice(-1)[0]);
        console.log(this.breakPoints)
        console.log(this.enemypathArray)
        this.number.width = this.canvas.width / this.oneBox; //ile kratek szerokosci
        this.number.height = this.canvas.height / this.oneBox //ile kratek wysokosci
        console.log(this.number)
        this.drawMap(this.number.width, this.number.height); //rysowanie

    },
    drawMap: function (w, h) {
        //tworzenie elementow trawy pod budowe wiezy
        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
                this.createElement(this.grass.width, this.grass.height, this.grass.x, this.grass.y, this.grass.img, this.grasspathArray);
                this.grass.x = this.grass.x + this.oneBox;
            }
            this.grass.x = 0;
            this.grass.y = this.grass.y + this.oneBox;
        }
        this.grasspathArray.forEach(element => {
            this.drawElement(element.width, element.height, element.img, element.x, element.y); //rysowanie trawy
        });
        this.enemypathArray.forEach(el => {
            this.drawElement(el.width, el.height, el.img, el.x, el.y); //rysowanie sciezki
        });
        this.drawElement(this.castle.width, this.castle.height, this.castle.img, this.castle.x, this.castle.y); // i pan zamek
        //button play rozpoczyna produkcje tych przeklętych bestii

        this.buttons.play.addEventListener("click", () => {

            this.createEnemy();
        })
    },
    createEnemy: function () {

        let poziom = 1;
        let numberTest = 0;
        this.enemyArray = [];
        for (let i = 0; i < poziom; i++) {
            //tworzenie potworków i dodawanie ich do arraya
            this.createElement(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.img, this.enemyArray, this.enemyOne.health);
            this.enemyOne.x = this.enemyOne.x ;
        }
        console.log(this.enemyArray)

        this.interval = setInterval(() => {
            this.drawEnemy(numberTest++);
            // console.log("xd")
            // console.log(this.enemyArray)
        }, 200);
    },
    drawEnemy: function (a) {
 if(a < this.enemypathArray.length){
    this.enemyArray.forEach(element => {
        this.ctx_2.clearRect(0, 0, this.canvas_2.height, this.canvas_2.width)
        this.ctx_2.beginPath();
        element.x = this.enemypathArray[a].x  ;
        element.y = this.enemypathArray[a].y  ;
        this.ctx_2.fillRect(element.x, element.y, element.width, element.height);
    });
 }
       
        /*
        this.ctx_2.clearRect(0, 0, this.canvas_2.height, this.canvas_2.width)
           console.log(this.enemyArray)
           console.log(this.enemypathArray)
        if (this.enemyArray.length != 0) {
            this.ctx_2.clearRect(0, 0, this.canvas_2.height, this.canvas_2.width)
            this.enemyArray.forEach(el => {
             el.x = this.enemypathArray[a].x  ;
                   el.y = this.enemypathArray[a].y  ;
                   this.ctx_2.fillRect(el.x, el.y, el.width, el.height);


            //     if(el.x < 5){
            //        el.x = el.x +40;
            //        console.log(this.enemyArray)
            //     }else{
            //         el.x = el.x = this.enemypathArray[a].x;
            //         this.ctx_2.fillRect(el.x, el.y, el.width, el.height);
            //     }
            //    //     el.x = this.enemypathArray[a].x + 5 ;
                //    el.y = this.enemypathArray[a].y + 5 ;
              
                  });

        } else {
            console.log("array is empty")
            clearInterval(this.interval);
        }

*/

    },
    createElement: function (width, height, x, y, img, path, life) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.img = img;
        object.life = life;
        path.push(object);
    },
    drawElement: function (width, height, background, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.background = background;
        this.ctx.beginPath();
        this.ctx.drawImage(this.background, this.x, this.y, this.width, this.height);
        //       this.ctx.fillRect(this.x,this.y,this.width,this.height);
    },

}
myGameArea.start();
