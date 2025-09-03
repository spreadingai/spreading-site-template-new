# 点歌
---
  
## 功能简介

ZEGO 版权内容中心，提供了在线 K 歌场景所需歌曲内容。内容由音乐合作的版权方提供，如需进一步了解版权内容中心，请联系 ZEGO 商务人员咨询。

本文将介绍如何快速实现在线 KTV 场景下搜索、下载和播放正版曲库歌曲的流程。

#### 相关概念

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 点歌：通过 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口获取一首歌曲或伴奏的播放权限。
- 歌曲相关接口扩展说明：用户在使用 ZEGO Express SDK 的版权音乐功能时，所需遵循的调用接口与返回值的相关扩展说明。相关扩展说明为 [发送扩展请求接口说明](/online-ktv-flutter/client-api/send-extended-request) 以及 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。
- 分享资源：用户在点歌/点伴奏成功后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 获取被分享的音乐资源。

## 前提条件

在实现基本的版权音乐功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK（含版权音乐功能），详情请参考 [SDK 集成](/online-ktv-flutter/quick-starts/integrate-the-sdk/express-video)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

<Note title="说明">

SDK 支持 Token 鉴权。若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=flutter)。
</Note>

## 实现流程

用户实现点歌并播放的基本流程如下图：

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Copyrighted_music_process_2_windows.png" /></Frame>

1. 调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 初始化 ZEGO Express SDK，调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 登录房间。
2. 调用 [createCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCopyrightedMusic/createCopyrightedMusic.html) 创建版权音乐对象，调用 [initCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/initCopyrightedMusic.html) 接口，初始化版权音乐对象。
3. 调用 [sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html) 接口，传入相应参数获取 songID（songID 是一首歌曲的唯一标识）。例如传入 `"/top/song"` 可获取到当前热门的歌曲列表。
4. 调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 点歌，获取歌曲的资源信息。歌曲的资源信息包括歌曲名、歌曲时长、resourceID 等。
5. 调用 [download](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html) 接口传入 resourceID，将歌曲下载到设备中（歌曲必须先下载完成才能播放）。
6. 调用 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMediaPlayer/createMediaPlayer.html) 初始化播放器，调用播放器等。[loadCopyrightedMusicResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadCopyrightedMusicResourceWithPosition.html) 加载歌曲资源，加载成功后调用 [start](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/start.html) 开始播放。
7. 向远端用户推送唱歌音频流。

### 初始化 SDK

**步骤 1**：调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 初始化 SDK。

<Note title="说明">

初始化 ZEGO Express SDK 时，内部处理的操作较多，建议用户在 App 启动时候进行。详情参考：[实时语音 - 快速开始 - 实现流程](!ExpressAudioSDK-Integration/Solution_Implementation)。
</Note>

**步骤 2**（**可选**）：调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 登录房间。

<Warning title="注意">

1. 对于使用 **AppSign** 鉴权的开发者而言，此步骤为 **可选** 步骤；对于使用 **Token** 鉴权的开发者，此步骤为 **必需** 步骤。
2. 如果开发者需要在初始化版权音乐功能前登录房间，请确保 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 与 [initCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/initCopyrightedMusic.html) 接口中传入的 userID、userName 是一致且唯一的。
3. 对于使用 Token 鉴权的开发者，必须保证在初始化版权音乐功能前登录房间。
</Warning>

**步骤 3**：调用 [createCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCopyrightedMusic/createCopyrightedMusic.html) 创建版权音乐对象。

**步骤 4**：调用 [initCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/initCopyrightedMusic.html) 初始化版权音乐音乐对象。

