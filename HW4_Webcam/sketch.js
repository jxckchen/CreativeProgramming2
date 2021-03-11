let video;

let tolerance = 5;
let colorToMatch;

let flow;
let previousPixels;
let fgridSize = 24;
let ignoreThresh = 12;

function setup() {
  createCanvas(640,480);

  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  flow = new FlowCalculator(fgridSize);

  colorToMatch = color(255,0,0);
}

function draw() {
  //background(255);
  //circleMatrix();
  //colorTracking();
  opticalFlow();
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
  image(video,0,0);
  let firstPx = findColor(video, colorToMatch, tolerance);
  if(firstPx !== undefined) {
    fill(colorToMatch);
    stroke(255);
    strokeWeight(2);
    circle(firstPx.x,firstPx.y,30);
  }

}

function mousePressed(){
  loadPixels();
  colorToMatch = get(mouseX,mouseY);
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

      if (r >= matchR-tolerance && r <= matchR+tolerance &&
          g >= matchG-tolerance && g <= matchG+tolerance &&
          b >= matchB-tolerance && b <= matchB+tolerance) {
            return createVector(x,y);
          }
    }
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
