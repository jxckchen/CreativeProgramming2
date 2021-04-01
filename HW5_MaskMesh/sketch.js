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
}

function mesh(){
  if(video.loadedmetadata && model != undefined){
    getFace();
  }
  if(face != undefined){
    // console.log(face);
    //noLoop();
    image(video,0,0,width,height);
    fill(255);
    noStroke();

    //dots all over face to show which points you can access
    // for (let pt of face.scaledMesh) {
    //   pt = scalePoint(pt);
    //   circle(pt.x,pt.y,3);
    // }

    fill(235, 209, 152,255);
    noStroke();
    beginShape();
    for (pt of face.annotations.silhouette){
      pt = scalePoint(pt);
      vertex(pt.x,pt.y);
    }
    endShape(CLOSE);


    let topLeft = scalePoint(face.boundingBox.topLeft);
    let bottomRight = scalePoint(face.boundingBox.bottomRight);
    let w = bottomRight.x - topLeft.x;
    let dia = w / 6;

    // beginShape();
    // for (let pt of face.annotations.leftEyeUpper0) {
    //   pt = scalePoint(pt);
    // }
    // for (let i = face.annotations.leftEyeLower0.length-1; i>=0; i--) {
    //   pt = scalePoint(face.annotations.leftEyeLower0[i]);
    //   vertex(pt.x,pt.y);
    // }
    // endShape(CLOSE);

    let rightEye = [];
    for (let pt of face.annotations.rightEyeUpper0) {
      pt = scalePoint(pt);
      rightEye.push(pt);
    }
    for (let pt of face.annotations.rightEyeLower0) {
      pt = scalePoint(pt);
      rightEye.push(pt);
    }

    fill(255);
    noStroke();
    beginShape();
    // for(let pt of leftEye) {
    //   vertex(pt.x,pt.y);
    // }
    endShape(CLOSE);
    beginShape();
    for(let pt of rightEye) {
      vertex(pt.x,pt.y);
    }
    endShape(CLOSE);

    let leftIris = []
    for (let pt of face.annotations.leftEyeIris.slice(1,5)) {
      pt = scalePoint(pt);
      leftIris.push(pt);
      //print(leftIris);
    }
    let rightIris = []
    for (let pt of face.annotations.rightEyeIris.slice(1,5)) {
      pt = scalePoint(pt);
      rightIris.push(pt);
    }
    fill(0);
    noStroke();
    beginShape();
    for(let pt of leftIris) {
      curveVertex(pt.x,pt.y);
    }
    endShape(CLOSE);
    beginShape();
    for(let pt of rightIris) {
      curveVertex(pt.x,pt.y);
    }
    endShape(CLOSE);

    let mouth = [];
    for (let pt of face.annotations.lipsUpperInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }

    for (let pt of face.annotations.lipsLowerInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }

    fill(255);
    noStroke();
    beginShape();
    for(let pt of mouth) {
      vertex(pt.x,pt.y);
    }
    endShape(CLOSE);

    // let nose = scalePoint(face.scaledMesh[5]);
    // for (let d = w/6; d >= 2; d-=1){
    //   fill(255,150,0,map(d,w/6,2,0,255));
    //   noStroke();
    //   circle(nose.x,nose.y,d);
    // }

  }
}
// use the mouse to select a color to track

//NEW ALGORITHM TO MAKE MOUT BIG
    // let mouthX = [];
    // let mouthY = [];
    // for (let pt of face.annotations.lipsUpperInner) {
    //   pt = scalePoint(pt);
    //   mouthX.push(pt.x);
    //   mouthY.push(pt.y);
    // }
    // for (let pt of face.annotations.lipsLowerInner) {
    //   pt = scalePoint(pt);
    //   mouthX.push(pt.x);
    //   mouthY.push(pt.y);
    // }
    // let minX = Math.min(...mouthX) - 10;
    // let maxX = Math.max(...mouthX) + 10;
    // let minY = Math.min(...mouthY) - 10;
    // let maxY = Math.max(...mouthY) + 10;
    // let mouthW = maxX - minX;
    // let mouthH = maxY - minY;
    //
    // let mouth = video.get(minX,minY, mouthW,mouthH);
    // imageMode(CENTER);
    // image(mouth, minX+mouthW/2, minY+mouthH/2, mouth.width*2,mouth.height*2);
    // imageMode(CORNER);



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
