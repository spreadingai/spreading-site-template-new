# 从 CDN 拉流

- - -

本文将为您介绍在使用 ZEGO 直播服务时，如何拉取已转推或直推到 CDN 的流。

## 前提条件

在开始之前，请确保您已完成以下步骤：

- 已在项目中集成 ZEGO Express SDK，实现基本的 CDN 直播功能，详情请参考 [快速开始](https://doc-zh.zego.im/article/20720)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 实现流程

您可以根据需要选择如下拉流方式。

- **方式 1：通过 streamID 拉转推至 ZEGO CDN 的流（推荐）**   
     在同一房间内的其他用户，将音视频流推送到 ZEGO 实时音视频云后再转推到 ZEGO CDN 时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调中收到音视频流新增的通知，并可以通过 [ZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoStream) 获取到某条流的 “streamID”。

- **方式 2：通过 streamID 拉直推至 ZEGO CDN 的流**   
     在同一房间内的其他用户，将音视频流推送到 ZEGO CDN 时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调中收到音视频流新增的通知，并可以通过 [ZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoStream) 获取到某条流的 “streamID”。


我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-state-update) 回调知晓是否成功拉取音视频。

```java
// playView 为 UI 界面上 View.
ZegoCanvas playCanvas = new ZegoCanvas(playView);
ZegoPlayerConfig playerConfig = new ZegoPlayerConfig();
playerConfig.resourceMode = ZegoStreamResourceMode.ONLY_CDN;
engine.startPlayingStream(playStreamID, playCanvas, playerConfig);

// 房间内流的状态更新回调
public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
            super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
            // 当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream 接口拉取播放该音视频流
            if (updateType == ZegoUpdateType.ADD) {
                startPlayStream(streamList.get(0).streamID);
            } else {
                stopPlayStream(streamList.get(0).streamID);
            }
        }
```
