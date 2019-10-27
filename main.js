const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"),
    ctx_2: undefined,
    canvas_3: document.getElementById("canvas3"),
    ctx_3: undefined,
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
        health: 30,
        index: 0
    },
    turretOne: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        range: 300,
        index: 2,
        speed: 2,
        img: document.getElementById("wiezaImg"),

    },
    interval: undefined,
    lvl: 10,
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
    turretsArray: [],
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
            this.createTurretImg(e, this.turretOne.img.src, this.turretOne);
        })
    },
    createTurretImg: function (e, turretSrc, turret) {
        let imageTurret = document.createElement("img");
        imageTurret.src = turretSrc;
        imageTurret.id = imageTurret;
        imageTurret.style.position = "absolute";
        imageTurret.style.left = e.pageX + "px";
        imageTurret.style.top = e.pageY + "px";
        let castlePositionY = this.castle.y / this.oneBox;
        let castlePositionX = this.castle.x;
        this.map.append(imageTurret);
        this.map.addEventListener("mousemove", position)
        this.map.addEventListener("click", buildTurret)

        function position(e) {
            imageTurret.style.left = e.pageX + "px";
            imageTurret.style.top = e.pageY + "px";
        }

        function removeAndBuild(x, y) {
            //index dla wiezy bedzie oznaczal ile dmg bedzie zadawal stworom 
            // a life szybkostrzelnosc
            myGameArea.createElement(turret.width, turret.height, x, y, turret.img, myGameArea.turretsArray, turret.speed, turret.index, turret.range);
            myGameArea.map.removeEventListener("mousemove", position);
            myGameArea.map.removeEventListener("click", buildTurret);
            document.getElementById(imageTurret).remove();
            myGameArea.drawTurret();
        }

        function buildTurret(e) {
            //sprawdzanie czy mozna zbudować turret
            let agreePath = false;
            let notAgreePath = 0;
            let notAgreeTurrets = 0;
            let numberOfquad = myGameArea.oneBox;
            let clickX = Math.floor(e.pageX / numberOfquad);
            let clickY = Math.floor(e.pageY / numberOfquad);
            if (myGameArea.turretsArray.length != 0) {
                //jeśli są już jakieś wieze to sprawdza czy wieża nie bedzie na wiezy
                myGameArea.turretsArray.forEach(el => {
                    console.log(clickX + "myszkaX")
                    console.log(clickY + "myszkaY")
                    console.log(Math.floor(el.x / numberOfquad))
                    console.log(Math.floor(el.y / numberOfquad))
                    //   console.log(Math.floor(el.y/numberOfquad)+1)
                    if (clickX == Math.floor(el.x / numberOfquad) && clickY == Math.floor(el.y / numberOfquad) ||
                        clickX + 2 == Math.floor(el.x / numberOfquad) && clickY + 1 == Math.floor(el.y / numberOfquad) ||
                        clickX + 1 == Math.floor(el.x / numberOfquad) && clickY + 2 == Math.floor(el.y / numberOfquad) ||
                        clickX + 2 == Math.floor(el.x / numberOfquad) && clickY == Math.floor(el.y / numberOfquad) ||
                        clickX + 1 == Math.floor(el.x / numberOfquad) && clickY == Math.floor(el.y / numberOfquad) ||
                        clickX + 1 == Math.floor(el.x / numberOfquad) && clickY + 1 == Math.floor(el.y / numberOfquad) ||
                        clickX == Math.floor(el.x / numberOfquad) && clickY + 2 == Math.floor(el.y / numberOfquad) ||
                        clickX - 1 == Math.floor(el.x / numberOfquad) && clickY + 1 == Math.floor(el.y / numberOfquad) ||
                        clickX - 1 == Math.floor(el.x / numberOfquad) && clickY == Math.floor(el.y / numberOfquad) ||
                        clickX - 1 == Math.floor(el.x / numberOfquad) && clickY - 2 == Math.floor(el.y / numberOfquad) ||
                        clickX - 2 == Math.floor(el.x / numberOfquad) && clickY + 1 == Math.floor(el.y / numberOfquad) ||
                        clickX - 2 == Math.floor(el.x / numberOfquad) && clickY - 1 == Math.floor(el.y / numberOfquad) ||
                        clickX == Math.floor(el.x / numberOfquad) && clickY + 1 == Math.floor(el.y / numberOfquad) ||
                        clickX == Math.floor(el.x / numberOfquad) && clickY - 2 == Math.floor(el.y / numberOfquad) ||
                        clickX == Math.floor(el.x / numberOfquad) && clickY - 1 == Math.floor(el.y / numberOfquad) ||
                        clickX + 1 == Math.floor(el.x / numberOfquad) && clickY - 1 == Math.floor(el.y / numberOfquad) ||
                        clickX - 1 == Math.floor(el.x / numberOfquad) && clickY - 1 == Math.floor(el.y / numberOfquad) ||
                        clickX + 1 == Math.floor(el.x / numberOfquad) && clickY - 2 == Math.floor(el.y / numberOfquad) ||
                        clickX + 2 == Math.floor(el.x / numberOfquad) && clickY + 2 == Math.floor(el.y / numberOfquad) ||
                        clickX - 2 == Math.floor(el.x / numberOfquad) && clickY - 2 == Math.floor(el.y / numberOfquad) ||
                        // clickX - 2 == Math.floor(el.x / numberOfquad) && clickY == Math.floor(el.y / numberOfquad) ||
                        clickX - 1 == Math.floor(el.x / numberOfquad) && clickY + 2 == Math.floor(el.y / numberOfquad) ||
                        clickX + 2 == Math.floor(el.x / numberOfquad) && clickY - 1 == Math.floor(el.y / numberOfquad) ||
                        clickX + 2 == Math.floor(el.x / numberOfquad) && clickY - 2 == Math.floor(el.y / numberOfquad)
                    ) {
                        console.log("nie moge budowac wiezy na wiezy")
                        notAgreeTurrets = notAgreeTurrets + 1;
                    }
                })
            }
            myGameArea.enemypathArray.forEach(elem => {
                if (clickX == elem.x / numberOfquad && clickY == elem.y / numberOfquad ||
                    clickX + 1 == elem.x / numberOfquad && clickY + 1 == elem.y / numberOfquad ||
                    clickX + 2 == elem.x / numberOfquad && clickY + 2 == elem.y / numberOfquad) {
                    //nie moge zbudowac tutaj wiezy
                    agreePath = false;
                    notAgreePath = notAgreePath + 1;
                    console.log("nie")
                } else if (clickX == castlePositionX && clickY == castlePositionY ||
                    clickX == castlePositionX + 1 && clickY == castlePositionY ||
                    clickX == castlePositionX + 2 && clickY == castlePositionY ||
                    clickX == castlePositionX + 3 && clickY == castlePositionY ||
                    clickX == castlePositionX && clickY + 1 == castlePositionY ||
                    clickX == castlePositionX && clickY + 2 == castlePositionY ||
                    clickX == castlePositionX + 1 && clickY + 1 == castlePositionY ||
                    clickX == castlePositionX + 1 && clickY + 2 == castlePositionY ||
                    clickX == castlePositionX + 2 && clickY + 1 == castlePositionY ||
                    clickX == castlePositionX + 2 && clickY + 2 == castlePositionY ||
                    clickX == castlePositionX + 3 && clickY + 1 == castlePositionY ||
                    clickX == castlePositionX + 3 && clickY + 2 == castlePositionY
                ) {
                    /// nie moge zbudowac tutaj wiezy, pan zamek mi przeszkadza
                    agreePath = false;
                    notAgreePath = 1;
                } else if (clickX + 1 < myGameArea.number.width && clickX + 2 < myGameArea.number.width &&
                    clickY + 1 < myGameArea.number.height && clickY + 2 < myGameArea.number.height) {
                    //moge tutaj budowac co chce
                    agreePath = true;
                } else {
                    //jesli wszystko wyzej sie popsuje to tez nie zezwalam na budowe
                    agreePath = false;
                }
            });
            if (agreePath === true && notAgreePath === 0 && notAgreeTurrets === 0) {
                removeAndBuild(e.pageX, e.pageY);
                console.log("moge budować")
            } else {
                console.log("nie moge ")
                window.alert("Nie można tutaj budować!")
            }
        }
    },
    drawTurret: function () {
        //rysowanie wiez z arrayu
        this.ctx_3.clearRect(0, 0, this.canvas_3.width, this.canvas_3.height)
        console.log(this.turretsArray)
        this.turretsArray.forEach(e => {
            this.ctx_3.drawImage(e.img, e.x, e.y, e.width, e.height);
        });
    },
    createEnemy: function () {
        let poziom = 15; // "poziom" ile potworow ma sie wygenerowacm bedzie to zalezne od poziomu
        this.enemyArray = []; //zawsze zeruje array
        for (let i = 0; i < poziom; i++) {
            //tworzenie potworków i dodawanie ich do arraya 
            this.createElement(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.img, this.enemyArray, this.enemyOne.health, this.enemyOne.index);
            this.enemyOne.x = this.enemyOne.x - this.oneBox / 2; // kazdy kolejny jest odsuniety od siebie
        }
        //tworzy nam to potworki ktore ide do zamku 
        this.interval = setInterval(() => {
            this.engine();
        }, 1000); // predkosc poruszania sie bestii
    },
    engine: function () {
        //  console.log(2 * Math.PI * 17)
        // sprawdza czy sa potworki w arrau 
        // let grd = this.ctx_2.createRadialGradient(75, 50, 5, 90, 60, 100);
        // grd.addColorStop(0, "red");
        // grd.addColorStop(1, "white");
        if (this.enemyArray.length != 0) {
            this.ctx_2.clearRect(0, 0, this.canvas_2.width, this.canvas_2.height) // czysci nam mape z potworków
            this.enemyArray.forEach(element => {
                // jesli droga przebyta przez potworka jest mniejsza od drogi to maszeruja 
                if (element.index < this.enemypathArray.length) {
                    //rysowanie i przemieszczanie potworkami
                    if (element.x < this.enemypathArray[0].x) {
                        element.x = element.x + this.oneBox / 2;
                    } else {
                        // console.log("HALO KURWA")

                        element.x = this.enemypathArray[element.index].x + 5;
                        element.y = this.enemypathArray[element.index].y + 5;

                        this.ctx_2.fillRect(element.x, element.y, element.width, element.height);
                        // this.ctx_2.beginPath();
                        // this.ctx_2.lineCap = "round";
                        // this.ctx_2.strokeStyle = "#FF0000";
                        // this.ctx_2.lineWidth = 4;
                        // this.ctx_2.moveTo(element.x, element.y);
                        // this.ctx_2.lineTo(element.x+element.life, element.y);
                        // this.ctx_2.stroke();
                        element.index = element.index + 1;
                        this.turretsArray.forEach(el => {
                            //  console.log("HALO KURWA222222222222222")
                            let TopLeftX = el.x + this.oneBox - el.range / 2;
                            let TopLeftY = el.y + this.oneBox - el.range / 2;
                            let TopRightX = TopLeftX + el.range;
                            let TopRightY = TopLeftY;
                            let BottomRightX = TopRightX;
                            let BottomRightY = TopRightY + el.range;
                            let BottomLeftX = BottomRightX - el.range;
                            let BottomLeftY = BottomRightY;
                            this.ctx_3.beginPath();
                            this.ctx_3.rect(TopLeftX, TopLeftY, el.range, el.range)
                            this.ctx_3.stroke();
                            //   let range = el.range/2;

                            // console.log("początkowe X" + el.x)
                            // console.log("początkowe Y" + el.y)

                            // console.log(TopLeftX)
                            // console.log(TopLeftY)
                            // console.log(BottomLeftX)
                            // console.log(TopLeftX, TopLeftY, TopRightX, BottomRightY)
                            if (element.x >= TopLeftX && element.x <= TopRightX && element.y >= TopLeftY && element.y <= BottomLeftY) {
                                console.log("strzal")

                            }
                        })
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


    },

    createElement: function (width, height, x, y, img, path, life, index, range) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.img = img;
        object.life = life;
        object.index = index;
        object.range = range;
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