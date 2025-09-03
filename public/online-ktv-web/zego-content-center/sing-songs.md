# 点歌

---
  
## 功能简介

ZEGO 版权内容中心，提供了在线 K 歌场景所需歌曲内容。内容由音乐合作的版权方提供，如需进一步了解版权内容中心，请联系 ZEGO 商务人员咨询。

本文将介绍如何快速实现在线 KTV 场景下搜索、下载和播放版权音乐歌曲的流程。

#### 相关概念

- ZEGO Express Web SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 点歌：通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 等接口获取一首歌曲或伴奏的播放权限。
- 歌曲相关接口扩展说明：用户在使用 ZEGO Express SDK 的版权音乐功能时，所需遵循的调用接口与返回值的相关扩展说明。相关扩展说明为 [发送扩展请求接口说明](/online-ktv-web/client-api/send-extended-request) 以及 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。
- 分享资源：用户在点歌/点伴奏成功后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 获取被分享的音乐资源。

## 前提条件

在实现基本的版权音乐功能之前，请确保：

- 已在项目中集成 ZEGO Express Web SDK（含版权音乐功能），详情请参考 [SDK 集成指引](/real-time-video-web/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

## 实现流程

用户实现点歌并播放的基本流程如下图：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Copyrighted_music_process_2_mobile.png" />
</Frame>

1. 引入 [ZegoCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic) 模块，创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 实例来初始化 ZEGO Express Web SDK，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 登录房间。
2. 调用 [createCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-copyrighted-music) 创建版权音乐对象，调用 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#init-copyrighted-music) 接口，初始化版权音乐对象。
3. 调用 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#send-extended-request) 接口，传入相应参数获取 songID（songID 是一首歌曲的唯一标识）。例如传入 `"/top/song"` 可获取到当前热门的歌曲列表。
4. 调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 点歌，获取歌曲的资源信息。歌曲的资源信息包括歌曲名、歌曲时长、resourceID 等。
5. 调用 [download](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#download) 接口传入 resourceID，将歌曲下载到设备中（歌曲必须先下载完成才能播放）。
6. 使用 H5 \<audio> 标签加载歌曲资源，加载成功后调用 audio.play() 开始播放。
7. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 将当前播放的歌曲音频流推送到远端，参考 [实时语音 - 快速开始 - 实现流程](/real-time-voice-web/quick-start/implementing-voice-call)。

### 初始化 SDK

**步骤 1：** 创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 实例。

<Note title="说明">

详情参考：[实时语音 - 快速开始 - 实现流程](/real-time-voice-web/quick-start/implementing-voice-call)。
</Note>

**步骤 2**：调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 登录房间。

<Warning title="注意">

- 如果开发者需要在初始化版权音乐功能前登录房间，请确保 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 与 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#init-copyrighted-music) 接口中传入的 userID、userName 是一致且唯一的。
- 必须在初始化版权音乐功能前登录房间。
</Warning>

**步骤 3**：调用 [createCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-copyrighted-music) 创建版权音乐对象。

**步骤 4**：调用 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#init-copyrighted-music) 初始化版权音乐音乐对象。

```js
// npm 的引入 ZegoExpressEngine 和版权音乐模块
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { CopyrightedMusic } from 'zego-express-engine-webrtc/copyrighted-music';

// 如果需要使用歌曲音质增强功能，需要再引入 VoiceChanger 模块
import {VoiceChanger} from "zego-express-engine-webrtc/voice-changer";	

ZegoExpressEngine.use(CopyrightedMusic);

/** 1. 创建引擎实例 */
const zg = new ZegoExpressEngine(appID, server);

/** 2. 登录房间*/
// token 由用户自己的服务端生成，为了更快跑通流程，可以通过 ZEGO 控制台 https://console.zego.im/ 获取临时的音视频 token。
const token = "xxx";

// roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话。
const roomID = "room1";

const userID = "user1";

// 登录房间
await zg.loginRoom(roomID, token, { userID }, { userUpdate: true });

/** 3. 创建 CopyrightedMusic 对象 */
const copyrightedMusicInst = zg.createCopyrightedMusic();

/** 4. 初始化版权音乐对象 */
// 此处的 userID 和 userName 必须与登录房间时传入的保持一致。
const CopyrightedMusicConfig = { user: { userID: "123", userName: "123" } };
// 通过监听初始化版权音乐回调了解初始化是否成功。
const errorCode = await copyrightedMusicInst.initCopyrightedMusic(
    CopyrightedMusicConfig
);

if (errorCode == 0) {
    // 初始化版权音乐成功
} else {
   // 初始化版权音乐失败
}
```

### 获取歌曲列表

#### 获取方式

用户可用以下三种方式获取歌曲列表：

<table>
  
<tbody><tr>
<th>方法</th>
<th>具体说明</th>
</tr>
<tr>
<td>第 1 种：先获取标签列表，然后通过标签获取歌曲列表&nbsp;&nbsp;</td>
<td><ol><li>获取标签列表（/tag/list）；</li><li>选择一个标签获取歌曲列表（/tag/song）。</li></ol></td>
</tr>
<tr>
<td>
第 2 种：通过搜索获取
</td>
<td>
通过用户传入关键字搜索歌曲（/search/song）。
</td>
</tr>
<tr>
<td>第 3 种：通过榜单获取</td>
<td>
获取榜单列表（/top/song）。
</td>
</tr>
</tbody></table>

#### 调用流程

如下介绍如何使用第 1 种方式获取歌曲列表：

1. 调用 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#send-extended-request) 接口，command 传入 `"/tag/list"`，params 传入 `"{vendor_id：xx}"`，即版权方 ID（具体信息请联系 ZEGO 技术支持），在回调中获取到标签列表。

    <Note title="说明">

    [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#send-extended-request) 接口完整参数与返回结果的说明请参考 [发送扩展请求接口说明](/online-ktv-web/client-api/send-extended-request)。
    </Note>

2. 选择某个标签，调用 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#send-extended-request) 接口，command 传入 `"/tag/song"`，params 传入下列 JSON 格式的字符串，即可在回调中获取到歌曲列表。

    - JSON 格式如下：
        ```json
        {
            "tag_id": "587", // 从步骤 1 的标签列表回调中选择
            "page": 1,
            "filter": [1],
            "vendor_id": 0
        }
        ```

    - 示例代码：
        ```js
        // 下面以通过标签获取歌曲列表为例
        const command = "/tag/song"; // command 参数代表您请求的业务指令，该示例为标签获取歌曲
        const params = { \"vendor_id\": 0, tag_id: "587", page: 1, filter: [1] }; // params 参数，是 JSON 格式的字符串，需要您传入的额外参数
        copyrightedMusicInst
            .sendExtendedRequest(command, params)
            .then(function({ errorCode, command, result }) {
                console.log(errorCode); // SDK 错误码
                console.log(command); // 参数代表您请求的业务指令
                console.log(result); // 回调结果，JSON 格式字符串
        });
        ```

#### 版权信息

在获得的歌曲列表中，每首歌曲都有对应的 copyright 字段，表示这个歌曲的版权信息。

copyright 的结构如下：

```json
//该字段位于 result.data.songs[i].copyright 
{
    "song_lyric": 0,
    "recording": 1,
    "channel": 0
}
```

具体字段说明如下：

<table>
  
<tbody><tr>
<th>字段</th>
<th>说明</th>
</tr>
<tr>
<td>song_lyric</td>
<td><ul><li>若 song_lyric 为 1，表示有词曲伴奏版权，通过 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource" target="_blank">requestResource</a> 获取到伴奏资源，可在获取歌单歌曲、搜索歌曲、获取榜单歌曲时配置 filter 参数，过滤无法点唱的词曲伴奏。</li><li>若 song_lyric 为 0，表示无词曲伴奏版权。</li></ul></td>
</tr>
<tr>
<td>recording</td>
<td><ul><li>若 recording 为 1，表示有歌曲录音版权，通过 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource" target="_blank">requestResource</a> 获取到歌曲资源后，可以播放收听歌曲。</li><li>若 recording 为 0，表示无歌曲版权，无法收听和点唱歌曲。</li></ul></td>
</tr>
<tr>
<td>channel</td>
<td>歌曲渠道。<ul><li>若 channel 为 其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<br /><Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></Frame></li></ul></td>
</tr>
</tbody></table>

<Warning title="注意">

- 当 recording 为 1，而 song_lyric 为 0 时，说明无词曲伴奏版权，歌曲只能收听不能点唱。
- 由于歌曲版权是动态变化的，在实时获取 songID 过程中，无版权的资源会被屏蔽掉。但如果用户在业务逻辑侧设置了歌单管理或其他逻辑缓存过 songID，则该场景下可能会出现该 songID 对应资源无版权的情况。
</Warning>

### 获取歌曲资源

<Warning title="注意">

- 不同版权方对应的歌曲资源不同、资源的有效时长也不同。
- ZEGO 目前仅支持按点歌次数计费，即每调用一次 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，都会计一次费。不同版权方的计费方式不同：
    - 版权方 1：用户包月计费、房间包月计费
    - 版权方 2：按次计费
    - 版权方 3：按次计费
- **版权方的详细信息（歌曲资源、资源有效时长、计费方式等），请联系 ZEGO 商务咨询。**
</Warning>

#### 获取包含人声的歌曲资源

如果包含人声的歌曲资源有版权，就可以调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口获取到歌曲的资源信息，包括歌曲名、歌曲时长、resourceID 等，接口具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。

<table>
  
<tbody><tr>
<th>字段</th>
<th>功能</th>
<th>该字段在回调结果中的获取方式</th>
</tr>
<tr>
<td>resource_id</td>
<td>一个 songID 对应的歌曲可能对应有多个不同的音质资源（如标清、高清、无损），因此需要定义 resource_id 来唯一对应每一个资源。可用于下载歌曲（调用 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#download">download</a> 接口）。</td>
<td>result.resources[0].resource_id</td>
</tr>
</tbody></table>

```js
// recording 为 1 代表该首歌有包含人声的歌曲的版权
if (recording == 1) {
    /**
     * 资源类型 type 包含：
     * 0：包含人声的原曲
     * 1：伴奏
     * 2：伴奏高潮片段
     */
    const requestConfig = {
        /** 音乐 songID，从歌曲列表中获取*/
        songID: songId,
        /** 版权方 vendorID，其对应的枚举值信息，请联系 ZEGO 商务咨询 */
        vendorID: 2,
        /** 计费模式，请联系 ZEGO 商务咨询。0 为按次数计费。 */
        mode: 0,
        /** 场景 ID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
        /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
        sceneID: 0
    };
  

    // 原声歌曲的枚举值为 0
    const typeSong = 0;
    /** 点歌 */
    copyrightedMusicInst.requestResource(requestConfig, typeSong).then(function(res) {
        if (res.errorCode === 0) {
            resourceID = res.resource.data.resources[0].resource_id;
        } else {
            // 报错处理
        }
    });
} else {
    // 该首歌没有包含人声的歌曲的版权
}
```

#### 获取歌曲伴奏/伴奏高潮片段资源

通过调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，还可以获取歌曲对应的 “**伴奏资源**”、“**长分片高潮片段资源**”、“**短分片高潮片段资源**”，其实现流程与 [获取包含人声的歌曲资源](#获取包含人声的歌曲资源) 一致。

获取歌曲对应伴奏、长/短分片高潮片段、抢唱片段的资源时，回调会多出了一些字段，比如 krc_token 等，详情请参考 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。

### 下载歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [download](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#download) 接口下载资源时，如果返回了 `1017019` 错误码，表示资源已失效，请重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口获取资源。
</Warning>

通过 [获取歌曲资源](#获取歌曲资源) 中点歌获取 resourceID 后，调用 [download](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#download) 接口下载歌曲，下载成功的结果通过 download 接口本身的回调获取。

如果需要获取下载进度，可通过 [downloadProgressUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCopyrightedMusicEvent) 回调获取。

resourceID 是开发者在调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource)、[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 时生成的，只在 SDK 的生命周期里有效，SDK 反初始化时就会销毁，因此不能储存到磁盘或者分发给其他用户使用。

```js
/** resourceID */
const resourceID = "xxx";
copyrightedMusicInst.download(resourceID).then(function(res) {
    if (res.errorCode == 0) {
        // 歌曲下载成功，可以进行播放等操作
        const { urls } = res;
        if (urls[0]) {
            // 使用歌曲链接播放
        }
    } else {
        // 歌曲下载失败
    }
});
```

### 播放歌曲

#### 开始播放

歌曲下载完成后，使用 `<audio>` 标签播放歌曲链接。

```html
<audio id="songPlayer" playsinline loop></audio>
<audio id="accompanyPlayer" playsinline loop></audio>
```

```js
const songPlayer = document.getElementById("songPlayer");
const accompanyPlayer = document.getElementById("accompanyPlayer");

if(urls.length > 1) {
    // 0 是伴奏, 1 是原曲
    songPlayer.src = urls[1];
    accompanyPlayer.src = urls[0];
    // 通过控制标签 muted 来切换音轨
    songPlayer.muted = true;
    accompanyPlayer.muted = false;
    // 同时开始播放两个音轨
    songPlayer.play();
    accompanyPlayer.play();
} else if(urls.length === 1) {
    // 原歌曲只有一个 url
    songPlayer.src = urls[0];
    songPlayer.play();
}
```

### 将当前播放的歌曲音频流推送到远端

用户可以调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，将播放歌曲的音频流推送到远端。
这样在房间内其他用户，只要通过拉流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 就可以听到歌曲的声音，不需要再去做点歌、下载、播放的一系列操作。

实现流程：

1. 实现基本的音频通话功能，将音频流推送到远端，可参考 [实时语音 - 快速开始 - 实现流程 ](/real-time-voice-web/quick-start/implementing-voice-call#使用步骤)。

2. 将播放的声音混入到当前推送的音视频流中，其他用户通过拉流进行收听。

```js
const songPlayer = document.getElementById("songPlayer");
const accompanyPlayer = document.getElementById("accompanyPlayer");

// stream 为通过 createZegoStream 创建的媒体流对象
const result = zg.startMixingAudio(stream, [
    songPlayer,
    accompanyPlayer,
]);

// 推流
zg.startPublishingStream("streamid", stream);
```

## API 调用时序

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Choose_song_web.png" /></Frame>
