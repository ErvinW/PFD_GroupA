const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Home Page Run-Through',
        'name': 'Home Page.mp4',
        'duration': '2:47',
    },
    {
        'id': 'a2',
        'title': 'Using the  Voice Navigation Feature',
        'name': 'Voice Navigation.mp4',
        'duration': '2:45',
    },
    {
        'id': 'a3',
        'title': 'Site Navigation using Gestures',
        'name': 'Gestures.mp4',
        'duration': '24:49',
    },

    {
        'id': 'a4',
        'title': 'Keybind Tutorial and Customization',
        'name': 'Keybind.mp4',
        'duration': '3:59',
    },
    {
        'id': 'a5',
        'title': 'Eye Tracker Tutorial',
        'name': 'Eye Tracker.mp4',
        'duration': '4:25',
    },
    {
        'id': 'a6',
        'title': 'Feedback form tutorial',
        'name': 'Feedbackform.mp4',
        'duration': '5:33',
    },
   

];

// Update the video playlist title dynamically
const videoPlaylistTitle = document.querySelector('.video-playlist h3');
videoPlaylistTitle.id = 'video-playlist-title';


data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="images/play.svg" alt="">
                    <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})

let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});

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