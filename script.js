function confirmAge() {
    const ageCheck = confirm("Вам действительно 0 лет или больше?");
    if (ageCheck) {
        document.getElementById("age-check").style.display = "none";
        document.getElementById("content").style.display = "block";
        loadVideos();
    } else {
        alert("Извините, доступ к этому сайту разрешен только для лиц старше 0 лет.");
    }
}

async function loadVideos() {
    try {
        const response = await fetch('videos.json');
        const videos = await response.json();

        const videoContainer = document.getElementById("video-container");

        videos.forEach(video => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");

            const videoTitle = document.createElement("h3");
            videoTitle.textContent = video.title;

            const videoFrame = document.createElement("iframe");
            videoFrame.src = `https://www.youtube.com/embed/${getYouTubeId(video.url)}`;
            videoFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            videoFrame.allowFullscreen = true;

            videoItem.appendChild(videoTitle);
            videoItem.appendChild(videoFrame);
            videoContainer.appendChild(videoItem);
        });
    } catch (error) {
        console.error("Ошибка загрузки видео:", error);
    }
}

function getYouTubeId(url) {
    const urlParts = url.split("v=");
    return urlParts[1];
}
// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Плавная прокрутка до нужного раздела
        window.scrollTo({
            top: targetElement.offsetTop - 60,  // 60px для учета высоты панели
            behavior: 'smooth'
        });
    });
});
