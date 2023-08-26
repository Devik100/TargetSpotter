ObjectDetector=0
TargetFound = false
target=""
function setup() {
    cantvase=createCanvas(600, 600)
    cantvase.position(650, 300)
    console.log("Console created.")
    video = createCapture(VIDEO)
    video.hide()
    console.log("Video created.")
}
function draw() {
    image(video, 0, 0, 600, 600)
    if(ObjectDetector != 0 && target != "") {
        ObjectDetector.detect(video, gotResult);
    }
}
function beginProgram() {
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Program loading..."
    console.log("Program initiated.")
}
function modelLoaded() {
    console.log("Model Initiated.")
    status_1=true;
    document.getElementById("status").innerHTML = "Status: Program Started."
}
function gotResult(error, results) {
    if(error) {
        console.error(error);
        document.getElementById("status").innerHTML = "Status: Error detected. Check console logs for error message."
    }
    else{
        console.log(results);
        TargetFound = false
        for(i=0; i<results.length; i++) {
            noFill()
            stroke(225, 0, 0)
            rect(results[i].x, results[i].y, results[i].width, results[i].height)
            noStroke()
            fill(255, 0, 0)
            textSize(25)
            text(results[i].label, results[i].x, results[i].y)
            if(results[i].label == target) {
                TargetFound = true
                console.log("Target located. Result given.")
                document.getElementById("status").innerHTML = "Status: Target Spotted."
            }
        }
        if(TargetFound == false) {
            console.log("Target not located. Continuing to search.")
            document.getElementById("status").innerHTML = "Status: Program Detecting targets. None currently spotted."
        }
    }
}
