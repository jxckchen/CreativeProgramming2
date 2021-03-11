let whichScene = -1;
let pg;
let lingoColors = ['rgb(196, 166, 157)',
                   'rgb(152, 168, 134)',
                   'rgb(70, 92, 105)',
                   'rgb(54, 52, 87)',
                   'rgb(115, 82, 144)'];

//Mango, Orange Pantone, Winter Sky (pink),
//Blue Violet, Azure
let levitatingColors = ['rgb(255, 190, 11)',
                        'rgb(251, 86, 7)',
                        'rgb(255, 0, 110)',
                        'rgb(131, 56, 236)',
                        'rgb(58, 134, 255)',
                        'rgb(5, 33, 41)'];

//Black, Erin Green, Pakistan Green,
//Hunter Green, White
let destinyColors = ['rgb(0, 0, 0)',
                     'rgb(30, 251, 70)',
                     'rgb(15, 104, 17)',
                     'rgb(63, 102, 52)',
                     'rgb(255, 255, 255)'];

//Object instantiation
let startText;
let satelliteTest;
let testRect;
let loadingSatellites = [], sceneOneBlips = [], stars = [], rectangles = [], fireworks = [], endingSatellites = [];
let endingSatellites2 = [], endingSatellites3 = [], endingSatellites4 = []
let startCircle;
let startSpiral;
let leafColor = 0;
let waveTest;
let wave2, wave3;
let backgroundFlashVar = lingoColors[2];
let backgroundFlashVar2 = levitatingColors[4];
let backgroundFlashVar3 = destinyColors[1];
let flashBox;

function preload(){
  soundFormats('mp3');
  bTrack = loadSound('assets/LingoLevitatingDestiny.mp3');
  mono = loadFont('assets/AurulentSansMono-Regular.otf');
}

function stopMusic(){
  if (bTrack.isLoaded()) {
    bTrack.pause();
  }
}

