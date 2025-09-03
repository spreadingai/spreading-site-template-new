<Title>开启美白后画面整体变黑或者偏蓝，该如何处理？</Title>


---


#### 问题原因

- 如果调整美白参数 “intensity” 的值越大，画面越黑，说明美白的颜色查找表资源路径没有设置成功。
- 如果调整美白参数 “intensity” 的值越大，画面越偏蓝，可能是美白的颜色查找表资源图片被压缩了。

#### 解决方案

- 画面变黑，请检查是否正确设置了美白的颜色查找表资源路径，详情请参考 [常用功能 - 美颜](/ai-effects-ios-objc/guides/face-beautification#美白)。
- 画面变蓝，如果是将美白的颜色查找表资源图片打包到 App 里，请打开 Xcode 工程，在 Target 的 Build Settings 里搜索 PNG，将 “Compress PNG Files” 和 “Remove Text Metadata From PNG Files” 设置为 “NO”。如果是从网络动态下载资源，请检查下载的资源图片是否有被压缩（需要保留 PNG 的 Alpha 通道）。
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_xcode_png_compress_setting.png" /></Frame></Frame>


