const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"),
    ctx_2: undefined,
    oneBox: 40,
    buttons: {
        play: document.getElementById("buttonPlay"),
        turretOneButton: document.getElementById("wiezaImg"),
    },
    map: document.getElementById("map"),
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
        health: 100,
        index: 0
    },
    turretOne: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        range: 2,
    },
    interval: undefined,
    lvl: 10,
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
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
        for (let j = 0; j < 5; j++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        for (let k = 0; k < 6; k++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        for (let o = 0; o < 5; o++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y - this.oneBox;
        };
        for (let x = 0; x < 8; x++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        for (let z = 0; z < 10; z++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        for (let l = 0; l < 10; l++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        };
        for (let c = 0; c < 3; c++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        for (let v = 0; v < 5; v++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        };

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
        this.buttons.turretOneButton.addEventListener("click", (e) => {
            this.createTurretImg(e);
        })
    },
    createTurretImg: function (e) {
        let test = document.createElement("img");
        test.src = "img/wieza.png";
        test.style.position = "absolute";
        test.style.left = e.pageX + "px";
        test.style.top = e.pageY + "px";
        let castlePositionY = this.castle.y / this.oneBox;
        let castlePositionX = this.castle.x;
        let castlePositionY_height = castlePositionY + this.castle.height / this.oneBox - 1;
        let castlePositionX_width = castlePositionX + this.castle.width / this.oneBox - 1;
        // console.log(castlePositionY_height)
        // console.log(castlePositionX_width)
        // console.log(castlePositionY)
        // console.log(castlePositionX)
        // console.log()
        console.log(this.number.width, this.number.height)
        this.map.append(test);
        this.map.addEventListener("mousemove", position)
        this.map.addEventListener("click", buildTurret)

        function position(e) {
            test.style.left = e.pageX + "px";
            test.style.top = e.pageY + "px";
        }

        function buildTurret(e) {
            let clickX = Math.floor(e.pageX / 40);
            let clickY = Math.floor(e.pageY / 40);
            console.log(clickX, clickY)
            //console.log(Math.round(e.pageX/40))
            // console.log(e.pageX/40)
            // console.log(Math.floor(e.pageX / 40) + "poczatkowe")
            // console.log(Math.floor(e.pageY / 40) + "poczatkowe")
            // console.log(Math.floor(e.pageX / 40 + 2))
            // console.log(Math.floor(e.pageY / 40 + 2))
            // console.log(Math.floor(e.pageX / 40 + 3))
            // console.log(Math.floor(e.pageY / 40 + 3))
            myGameArea.enemypathArray.forEach(elem => {
          
             
                // if (e.pageX != elem.x + 40 && e.pageY != elem.y+40 ||e.pageX + this.oneBox * 2 != elem.x && e.pageY + this.oneBox * 2 != elem.y ||e.pageX - this.oneBox * 2 != elem.x && e.pageY - this.oneBox * 2 != elem.y) {
                //   console.log("mogie")
                // console.log(0/40)
                // }else{
                //     console.log("nie moge")
                // }
                if (clickX == elem.x / 40 && clickY == elem.y / 40  ||
                    clickX + 1 == elem.x / 40 && clickY + 1 == elem.y / 40 ||
                    clickX + 2 == elem.x / 40 && clickY + 2 == elem.y / 40 ) {

                    //    console.log(myGameArea.enemypathArray.length)
                    console.log(" nie moge moge")
                    console.log(Math.floor(e.pageX / 40 + 1))
                    //    console.log(Math.floor(e.pageX/40))
                    //    console.log(elem.x/40)
                } else if(clickX+1 < myGameArea.number.width && clickX+2 < myGameArea.number.width &&
                          clickY+1 < myGameArea.number.height && clickY +2 < myGameArea.number.height ) {
                    console.log("MOGE")
                }else{
                    console.log("nie moge")
                }

            });
        }
    },
    //     buildTurret: function (e) {
    // this.map.removeEventListener("click",false)
    //         console.log(e.pageX)
    //         console.log(e.pageY)
    //         console.log("xd")
    //         this.enemypathArray.forEach(elem => {
    //             if (e.pageX != elem.x && e.pageY != elem.y) {
    //                 if (e.pageX + this.oneBox * 2 != elem.x && e.pageY + this.oneBox * 2 != elem.y) {
    //                     if (e.pageX - this.oneBox * 2 != elem.x && e.pageY - this.oneBox * 2 != elem.y) {
    //                         console.log("tutaj mogiem budowac")
    //                     } else {
    //                         console.log("tu nie moge")
    //                     }
    //                 }

    //             }

    //         });
    //     },
    createEnemy: function () {

        let poziom = 15;
        this.enemyArray = [];
        for (let i = 0; i < poziom; i++) {
            //tworzenie potworków i dodawanie ich do arraya
            console.log(this.enemyOne.index)
            this.createElement(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.img, this.enemyArray, this.enemyOne.health, this.enemyOne.index);
            this.enemyOne.x = this.enemyOne.x - this.oneBox / 2;
            //  this.enemyOne.index = this.enemyOne.index+1;
            console.log(this.enemyOne.index)
        }
        this.interval = setInterval(() => {
            this.engine();
            // console.log("xd")
            console.log(this.enemyArray)
        }, 100);
    },
    engine: function () {

        // sprawdza czy sa potworki w arrau 

        if (this.enemyArray.length != 0) {
            this.ctx_2.clearRect(0, 0, this.canvas_2.width, this.canvas_2.height)
            // this.ctx_2.fillRect(0, 0, this.canvas_2.width, this.canvas_2.height);
            this.enemyArray.forEach(element => {
                if (element.index < this.enemypathArray.length) {
                    if (element.x < this.enemypathArray[0].x) {
                        element.x = element.x + this.oneBox / 2;
                        // this.ctx_2.fillRect(element.x, element.y, element.width, element.height);
                    } else {
                        element.x = this.enemypathArray[element.index].x + 5;
                        element.y = this.enemypathArray[element.index].y + 5;
                        this.ctx_2.fillRect(element.x, element.y, element.width, element.height);
                        element.index = element.index + 1;
                    }
                } else {
                    this.enemyArray.shift(element);
                    console.log(this.enemyArray)
                    console.log("gameover")
                }

            });
        } else {
            clearInterval(this.interval);
            console.log("zero i bedzie nowa gra")
        }


    },

    createElement: function (width, height, x, y, img, path, life, index) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.img = img;
        object.life = life;
        object.index = index;
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