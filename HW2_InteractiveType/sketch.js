/*
Jack Chen | 2020 | jackchen.co
Dior Interactive Type Sketches
*/
let bluePalette = ['rgb(5, 5, 20)',
                   'rgb(197, 197, 199)',
                   'rgb(155, 150, 150)',
                   'rgb(143, 155, 170)',
                   'rgb(42, 57, 102)'];
let pinkPalette = ['rgb(0, 0, 0)',
                   'rgb(251, 239, 232)',
                   'rgb(243, 200, 197)',
                   'rgb(231, 165, 164)',
                   'rgb(155, 67, 74)'];
let brownPalette = ['rgb(50, 50, 100)',
                   'rgb(217, 205, 169)',
                   'rgb(174, 156, 118)',
                   'rgb(89, 56, 32)',
                   'rgb(62, 45, 33)'];

let repeatedDior = [], repeatedDior2 = [];

let str = 'heavenly cupcakes surely are good ';
let christianStr = 'CHRISTIAN DIOR';

let startAngle =    0;     // angle where text should start
let distanceAngle = 360;   // how far (in degrees) text will go

let radius;                // set dynamically in setup()

let diorStr = 'Dior';

let letter, logo, repeatedMonogram = [], repeated2 = [], repeated3 = [];

//chevron
let g = 10;
let cellnum = 200;
let cellnum2 = 200;
let speed = 0.5;

let topPG,bottomPG;