```dart
/** 定义 CopyrightedMusic 对象 */
ZegoCopyrightedMusic? copyrightedMusic;
```
```dart
/** 请通过官网注册获取，格式为 123456789L */
int appID = appID;
/** 64个字符，请通过官网注册获取，格式为 "0123456789012345678901234567890123456789012345678901234567890123" */
/** 如果使用 token 鉴权，不需要配置此参数*/
String appSign = appSign;
/** 卡拉 OK 场景接入 */
ZegoScenario scenario = ZegoScenario.Karaoke;

/** 1. 定义 SDK 引擎对象 */
var profile = ZegoEngineProfile(appID, scenario, appSign: appSign);

/** 创建引擎 */
ZegoExpressEngine.createEngineWithProfile(profile);

/** 2. 登录房间*/
// 此步骤对于使用 **appSign** 鉴权的开发者而言，此步骤为 **可选** 步骤；对于使用 **token** 鉴权的开发者，此步骤为 **必需** 步骤。
// ZegoUser 的构造方法 public ZegoUser(String userID) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null” 否则会导致登录房间失败。
var user = ZegoUser.id("userID");

var roomConfig = ZegoRoomConfig.defaultConfig();
//token 由用户自己的服务端生成，为了更快跑通流程，可以通过 ZEGO 控制台 https://console.zego.im/ 获取临时的音视频 token
roomConfig.token = ""; // 如果使用appSign 鉴权，登录房间不需要此参数
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;

// roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话
String roomID = "room1";

// 登录房间
ZegoExpressEngine.instance.loginRoom(roomID, user, config: roomConfig).then((ZegoRoomLoginResult result){
    // 登录房间结果，如果仅关注登录结果，关注此回调即可
    if (result.errorCode == 0) {
        // 登录成功
    } else {
        // 登录失败，请参考 errorCode 说明 /real-time-video-android-java/client-sdk/error-code
    }
});

/** 3. 创建 CopyrightedMusic 对象 */
copyrightedMusic = await ZegoExpressEngine.instance.createCopyrightedMusic();

/** 填写 userID、userName */
/** 如果已经在初始化版权音乐功能前登录房间，请确保 [initCopyrightedMusic] 接口所需传入的 userID、userName 与 [loginRoom] 所传相关内容保持一致且唯一。*/
String userID = "";
String userName = "";
var user = ZegoUser(userID, userName);

/** 4. 初始化 CopyrightedMusic 对象 */
var config = ZegoCopyrightedMusicConfig(user);

copyrightedMusic?.initCopyrightedMusic(config).then((ZegoCopyrightedMusicInitResult result) {
    // 通过result.errorCode判断是否初始化成功
});
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

1. 调用 [sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html) 接口，command 传入 `"/tag/list"`，params 传入 `"{vendor_id：xx}"`，即版权方 ID（具体信息请联系 ZEGO 技术支持），在回调中获取到标签列表。

    <Note title="说明">

    [sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html) 接口完整参数与返回结果的说明请参考 [发送扩展请求接口说明](/online-ktv-flutter/client-api/send-extended-request)。
    </Note>

2. 选择某个标签，调用 [sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html) 接口，command 传入 `"/tag/song"`，params 传入下列 JSON 格式的字符串，即可在回调中获取到歌曲列表。

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
        ```dart
        // 下面以通过标签获取歌曲列表为例
        String command = "/tag/song"; // command 参数代表您请求的业务指令，该示例为标签获取歌曲
        String params = "{ \"vendor_id\": 0, \"tag_id\": \"587\",  \"page\": 1,  \"filter\": [1]}"; // params 参数，是 JSON 格式的字符串，需要您传入的额外参数

        copyrightedMusic?.sendExtendedRequest(command, params).then((ZegoCopyrightedMusicSendExtendedRequestResult result) {
            // result.command: 参数代表您请求的业务指令
            // result.result: 回调结果，JSON 格式字符串
        });
        ```

#### 版权信息

在获得的歌曲列表中，每首歌曲都有对应的 copyright 字段，表示这个歌曲的版权信息。

copyright 的结构如下：

```dart
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
<td><ul><li>若 song_lyric 为 1，表示有词曲伴奏版权，通过 <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html" target="_blank">requestResource</a> 获取到伴奏资源，可在获取歌单歌曲、搜索歌曲、获取榜单歌曲时配置 filter 参数，过滤无法点唱的词曲伴奏。</li><li>若 song_lyric 为 0，表示无词曲伴奏版权。</li></ul></td>
</tr>
<tr>
<td>recording</td>
<td><ul><li>若 recording 为 1，表示有歌曲录音版权，通过 <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html" target="_blank">requestResource</a> 获取到歌曲资源后，可以播放收听歌曲。</li><li>若 recording 为 0，表示无歌曲版权，无法收听和点唱歌曲。</li></ul></td>
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
- ZEGO 目前仅支持按点歌次数计费，即每调用一次 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口，都会计一次费。不同版权方的计费方式不同：
    - 版权方 1：用户包月计费、房间包月计费
    - 版权方 2：按次计费
    - 版权方 3：按次计费
