let video;
let model;
let face;

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
    // noLoop();
    image(video,0,0,width,height);
    fill(255);
    noStroke();
    for (let pt of face.scaledMesh) {
      pt = scalePoint(pt);
      circle(pt.x,pt.y,3);
    }

    fill(0,150,255,100);
    noStroke();
    beginShape();
    for (pt of face.annotations.silhouette){
      pt = scalePoint(pt);
      vertex(pt.x,pt.y);
    }
    endShape(CLOSE);

    let leftEye = scalePoint(face.annotations.leftEyeIris[0]);
    let rightEye = scalePoint(face.annotations.rightEyeIris[0]);

    let topLeft = scalePoint(face.boundingBox.topLeft);
    let bottomRight = scalePoint(face.boundingBox.bottomRight);
    let w = bottomRight.x - topLeft.x;
    let dia = w / 6;

    fill(255);
    noStroke();
    circle(leftEye.x,leftEye.y,dia);
    circle(rightEye.x,rightEye.y,dia);

    let mouth = [];
    for (let pt of face.annotations.lipsUpperInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }
    for (let pt of face.annotations.lipsLowerInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }

    fill(50,0,0);
    noStroke();
    beginShape();
    for(let pt of mouth) {
      vertex(pt.x,pt.y);
    }
    endShape(CLOSE);

    let nose = scalePoint(face.scaledMesh[5]);
    for (let d = w/6; d >= 2; d-=1){
      fill(255,150,0,map(d,w/6,2,0,255));
      noStroke();
      circle(nose.x,nose.y,d);
    }

  }
}

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
