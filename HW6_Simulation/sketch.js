let allCars = [];
let centerX, centerY;
let trackOuterRadius, trackInnerRadius, trackWidth;
let corners = [];
let angle = 0;
let test,car1,car2,car3;
let speedDropdown;
let colors = ['rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(0,255,0)','rgb(255,255,0)'];

function preload() {
  car1front = loadImage('assets/car1front.png');
  car1back = loadImage('assets/car1back.png');
  car1left = loadImage('assets/car1left.png');
  car1right = loadImage('assets/car1right.png');

  car2front = loadImage('assets/car2front.png');
  car2back = loadImage('assets/car2back.png');
  car2left = loadImage('assets/car2left.png');
  car2right = loadImage('assets/car2right.png');

  car3front = loadImage('assets/car3front.png');
  car3back = loadImage('assets/car3back.png');
  car3left = loadImage('assets/car3left.png');
  car3right = loadImage('assets/car3right.png');

  car4front = loadImage('assets/car4front.png');
  car4back = loadImage('assets/car4back.png');
  car4left = loadImage('assets/car4left.png');
  car4right = loadImage('assets/car4right.png');

  // car5front
  // car5back
  // car5left
  // car5right
  //
  // car6front
  // car6back
  // car6left
  // car6right
  //
  // car7front
  // car7back
  // car7left
  // car7right
}

function setup() {
  allCars = []
  createCanvas(windowWidth,windowHeight);
  centerX = windowWidth/2;
  centerY = windowHeight/2;
  trackOuterRadius = height/1.2;
  trackInnerRadius = height/1.5;
  trackWidth = (trackOuterRadius - trackInnerRadius)/4;
  //corner 1 x & y
  corners = [];
  corners.push(width/2-trackOuterRadius/2+trackWidth);
  corners.push(height/2-trackOuterRadius/2+trackWidth);
  // corner 2
  corners.push(width/2+trackOuterRadius/2-trackWidth);
  corners.push(height/2-trackOuterRadius/2+trackWidth);
  //corner 3
  corners.push(width/2+trackOuterRadius/2-trackWidth);
  corners.push(height/2+trackOuterRadius/2-trackWidth);
  // //corner 4
  corners.push(width/2-trackOuterRadius/2+trackWidth);
  corners.push(height/2+trackOuterRadius/2-trackWidth);

  print(corners);

  test = new Car(corners[0],corners[1],1,5,car1,'rgb(255,0,0)');
  car1 = new Car(corners[2],corners[3],-2,5,car2,'rgb(0,0,255)');
  test.next = car1;
  car2 = new Car(corners[4],corners[5],-1,5,car3,'rgb(0,255,0)');
  car1.next = car2;
  car3 = new Car(corners[6],corners[7],2,5,test,'rgb(255,255,0)');
  car2.next = car3;
  car3.next = test;
  allCars.push(car3);
  allCars.push(car2);
  allCars.push(car1);
  allCars.push(test);




  // dropdown
  // called 'select' in p5.js, this is like a radio button
  // but takes up less space which is great for a long list
  speedDropdown = createSelect();
  speedDropdown.option('20');
  speedDropdown.option('35');
  speedDropdown.option('50');
  speedDropdown.selected('50');            // default selection
  speedDropdown.changed(changeTopSpeed);   // callback function
  speedDropdown.position(width-width/4+250, height/2-trackOuterRadius/2+60);
}

function draw() {
  //noLoop();
  background(241,243,244);
  drawTrack();
  controlPanel();

  for(let i = 0; i < allCars.length; i++){
    allCars[i].display();
    allCars[i].move();
    allCars[i].accel();
    allCars[i].check();
  }
}

class Car {
  constructor(x,y,direction,topSpeed,next,color){
    this.x = x;
    this.y = y;
    //directions: -1 = left, 1 = right, -2 = down, 2 = up
    this.direction = direction;
    this.speed = 0.01;
    this.topSpeed = topSpeed;
    this.acceleration = 0.02;
    this.next = next;
    this.color = color;
    this.stopped = false;
    print(this.color);
 }

  //acceleration behavior
  //drive in a circle
  //brake
  display(){
    push();
    translate(this.x,this.y);
    rectMode(CENTER);
    imageMode(CENTER);
    fill(this.color);
    if (this.direction == -1){
      if(this.color == 'rgb(255,255,0)'){
        image(car2left,0,0,80,50);
      }
      if(this.color == 'rgb(0,255,0)'){
        image(car3left,0,0,80,50);
      }
      if(this.color == 'rgb(0,0,255)'){
        image(car4left,0,0,80,50);
      }
      if(this.color == 'rgb(255,0,0)'){
        image(car1left,0,0,80,50);
      }

    }
    else if (this.direction == 1){
      if(this.color == 'rgb(255,255,0)'){
        image(car2right,0,0,80,50);
      }
      if(this.color == 'rgb(0,255,0)'){
        image(car3right,0,0,80,50);
      }
      if(this.color == 'rgb(0,0,255)'){
        image(car4right,0,0,80,50);
      }
      if(this.color == 'rgb(255,0,0)'){
        image(car1right,0,0,80,50);
      }
    }
    else if (this.direction == 2){
      if(this.color == 'rgb(255,255,0)'){
        image(car2back,0,0,50,60);
      }
      if(this.color == 'rgb(0,255,0)'){
        image(car3back,0,0,50,60);
      }
      if(this.color == 'rgb(0,0,255)'){
        image(car4back,0,0,50,60);
      }
      if(this.color == 'rgb(255,0,0)'){
        image(car1back,0,0,50,60);
      }

    }
    else if (this.direction == -2){
      if(this.color == 'rgb(255,255,0)'){
        image(car2front,0,0,50,60);
      }
      if(this.color == 'rgb(0,255,0)'){
        image(car3front,0,0,50,60);
      }
      if(this.color == 'rgb(0,0,255)'){
        image(car4front,0,0,50,60);
      }
      if(this.color == 'rgb(255,0,0)'){
        image(car1front,0,0,50,60);
      }
    }
    // if(this.direction == -1 || this.direction == 1){
    //   rect(0,0,50,30);
    //
    // }else{
    //   rect(0,0,30,50);
    // }

    pop();
  }

