<Title>如何将媒体播放器播放文件的声音混入推流中？</Title>



- - -

有两种方式：（二选一）

- 方法 1：通过 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#enable-aux) 接口，开启媒体播放器混音功能，将媒体播放器音频混入 `主路` 推流。**（仅支持混入主路流）**


- 方法 2：通过 [enableCustomAudioIO](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#enable-custom-audio-io-1) 接口（参数 channel 选择 “ZegoPublishChannelAux”、参数 config 配置 sourceType 为 “ZegoAudioSourceTypeMediaPlayer”），开启辅路自定义音频采集，并且音频采集源设置为媒体播放器，将媒体播放器音频混入 `辅路` 推流。**（仅支持配置辅路流）**
