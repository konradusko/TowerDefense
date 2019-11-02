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
    canvas_6: document.getElementById("canvas6"), // tekst
    ctx_6: undefined,
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
        health: 100,
        move: 0,
        index: 1,
        money: 0,
        speed: 1200,
        color: "black",
        dmg: 5,
    },
    turretOne: {
        x: 0,
        y: 0,
        width: 40,
        height: 40,
        range: 40,
        dmg: 35,
        speed: 1200,
        img: document.getElementById("wiezaImg"),
        color_ammo: "red",
        price: 50,
    },
    turretTwo: {
        x: 0,
        y: 0,
        width: 40,
        height: 80,
        range: 80,
        dmg: 60,
        speed: 800,
        img: document.getElementById("wiezaImg2"),
        color_ammo: "blue",
        price: 150,
    },
    turretThree: {
        x: 0,
        y: 0,
        width: 40,
        height: 120,
        range: 120,
        dmg: 90,
        speed: 500,
        img: document.getElementById("wiezaImg3"),
        color_ammo: "purple",
        price: 250,
    },
    interval: undefined,
    interval_2: undefined,
    lvl: 12,
    clickShowAndHide: undefined, // zmienna do pokazywania i chowania zasiegu wiezy
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
    turretsArray: [],
    enemyInRangeArray: [],
    money: 99999999999999999,
    numberOfEnemy: 5, //ile potworow ma sie pojawic // zalezne od poziomu
    colors: [],
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
        this.ctx_6 = this.canvas_6.getContext("2d");
        this.canvas_6.height = 600;
        this.canvas_6.width = 800;
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
                    let TopLeftX = el.x - this.oneBox / 2 - el.range;
                    let TopLeftY = el.y - this.oneBox / 2 - el.range;
                    this.ctx_4.beginPath();
                    this.ctx_4.strokeStyle = "red";
                    this.ctx_4.lineWidth = 2;
                    this.ctx_4.rect(TopLeftX, TopLeftY, el.width + this.oneBox + el.range * 2, el.height + this.oneBox + el.range * 2);
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
        border.style.paddingTop = turret.range + "px";
        border.style.paddingBottom = turret.range + turret.height + this.oneBox + "px";
        border.style.paddingLeft = turret.range + "px";
        border.style.paddingRight = turret.range + turret.width + this.oneBox + "px";
        console.log(turret.range)
        border.style.zIndex = 10;
        border.id = border;
        border.style.left = e.pageX - turret.range + "px";
        border.style.top = e.pageY - turret.range + "px";
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
            border.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad - turret.range + "px";
            border.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad - turret.range + "px";
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
            myGameArea.createTurret(turret.width, turret.height, x, y, turret.range, turret.dmg, turret.speed, turret.img, myGameArea.turretsArray, index, turret.color_ammo, turret.price)
            myGameArea.map.removeEventListener("mousemove", position);
            myGameArea.map.removeEventListener("click", removeAndBuild);
            document.getElementById(imageTurret).remove();
            document.getElementById(border).remove();
            document.getElementById(background).remove();
            myGameArea.ctx_3.drawImage(turret.img, x, y, turret.width, turret.height);
            console.log(myGameArea.turretsArray)
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
    stats: function () {
        this.enemyOne.x = 5;
        this.enemyOne.move = 0;
        this.enemyOne.index = 1; //globalne zawsze tyle samo wynosza
        // this.enemyOne.speed = this.enemyOne.speed; 
        //speed co 5 lvli
        if (this.lvl <= 10) {
            switch (this.lvl) {
                case 2:
                    this.numberOfEnemy = this.numberOfEnemy + 2;
                    this.enemyOne.color = "Brown";
                    this.enemyOne.money = this.enemyOne.money + 5;
                    this.enemyOne.health = this.enemyOne.health + 2;
                    break;
                case 3:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "DarkOliveGreen";
                    this.enemyOne.money = this.enemyOne.money + 7;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 4:
                    this.numberOfEnemy = this.numberOfEnemy + 4;
                    this.enemyOne.color = "DarkTurquoise ";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 5:
                    this.numberOfEnemy = this.numberOfEnemy + 3;
                    this.enemyOne.color = "FloralWhite ";
                    this.enemyOne.speed = this.enemyOne.speed - 70;
                    this.enemyOne.money = this.enemyOne.money + 10;
                    this.enemyOne.health = this.enemyOne.health + 10;
                    break;
                case 6:
                    this.numberOfEnemy = this.numberOfEnemy + 2;
                    this.enemyOne.color = "GoldenRod ";
                    this.enemyOne.money = this.enemyOne.money + 5;
                    this.enemyOne.health = this.enemyOne.health + 2;
                    break;
                case 7:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "HotPink";
                    this.enemyOne.money = this.enemyOne.money + 7;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 8:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "LightSeaGreen";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 9:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "Sienna";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 10:
                    this.numberOfEnemy = this.numberOfEnemy + 3;
                    this.enemyOne.color = "Peru";
                    this.enemyOne.speed = this.enemyOne.speed - 70;
                    this.enemyOne.money = this.enemyOne.money + 10;
                    this.enemyOne.health = this.enemyOne.health + 10;
                    this.enemyOne.dmg = this.enemyOne.dmg + 5;
                    break;
            }
        } else {
            this.colors = [];
            for (let i = 0; i <= 3; i++) {
                this.backgroundGenerator();
            }
            this.enemyOne.color = "gradient";
        }
        this.startGameLoop();
    },
    backgroundGenerator: function () {
        let RcO_1 = "#000000".replace(/0/g, () => {
            return (~~(Math.random() * 16)).toString(16);
        });
        this.colors.push(RcO_1);
    },
    startGameLoop: function () {
        for (let i = 0; i < this.numberOfEnemy; i++) {
            this.createEnemy(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.health,
                this.enemyOne.index, this.enemyOne.move, this.enemyOne.money, this.enemyOne.speed, this.enemyOne.color, this.enemyOne.dmg, this.enemyArray);
            this.enemyOne.x = this.enemyOne.x - this.oneBox; // kazdy kolejny jest odsuniety od siebie
            this.enemyOne.index = this.enemyOne.index + 1;
        }
        console.log(this.enemyArray);
        //tworzy nam to potworki ktore ide do zamku 
        this.interval = setInterval(() => {
            this.enemyMove();
        }, this.enemyOne.speed); // predkosc poruszania sie bestii
    },
    enemyMove: function () {
        if (this.enemyArray.length != 0) {
            this.enemyArray.forEach(enemy => {
                // jesli droga przebyta przez potworka jest mniejsza od drogi to maszeruja 
                if (enemy.move < this.enemypathArray.length) {
                    //rysowanie i przemieszczanie potworkami
                    //jezeli jeszcze ich nie ma na mapie 
                    if (enemy.x < this.enemypathArray[0].x) {
                        enemy.x = enemy.x + this.oneBox;
                    } else {
                        enemy.x = this.enemypathArray[enemy.move].x + 5;
                        enemy.y = this.enemypathArray[enemy.move].y + 5;
                        enemy.move = enemy.move + 1;
                        // this.Mybackground_gr = this.ctx_2.createLinearGradient(enemy.x, enemy.y, enemy.x+enemy.width, enemy.y+enemy.height)
                        //   this.test(enemy.x, enemy.y, enemy.x+enemy.width*2, enemy.y+enemy.height*2);
                        this.drawEnemy();
                    }
                } else if (enemy.move == this.enemypathArray.length) {
                    //potworek dotarl do zamku
                    this.castle.health = this.castle.health - enemy.dmg;
                    if (this.castle.health <= 0) {
                        //jesli zamek ma 0 hp to koniec zabawy
                        window.alert("gameover");
                    }
                    this.enemyArray.shift(enemy);
                    this.drawEnemy();

                }
            });
        } else {
            // nie ma juz zadnych potworków to zeruje interval
            this.drawEnemy();
            clearInterval(this.interval);
            this.loop();

        }
    },
    loop: function () {
        this.lvl = this.lvl + 1;

        function text(counter) {
            if (counter > 0) {
                counter--;
                myGameArea.ctx_6.font = "40px Comic Sans MS";
                myGameArea.ctx_6.fillStyle = "crimson";
                myGameArea.ctx_6.textAlign = "center";
                myGameArea.ctx_6.fillText("Następna fala złych kwadratów za " + counter, myGameArea.canvas_6.width / 2, myGameArea.canvas_6.height / 2);
                setTimeout(() => {
                    myGameArea.ctx_6.clearRect(0, 0, myGameArea.canvas_6.width, myGameArea.canvas_6.height);
                    text(counter);
                }, 1000);
            } else {
                myGameArea.stats();
            }
        }
        text(6);
    },
    startShootLoop: function (Turret) {
        console.log(this.turretsArray);
        Turret.interval = setInterval(() => {
            this.turretShoot(Turret);
        }, Turret.speed)
    },
    turretShoot: function (T) {
        let bol = true;
        let TopLeftX = T.x - this.oneBox / 2 - T.range;
        let TopLeftY = T.y - this.oneBox / 2 - T.range;
        if (this.enemyArray != 0) {
            this.enemyArray.forEach(enemy => { // robaczki
                if (enemy.x >= TopLeftX && enemy.x <= TopLeftX + T.width + this.oneBox + T.range * 2 &&
                    enemy.y >= TopLeftY && enemy.y <= TopLeftY + T.height + this.oneBox + T.range * 2) {
                    if (enemy.x >= 0) { // czy enemy jeszcze nie jest poza mapa
                        if (bol == true) {
                            this.animateShoot(enemy, T);
                            bol = false;
                        }
                    }

                }
            })
        }
    },
    drawEnemy: function () {
        //  console.log(this.enemyArray)
        this.ctx_2.clearRect(0, 0, this.canvas_2.width, this.canvas_2.height);
        if (this.enemyArray != 0) {
            this.enemyArray.forEach(enemy => {
                if (this.enemyOne.color == "gradient") {
                    let my_gradient = this.ctx_2.createLinearGradient(enemy.x, enemy.y, enemy.width + enemy.x, enemy.height + enemy.y);
                    my_gradient.addColorStop(0, this.colors[0]);
                    my_gradient.addColorStop(0.5, this.colors[1]);
                    my_gradient.addColorStop(0.7, this.colors[2]);
                    my_gradient.addColorStop(0.9, this.colors[3]);
                    this.ctx_2.fillStyle = my_gradient;
                } else {
                    this.ctx_2.fillStyle = enemy.color;
                }

                this.ctx_2.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                if (enemy.health <= this.enemyOne.health / 4) {
                    //25%
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + 5, enemy.y + 5, 20, 20);
                } else if (enemy.health <= this.enemyOne.health - (this.enemyOne.health / 2)) {
                    //50% hp
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + 5, enemy.y + 5, 15, 15);
                } else if (enemy.health <= this.enemyOne.health - (this.enemyOne.health / 4)) {
                    //75% hp
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
                }
            })
        }
    },
    animateShoot: function (e, w) {
        //e potworek, w wieza
        let object = new Object();
        object.x = w.x;
        object.y = w.y;
        object.width = 15;
        object.height = 15;
        object.color = w.ammo;
        object.EndPointX = e.x;
        object.EndPointaY = e.y;
        object.interval = setInterval(() => {
            this.ctx_5.clearRect(object.x, object.y, object.width, object.height)
            //jesli pocisk jest tam gdzie potworek zadaje mu dmg
            // ssprawdza czy przypadkiem go nie przekrecilo i odswieza potworki
            if (Math.floor(object.x / this.oneBox) == Math.floor(object.EndPointX / this.oneBox) &&
                Math.floor(object.y / this.oneBox) == Math.floor(object.EndPointaY / this.oneBox)) {
                e.health = e.health - w.dmg;
                if (e.health <= 0) {
                    this.enemyArray.shift(e);
                    this.money = this.money + e.money;
                }
                this.drawEnemy();
                this.ctx_5.clearRect(object.x, object.y, object.width, object.height)
                clearInterval(object.interval)
                delete object;
            } else {
                // sprawdza jak daleko pocisk jest od potworka i o ile ma sie jeszcze przemiescic
                if (object.x > object.EndPointX) {
                    object.x = Math.floor(object.x - Math.abs((object.x - object.EndPointX) / 3));
                } else if (object.x < object.EndPointX) {
                    object.x = Math.floor(object.x + Math.abs((object.x - object.EndPointX) / 3));
                }

                if (object.y > object.EndPointaY) {
                    object.y = Math.floor(object.y - Math.abs((object.y - object.EndPointaY) / 3));
                } else if (object.y < object.EndPointaY) {
                    object.y = Math.floor(object.y + Math.abs((object.y - object.EndPointaY) / 3));
                }
                this.ctx_5.fillStyle = object.color;
                this.ctx_5.fillRect(object.x, object.y, object.width, object.height)
            }
        }, 20)
    },
    createTurret: function (width, height, x, y, range, dmg, speed, img, path, index, ammo, price, interval) {
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
        object.ammo = ammo;
        object.price = price;
        path.push(object)
    },
    createEnemy: function (width, height, x, y, health, index, move, money, speed, color, dmg, path) {
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
        object.color = color;
        object.dmg = dmg;
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
window.addEventListener("load", () => {
    myGameArea.start();
})