- **版权方的详细信息（歌曲资源、资源有效时长、计费方式等），请联系 ZEGO 商务咨询。**
</Warning>	

#### 获取包含人声的歌曲资源

如果包含人声的歌曲资源有版权，就可以调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口获取到歌曲的资源信息，包括歌曲名、歌曲时长、resourceID 等，接口具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。

<table>
  
<tbody><tr>
<th>字段</th>
<th>功能</th>
<th>该字段在回调结果中的获取方式</th>
</tr>
<tr>
<td>resource_id</td>
<td>一个 songID 对应的歌曲可能对应有多个不同的音质资源（如标清、高清、无损），因此需要定义 resource_id 来唯一对应每一个资源。可用于下载歌曲（调用 <a target="_blank" href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html">download</a> 接口）。</td>
<td>result.resources[0].resource_id</td>
</tr>
</tbody></table>

```dart
// recording 为 1 代表该首歌有包含人声的歌曲的版权
if (recording == 1) {
   /** 音乐 songID */
   String songID = "";

   /** 计费模式，请联系 ZEGO 商务咨询 */
   var mode = ZegoCopyrightedMusicBillingMode.Count;

   /** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
   var vendorID = ZegoCopyrightedMusicVendorID.ZegoCopyrightedMusicVendorDefault;

   /** 场景 ID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
   /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
   var sceneID = 0;

   /** 点歌配置 */
   var config = new ZegoCopyrightedMusicRequestConfig(songID, mode, vendorID: vendorID, sceneID: sceneID);

   /** 
     * 资源类型包含：
     * ZegoCopyrightedMusicResourceSong：包含人声的原曲
     * ZegoCopyrightedMusicResourceAccompaniment：伴奏
     * ZegoCopyrightedMusicResourceAccompanimentClip：伴奏高潮片段
     */
   var resourceType = ZegoCopyrightedMusicResourceType.ZegoCopyrightedMusicResourceSong;

   /** 点歌 */
   copyrightedMusic?.requestResource(config, resourceType).then((ZegoCopyrightedMusicRequestResourceResult result) {
       // result.resource: 点歌服务返回的 JSON 字符串，包括歌曲资源信息
    });
    } else {
       // 该首歌没有包含人声的歌曲的版权
    }
```

#### 获取歌曲伴奏/伴奏高潮片段资源

