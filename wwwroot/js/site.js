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






// Speech to text recognition

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = ['en-US', 'ms-MY', 'zh-CN']; 

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    console.log(result)

    if ((result.toLowerCase().includes('transfer') || result.toLowerCase().includes('pindah') || result.toLowerCase().includes('转账')) && !window.location.pathname.endsWith('/Transfer')) { //added extra condition here
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Transfer';
        }

        else {
            window.location.href = 'Transfer';
        }
    }

    else if ((result.toLowerCase().includes('home') || result.toLowerCase().includes('index') || result.toLowerCase().includes('rumah') || result.toLowerCase().includes('首页')) && !window.location.pathname.endsWith('/Index')) {
        window.location.href = 'Index';
    }


    else if (result.toLowerCase().includes('logout') || result.toLowerCase().includes('log out') || result.toLowerCase().includes('log keluar') || result.toLowerCase().includes('登出')) {
        window.location.href = '/Home/Index';
    }

    else if ((result.toLowerCase().includes('key bind') || result.toLowerCase().includes('keybind') || result.toLowerCase().includes('ikat kunci') || result.toLowerCase().includes('键绑定')) && !window.location.pathname.endsWith('/Keybind')) {
        if (window.location.pathname.endsWith('/User')) {
            window.location.href = '/User/Keybind';
        }

        else {
            window.location.href = 'Keybind';
        }
    }
};

recognition.start(); 





