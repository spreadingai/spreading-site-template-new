# 音频频谱与音量变化

- - -

## 功能简介

音量变化：指某条流的音量大小，下文简称为“声浪”。

在 K 歌场景中，经常需要拉多路流并显示其中正在讲话的用户，即构提供了甄别用户是否说话、说话音量大小（声浪）的能力，方便开发者做 UI 展示，例如：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code) 获取源码。

相关源码请查看 “src/common.js” 文件。

## 前提条件

在实现声浪功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6839) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9540)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。


## 使用步骤

### 监听声浪回调接口

注册 [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update) 回调，接收流声浪变化。

```javascript
zg.on('soundLevelUpdate', (streamList) => {
    streamList.forEach(stream => {
        stream.type == 'push' && $('#soundLevel').html(Math.round(stream.soundLevel) + '');
        console.warn(`${stream.type} ${stream.streamID}, soundLevel: ${stream.soundLevel}`);
    });
});
```


### 启动声浪监听

调用 [setSoundLevelDelegate](https://doc.oa.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口启动监听声浪，设置声浪回调间隔时间。

```javascript
zg.setSoundLevelDelegate(true, 1000);
```

### 停止声浪监听

调用 [setSoundLevelDelegate](https://doc.oa.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口停止监听声浪。

```javascript
zg.setSoundLevelDelegate(false);
```


## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update)| 音浪更新回调 |
| [setSoundLevelDelegate](https://doc.oa.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~class~ZegoExpressEngine#set-sound-level-delegate)| 设置音浪回调 |
