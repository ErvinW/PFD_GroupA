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

// Upload

var fileText = document.querySelector(".fileText");
var percentVal;
var fileItem;
var fileName;

function getFile(event) {
    fileItem = event.target.files[0];
    console.log('Selected file:', fileItem);
    fileName = fileItem.name;
    let facePic = document.getElementById('facePic');
    let inputFile = document.getElementById('fileInp');

    inputFile.onchange = function () {
        facePic.src = URL.createObjectURL(inputFile.files[0]);
    }

}

function uploadImage() {
    var userNameValue = document.getElementById('userName').innerText;
    let storageRef = firebase.storage().ref("images/" + userNameValue+".png");
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
    }, (error) => {
        console.log("Error is ", error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            let facePic = document.getElementById('facePic');

            facePic.setAttribute('src', url);

            // Resize the image after setting the src
            facePic.onload = function () {
                // Set the desired width and height
                facePic.style.width = '100px';
                facePic.style.height = '100px';
            };
        })
    })
}



// RETRIEVE PIC
//let retrieve = [];
//retrieve = retrievePics()
//let retrieve = [];
//retrievePics();

//async function retrievePics() {
//    try {
//        var userNameValue = document.getElementById('userName').innerText;
//        const storageRef = firebase.storage().ref("images/" + userNameValue);
//        const pics = await storageRef.listAll();

//        const picPromise = pics.items.map(async (imageRef) => {
//            const imageUrl = await imageRef.getDownloadURL();
//            console.log(imageUrl);
//            const imageName = imageRef.name;

//            const arrayBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
//            const blob = new Blob([arrayBuffer]);

//            const pngBlob = await convertToPNG(blob);

//            retrieve.push({
//                blob: pngBlob,
//                blobName: imageName,
//            });
//        });

//        await Promise.all(picPromise); // Wait for all promises to be resolved

//        console.log(retrieve[0]?.pngBlob); // Make sure to check for undefined
//        console.log(retrieve[0]?.blobName);
//    } catch (error) {
//        console.error("Error retrieving pics:", error);
//    }
//}


//async function convertToPNG(blob) {
//    const img = new Image();
//    const canvas = document.createElement("canvas");
//    const ctx = canvas.getContext("2d");

//    const loadImage = (url) =>
//        new Promise((resolve) => {
//            img.onload = () => {
//                resolve();
//            };
//            img.src = url;
//        });

//    await loadImage(URL.createObjectURL(blob));
//    canvas.width = img.width;
//    canvas.height = img.height;
//    ctx.drawImage(img, 0, 0);

//    // Convert the image to PNG format
//    return new Promise((resolve) => {
//        canvas.toBlob((pngBlob) => {
//            // Use the converted PNG blob as needed
//            console.log("Converted to PNG:", pngBlob);
//            resolve(pngBlob);
//        }, "image/png");
//    });
//}

