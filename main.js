const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    castle: {
        width: 160,
        height: 120,
        x: 0,
        y: 480,
        img: document.getElementById("castleImg"),
        health:100
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
    number:{
        width:0,
        height:0
    },
    enemypathArray:[],
    grasspathArray:[],
//56
//5dol
//8
    start: function () {
        this.canvas.height = 600;
        this.canvas.width = 800;
        // obliczanie
        for(let i =0; i<4; i++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x+40;
        }
        for(let j = 0; j<5; j++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.y = this.enemyPath.y+40;
        }
        for(let k = 0; k< 6; k++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
            this.enemyPath.x = this.enemyPath.x+40;
        }
        for(let o = 0; o<5; o++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.y = this.enemyPath.y-40;
        }
        for(let x = 0; x<8; x++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.x = this.enemyPath.x+40;
        }
        for(let z = 0; z<10; z++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.y = this.enemyPath.y+40;
        }
        for(let l = 0; l<10; l++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.x = this.enemyPath.x-40;
        }
        for(let c = 0; c<3; c++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.y = this.enemyPath.y+40;
        }
        for(let v = 0; v<5; v++){
            this.createElement(this.enemyPath.width,this.enemyPath.height,this.enemyPath.x,this.enemyPath.y,this.enemyPath.img,this.enemypathArray);
             this.enemyPath.x = this.enemyPath.x-40;
        }
     //   console.log(this.enemypathArray)
   //    this.createElement(2,3,4,5);
     //  this.createElement(2,3,4,6);
    this.number.width = this.canvas.width/40;  //ile kratek szerokosci
    this.number.height = this.canvas.height/40 //ile kratek wysokosci
    console.log(this.number)
    /*
     this.enemypathArray.forEach(element => {
       //  console.log(element)
        this.drawElement(element.width,element.height,element.img,element.x,element.y)
    });
    */
       console.log()
      //  this.drawElement(this.enemyPath.width, this.enemyPath.height, this.enemyPath.img, this.enemyPath.x, this.enemyPath.y);
    //  this.drawElement(this.enemypathArray[0].width,this.enemypathArray[0].height,this.enemypathArray[0].img,this.enemypathArray[0].x,this.enemypathArray[0].y)
     // this.drawElement(this.enemypathArray[3].width,this.enemypathArray[3].height,this.enemypathArray[3].img,this.enemypathArray[3].x,this.enemypathArray[3].y)
      
 this.drawMap();

    },
    drawMap: function(){
        console.log(this.enemypathArray)
        console.log(this.number);
        for (let j =0; j<15; j++){

        for (let i = 0; i < 20; i++) {
            if(this.grass.x === this.enemypathArray[0].x && this.grass.y === this.enemypathArray[0].y ){
                continue;
            }
            this.createElement(this.grass.width,this.grass.height,this.grass.x,this.grass.y,this.grass.img,this.grasspathArray);
            this.grass.x=this.grass.x+40;
        }
        this.grass.x = 0;
        this.grass.y=this.grass.y+40;
    }
    this.drawElement(this.castle.width, this.castle.height, this.castle.img, this.castle.x, this.castle.y);
    //    console.log(this.enemyPath.img)
     //   console.log(this.grasspathArray)
     //   console.log(this.enemypathArray)
        this.grasspathArray.forEach(element => {
            //  console.log(element)
             this.drawElement(element.width,element.height,element.img,element.x,element.y)
         });
    
    },
    createElement: function(width,height,x,y,img,path){
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
     //   console.log(this.background)
       //  console.log(this.width)
       // console.log(this.castle.img)
        this.ctx.drawImage(this.background, this.x, this.y,this.width,this.height);
 //       this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
myGameArea.start();



/*const gameArea = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext('2d'),
    startEnemyPathNumbers:{
       one:120,
       two:160,   // ?????
    },
    newxImage: function(width,height,src){
        let image = new Image();
        image.src = src;
       return image;
       },
    castle:{  
        x:50,
        y:50,
        width:160,
        height:120,
        src: "img/castle.png",
        background:   undefined,
    },
    number:0,
    init: function(){
      this.canvas.width = 800;
      this.canvas.height = 600;

     let xd =  this.newxImage(this.castle.width,this.castle.height,this.castle.src);
     console.log(xd);
     this.drawElement(this.castle.width,this.castle.height,xd,this.castle.x,this.castle.y);
    },
    calculation: function(){

    },
    drawElement: function(width,height,background,x,y){

      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.background = background;
      console.log(this.background)
 
      this.ctx.drawImage(this.background,10,10);
   //  this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }


}
gameArea.init();
/*
    let test = document.getElementById("canvas");
    let ctx = test.getContext("2d");
    let test2 = new Image();
    test2.src= "img/grass.png";
    ctx.drawImage(test2,90,130,50,60);
    console.log("xd")


*/

/*window.onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let test2 = new Image();
    test2.src="img/grass.png"
    ctx.drawImage(test2, 0, 0);
    console.log("xd")
  }; */






/*
function startGame(){
    myGameArea.start();
}
let test;
const myGameArea = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    start: function(){
        this.canvas.width=800;
        this.canvas.height=600;
       // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       for(let i = 0; i<40; i++){
test = new this.mapGenerator(40,40,"red",50,50);
       }
    },
    mapGenerator: function(width,height,background,x,y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;   
        var xd = this.ctx;
        xd.fillStyle= background;
        xd.fillRect(this.x, this.y, this.width, this.height);
    }
}
startGame();

*/







/*
const myGameArea = {
    canvas: document.createElement("canvas"),
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
     //   return enemyGenerator.init(5);
    },
    init: function () {
        this.canvas.height = 600;
        this.canvas.width = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
 */
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
/*
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
*/
//myGameArea.init();