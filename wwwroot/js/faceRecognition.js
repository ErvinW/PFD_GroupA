const video = document.getElementById("video");

// Load face detection and recognition models
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
]).then(startWebcam);

function startWebcam() {
    // Start webcam and set video source
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error(error);
        });
}

function getLabeledFaceDescriptions() {
    // Define face labels and load face descriptors
    const labels = ["xinyin", "keene", "xuewen"];
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = [];
            for (let i = 1; i <= 1; i++) {
                const img = await faceapi.fetchImage(`../labels/${label}.png`);
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                descriptions.push(detections.descriptor);
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    );
}


video.addEventListener("play", async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let requestSent = false; // Variable to track whether a request has been sent

    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.style.position = 'fixed';
        canvas.style.zIndex = 1;
        canvas.style.top = '8rem';
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor);
        });

        // Check if a request has already been sent
        if (!requestSent) {
            results.some((result, i) => {
                const box = resizedDetections[i].detection.box;
                const drawBox = new faceapi.draw.DrawBox(box, {
                    label: result,
                });
                let name = result.label.toString();
                console.log(name);
                sendRequestAndRedirect(name);

                drawBox.draw(canvas);

                // Set the variable to true to indicate that a request has been sent
                requestSent = true;

                // Break out of the loop
                return true;
            });
        }
    }, 1000);
});



function sendRequestAndRedirect(name) {
    $.ajax({
        url: '/Home/ProcessFaceLabel',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(name),
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error('Error during AJAX request:', error);
        }
    });
}
