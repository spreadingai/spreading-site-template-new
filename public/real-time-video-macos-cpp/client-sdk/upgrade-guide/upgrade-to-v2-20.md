# 2.20.0 及以上版本升级指南

- - -

<Warning title="注意">


- 如果您当前的 SDK 低于 2.20.0 版本，需要升级到任一 2.20.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12545) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>

从 2.20.0 版本起，实时音视频和实时语音之间不再有 API 的差异，即可以随时从实时音视频 SDK 切换到实时语音 SDK，反之亦然。

两种 SDK 之间的区别是对于实时语音 SDK，部分跟视频相关的 API （例如，视频编码参数设置、预览和拉流的 `ZegoCanvas` 参数等）设置后没有效果，但不会报错。

**此次改动会影响 Android-Java 及 Linux-Java 平台的以下 API （其他平台无感知，可以直接升级），从老版本升级成功后，可能会编译报错，需要适配。**

## Java SDK (Android-Java 及 Linux-Java)

- 编译报错：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Android/express_v2_20_startplayingstream_error_java.png" /></Frame>

- 原因：

    ```java
    // 如果只想播放有声音的流（无视图），请不要将 “canvas” 参数设置为 null，而是设置一个空的 ZegoCanvas，或者不填写第二个参数。
    // 2.20.0 及以上版本，使用该方法会报错“error: reference to startPlayingStream is ambiguous”。
    engine.startPlayingStream("streamid", null); 
    ```

- 适配方式：

    ```java
    // 如果只想播放有声音的流（无视图），请不要将 “canvas” 参数设置为 null，而是设置一个空的 ZegoCanvas，或者不填写第二个参数。
    // 2.20.0 及以上版本，根据需求选择以下任意一种。
    engine.startPlayingStream("streamid", new ZegoCanvas(null)); 
    engine.startPlayingStream("streamid"); 
    ```

<Content />