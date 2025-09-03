<Title>如何设置音频设备模式 ZegoAudioDeviceMode？</Title>



- - -

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/ZegoAudioDeviceMode.png" /></Frame></Frame>

## 注意事项
			
1. 在 **Android 和 iOS 平台**中：

    1. `通话音量`表示启动系统 3A，`媒体音量`表示关闭系统 3A。

    2. **Android 平台**：音量模式切换，会导致设备的重启。

        - 如果切换前本地已经在播放音频，则切换过程中本地播放会有一次卡顿。
        - 如果切换前已经在推流，则拉流端也会听到一次卡顿。

    3. **iOS 平台**：音量模式切换、或⻨克风的启停，都会导致设备的重启。

        - 如果切换前本地已经在播放音频，则切换过程中本地播放会有一次卡顿。
        - 如果切换前已经在推流，则拉流端也会听到一次卡顿。

2. 当 [enableHeadphoneAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#enable-headphone-aec) 设置为 false 时，插⼊外接设备（如耳机、外置声卡等）后均使用“媒体音量”，音频设备模式（audio_device_mode）设置将不生效。

3. 在 **macOS 平台**中：目前⻨克⻛始终占用，通话音量使用系统前处理，非通话音量使用软件 3A 处理。 macOS 平台区分通话音量的方法为：先播放一段音乐，如果是通话音量，启动我们的 Demo 时，音乐播放会明显变小；如果是媒体音量播放器，启动我们的 Demo 时，音乐听感没有明显变化。Apple silicon 芯片机器由于适配问题，请务必使用 `General` 媒体音量工作。

4.  在 **Windows 平台**中：没有音频设备模式（audio_device_mode）的区分，始终占⽤麦克风，并且使用软件回声消除。`Windows 平台没有通话⾳量和媒体⾳量的区分。`			
						
						
						
						
						
						
						
						
						
						
						