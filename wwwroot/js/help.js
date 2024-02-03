const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
    const title = question.querySelector(".question__title");
    const btn = question.querySelector(".question__button");
    const answer = question.querySelector(".question__answer");

    function showAnswer() {
        // Toggle 'show-answer' class for the clicked question
        question.classList.toggle("show-answer");

        // Close other questions if they are open
        questions.forEach((item) => {
            if (item !== question && item.classList.contains("show-answer")) {
                item.classList.remove("show-answer");
            }
        });
    }

    title.addEventListener("click", showAnswer);
});