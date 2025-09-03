# 通过 URL 拉流

---

## 功能简介

小程序使用直接传入 URL 地址的方式进行拉流，目前仅支持 flv, rtmp 格式。

<Warning title="注意">


- 本功能仅支持在 `微信小程序` 上使用。
- 由于小程序开发工具不支持 rtmp 协议，当开发者在小程序开发工具中拉流时，请使用真机进行调试。

</Warning>

 

## 示例源码下载

请参考 [微信小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18274)。

相关源码请查看 `/pages/base/` 目录下的文件。

## 前提条件

在通过 URL 拉流前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18273) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18272)。

## 使用步骤

### 1 开始拉流

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-playing-stream) 接口获取 `streamID` 对应的 URL 播放地址。

<Warning title="注意">


通过 URL 拉流前，需保证已登录房间。  

</Warning>



```javascript
let { streamID, url } = await zg.startPlayingStream(streamList[i].streamID);                      
```


### 2 渲染

拉流后，将小程序 `<live-player>` 组件的 `src` 属性设置为 URL 播放地址，渲染音视频。


```html
<live-player src="rtmp://***" mode="RTC" autoplay bindstatechange="statechange" binderror="error" style="width: 300px; height: 225px;" />
```

<Content />

