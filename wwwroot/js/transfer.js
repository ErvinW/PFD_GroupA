/*document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.querySelector(".slider-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const profileCards = document.querySelectorAll(".profile-card");
    let currentPosition = 0;
    const cardWidth = profileCards[0].offsetWidth + 10; // Consider margin-right

    prevBtn.addEventListener("click", function () {
        currentPosition += cardWidth;

        if (currentPosition > 0) {
            currentPosition = -cardWidth * (profileCards.length - 1);
        }

        updateSliderPosition();
    });

    nextBtn.addEventListener("click", function () {
        currentPosition -= cardWidth;

        if (currentPosition < -cardWidth * (profileCards.length - 1)) {
            currentPosition = 0;
        }

        updateSliderPosition();
    });

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    }
});

*/
document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.querySelector(".slider-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const profileCards = document.querySelectorAll(".profile-card");
    let currentPosition = 0;
    const cardWidth = profileCards[0].offsetWidth + 10; // Consider margin-right

    prevBtn.addEventListener("click", function () {
        currentPosition += cardWidth;

        if (currentPosition > 0) {
            currentPosition = -cardWidth * (profileCards.length - 1);
        }

        updateSliderPosition();
    });

    nextBtn.addEventListener("click", function () {
        currentPosition -= cardWidth;

        if (currentPosition < -cardWidth * (profileCards.length - 1)) {
            currentPosition = 0;
        }

        updateSliderPosition();
    });

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    }


    

    

});

// Speech to text recognition //

function handleTransferCommand() {
    const login = new webkitSpeechRecognition();
    login.continuous = true;
    login.interimResults = false;
    login.lang = 'en-US';
    login.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result);
        if (result.toLowerCase().includes('transfer')) {
            submitBtn = document.getElementById('submitBtn');
            submitBtn.click();
            handleTransferCommand(); // Start listening for "login" again
        }
        // speech for radio options
        if (result.toLowerCase().includes('paynow') || result.toLowerCase().includes('pay now')) {
            document.getElementById('PayNow').checked = true;
            handleTransferCommand(); // Start listening for "login" again
        }
        if (result.toLowerCase().includes('local')) {
            document.getElementById('Local').checked = true;
            handleTransferCommand(); // Start listening for "login" again
        }
        if (result.toLowerCase().includes('oversea') || result.toLowerCase().includes('overseas')) {
            document.getElementById('Overseas').checked = true;
            handleTransferCommand(); // Start listening for "login" again
        }
    };
    login.start();
}

// Start listening for the "login" command
handleTransferCommand();

// Transfer - Account
const recipient = document.getElementById('recipient')

recipient.addEventListener("focus", function () {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result)
        const cleanedResult = result.replace(/ /g, '');
        recipient.value = cleanedResult
        recognition.stop()
        handleTransferCommand();
    };

    recognition.start();
})

// Transfer - Amount
const amount = document.getElementById('amount')


amount.addEventListener("focus", function () {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result)
        const cleanedResult = result.replace(/ /g, '');
        amount.value = cleanedResult
        recognition.stop()
        handleTransferCommand();
    };

    recognition.start();
})




