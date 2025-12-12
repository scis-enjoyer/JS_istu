<?php
$dir = '.';
$files = array_diff(scandir($dir), ['.', '..']);
$videos = array_filter($files, function($file) {
    return preg_match('/\.(mp4|avi|mkv|mov)$/i', $file);
});
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
<!--    <link rel="stylesheet" href="styles.css"> -->
</head>
<body>
    <div class="video-list">
        <?php foreach ($videos as $video): ?>
            <div class="video-item">
                <video controls preload="metadata">
                    <source src="<?php echo htmlspecialchars($video); ?>" type="video/mp4">
                </video>
                <div class="video-title"><?php echo htmlspecialchars($video); ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>