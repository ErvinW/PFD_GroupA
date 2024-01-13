import {
    HandLandmarker,
    FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const demosSection = document.getElementById("demos");

let handLandmarker = undefined;
let runningMode = "VIDEO";
let enableWebcamButton = HTMLButtonElement;
let webcamRunning = true;
let prevx = null;

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2
    });
    demosSection.classList.remove("invisible");
    enableCam();
};
createHandLandmarker();



const video = document.getElementById("webcam");
const canvasElement = document.getElementById(
    "output_canvas"
);
const canvasCtx = canvasElement.getContext("2d");

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
    if (!handLandmarker) {
        console.log("Wait! objectDetector not loaded yet.");
        return;
    }


    /*
    if (webcamRunning === true) {
        webcamRunning = false;
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
        webcamRunning = true;
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }*/

    // getUsermedia parameters.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
}

let lastVideoTime = -1;
let results = undefined;
console.log(video);
async function predictWebcam() {
    canvasElement.style.width = video.videoWidth;;
    canvasElement.style.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = handLandmarker.detectForVideo(video, startTimeMs);
    }
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: "#00FF00",
                lineWidth: 5
            });
            drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });


            if (Math.abs(results.landmarks[0][12].x - prevx) > 0.5) {
                if (results.landmarks[0][12].x - prevx > 0.5) {
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
                else {
                    console.log("NEXT")
                    if (window.location.pathname.endsWith('/User')) {
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
            }
            prevx = results.landmarks[0][12].x
        }



    }
    canvasCtx.restore();

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
}
