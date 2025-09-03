<Title>升级 Express v2.20.0 或以上版本后编译报错？</Title>



- - -

从 2.20.0 版本起，实时音视频和实时语音之间不再有 API 的差异，即可以随时从实时音视频 SDK 切换到实时语音 SDK，反之亦然。

两种 SDK 之间的区别是对于实时语音 SDK，部分跟视频相关的 API （例如，视频编码参数设置、预览和拉流的 `ZegoCanvas` 参数等）设置后没有效果，但不会报错。

**此次改动会影响 Android-Java 平台的以下 API （其他平台无感知，可以直接升级），从老版本升级成功后，可能会编译报错，需要适配。**

- 编译报错：
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Android/express_v2_20_startplayingstream_error_java.png" /></Frame></Frame>

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

