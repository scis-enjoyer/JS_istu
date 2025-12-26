/**
 * @jest-environment jsdom
 */

describe('Video Player', () => {
    let videoPlayer;
    let playPauseBtn;
    let stopBtn;
    let muteBtn;
    let volumeSlider;
    let progressBar;
    let progressContainer;
    let currentTimeEl;
    let durationEl;
    let fullscreenBtn;

    beforeEach(() => {
        document.body.innerHTML = `
            <video id="videoPlayer"></video>
            <button id="playPauseBtn"></button>
            <button id="stopBtn"></button>
            <button id="muteBtn"></button>
            <input id="volumeSlider" type="range" />
            <div id="progressContainer">
                <div id="progressBar"></div>
            </div>
            <span id="currentTime"></span>
            <span id="duration"></span>
            <button id="fullscreenBtn"></button>
            <div class="video-item" data-src="video1.mp4"></div>
        `;

        // Моки для video API
        videoPlayer = document.getElementById('videoPlayer');
        playPauseBtn = document.getElementById('playPauseBtn');
        stopBtn = document.getElementById('stopBtn');
        muteBtn = document.getElementById('muteBtn');
        volumeSlider = document.getElementById('volumeSlider');
        progressBar = document.getElementById('progressBar');
        progressContainer = document.getElementById('progressContainer');
        currentTimeEl = document.getElementById('currentTime');
        durationEl = document.getElementById('duration');
        fullscreenBtn = document.getElementById('fullscreenBtn');

        videoPlayer.play = jest.fn();
        videoPlayer.pause = jest.fn();
        videoPlayer.load = jest.fn();

        Object.defineProperty(videoPlayer, 'duration', {
            writable: true,
            value: 120
        });

        Object.defineProperty(videoPlayer, 'currentTime', {
            writable: true,
            value: 0
        });

        Object.defineProperty(videoPlayer, 'volume', {
            writable: true,
            value: 1
        });

        Object.defineProperty(videoPlayer, 'paused', {
            writable: true,
            value: true
        });

        // Загружаем тестируемый скрипт
        jest.isolateModules(() => {
            require('../player');
        });
    });


    test('play/pause кнопка запускает видео', () => {
        playPauseBtn.click();
        expect(videoPlayer.play).toHaveBeenCalled();
        expect(playPauseBtn.textContent).toBe('⏸️');
    });

    test('повторный клик ставит видео на паузу', () => {
        videoPlayer.paused = false;
        playPauseBtn.click();
        expect(videoPlayer.pause).toHaveBeenCalled();
        expect(playPauseBtn.textContent).toBe('▶️');
    });

    test('кнопка Stop останавливает видео и сбрасывает время', () => {
        videoPlayer.currentTime = 50;
        stopBtn.click();

        expect(videoPlayer.pause).toHaveBeenCalled();
        expect(videoPlayer.currentTime).toBe(0);
        expect(playPauseBtn.textContent).toBe('▶️');
    });

    test('ползунок громкости изменяет volume', () => {
        volumeSlider.value = 0.5;
        volumeSlider.dispatchEvent(new Event('input'));

        expect(videoPlayer.volume).toBe('0.5');
        expect(muteBtn.textContent).toBe('🔊');
    });

    test('mute выключает звук', () => {
        muteBtn.click();

        expect(videoPlayer.volume).toBe(0);
        expect(volumeSlider.value).toBe('0');
        expect(muteBtn.textContent).toBe('🔇');
    });

    test('updateProgress обновляет прогресс и время', () => {
        videoPlayer.currentTime = 60;
        videoPlayer.dispatchEvent(new Event('timeupdate'));

        expect(progressBar.style.width).toBe('50%');
        expect(currentTimeEl.textContent).toBe('1:00');
        expect(durationEl.textContent).toBe('2:00');
    });

    test('клик по progressContainer перематывает видео', () => {
        jest.spyOn(progressContainer, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            width: 200
        });

        progressContainer.dispatchEvent(
            new MouseEvent('click', { clientX: 100 })
        );

        expect(videoPlayer.currentTime).toBe(60);
    });

});
