<Title>为什么通过系统音量无法调节背景音乐？</Title>



---

移动设备（iOS/Android）声音的音量会区分媒体音量和通话音量。在 SDK 的某些配置下，实时音视频服务会使用通话音量，此时调节音量键也会变成控制设备的通话音量。而背景音乐使用媒体通道播放，需要调节媒体音量。两种音量在声音表现、适用场景、音量控制上有所不同，详情请参考 [媒体音量和通话音量有什么区别](https://doc-zh.zego.im/faq/system_volume)。

当系统音量无法调节背景音乐时，可以通过如下两种方式处理：

**方式一：**

使用 ZEGO Express SDK 的媒体播放器播放音乐背景，此时音乐背景将和实时音视频通话使用相同的通道进行播放。


**方式二：**

使用移动设备（iOS/Android）的系统 API 直接调整指定通道的音量，详情请参考：
- iOS：[AudioManager](https://developer.apple.com/documentation/mediaplayer/mpvolumeview) 
- Android：[MPVolumeView](https://developer.android.com/reference/android/media/AudioManager.html)
