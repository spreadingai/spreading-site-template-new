# 自定义视频采集

- - -

## 功能简介

自定义视频采集，是指由开发者自行采集视频，向 ZEGO Express SDK 提供视频数据，并由 ZEGO Express SDK 进行编码推流的功能。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频采集功能：

- 普通摄像头的采集无法满足需求。例如，包含了大量的原有业务。
- 直播非摄像头数据。例如视频播放、屏幕分享、游戏直播等。
- 使用第三方虚拟摄像头外部采集来做自定义美颜等视频预处理。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/AdvancedVideoProcessing/CustomVideoCapture” 目录下的文件。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 使用步骤

需要推送自定义视频源的流：

1. 在调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 流实例对象时，通过设置 “source” 参数来指定第三方数据源。
2. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 推流。

- 设置第三方媒体流

    ```javascript
    //开始预览本地视频
    previewVideo.srcObject = mediaStream;
    const stream = await zg.createZegoStream({
        custom: {
            video: {
                source: mediaStream
            },
            audio: {
                source: mediaStream // 视频原声，也可以为其他音频源
            }
        }
    })
    //推流
    zg.startPublishingStream(idName, stream);
    ```

- 设置第三方音视频

<Warning title="注意">


    - 第三方音视频目前暂不支持 Safari 浏览器推流，只支持拉流。
    - 自 Chrome 86 开始，推第三方音视频流时，如果本地音视频设置静音，拉流端将无法听到对应的声音。

</Warning>



    `source` 为 \<video\> 或 \<audio\> 对象时，从其指定的视频或音频源作为预览。

    ```javascript
    //localVideo 为 <video> 对象
    const stream = await zg.createZegoStream({
        custom: {
            video: {
                source: localVideo
            },
            audio: {
                source: localAudio // 可以为视频原声，也可以为其他音频源
            }
        }
    })
    //推流
    zg.startPublishingStream(idName, stream);
    ```

<Content />

