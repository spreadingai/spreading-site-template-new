<Title>如何获取 ZIM SDK 的日志信息？</Title>



- - -

各平台根据以下方式，可获取 ZIM SDK 的日志信息。

## Android

“/storage/Android/data/[应用包名]/files/ZIMLogs” 路径下，以 “zimlog” 开头的 TXT 文件为日志信息。

## iOS/iPadOS

1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode_device_window_menu.png" /></Frame></Frame>

2. 左侧选择指定设备，然后在 “INSTALLED APPS” 中找到需要取日志的 App， 单击下方齿轮图标，选择 “Download Container...” 并保存。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode_device_window.png" /></Frame>
      
3. 打开“访达”找到保存的 “.xcappdata” 文件，右键选择 “显示包内容”，选择 “AppData > Library > Caches > ZIMLogs` 目录，以 “zimlog” 开头的 TXT 格式文件为日志信息。


## macOS

- 沙箱：“~/Library/Containers/[应用包名 Bundle ID]/Data/Library/Caches/ZIMLogs” 路径下，以 “zimlog” 开头的 TXT 文件为日志信息。
- 非沙箱：“~/Library/Caches/ZIMLogs” 路径下，以 “zimlog” 开头的 TXT 文件为日志信息。

## Windows

日志文件夹的命名为：“程序的进程名字”+“ZEGO.SDK”。 在 “我的电脑” 路径下直接输入 “%APPDATA%” 并回车，即可定位到日志文件夹存放目录。以 “zimlog” 开头的 TXT 文件为日志信息。

## Web/小程序

Web 和小程序平台无法获取本地日志文件，请开发者在调用 `login` 接口之后，通过 `uploadLog` 接口，将日志上传到 ZEGO 日志中心。

## 其他平台

使用 Flutter、Unity3D、uni-app、React Native 等跨平台框架时，参考上文的原生平台（iOS、Android、macOS、Windows、Web）的方式获取日志即可。