function muteMusic(){
  if (bTrack.isLoaded()) {
    bTrack.setVolume(0);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);
  // textButton = createButton('Stop Anim');
  // textButton.mousePressed(stopMusic);
  // textButton.position(20, 20);
  //textButton = createButton('Mute Music');
  //textButton.mousePressed(muteMusic);
  //textButton.position(20, 20);

  // schedule calls to changeScenes
  //bTrack.addCue(0, changeScene, 1);
  bTrack.addCue(7, changeScene, 1); //leaves!
  bTrack.addCue(19, changeLeafBlipColor, 1); //leaves change color
  bTrack.addCue(25.5, changeScene, 2); //leaves float
  bTrack.addCue(28, changeScene, 3); //leaves float other way
  bTrack.addCue(37, changeScene, 4); //perlin noise comes in
  bTrack.addCue(41, changeScene, 5); //next perlin color
  bTrack.addCue(45, changeScene, 6); //next perlin color
  bTrack.addCue(48.75, changeScene, 7); //after perlin 7 rectangles start appearing in a row
  bTrack.addCue(56, changeScene, 8); //rectangles move to center
  bTrack.addCue(58, changeScene, 9); //rectangles expand
  bTrack.addCue(61, changeScene, 10);
  bTrack.addCue(62, changeScene, 11);
  bTrack.addCue(66, changeScene, 20);
  bTrack.addCue(66.5, changeScene, 12);
  bTrack.addCue(70.5, changeScene, 20);
  bTrack.addCue(71, changeScene, 13);
  bTrack.addCue(75.5, changeScene, 20);
  bTrack.addCue(75.9, changeScene, 12);
  bTrack.addCue(80, changeScene, 20);
  bTrack.addCue(81, changeScene, 13);
  bTrack.addCue(85, changeScene, 14); //rectangles leave
  bTrack.addCue(88, changeScene, 16);
  bTrack.addCue(90, changeScene, 15); //I NEED YOU - FIREWORKS
  bTrack.addCue(97, changeScene, 17);
  bTrack.addCue(113, changeScene, 18);
  bTrack.addCue(116, changeScene, 19);
  bTrack.addCue(119, changeScene, 18);
  bTrack.addCue(124, changeScene, 19);
  bTrack.addCue(128, changeScene, 18);
  bTrack.addCue(130, changeScene, 19);
  bTrack.addCue(132, changeScene, 18);
  bTrack.addCue(133, changeScene, 19);
  bTrack.addCue(136, changeScene, 18);
  bTrack.addCue(138, changeScene, 19);
  bTrack.addCue(142, changeScene, 18);
  bTrack.addCue(144, changeScene, 19);
  bTrack.addCue(153, changeScene, 21);
  // BOX WITH BOUNCING CIRCLE APPEARS
  // GETS LARGER
  // CIRCLE BREAKS FREE
  // EXTERNAL CANVAS DRAWS ON EACH DROP

  // one rectangle gets really large and moves up
  // background wipes black
  // parallax stars as rectangles move back and forth
  // glitter in the sky: fireworks?
  //transition to Levitating: background black, white rectangles fly up

  warningText = new TextObject("(epilepsy warning)", width-150, height-20);
  startText = new TextObject("press", width/2, height/2);
  endText = new TextObject("tobi lou - Lingo Starr: STRIKES BACK\nDua Lipa - Levitating\n1788-L & Blanke - Destiny\nAnimation by Jack Chen", width/2, height/2);

  //loading circles
  for (let i = 0; i <= 2*PI; i+=PI/4){
    let sat = new SatelliteObject(255,100,width/2,height/2,i)
    loadingSatellites.push(sat)
  }

  for (let i = 0; i <= 2*PI; i+=PI/8){
    let sat = new SatelliteObject(255,100,width/2,height/2,i)
    endingSatellites.push(sat)
  }

  for (let i = 0; i <= 2*PI; i+=PI/8){
    let sat = new SatelliteObject(0,0,width/2,height/2,i)
    endingSatellites2.push(sat)
  }

  for (let i = 0; i <= 2*PI; i+=PI/8){
    let sat = new SatelliteObject(255,-100,width/2,height/2,i)
    endingSatellites3.push(sat)
  }

  for (let i = 0; i <= 2*PI; i+=PI/8){
    let sat = new SatelliteObject(0,-200,width/2,height/2,i)
    endingSatellites4.push(sat)
  }

  startCircle = new CircleObject(lingoColors[0],25,width/2,height/2);
  startSpiral = new SpiralObject(50,width/2,height/2,3.5,0.5,destinyColors[0]);

  //lingo scene 1 blips
  for (let i = 0; i <= 1; i++){
    let blip = new PlantObject(lingoColors[1],3,random(width),random(height));
    sceneOneBlips.push(blip);
  }

  for (var i = 0; i <= 1; i++) {
    fireworks.push(new Firework(random(width), random(height)));
  }
  //testCircle = new CircleObject(lingoColors[1],3,width/2,height/2);

  waveTest = new PerlinWave(0.05,0.01,windowHeight,lingoColors[1]);
  wave2 = new PerlinWave(0.05,0.01,windowHeight*1.5,lingoColors[2]);
  wave3 = new PerlinWave(0.05,0.01,windowHeight*1.5,lingoColors[0]);

  testRect = new RectangleObject(levitatingColors[2],width/2,height/2,25,60);
  //levitating rectangles
  rectMode(CENTER);
  let c = 0;
  for (let i = -200; i <= 200; i+=50){
    if (c%2 === 0){
      let rect = new RectangleObject(levitatingColors[0],width/2+i,0-30,25,60);
      rectangles.push(rect);
    }
    else{
      let rect = new RectangleObject(levitatingColors[2],width/2+i,0-30,25,60);
      rectangles.push(rect);
    }
    c++
    console.log(rectangles.length);
  }

  //levitating stars
  for (let i=0; i<256; i++) {
    stars.push(new Star(random(0,windowWidth), random(0,windowHeight)));
  }

  flashBox = new TheBox(width/2,height/2,10);

}

function changeScene(x) {
  whichScene = x;
  console.log(whichScene);
}