function preload(){
  diorFont = loadFont('assets/OPTINaval.otf');
  diorFont2 = loadFont('assets/Nicolas Cochin EF Regular.ttf');
  avenir = loadFont('assets/Metropolis-Bold.otf');
  oswald = loadFont('assets/Oswald-Medium.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  topPG = createGraphics(width,75);
  bottomPG = createGraphics(width,75);
  for (let i = 0; i <= windowHeight; i+=200){
    let textWhite = new TextObject("Dior", width/2, i,255);
    let textBrown = new TextObject("Dior", width/2, i,brownPalette[4]);
    repeatedDior.push(textBrown);
  }
  for (let i = 100; i <= windowHeight; i+=200){
    let textWhite = new TextObject("Dior", width/2, i,255);
    repeatedDior2.push(textWhite);
  }

//blue
  for (let i = -100; i <= windowWidth+200; i += 300){
    for (let j = 100; j <= windowHeight+200; j+= 400){
      let newLogo = new DiorText(i,j,bluePalette[4]);
      repeatedMonogram.push(newLogo);
    }
  }

//grey
  for (let i = -200; i <= windowWidth+200; i += 300){
    for (let j = -166; j <= windowHeight+200; j+= 400){
      let newLogo = new DiorText(i,j,bluePalette[4]);
      repeated2.push(newLogo);
    }
  }

  //light
  for (let i = -300; i <= windowWidth+200; i += 300){
    for (let j = -433; j <= windowHeight+200; j+= 400){
      let newLogo = new DiorText(i,j,bluePalette[4]);
      repeated3.push(newLogo);
    }
  }

  logo = new DiorText(width/2,height/2,bluePalette[4]);
  letter = new DiorLetter(width/2,height/2, 200,bluePalette[4], diorStr[0]);

  //noCursor();
}

function draw() {
  background(brownPalette[1]);
  //textCircle();
  //sketch1();
  //sketch2();
  finalSketch();
  diorRectangle2();
  imageMode(CORNER);
  image(topPG,0,height/2-210);
  topPG.background(bluePalette[0]);
  image(bottomPG,0,height/2+134);
  bottomPG.background(bluePalette[0]);
  chevronPattern_top();
  chevronPattern_bottom();
}

// function diorRectangle(){
//   rectMode(CENTER);
//   noStroke();
//   fill(bluePalette[0]);
//   rect(width/2,height/2+2,width,height/2.45);
//   print(height/2);
//   fill(brownPalette[1]);
//   rect(width/2,height/2,width,height/4);
//   fill(bluePalette[0]);
//   rect(width/2,height/2,width,height/5);
//   textSize(20);
//   textAlign(CENTER);
//   textFont(avenir);
//   fill(0);
//   text("P A R I S", width/2,height-height/3-45);
//   textSize(175);
//   textFont(oswald);
//   fill(brownPalette[1]);
//   text(christianStr, width/2, height/2+70);
// }

function diorRectangle2(){
  rectMode(CORNER);
  noStroke();
  fill(bluePalette[0]);
  rect(0,height/2-210,width,75);

  rectMode(CORNER);
  fill(brownPalette[1]);
  rect(0,height/2-135,width,30);
  rect(0,height/2+105,width,30);

  rectMode(CENTER);
  fill(bluePalette[0]);
  rect(width/2,height/2,width,212);

  textSize(20);
  textAlign(CENTER);
  textFont(avenir);
  fill(0);
  text("P A R I S", width/2,height/2+127);

  textSize(175);
  textFont(oswald);
  fill(brownPalette[1]);
  text(christianStr, width/2, height/2+70);
}


function chevronPattern_top(){
  bottomPG.strokeWeight(1);
  for (let i = 0; i < cellnum; i++) {
    for (let j = 0; j < 8; j++) {
      // stroke(0);
      // rect(i * g, j * g, g, g);
      bottomPG.stroke(brownPalette[1]);
      if (i % 2 == 0 && j % 2 == 0) {
        bottomPG.line(i * g, j * g, i * g + g, j * g + g);
      }
      if (i % 2 == 1 && j % 2 == 1) {
        bottomPG.line(i * g + g, j * g, i * g, j * g + g);
      }

      if (i % 2 == 1 && j % 2 == 0) {
        bottomPG.line(i * g, j * g, i * g + g, j * g + g);
      }
      if (i % 2 == 0 && j % 2 == 1) {
        bottomPG.line(i * g + g, j * g, i * g, j * g + g);
      }
    }
  }
  noStroke();
  let x1 = map(mouseX, 0, width, 0,200);
  cellnum=x1;
}

function chevronPattern_bottom(){
  topPG.strokeWeight(1);
  for (let i = 0; i < cellnum2; i++) {
    for (let j = 0; j < 8; j++) {
      topPG.stroke(brownPalette[1]);
      if (i % 2 == 0 && j % 2 == 0) {
        topPG.line(i * g, j * g, i * g + g, j * g + g);
      }
      if (i % 2 == 1 && j % 2 == 1) {
        topPG.line(i * g + g, j * g, i * g, j * g + g);
      }

      if (i % 2 == 1 && j % 2 == 0) {
        topPG.line(i * g, j * g, i * g + g, j * g + g);
      }
      if (i % 2 == 0 && j % 2 == 1) {
        topPG.line(i * g + g, j * g, i * g, j * g + g);
      }
    }
  }
  noStroke();
  let x1 = map(mouseX, 0, width, 0,200);
  cellnum2=x1;
}

function sketch1() {
  for (let i = 0; i < repeatedDior.length; i+=1){
    repeatedDior[i].display();
    repeatedDior[i].updatePositive();
    //repeatedDior[i].update();
  }
  for (let i = 0; i < repeatedDior2.length; i+=1){
    repeatedDior2[i].display();
    repeatedDior2[i].updateNegative();
  }
}

function sketch2(){
  let textWhite = new TextObject("Dior\nDior\nDior\nDior\nDior\nDior\nDior", width/2, height/2,255);
  textWhite.display2();
}

function finalSketch(){
  //logo.displayLogo();
  //logo.displayLogo2();
  //logo.logoToMonogram();
  for (let i = 0; i < repeatedMonogram.length; i+=1){
    repeatedMonogram[i].displayLogo2();
    repeatedMonogram[i].logoToMonogram();
  }
  for (let i = 0; i < repeated2.length; i+=1){
    repeated2[i].displayLogo2();
    repeated2[i].logoToMonogram();
  }
  for (let i = 0; i < repeated3.length; i+=1){
    repeated3[i].displayLogo2();
    repeated3[i].logoToMonogram();
  }
  //logo.move();

  // letter.display();
  // letter.move(500,300);
  //print(letter.y);
}


class DiorLetter {
  constructor(x,y,size,color,letter){
    this.x = x;
    this.y = y;
    this.firstx = x;
    this.firsty = y;
    this.color = color;
    this.letter = letter;
    this.size = size;
  }

  display(){
    push();
    translate(this.x, this.y);
    textSize(this.size);
    textAlign(CENTER);
    textFont(diorFont2);
    fill(this.color);
    text(this.letter, 0,0);
    pop();
  }

  update(){
    this.y++;
  }

  move(targetx,targety){
    if (mouseX <= width){
      let x1 = map(mouseX, 0, width, this.firstx, targetx);
      let y1 = map(mouseX, 0, width, this.firsty, targety);
      if (this.x < targetx) {
        //this.x+=1.75;
        this.x=x1;
      }
      if (this.x > targetx) {
        this.x=x1;
      }
      if (this.y < targety) {
        this.y=y1;
      }
      if (this.y > targety) {
        this.y=y1;
      }
    }
  }


}

class DiorText {

  constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 200;
    this.d = new DiorLetter(this.x-this.size/2.5,this.y,this.size,this.color,diorStr[0]);
    this.i = new DiorLetter(this.x+this.size/10,this.y,this.size,this.color,diorStr[1]);
    this.o = new DiorLetter(this.x+this.size/2.5,this.y,this.size,this.color,diorStr[2]);
    this.r = new DiorLetter(this.x+this.size/1.4,this.y,this.size,this.color,diorStr[3]);
  }

  displayLogo(){
    push();
    translate(this.x, this.y);
    textSize(this.size);
    textAlign(CENTER);
    textFont(diorFont2);
    fill(this.color);
    text(diorStr, 0,200);
    pop();
  }

  displayLogo2(){
    this.d.display(); this.i.display(); this.o.display(); this.r.display();
  }

  logoToMonogram(){
    //print(this.d.x);
    //print(this.d.y);
    this.d.move(this.x,this.y);
    this.i.move(this.x+this.size/-13.33,this.y+this.size/8);
    this.o.move(this.x+this.size/6.66,this.y+this.size/4);
    this.r.move(this.x+this.size/2.857,this.y+this.size/10);
  }

  displayMonogram(){
    textSize(this.size);
    textAlign(CENTER);
    textFont(diorFont2);
    fill(this.color);
    push();
    translate(this.x, this.y);
    text(diorStr[0], 0,0);
    pop();
    push();
    translate(this.x, this.y);
    text(diorStr[1], this.size/-13.33,this.size/8);
    pop();
    push();
    translate(this.x, this.y);
    text(diorStr[2], this.size/6.66,this.size/4);
    pop();
    push();
    translate(this.x, this.y);
    text(diorStr[3], this.size/2.857,this.size/10);
    pop();
  }

  move(){
    this.x++;
    this.d.firstx = this.x-this.size/2.5;
    this.i.firstx = this.x+this.size/10;
    this.o.firstx = this.x+this.size/2.5;
    this.r.firstx = this.x+this.size/1.4;
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
      textSize(100);
      textAlign(CENTER);
      textFont(diorFont);
      fill(this.color);
      text(this.dispText, 0,0);
      pop();
    }

    //change text leading with mouse
    display2() {
      push();
      translate(this.x, this.y);
      textSize(100);
      textAlign(CENTER);
      textFont(diorFont);
      fill(this.color);
      textLeading((mouseX / width) * 100);
      text(this.dispText, 0,0);
      pop();
    }

    updatePositive() {
      let x1 = map(mouseX, 0, width, width/4, width-width/4);
      this.x = x1;
    }
    updateNegative() {
      let x1 = map(mouseX, 0, width, width/4, width-width/4);
      this.x = width-x1;
    }

    update() {
      this.x++;
    }
}

// adds spacing between letters in a string by
// inserting blank characters between each letter
function addLetterSpacing(input, amount, spacer) {

  // 'spacer' character to use
  // (can be passed in as an optional argument, or it
  // will use the unicode 'hair space' one by default)
  spacerCharacter = '\u200A' || spacer;

  // split the string into a list of characters
  let characters = input.split('');

  // create a series of spacers using the
  // repeat() function
  spacerCharacter = spacerCharacter.repeat(amount);

  // use join() to combine characters with the spacer
  // and send back as a string
  return characters.join(spacerCharacter);
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
