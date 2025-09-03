<Title>如何清理缓存？</Title>


---

RoomKit 的缓存包含了课堂中共享的白板、文件等资源，其默认保存路径及清理方法如下：

- iOS
```
/AppData/Documents/ZegoDocs 
/AppData/Documents/ZegoWhiteboardCache 
/AppData/Library/ZGDownloadCach
```
删除这三个文件夹内的文件即可。

- Android
```
/data/data/[应用的包名]/files/zegodocs/
/data/data/[应用的包名]/files/whiteboard/
```
请通过 Android 系统设置中的清除应用数据功能清理。
以小米MIUI12.0.7系统为例，在应用信息下面有一个清除数据的按钮，可以清除应用数据。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Android/clearcahe_android.png" /></Frame></Frame>