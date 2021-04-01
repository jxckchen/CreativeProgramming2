let video;
let model;
let face;

// how much wiggle-room is allowed when
// matching the color?
let tolerance = 5;

// color to look for (set with mouse click)
let colorToMatch;

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.hide();

  loadFaceModel();
}

async function loadFaceModel(){
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    {maxFaces:1});
}

function draw() {
  background(200);

  mesh();

  backgroundGlitch();
  backgroundGlitch();
  backgroundGlitch();

}

function backgroundGlitch(){
  randX = random(0,width);
  randY = random(0,height);
  randWidth = random(10,30);
  randHeight = random(10,30);

  let randomRect = video.get(randX,randY,randWidth,randHeight);
  image(randomRect,randX,randY,randWidth*2,randHeight*2);

}

function mesh(){
  if(video.loadedmetadata && model != undefined){
    getFace();
  }
  if(face != undefined){
    // console.log(face);
    // noLoop();
    image(video,0,0,width,height);
    fill(255);
    noStroke();
    function old(){
    //dots all over face to show which points you can access
    // for (let pt of face.scaledMesh) {
    //   pt = scalePoint(pt);
    //   circle(pt.x,pt.y,3);
    // }

    // fill(235, 209, 152,255);
    // noStroke();
    // beginShape();
    // for (pt of face.annotations.silhouette){
    //   pt = scalePoint(pt);
    //   vertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);


    // let topLeft = scalePoint(face.boundingBox.topLeft);
    // let bottomRight = scalePoint(face.boundingBox.bottomRight);
    // let w = bottomRight.x - topLeft.x;
    // let dia = w / 6;

    // beginShape();
    // for (let pt of face.annotations.leftEyeUpper0) {
    //   pt = scalePoint(pt);
    // }
    // for (let i = face.annotations.leftEyeLower0.length-1; i>=0; i--) {
    //   pt = scalePoint(face.annotations.leftEyeLower0[i]);
    //   vertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);

    // let rightEye = [];
    // for (let pt of face.annotations.rightEyeUpper0) {
    //   pt = scalePoint(pt);
    //   rightEye.push(pt);
    // }
    // for (let pt of face.annotations.rightEyeLower0) {
    //   pt = scalePoint(pt);
    //   rightEye.push(pt);
    // }

    // fill(255);
    // noStroke();
    // beginShape();
    // // for(let pt of leftEye) {
    // //   vertex(pt.x,pt.y);
    // // }
    // endShape(CLOSE);
    // beginShape();
    // for(let pt of rightEye) {
    //   vertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);

    // let leftIris = []
    // for (let pt of face.annotations.leftEyeIris.slice(1,5)) {
    //   pt = scalePoint(pt);
    //   leftIris.push(pt);
    //   //print(leftIris);
    // }
    // let rightIris = []
    // for (let pt of face.annotations.rightEyeIris.slice(1,5)) {
    //   pt = scalePoint(pt);
    //   rightIris.push(pt);
    // }
    // fill(0);
    // noStroke();
    // beginShape();
    // for(let pt of leftIris) {
    //   curveVertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);
    // beginShape();
    // for(let pt of rightIris) {
    //   curveVertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);

    // let mouth = [];
    // for (let pt of face.annotations.lipsUpperInner) {
    //   pt = scalePoint(pt);
    //   mouth.push(pt);
    // }
    //
    // for (let pt of face.annotations.lipsLowerInner) {
    //   pt = scalePoint(pt);
    //   mouth.push(pt);
    // }
    //
    // fill(255);
    // noStroke();
    // beginShape();
    // for(let pt of mouth) {
    //   vertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);

    // let nose = scalePoint(face.scaledMesh[5]);
    // for (let d = w/6; d >= 2; d-=1){
    //   fill(255,150,0,map(d,w/6,2,0,255));
    //   noStroke();
    //   circle(nose.x,nose.y,d);
    // }
  }

    //NEW ALGORITHM TO MAKE MOUTH BIG
    let mouthX = [];
    let mouthY = [];
    for (let pt of face.annotations.lipsUpperInner) {
      pt = scalePoint(pt);
      mouthX.push(pt.x);
      mouthY.push(pt.y);
    }
    for (let pt of face.annotations.lipsLowerInner) {
      pt = scalePoint(pt);
      mouthX.push(pt.x);
      mouthY.push(pt.y);
    }
    let minX = Math.min(...mouthX) - 10;
    let maxX = Math.max(...mouthX) + 10;
    let minY = Math.min(...mouthY) - 10;
    let maxY = Math.max(...mouthY) + 10;
    let mouthW = maxX - minX;
    let mouthH = maxY - minY;

    //enlarge the left eye
    let leftEyeX = [];
    let leftEyeY = [];
    for (let pt of face.annotations.leftEyeUpper0){
      pt = scalePoint(pt);
      leftEyeX.push(pt.x);
      leftEyeY.push(pt.y);
    }
    for (let pt of face.annotations.leftEyeLower0){
      pt = scalePoint(pt);
      leftEyeX.push(pt.x);
      leftEyeY.push(pt.y);
    }
    let leminX = Math.min(...leftEyeX) - 10;
    let lemaxX = Math.max(...leftEyeX) + 10;
    let leminY = Math.min(...leftEyeY) - 10;
    let lemaxY = Math.max(...leftEyeY) + 10;
    let leftEyeW = lemaxX - leminX;
    let leftEyeH = lemaxY - leminY;

    //enlarge the right eye
    let rightEyeX = [];
    let rightEyeY = [];
    for (let pt of face.annotations.rightEyeUpper0){
      pt = scalePoint(pt);
      rightEyeX.push(pt.x);
      rightEyeY.push(pt.y);
    }
    for (let pt of face.annotations.rightEyeLower0){
      pt = scalePoint(pt);
      rightEyeX.push(pt.x);
      rightEyeY.push(pt.y);
    }
    let reminX = Math.min(...rightEyeX) - 10;
    let remaxX = Math.max(...rightEyeX) + 10;
    let reminY = Math.min(...rightEyeY) - 10;
    let remaxY = Math.max(...rightEyeY) + 10;
    let rightEyeW = remaxX - reminX;
    let rightEyeH = remaxY - reminY;

    //enlarge the right cheek
    let rightCheekX = [];
    let rightCheekY = [];
    for (let pt of face.annotations.rightCheek){
      pt = scalePoint(pt);
      rightCheekX.push(pt.x);
      rightCheekY.push(pt.y);
    }
    let rcminX = Math.min(...rightCheekX) - 10;
    let rcmaxX = Math.max(...rightCheekX) + 10;
    let rcminY = Math.min(...rightCheekY) - 10;
    let rcmaxY = Math.max(...rightCheekY) + 10;
    let rightCheekW = rcmaxX - rcminX;
    let rightCheekH = rcmaxY - rcminY;

    //enlarge the left cheek
    let leftCheekX = [];
    let leftCheekY = [];
    for (let pt of face.annotations.leftCheek){
      pt = scalePoint(pt);
      leftCheekX.push(pt.x);
      leftCheekY.push(pt.y);
    }

    let lcminX = Math.min(...leftCheekX) - 10;
    let lcmaxX = Math.max(...leftCheekX) + 10;
    let lcminY = Math.min(...leftCheekY) - 10;
    let lcmaxY = Math.max(...leftCheekY) + 10;
    let leftCheekW = lcmaxX - lcminX;
    let leftCheekH = lcmaxY - lcminY;

    let rightEye = video.get(reminX,reminY,rightEyeW,rightEyeH);
    let leftEye = video.get(leminX,leminY,leftEyeW,leftEyeH);
    let mouth = video.get(minX,minY, mouthW,mouthH);
    let rightCheek = video.get(rcminX,rcminY,rightCheekW,rightCheekH);
    let leftCheek = video.get(lcminX,lcminY,leftCheekW,leftCheekH);

    imageMode(CENTER);
    image(mouth, minX+mouthW/2, minY+mouthH/2+10, mouth.width*1.75,mouth.height*1.75);
    tint(255, 179, 223,150);
    image(rightCheek,rcminX+rightCheekW/2-15,rcminY+rightCheekH/2-15,rightCheek.width*4,rightCheek.height*2);
    image(leftCheek,lcminX+leftCheekW/2+15,lcminY+leftCheekH/2-15,leftCheek.width*4,leftCheek.height*2);
    tint(255, 255, 255);
    image(leftEye,leminX+leftEyeW/2+15,leminY+leftEyeH/2,leftEye.width*1.5,leftEye.height*1.5);
    image(rightEye,reminX+rightEyeW/2-15,reminY+rightEyeH/2,rightEye.width*1.5,rightEye.height*1.5);
    imageMode(CORNER);

  }
}
// use the mouse to select a color to track





function scalePoint(pt) {
  let x = map(pt[0],0,video.width,0,width);
  let y = map(pt[1],0,video.height,0,height);
  return createVector(x,y);
}

async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  });

  if(predictions.length === 0) {
    face = undefined;
  }else{
    face = predictions[0];
  }
}
