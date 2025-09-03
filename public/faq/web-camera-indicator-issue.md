<Title>为什么在网页端禁用自己的视频后摄像头指示灯还亮着？</Title>



- - -

## 问题描述

使用 ZEGO Express Web SDK 时，调用 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 接口成功禁用自己的视频后，摄像头的指示灯仍然亮着。


## 问题原因

ZEGO Express Web SDK 不支持单独开启/关闭采集视频，调用 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 接口关闭正在推流的画面，实际上只是将 “MediaStreamTrack.enabled” 属性设为 “false”，调用该接口后仍会发送视频黑帧，并不是关闭视频采集，因此摄像头的指示灯不会熄灭。


## 解决方案

调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream)  接口销毁视频流可以关闭视频采集，此时摄像头指示灯会熄灭。但是，由于 SDK 推送的对象是流，包含了音频轨道和视频轨道，销毁流的操作会同时影响到音频和视频，所有在调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream)  接口时会同时取消摄像头和麦克风的访问权限，即同时关闭音频和视频的采集。
