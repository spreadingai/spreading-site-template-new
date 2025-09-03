# 从 CDN 拉流切换到连麦场景

- - -

## 功能简介

在连麦场景中，由于 CDN 拉流和 CDN 推流都有很高的延迟，会导致连麦过程互动体验很差，因此推荐在连麦过程中使用 RTC 拉流和 RTC 推流，麦下再恢复 CDN 拉流，以提升连麦体验。本文将介绍在完整的 CDN 地址拉流方式下，如何实现连麦过程。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/CDN_To_Call_Scenario.png" /></Frame>

### 拉流方式对比

<table>

<tbody><tr>
<th>拉流方式</th>
<th>适应场景</th>
<th>延迟情况</th>
</tr>
<tr>
<td>从 CDN 拉流</td>
<td>观众不需要与主播连麦，通过弹幕等方式与主播互动，对观看的实时性要求不高。</td>
<td>延迟超过 3 秒</td>
</tr>
<tr>
<td>从 RTC 拉流</td>
<td>观众需要与主播连麦，且与主播互动交流实时性要求较高。</td>
<td>连麦双方延迟低于 300 毫秒</td>
</tr>
</tbody></table>


## 前提条件

如需从 CDN 拉流切换到连麦场景，请确保当前音视频流，已实现 [通过 URL 拉流](https://doc-zh.zego.im/article/3640)。

## 实现步骤

### 1 观众端切换拉流方式

当从 CDN 拉流切换到连麦场景时，观众端需调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-playing-stream) 停止当前 CDN 拉流，并调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 切换为 RTC 拉流。

```objc
//停止当前的 CDN 拉流，传入对应的主播流 ID
[[ZegoExpressEngine sharedEngine] stopPlayingStream:@"anchorStreamID"];
//切换为 RTC 拉流
ZegoCanvas *playCanvas = [ZegoCanvas canvasWithView:self.remotePlayView];
ZegoPlayerConfig *playConfig = [[ZegoPlayerConfig alloc] init];
playConfig.resourceMode = ZegoStreamResourceModeOnlyRTC;
[[ZegoExpressEngine sharedEngine] startPlayingStream:self.playStreamIDTextField.text canvas:playCanvas config:playConfig];
```

### 2 观众端开启预览和推流

传入观众端的流 ID，并开启预览 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 和推流 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)，即可连麦成功。


```objc
//开启预览
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:self.localPreviewView];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas];
//开始推流，并传入观众端的流 ID
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"pulishingStreamID"];
```

### 3 观众端停止预览和推流

若连麦结束，可在观众端调用 [stopPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-preview) 和 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-publishing-stream) 接口，停止预览和推流。

```objc
//停止预览
[[ZegoExpressEngine sharedEngine] stopPreview];
//停止推流
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
```


### 4 观众端连麦结束

连麦结束，传入主播的流 ID，并在观众端调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-playing-stream) 接口，停止 RTC 拉流 ，重新切换为 CDN 拉流，并通过 [ZegoViewMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoViewMode) 设置 CDN 参数，详情请参考 [通过 URL 拉流](https://doc-zh.zego.im/article/3640)。

```objc
//停止当前的 RTC 拉流
[[ZegoExpressEngine sharedEngine] stopPlayingStream:@"anchorStreamID"];
//切换为 CDN 拉流
ZegoCanvas *playCanvas = [ZegoCanvas canvasWithView:self.remotePlayView];
ZegoPlayerConfig *playerConfig = [[ZegoPlayerConfig alloc] init];
playerConfig.resourceMode = ZegoStreamResourceModeOnlyCDN;
ZegoCDNConfig *cdnConfig = [[ZegoCDNConfig alloc] init];
cdnConfig.url = "rtmp://xxxxxxxx"; // URL 为 CDN 拉流地址
cdnConfig.authParam = "xxx"; // 如果需要鉴权则要设置鉴权参数，如果不需要鉴权可以不设置（鉴权参数不能带"?"字符）
playerConfig.cdnConfig = cdnConfig;
[[ZegoExpressEngine sharedEngine] startPlayingStream:self.streamID canvas:playCanvas config:playerConfig];
```

### 5 主播端开启及关闭拉流

主播端通过 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler) 中的 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id) 回调，收到观众流新增通知后，可开启 RTC 拉流。当收到观众流删除通知后，则停止 RTC 拉流。

```objc
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    if (updateType == ZegoUpdateTypeAdd) {
        for (ZegoStream *stream in streamList) {
            //开启 RTC 拉观众流
            ZegoCanvas *playCanvas = [ZegoCanvas canvasWithView:self.remotePlayView];
            ZegoPlayerConfig *playConfig = [[ZegoPlayerConfig alloc] init];
            playConfig.resourceMode = ZegoStreamResourceModeOnlyRTC;
            [[ZegoExpressEngine sharedEngine] startPlayingStream:stream.streamID canvas:playCanvas config:playConfig];
        }
    } else if (updateType == ZegoUpdateTypeDelete) {
        for (ZegoStream *stream in streamList) {
            //停止 RTC 拉观众流
            [[ZegoExpressEngine sharedEngine] stopPlayingStream:stream.streamID];
        }
    }
}
```
