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
    start: function () {
        this.canvas.height = 600;
        this.canvas.width = 800;
        // obliczanie sciezki
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
    this.number.width = this.canvas.width/40;  //ile kratek szerokosci
    this.number.height = this.canvas.height/40 //ile kratek wysokosci
    console.log(this.number)
 this.drawMap(); //rysowanie

    },
    drawMap: function(){
       //tworzenie elementow trawy pod budowe wiezy
        for (let j =0; j<15; j++){
        for (let i = 0; i < 20; i++) {
            this.createElement(this.grass.width,this.grass.height,this.grass.x,this.grass.y,this.grass.img,this.grasspathArray);
            this.grass.x=this.grass.x+40;
        }
        this.grass.x = 0;
        this.grass.y=this.grass.y+40;
    }
        this.grasspathArray.forEach(element => {
             this.drawElement(element.width,element.height,element.img,element.x,element.y) ;//rysowanie trawy
         });
         this.enemypathArray.forEach(el =>{
            this.drawElement(el.width,el.height,el.img,el.x,el.y); //rysowanie sciezki
         });
         this.drawElement(this.castle.width, this.castle.height, this.castle.img, this.castle.x, this.castle.y); // i pan zamek
    
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
        this.ctx.drawImage(this.background, this.x, this.y,this.width,this.height);
 //       this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
myGameArea.start();
