let scene = -1;
let screenW,screenH;
let btnStart, btnStop;
let bgText = [];
let testText;

let capture;
let numFrames = 100;

let controlPanel;

let yWave, yWaveSize, yWaveLength, yWaveSpeed;

let textOutlinePoints, textOutlineBounds;

let wipeX = 0;
let wipeDirection = true;

let rec1, rec2, rec3, rec4, rec5;

let squareGrid = [];
let allSquaresShown = false;

let bg = [0,177,64];

//creategraphics buffer
//clear


function preload() {
  akira = loadFont('assets/Akira Expanded Demo.otf');
  jcaLogo = loadImage('assets/JCA_HorizontalLogoWhite.png');
}

function setup() {
  let canvas = createCanvas(1280,720);
  canvas.id('canvas');
  capture = new CCapture({
    format: 'png',
    name: 'frames'
  });

  repeatingText();
  textAlign(CENTER);
  textOutlinePoints = akira.textToPoints('X9 LEAGUE', 0, 0, 100, {
    sampleFactor: .3,
    simplifyThreshold: 0
  });
  textOutlineBounds = akira.textBounds('X9 LEAGUE', 0, 0, 100);
  rec1 = new Rectangle(0,height,width/5,height*2+10,[0,0,255],true);
  rec2 = new Rectangle(width*1/5,-height*2,width/5,height*2,[0,0,255],false);
  rec3 = new Rectangle(width*2/5,height,width/5,height*2+10,[0,0,255],true);
  rec4 = new Rectangle(width*3/5,-height*2,width/5,height*2,[0,0,255],false);
  rec5 = new Rectangle(width*4/5,height,width/5,height*2+10,[0,0,255],true);
  btnStart = createButton("Start Recording");
  btnStop = createButton("Stop Recording");
  createGrid();


  scene = -1;

}


function draw() {
  //clear(); for no background

  background(bg);
  //noLoop();
  btnStart.mousePressed(startRecord);
  btnStop.mousePressed(stopRecord);

  // if (frameCount === numFrames) {
  //   print("done");
  //   noLoop();
  //   capture.stop();
  //   capture.save();
  //   return;
  // }

  if (scene == -1){
    background(20);
    wipeX = 0;
    startScreen();
  }
  if (scene == 0){
    for(let i = 0; i<bgText.length;i++){
      bgText[i].display();
      bgText[i].move();
    }
  }
  if (scene == 1){
    wavyText(width/2,height/2);

  }
  if (scene == 2){
    textOutline();

  }
  if (scene == 3){

  }
  if (scene == 4){

  }
  if (scene == 5){

  }
  if (scene == 6){

  }
  if (scene == 7){

  }
  if (scene == 8){

  }
  if (scene == 9){

  }
  if (scene == 10){
    wipe();
  }
  if (scene == 11){
    rec1.display();
    if(rec1.scrolled == true){
      rec1.scrollDown();
    }else{
      rec1.scrollUp();
    }
    rec2.display();
    if(rec2.scrolled == true){
      rec2.scrollUp();
    }else{
      rec2.scrollDown();
    }
    rec3.display();
    if(rec3.scrolled == true){
      rec3.scrollDown();
    }else{
      rec3.scrollUp();
    }
    rec4.display();
    if(rec4.scrolled == true){
      rec4.scrollUp();
    }else{
      rec4.scrollDown();
    }
    rec5.display();
    if(rec5.scrolled == true){
      rec5.scrollDown();
    }else{
      rec5.scrollUp();
    }

  }
  if (scene == 12){
    // if(squareGrid.every(x => x.appeared == true)){
    //   if(random(1000000)>900999){
    //     squareGrid[Math.floor(Math.random() * squareGrid.length)].color = bg;
    //   }
    // }
    // else{
      for(let i = 0; i<squareGrid.length;i++){
        squareGrid[i].display();
      }
    //}


  }
  if (scene == 9){

  }
  if (scene == 9){

  }

  capture.capture(document.getElementById('canvas'));
}




function mousePressed(){
}


