var edges;
var back,backImg;
var invisible_ground;
var boy,boyImg,pause_boy;
var ob1,ob2,ob3,ob4,ob5,ob6,ob7,obsG,obstacle;
var coin,coinImg,coinG;

var brick,brickG,brickImg;

var invisible_brick,invisible_brickG;

var gameState = "start"

var start,startImg;

var score = 0;

var gameOver,gameOverImg;

var pause,pauseImg,play,playImg;

var die,point,jump;

function preload(){

  backImg = loadImage("images/back.jpg");

  boyImg = loadAnimation("images/runner_01.png","images/runner_02.png","images/runner_03.png","images/runner_04.png","images/runner_05.png","images/runner_06.png","images/runner_07.png","images/runner_08.png")
  pause_boy = loadAnimation("images/pauseBoy.png")

  ob1 = loadImage("images/ob1.png");
  ob2 = loadImage("images/ob2.png");
  ob3 = loadImage("images/ob3.png");
  ob4 = loadImage("images/ob4.png");
  ob5 = loadImage("images/ob5.png");
  ob6 = loadImage("images/ob6.png");
  ob7 = loadImage("images/ob7.png");

  coinImg = loadAnimation("images/c1.png","images/c2.png","images/c3.png","images/c4.png","images/c5.png","images/c6.png")

  brickImg = loadImage("images/brick.png");

  startImg = loadImage("images/start.png");

  gameOverImg=loadImage("images/gameover.png");

  pauseImg = loadImage("images/pause.png");
  playImg = loadImage("images/play.png");

  die = loadSound("sounds/die.wav")
  point = loadSound("sounds/point.mp3")
  jump = loadSound("sounds/jump.wav")

}

function setup(){
  createCanvas(600,600)
  
  back = createSprite(100,100);
  back.addImage("back",backImg);
  back.scale = 1.5;
  invisible_ground = createSprite(66,550,400,10);
  invisible_ground.visible = false;

  boy = createSprite(70,480);
  boy.addAnimation("boy",boyImg);
  boy.addAnimation("pause",pause_boy)
  boy.scale = 0.9

  start = createSprite(300,300)
  start.addImage(startImg); 
  start.scale = 0.2

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 2
  gameOver.visible = false;

  edges = createEdgeSprites();

  pause = createSprite(500,30);
  pause.addImage(pauseImg)
  pause.scale = 0.3
  play = createSprite(550,30);
  play.addImage(playImg)
  play.scale = 0.3
  play.visible = false;

  obsG = new Group();
  coinG = new Group();
  brickG = new Group();
  invisible_brickG = new Group();
  //boy.debug = true
  boy.setCollider("rectangle",0,0,60,100)
 
}

function draw(){
  background("lightgray")

  if(gameState === "start"){

    start.visible=true;
    back.velocityX =0;
    boy.velocityY=0;
    obsG.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    invisible_brickG.setVelocityXEach(0)
    brickG.setVelocityXEach(0);
    boy.visible=false;

    if(mousePressedOver(start)){
      gameState="play"
    }

  }
  if(gameState === "play"){
    boy.changeAnimation("boy",boyImg)
    start.visible=false;
    boy.visible=true;
    back.velocityX = -4;
  if(back.x <0){
    back.x = back.width/2
  }
 
  if(keyDown("space") && boy.y> 200){
    boy.velocityY = -10
    jump.play();
  }

  boy.velocityY+=0.5;

  boy.collide(invisible_ground);

  spawnObs();
  spawnCoinandbricks();
  spawncoins();

  if(boy.isTouching(brickG)){
    boy.velocityY =0;
  }
  if(boy.isTouching(invisible_brickG)|| boy.isTouching(obsG)){
    gameState = "end"
    die.play()
  }
  if(boy.isTouching(coinG)){
    coinG[0].destroy();
    score+=1
    point.play();
  }

  if(mousePressedOver(pause) && gameState === "play"){
    gameState = "pause"
  }
  
 
  }
  if(gameState==="pause"){
    boy.changeAnimation("pause",pause_boy)
    play.visible=true
    back.velocityX =0;
    boy.velocityY=0;
    obsG.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    invisible_brickG.setVelocityXEach(0)
    brickG.setVelocityXEach(0);

    if(mousePressedOver(play)&& gameState==="pause"){
      gameState = "play";
      play.visible = false;
      pause.visible = true;
      obsG.setVelocityXEach(-4);
      coinG.setVelocityXEach(-4);
      invisible_brickG.setVelocityXEach(-4)
      brickG.setVelocityXEach(-4);

    }
  }
  if(gameState === "end"){
    
    gameOver.visible = true;
    back.velocityX =0;
    boy.velocityY=0;
    obsG.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    invisible_brickG.setVelocityXEach(0)
    brickG.setVelocityXEach(0);
    boy.visible=false;
  }

  



  
  drawSprites();
  fill("red")
  text(mouseX+","+mouseY,mouseX,mouseY)

  stroke("green")
  strokeWeight(2)
  fill("white")
  textSize(30)
  text("Score: "+score,40,40)
}

function spawnObs(){

  if(frameCount % 120 ===0 ){
    obstacle  = createSprite(650,518)
    obstacle.velocityX = -4;

    var rand = Math.round(random(1,7))

    switch(rand){
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
      case 4: obstacle.addImage(ob4);
      break;
      case 5: obstacle.addImage(ob5);
      break;
      case 6: obstacle.addImage(ob6);
      break;
      case 7: obstacle.addImage(ob7);
      break;
      default:break;
    }
    obstacle.lifetime = 600;
    obsG.add(obstacle);
    gameOver.depth = obstacle.depth;
  gameOver.depth+=1
  }
}

function spawnCoinandbricks(){
  if(frameCount%150 === 0){
    coin = createSprite(650,500);
    coin.addAnimation("coin",coinImg);
    coin.velocityX = -4;
    coin.y = Math.round(random(150,200));
    coin.scale = 0.3;
    coin.lifetime = 600;
    coinG.add(coin);
    brick = createSprite(650,500);
    brick.addAnimation("brick",brickImg);
    brick.velocityX = -4;
    //brick.y = Math.round(random(100,400));
    brick.scale = 0.3;
    brick.lifetime = 600;
    brickG.add(brick);

    brick.y = coin.y+40
    invisible_brick = createSprite(650,500,150,10);
    //brick.addAnimation("brick",brickImg);
    invisible_brick.velocityX = -4;
    //brick.y = Math.round(random(100,400));
  //  brick.scale = 0.3;
  invisible_brick.lifetime = 600;
  invisible_brickG.add(invisible_brick);
  invisible_brick.visible = false;

  invisible_brick.y = coin.y+50

  gameOver.depth = brick.depth;
  gameOver.depth+=1
  gameOver.depth = coin.depth;
  gameOver.depth+=1

 // brick.debug = true

  }
}

function spawncoins(){
  if(frameCount%100 === 0){
    coin = createSprite(650,500);
    coin.addAnimation("coin",coinImg);
    coin.velocityX = -4;
    coin.y = Math.round(random(300,450));
    coin.scale = 0.3;
    coin.lifetime = 600;
    coinG.add(coin);
  }
}
