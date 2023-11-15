// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.




// Keybinds


console.log(bindsObject);
var TransBind = bindsObject.transferPage;

var HomeBind = bindsObject.homePage;







document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === TransBind && !window.location.pathname.endsWith('/Transfer')) {
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Transfer';
        }

        else {
            window.location.href = 'Transfer';
        }
        
    }


    else if (e.key.toLowerCase() === HomeBind) {
        window.location.href = 'Index';
    }
});






// Speech to text recognition

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US'; 

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result)

    if (result.toLowerCase().includes('go to transfer') && !window.location.pathname.endsWith('/Transfer')) { //added extra condition here
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Transfer';
        }

        else {
            window.location.href = 'Transfer';
        }
    }

    else if (result.toLowerCase().includes('home') || result.toLowerCase().includes('index')) {
        window.location.href = 'Index';
    }


    else if (result.toLowerCase().includes('logout') || result.toLowerCase().includes('log out')) {
        window.location.href = 'Home/Index';
    }
};

recognition.start(); 





