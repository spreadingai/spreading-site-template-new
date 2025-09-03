<Title>Mac 端如何实现系统声卡采集？</Title>


---
## 背景
在 Windows、Mac 平台上，ZEGO SDK 支持使用 [enableMixSystemPlayout](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-mix-system-playout) 接口实现通过系统声卡采集，并将系统播放的声音混入推流。例如，浏览器播放的声音、第三方播放器软件播放的声音等。

## 限制条件
Windows 端默认支持该功能，但是 MAC 端需要配合 SoundFlower、BlackHole 等插件使用，并且有如下限制：
- MAC Intel 芯片系列：支持 SoundFlower、BlackHole 插件。
- MAC M1 芯片系列：仅支持 BlackHole 插件。

## 使用方式
### Sounflower 的安装与使用

<Note title="说明">



Sounflower 仅支持 MAC Intel 系列安装使用。

</Note>





1. [下载 Soundflower](https://soundflower.en.softonic.com/mac?ex=CORE-1224.1)，获取 Soundflower-2.0b2.dmg 安装文件，双击打开。
2. 双击 Soundflower.pkg 开始安装。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/1.png" /></Frame></Frame>

3. （可选）安装过程中如遇到权限问题，需要在“系统偏好设置”中，选择“安全性与隐私” > “仍要打开”，重新进行安装。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/2.png" /></Frame></Frame>

4. 配置“音频 MIDI 设置”。
    1. 使用快捷键 command + space（SpotLight），在搜索框中，输入 “MIDI” 进行搜索，进入 “音频 MIDI 设置”界面。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/3.png" /></Frame></Frame>
    2. 新建一个多输出设备，在音频设备界面左下角，选择“+”>“创建多输出设备”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/4.png" /></Frame></Frame>
    3. 主设备选择“内建输出”，采样速率选择 44.1kHz，同时勾选“内建输出”和 “Soundflower(2ch)”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/5.png" /></Frame></Frame>
    4. 在音频设备界面的左侧导航中，右键单击“多输出设备”，分别选择“将此设备用于声音输出”和“使用此设备播放告警声音和声音效果”，设置系统默认声音输出和告警输出。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/6.png" /></Frame></Frame>
    此时内建输出上的“喇叭”图标会显示在多输出设备上。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/7.png" /></Frame></Frame>

### BlackHole 的安装与使用

<Note title="说明">



BlackHole 仅支持 MAC Intel 系列、MAC M1 系列安装使用。

</Note>





1. [下载 BlackHole](https://existential.audio/blackhole/)，获取 BlackHole2ch.v0.4.0.pkg 安装文件，双击开始安装。
2. （可选）安装过程中如遇到权限问题，需要在“系统偏好设置”中，选择“安全性与隐私” > “仍要打开”，重新进行安装。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/8.png" /></Frame></Frame>

3. 配置“音频 MIDI 设置”。

    1. 使用快捷键 command + space（SpotLight），在搜索框中，输入 “MIDI” 进行搜索，进入 “音频 MIDI 设置”界面。
    2. 新建一个多输出设备，在音频设备界面左下角，选择“+”>“创建多输出设备”，。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/9.png" /></Frame></Frame>
    3. 主设备选择“内建输出”，采样速率选择 48kHz，同时勾选“内建输出”和 “BlackHole 2ch”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/10_2.png" /></Frame></Frame>
    4. 在音频设备界面的左侧导航中，右键单击“多输出设备”，分别选择“将此设备用于声音输出”和“使用此设备播放告警声音和声音效果”，设置系统默认声音输出和告警输出。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/10.png" /></Frame></Frame>
    此时内建输出上的“喇叭”图标会显示在多输出设备上。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/11.png" /></Frame></Frame>

### 开启系统声卡采集

完成 Soundflower 或 BlackHole 的安装、配置后，我们在能采集到系统播放声音的同时，也能通过扬声器或者耳机听到本地的播放声音了。

Mac 端可通过调用 SDK 接口 [enableMixSystemPlayout](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-mix-system-playout) 并将参数 enable 设置为 YES，开启声卡采集，将系统播放的声音混入推流中。

### 设置系统声卡采集的音量

<Warning title="注意">



创建多输出设备并把多输出设备设置为系统默认声音输出后，Mac 按键“F10”/“F11”/“F12”将无法调节音量，因为这 3 个按键，仅在系统默认声音输出设备为“非聚合设备”时有效。  

</Warning>



使用 Soundflower 或 BlackHole 之后，可以通过如下方式设置系统声卡采集的音量：

- 方式 1：使用 SDK 接口 setMixSystemPlayoutVolume 设置系统声卡采集的音量。
- 方式 2：在 MIDI 界面，单独调节 Soundflower 或 BlackHole 的输入或输出音量，两者都可以降低从系统采集到的音量。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/mac_mixsystemOut/12.png" /></Frame></Frame>