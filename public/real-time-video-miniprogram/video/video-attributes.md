# 设置视频属性

- - -

## 功能简介

当视频通话或直播时，开发者可以根据需要设置视频属性，调整视频画面的清晰度、流畅度以及镜像，从而获得较好的用户体验。

## 前提条件

在设置视频属性前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考：

- [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250)。
- [支付宝小程序 - 集成 SDK](https://doc-zh.zego.im/article/18244) 和 [支付宝小程序 - 实现流程](https://doc-zh.zego.im/article/18243)。


## 使用步骤

### 设置微信小程序的视频属性

可通过设置 `微信小程序` 的 `<live-pusher>` 组件的属性，调整视频质量。

- 设置 `mode` 属性调整视频分辨率，具体取值如下：

 |  取值   | 描述  | 
|  ----  | ----  | 
| RTC | 实时通话（默认值） |
| SD | 标清 |
| HD | 高清 |
| FHD | 超清 |

- 设置 `min-bitrate` 、`max-bitrate` 属性调整视频最小码率、最大码率。

<Note title="说明">


    - `<live-pusher>` 组件的默认最小码率为 200 kbps，默认最大码率为 1000 kbps。
    - 如果使用默认值编码出的画面质量不符合要求，请将 min-bitrate 和 max-bitrate 的值设置得更高一些。
    - 为了避免带宽不足影响视频质量，建议自定义值不要超过默认值的 2 倍，详情请参考微信小程序 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 文档。
    
</Note>



    ```html
    <live-pusher
        wx:if="{{pushUrl}}"
        id="video-livePusher"
        mode="RTC"
        url="{{pushUrl}}"
        min-bitrate="{{pushConfig.minBitrate}}"
        max-bitrate="{{pushConfig.maxBitrate}}"
        aspect="{{pushConfig.aspect}}"
        beauty="{{pushConfig.isBeauty}}"
        muted="{{pushConfig.isMute}}"
        background-mute="true"
        debug="{{pushConfig.showLog}}"
        bindstatechange="onPushStateChange"
        bindnetstatus="onPushNetStateChange">
        <cover-view class='character' style='padding: 0 5px;'>{{isPublishing ? "我(" + publishStreamId + ")": ""}}</cover-view>
    </live-pusher>    
    ```

### 设置支付宝小程序的视频属性

可通过设置 `支付宝小程序` 的 `<rtc-room>` 组件的属性，调整视频质量。

- 设置 `resolution` 属性调整视频分辨率，具体取值如下：

 |  取值   | 描述  | 
|  ----  | ----  | 
| 0 | 标清（分辨率为 640 × 360） |
| 1 | 高清（分辨率为 960 × 540）|
| 2 | 超清（分辨率为 1280 × 720）|

- 设置 `min-bitrate` 、`max-bitrate` 属性调整视频最小码率、最大码率。

<Note title="说明">


    如果使用默认值编码出的画面质量不符合要求，请将 min-bitrate 和 max-bitrate 的值设置得更高一些。
    
</Note>



    ```html
    <view class="containerBase">
        <rtc-room
        a:if="{{showRtcroom}}"
        class="rtcContent"
        id="{{rtcroomID}}"
        roomId="{{rtcroom.roomId}}"
        token="{{rtcroom.token}}"
        userId="{{rtcroom.userId}}"
        signature="{{rtcroom.signature}}"
        autoplay="{{rtcroom.autoplay}}"
        enable-camera="{{rtcroom.enableCamera}}"
        mute="{{rtcroom.mute}}"
        fps="{{rtcroom.fps}}"
        resolution="{{rtcroom.resolution}}"
        record="{{rtcroom.record}}"
        min-bitrate="{{rtcroom.minBitrate}}"
        max-bitrate="{{rtcroom.maxBitrate}}"
        extraInfo="{{rtcroom.extraInfo}}"
        onError="onError"
        onRoomInfo="onRoomInfo"
        onParticipantEnter="onParticipantEnter"
        onParticipantLeave="onParticipantLeave"
        onAudioPlayoutMode="onAudioPlayoutMode"
        onReceiveRecordId="onReceiveRecordId"
        onRtmpEvent="onRtmpEvent"
        />
    </view>
    ```
