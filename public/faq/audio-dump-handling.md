<Title>如何获取、上传音频的 Dump 文件？</Title>



- - -

在实时通话过程中，音频发生异常时，可以参考本文，将处理前后的音频 Dump 数据保存下来并上传，用于定位音频相关问题、提高问题排查效率、缩短接入时间。

## 操作步骤

以下以 Android 平台接口调用为例，其他平台同理。

1. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 接口之后，开发者可以在推流前后，获取音频的 Dump 文件。
2. 调用 [startDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-dump-data) 开始转储音频数据，并在 [ZegoDumpDataConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoDumpDataConfig) 参数中，配置需要 Dump 的数据类型为 `Audio`**（目前仅支持 Audio）**；同时通过 [onStartDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-start-dump-data) 回调返回接口调用的结果。
3. 调用 [stopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-dump-data) 结束转储音频数据，同时通过 [onStopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-stop-dump-data) 回调返回接口调用的结果。**接口调用成功后，回调中会返回 Dump 文件的目录路径。**
4. 调用 [uploadDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#upload-dump-data) 上传当次的 Dump 数据，同时通过 [onUploadDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-upload-dump-data) 回调返回接口调用的结果。
5. 最后，可以通过 [removeDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#remove-dump-data) 接口，删除当次的音频转储数据。

## 注意事项

- 由于音频 Dump 文件属于用户的隐私敏感数据，因此开发者实现该能力时，请务必认真阅读 [《即构隐私政策》](https://www.zego.im/privacy) 中关于 “使用音频 Dump 功能” 的内容。此外，在收集音频 Dump 文件时，请在获得用户授权同意时，同步注明 Express SDK 收集目的。
- 在上传音频 Dump 数据前，SDK 会自动检查 Dump 文件大小，超过 100 MB 上传失败。如果上传失败，开发者可以从设备上导出 Dump 文件，并联系 ZEGO 技术支持获取帮助。
- 音频的 Dump 文件只能保留转储过程中**最后的 2～4 分钟的数据**。