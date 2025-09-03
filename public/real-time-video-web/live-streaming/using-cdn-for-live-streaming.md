# 使用 CDN 直播
---

## 功能简介

当推流端使用第三方推流工具（例如 OBS 软件、网络摄像头 IP Camera 等）将流推到 CDN 时，或使用 ZEGO SDK 转推 CDN 功能将音视频画面推送到第三方 CDN 上时，观众可通过 CDN 直播实时拉流观看。

转推 CDN（Content Delivery Network，内容分发网络）指的是将音视频流从 ZEGO 实时音视频云推送到 CDN 的过程。开发者基于该功能可打通 RTC 产品和 CDN 直播产品，方便用户从网页或第三方播放器直接观看和收听直播内容。

<Warning title="注意">


在发起转推或直推 CDN 时，请将视频编码格式设置为 H.264。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/relay_cdn.png" /></Frame>



为防止攻击者盗取或伪造您的推流 URL 地址，您可以参考 [CDN 推流鉴权](https://doc-zh.zego.im/article/15821)，提升您推流使用的安全性。



## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/AdvancedStreaming/StreamByCDN” 目录下的文件。

## 前提条件

在使用 CDN 直播之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

<Warning title="注意">


CDN 直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/activate-cdn-service) 中的“CDN”），或联系 ZEGO 技术支持开通。

</Warning>



## 旁路转推 CDN

### 开始推流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638#publishingStream) 的 “推流”，将音视频流推送到 ZEGO 实时音视频云上。

### 开始转推

当推流成功后，调用 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#add-publish-cdn-url) 接口，增加动态转推至 CDN 的 URL，即可向 CDN 进行音视频流的推送。

```javascript
// 推流成功后，开始转推到 CDN

// 推流时使用的流 ID
String streamID = "STREAM_ID"; // 需要转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名，可自定义
String URL = "rtmp://推流域名/接入点/streamID";
const result = await zg.addPublishCdnUrl(streamID, targetURL);
console.warn(result);
```

### 停止转推

调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url) 接口，即可删除动态转推至 CDN 的 URL。**调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url) 接口停止转推时，请确保当前流 streamID 是存在的。**

<Note title="说明">


- 若开发者有转推到多家 CDN 厂商的需求，可使用同一个流 ID 多次调用转推 API（URL 需要不同）。
- 若开发者转推到多家 CDN 后，停止转推时也同样需要调用多次来停止所有转推的流。
- 若开发者转推到多家 CDN 后，可从 CDN 回调状态通知的列表参数中获取到每条转推流的状态变更通知。

</Note>



```javascript
// 推流时使用的流 ID
const streamID = "STREAM_ID";
// 需要停止转推的 CDN 地址，请开发者按照实际URL填入，streamID 为推流的流名
const URL = "rtmp://推流域名/接入点/streamID";
const result = await zg.removePublishCdnUrl(streamID, targetURL);
console.warn(result);
```

### 获取流地址

