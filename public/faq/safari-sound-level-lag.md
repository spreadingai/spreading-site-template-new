<Title>混流时开启音浪功能，使用 Safari 浏览器播放视频出现卡顿现象，如何处理？</Title>



- - -

### 问题原因

若混流时开启了音浪 “soundLevel”，则音浪将采用 “SEI”形式，Safari 浏览器不兼容。

### 解决方案

请将参数 “withSoundLevel” 设置为 “false”，关闭混流音浪功能。