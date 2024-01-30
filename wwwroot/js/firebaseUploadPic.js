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
    fileText.innerHTML = fileName;
    let facePic = document.getElementById('facePic');
    let inputFile = document.getElementById('fileInp');

    inputFile.onchange = function () {
        facePic.src = URL.createObjectURL(inputFile.files[0]);
    }

}

function uploadImage() {
    let storageRef = firebase.storage().ref("images/" + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
    }, (error) => {
        console.log("Error is ", error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("URL", url);
            let facePic = document.getElementById('facePic');
            facePic.setAttribute('src', url);
            //facePic.src = url;

            //setTimeout(function () {
            //    location.reload();
            //}, 100);

        })
    })
}


// Retrieve

document.getElementById('retrieve').onclick = function () {
    ImgName = document.getElementById('namebox').value;


    let storageRef = firebase.storage().ref();

    // firebase.database().ref('images/'+ImgName).on('value', function(snapshot){
    //     document.getElementById('myimg').src = snapshot.val().Link;
    // });


    storageRef.child('images/' + ImgName + '.png').getDownloadURL()
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            var img = document.getElementById('myimg');
            img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });
}