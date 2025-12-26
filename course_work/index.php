<?php
$dir = '.';
$files = array_diff(scandir($dir), ['.', '..']);
$videos = array_filter($files, function($file) {
    return preg_match('/\.(mp4|avi|mkv|mov|wmv|flv|webm)$/i', $file);
});
sort($videos);

// Получаем первый видеофайл для начальной загрузки
$firstVideo = !empty($videos) ? $videos[0] : null;

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <script src="player.js" defer></script>
    <meta charset="UTF-8">
    
</head>
<body>
    <div class="container">
        <!--Плеер-->
        <div class="player-section">
            <div class="video-container">
                <video id="videoPlayer" controls>
                    <?php if ($firstVideo): ?>
                        <source src="<?php echo htmlspecialchars($firstVideo); ?>" type="video/mp4">
                    <?php endif; ?>
                    Ваш браузер не поддерживает видео тег.
                </video>
            </div>
            
            <div class="player-controls">
                <button class="control-btn" id="playPauseBtn">▶️</button>
                <button class="control-btn" id="stopBtn">⏹️</button>
                <button class="control-btn" id="muteBtn">🔊</button>
                
                <div class="volume-container">
                    <span>🔊</span>
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="1">
                </div>
                
                <div class="progress-container" id="progressContainer">
                    <div id="progressBar"></div>
                </div>
                
                <div class="time-display">
                    <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
                </div>
                
                <button class="control-btn" id="fullscreenBtn">⛶</button>
            </div>
            
            <?php if ($firstVideo): ?>
                <div class="current-video-title" id="currentVideoTitle">
                    📺 <?php echo htmlspecialchars($firstVideo); ?>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- Правая часть: список файлов -->
        <div class="file-list-section">
            <div class="section-title">
                <span>📁</span> Список видео (<?php echo count($videos); ?>)
            </div>
            
            <?php if (empty($videos)): ?>
                <div class="empty-message">
                    <div class="empty-icon">📭</div>
                    <h3>Видео файлы не найдены</h3>
                    <p>Разместите видео файлы в этой директории</p>
                </div>
            <?php else: ?>
                <ul class="video-list">
                    <?php foreach ($videos as $index => $video): ?>
                        <?php
                        $filepath = $dir . '/' . $video;
                        $modified = date('d.m.Y H:i', filemtime($filepath));
                        ?>
                        <li class="video-item <?php echo $index === 0 ? 'active' : ''; ?>" 
                            data-src="<?php echo htmlspecialchars($video); ?>">
                            <div class="video-name">🎬 <?php echo htmlspecialchars($video); ?></div>
                            <div class="video-info">
                                <span><?php echo $size; ?></span>
                                <span><?php echo $modified; ?></span>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>

</body>
</html>