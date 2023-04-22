let faceapi;
let detections = [];

let video;
let canvas;

function setup() {
    canvas = createCanvas(480, 360);
    canvas.id("canvas");

    video = createCapture(VIDEO);
    video.id("video");
    video.size(width, height);

    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: true,
        minConfidence: 0.5
    };

    faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
    faceapi.detect(gotFaces);// Start detecting faces: 顔認識開始
}

function gotFaces(error, result) {
    if (error) {
        console.log(error);
        return;
    }

    detections = result;
    faceapi.detect(gotFaces);
}

function draw() {
    clear();
    if (detections.length > 0) {
        console.log("found");

        for (f = 0; f < detections.length; f++) {
            let x = detections[0].alignedRect._box._x;
            let y = detections[0].alignedRect._box._y;
            let _width = detections[0].alignedRect._box._width;
            let _height = detections[0].alignedRect._box._height;



            console.log(x + " - " + y);

            stroke(44, 169, 225);
            strokeWeight(1);
            noFill();
            rect(x, y, _width, _height);
        }

    }
    else{
        console.log("notfound");
    }
}




