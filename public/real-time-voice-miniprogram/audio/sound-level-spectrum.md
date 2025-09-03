# 音量变化

- - -

## 功能简介

音量变化：指某条流的音量大小，下文简称为“声浪”。

在 K 歌场景中，经常需要拉多路流并显示其中正在讲话的用户，即构提供了甄别用户是否说话、说话音量大小（声浪）的能力，方便开发者做 UI 展示，例如：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>

<Warning title="注意">


本功能仅支持在 `微信小程序` 上使用。

</Warning>




## 示例源码下载

请参考 [微信小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18274)。

相关源码请查看 “pages/native” 目录下的文件。

## 前提条件

在使用声浪前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18273) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18272)。

## 使用步骤

### 监听声浪的回调接口

1. 在小程序的 `<live-pusher>` 组件上绑定 `bindaudiovolumenotify` 事件监听声浪的回调。

```html
<live-pusher
    url="https://domain/push_stream"
    mode="RTC"
    autopush
    bindstatechange="statechange"
    style="width: 300px; height: 225px;"
    bindaudiovolumenotify="onPushAudiovolumenotify"
/>
```
```javascript
onPushAudiovolumenotify(e) {
    console.log('onPushAudiovolumenotify', e.detail.volume);
},
```

<Warning title="注意">


纯音频场景下需在 `<live-pusher>` 组件上添加 `enable-camera="false"`

</Warning>





2. 在小程序的 `<live-player>` 组件上绑定 `bindaudiovolumenotify` 事件监听声浪的回调。

```html
<live-player
    src="https://domain/push_stream"
    mode="RTC"
    autoplay
    bindstatechange="statechange"
    style="width: 300px; height: 225px;"
    bindaudiovolumenotify="onPlayAudiovolumenotify"
/>
```
```javascript
onPlayAudiovolumenotify(e) {
    console.log('onPlayAudiovolumenotify', e.detail.volume);
},
```

<Content />

