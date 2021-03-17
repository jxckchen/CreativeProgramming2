let video;

let tolerance = 15;
let redTolerance = 18;
let colorToMatch;

let flow;
let previousPixels;
let fgridSize = 24;
let ignoreThresh = 12;
let movementX, movementY;
let xPos;
let yPos;
let mouseDraggedBool;
let xLabel, yLabel, draggedLabel;
let tapsCounter, flickCounter, sprayCounter;

let pg,pg2;

function setup() {
  createCanvas(1280,720);
  textAlign(LEFT);
  video = createCapture(VIDEO);
  video.size(960,540);
  video.hide();
  pg = createGraphics(1280,720);
  pg2 = createGraphics(1280,720);

  flow = new FlowCalculator(fgridSize);
  xPos = 0;
  yPos = 0;
  mouseDraggedBool = false;
  xLabel = new TextObject(xPos,20,30,255);
  yLabel = new TextObject(yPos,20,60,255);
  draggedLabel = new TextObject(mouseDraggedBool,20,90,255);
  draggedLabel.display();
  colorToMatch = [62,105,130,255];

  sprayTest = new SprayPattern();
  sprayTest2 = new SprayPattern();
  sprayTest3 = new SprayPattern();

  sprayCounter = 0;
}

function draw() {
  //background(255);
  //circleMatrix();
  colorTracking();
  //opticalFlow();
  //blobTrack();

}

function circleMatrix(){
  let gridSize = int(map(mouseX,0,width,15,50));

  video.loadPixels();
  for (let y = 0; y<video.height;y+= gridSize){
    for (let x = 0;x<video.width;x+= gridSize){
      let index = (y*video.width+x) * 4;
      let r = video.pixels[index];
      let dia = map(r,0,255,gridSize,2);

      fill(0);
      noStroke();
      circle(x+gridSize/2,y+gridSize/2,dia);
    }
  }
}

function colorTracking(){
  image(pg,0,0);
  image(video,0,0);
  image(pg2,0,0);
  let firstPx = findColor(video, colorToMatch, tolerance);
  draggedLabel.display();
  if(firstPx !== undefined) {
    fill(colorToMatch);
    stroke(255);
    strokeWeight(2);
    circle(firstPx.x,firstPx.y,30);
    xPos = firstPx.x;
    xLabel.dispText = "Mouse X: " + xPos;
    xLabel.display();
    yPos = firstPx.y;
    yLabel.dispText = "Mouse Y: " + yPos;
    yLabel.display();

    if (mouseDraggedBool == true){
      pg.stroke(0);
      pg.fill(0);
      pg.circle(firstPx.x + 400,firstPx.y,2);
      pg2.stroke(0);
      pg2.fill(0);
      pg2.circle(firstPx.x-700+sprayCounter, firstPx.y+400,2);
      //new spray pattern Object
      //add coordinate to array of coords


    } else {
      pg.background(255);


    }
  }else{
    print("colorToMatch undefined");
  }

}

function mouseDragged(){
  mouseDraggedBool = true;
  draggedLabel.dispText = "Mouse held?: True";
}

function mouseReleased(){
  mouseDraggedBool = false;
  draggedLabel.dispText = "Mouse held?: False";
  sprayCounter+=100;
}

function mousePressed(){
  //loadPixels();
  //colorToMatch = get(mouseX,mouseY);
  print(colorToMatch);
  //rbg(121,112,47) is the yellow
}

function findColor(input, c, t) {
  if(input.width === 0 || input.height === 0){
    return undefined;
  }

  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];

  input.loadPixels();
  for(let y = 0; y<input.height; y++){
    for (let x = 0;x<video.width;x++){
      let index = (y*video.width + x) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b= video.pixels[index+2];

      if (r >= matchR-redTolerance && r <= matchR+redTolerance &&
          g >= matchG-tolerance && g <= matchG+tolerance &&
          b >= matchB-tolerance && b <= matchB+tolerance) {
            return createVector(x,y);
          }
    }
  }
}

class SprayPattern {
  constructor(){
    this.coords = [];
  }

  display(x,y){
    for(let i = 0; i < this.coords.length; i++){
      fill(0);
      stroke(0);
      circle(this.coords[i][0]+x,this.coords[i][1]+y,2);
      print(this.coords[i]);
    }
  }

  add(x){
    this.coords.push(x);
  }

  reset(){
    this.coords = [];
  }


}

class TextObject {
    constructor(dispText,x,y,color) {
      this.dispText = dispText;
      this.x = x;
      this.y = y;
      this.color = color;
    }

    //display text
    display() {
      push();
      translate(this.x, this.y);
      textSize(20);
      noStroke();

      //textFont(diorFont);
      fill(this.color);
      text(this.dispText, 0,0);
      pop();
    }

}

function opticalFlow(){
  video.loadPixels();
  if(video.pixels.length >0){
    if(previousPixels) {
      if(same(previousPixels,video.pixels, 4, width)) {
        return;
      }
      flow.calculate(previousPixels,video.pixels,video.width,video.height);
    }
    image(video,0,0);

    if (flow.zones) {
      for (let zone of flow.zones){

        if(zone.mag < ignoreThresh) {
          continue;
        }

        push();
        translate(zone.pos.x,zone.pos.y);
        rotate(zone.angle);
        strokeWeight(2);
        stroke(255);
        line(0,0,zone.mag,0);
        line(zone.mag,0, zone.mag-5,-5);
        line(zone.mag,0, zone.mag-5,5);
        pop();
      }
    }
    previousPixels = copyImage(video.pixels,previousPixels);
  }

}

function blobTrack(){

}
