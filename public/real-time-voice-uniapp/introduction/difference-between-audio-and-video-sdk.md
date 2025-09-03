# 实时音视频 SDK 与实时语音 SDK 差异

- - -

从 v2.20.0 版本起，实时音视频和实时语音之间不再有 API 的差异，即可以随时从实时音视频 SDK 切换到实时语音 SDK，反之亦然。

实时语音 SDK 与实时音视频 SDK 之间只有功能上的差异：对于实时语音 SDK 来说，部分跟视频相关的 API （比如视频编码参数设置、预览和拉流的 ZegoCanvas 参数等）设置后没有效果，但不会报错。

涉及到的 API 如下：

- [startPreview](https://doc-zh.zego.im)
    - 在实时音视频 SDK 中的效果为：启动麦克风、启动摄像头，并且如果有在 canvas 参数中传入视图，则 SDK 会在该视图中渲染预览画面。
    - 在实时语音 SDK 中的效果为：启动麦克风。开发者可以在调用此 API 时，将 canvas 参数设置为 null，或者若存在重载函数，可以使用此 API 不带 canvas 参数的重载函数。

<Warning title="注意">


在实时语音 Flutter / Electron / uni-app / Unity3D / Cocos Creator / React-Native SDK 上调用 `startPreview` 时，仍然会启动摄像头；开发者可以在调用 `startPreview` 前，先调用 `enableCamera` 关闭摄像头，以避免 SDK 请求摄像头权限。
</Warning>


- [startPlayingStream](https://doc-zh.zego.im)
    - 在实时音视频 SDK 中的效果为：开始拉流，播放拉到的流的音频，并且如果开发者在 canvas 参数中传入视图，则 SDK 会在该视图中渲染拉到的流的视频画面。
    - 在实时语音 SDK 中的效果为：开始拉流，播放拉到的流的音频。开发者可以在调用此 API 时，将 canvas 参数设置为 null，或者若存在重载函数，可以使用此 API 不带 canvas 参数的重载函数。

<Warning title="注意">



其余所有与视频相关的 API 在实时语音 SDK 中都没有效果。您可以通过 API 中提供的注释 `Note: This function is only available in ZegoExpressVideo SDK!`，判断该 API 是否与视频相关。若存在该注释，则表示该 API 与视频相关。
</Warning>

<Content />