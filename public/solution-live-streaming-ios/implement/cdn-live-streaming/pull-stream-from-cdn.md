# 从 CDN 拉流

- - -

本文将为您介绍在使用 ZEGO 直播服务时，如何拉取已转推或直推到 CDN 的流。

## 前提条件

在开始之前，请确保您已完成以下步骤：

- 已在项目中集成 ZEGO Express SDK，实现基本的 CDN 直播功能，详情请参考 [快速开始](https://doc-zh.zego.im/article/20724)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 实现流程

您可以根据需要选择如下拉流方式：


- **方式 1：通过 streamID 拉转推至 ZEGO CDN 的流（推荐）**  
     在同一房间内的其他用户将音视频流推送到 ZEGO 实时音视频云后再转推到 ZEGO CDN 时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id) 回调中收到音视频流新增的通知，并可以通过 [ZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoStream) 获取到某条流的 “streamID”。

- **方式 2：通过 streamID 拉直推至 ZEGO CDN 的流**  
     在同一房间内的其他用户将音视频流推送到 ZEGO CDN 时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id) 回调中收到音视频流新增的通知，并可以通过 [ZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoStream) 获取到某条流的 “streamID”。


我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-state-update-error-code-extended-data-stream-id) 回调知晓是否成功拉取音视频。


```objc
// 如下 playView 为 UI 界面上 View.
ZegoPlayerConfig *playerConfig = [[ZegoPlayerConfig alloc] init];
playerConfig.resourceMode = ZegoStreamResourceModeOnlyCDN;
[[ZegoExpressEngine sharedEngine] startPlayingStream:streamID canvas:[ZegoCanvas canvasWithView:self.view] config:playerConfig];

// 房间内流的状态更新回调。
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType
             streamList:(NSArray<ZegoStream *> *)streamList
           extendedData:(nullable NSDictionary *)extendedData
                  roomID:(NSString *)roomID {
    // 如果用户想要播放房间内其他用户推流的流，可以在 updateType == ZegoUpdateTypeAdd 时，
    // 使用 `streamList` 参数中得到的相应 streamID 调用 startPlayingStream 方法。
    if (updateType == ZegoUpdateTypeAdd) {
        for (ZegoStream *stream in streamList) {
            [self startPlayStreamWithStreamID:stream.streamID];
        }
    } else {
        for (ZegoStream *stream in streamList) {
            [self stopPlayStreamWithStreamID:stream.streamID];
        }
    }
}
```
