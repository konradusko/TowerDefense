const myGameArea = {
    canvas: document.getElementById("canvas"), // mapa
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"), // potworki
    ctx_2: undefined,
    canvas_3: document.getElementById("canvas3"), // wieze
    ctx_3: undefined,
    canvas_4: document.getElementById("canvas4"), // zasieg wiezy
    ctx_4: undefined,
    canvas_5: document.getElementById("canvas5"), // animacja strzalu wiezy
    ctx_5: undefined,
    oneBox: 40,
    buttons: {
        play: document.getElementById("buttonPlay"),
        turretOneButton: document.getElementById("wiezaImg"),
        turretTwoButton: document.getElementById("wiezaImg2"),
        turretThreeButton: document.getElementById("wiezaImg3"),
        showTurretRange: document.getElementById("showTowerRange"),
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
        health: 30,
        move: 0,
        index: 1,
        money: 0,
        speed: 1000,
    },
    turretOne: {
        x: 0,
        y: 0,
        width: 40,
        height: 80,
        range: 300,
        dmg: 30,
        speed: 2000,
        img: document.getElementById("wiezaImg"),
    },
    turretTwo: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        range: 400,
        dmg: 30,
        speed: 2000,
        img: document.getElementById("wiezaImg2"),
    },
    turretThree: {
        x: 0,
        y: 0,
        width: 80,
        height: 120,
        range: 500,
        dmg: 30,
        speed: 2000,
        img: document.getElementById("wiezaImg3"),
    },
    interval: undefined,
    interval_2: undefined,
    lvl: 10,
    clickShowAndHide: undefined, // zmienna do pokazywania i chowania zasiegu wiezy
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
    turretsArray: [],
    enemyInRangeArray: [],
    money: 99999999999999999,
    numberOfEnemy: 15, //ile potworow ma sie pojawic // zalezne od poziomu
    start: function () {
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = 600;
        this.canvas.width = 800;
        this.ctx_2 = this.canvas_2.getContext("2d");
        this.canvas_2.height = 600;
        this.canvas_2.width = 800;
        this.ctx_3 = this.canvas_3.getContext("2d");
        this.canvas_3.height = 600;
        this.canvas_3.width = 800;
        this.ctx_4 = this.canvas_4.getContext("2d");
        this.canvas_4.height = 600;
        this.canvas_4.width = 800;
        this.ctx_5 = this.canvas_5.getContext("2d");
        this.canvas_5.height = 600;
        this.canvas_5.width = 800;
        // obliczanie sciezki
        for (let i = 0; i < 4; i++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        for (let j = 0; j < 5; j++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        };
        for (let k = 0; k < 7; k++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        };
        for (let o = 0; o < 5; o++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y - this.oneBox;
        };
        for (let x = 0; x < 7; x++) {
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
        this.buttonsEvents();
    },
    buttonsEvents: function () {
        this.buttons.play.addEventListener("click", () => {
            this.startGameLoop();
        });
        this.buttons.turretOneButton.addEventListener("click", (e) => {
            this.createTurretImg(e, this.turretOne);
        });
        this.buttons.turretTwoButton.addEventListener("click", (e) => {
            this.createTurretImg(e, this.turretTwo);
        });
        this.buttons.turretThreeButton.addEventListener("click", (e) => {
            this.createTurretImg(e, this.turretThree);
        });
        this.buttons.showTurretRange.addEventListener("click", () => {
            this.showRange();
        });
    },
    showRange: function () {
        if (this.turretsArray.length != 0) {
            if (this.clickShowAndHide == undefined) {
                this.turretsArray.forEach(el => {
                    let TopLeftX = el.x + this.oneBox - el.range / 2;
                    let TopLeftY = el.y + this.oneBox - el.range / 2;
                    this.ctx_4.beginPath();
                    this.ctx_4.strokeStyle = "red";
                    this.ctx_4.lineWidth = 2;
                    this.ctx_4.rect(TopLeftX, TopLeftY, el.range, el.range);
                    this.ctx_4.stroke();
                })
                this.clickShowAndHide = 1;
                this.buttons.showTurretRange.innerHTML = "Hide Tower Range";
            } else {
                console.log("xd robi sie ? ")
                this.ctx_4.clearRect(0, 0, this.canvas_4.width, this.canvas_4.height);
                this.clickShowAndHide = undefined;
                this.buttons.showTurretRange.innerHTML = "Show Tower Range";
            }
        }
    },
    createTurretImg: function (e, turret) {
        const saveMemory = this.clickShowAndHide;
        let numberOfquad = myGameArea.oneBox;
        let imageTurret = document.createElement("img");
        let border = document.createElement("div");
        let background = document.createElement("div");
        background.style.position = "absolute";
        background.style.width = turret.width + this.oneBox + "px";
        background.style.height = turret.height + this.oneBox + "px";
        background.style.background = "green";
        background.style.zIndex = 8;
        background.style.opacity = .5;
        background.id = background;
        background.style.left = e.pageX + "px";
        background.style.top = e.pageY + "px";
        border.style.position = "absolute";
        border.style.border = "2px solid red";
        border.style.padding = turret.range / 2 + "px";
        border.style.zIndex = 10;
        border.id = border;
        border.style.left = e.pageX + 40 - turret.range / 2 + "px";
        border.style.top = e.pageY + 40 - turret.range / 2 + "px";
        imageTurret.src = turret.img.src;
        imageTurret.style.width = turret.width + "px";
        imageTurret.style.height = turret.height + "px";
        imageTurret.style.zIndex = 9;
        imageTurret.id = imageTurret;
        imageTurret.style.position = "absolute";
        imageTurret.style.left = e.pageX + this.oneBox / 2 + "px";
        imageTurret.style.top = e.pageY + this.oneBox / 2 + "px";
        let castlePositionY = this.castle.y / this.oneBox;
        let castlePositionX = this.castle.x;
        let castleWidth = this.castle.width / this.oneBox - 1;
        let castleHeight = this.castle.height / this.oneBox;
        this.map.append(imageTurret, border, background);
        this.map.addEventListener("mousemove", position)
        this.clickShowAndHide = 1;
        this.showRange();

        function position(e) {
            imageTurret.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad + numberOfquad / 2 + "px";
            imageTurret.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad + numberOfquad / 2 + "px";
            border.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad + numberOfquad + numberOfquad / 2 - turret.range / 2 + "px";
            border.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad + numberOfquad + numberOfquad / 2 - turret.range / 2 + "px";
            background.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad + "px";
            background.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad + "px";
            let bol = ifIcanBuildHereTurret(e);
            //   console.log(bol)
            if (bol == true) {
                background.style.background = "green";
                myGameArea.map.addEventListener("click", removeAndBuild) //mozna budowac
            } else {
                background.style.background = "red";
                myGameArea.map.removeEventListener("click", removeAndBuild); //nie mozna budowac
            }
        }

        function removeAndBuild(e) {
            let x = Math.floor(e.pageX / numberOfquad) * myGameArea.oneBox + myGameArea.oneBox / 2;
            let y = Math.floor(e.pageY / numberOfquad) * myGameArea.oneBox + myGameArea.oneBox / 2;
            let index = myGameArea.turretsArray.length + 1;
            myGameArea.createTurret(turret.width, turret.height, x, y, turret.range, turret.dmg, turret.speed, turret.img, myGameArea.turretsArray, index)
            myGameArea.map.removeEventListener("mousemove", position);
            myGameArea.map.removeEventListener("click", removeAndBuild);
            document.getElementById(imageTurret).remove();
            document.getElementById(border).remove();
            document.getElementById(background).remove();
            myGameArea.ctx_3.drawImage(turret.img, x, y, turret.width, turret.height);

            myGameArea.startShootLoop(myGameArea.turretsArray.slice(-1)[0]);
            //  console.log(saveMemory)
            if (saveMemory == undefined) {
                myGameArea.clickShowAndHide = 1;
                myGameArea.showRange();
            } else {
                myGameArea.clickShowAndHide = undefined;
                myGameArea.showRange();
            }
        }

        function ifIcanBuildHereTurret(e) {
            let bol = true;
            let clickX = Math.floor(e.pageX / numberOfquad); // pozycja myszki wzgledem osi X jaka kratka
            let clickY = Math.floor(e.pageY / numberOfquad); // pozycja myszki wzgledem osi Y jaka kratka
            // parametry obecnej wiezy
            let turretWidth = turret.width / numberOfquad; //ile kratek ma szerokosc wiezy + jedna kratka klick
            let turretHeight = turret.height / numberOfquad; //to co wyzej tylko wysokosc
            //czy po za mapa ktos sie bez zezwolenia nie buduje
            if (clickX + turretWidth >= myGameArea.number.width ||
                clickY + turretHeight >= myGameArea.number.height) {
                // console.log("budowanie po za mapa nie dozwolone klaunie")
                bol = false;
            }
            // czy dla sciezce dla potworków wielki pan wladca nie stawia wiezy
            myGameArea.enemypathArray.forEach(e => {
                let pathX = Math.floor(e.x / numberOfquad);
                let pathY = Math.floor(e.y / numberOfquad);
                if (pathX >= clickX && pathX <= clickX + turretWidth &&
                    pathY >= clickY && pathY <= clickY + turretHeight) {
                    bol = false;
                }
            })
            // jesli ktos nie wpadl na pomysl by wieze na wieze zbudowac wtf ?
            if (myGameArea.turretsArray.length != 0) {
                myGameArea.turretsArray.forEach(e => {
                    let widthT = e.width / numberOfquad; // kratki szerokosci zbudowanej wczesniej wiezy
                    let heightT = e.height / numberOfquad // kratki wysokosci zbudowanej wczesniej wiezy
                    let X = Math.floor(e.x / numberOfquad);
                    let Y = Math.floor(e.y / numberOfquad);
                    if (clickX >= X && clickX <= X + widthT && clickY >= Y && clickY <= Y + heightT ||
                        X >= clickX && X <= clickX + turretWidth && Y >= clickY && Y <= clickY + turretHeight ||
                        X + widthT >= clickX && X <= clickX + turretWidth && Y + heightT >= clickY && Y <= clickY + turretHeight) {
                        bol = false;
                    }
                })
            }
            // a pan zamek ?
            if (clickX >= castlePositionX && clickX <= castlePositionX + castleWidth &&
                clickY >= castlePositionY && clickY <= castlePositionY + castleHeight ||
                castlePositionX + castleWidth >= clickX && castlePositionX <= clickX + turretWidth &&
                castlePositionY + castleHeight >= clickY && castlePositionY <= clickY + turretHeight) {
                bol = false;
            }
            return bol;
        }
    },
    startGameLoop: function () {
        for (let i = 0; i < this.numberOfEnemy; i++) {
            //   createEnemy:function(width,height,x,y,health, index,move,money, speed,path)
            this.createEnemy(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.health,
                this.enemyOne.index, this.enemyOne.move, this.enemyOne.money, this.enemyOne.speed, this.enemyArray);
            this.enemyOne.x = this.enemyOne.x - this.oneBox / 2; // kazdy kolejny jest odsuniety od siebie
            this.enemyOne.index = this.enemyOne.index + 1;
        }
        //tworzy nam to potworki ktore ide do zamku 
        this.interval = setInterval(() => {
            this.enemyMove();
        }, 1000); // predkosc poruszania sie bestii
        //   this.startShootLoop();
    },
    enemyMove: function () {
        if (this.enemyArray.length != 0) {
            this.ctx_2.clearRect(0, 0, this.canvas_2.width, this.canvas_2.height) // czysci nam mape z potworków
            this.enemyArray.forEach(element => {
                // jesli droga przebyta przez potworka jest mniejsza od drogi to maszeruja 
                if (element.move < this.enemypathArray.length) {
                    //rysowanie i przemieszczanie potworkami
                    if (element.x < this.enemypathArray[0].x) {
                        element.x = element.x + this.oneBox / 2;
                    } else {
                        element.x = this.enemypathArray[element.move].x + 5;
                        element.y = this.enemypathArray[element.move].y + 5;
                        this.ctx_2.fillRect(element.x, element.y, element.width, element.height);
                        element.move = element.move + 1;
                    }
                } else {
                    // tutaj droga byla juz wieksza to potworek dotarl do zamku
                    this.enemyArray.shift(element);
                    console.log(this.enemyArray)
                    console.log("gameover")
                }
            });
        } else {
            // nie ma juz zadnych potworków to zeruje interval
            clearInterval(this.interval);
            console.log("zero i bedzie nowa gra")
        }
        ///////////////////////////////

    },
    startShootLoop: function (x) {
        console.log(this.turretsArray);
        console.log(x)
        x.interval = setInterval(() => {
            this.turretShoot(x);
        }, x.speed)
    },
    turretShoot: function (T) {
        let bol = true;
        let TopLeftX = T.x + this.oneBox - T.range / 2;
        let TopLeftY = T.y + this.oneBox - T.range / 2;
        if(this.enemyArray != 0){
            this.enemyArray.forEach(element => { // robaczki
                if (element.x >= TopLeftX && element.x <= TopLeftX + T.range &&
                    element.y >= TopLeftY && element.y <= TopLeftY + T.range) {
                        if(bol == true){
                      
                        console.log("strzal")
                        this.animateShoot(element,T);
                      //  element.health = element.health- T.dmg;
                     
                        bol= false;
                        if(element.health <= 0){
                            this.enemyArray.shift(element);
                            this.ctx_2.clearRect(element.x, element.y, element.width, element.height);
                         //   console.log(this.enemyArray)
                        }
                    }
                }
            })
        }
    },
    animateShoot: function (e, w) {
        //e potworek, w wieza
        let test = e;
        let object = new Object();
        object.x = w.x;
        object.y = w.y;
        object.width= 15;
        object.height= 15;
        object.color = "red";
        object.EndPointX = test.x-5;
        object.EndPointaY = test.y-5
        object.interval = setInterval(() =>{
            console.log(e)
              if (object.x == object.EndPointX && object.y == object.EndPointaY){
                console.log("usuwa? ")
         
                clearInterval(object.interval)
                delete object;
                this.ctx_5.clearRect(object.x, object.y, object.width, object.height)
               
             }else{
                this.ctx_5.clearRect(object.x, object.y, object.width, object.height)
                if(object.x > object.EndPointX){
                    object.x = object.x - 20;
                }else if(object.x < object.EndPointX){
                    object.x = object.x + 20;
                } if(object.y > object.EndPointaY){
                    object.y = object.y  -  20;
                }else if(object.y < object.EndPointaY){
                    object.y = object.y + 20;
                }

                
                if(object.y > object.EndPointaY){
                    object.y = object.y  -  20;
                }else if(object.y < object.EndPointaY){
                    object.y = object.y + 20;
                }else if(object.x > object.EndPointX){
                    object.x = object.x - 20;
                }else if(object.x < object.EndPointX){
                    object.x = object.x + 20;
                }
           
           
                this.ctx_5.fillStyle = object.color;
                this.ctx_5.fillRect(object.x, object.y, object.width, object.height)
             }
        }, 50)
        // object.update = function(){
  
        // };
      //  this.test.push(object);
        console.log(object);
        // this.ctx_5.clearRect(0, 0, this.canvas_5.width, this.canvas_5.height)
        // // let xd = 0;
        // console.log(e.x, e.y)
        // this.ctx_5.beginPath();
        // this.ctx_5.moveTo(w.x + this.oneBox, w.y + this.oneBox);
        // this.ctx_5.strokeStyle = "#FF0000";
        // this.ctx_5.lineWidth = 5;
        // this.ctx_5.lineTo(e.x + 10, e.y + 10);
        // this.ctx_5.stroke();
    },
    createTurret: function (width, height, x, y, range, dmg, speed, img, path, index, interval) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.range = range;
        object.dmg = dmg;
        object.speed = speed;
        object.img = img;
        object.interval = interval;
        object.index = index;
        path.push(object)
    },
    createEnemy: function (width, height, x, y, health, index, move, money, speed, path) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.health = health;
        object.index = index;
        object.move = move;
        object.money = money;
        object.speed = speed;
        path.push(object);
    },
    createElement: function (width, height, x, y, img, path) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.img = img;
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
    },

}
myGameArea.start();
