# RTMP 推流到 ZEGO 服务器

- - -

## 功能简介

在直播场景下，主播可以通过 RTMP 推流工具将音视频流推送到 ZEGO 服务器，实现低延迟的效果。观众可以使用 ZEGO Express SDK 拉流。

RTMP 推流工具指的是通过 RTMP 地址进行推流的第三方工具，主要包括硬件推流设备、软件 OBS 等。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/rtmptozego.png" /></Frame>


## 前提条件

- 已联系 ZEGO 技术支持，开通 RTMP 工具推流到 ZEGO 服务器的相关权限。
- 准备 RTMP 推流工具，例如 OBS。

## 使用步骤

### 获取 RTMP 推流地址

请联系 ZEGO 技术支持开通服务，通过 [RTMP 推流调度](/real-time-video-server/api-reference/media-service/rtpm-dispatch) 服务端接口获取 RTMP 推流地址。

### 使用 RTMP 工具推流

下文以 OBS 为例介绍 RTMP 工具的推流操作。

#### 设置推流地址

1. 打开 OBS 工具，在底部工具栏的“控件”页签单击“设置”进入设置界面。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/obs1.png" /></Frame>

2. 单击 “推流” 进入流设置页签，选择服务类型为“自定义流媒体服务器”。

3. 将获取到的 RTMP 推流地址填写到“服务器”和“串流密码”字段中。

- 服务器：对应 RTMP 推流地址，即 `rtmp://hosts/AppName/`

    **请注意，RTMP 推流地址 URL，与 [CDN 推流鉴权](https://doc-zh.zego.im/article/15821) 中的推流地址 URL 不同，不可混用，使用时请您注意区分。**

- 串流密码：对应 RTMP 推流流名，即 “streamID”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/obs2.png" /></Frame>


4. 单击“确定”保存以上设置信息。

#### 设置推流引导

1. 在底部工具栏的“来源”页签单击 “+” 按钮。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/obs3.png" /></Frame>

2. 按需选择输入源，例如“显示器捕获”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/obs4.png" /></Frame>

#### 使用 OBS 推流


1. 在底部工具栏的“控件”页签单击“开始推流”，即可将音视频流推送到所设置的推流地址，底部出现绿灯，则表示推流成功。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RtmpToZego/obs6.png" /></Frame>

2. 若需停止推流，单击“控件”页签的“停止推流”即可。

<Warning title="注意">



使用 RTMP 工具推流后，用户无法通过 [RoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调来收到音视频流新增或删除的通知，可以通过以下两种方式获取：
- 使用 RTMP 工具推流后，业务服务器通过业务信令下发第三方推流 “streamID” 给房间内的其他用户，通知房间内的其他用户有流新增或删除。
- 可以使用 ZEGO 服务端的 [增加房间流](/real-time-video-server/api-reference/room/add-stream) 与 [删除房间流](/real-time-video-server/api-reference/room/delete-stream) 接口向指定房间增加或删除一路流信息，将 “streamID” 信息下发给房间内的其他用户，此时其他用户可以就通过 [RoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调收到音视频流新增或删除的通知。

</Warning>



### 使用 SDK 拉流/停止拉流

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口，传入 RTMP 推流的 “streamID” （即设置推流地址中设置的“串流密码”）拉流播放，下文以超低延迟直播拉流为例，其他拉流方式可参考 [快速实现超低延迟直播](https://doc-zh.zego.im/article/16050)。

```javascript
// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    // 当 updateType 为 ADD 时，代表有音视频流新增，此时可以调用 startPlayingStream 接口拉取播放该音视频流
    if (updateType == 'ADD') {
        // 流新增，开始拉流
        // 这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流

        let playOption = {};
        let video = document.create
        playOption.resourceMode = 2;

         const remoteStream = await zg.startPlayingStream(streamID);

        // 创建媒体流播放组件对象，用于播放远端媒体流 。
        const remoteView = zg.createRemoteStreamView(remoteStream);
        // 将播放组件挂载到页面，"remote-video" 为组件容器 DOM 元素的 id 。
        remoteView.play("remote-video");

    } else if (updateType == 'DELETE') {
        // 流删除，停止拉流
    }
});
```


调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口，传入 RTMP 推流的 “streamID”（即设置推流地址中设置的“串流密码”）停止拉取远端推送的音视频流。

```javascript
// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增，开始拉流
    } else if (updateType == 'DELETE') {
        // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
        const streamID = streamList[0].streamID;
        zg.stopPlayingStream(streamID)
    }
});
```





## 常见问题

**1. 业务服务器如何知道 RTMP 推流工具是否已开始推流或停止推流？**

ZEGO 提供了 `publish_start` 开始推流和 `publish_stop` 停止推流回调通知，如有需要请联系 ZEGO 技术支持配置。