通过调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口，还可以获取歌曲对应的 “**伴奏资源**”、“**长分片高潮片段资源**”、“**短分片高潮片段资源**”，其实现流程与 [获取包含人声的歌曲资源](#获取包含人声的歌曲资源) 一致。


获取歌曲对应伴奏、长/短分片高潮片段、抢唱片段的资源时，回调会多出了一些字段，比如 krc_token 等，详情请参考 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。

### 下载歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [download](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html) 接口下载资源时，如果返回了 `1017019` 错误码，表示资源已失效，请重新调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口获取资源。
</Warning>

通过 [获取歌曲资源](#获取歌曲资源) 中点歌获取 resourceID 后，调用 [download](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html) 接口下载歌曲，下载成功的结果通过 download 接口本身的回调获取。

如果需要获取下载进度，可通过 [onDownloadProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onDownloadProgressUpdate.html) 回调获取。

resourceID 是开发者在调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html)、[getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 2 个接口时生成的，只在 SDK 的生命周期里有效，SDK 反初始化时就会销毁，因此不能储存到磁盘或者分发给其他用户使用。


```dart
/** resourceID */
String resourceID = "";

copyrightedMusic?.download(resourceID).then((ZegoCopyrightedMusicDownloadResult result) {
    if (result.errorCode == 0) {
        // 歌曲下载成功，可以进行播放等操作
        
    } else {
        // 歌曲下载失败
    }
});
```


### 播放歌曲

#### 开始播放

歌曲下载完成后（收到 [download](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html) 接口的成功回调），使用 [ZegoMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer-class.html) 并调用 [start](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/start.html) 接口开始播放歌曲。

```dart
/** 音乐资源 ID，点歌（requestResource）时可获取到 */
String resourceID = "";

// play 开始播放时的进度
int startPosition = 0;

// 1. 通过 ZegoExpressEngine 的 createMediaPlayer 方法 创建 ZegoMediaPlayer
ZegoMediaPlayer? mediaPlayer = await ZegoExpressEngine.instance.createMediaPlayer();

// 2. 加载歌曲对应的 resourceID，从 startPosition 处开始加载。注意，只有该歌曲资源下载完成了，这里才能加载成功
mediaPlayer?.loadCopyrightedMusicResourceWithPosition(resourceID, startPosition).then((ZegoMediaPlayerLoadResourceResult result) {
    // result.errorCode: Error code, please refer to the error codes document /real-time-video-android-java/client-sdk/error-code
});

// start 开始播放
mediaPlayer?.start();
```

#### 暂停/恢复/跳转/停止

调用 [download](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/download.html) 接口下载完资源后，可以调用 [pause](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/pause.html)、[resume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/resume.html)、[seekTo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/seekTo.html)、[stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/stop.html) 等接口控制播放状态。    

```dart
// pause 暂停播放
mediaPlayer?.pause();

// resume 恢复播放
mediaPlayer?.resume();

// seekTo 调整播放进度到 position 位置，position 为毫秒数
int position = 0;
mediaPlayer?.seekTo(position).then((ZegoMediaPlayerSeekToResult result) {
});

// stop 停止播放
mediaPlayer?.stop();
```

### 将当前播放的歌曲音频流推送到远端

用户可以调用 [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html) 接口，将播放歌曲的音频流推送到远端。
这样在房间内其他用户，只要通过拉流 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 就可以听到歌曲的声音，不需要再去做点歌、下载、播放的一系列操作。

实现流程：

1. 实现基本的音频通话功能，将音频流推送到远端，可参考 [实时语音 - 快速开始 - 实现流程 ](/real-time-voice-flutter/quick-start/implementing-voice-call#使用步骤)。

2. 将播放的声音混入到当前推送的音视频流中，其他用户通过拉流进行收听。

```dart
var user = ZegoUser("user1", "user1");
var roomConfig = ZegoRoomConfig.defaultConfig();
roomConfig.isUserStatusNotify = true;
// 登录房间，user 信息需要与初始化版权音乐对象时传入的一致
ZegoExpressEngine.instance.loginRoom(roomID, user, config: roomConfig);

// 将音视频流推送到远端
ZegoExpressEngine.instance.startPublishingStream("stream1");
```
```dart
/** 开启混音推流 */
bool enable = true;
mediaPlayer?.enableAux(enable);

/** 调整推流的音量 */
int changeVolume = 100;
mediaPlayer?.setPublishVolume(changeVolume);

/** 获取当前推流的音量 */
var publishVolume = mediaPlayer?.getPublishVolume();
```


## API 调用时序


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Choose_song_Flutter_2.png" /></Frame>
