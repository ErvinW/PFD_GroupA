// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.




// Keybinds


console.log(bindsObject);
var TransBind = bindsObject.transferPage;

var HomeBind = bindsObject.homePage;

var LogoutBind = bindsObject.logoutFunc;

var AccountBind = bindsObject.accountPage;

var CardsBind = bindsObject.cards;

var SettingBind = bindsObject.settings;

var HelpBind = bindsObject.help;

var KeyBind = bindsObject.keybind;



document.addEventListener("keydown", e => {

    const isTextInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

    // If it's a text input, skip the code execution
    if (isTextInput) {
        return;
    }
    console.log(e);
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

    else if (e.key.toUpperCase() == AccountBind) {
        window.location.href = '/User/Account';
    }

    else if (e.key.toUpperCase() == CardsBind) {
        window.location.href = '/User/Cards';
    }

    else if (e.key.toUpperCase() == SettingBind) {
        window.location.href = '/User/Settings';
    }

    else if (e.key.toUpperCase() == HelpBind) {
        window.location.href = '/User/Help';
    }

    else if (e.key.toUpperCase() == KeyBind) {
        window.location.href = '/User/Keybind';
    }

});




let lang = 'en-US'; // Default language
const languages = ['en-US', 'zh-CN', 'ms-MY', 'ta-IN'];
const recognition = new webkitSpeechRecognition();

/*function assignValue(event) {
    const value = event.target.dataset.value;
    lang = languages[value];
    console.log(value);
    updateRecognitionLanguage(lang);
}*/

function updateRecognitionLanguage(language) {
    sessionStorage.setItem('DefaultLang', language);
    console.log(language);
    recognition.stop();

    setTimeout(function () {
        recognition.lang = sessionStorage.getItem("DefaultLang");
        alert('Voice recognition language switched to ' + language);
        recognition.start();
    }, 2);
}


function handleSpeechResult(result) {
    const lowerCaseResult = result.toLowerCase();
    const path = window.location.pathname;

    if ((lowerCaseResult.includes('transfer') || result.includes("转移") || result.includes('pindah') || result.includes('பரிமாற்றம்')) && !path.endsWith('/Transfer')) {
        window.location.href = path.endsWith('/User') ? '/User/Transfer' : 'Transfer';
    } else if ((lowerCaseResult.includes('home') || lowerCaseResult.includes('index') || result.includes('首页') || result.includes('rumah') || result.includes('வீடு')) && !path.endsWith('/Index')) {
        window.location.href = 'Index';
    } else if (lowerCaseResult.includes('logout') || lowerCaseResult.includes('log out') || result.includes('登出') || result.includes('log keluar') || result.includes('வெளியேறு')) {
        window.location.href = '/Home/Index';
    } else if ((lowerCaseResult.includes('key bind') || lowerCaseResult.includes('keybind') || result.includes('键绑定') || result.includes('ikat kunci') || result.includes('விசை பிணைப்பு')) && !path.endsWith('/Keybind')) {
        window.location.href = path.endsWith('/User') ? '/User/Keybind' : 'Keybind';
    } else if (lowerCaseResult.includes('chinese') || result.includes('cina') || result.includes('சீன')) {
        updateRecognitionLanguage('zh-CN');
    } else if (lowerCaseResult.includes('malay') || result.includes('马来语') || result.includes('மலாய்')) {
        updateRecognitionLanguage('ms-MY');
    } else if (result.includes('inggeris') || result.includes('英语') || result.includes('ஆங்கிலம்')) {
        updateRecognitionLanguage('en-US');
    } else if (lowerCaseResult.includes('tamil') || result.includes('泰米尔语')) {
        updateRecognitionLanguage('ta-IN');
    }
}


let deflang = sessionStorage.getItem('DefaultLang');
recognition.continuous = true; // Enable continuous listening
recognition.interimResults = true; // Receive interim results

if (deflang == null) {
    recognition.lang = lang;
}
else {
    recognition.lang = deflang;
}


recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result);
    handleSpeechResult(result);
};


recognition.start();



document.addEventListener("DOMContentLoaded", function () {
    const assignValueButtons = document.querySelectorAll(".assignValue");

    function assignValue(event) {
        const value = event.currentTarget.dataset.value;
        // Do something with the value, for example, call assignValue function
        console.log("Value assigned to myVariable:", value);
        updateRecognitionLanguage(languages[value]);
    }

    for (const button of assignValueButtons) {
        button.addEventListener("click", assignValue);
    }
});