/*
Jack Chen | 2020 | jackchen.co
P5.js recreation of Untitled 2 by Mutsuko Sasaki
as well as
P5.js recreation of Structure by Zdenek Sykora
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  //sasaki();
  sykora();

}

function sasaki() {
  background(255);
  for(let x = 10; x < width; x += 20){
    for(let y = 10; y < height; y += 20){
      strokeWeight(0);
      let circ = new CircleObject(0,5,x+5,y+5);
      circ.display();
    }
  }
  for(let x = 0; x < width; x += 20){
    for(let y = 0; y < height; y += 20){
      strokeWeight(0);
      let circ = new DiamondObject(0,5,x+5,y+5);
      circ.display();
    }
  }
  noFill();
  strokeWeight(10);
  stroke(255);

  line(0, windowHeight, windowWidth/3, 0);
  line(0, windowHeight, windowWidth-windowWidth/4, 0);
  line(0, windowHeight, windowWidth, windowHeight/2);
  line(0, windowHeight, windowWidth, height-windowHeight/4);
}

function sykora(){
  for(let x = 30; x < width; x += 60){
    for(let y = 30; y < height; y += 60){
      strokeWeight(0);
      let sqr = new SquareWithCircle(random(2),60,int(random(1,3)),x,y);
      sqr.display();
    }
  }
}

//Classes

class SquareWithCircle {

  constructor(color,radius,amtCircles,x,y) {
    let rotations = [0, PI/2, PI, 3*PI/2];

    if (color < 0.5) {
      this.color = 0;
    } else {this.color = 255}
    this.radius = radius;
    this.amtCircles = amtCircles;
    this.rotation = random(rotations);
    this.x = x;
    this.y = y;
  }

  display() {
    rectMode(CENTER);
    push();
    translate(this.x,this.y);
    rotate(this.rotation);
    fill(this.color);
    square(0,0,this.radius);
    if(this.color == 0){
      fill(255);
    }
    else {
      fill(0);
    }
    if(this.amtCircles == 2){
      arc(0, -30, this.radius-1, this.radius-1, 0, PI);
      arc(0, 0, this.radius-1, this.radius-1, 0, PI);
    }
    else{
      arc(0, -30, this.radius-1, this.radius-1, 0, PI);
    }

    pop();
  }

}

class CircleObject {
  constructor(color,radius,centerX,centerY) {
    this.color = color;
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  display() {
    push();
    translate(this.centerX,this.centerY);
    fill(this.color);
    circle(0,0,this.radius);
    pop();
  }
}

class DiamondObject {
  constructor(color,radius,centerX,centerY) {
    this.color = color;
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  display() {
    rectMode(CENTER);
    push();
    translate(this.centerX,this.centerY);
    rotate(PI/4);
    fill(this.color);
    square(0,0,this.radius);
    pop();
  }
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
