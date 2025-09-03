<Title>如何开启耳返？</Title>



- - -


耳返即耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。

<Note title="说明">

- 在使用耳返功能之前，请确保已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始-集成](/real-time-video-ios-oc/quick-start/integrating-sdk) 和 [快速开始-实现流程](/real-time-video-android-java/quick-start/implementing-video-call)。

- 开启耳返后，需要连接耳机才能体验该功能。

</Note>




### Native 平台

Native 平台主要指 Android、iOS、 Windows 和 Linux 平台。


您可以调用 ZEGO Express SDK 的 enableHeadphoneMonitor 接口开启耳返功能，调用 setHeadphoneMonitorVolume 接口调节耳返音量。

各平台的示例代码如下：

- Android

```java
// Java
// 设置开启耳返功能，默认为 false
engine.enableHeadphoneMonitor(true);

// 调节耳返音量，取值范围为 0 ~ 200，默认为 “60”。
engine.setHeadphoneMonitorVolume(60);
```
- iOS

```objc
// Objective-C
// 设置开启耳返功能，默认为 NO
[engine enableHeadphoneMonitor:YES];

// 调节耳返音量，取值范围为 0 ~ 200，默认为 “60”。
[engine setHeadphoneMonitorVolume:60];
```

- Windows

```cpp
// Windows
// 设置开启耳返功能，默认为 false
engine->enableHeadphoneMonitor(true);

// 调节耳返音量，取值范围为 0 ~ 200，默认为 “60”。
engine->setHeadphoneMonitorVolume(60);
```

- Linux 

```cpp
// Linux
// 设置开启耳返功能，默认为 false
engine->enableHeadphoneMonitor(true);

// 调节耳返音量，取值范围为 0 ~ 200，默认为 “60”。
engine->setHeadphoneMonitorVolume(60);
```

### Web 平台

开启预览或开始推流后，设置 `<video>` 标签的 “muted” 属性为 “false”，可以开启耳返功能。通过设置 `<video>` 标签的 “volume” 属性值，可以调整耳返的音量。

```javascript

videoElement.muted = false;

// volume: 0 ~ 1
videoElement.volume = 0.8;

```

各平台的 API 链接及相关文档参考如下：

<table>
  
  <tbody><tr>
    <th>平台</th>
    <th>API 链接</th>
    <th>相关参考</th>
  </tr>
  <tr>
    <td>Android</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#enable-headphone-monitor">enableHeadphoneMonitor</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-headphone-monitor-volume">setHeadphoneMonitorVolume</a></li></ul></td>
    <td><a target="_blank" href="/real-time-video-android-java/audio/headphone-monitor">耳返</a></td>
  </tr>
  <tr>
    <td>iOS</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~zego-express-engine#enable-headphone-monitor">enableHeadphoneMonitor</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~zego-express-engine#set-headphone-monitor-volume">setHeadphoneMonitorVolume</a></li></ul></td>
    <td><a target="_blank" href="/real-time-video-ios-oc/audio/headphone-monitor">耳返</a></td>
  </tr>
  <tr>
    <td>Windows</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#enable-headphone-monitor">enableHeadphoneMonitor</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#set-headphone-monitor-volume">setHeadphoneMonitorVolume</a></li></ul></td>
    <td><a target="_blank" href="/real-time-video-windows-cpp/audio/headphone-monitor">耳返</a></td>
  </tr>
  <tr>
    <td>Linux</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#enable-headphone-monitor">enableHeadphoneMonitor</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#set-headphone-monitor-volume">setHeadphoneMonitorVolume</a></li></ul></td>
    <td><a target="_blank" href="/real-time-video-linux-cpp/audio/headphone-monitor">耳返</a></td>
  </tr>
  <tr>
    <td>Web</td>
    <td>
    -
    </td>
    <td><a target="_blank" href="/real-time-video-web/audio/headphone-monitor">耳返</a></td>
  </tr>
</tbody></table>
