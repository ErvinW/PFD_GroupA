const firebaseConfig = {
    apiKey: "AIzaSyA8D6m8lic69e3HofRwXf-EyCDfYfbCIjI",
    authDomain: "portfolio-development-b3405.firebaseapp.com",
    databaseURL: "https://portfolio-development.firebaseio.com",
    projectId: "portfolio-development-b3405",
    storageBucket: "portfolio-development-b3405.appspot.com",
    messagingSenderId: "142117257651",
    appId: "1:142117257651:web:baa0d0e31f2c765a3d0bc6",
    measurementId: "G-TB3PZRDSH8"
};

firebase.initializeApp(firebaseConfig);

const video = document.getElementById("video");
let imageList = [];

imageList = retrievePics().then(images => {
    imageList = images;
    console.log(imageList);
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
    ]).then(startWebcam);
    console.log(imageList);
}).catch(error => {
    console.error("Error", error);
})

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
    // Load face descriptors for dynamically retrieved filenames
    return Promise.all(
        imageList.map(async (image, index) => {
            const label = image.blobName.split('.')[0]; // Extract label from filename
            const descriptions = [];

            // Use the image from imageList for the specified label
            const imgBlob = image.blob;
            const imageUrl = URL.createObjectURL(imgBlob);

            const img = await faceapi.fetchImage(imageUrl);

            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            descriptions.push(detections.descriptor);

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
            window.location.href = '/User/Index';
        },
        error: function (error) {
            console.error('Error during AJAX request:', error);
        }
    });
}

async function retrievePics() {
    const storageRef = firebase.storage().ref("images");
    let picList = [];
    const pics = await storageRef.listAll();

    const picPromise = pics.items.map(async (imageRef) => {
        const imageUrl = await imageRef.getDownloadURL();
        const imageName = imageRef.name;

        const arrayBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
        const blob = new Blob([arrayBuffer]);

        const pngBlob = await convertToPNG(blob);

        picList.push({
            blob: pngBlob,
            blobName: imageName,
        });
    });

    await Promise.all(picPromise); // Wait for all promises to be resolved

    console.log(picList[0]?.pngBlob); // Make sure to check for undefined
    console.log(picList[0]?.imageName);

    return picList;
}

async function convertToPNG(blob) {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const loadImage = (url) =>
        new Promise((resolve) => {
            img.onload = () => {
                resolve();
            };
            img.src = url;
        });

    await loadImage(URL.createObjectURL(blob));
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Convert the image to PNG format
    return new Promise((resolve) => {
        canvas.toBlob((pngBlob) => {
            // Use the converted PNG blob as needed
            console.log("Converted to PNG:", pngBlob);
            resolve(pngBlob);
        }, "image/png");
    });
}
