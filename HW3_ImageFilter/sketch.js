let bladeRunnerImg, control;

let blur = [
  [ 0.0625, 0.125, 0.0625 ],
  [ 0.125,  0.25,  0.125 ],
  [ 0.0625, 0.125, 0.0625 ]
];

function preload() {
  bladeRunnerImg = loadImage('assets/Blade-Runner-2049-0484.jpg');
  control = loadImage('assets/Blade-Runner-2049-0484.jpg');
  ctown = loadImage('assets/ctown.jpg');
  ctown2 = loadImage('assets/ctown.jpg');
  arsham = loadImage('assets/arsham.jpg');
  snow = loadImage('assets/snow.jpg');
  arsham2 = loadImage('assets/arsham.jpg');
  snow2 = loadImage('assets/snow.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  ctown.resize(0,height);
  ctown2.resize(0,height);
  arsham.resize(0,height);
  arsham2.resize(0,height);
  snow.resize(0,height);
  snow2.resize(0,height);

  //ctown = duotone(ctown, color(0,0,100), color(255, 148, 178));
  arsham = contrast(arsham,-125);
  arsham = duotone(arsham, color(0, 0, 100), color(255, 148, 178));
  //snow = duotone(snow, color(0,0,100), color(255, 148, 178));

  arsham = redSquares(arsham);
  //ctown = redSquares(ctown);

}

function draw() {
  // image(ctown,0,0);
  // image(ctown2,ctown.width,0);
  image(arsham,0,0);
  image(arsham2,arsham.width,0);
  // image(snow,0,0);
  // image(snow2,snow.width,0);
  fill(0);
  //square(300,0,600);
}

function duotone(input, c1, c2) {

  // go through all pixels in the image, skips some going horizontally
  input.loadPixels();
  for (let y=0; y<input.height; y+=1) {
    for (let x=0; x<input.width; x+=1) {

      // get the red pixel value (an approx
      // of brightness)
      let bright = input.get(x, y)[0];

      // lerpColor() needs values 0–1, so
      // divide by 255
      bright /= 255;

      // create a new color for the pixel that's
      // somewhere between the two colors we
      // specified, then set the pixel to that color
      let newColor = lerpColor(c1, c2, bright);
      input.set(x, y, newColor);
    }
  }
  // all done, send the processed image back!
  input.updatePixels();
  return input;
}

function redSquares(input){
  input.loadPixels();
  print("Height" + input.height);
  for (let y =0; y < input.height; y++){
    for(let x = 0; x < input.width; x++){
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      if(random(10000)>9999){
        let randLength = random(10,50);
        let randHeight = random(5,15);
        for (let i = x; i < x+randLength; i+=random(1,3)){
          for(let j = y; j< y+randHeight; j++){

            let index = (i + j * input.width) * 4;
            let r = input.pixels[index];
            let g = input.pixels[index + 1];
            let b = input.pixels[index + 2];
            let a = input.pixels[index + 3];

            sumR += blur[1][1] * r;
            //sumG += blur[1][1] * g;
            //sumB += blur[1][1] * b;

            sumR = constrain(sumR, 0,255);
            //sumG = constrain(sumG, 0,255);
            //sumB = constrain(sumB, 0,255);

            let bright = input.get(i, j)[0];
            bright /= 255;
            let newColor = lerpColor(color(200,100,100), color(138,0,0), bright);
            input.set(i,j,newColor);

            input.pixels[index] = sumR;
            //input.pixels[index + 1] = sumG;
            //input.pixels[index + 2] = sumB;
            input.pixels[index+3] = 200;

          }
        }
      }
    }
  }
  input.updatePixels();
  return input;
}

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

function getSet() {
  loadPixels();
  for(let x = 0; x<10; x++) {
    let px = get(x, 0);
    console.log(px);
  }

  let px = get(100,100);
  let r = px[0];
  let g = px[1];
  let b = px[2];

  for(let i = 0; i<3000; i++) {
    let x = random(0,width);
    let y = random(0,height);
    set(x,y,color(0));
  }
  updatePixels();
}

function filters() {
  // FILTERS
  //filter(GRAY);
  //filter(THRESHOLD, 0.3);
  //filter(INVERT);
  //filter(BLUR, 8);

  //increases light areas of an loadImage: smooth edges and fill holes
  //filter(DILATE);
  //filter(DILATE);
  //filter(DILATE);

  //does opposite. Removes bridges between objects
  //filter(ERODE);
  //filter(ERODE);
  //filter(ERODE);
}

function pixelAccess() {
  bladeRunnerImg.loadPixels();

  //very important
  for (let y =0; y < bladeRunnerImg.height; y+=10){
    for(let x = 0; x<bladeRunnerImg.width; x+=10){
      let index = (y*bladeRunnerImg.width + x)*4;
      let r = bladeRunnerImg.pixels[index];
      let g = bladeRunnerImg.pixels[index+1];
      let b = bladeRunnerImg.pixels[index+2];
      let a = bladeRunnerImg.pixels[index+3];

      bladeRunnerImg.pixels[index] = 0;
      bladeRunnerImg.pixels[index+1] = 150;
      bladeRunnerImg.pixels[index+2] = 255;
      bladeRunnerImg.pixels[index+3] = 255;
    }
  }
  bladeRunnerImg.updatePixels();
  image(bladeRunnerImg,0,0);
}

function grayScale() {
  bladeRunnerImg.loadPixels();
  for (let y =0; y < bladeRunnerImg.height; y++){
    for(let x = 0; x<bladeRunnerImg.width; x++){
      let index = (y*bladeRunnerImg.width + x)*4;
      let r = bladeRunnerImg.pixels[index];
      let g = bladeRunnerImg.pixels[index+1];
      let b = bladeRunnerImg.pixels[index+2];
      let a = bladeRunnerImg.pixels[index+3];
      let bright = (0.2126*r) + (0.7152*g) + (0.0722 * b);
      bladeRunnerImg.pixels[index] = bright;
      bladeRunnerImg.pixels[index+1] = bright;
      bladeRunnerImg.pixels[index+2] = bright;
    }
  }
  bladeRunnerImg.updatePixels();

  image(bladeRunnerImg, 0,0);
  image(control, width/2,0);
}

function threshold() {

}