function draw() {

  scene_intro();

  if (whichScene == 0){
    transition_one();
  }
  if (whichScene == 1){
    background(lingoColors[0]);
    scene_one();
  }
  if (whichScene == 2){
    background(lingoColors[3]);
    scene_two();
  }
  if (whichScene == 3){
    background(lingoColors[3]);
    scene_three();
  }
  if (whichScene == 4){
    background(lingoColors[3]);
    transition_two();
  }
  if (whichScene == 5){
    //flash background to destiny colors
    transition_four();
  }
  if (whichScene == 6){
    transition_three();
  }
  if (whichScene == 7){
    background(lingoColors[2]);
    scene_four();
  }
  if (whichScene == 8){
    background(lingoColors[2]);
    scene_five();
  }
  if (whichScene == 9){
    background(lingoColors[2]);
    scene_six();
  }
  if (whichScene == 10){
    backgroundFlash();
    for (let i = 0; i < rectangles.length; i++){
      rectangles[i].display();
    }
  }
  if (whichScene == 11){
    frameRate(60);
    background(levitatingColors[5]);
    scene_seven();
  }
  if (whichScene == 12){
    frameRate(60);
    background(levitatingColors[4]);
    scene_eight();
  }
  if (whichScene == 13){
    frameRate(60);
    background(levitatingColors[3]);
    scene_nine();
  }
  if (whichScene == 14){
    frameRate(60);
    background(levitatingColors[5]);
    scene_eleven();
    for (let i=0; i<stars.length; i++) {
        stars[i].show();
        stars[i].update();
    }
  }
  if (whichScene == 15){
    background(levitatingColors[5]);
    scene_ten();
  }
  if (whichScene == 16){
    background(levitatingColors[5]);
    for (let i=0; i<stars.length; i++) {
        stars[i].show();
        stars[i].update();
    }
    scene_twelve();
  }
  if (whichScene == 17){
    background(levitatingColors[5]);
    scene_ten();
    scene_thirteen();
  }
  if (whichScene == 18){
    frameRate(10);
    backgroundFlash3();
    for (let i=0; i<stars.length; i++) {
        stars[i].color = 0;
        stars[i].show();
        stars[i].update();
    }
    //scene_thirteen();

  }
  //test scene
  if (whichScene == 19){
    frameRate(45);
    backgroundFlash3();
    test_scene();
  }

  if (whichScene == 20){
    backgroundFlash2();
    for (let i=0; i<stars.length; i++) {
        stars[i].show();
        stars[i].update();
    }
  }
  if (whichScene == 21){
    background(destinyColors[1]);
    scene_outro();
    for (let i=0; i<stars.length; i++) {
        stars[i].show();
        stars[i].update();
    }
  }

}

//Classes
class TextObject {
    constructor(dispText,x,y) {
      this.dispText = dispText;
      this.x = x;
      this.y = y;
    }

    display() {
      push();
      translate(this.x, this.y);
      textSize(25);
      textAlign(CENTER);
      textFont(mono);
      fill(255);
      text(this.dispText, 0,0);
      pop();
    }

    update() {
      this.x += 5;
    }
}

class SatelliteObject {
    constructor(color,radius,centerX,centerY,angle) {
      this.color = color;
      this.og = radius;
      this.radius = radius;
      this.centerX = centerX;
      this.centerY = centerY;
      this.angle = angle;
      this.expanded = false;
    }
    reset() {
      this.radius = this.og
    }

    display() {
      push();
      translate(this.x, this.y);
      noStroke();
      fill(this.color);
      circle(0,0,this.radius);
      pop();
    }

    traceC() {
      let x = this.centerX + this.radius * cos(this.angle);
	    let y = this.centerY + this.radius * sin(this.angle);
      noStroke();
      fill(this.color);
      circle(x, y, 25);
      this.angle = this.angle + 0.03
    }

    expand(){
      fill(this.color);
      noStroke();
      this.radius = this.radius + 2
      if (this.radius > width){
        this.reset();
      }
    }
}

class CircleObject {
    constructor(color,radius,x,y) {
      this.color = color;
      this.radius = radius;
      this.x = x;
      this.y = y;
    }

    display() {
      push();
      translate(this.x, this.y);
      fill(this.color);
      circle(0,0,this.radius);
      pop();
    }

