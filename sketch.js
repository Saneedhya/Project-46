var backImage,backgr;
var player, player_running;
var ground,ground_img;

var CarrotGroup, CarrotImage;
var obstaclesGroup, obstacle_img;
var carrot;
var gameOver;
var score=0;
var gameState="play";


function preload(){
  backImage=loadImage("jungle.png");
  player_running = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png");
  
  

 CarrotImage = loadImage("carrot.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.5;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  carrotGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);

if(gameState==="play")
{
  
                          if(ground.x<0) {
                            ground.x=ground.width/2;
                          }
                          if(backgr.x<100){
                            backgr.x=backgr.width/2;
                          }
                          
                            if(carrotGroup.isTouching(player)){
                              carrotGroup.destroyEach();
                            score = score + 1;
                            }
                          
                            if(keyDown("space") ) {
                              player.velocityY = -12;
                            }
                            player.velocityY = player.velocityY + 0.8;
                      
                            spawncarrots();
                            spawnObstacles();
                        
                            if(obstaclesGroup.isTouching(player)){ 
                            gameState="end";
                            //player.velocityX=0;
                            //ground.velocityX=0;
                            }
  }

              else if (gameState==="end"){
                            obstaclesGroup.setVelocityXEach(0);
                            carrotGroup.setVelocityXEach(0);
                            ground.velocityX=0;
                            backgr.velocityX=0;
                            obstaclesGroup.destroyEach();
                            carrotGroup.destroyEach();
                            background(0);
                            text("GameOver:Press Space to restart " , 200,50);
                           }

                           player.collide(ground);

                            drawSprites();

                            stroke("white");
                            textSize(20);
                            fill("white");
                             text("Score: "+ score, 500,50);

                          }

function keyPressed(){
  if(keyCode === 32){
     reset();
  }
}

function reset()
{
score=0;
gameState="play";
}

function spawncarrots() {
  //write code here to spawn the food
  if (frameCount % 120 === 0) {
     carrot = createSprite(600,250,40,10);
    carrot.y = random(120,200);    
    carrot.addImage(CarrotImage);
    carrot.scale = 0.3;
    carrot.velocityX = -5;
     //assign lifetime to the variable
    carrot.lifetime = 300;
    player.depth = carrot.depth + 1;
    
    //add each carrot to the group
    carrotGroup.add(carrot);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,330,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

