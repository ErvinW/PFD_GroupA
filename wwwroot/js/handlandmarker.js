import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const demosSection = document.getElementById("demos");
let gestureRecognizer = undefined;
let runningMode = "VIDEO";
let enableWebcamButton = HTMLButtonElement;
let webcamRunning = true;


const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "CPU"
        },
        runningMode: "VIDEO",
        numHands: 2
    });
    demosSection.classList.remove("invisible");
    enableCam()
};
createGestureRecognizer();



const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
//const gestureOutput = document.getElementById("gesture_output");

// Check if webcam access is supported.
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
} else {
    console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start detection.
function enableCam(event) {
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }

    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            console.log("yes");
            video.srcObject = stream;
            video.addEventListener("loadeddata", predictWebcam);
        })
        .catch((error) => {
            console.error("Error accessing webcam:", error);
        });
}



let lastVideoTime = -1;
let results = undefined;
async function predictWebcam() {
    console.log("hiii")
    canvasElement.style.width = 270;
    canvasElement.style.height = 240;
    canvasElement.width = 270;
    canvasElement.height = 240;

    const webcamElement = document.getElementById("webcam");
    // Now let's start detecting the stream.
    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);

    webcamElement.style.height = 240;
    webcamElement.style.width = 270;

    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(
                landmarks,
                GestureRecognizer.HAND_CONNECTIONS,
                {
                    color: "#00FF00",
                    lineWidth: 5
                }
            );
            drawingUtils.drawLandmarks(landmarks, {
                color: "#FF0000",
                lineWidth: 2
            });
        }
    }
    canvasCtx.restore();
    if (results.gestures.length > 0) {
        //gestureOutput.style.display = "block";
        //gestureOutput.style.width = 270;
        const categoryName = results.gestures[0][0].categoryName;
        console.log(categoryName)

        //const categoryScore = parseFloat(
        //    results.gestures[0][0].score * 100
        //).toFixed(2);
        //const handedness = results.handednesses[0][0].displayName;
        //gestureOutput.innerText = `GestureRecognizer: ${categoryName} \n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;

        if (categoryName == 'Pointing_Up') {
            console.log("BACK")
            if (window.location.pathname.endsWith('/Account')) {
                window.location.href = '/User';
            }
            if (window.location.pathname.endsWith('/Transfer')) {
                window.location.href = '/User/Account';
            }
            if (window.location.pathname.endsWith('/Cards')) {
                window.location.href = '/User/Transfer';
            }
            if (window.location.pathname.endsWith('/Keybind')) {
                window.location.href = '/User/Cards';
            }
            if (window.location.pathname.endsWith('/Settings')) {
                window.location.href = '/User/Keybind';
            }
            if (window.location.pathname.endsWith('/Help')) {
                window.location.href = '/User/Settings';
            }
        }
        else if(categoryName == 'Victory'){
            console.log("NEXT")
            if (window.location.pathname.endsWith('/User') || window.location.pathname.endsWith('/User/Index')) {
                window.location.href = '/User/Account';
            }
            if (window.location.pathname.endsWith('/Account')) {
                window.location.href = '/User/Transfer';
            }
            if (window.location.pathname.endsWith('/Transfer')) {
                window.location.href = '/User/Cards';
            }
            if (window.location.pathname.endsWith('/Cards')) {
                window.location.href = '/User/Keybind';
            }
            if (window.location.pathname.endsWith('/Keybind')) {
                window.location.href = '/User/Settings';
            }
            if (window.location.pathname.endsWith('/Settings')) {
                window.location.href = '/User/Help';
            }
        }

    } else {
        //gestureOutput.style.display = "none";
        console.log("none")
    }
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
}