    expand() {
      this.radius += 4;
    }

    blip() {
      this.radius += 3;
      if (this.radius >= 48){
        this.radius = 48;
      }
    }
}

class PlantObject {
  constructor(color,size,x,y) {
    this.color = color;
    this.size = size;
    this.x = x;
    this.y = y;
    this.rotation = random(0,2*PI);
  }

  changeColor() {
    this.color = lingoColors[2];
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    rotate(this.rotation);
    noStroke();
    beginShape();
    curveVertex(this.x,this.y);
    curveVertex(this.x,this.y);
    curveVertex(this.x-this.size/2,this.y-this.size);
    curveVertex(this.x,this.y-this.size*2);
    curveVertex(this.x+this.size/2,this.y-this.size);
    endShape(CLOSE);
    stroke(124, 133, 114);
    strokeWeight(2);
    line(this.x,this.y-this.size*2+2,this.x,this.y+this.size/2);
    pop();
  }

  blip() {
    this.size += 3;
    if (this.size >= 40){
      this.size = 40;
    }
  }

  fall() {
    this.y += 10;
  }

  otherWay() {
    this.y -= 10;
  }
}


class RectangleObject {
    constructor(color,x,y,w,h) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.h = h;
      this.w = w;
      this.dropped = false;
      this.vy = 0;
      this.ay = 10;
      this.vMult = 0.07;
      this.middle = false;
      this.angle = 2*PI;
      this.reverse = false;
      this.up = false;
      this.down = false;
    }

    display() {
      noStroke();
      push();
      translate(this.x, this.y);
      fill(this.color);
      rect(0,0,this.w,this.h);
      pop();
    }

    traceC() {
      push();
      translate(this.x-100, this.y);
      fill(this.color);
      let x = 200 * cos(this.angle);
	    let y = 100 * sin(this.angle);
      rect(x, y, this.w,this.h);
      pop();

      this.angle = this.angle - 0.075
      // if (this.x >= width){
      //   this.reverse = true;
      // }
      // if (this.x <= 0){
      //   this.reverse = false;
      // }
      // if (this.reverse == false){
      //   this.x += 1;
      // }else{
      //   this.x -=1;
      // }
    }


    fall() {
      if (this.y >= height-this.h/2){
        this.dropped = true;
      }
      else {
        this.vy = this.vy + this.ay;
        this.y = this.y + this.vy * this.vMult;
      }
    }

    goToMiddle() {
      if (this.y <= height/2){
        this.middle = true;
      }
      else {
        this.y -= 5
      }
    }

    goTo(x,y) {
      if (this.x <= x){
        this.x += 3;
      }
      if (this.x >= x){
        this.x -= 3;
      }
      if (this.y <= y){
        this.y += 3;
      }
      if (this.y >= y){
        this.y -= 3;
      }
    }

    burst(x,y) {
      if (this.x <= x){
        this.x += 7;
      }
      if (this.x >= x){
        this.x -= 7;
      }
      if (this.y <= y){
        this.y += 7;
      }
      if (this.y >= y){
        this.y -= 7;
      }
    }

    moveLeft(x) {
      if (this.x >= x){
        this.x -= 7;
      }
    }

    moveRight(x) {
      if (this.x <= x){
        this.x += 7;
      }
    }

    moveUp(y) {
      if(this.up == false){
        if(this.y <= y){
          this.up = true;
        }
        else {
          this.y -= 10;
        }
      }

    }

    moveDown(y) {
      if(this.up){
        if (this.y >= y){
          this.up = false;
        }
        else {
          this.y += 10;
        }
      }
    }

    moveUpB(y) {
      if(this.down){
        if(this.y <= y){
          this.down = false;
        }
        else {
          this.y -=10;
        }
      }

    }

    moveDownB(y) {
      if(this.down == false){
        if (this.y >= y){
          this.down = true;
        }
        else {
          this.y += 10;
        }
      }
    }


    shrinkSmall() {
      if(this.expanded){
        if (this.w <= 25 && this.h <= 60){
          this.expanded = false;
        }
        else {
          this.w /= 1.01;
          this.h /= 1.01;
        }
      }
    }

    expandSmall() {
      if (this.w >= 75){
        this.expanded = true;
      }
      else {
        this.w = this.w*1.005
        this.h *= 1.005
      }
    }

    shrinkBig() {
      if(this.expanded){
        if (this.w <= 25 && this.h <= 60){
          this.expanded = false;
        }
        else {
          this.w /= 1.21;
          this.h /= 1.21;
        }
      }
    }

    expandBig() {
      if (this.w >= 100){
        this.expanded = true;
      }
      else {
        this.w *= 1.15
        this.h *= 1.15
      }
    }


}

