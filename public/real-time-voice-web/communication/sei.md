# 媒体补充增强信息（SEI）

- - -

## 功能简介

在音视频流媒体应用中，除了可以流媒体通道推拉音视频内容外，还可以使用流 SEI（Supplemental Enhancement Information，媒体补充增强信息）通过流媒体通道将文本信息与音视频内容打包在一起，从主播端（推流端）推出，并从观众端（拉流端）接收，以此实现文本数据与音视频内容的精准同步的目的。

一般可用于远端歌词同步、直播答题等应用场景。

<Note title="说明">


SEI 的相关概念及原理请参考 [如何理解和使用 SEI（媒体补充增强信息）](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=web)。

</Note>




## 前提条件

在实现 SEI 功能之前，请确保：
- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6839) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9540)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。


## 使用步骤

发送与接收 SEI 信息功能需要推流和拉流端配对使用才能展示效果，即需要在推流端发送 SEI 信息，拉流端接收 SEI 信息。以下内容将介绍各端如何使用发送与接收 SEI 信息功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/send_and_recv_sei_Web.png" /></Frame>

主播推流发送 SEI 消息调用流程如下：

1. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间。
2. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口推流。
3. 在推流成功后，调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei) 接口发送 SEI 信息。

观众拉流接收 SEI 消息调用流程如下：

1. 调用 [on](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#on) 监听 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 回调。
2. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间。
3. 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口拉流。
4. 在拉流成功后，接收到推流端发送的 SEI 信息之后触发 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 回调。

<Warning title="注意">


- SEI 功能目前仅支持 Chrome 86 及以上版本的浏览器。
- 通过 CDN 播放流时，需要使用第三方播放器如 flv.js，但第三方播放器默认不支持解析 SEI。

</Warning>



### （可选）设置 SEI 额外信息

<Accordion title="设置 SEI 额外信息" defaultOpen="false">
- 由于 SDK 默认使用 ZEGO 自行定义的 SEI（nalu type = 6,payload type = 243）类型打包，且此类型是 SEI 标准未规定的类型，因此跟视频编码器或者视频文件中的 SEI 不存在冲突。
- 但当开发者需要使用第三方解码器解码时（如 FFmpeg），会导致无法解出正确的 SEI，此时需要在推流 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 时指定发送的 SEI 类型为 UserUnregister 的 SEI（nalu type = 6, payload type = 5），且在推流前和拉流前调用 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config) 接口设置 uuid(UserUnregisterID)来区分是视频编码器自身产生的 SEI 还是业务 SEI。

- App 在发送此类型 SEI 时，可以填写业务特定的 uuid（长度为16字节）。接收方使用 SDK 解析 payload type 为 5 的 SEI 时，会根据设置的过滤字符串过滤出 uuid 相符的 SEI 抛给业务，如果没有设置过滤字符串，SDK 会把所有收到的 SEI 都抛给开发者。

<Note title="说明">


仅当开发者使用第三方解码器解码 SEI 时需要执行该步骤。

</Note>




```javascript
let appID = ;
let server = "";

// 初始化
const zg = new ZegoExpressEngine(appID, server);

zg.setSEIConfig({
    // 自定义的特定的字符串，以过滤出业务 SEI
    unregisterSEIFilter: "zegozegozegozego"
});
```
</Accordion>


### 推流方

发送 SEI 信息的接口需要在推流成功之后调用。

```javascript
let appID = ;
let server = "";

// 初始化
const zg = new ZegoExpressEngine(appID, server);

// 用户 ID，自定义
let userID = "user_" + new Date().getTime();
// roomID，自定义
let roomID = "0001";
// 鉴权 token
let token = "";
// 推流 ID
let publishStreamID = "00001";

// 登录房间
zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(result => {
     if (result == true) {
        console.log("login success")
     }
});

// 创建本地流预览
const localStream = await zg. createZegoStream({camera:{audio:true, video:false}});

zg.on("publisherStateUpdate", async result => {
    if (result.state === "PUBLISHING") {
        // 发送的 SEI 内容，示例如下：
        // 时间戳
        const ts = Math.ceil(new Date().getTime() / 1000);
        // 转换为 bytes
        const u = new Uint8Array(4);
        u[0] = (ts >> 24) & 0xff;
        u[1] = (ts >> 16) & 0xff;
        u[2] = (ts >> 8) & 0xff;
        u[3] = ts & 0xff;

        // 推流成功后，发送 SEI
        zg.sendSEI(streamID, u);
    }

});

// 推流
zg.startPublishingStream(publishStreamID, localStream, {
  roomID,
  isSEIStart: true, // 开启发送 SEI
  SEIType: 0 // 默认为0，代表 payload type = 243
});
```

### 拉流方

接收 SEI 信息的回调接口需要在拉流成功之后触发。

```javascript
let appID = ;
let server = "";

// 初始化
const zg = new ZegoExpressEngine(appID, server);

// 用户 ID，自定义
let userID = "user_" + new Date().getTime();
// roomID，自定义
let roomID = "0001";
// 鉴权 token
let token = "";
// 拉流 ID，一般通过 roomStreamUpdate 回调获取
let playStreamID = "00001";

// 监听 SEI 回调
zg.on("playerRecvSEI", (streamID, uintArray) => {
    let offset = 0;
    // 接收到的 SEI 内容的前 4 bytes 代表发送的 SEI 类型， 将其转换为 number，
    // 1004 代表 payload type = 5， 1005 代表 payload type = 243
    let mediaSideInfoType = 0;
    mediaSideInfoType = uintArray[offset++] << 24;
    mediaSideInfoType |= uintArray[offset++] << 16;
    mediaSideInfoType |= uintArray[offset++] << 8;
    mediaSideInfoType |= uintArray[offset++];

    // 根据发送的 SEI， 解出 SEI 的内容，示例如下：
    const view = new DataView(uintArray.buffer);
    let i = 4;
    let ts = 0;
    ts = view.getUint8(i++) << 24;
    ts |= view.getUint8(i++) << 16;
    ts |= view.getUint8(i++) << 8;
    ts |= view.getUint8(i++);

    console.log("recv " + streamID + " " + mediaSideInfoType + " " + ts);
}

// 登录房间
zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(result => {
     if (result == true) {
        console.log("login success")
     }
});

// 拉流
zg.startPlayingStream(playStreamID, {
    isSEIStart: true // 开启解析 SEI
}).then(stream => {

}).catch(err => {

});
```

## 相关文档

[如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=web)
