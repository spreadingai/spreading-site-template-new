# 音视频轨道替换

---

## 功能简介

在浏览器中，媒体流是由音轨和视轨组合而成，本地存在两条及以上媒体流时，通过 ZEGO Express Web SDK 可自由组合媒体流包含的音视轨。

例如主播需要播放背景音乐，主播端通过摄像头和麦克风采集到了媒体流 A，同时通过 \<audio> 标签也加载了一个 MP3 音乐媒体流 B，用媒体流 B 的音轨替换媒体流 A 中的音轨后，拉媒体流 A 的观众就可以听到背景音乐，听不到主播的说话声。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/Others/MediaTrackReplacement” 目录下的文件。

## 前提条件

在实现音视频轨道替换能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 推摄像头画面

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，设置 `camera` 属性，创建摄像头麦克风采集源数据，并得到一个 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream。

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口将本地流推送到远端（ZEGO 服务器），通过 `videoCodec` 参数设置推流视频属性，只能传入 “VP8” 或 “H264”，默认值为 “H264”。


```javascript
// 创建流是一个异步的过程，需要使用 await 语法，这里 await 不能去掉
const localStream = await zg.createZegoStream({camera: {video: true, audio: true}});
// publishStreamId 自定义，需保证唯一
// publishOption 详见接口文档
const result = zg.startPublishingStream(publishStreamId, localStream, publishOption);

// 预览
// 预览画面，将播放组件挂载到页的组件容器 DOM 上 。
localStream.playVideo(document.querySelector("#local-video"));
```

### 加载背景音乐

通过 \<audio> 标签加载背景音乐。

```html
<!--加载相对路径mp3音乐-->
<audio id="customAudio" crossOrigin="anonymous" loop preload playsinline controls src="../../../assets/16183688734997.mp3"></audio>
```

### 替换麦克风为背景音乐

调用 [startCaptureCustomAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-custom-audio) 接口，替换麦克风为背景音乐；调用 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 接口，同步更新推流音频，由麦克风替换为背景音乐。

```javascript
// 监听背景音乐切换按钮
$('#CustomAudio').on('change', async function({ target }) {
    // 选中情况
    if (target.checked) {
        // 播放背景音乐
        $('#customAudio')[0].play()
        try {
            // 采集第三方背景音乐
            await localStream.startCaptureCustomAudio({
                source: $('#customAudio')[0]
            })
            // 更新推流localStream的推流音频
            await zg.updatePublishingStream(localStream, 1)
        } catch (err) {
            console.log(err);
        }
    }
});
```
### 替换摄像头为屏幕共享

调用 [startCaptureScreen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-screen) 接口，替换摄像头为屏幕共享；调用 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 接口，同步更新推流视频，由摄像头替换为屏幕共享。

```javascript
try {
    // 采集屏幕共享
    await localStream.startCaptureScreen()
    // 更新推流localStream的推流视频
    await zg.updatePublishingStream(localStream, 0)
} catch (err) {
    console.log(err);
}
```