class SpiralObject {
  constructor(angle,offsetx,offsety,scalar,speed,color) {
    this.angle = angle;
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.scalar = scalar;
    this.speed = speed;
    this.color = color;
  }

  spiral() {
    //pg.background(255,255,255,0);
    //pg.noStroke();
    //pg.fill(this.color);
    noStroke();
    fill(this.color);
    let x = this.offsetx + cos(this.angle) * this.scalar;
    //console.log(x);
    let y = this.offsety + sin(this.angle) * this.scalar;
    //console.log(y);
    //pg.circle(x,y,5);
    circle(x,y,20);
    this.angle += this.speed;
    this.scalar += this.speed;
  }
}

class PerlinWave {
  constructor(yIncrement,timeIncrement,heightVal,color) {
    this.yIncrement = yIncrement;
    this.timeIncrement = timeIncrement;
    this.heightVal = heightVal;
    this.color = color
    this.timeOffset = 0;
  }
  wave() {
    background(lingoColors[3]);
    fill(this.color);
    noStroke();

    beginShape();
    let yOffset = 0;
    for (let x=0; x<=width+50;x+=25) {
      noiseDetail(2, 0.2);
      let y = noise(yOffset, this.timeOffset) * this.heightVal;
      vertex(x, y);

      yOffset += this.yIncrement;
    }
    vertex(width+50, height);
    vertex(0, height);
    endShape(CLOSE);

    this.timeOffset += this.timeIncrement;
    this.heightVal -= 5;
  }
}

//Star class derived from user Suchista https://editor.p5js.org/Suchista/sketches/PfyTzNn70
class Star {
	constructor(x,y) {
  	this.x = x;
    this.y = y;
    this.r = random(1,7);
    this.color = 255;
  }

  show() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    fill(this.color);
    circle(0, 0, this.r, this.r);
    pop();
  }

  update() {
    this.y+=this.r*2;
    if (this.y>windowHeight+5) {
      this.generate();
    }
  }

  generate() {
    this.y=-5;
    this.x=random(0,windowWidth);
    this.r=random(1,7);
  }
}

//Firework class derived from user ShawnMa https://editor.p5js.org/ShawnMa/sketches/SJbLpafn-
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.gravity = 0.1;
    this.diameter = random(1,10);

    this.ax = random(-this.speed, this.speed);
    this.ay = random(-this.speed, this.speed);

    this.color = random(levitatingColors);
  }

  update() {
    this.diameter = this.diameter - 0.15;
    this.x += this.ax / 2;
    this.y += this.ay / 2;

    this.x += random(-this.speed / 2, this.speed / 2);
    this.y += random(-this.speed / 2, this.speed / 2);
  }

  ballisFinished() {
    if (this.diameter < 0) {
      return true;
    }
  }

  render() {
    //print(this.colour);
    noStroke();
    if (this.diameter > 0) {
      fill(this.color);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }

  }
}

class TheBox {
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.growth = 1;
    this.r = 255;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.r);
    circle(0,0,this.w);
    pop();
  }

  move(){
    //this.x += 10;
    this.w += this.growth;
  }

  grow() {
    if (this.w > 100 || this.w < 10 || this.w > 100 || this.w < 10 || this.w > 100 || this.w < 10) {
      this.growth = -1.1 * this.growth;
  }

  }

}

//Scenes and transitions
function scene_intro() {
  background(lingoColors[3]);
  //console.log(lingoColors[2]);
  startText.display();
  warningText.display();
  for (let i=0; i<loadingSatellites.length; i++) {
    let sat = loadingSatellites[i];
    sat.traceC();
  }
  //satelliteTest.traceC();
  //startText.update();
}