function startScreen(){
  //Title
  imageMode(CENTER);
  image(jcaLogo, width/2, height/6-50, 300, 45);
  noStroke();
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(255);
  textFont(akira);
  text("STREAM GRAPHICS GENERATOR",width/2+15,height/6);

  //Categories
  fill(150);
  rectMode(CENTER);
  rect(width*1/4,height*2/6,440,30);
  rect(width*3/4,height*2/6,440,30);
  rect(width*1/4,height*4/6,440,30);
  rect(width*3/4,height*4/6,440,30);
  fill(255);
  textSize(15);
  text("TEXT ANIMATIONS",width*1/4,height*2/6);
  text("LOGO ANIMATIONS",width*3/4,height*2/6);
  text("TRANSITIONS",width*1/4,height*4/6);
  text("SHAPES AND ELEMENTS",width*3/4,height*4/6);

  //Individual Selections

  square(width*1/4,height*2/6+60,70);
  square(width*1/4 - 92,height*2/6+60,70);
  square(width*1/4 - 184.5,height*2/6+60,70);
  square(width*1/4 + 92,height*2/6+60,70);
  square(width*1/4 + 184.5,height*2/6+60,70);
  fill(0);
  text("0",width*1/4 - 184.5,height*2/6+60);
  text("1",width*1/4 - 92,height*2/6+60);
  text("2",width*1/4,height*2/6+60);
  text("3",width*1/4 + 92,height*2/6+60);
  text("4",width*1/4 + 184.5,height*2/6+60);
  fill(255);

  square(width*1/4,  height*4/6+60,70);
  square(width*1/4 - 92,height*4/6+60,70);
  square(width*1/4 - 184.5,height*4/6+60,70);
  square(width*1/4 + 92,height*4/6+60,70);
  square(width*1/4 + 184.5,height*4/6+60,70);
  fill(0);
  text("a",width*1/4 - 184.5,height*4/6+60);
  text("b",width*1/4 - 92,height*4/6+60);
  text("c",width*1/4,height*4/6+60);
  text("d",width*1/4 + 92,height*4/6+60);
  text("e",width*1/4 + 184.5,height*4/6+60);
  fill(255);

  square(width*3/4,height*2/6+60,70);
  square(width*3/4 - 92,height*2/6+60,70);
  square(width*3/4 - 184.5,height*2/6+60,70);
  square(width*3/4 + 92,height*2/6+60,70);
  square(width*3/4 + 184.5,height*2/6+60,70);
  fill(0);
  text("5",width*3/4 - 184.5,height*2/6+60);
  text("6",width*3/4 - 92,height*2/6+60);
  text("7",width*3/4,height*2/6+60);
  text("8",width*3/4 + 92,height*2/6+60);
  text("9",width*3/4 + 184.5,height*2/6+60);
  fill(255);

  square(width*3/4,height*4/6+60,70);
  square(width*3/4 - 92,height*4/6+60,70);
  square(width*3/4 - 184.5,height*4/6+60,70);
  square(width*3/4 + 92,height*4/6+60,70);
  square(width*3/4 + 184.5,height*4/6+60,70);
  fill(0);
  text("f",width*3/4 - 184.5,height*4/6+60);
  text("g",width*3/4 - 92,height*4/6+60);
  text("h",width*3/4,height*4/6+60);
  text("i",width*3/4 + 92,height*4/6+60);
  text("j",width*3/4 + 184.5,height*4/6+60);
  fill(255);
}

function wavyText(x,y){
  inpText = String("X9 LEAGUE");
  // fontSize = fontSizeSlider.value();
  // tracking = trackingSlider.value();
  // yWaveSize = yWaveSizeSlider.value();
  // yWaveLength = yWaveLengthSlider.value();
  // yWaveSpeed = yWaveSpeedSlider.value();

  fontSize = 50;
  //0-100
  tracking = 50;
  //0-100
  yWaveSize = 15;
  //0-PI
  yWaveLength = 0.2;
  //0-0.25
  yWaveSpeed = .05;

  // Center matrix - location of wavytext
  translate(x,y-50);

  // Reposition  matrix depending on width & height of the grid
  translate(-(inpText.length-1)*tracking/2,0);

  noStroke();
  textFont(akira);
  textSize(fontSize);
  textAlign(CENTER);

  for(var i = 0; i < inpText.length; i++){
    yWave = sin(frameCount*yWaveSpeed + i*yWaveLength) * yWaveSize;

    fill(255);
    push();
    translate(i*tracking,0);
    //ellipse(0,yWave,5,5);
    //how many texts
    text(inpText.charAt(i),0,yWave);
    text(inpText.charAt(i),0,yWave+50);
    text(inpText.charAt(i),0,yWave+100);
    pop();
  }

}

function repeatingText(){
  for(let i = -70; i <= height; i+=70){
    testText = new TextObject(" REPEATED TEXT EXAMPLE",akira,width/2,i,70,255);
    bgText.push(testText);
  }
}

function textOutline(){
  beginShape();
  translate(width/2-350,height/2);
  //translate(-textOutlineBounds.x * width / textOutlineBounds.w, -textOutlineBounds.y * height / textOutlineBounds.h);
  fill(255);
  for (let i = 0; i < textOutlinePoints.length; i+=2) {
    let p = textOutlinePoints[i];
    circle(p.x, p.y,2);
  }
  endShape(CLOSE);
}

