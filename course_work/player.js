    // Получаем элементы DOM
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const currentVideoTitle = document.getElementById('currentVideoTitle');
const videoItems = document.querySelectorAll('.video-item');
    
    // Форматирование времени в MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
    
    // Обновление времени и прогресса
function updateProgress() {
    if (videoPlayer.duration) {
        const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
        durationEl.textContent = formatTime(videoPlayer.duration);
    }
}
    
    // Перемотка при клике на прогресс-бар
progressContainer.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoPlayer.currentTime = percent * videoPlayer.duration;
});
    
    // Управление воспроизведением
playPauseBtn.addEventListener('click', function() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } 
    else {
            videoPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    });
    
    // Остановка
stopBtn.addEventListener('click', function() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    playPauseBtn.textContent = '▶️';
});
    
    // Громкость
volumeSlider.addEventListener('input', function() {
    videoPlayer.volume = this.value;
    muteBtn.textContent = this.value > 0 ? '🔊' : '🔇';
});
    
    // Беззвучный режим
muteBtn.addEventListener('click', function() {
    if (videoPlayer.volume > 0) {
        videoPlayer.volume = 0;
        volumeSlider.value = 0;
        muteBtn.textContent = '🔇';
    } 
    else {
        videoPlayer.volume = 1;
        volumeSlider.value = 1;
        muteBtn.textContent = '🔊';
        }
    });
    
    // Полноэкранный режим
fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
        });
    } 
    else {
            document.exitFullscreen();
        }
    });
    
    // Смена видео при клике на элемент списка
videoItems.forEach(item => {
    item.addEventListener('click', function() {
    const videoSrc = this.getAttribute('data-src');
            
            // Убираем активный класс у всех элементов
    videoItems.forEach(el => el.classList.remove('active'));
            // Добавляем активный класс текущему элементу
    this.classList.add('active');
            
    // Меняем источник видео
    videoPlayer.src = videoSrc;
    videoPlayer.load();
    videoPlayer.play();
    playPauseBtn.textContent = '⏸️';
            
    // Обновляем заголовок
    if (currentVideoTitle) {
        const fileName = videoSrc.split('/').pop();
        currentVideoTitle.textContent = `📺 ${fileName}`;
        }
    });
});
    
    // Обработчики событий видео
videoPlayer.addEventListener('timeupdate', updateProgress);
videoPlayer.addEventListener('loadedmetadata', updateProgress);
    
videoPlayer.addEventListener('play', function() {
    playPauseBtn.textContent = '⏸️';
});
    
videoPlayer.addEventListener('pause', function() {
    playPauseBtn.textContent = '▶️';
});
    
videoPlayer.addEventListener('ended', function() {
    playPauseBtn.textContent = '▶️';
});
    
    // Автовоспроизведение первого видео при загрузке
window.addEventListener('DOMContentLoaded', function() {
    if (videoPlayer.src) {
        videoPlayer.play().catch(e => {
            console.log("Автовоспроизведение заблокировано браузером");
        });
    }
});
    
    // Горячие клавиши
document.addEventListener('keydown', function(e) {
    switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            playPauseBtn.click();
            break;
        case 'm':
            e.preventDefault();
            muteBtn.click();
            break;
        case 'f':
            e.preventDefault();
            fullscreenBtn.click();
            break;
        case 'arrowleft':
            e.preventDefault();
            videoPlayer.currentTime -= 10;
            break;
        case 'arrowright':
            e.preventDefault();
            videoPlayer.currentTime += 10;
            break;
    }
});
    
    // Обновление времени при загрузке видео
videoPlayer.addEventListener('loadeddata', function() {
    updateProgress();
});