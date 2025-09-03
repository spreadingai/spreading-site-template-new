<Title>如何获取 Roomkit SDK 日志？</Title>


---

默认情况下，Roomkit SDK 会生成 zegoapplog、zegoavlog、zegoconnection、zegodocslog、zegogatewaylog、zegowhiteboardviewlog、zegoroomkitdclog、zegoverboselog 开头的八种 TXT 日志文件，最多生成 3 个，文件名以序号 “1”、“2”、“3” 结尾。单个日志文件默认大小上限为 5MB (5 * 1024 * 1024 Bytes)，3 个日志文件写满后，会删除修改时间最早的一个日志文件。

### iOS/iPadOS

1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode_device_window_menu.png" /></Frame></Frame>

2. 在左侧选择指定设备，然后在 “INSTALLED APPS” 中找到需要取日志的 App， 单击下方齿轮图标，选择 “Download Container...” 并保存。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode-device-window.png" /></Frame>

3. 打开“访达”找到保存的 “.xcappdata” 文件，右键选择 “显示包内容”， 选择 “/AppData/Documents/ZegoLogFile” 目录，找到日志文件。

### Android

到 “/sdcard/Android/data/[应用的包名]/files/ZegoLog/” 目录下即可找到日志文件。