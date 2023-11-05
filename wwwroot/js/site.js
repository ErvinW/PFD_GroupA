// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.




// Keybinds

document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "t") {
        window.location.href = 'User/Transfer';
    }
});


// Speech to text recognition

const output = document.getElementById('output');
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US'; 

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result)


    if (result.toLowerCase().includes('go to transfer')) {
        window.location.href = 'User/Transfer';
    }
};

recognition.start(); 





