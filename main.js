const myGameArea = {
    canvas: document.getElementById("canvas"), // mapa
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"), // potworki
    ctx_2: undefined,
    canvas_3: document.getElementById("canvas3"), // wieze
    ctx_3: undefined,
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
        lifeForCastle: document.getElementById("moreLife"),
        turretRangeAndPosition: document.getElementById("imgTurret"),
        previousTurret: document.getElementById("previousTurret"),
        nextTurret: document.getElementById("nextTurret"),
        add_RangeBTN: document.getElementById("add_Range"),
        add_DmgBTN: document.getElementById("add_Dmg"),
        change_volume: document.getElementById("Volume_Button"),
        mute_button: document.getElementById("mute_button"),

    },
    castleHealthElement: document.getElementById("castleLife"),
    castlePriceForBetterLifeElement: document.getElementById("PriceForBetterLife"),
    lvlElement: document.getElementById("lvl"),
    goldElement: document.getElementById("gold"),
    map: document.getElementById("map"),
    box_betterRange: document.getElementById("containerForBetterRange"),
    box_BetterDMG: document.getElementById("containerForBetterDMG"),
    myPresentRange: document.getElementById("MyPresentRange"),
    PriceForBetterPower: document.getElementById("PriceForBetterPower"),
    PriceForBetterDmg: document.getElementById("PriceForBetterDmg"),
    MyPresentDmg: document.getElementById("MyPresentDmg"),
    body: document.getElementById("body"),
    castle: {
        width: 160,
        height: 120,
        x: 0,
        y: 480,
        img: document.getElementById("castleImg"),
        health: 100,
        lvl_health: 1,
        price_for_better_life: 150
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
        money: 5,
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
        dmg: 30,
        speed: 1200,
        img: document.getElementById("wiezaImg"),
        color_ammo: "red",
        price: 500,
        lvl_DMG: 1, //poziom ulepszenia  dmg
        lvl_range: 1, // poziom ulepszenia range
        maxLvl: 4,
    },
    turretTwo: {
        x: 0,
        y: 0,
        width: 40,
        height: 80,
        range: 80,
        dmg: 60,
        speed: 900,
        img: document.getElementById("wiezaImg2"),
        color_ammo: "blue",
        price: 2000,
        lvl_DMG: 1, //poziom ulepszenia  dmg
        lvl_range: 1, // poziom ulepszenia range
        maxLvl: 5,
    },
    turretThree: {
        x: 0,
        y: 0,
        width: 40,
        height: 120,
        range: 120,
        dmg: 90,
        speed: 700,
        img: document.getElementById("wiezaImg3"),
        color_ammo: "purple",
        price: 9000,
        lvl_DMG: 1, //poziom ulepszenia  dmg
        lvl_range: 1, // poziom ulepszenia range
        maxLvl: 3,
    },
    interval: undefined,
    interval_2: undefined,
    lvl: 1,
    enemypathArray: [], //scieżka dla przeciwników array
    grasspathArray: [],
    enemyArray: [], //dla potworków
    turretsArray: [],
    enemyInRangeArray: [],
    money: 1700,
    numberOfEnemy: 10, //ile potworow ma sie pojawic // zalezne od poziomu
    colors: [],
    numberOfTurret: undefined,
    presentNumberOfTurret: undefined,
    allowToBuild: true,
    sounds: {
        mute: false,
        build_Turret: document.getElementById("build_Turret"),
        click_not_allow: document.getElementById("Click_Not_Allow"),
        Enemy_got_hit: document.getElementById("Enemy_got_hit"),
        shoot_audio: document.getElementById("Turret_shoot"),
        move_audio: document.getElementById("Enemy_move"),
        Castle_got_hit: document.getElementById("Castle_got_hit")
    },
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
        this.number.width = this.canvas.width / this.oneBox; //ile kratek szerokosci
        this.number.height = this.canvas.height / this.oneBox //ile kratek wysokosci
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
        let promise = new Promise(function (resolve, reject) {
            let x = 0;
            myGameArea.grasspathArray.forEach(element => {
                myGameArea.drawElement(element.width, element.height, element.img, element.x, element.y); //rysowanie trawy
                x = x + 1
            });
            if (x == myGameArea.grasspathArray.length) {
                resolve();
            }
        })
        this.enemypathArray.forEach(el => {
            this.drawElement(el.width, el.height, el.img, el.x, el.y); //rysowanie sciezki
        });
        this.drawElement(this.castle.width, this.castle.height, this.castle.img, this.castle.x, this.castle.y); // i pan zamek
        this.innerTurrets();
        //wyswietlanie
        this.buttons.change_volume.value = 0.1;
        this.sounds.click_not_allow.volume = 0.1;
        this.sounds.build_Turret.volume = 0.1;
        this.sounds.Enemy_got_hit.volume = 0.1;
        this.sounds.shoot_audio.volume = 0.1;
        this.sounds.move_audio.volume = 0.1;
        this.sounds.Castle_got_hit.volume = 0.1;
        this.castleHealthElement.innerHTML = this.castle.health;
        this.goldElement.innerHTML = this.money;
        this.lvlElement.innerHTML = this.lvl;
        this.castlePriceForBetterLifeElement.innerHTML = this.castle.price_for_better_life;
        promise.then(() => {
            setTimeout(() => {
                window.alert("Build your defense turrets and press  'Play'");
                this.buttonsEvents();
            }, 500);

        })
    },
    buttonsEvents: function () {
        //button play rozpoczyna gre
        this.buttons.play.addEventListener("click", () => {
            this.startGameLoop();
            this.buttons.play.style.display = "none";
        });
        //mutowanie dzwieku
        this.buttons.mute_button.addEventListener("click", () => {
            if (this.sounds.mute != false) {
                this.sounds.mute = false;
                this.buttons.mute_button.innerHTML = "Mute";
            } else {
                this.sounds.mute = true;
                this.buttons.mute_button.innerHTML = "UnMute";
            }
        })
        //zmiana volume
        this.buttons.change_volume.addEventListener("change", () => {
            let value = this.buttons.change_volume.value;
            this.sounds.click_not_allow.volume = value / 10;
            this.sounds.build_Turret.volume = value / 10;
            this.sounds.Enemy_got_hit.volume = value / 10;
            this.sounds.shoot_audio.volume = value / 10;
            this.sounds.move_audio.volume = value / 10;
            this.sounds.Castle_got_hit.volume = value / 10;
        })
        //wieza na mapie
        window.addEventListener("click", (e) => {
            let x = Math.floor(e.pageX / this.oneBox);
            let y = Math.floor(e.pageY / this.oneBox);
            this.turretsArray.forEach(turret => {
                if (x >= Math.floor(turret.x / this.oneBox) && x <= Math.floor((turret.x + turret.width) / this.oneBox) &&
                    y >= Math.floor(turret.y / this.oneBox) && y <= Math.floor((turret.y + turret.height) / this.oneBox)) {
                    this.presentNumberOfTurret = turret.index;
                    this.numberOfTurret = this.turretsArray.length;
                    this.show();
                    this.innerTurrets(this.turretsArray[turret.index - 1])
                    document.getElementById("presentTurret").innerHTML = this.presentNumberOfTurret;
                    document.getElementById("howMenyTurrets").innerHTML = this.numberOfTurret;
                }
            });
        })
        //budowanie wiezy nr 1
        this.buttons.turretOneButton.addEventListener("click", (e) => {
            if (this.money >= this.turretOne.price && this.allowToBuild == true) {
                this.createTurretImg(e, this.turretOne);
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }

        });
        // budowanie wiezy nr2
        this.buttons.turretTwoButton.addEventListener("click", (e) => {
            if (this.money >= this.turretTwo.price && this.allowToBuild == true) {
                this.createTurretImg(e, this.turretTwo);
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }
        });
        //budowanie wiezy nr 3
        this.buttons.turretThreeButton.addEventListener("click", (e) => {
            if (this.money >= this.turretThree.price && this.allowToBuild == true) {
                this.createTurretImg(e, this.turretThree);
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }

        });
        // dodaje 50 hp panu zamkowi
        this.buttons.lifeForCastle.addEventListener("click", () => {
            if (this.money >= this.castle.price_for_better_life * this.castle.lvl_health) {
                this.castle.health = this.castle.health + 50;
                this.castleHealthElement.innerHTML = this.castle.health;
                this.money = this.money - this.castle.price_for_better_life * this.castle.lvl_health;
                this.goldElement.innerHTML = this.money;
                this.castle.lvl_health = this.castle.lvl_health + 1;
                this.castlePriceForBetterLifeElement.innerHTML = this.castle.price_for_better_life * this.castle.lvl_health;
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }

        });
        //poprzednia wieza w menu do ulepszania
        this.buttons.previousTurret.addEventListener("click", () => {
            if (this.presentNumberOfTurret != 1 && this.allowToBuild == true) {
                this.presentNumberOfTurret = this.presentNumberOfTurret - 1;
                document.getElementById("presentTurret").innerHTML = this.presentNumberOfTurret;
                this.innerTurrets(this.turretsArray[this.presentNumberOfTurret - 1]);
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }
        });
        //nastepna wieza w menu do ulepszania
        this.buttons.nextTurret.addEventListener("click", () => {
            if (this.presentNumberOfTurret != this.numberOfTurret && this.allowToBuild == true) {
                this.presentNumberOfTurret = this.presentNumberOfTurret + 1;
                document.getElementById("presentTurret").innerHTML = this.presentNumberOfTurret;
                this.innerTurrets(this.turretsArray[this.presentNumberOfTurret - 1]);
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }
        });
        //pokazuje wieze na mapie oraz jej zasieg
        this.buttons.turretRangeAndPosition.addEventListener("click", () => {
            this.show();
        });
        //zwieksza zasieg wiezy
        this.buttons.add_RangeBTN.addEventListener("click", () => {
            let Turret = this.turretsArray[this.presentNumberOfTurret - 1];
            if (this.money >= Turret.price * Turret.lvl_range * (Turret.maxLvl + 3) && Turret.lvl_range < Turret.maxLvl && this.allowToBuild == true) {
                Turret.range = Turret.range + this.oneBox;
                this.money = this.money - Turret.price * Turret.lvl_range * (Turret.maxLvl + 3);
                Turret.lvl_range = Turret.lvl_range + 1;
                this.PriceForBetterPower.innerHTML = Turret.price * Turret.lvl_range * (Turret.maxLvl + 3);
                this.goldElement.innerHTML = this.money;
                this.myPresentRange.innerHTML = Turret.lvl_range
                if (Turret.lvl_range == Turret.maxLvl) {
                    this.box_betterRange.style.display = "none";
                }
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }
        });
        //zwieksza dmg wiezy
        this.buttons.add_DmgBTN.addEventListener("click", () => {
            let Turret = this.turretsArray[this.presentNumberOfTurret - 1];
            if (this.money >= Turret.price * Turret.lvl_DMG * (Turret.maxLvl + 3) && Turret.lvl_DMG < Turret.maxLvl && this.allowToBuild == true) {
                Turret.dmg = Turret.dmg + 10; // o 10 zwiekszam dmg
                this.money = this.money - Turret.price * Turret.lvl_DMG * (Turret.maxLvl + 3);
                Turret.lvl_DMG = Turret.lvl_DMG + 1;
                this.PriceForBetterDmg.innerHTML = Turret.price * Turret.lvl_DMG * (Turret.maxLvl + 3);
                this.goldElement.innerHTML = this.money;
                this.MyPresentDmg.innerHTML = Turret.lvl_DMG;
                if (Turret.lvl_DMG == Turret.maxLvl) {
                    this.box_BetterDMG.style.display = "none";
                }
            } else {
                if (this.sounds.mute == false) {
                    this.sounds.click_not_allow.play();
                }
            }
        })
    },
    show: function () {
        let Turret = this.turretsArray[this.presentNumberOfTurret - 1];
        let border = document.createElement("div");
        let background = document.createElement("div");
        border.style.position = "absolute";
        border.style.border = "2px solid red";
        border.style.paddingTop = Turret.range + "px";
        border.style.paddingBottom = Turret.range + Turret.height + this.oneBox + "px";
        border.style.paddingLeft = Turret.range + "px";
        border.style.paddingRight = Turret.range + Turret.width + this.oneBox + "px";
        border.style.left = Turret.x - this.oneBox / 2 - Turret.range + "px";
        border.style.top = Turret.y - this.oneBox / 2 - Turret.range + "px";
        border.id = border;
        background.style.position = "absolute";
        background.style.width = Turret.width + this.oneBox + "px";
        background.style.height = Turret.height + this.oneBox + "px";
        background.style.background = "purple";
        background.style.opacity = .8;
        background.id = background;
        background.style.left = Turret.x - this.oneBox / 2 + "px";
        background.style.top = Turret.y - this.oneBox / 2 + "px";
        this.map.append(border, background);
        setTimeout(() => {
            document.getElementById(border).remove();
            document.getElementById(background).remove();
        }, 5000);
    },
    //wyswietla wieze w menu
    innerTurrets: function (Turret) {
        const myMaxRange = document.getElementById("myMaxRange");
        const myMaxDmg = document.getElementById("myMaxDmg");
        const turretContainer = document.getElementById("turret_list");
        const numberOfTurretsContainer = document.getElementById("numberOfTurrets");
        if (this.turretsArray.length == 0) {
            turretContainer.style.display = "none";
            numberOfTurretsContainer.style.display = "none"
            this.buttons.previousTurret.style.display = "none";
            this.buttons.nextTurret.style.display = "none";
        } else {
            turretContainer.style.display = "flex";
            numberOfTurretsContainer.style.display = "block";
            this.buttons.previousTurret.style.display = "block";
            this.buttons.nextTurret.style.display = "block";
            if (Turret.lvl_DMG >= Turret.maxLvl) {
                this.box_BetterDMG.style.display = "none";
            } else {
                this.box_BetterDMG.style.display = "block";
            }
            if (Turret.lvl_range >= Turret.maxLvl) {
                this.box_betterRange.style.display = "none";
            } else {
                this.box_betterRange.style.display = "block";
            }
            this.buttons.turretRangeAndPosition.src = Turret.img.src; //obecny obrazek wiezy
            this.myPresentRange.innerHTML = Turret.lvl_range; //obecny poziom range mojej wiezy
            myMaxRange.innerHTML = Turret.maxLvl; //maksymanly poziom range mojej wiezy
            this.PriceForBetterDmg.innerHTML = Turret.price * Turret.lvl_DMG * (Turret.maxLvl + 3); //cena za ulepszenie dmg
            this.PriceForBetterPower.innerHTML = Turret.price * Turret.lvl_range * (Turret.maxLvl + 3); //cena za ulepszenie range
            this.MyPresentDmg.innerHTML = Turret.lvl_DMG; //obecny poziom dmg
            myMaxDmg.innerHTML = Turret.maxLvl;
        }
    },
    //tworzy nam wieze ktora mozemy postawic
    createTurretImg: function (e, turret) {
        this.allowToBuild = false;
        let numberOfquad = myGameArea.oneBox;
        let imageTurret = document.createElement("img");
        let border = document.createElement("div");
        let background = document.createElement("div");
        const your_turrets_container = document.getElementById("your_turrets");
        const deleteTurret = document.getElementById("DeleteTurretFromMouse");
        background.style.position = "absolute";
        background.style.width = turret.width + this.oneBox + "px";
        background.style.height = turret.height + this.oneBox + "px";
        background.style.background = "green";
        background.style.zIndex = 8;
        background.style.opacity = .5;
        background.id = "background";
        background.style.left = e.pageX + "px";
        background.style.top = e.pageY + "px";
        border.style.position = "absolute";
        border.style.border = "2px solid red";
        border.style.paddingTop = turret.range + "px";
        border.style.paddingBottom = turret.range + turret.height + this.oneBox + "px";
        border.style.paddingLeft = turret.range + "px";
        border.style.paddingRight = turret.range + turret.width + this.oneBox + "px";
        border.style.zIndex = 10;
        border.id = "border";
        border.style.left = e.pageX - turret.range + "px";
        border.style.top = e.pageY - turret.range + "px";
        imageTurret.src = turret.img.src;
        imageTurret.style.width = turret.width + "px";
        imageTurret.style.height = turret.height + "px";
        imageTurret.style.zIndex = 9;
        imageTurret.id = "imageTurret";
        imageTurret.style.position = "absolute";
        imageTurret.style.left = e.pageX + this.oneBox / 2 + "px";
        imageTurret.style.top = e.pageY + this.oneBox / 2 + "px";
        let castlePositionY = this.castle.y / this.oneBox;
        let castlePositionX = this.castle.x;
        let castleWidth = this.castle.width / this.oneBox - 1;
        let castleHeight = this.castle.height / this.oneBox;
        this.map.append(imageTurret, border, background);
        this.map.addEventListener("mousemove", position)
        your_turrets_container.style.display = "none";
        deleteTurret.style.display = "flex";
        previousTurret.style.display = "none"
        nextTurret.style.display = "none"
        //sprawdza czy mozemy tu budowac
        function position(e) {
            imageTurret.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad + numberOfquad / 2 + "px";
            imageTurret.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad + numberOfquad / 2 + "px";
            border.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad - turret.range + "px";
            border.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad - turret.range + "px";
            background.style.left = Math.floor(e.pageX / numberOfquad) * numberOfquad + "px";
            background.style.top = Math.floor(e.pageY / numberOfquad) * numberOfquad + "px";
            let bol = ifIcanBuildHereTurret(e);
            if (bol == true) {
                background.style.background = "green";
                myGameArea.map.addEventListener("click", removeAndBuild) //mozna budowac
            } else {
                background.style.background = "red";
                myGameArea.body.addEventListener("click", Remove)
                myGameArea.map.removeEventListener("click", removeAndBuild); //nie mozna budowac
            }
        }
        //jak zrezygnujemy z budowy
        function Remove(e) {
            if (e.target.id == "DeleteTurretFromMouse" || e.target.classList == "auto") {
                your_turrets_container.style.display = "block";
                deleteTurret.style.display = "none";
                if (myGameArea.turretsArray.length > 0) {
                    previousTurret.style.display = "block"
                    nextTurret.style.display = "block"
                }
                myGameArea.allowToBuild = true;
                document.getElementById("imageTurret").remove();
                document.getElementById("border").remove();
                document.getElementById("background").remove();
                myGameArea.map.removeEventListener("mousemove", position);
                myGameArea.map.removeEventListener("click", removeAndBuild);
                myGameArea.body.removeEventListener("click", Remove)
            }
        }
        //buduje
        function removeAndBuild(e) {
            myGameArea.allowToBuild = true;
            your_turrets_container.style.display = "block";
            deleteTurret.style.display = "none";
            previousTurret.style.display = "block"
            nextTurret.style.display = "block"
            let x = Math.floor(e.pageX / numberOfquad) * myGameArea.oneBox + myGameArea.oneBox / 2;
            let y = Math.floor(e.pageY / numberOfquad) * myGameArea.oneBox + myGameArea.oneBox / 2;
            let index = myGameArea.turretsArray.length + 1;
            myGameArea.createTurret(turret.width, turret.height, x, y, turret.range, turret.dmg, turret.speed, turret.img, myGameArea.turretsArray, index, turret.color_ammo, turret.price, turret.lvl_DMG, turret.lvl_range, turret.maxLvl)
            myGameArea.map.removeEventListener("mousemove", position);
            myGameArea.map.removeEventListener("click", removeAndBuild);
            myGameArea.body.removeEventListener("click", Remove)
            document.getElementById("imageTurret").remove();
            document.getElementById("border").remove();
            document.getElementById("background").remove();
            myGameArea.ctx_3.drawImage(turret.img, x, y, turret.width, turret.height);
            myGameArea.startShootLoop(myGameArea.turretsArray.slice(-1)[0]);
            myGameArea.money = myGameArea.money - turret.price;
            myGameArea.goldElement.innerHTML = myGameArea.money;
            if (myGameArea.sounds.mute == false) {
                myGameArea.sounds.build_Turret.play();
            }
        }
        //oblicza czy mozemy tutaj budowac
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
        //speed max 500
        if (this.lvl <= 10) {
            switch (this.lvl) {
                case 2:
                    this.numberOfEnemy = this.numberOfEnemy + 2;
                    this.enemyOne.color = "Brown";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 2;
                    break;
                case 3:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "DarkOliveGreen";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 4:
                    this.numberOfEnemy = this.numberOfEnemy + 6;
                    this.enemyOne.color = "DarkTurquoise ";
                    this.enemyOne.money = this.enemyOne.money + 2;
                    this.enemyOne.health = this.enemyOne.health + 7;
                    break;
                case 5:
                    this.numberOfEnemy = this.numberOfEnemy + 3;
                    this.enemyOne.color = "FloralWhite ";
                    this.enemyOne.speed = this.enemyOne.speed - 50;
                    this.enemyOne.money = this.enemyOne.money + 10;
                    this.enemyOne.health = this.enemyOne.health + 10;
                    break;
                case 6:
                    this.numberOfEnemy = this.numberOfEnemy + 2;
                    this.enemyOne.color = "GoldenRod ";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 5;
                    break;
                case 7:
                    this.numberOfEnemy = this.numberOfEnemy + 4;
                    this.enemyOne.color = "HotPink";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 3;
                    break;
                case 8:
                    this.numberOfEnemy = this.numberOfEnemy + 1;
                    this.enemyOne.color = "LightSeaGreen";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 5;
                    break;
                case 9:
                    this.numberOfEnemy = this.numberOfEnemy + 5;
                    this.enemyOne.color = "Sienna";
                    this.enemyOne.money = this.enemyOne.money + 1;
                    this.enemyOne.health = this.enemyOne.health + 5;
                    break;
                case 10:
                    this.numberOfEnemy = this.numberOfEnemy + 7;
                    this.enemyOne.color = "Peru";
                    this.enemyOne.speed = this.enemyOne.speed - 300;
                    this.enemyOne.money = this.enemyOne.money + 2;
                    this.enemyOne.health = this.enemyOne.health + 10;
                    this.enemyOne.dmg = this.enemyOne.dmg + 5;
                    break;
            }
        } else if (this.lvl < 20) {
            if (this.lvl == 20) {
                this.enemyOne.speed = this.enemyOne.speed - 200;
                this.enemyOne.health = this.enemyOne.health + 60;
            }
            this.colors = [];
            for (let i = 0; i <= 3; i++) {
                this.backgroundGenerator();
            }
            this.numberOfEnemy = this.numberOfEnemy + 16;
            this.enemyOne.money = this.enemyOne.money + 1;
            this.enemyOne.health = this.enemyOne.health + 32;
            this.enemyOne.dmg = this.enemyOne.dmg + 3;
            this.enemyOne.color = "gradient";

        } else if (this.lvl < 30) {
            if (this.lvl == 30) {
                this.enemyOne.speed = this.enemyOne.speed - 150;
                this.enemyOne.money = this.enemyOne.money - 20;
            }
            this.colors = [];
            for (let i = 0; i <= 5; i++) {
                this.backgroundGenerator();
            }
            this.numberOfEnemy = this.numberOfEnemy + 20;
            this.enemyOne.health = this.enemyOne.health + 55;
            this.enemyOne.dmg = this.enemyOne.dmg + 1;
            this.enemyOne.color = "gradient_2";
        } else if (this.lvl > 30) {
            if (this.lvl == 50) {
                this.enemyOne.speed = this.enemyOne.speed - 150
            }
            this.colors = [];
            for (let i = 0; i <= 10; i++) {
                this.backgroundGenerator();
            }
            this.enemyOne.color = "gradient_3";
            this.numberOfEnemy = this.numberOfEnemy + 30;
            this.enemyOne.health = this.enemyOne.health + 65;
            this.enemyOne.dmg = this.enemyOne.dmg + 2;
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
                        enemy.x = this.enemypathArray[enemy.move].x + (this.oneBox - enemy.width) / 2;
                        enemy.y = this.enemypathArray[enemy.move].y + (this.oneBox - enemy.height) / 2;
                        enemy.move = enemy.move + 1;
                        if (this.sounds.mute == false) {
                            this.sounds.move_audio.play();
                        }
                        this.drawEnemy();
                    }
                } else if (enemy.move == this.enemypathArray.length) {
                    //potworek dotarl do zamku
                    this.castle.health = this.castle.health - enemy.dmg;
                    if (this.sounds.mute == false) {
                        this.sounds.Castle_got_hit.play();
                    }
                    this.castleHealthElement.innerHTML = this.castle.health;
                    if (this.castle.health <= 0) {
                        //jesli zamek ma 0 hp to koniec zabawy
                        this.enemyArray = [];
                        window.alert("GameOver");

                        location.reload();
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
        this.lvlElement.innerHTML = this.lvl;
        if (this.lvl < 20) {
            this.castle.health = this.castle.health + 2 * this.lvl;
            this.castleHealthElement.innerHTML = this.castle.health;
        }
        if (this.lvl < 10) {
            this.money = this.money + 50;
            this.goldElement.innerHTML = this.money;
        }

        function text(counter) {
            if (counter > 0) {
                counter--;
                myGameArea.ctx_6.font = "40px Comic Sans MS";
                myGameArea.ctx_6.fillStyle = "crimson";
                myGameArea.ctx_6.textAlign = "center";
                myGameArea.ctx_6.fillText("Bad squares appear behind " + counter, myGameArea.canvas_6.width / 2, myGameArea.canvas_6.height / 2);
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
                            if (this.sounds.mute == false) {
                                this.sounds.shoot_audio.play();
                            }
                            this.animateShoot(enemy, T);
                            bol = false;
                        }
                    }
                }
            })
        }
    },
    drawEnemy: function () {
        this.ctx_2.clearRect(0, 0, this.canvas_2.width, this.canvas_2.height);
        if (this.enemyArray != 0) {
            this.enemyArray.forEach(enemy => {
                if (this.enemyOne.color == "gradient") {
                    let my_gradient = this.ctx_2.createLinearGradient(enemy.x, enemy.y, enemy.width + enemy.x, enemy.height + enemy.y);
                    my_gradient.addColorStop(0, this.colors[0]);
                    my_gradient.addColorStop(0.4, this.colors[1]);
                    my_gradient.addColorStop(0.7, this.colors[2]);
                    my_gradient.addColorStop(1, this.colors[3]);
                    this.ctx_2.fillStyle = my_gradient;
                } else if (this.enemyOne.color == "gradient_2") {
                    let my_gradient = this.ctx_2.createLinearGradient(enemy.x, enemy.y, enemy.width + enemy.x, enemy.height + enemy.y);
                    my_gradient.addColorStop(0, this.colors[0]);
                    my_gradient.addColorStop(0.2, this.colors[1]);
                    my_gradient.addColorStop(0.4, this.colors[2]);
                    my_gradient.addColorStop(0.6, this.colors[3]);
                    my_gradient.addColorStop(0.8, this.colors[4]);
                    my_gradient.addColorStop(1, this.colors[5]);
                    this.ctx_2.fillStyle = my_gradient;
                } else if (this.enemyOne.color == "gradient_3") {
                    let my_gradient = this.ctx_2.createLinearGradient(enemy.x, enemy.y, enemy.width + enemy.x, enemy.height + enemy.y);
                    my_gradient.addColorStop(0, this.colors[0]);
                    my_gradient.addColorStop(0.1, this.colors[1]);
                    my_gradient.addColorStop(0.2, this.colors[2]);
                    my_gradient.addColorStop(0.3, this.colors[3]);
                    my_gradient.addColorStop(0.4, this.colors[4]);
                    my_gradient.addColorStop(0.5, this.colors[5]);
                    my_gradient.addColorStop(0.6, this.colors[6]);
                    my_gradient.addColorStop(0.7, this.colors[7]);
                    my_gradient.addColorStop(0.8, this.colors[8]);
                    my_gradient.addColorStop(0.9, this.colors[9]);
                    my_gradient.addColorStop(1, this.colors[10]);
                    this.ctx_2.fillStyle = my_gradient;
                } else {
                    this.ctx_2.fillStyle = enemy.color;
                }

                this.ctx_2.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                if (enemy.health <= this.enemyOne.health / 4) {
                    //25%
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + (this.oneBox - enemy.width) / 2, enemy.y + (this.oneBox - enemy.height) / 2, (this.oneBox - enemy.width) * 2, (this.oneBox - enemy.height) * 2);
                } else if (enemy.health <= this.enemyOne.health - (this.enemyOne.health / 2)) {
                    //50% hp
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + (this.oneBox - enemy.width) / 2, enemy.y + (this.oneBox - enemy.height) / 2, enemy.width / 2, enemy.height / 2);
                } else if (enemy.health <= this.enemyOne.health - (this.enemyOne.health / 4)) {
                    //75% hp
                    this.ctx_2.fillStyle = "red";
                    this.ctx_2.fillRect(enemy.x + (this.oneBox - enemy.width) / 2, enemy.y + (this.oneBox - enemy.height) / 2, (this.oneBox - enemy.width) / 2, (this.oneBox - enemy.height) / 2);
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
                if (this.sounds.mute == false) {
                    this.sounds.Enemy_got_hit.play();
                }
                if (e.health <= 0) {
                    this.money = this.money + e.money;
                    this.enemyArray.shift(e);
                    this.goldElement.innerHTML = this.money;
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
    createTurret: function (width, height, x, y, range, dmg, speed, img, path, index, ammo, price, lvl_DMG, lvl_range, maxLvl, interval) {
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
        object.lvl_DMG = lvl_DMG;
        object.lvl_range = lvl_range;
        object.maxLvl = maxLvl;
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