function scene_outro() {
  endText.display();
}

function transition_one() {
  image(pg, 0, 0);
  for (let i=0; i<loadingSatellites.length; i++) {
    let sat = loadingSatellites[i];
    sat.traceC();
    sat.expand();
  }
  startSpiral.spiral();
  startCircle.display();
  startCircle.expand();
}

function changeLeafBlipColor(){
  leafColor = 1;
}

function scene_one(){
  for (let i=0; i<sceneOneBlips.length; i++) {
    let blip = sceneOneBlips[i];
    blip.display();
    blip.blip();
  }
  if (random(2) < 1) {
    if (leafColor == 0) {
      let blip = new PlantObject(lingoColors[1],3,random(width),random(height));
      sceneOneBlips.push(blip);
    }
    else{
      let blip = new PlantObject(lingoColors[2],3,random(width),random(height));
      sceneOneBlips.push(blip);
    }
  }
}

function scene_two(){
  for (let i=0; i<sceneOneBlips.length; i++) {
    let blip = sceneOneBlips[i];
    blip.display();
    blip.fall();
  }
}

function scene_three(){
  for (let i=0; i<sceneOneBlips.length; i++) {
    let blip = sceneOneBlips[i];
    blip.display();
    blip.otherWay();
  }
}

function transition_two(){
  waveTest.wave();
}

function transition_three(){
  wave2.wave();
}

function transition_four(){
  wave3.wave();
}

function scene_four(){
  rectangles[0].display();
  rectangles[0].fall();
  for (let i = 1; i < rectangles.length; i++){
    rectangles[i].display();
    if (rectangles[i-1].dropped == true) {
      rectangles[i].fall();
    }
  }
}

function scene_five(){
  for (let i = 0; i < rectangles.length; i++){
    rectangles[i].display();
    rectangles[i].goToMiddle();
    if (rectangles[i].middle == true) {
      if (i==0){
        rectangles[i].moveLeft(width/2-400);
      }
      if (i==1){
        rectangles[i].moveLeft(width/2-300);
      }
      if (i==2){
        rectangles[i].moveLeft(width/2-200);
      }
      if (i==3){
        rectangles[i].moveLeft(width/2-100);
      }
      if (i==5){
        rectangles[i].moveRight(width/2+100);
      }
      if (i==6){
        rectangles[i].moveRight(width/2+200);
      }
      if (i==7){
        rectangles[i].moveRight(width/2+300);
      }
      if (i==8){
        rectangles[i].moveRight(width/2+400);
      }
    }
  }
}

function scene_six(){
  for (let i = 0; i < rectangles.length; i++){
    rectangles[i].display();
    rectangles[i].expandSmall();
  }
}

function backgroundFlash(){
  frameRate(5);
  background(backgroundFlashVar);
  if(backgroundFlashVar == levitatingColors[5]){
    backgroundFlashVar = lingoColors[2];
  }
  else{
    backgroundFlashVar = levitatingColors[5];
  }
}

function backgroundFlash2(){
  frameRate(5);
  background(backgroundFlashVar2);
  if(backgroundFlashVar2 == levitatingColors[4]){
    backgroundFlashVar2 = levitatingColors[3];
  }
  else{
    backgroundFlashVar2 = levitatingColors[4];
  }
}

function backgroundFlash3(){

  background(backgroundFlashVar3);
  if(backgroundFlashVar3 == destinyColors[1]){
    backgroundFlashVar3 = destinyColors[2];
  }
  else{
    backgroundFlashVar3 = destinyColors[1];
  }
}

function scene_seven(){
  for (let i=0; i<stars.length/2; i++) {
      stars[i].show();
      stars[i].update();
  }
  for (let i = 0; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].moveUp(height/4);
    rectangles[i].moveDown(height-height/4);
  }
  for (let i = 1; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].moveDownB(height-height/4);
    rectangles[i].moveUpB(height/4);

  }

  // rectangles[4].traceC();
  // rectangles[4].shrinkSmall();
  // rectangles[4].expandSmall();
  for (let i=stars.length/2; i<stars.length; i++) {
      stars[i].show();
      stars[i].update();
  }

}

