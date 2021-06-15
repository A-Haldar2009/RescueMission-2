var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var missionState
function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
  missionState="notDone"

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	packageSprite.velocityX=-8

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	helicopterSprite.velocityX=-8


	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	
	
	fill("red")
	g1= Bodies.rectangle(270, 620, 20, 100)
	g2= Bodies.rectangle(355, 655, 180, 20)
	g3=Bodies.rectangle(435,620,20,100)
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);

	keyPressed()
  
}


function draw() {
  rectMode(CENTER);
  background("cyan");
  createEdgeSprites()

 
  if(missionState==="done" && (packageSprite.x<455 && packageSprite.x>290) && keyCode===DOWN_ARROW){

	fill("lime")
	textSize(25)
	text("MISSION ACCOMPLISHED:PACKAGE RELEASED", 100,100)

  }

 if(helicopterSprite.x<100){
	 helicopterSprite.velocityX=8
	 packageSprite.velocityX=8
 }

 if(helicopterSprite.x>700){
	 helicopterSprite.velocityX=-8
	 packageSprite.velocityX=-8
 }
  

  
  packageSprite.y= packageBody.position.y 
  packageBody.position.x=packageSprite.x

rect(g1.position.x, g1.position.y, 20, 100)
rect(g2.position.x, g2.position.y, 180, 20)
rect(g3.position.x,g3.position.y,20,100)
  
  drawSprites();



 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW ) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
  Matter.Body.setStatic(packageBody, false)
  
 missionState="done"

 packageSprite.velocityX=0
 helicopterSprite.velocityX=0

 packageBody.position.y=packageSprite.y

 
   
  }
}



