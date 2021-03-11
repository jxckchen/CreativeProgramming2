let posX, posY;

function preload() {
  yawn = loadImage('assets/ollieyawn.jpg');
  ollie = loadImage('assets/olliecone.jpg');
  me = loadImage('assets/me.jpg');
  yawn2 = loadImage('assets/ollieyawn.jpg');
  ollie2 = loadImage('assets/olliecone.jpg');
  me2 = loadImage('assets/me.jpg');
  instagram = loadImage('assets/InstagramArtboard 1.png');
  tiktok =    loadImage('assets/TikTokOverlay.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  yawn.resize(0,height);
  yawn2.resize(0,height);
  me.resize(0,height);
  me2.resize(0,height);
  ollie.resize(0,height);
  ollie2.resize(0,height);
  instagram.resize(0,height);







}

function changeImage(){
  // yawn = contrast(yawn,-50);
  // yawn = brighten(yawn,10);
  // yawn = fisheye(yawn,posX,posY);
  // yawn = boost(yawn,125,50,0);
  // image(yawn,0,0);
  // ollie = contrast(ollie,-50);
  // ollie = brighten(ollie,10);
  // ollie = fisheye(ollie,posX,posY);
  // ollie = boost(ollie,0,0,125);
  // image(ollie,0,0);
  me = contrast(me,-50);
  me = brighten(me,10);
  me = fisheye(me,posX,posY);
  me = boost(me,0,150,0);
  image(me,0,0);
}

function mouseClicked(){
  posX = mouseX;
  posY = mouseY;
  print(posX);
  changeImage();
  image(instagram, 0,0);
  save('instagram.png');

}

function draw() {
  //image(yawn,0,0);
  //image(ollie,0,0);
  image(me,0,0);
    //image(yawn2,yawn.width,0);
}

// brighten the pixels in an image by
// a specified amount
function brighten(input, amount) {
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {

      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];

      // make adjustments to color, using
      // constrain() to ensure it doesn't go
      // outside the 0–255 range
      r += amount;
      r = constrain(r, 0,255);
      g += amount;
      g = constrain(g, 0,255);
      b += amount;
      b = constrain(b, 0,255);

      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }

  // send the image back
  input.updatePixels();
  return input;
}


function fisheye(input, centerX, centerY) {
  let distances = [
    dist(centerX,centerY, 0,0),
    dist(centerX,centerY, input.width,0),
    dist(centerX,centerY, input.width,input.height),
    dist(centerX,centerY, 0,input.height)
  ];
  let distanceMax = max(distances);

  let output = createImage(input.width, input.height);
  input.loadPixels();
  output.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {

      // calculate the angle and distance between our
      // center point and the current x/y position
      // (these are 'polar' coordinates – a position defined
      // not by x/y but by angle and distance!)
      let distance = dist(x,y, centerX,centerY);  // also called 'rho'
      let angle = atan2(y-centerY, x-centerX);    // also called 'theta'

      // the magic!
      // first, a fisheye effect
      // transform distance my squaring it, then dividing
      // by the max possible distance from the center
      // the angle value stays the same
      distance = distance * distance / distanceMax;

      // ...or try these (comment out the others)

      // ripple effect
      // use distance with sin(), keep angle the same
      // distance = distance + 8 * sin(distance/2);

      // freaky twist
      // square angle and divide by 360º, keep distance the same
      // angle = angle * angle / TWO_PI;

      // convert back to cartesian (x/y) coordinates
      // using some trig so we can grab a pixel from the
      // the source image
      let tempX = centerX + cos(angle) * distance;
      let tempY = centerY + sin(angle) * distance;

      // get the pixel and put it into the output image
      let px = input.get(tempX, tempY);
      output.set(x,y, px);
    }
  }
  output.updatePixels();
  return output;
}

// contrast is the amount of variation between
// light and dark in an image – higher contrast
// means lighter lights an darker darks
// the math is a bit tricky but that's why the
// internet exists!
// mostly via:
// http://stackoverflow.com/q/13500289/1167783
function contrast(input, amount) {

  // this implementation expects the amount
  // to be 0–4, so we convert to that range
  amount = map(amount, -255,255, 0,4);

  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {

      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];

      // convert rgb to range of 0–1
      r /= 255;
      g /= 255;
      b /= 255;

      // apply the contrast formula
      r = (((r - 0.5) * amount) + 0.5) * 255.0;
      g = (((g - 0.5) * amount) + 0.5) * 255.0;
      b = (((b - 0.5) * amount) + 0.5) * 255.0;

      // make sure we don't go past 0–255 range
      r = constrain(r, 0,255);
      g = constrain(g, 0,255);
      b = constrain(b, 0,255);

      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }

  // send the image back
  input.updatePixels();
  return input;
}

function boost(input, red, green, blue) {
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {

      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];

      r = r + red;
      g = g + green;
      b = b + blue;


      r = constrain(r, 0,255);
      g = constrain(g, 0,255);
      b = constrain(b, 0,255);

      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }

  // send the image back
  input.updatePixels();
  return input;
}
