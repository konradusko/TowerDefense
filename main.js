
const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: undefined,
    canvas_2: document.getElementById("canvas2"),
    ctx_2:undefined,
    oneBox:40,
    buttons:{
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
    enemyOne:{
        width:30,
        height:30,
        x:5,
        y:45,
        img:document.getElementById("grassImg"),//testowo to i trawa dobra
        health: 100
    },
    interval:undefined,
    lvl:10,
    enemypathArray: [],
    grasspathArray: [],
    enemyArray:[],
    start: function () {
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = 600;
        this.canvas.width = 800;
        this.ctx_2 = this.canvas_2.getContext("2d");
        this.canvas_2.height = 600;
        this.canvas_2.width=800;
        // obliczanie sciezki
        for (let i = 0; i < 4; i++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        }
        for (let j = 0; j < 5; j++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        }
        for (let k = 0; k < 6; k++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        }
        for (let o = 0; o < 5; o++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y - this.oneBox;
        }
        for (let x = 0; x < 8; x++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x + this.oneBox;
        }
        for (let z = 0; z < 10; z++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        }
        for (let l = 0; l < 10; l++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        }
        for (let c = 0; c < 3; c++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.y = this.enemyPath.y + this.oneBox;
        }
        for (let v = 0; v < 5; v++) {
            this.createElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.x, this.enemyPath.y, this.enemyPath.img, this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x - this.oneBox;
        }
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
        this.buttons.play.addEventListener("click", ()=>{
                 this.createEnemy();
        })
    },
    createEnemy: function(){
        let poziom = 10;
        this.enemyArray = [];
for (let i =0; i<poziom; i++){
    this.createElement(this.enemyOne.width, this.enemyOne.height, this.enemyOne.x, this.enemyOne.y, this.enemyOne.img, this.enemyArray,this.enemyOne.health);
    this.enemyOne.x = this.enemyOne.x - 50;
}
console.log(this.enemyArray)
   this.interval = setInterval(() => {
    this.drawEnemy();
    console.log("xd")
    console.log(this.enemyArray)
}, 2000);
      //  
      //  this.createElement(40,40,40,40,this.grass.img,this.enemyArray,100)
     //  this.drawElement(40,40,this.enemyArray[0].img,20,40)
 /*
     //  this.ctx.fillRect(40,40,40,40);
this.ctx_2.beginPath()
  this.ctx_2.fillRect(40,40,40,40);
  //this.ctx_2.stroke(); 
 // this.ctx_2.closePath();
     setTimeout(() => {
        this.ctx_2.clearRect(40,40,40,40)
     }, 1000);
    
    */
    },
    drawEnemy:function(){
this.ctx_2.clearRect(0,0,this.canvas_2.height,this.canvas_2.width);
if(this.enemyArray.length != 0){
    this.enemyArray.forEach(el => {

        if(el.x < 120 ){
            el.x = el.x+40;
            this.ctx_2.fillRect(el.x,el.y,el.width,el.height)
        }else{
            this.enemyArray.shift(el)
            console.log(this.enemyArray)
        }
    });
}else{
    console.log("array is empty")
    clearInterval(this.interval);
}



    },
    createElement: function (width, height, x, y, img, path,life) {
        let object = new Object();
        object.width = width;
        object.height = height;
        object.x = x;
        object.y = y;
        object.img = img;
        object.life= life;
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
/*
const myGameArea_2 = {
    canvas_2: document.getElementById("canvas2"),
    ctx_2: undefined,
    init:function(){
this.ctx_2= this.canvas_2.getContext("2d");
this.canvas_2.width = 800;
this.canvas_2.height = 600;
  this.ctx_2.fillRect(40,40,40,40)
    }
}
*/
