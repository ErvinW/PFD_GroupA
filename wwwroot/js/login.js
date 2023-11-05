// Speech to text recognition //

// Login
function handleLoginCommand() {
    const login = new webkitSpeechRecognition();
    login.continuous = true;
    login.interimResults = false;
    login.lang = 'en-US';
    login.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result);
        if (result.toLowerCase().includes('login')) {
            loginBtn = document.getElementById('loginBtn');
            loginBtn.click();
            handleLoginCommand(); // Start listening for "login" again
        }
    };
    login.start();
}

// Start listening for the "login" command
handleLoginCommand();

// Login - Username
const usernameLogin = document.getElementById('usernameLogin')

usernameLogin.addEventListener("focus", function () {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result)
        const cleanedResult = result.replace(/ /g, '');
        usernameLogin.value = cleanedResult
        recognition.stop()
        handleLoginCommand();
    };

    recognition.start();
})

// Login - Password
const usernamePassword = document.getElementById('usernamePassword')

usernamePassword.addEventListener("focus", function () {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result)
        const cleanedResult = result.replace(/ /g, '');
        usernamePassword.value = cleanedResult
        recognition.stop()
        handleLoginCommand();
    };

    recognition.start();
})



