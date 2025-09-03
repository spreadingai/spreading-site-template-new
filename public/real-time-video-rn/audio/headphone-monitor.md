# 耳返与声道设置

- - -

## 功能简介

耳返即耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。

## 前提条件

在使用耳返前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。


## 使用步骤

开启预览后或者开始推流后，调用 [enableHeadphoneMonitor ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enableheadphonemonitor) 接口开启耳返（即开启采集监听），连接上耳机，用户发出声音后，即可听到自己的声音。

<Note title="说明">


开启耳返功能后，必须连接上耳机后，该功能才会实际生效。

</Note>



```javascript
ZegoExpressEngine.instance().enableHeadphoneMonitor(true)
```