  stop(){
    this.speed = 0;
    this.acceleration = 0;
    this.stopped = true;
  }

  accel(){
    if(this.stopped == false){
      if(this.speed <= this.topSpeed){
        this.speed = this.speed+this.acceleration;
      }
    }
  }

  go(){
    this.acceleration = 0.02;
    this.stopped = false;
  }

  brake(){
    this.speed = 0;
    //print(this.next.direction);
  }

  check(){
    if(dist(this.x,this.y,this.next.x,this.next.y) < 90){
      this.brake();
    }

  }

  move(){
    if(this.x <= corners[0] && this.y <= corners[1]){
      this.direction = 1;
      //print("hit top left");
    }
    if(this.x >= corners[2] && this.y <= corners[3]){
      this.direction = -2;
      //print("hit top right");
    }
    if(this.x >= corners[4] && this.y >= corners[5]){
      this.direction = -1;
      //print("hit bottom right");
    }
    if(this.x <= corners[6] && this.y >= corners[7]){
      this.direction = 2;
      //print("hit bottom left");
    }
    if(this.direction == -1){
      this.x = this.x - this.speed;
    }
    if(this.direction == 1){
      this.x = this.x + this.speed;
    }
    if(this.direction == -2){
      this.y = this.y + this.speed;
    }
    if(this.direction == 2){
      this.y = this.y - this.speed;
    }

  }
}

function drawTrack() {
  //track is a circle
  stroke(227,229,231);
  strokeWeight(5);
  fill(255);
  rectMode(CENTER);
  rect(0,corners[1],corners[0]*2,(trackOuterRadius-trackInnerRadius)/2,10);
  rect(width/2,height/2,trackOuterRadius,trackOuterRadius,10);

  //fill(255);
  // circle(corners[0],corners[1],30);
  // circle(corners[2],corners[3],30);
  // circle(corners[4],corners[5],30);
  // circle(corners[6],corners[7],30);
  fill(241,243,244);
  rect(width/2,height/2,trackInnerRadius,trackInnerRadius,10);
  noStroke();
}

function controlPanel(){
  rectMode(CORNER);
  stroke(89,114,128);
  strokeWeight(5);
  fill(124,143,155);
  rect(width-width/4,height/2 - trackOuterRadius/2,400,200,10);

  noStroke();
  fill(89,114,128);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Control Panel", width-width/4+200, height/2 - trackOuterRadius/2 + 25);

  if(car3.stopped == true){
    fill(0,255,0);
  } else {
    fill(255,0,0);
  }
  stopButton = rect(width-width/4+15,height/2-trackOuterRadius/2+50,80,40,10);
  fill(89,114,128);
  resetButton = rect(width-width/4+305,height/2-trackOuterRadius/2+50,80,40,10);
  fill(255,255,0);
  addButton = rect(width-width/4+15,height/2-trackOuterRadius/2+145,370,40,10);
  fill(255);
  textSize(20);
  text("MOVE", width-width/4+55, height/2-trackOuterRadius/2+72);
  text("RESET", width-width/4+345, height/2-trackOuterRadius/2+72);
  text("TOP SPEED:", width-width/4+175, height/2-trackOuterRadius/2+72);
  fill(0);
  text("ADD CAR", width-width/4+195, height/2-trackOuterRadius/2+167);

}

function stopCar(){
  if(car3.stopped == true){
    car3.go();
  }else{
    car3.stop();
  }
}

function changeTopSpeed(){
  let choice = speedDropdown.value();
  car3.brake();
  car3.topSpeed = parseInt(choice)/10; // converts from a string (text) to a number
}

function addCar(){
  car = new Car(0,corners[1],1,5,allCars[allCars.length-1],colors[int(random(3))]);
  allCars[0].next = car;
  allCars.push(car);
  print(allCars);
}

function mousePressed(){
  if ((mouseX > width-width/4+15) && (mouseX < width-width/4+15+80) &&
	    (mouseY > height/2-trackOuterRadius/2+50) && (mouseY < height/2-trackOuterRadius/2+50+40)) {
        stopCar();
      }
  if ((mouseX > width-width/4+305) && (mouseX < width-width/4+305+80) &&
    	(mouseY > height/2-trackOuterRadius/2+50) && (mouseY < height/2-trackOuterRadius/2+50+40)) {
        setup();
      }

  if ((mouseX > width-width/4+15) && (mouseX < width-width/4+15+370) &&
    	(mouseY > height/2-trackOuterRadius/2+145) && (mouseY < height/2-trackOuterRadius/2+145+40)) {
        addCar();
      }
}

function windowResized() {
  setup();
}
