# 混响

- - - 

## 功能简介

混响，是指通过对声音的特殊处理，制造不同环境的混响效果，让声音如同在音乐厅、大教堂等场景中发出一般。在直播、语聊房、K歌房场景中，为增加产品的趣味性和互动性，玩家经常用混响烘托气氛。

<Warning title="注意">


本功能仅支持在 `微信小程序` 上使用。

</Warning>




## 前提条件

在使用混响前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250)。

## 使用步骤

### 设置混响

可通过设置小程序的 `<live-pusher>` 组件的 `audio-reverb-type` 属性，达到相应的混响效果。`audio-reverb-type` 为 `number` 类型，具体取值如下：

  | 取值 | 描述 |
  |-------|--------|
  | 0 | 关闭 |
  | 1 | KTV |
  | 2 | 小房间 |
  | 3 | 大会堂 |
  | 4 | 低沉 |
  | 5 | 洪亮 |
  | 6 | 金属声 |
  | 7 | 磁性 |


```html
<live-pusher 
    url="rtmp://domain/push_stream" 
    mode="RTC" 
    audio-reverb-type="1" 
    autopush bindstatechange="statechange" 
    style="width: 300px; height: 225px;" 
/>
```

<Warning title="注意">


纯音频场景下需在 `<live-pusher>` 组件上添加 `enable-camera="false"`  

</Warning>


