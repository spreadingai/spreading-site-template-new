<Title>Express 如何设置镜像模式？</Title>



- - -


ZEGO Express SDK 提供了在编码时对视频做镜像操作的功能，您可以在推流前或停止推流后调用 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-video-mirror-mode) 接口，通过 “mirrorMode” 参数设置本地预览视频和推送的视频（即对端用户看到的视频画面）是否开启镜像模式，具体模式可以根据您的实际需要选择。

<Warning title="注意">



- [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-video-mirror-mode) 也支持在推流过程中设置并即时生效。
- 若您的数据不是由 SDK 进行渲染，则通过 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-video-mirror-mode) 设置的镜像模式中的本地预览镜像无效。  

</Warning>




目前支持的镜像模式如下：

| 枚举值 | 含义 | 说明 |
| - | - |  -   |
| NO_MIRROR | 本地预览和拉流端看到的视频都不是镜像画面。|  设置该模式后本地和对端看到的画面都不受影响，即都为原始效果。   |
| ONLY_PREVIEW_MIRROR | 只有本地预览为镜像画面，默认采用此模式。|  在本地设备上，本地用户的视频流绑定在本地视图上，该用户可以看到本地视图显示的镜像效果，对端看到的画面不受影响（即为原始效果）。  |
| ONLY_PUBLISH_MIRROR | 只有拉流端看到的视频才是镜像画面。|  本地视频流编码后会发送给对端用户观看，设置该模式后，只有对端用户所看到的画面为镜像效果，不影响本地用户所见（即为原始效果）。  |
| BOTH_MIRROR | 本地预览和拉流端看到的视频都是镜像画面。|   设置该模式后，本地和对端用户看到的画面都受影响，即都为镜像效果。  |

四种镜像模式的效果如下：
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/CommonFeatures/CommonVideoConfig/mirror_mode_android.png" /></Frame></Frame>

以设置拉流端镜像且本地预览非镜像为例，各平台的示例代码如下：

- iOS/macOS

```objc
[[ZegoExpressEngine sharedEngine] setVideoMirrorMode:ZegoVideoMirrorModeOnlyPublishMirror];
```

- Android

```java
engine.setVideoMirrorMode(ZegoVideoMirrorMode.ONLY_PUBLISH_MIRROR);
```

- Windows

```cpp
engine->setVideoMirrorMode(ZegoVideoMirrorMode::ONLY_PUBLISH_MIRROR);
```