function scene_eight(){
  for (let i=0; i<stars.length/2; i++) {
      stars[i].show();
      stars[i].update();
  }
  for (let i = 0; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].moveUp(height/4);
    rectangles[i].moveDown(height-height/4);
    rectangles[i].shrinkSmall();
    rectangles[i].expandSmall();
  }
  for (let i = 1; i < rectangles.length; i+=2){
    rectangles[i].moveDownB(height-height/4);
    rectangles[i].moveUpB(height/4);
    rectangles[i].traceC();
    rectangles[i].shrinkSmall();
    rectangles[i].expandSmall();
  }

  for (let i=stars.length/2; i<stars.length; i++) {
      stars[i].show();
      stars[i].update();
  }
}

function scene_nine(){
  for (let i=0; i<stars.length/2; i++) {
      stars[i].show();
      stars[i].update();
  }
  for (let i = 0; i < rectangles.length; i+=2){
    rectangles[i].traceC();
    rectangles[i].moveUp(height/4);
    rectangles[i].moveDown(height-height/4);
    rectangles[i].shrinkSmall();
    rectangles[i].expandSmall();
  }
  for (let i = 1; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].moveDownB(height-height/4);
    rectangles[i].moveUpB(height/4);
    rectangles[i].shrinkSmall();
    rectangles[i].expandSmall();
  }

  for (let i=stars.length/2; i<stars.length; i++) {
      stars[i].show();
      stars[i].update();
  }
}

function scene_ten(){
  for (let i=0; i<stars.length; i++) {
      stars[i].show();
      stars[i].update();
  }

  let randomX = random(width);
  let randomY = random(height);

  if (random(20) < 1) {
    for (var i = 0; i < 360; i++) {
      fireworks.push(new Firework(randomX + random(-30, 30), randomY + random(-30, 30)));
    }
  }

  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].render();
    if (fireworks[i].ballisFinished()) {
      fireworks.splice(i, 1);
    }
  }
}

function scene_eleven(){
  for (let i = 0; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].goTo(width/2-25,height/2);
  }
  for (let i = 1; i < rectangles.length; i+=2){
    rectangles[i].display();
    rectangles[i].goTo(width/2+25,height/2);
  }
}

function scene_twelve(){
  for (let i = 0; i < rectangles.length; i++){
    rectangles[i].display();
  }
  rectangles[0].burst(-60,-60);
  rectangles[1].burst(300,-60);
  rectangles[2].burst(width-300,-60);
  rectangles[3].burst(width,-60);
  rectangles[4].burst(width/2,-60);
  rectangles[5].burst(0,height+60);
  rectangles[6].burst(300,height+60);
  rectangles[7].burst(width-300,height+60);
  rectangles[8].burst(width,height+60);
}

function scene_thirteen(){
  flashBox.display();
  flashBox.move();
  flashBox.grow();
}



function test_scene(){
  for (let i=0; i<endingSatellites.length; i++) {
    let sat = endingSatellites[i];
    sat.traceC();
    sat.traceC();
    sat.traceC();
    sat.expand();
    sat.expand();
  }
  for (let i=0; i<endingSatellites2.length; i++) {
    let sat = endingSatellites2[i];
    sat.traceC();
    sat.traceC();
    sat.traceC();
    sat.expand();
    sat.expand();
  }
  for (let i=0; i<endingSatellites3.length; i++) {
    let sat = endingSatellites3[i];
    sat.traceC();
    sat.traceC();
    sat.traceC();
    sat.expand();
    sat.expand();
  }
  for (let i=0; i<endingSatellites4.length; i++) {
    let sat = endingSatellites4[i];
    sat.traceC();
    sat.traceC();
    sat.traceC();
    sat.expand();
    sat.expand();
  }
}

//built in functions
function mousePressed(){
  if(whichScene === -1){
    whichScene = 0;
    if (bTrack.isLoaded()) {
    // if so, play the sound (and, optionally, loop it)
      bTrack.setVolume(.2);
      bTrack.play();
    }
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
