// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.




// Keybinds


console.log(bindsObject);
var TransBind = bindsObject.transferPage;

var HomeBind = bindsObject.homePage;

var LogoutBind = bindsObject.logoutFunc





document.addEventListener("keydown", e => {
    if (e.key.toUpperCase() === TransBind && !window.location.pathname.endsWith('/Transfer')) {
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Transfer';
        }

        else {
            window.location.href = 'Transfer';
        }
        
    }


    else if (e.key.toUpperCase() === HomeBind) {
        window.location.href = 'Index';
    } 


    else if (e.key.toUpperCase() === LogoutBind) {
        window.location.href = '/Home/Index';
    }
});


/*
//Speech language selection
let lang = null;
languages = ['en-US', 'zh-CN']

function assignValue(event) {
    const value = parseInt(event.target.dataset.value); // Get the value from data-value attribute
    lang = languages[value]; // Assigning the value to myVariable
    console.log("Value assigned to myVariable:", lang);

    updateRecognitionLanguage(lang);
}

function updateRecognitionLanguage(language) {
    recognition.lang = language;
    recognition.stop();
    recognition.start();
}

const buttons = document.getElementsByClassName("assignValue");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", assignValue);
}

// Speech to text recognition

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = lang; 

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result)

    if (result.toLowerCase().includes('transfer') && !window.location.pathname.endsWith('/Transfer')) { //added extra condition here
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Transfer';
        }

        else {
            window.location.href = 'Transfer';
        }
    }

    else if ((result.toLowerCase().includes('home') || result.toLowerCase().includes('index')) && !window.location.pathname.endsWith('/Index')) {
        window.location.href = 'Index';
    }


    else if (result.toLowerCase().includes('logout') || result.toLowerCase().includes('log out')) {
        window.location.href = '/Home/Index';
    }

    else if ((result.toLowerCase().includes('key bind') || result.toLowerCase().includes('keybind')) && !window.location.pathname.endsWith('/Keybind')) {
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Keybind';
        }

        else {
            window.location.href = 'Keybind';
        }
    }
};

recognition.start(); 
*/

let lang = 'en-US'; // Default language
const languages = ['en-US', 'zh-CN', 'ms-MY'];
const recognition = new webkitSpeechRecognition();

function assignValue(event) {
    const value = parseInt(event.target.dataset.value);
    lang = languages[value];
    updateRecognitionLanguage(lang);
}

function updateRecognitionLanguage(language) {
    console.log(language);
    recognition.lang = language;
    recognition.stop();
    recognition.start();
}

function handleSpeechResult(result) {
    const lowerCaseResult = result.toLowerCase();
    const path = window.location.pathname;

    if ((lowerCaseResult.includes('transfer') || result.includes("转移") || result.includes('pindah')) && !path.endsWith('/Transfer')) {
        window.location.href = path.endsWith('/User') ? '/User/Transfer' : 'Transfer';
    } else if ((lowerCaseResult.includes('home') || lowerCaseResult.includes('index') || result.includes('首页') || result.includes('rumah')) && !path.endsWith('/Index')) {
        window.location.href = 'Index';
    } else if (lowerCaseResult.includes('logout') || lowerCaseResult.includes('log out') || result.includes('登出') || result.includes('log keluar')) {
        window.location.href = '/Home/Index';
    } else if ((lowerCaseResult.includes('key bind') || lowerCaseResult.includes('keybind') || result.includes('键绑定') || result.includes('ikat kunci')) && !path.endsWith('/Keybind')) {
        window.location.href = path.endsWith('/User') ? '/User/Keybind' : 'Keybind';
    }
}

recognition.continuous = true; // Enable continuous listening
recognition.interimResults = true; // Receive interim results
recognition.lang = lang;

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result);
    handleSpeechResult(result);
};

const buttons = document.getElementsByClassName("assignValue");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", assignValue);
}

recognition.start();