function wipe(){
  rectMode(CORNER);
  if(wipeDirection == true){
    if(wipeX < width*2){
      fill(0,0,255);
      rect(-(width*3)+wipeX, 0, width*3, height);
      fill(255);
      rect(wipeX,0,50,height);
      wipeX+=40;
    }
    else{
      wipeDirection = false;
    }
  } else {
    if(wipeX > -width){
      background(0,0,255);
      fill(0,0,255);
      rect(wipeX,0,width,height);
      fill(255);
      rect(wipeX,0,50,height);
      wipeX-=40;
    }
    else{
      wipeDirection = true;
    }
  }

}

function createGrid(){
  for(let i = 0; i<width+20;i+=width/15){
    for(let j = 0; j<height+20;j+=width/15){
      let sq = new GridSquare(i,j,width/15,random(255),255);
      squareGrid.push(sq);
    }
  }
}



class TextObject {
  constructor(text,font,x,y,size,color){
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.size = size;
  }
    //display text
  display() {
    push();
    translate(this.x, this.y);
    textSize(this.size);
    textAlign(CENTER);
    textFont(this.font);
    fill(this.color);
    text(this.text, 0,0);
    pop();
  }

  move(){
    if(this.y > height+this.size){
      this.y = -this.size/1.5;
    }
    this.y+=1;
  }

}

class Rectangle {
  constructor(x,y,len,wid,color,direction){
    this.x = x;
    this.y = y;
    this.len = len;
    this.wid = wid;
    this.color = color;
    this.scrolled = false;
    this.direction = direction; //false = down
  }

  display(){
    rectMode(CORNER);
    fill(this.color);
    rect(this.x,this.y,this.len,this.wid);
  }

  resetUp(){

  }

  resetDown(){
    this.y = height;
  }

  scrollUp(){
    if(this.direction == true){
      if(this.y >= -height+10){
        this.y-=30;
      }
      else{
        this.scrolled = true;
      }
    }else{
      if(this.y >= -height*2){
        this.y-=30;
      }
      else{
        this.scrolled = false;
      }
    }

  }

  scrollDown(){
    if(this.direction == false){
      if(this.y <= -10){
        this.y+=30;
      }
      else{
        this.scrolled = true;
      }
    } else {
      if(this.y <= height){
        this.y+=30;
      }
      else{
        this.scrolled = false;
      }
    }

  }
}

class GridSquare {
  constructor(x,y,len,color,alpha){
    this.x = x;
    this.y = y;
    this.len = len;
    this.color = color;
    this.alpha = alpha;
    this.appeared = false;
  }

  display(){
    if(this.appeared == false){
      if(random(1000000)>900999){
        this.appeared = true;
      }
    }
    else{
      push();
      translate(this.x,this.y);
      fill(this.color);
      square(0,0,this.len);
      pop();
    }
  }

  hide(){
    if(this.appeared == true){
      if(random(1000000)>900999){
        this.appeared = false;
      }
    }
    else{
      push();
      translate(this.x,this.y);
      fill(bg);
      square(0,0,this.len);
      pop();
    }
  }

  gradient(){
  }
}

function startRecord(){
  print("start record");
  capture.start();
}

function stopRecord(){
  print("done");
  noLoop();
  capture.stop();
  capture.save();
  return;
}

function keyPressed() {
  //backspace = menu
  if (keyCode === BACKSPACE) {
    scene = -1;
  // 0
  } else if (keyCode === 48) {
    scene = 0;
  }
  //1
  else if (keyCode === 49) { scene = 1 }
  //2
  else if (keyCode === 50) { scene = 2 }
  //3
  else if (keyCode === 51) { scene = 3 }
  //4
  else if (keyCode === 52) { scene = 4 }
  //5
  else if (keyCode === 53) { scene = 5 }
  //6
  else if (keyCode === 54) { scene = 6 }
  //7
  else if (keyCode === 55) { scene = 7 }
  //8
  else if (keyCode === 56) { scene = 8 }
  //9
  else if (keyCode === 57) { scene = 9 }
  //a
  else if (keyCode === 65) { scene = 10 }
  //b
  else if (keyCode === 66) { scene = 11 }
  //c
  else if (keyCode === 67) { scene = 12 }
  //d
  else if (keyCode === 68) { scene = 13 }
  //e
  else if (keyCode === 69) { scene = 14 }
  //f
  else if (keyCode === 70) { scene = 15 }
  //g
  else if (keyCode === 71) { scene = 16 }
  //h
  else if (keyCode === 72) { scene = 17 }
  //i
  else if (keyCode === 73) { scene = 18 }
  //j
  else if (keyCode === 74) { scene = 19 }
  //k
  else if (keyCode === 75) { scene = 20 }
  //l
  else if (keyCode === 76) { scene = 21 }
}

function windowResized() {
  //setup();
}