注册 [roomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调，已登录房间内流的新增、删除都会触发该回调，通过 “streamList” 返回流对应的播放地址。

```javascript
zg.on('roomStreamUpdate', (roomID, updateType, streamList) => {
   console.log('roomStreamUpdate roomID ', roomID, streamList);
});
```

### 开始拉流

开发者可通过以下任意一种方式进行拉流。

#### 方式 1：集成播放器插件拉流

ZEGO 自研 Web 端播放器插件，支持拉取 H.265 和 H.264 格式的 CDN 直播流，快速集成到 Web 应用中，为开发者提供稳定、流畅的 CDN 直播播放能力，详情请参考 [播放器简介](https://doc-zh.zego.im/article/18429)。

<Warning title="注意">


目前该播放器插件仅支持播放 FLV 协议。

</Warning>



1. **请参考 [播放器插件 - 接入指引](https://doc-zh.zego.im/article/18433)，集成播放器插件，并完成实例化播放器插件等操作。**
2. 设置 URL 地址，调用播放器插件的 [ZegoExpressPlayer > play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#play) 接口，拉取 CDN 直播流进行播放。

    ```js
    player.src = "http://xxxx/livestream/stream.flv"; // 目前只支持 http-flv 格式的资源
    playButton.onclick = () => {
        player.play();
    };
    ```

#### 方式 2：基于浏览器 video 标签拉流

<Note title="说明">


- 目前 Web 平台播放 rtmp 地址需要依赖于 flash 插件，如果浏览器不支持 flash 插件，则该浏览器就不能播放 rtmp 地址的流。
- Safari 浏览器限制不能播放 flv 的流，只能播放 m3u8 或 rtmp 地址的流。
- CDN 相关地址默认为 HTTP 格式，若您出于安全考虑，或者想使用 Web 端进行 CDN 观众拉流，则需要配置 HTTPS，详情请参考：[控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)。

</Note>




- 在 Safari 浏览器上，设置 “video” 标签的 “src” 属性值，通过 hls 播放地址拉流。

    ```javascript
    videoElement.src = 'https://XXX.m3u8';
    ```

- 在其他浏览器上（Safari 除外），使用 “video” 标签，通过 flv 播放地址拉流。

    ```javascript
    if (flvjs.isSupported()) {
        //若支持flv.js
        flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: flvUrl,
            hasAudio: true,//是否需要音频
            hasVideo: true,//是否需要视频
       });
       flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
           console.error('LOADING_COMPLETE');
           flvPlayer.play();
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      videoElement.muted = false;
      videoElement.controls = true;
  }
  ```

## 默认转推 CDN

### 开始推流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638#publishingStream) 的 “推流”，将音视频流推送到 ZEGO 实时音视频云上。

此时用户使用 ZEGO Express SDK 推流到 ZEGO 音视频云的直播流均会转推到 CDN，目前仅支持 ZEGO 自有 CDN。

### 开始拉流

自 Express Web SDK 3.3.0 版本起，可通过使用 ZEGO 自研 Web 端 [播放器插件（1.3.0 及以上版本）](https://doc-zh.zego.im/article/18431) 播放 CDN 直播流。该播放器插件支持拉取 H.265 和 H.264 格式的 CDN 直播流，可快速集成到 Web 应用中，为开发者提供稳定、流畅的 CDN 直播播放能力，详情请参考 [播放器简介](https://doc-zh.zego.im/article/18429)。

<Warning title="注意">


目前该播放器插件仅支持播放 FLV 协议。

</Warning>



1. **请参考 [播放器插件 - 接入指引](https://doc-zh.zego.im/article/18433)，集成播放器插件，并完成实例化播放器插件等操作。**

2. 监听 SDK 的 [roomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调，当回调通知有流新增时，获取其他用户的 streamID，来拉取播放其他刚刚推送的流。

3. 在 [roomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口，传入 “streamID” 拉取播放该用户的音视频，并将 [resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#resource-mode) 参数设置为数字 “1”，表示仅从 CDN 拉流。

4. 在 [CDNPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#resource-mode) 传入生成的播放器实例，否则将无法正常拉到 CDN 流。

5. 监听 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 回调，接收是否成功拉取音视频的相关通知。

```html
<body>
    ...
    <div id="player-container" zg-width="640" zg-height="360"></div>
    ...
    <!-- 目前播放器插件只支持 script 标签引入 -->
    <script src="./zego-express-player/ZegoExpressPlayer-1.3.0.js"></script>
</body>
```

```javascript
...

zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增
        for (var i = 0; i < streamList.length; i++) {
            console.log('房间',roomID,'内新增了流：', streamList[i]['streamID'])
            const playOption = {
                resourceMode: 1, // CDN
                CDNPlayer: new ZegoExpressPlayer(zg, {
                    container: document.getElementById("player-container"),
                    mode: "live"
                });
            };
            // streamList 中有对应流的 streamID
            zg.startPlayingStream(streamID, playOption);
        }
        const message = "其他用户的视频流streamID: " + streamID.toString();
    } else if (updateType == 'DELETE') {
        // 流删除
        for (var i = 0; i < streamList.length; i++) {
            console.log('房间',roomID,'内减少了流：', streamList[i]['streamID'])
            // streamList 中有对应流的 streamID
            zg.stopPlayingStream(streamID);
          }
       }
});

zg.startPlayingStream(streamID, playOption);
```

## 相关文档

[将流转推到 CDN 过程中，连接断开后如何处理？](https://doc-zh.zego.im/faq/web_disconnection)
