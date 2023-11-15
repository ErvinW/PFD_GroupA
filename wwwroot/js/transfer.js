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
