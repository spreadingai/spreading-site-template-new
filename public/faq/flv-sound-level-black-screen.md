<Title>混流时开启了音浪功能，使用 “flv.js” 拉流播放在部分浏览器上会黑屏？</Title>



- - -

### 问题原因

混流时开启了音浪 “soundLevel”，音浪走的是 “SEI”，部分浏览器不兼容。

### 解决方案

请将参数 “withSoundLevel” 设置为 “false”，关闭混流音浪功能。