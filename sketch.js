var PLAY=1;
var END=0;
var score = 0;

var gameState=PLAY;

var boy, boyImg;
var  invisibleGround;

var ballsGroup, ballImage;
var obstaclesGroup, obstacle1, obstacle2;

var jump,die;

var gameOver,gameOverImage;
var restart,restartImage;
var bg;


function preload(){

  //sound = loadSound("jump.mp3");
  backgroundImg=loadImage("background.jpeg")

  ballImage = loadImage("coinSack.PNG");
  
  obstacle1 = loadImage("obstacle1.PNG");
    
  obstacle2 = loadImage("obstacle2.PNG");
   

boyImg=loadImage("boy.png");
jump = loadSound("jump.mp3");
die = loadSound("die.mp3");
  
  gameOverImage = loadImage("gameOver.jpeg");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-125);
  

  text("Score: "+ score, 1540,50);
  boy = createSprite(80,150,20,50);
  console.log(boy.y)
  boy.addImage(boyImg);
  boy.scale = 0.5;

  //camera .position.x =displayWidth-20 ;
 //  camera .position.y = boy .y;

  invisibleGround = createSprite(displayWidth-20,displayHeight-80,3100,10);
  invisibleGround.visible = false;


  
  ballsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage("g",gameOverImage);
 gameOver.scale=0.5;
 gameOver.visible=false;
  
  restart = createSprite(displayWidth/2,displayHeight/4);
  restart.addImage("r",restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
 // score = 0;

 //image (restart)


}

fill ("orange");
 textSize (28);

function draw() {
  if(backgroundImg)
  background(backgroundImg);
  getBackgroundImage();
  
  if(gameState===PLAY){
    // score = score + Math.round(getFrameRate()/60);
   
  spawnBalls();
  spawnObstacles();
   if( obstaclesGroup.isTouching(boy)){
     die.play();
     gameState=END;
   }
   if( ballsGroup.isTouching(boy)){
   score=score+1;
    
  }
  if(keyDown("space")){// && boy.y >= 700)
    boy.velocityY = -20 ;

jump.play();
  }
  boy.velocityY = boy.velocityY + 0.8;

  }
  
  else if(gameState===END){
    

    boy.visible=false;
   
    gameOver.visible=true;
    restart.visible=true;

    obstaclesGroup.setVelocityXEach(0);
    ballsGroup.setVelocityXEach(0);
 
    obstaclesGroup.setLifetimeEach(-1);
    ballsGroup.setLifetimeEach(-1);


    if(mousePressedOver(restart)){
      
       reset();
            
    }
   
  }
  
 boy.collide(invisibleGround);
  
 
  drawSprites();


}

function spawnBalls() {

  if (frameCount % 200 === 0) {
    var ball = createSprite(1500,490,40,40);
    ball.y = Math.round(random(80,120));
    ball.addImage(ballImage);
    ball.scale = 0.5;
    ball.velocityX = -3;
 
   // camera .position.x = ball.velocityX;
 //  camera .position.y = ball .y;
   

    ball.depth = boy.depth;
    boy.depth = boy.depth + 1;

   //ball.debug=true;
    ball.setCollider("rectangle",0,0,70,498);
    
    ballsGroup.add(ball);
  }
  
}

function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(displayWidth-20,displayHeight-210,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle1);
    //obstacle.debug=true;

   // camera .position.x = obstacle.velocityX;
 
   // camera .position.y = displayHeight/2;

    obstacle.setCollider("circle",0,0,70);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
    
      default: break;
    }
    obstacle.scale = 0.5;
 
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  boy.visible=true;
  obstaclesGroup.destroyEach();
  ballsGroup.destroyEach();

  score=0;

  
}
async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responsejson = await response.json();
  var datetime = responsejson.datetime
  var hour = datetime.slice(11,13);
if (hour>=06 && hour<=19){
  
  bg="background.jpeg"

  
}
else{

bg ="night.jpeg"

}
backgroundImg = loadImage(bg);

}

