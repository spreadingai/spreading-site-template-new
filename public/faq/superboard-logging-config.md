<Title>如何设置超级白板日志？</Title>


---

iOS 默认日志路径

```objc
[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoLogFile"]
```

Android 默认日志路径

```java
/sdcard/Android/data/你的应用package名称/files/zegologs
```

可通过 [setCustomizedConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#set-customized-config) 修改日志路径。
