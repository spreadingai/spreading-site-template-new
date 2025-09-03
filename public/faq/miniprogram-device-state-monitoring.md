<Title>使用 Express SDK，小程序作为推流端时，拉流端如何获取麦克风、摄像头的状态变化？</Title>



- - -

请注意，ZEGO Express SDK 无法透传小程序的设备状态。

如果开发者需要在拉流端获取小程序（推流端）的设备状态，请通过 [setStreamExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#set-stream-extra-info) 接口，在小程序端（推流端）设置流附加消
息，拉流端通过 [streamExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#stream-extra-info-update) 回调监听流附加消息。

<Note title="说明">


拉流端监听流附加消息的回调接口，在不同平台的名称有些微差别。例如在 iOS/macOS/Android/Windows 等平台名称为 `onRoomStreamExtraInfoUpdate`，在 Web/小程序等平台为 `streamExtraInfoUpdate`，开发者使用时请注意区分。

</Note>


