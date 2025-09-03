export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const sendExtendedRequestnMap = {
  'default': <a href="@sendExtendedRequest" target='_blank'>sendExtendedRequest</a>,
}
export const ZegoCopyrightedMusicSendExtendedRequestCallbackMap = {
  'default': <a href="@ZegoCopyrightedMusicSendExtendedRequestCallback" target='_blank'>ZegoCopyrightedMusicSendExtendedRequestCallback</a>,
  'Android': <a href="@-IZegoCopyrightedMusicSendExtendedRequestCallback" target='_blank'>IZegoCopyrightedMusicSendExtendedRequestCallback</a>
}
export const getSharedResourceMap = {
  'default': <a href="@get-shared-resource-callback-type" target='_blank'>getSharedResource</a>,
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-shared-resource" target='_blank'>getSharedResource</a>,
  'Windows': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource-1" target='_blank'>getSharedResource</a>,
  'linux'  : <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource" target='_blank'>getSharedResource</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html" target='_blank'>getSharedResource</a>,
  'electron': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-music-by-token" target='_blank'>getSharedResource</a>,
  'unity': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-shared-resource" target='_blank'>getSharedResource</a>,
  'rn': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegocopyrightedmusic.html#getsharedresource" target='_blank'>getSharedResource</a>,
}
export const requestResourceMap = {
  'default': <a href="@requestResource" target='_blank'>requestResource</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html" target='_blank'>requestResource</a>,
  'rn': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocopyrightedmusic.html#requestresource" target='_blank'>requestResource</a>,
}
export const ZegoCopyrightedMusicRequestResourceCallbackMap = {
  'default': <a href="@ZegoCopyrightedMusicRequestResourceCallback" target='_blank'>ZegoCopyrightedMusicRequestResourceCallback</a>,
  'Android': <a href="@-IZegoCopyrightedMusicRequestResourceCallback" target='_blank'>IZegoCopyrightedMusicRequestResourceCallback</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicRequestResourceResult-class.html" target='_blank'>ZegoCopyrightedMusicRequestResourceResult</a>,
  'electron': '其',
  'unity': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-music-by-token-callback" target='_blank'>OnCopyrightedMusicRequestResourceCallback</a>,
  'rn':'其',
}
export const ZegoCopyrightedMusicGetSharedResourceCallbackMap = {
  'default': <a href="@ZegoCopyrightedMusicGetSharedResourceCallback" target='_blank'>ZegoCopyrightedMusicGetSharedResourceCallback</a>,
  'Android': <a href="@-IZegoCopyrightedMusicGetSharedResourceCallback" target='_blank'>IZegoCopyrightedMusicGetSharedResourceCallback</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetSharedResourceResult-class.html" target='_blank'>ZegoCopyrightedMusicGetSharedResourceResult</a>,
  'electron': '其',
  'unity': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-shared-resource-callback" target='_blank'>OnCopyrightedMusicGetSharedResourceCallback</a>,
  'rn':'其',
}
export const getLrcLyricMap = {
  'default': <a href="@getLrcLyric" target='_blank'>getLrcLyric</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getLrcLyric.html" target='_blank'>getLrcLyric</a>,
  'electron': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-lrc-lyric-with-vendor-id" target='_blank'>getLrcLyricWithVendorID</a>,
  'rn': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegocopyrightedmusic.html#getlrclyric" target='_blank'>getLrcLyric</a>,
}
export const ZegoCopyrightedMusicGetLrcLyricCallbackMap = {
  'default': <a href="@ZegoCopyrightedMusicGetLrcLyricCallback" target='_blank'>ZegoCopyrightedMusicGetLrcLyricCallback</a>,
  'Android': <a href="@-IZegoCopyrightedMusicGetLrcLyricCallback" target='_blank'>IZegoCopyrightedMusicGetLrcLyricCallback</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetLrcLyricResult-class.html" target='_blank'>ZegoCopyrightedMusicGetLrcLyricResult</a>,
  'electron': '其',
  'unity': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-lrc-lyric-callback" target='_blank'>OnCopyrightedMusicGetLrcLyricCallback</a>,
  'rn':'其',
}
export const getKrcLyricByTokenMap = {
  'default': <a href="@getKrcLyricByToken" target='_blank'>getKrcLyricByToken</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getKrcLyricByToken.html" target='_blank'>getKrcLyricByToken</a>,
}
export const ZegoCopyrightedMusicGetKrcLyricByTokenCallbackMap = {
  'default': <a href="@ZegoCopyrightedMusicGetKrcLyricByTokenCallback" target='_blank'>ZegoCopyrightedMusicGetKrcLyricByTokenCallback</a>,
  'Android': <a href="@-IZegoCopyrightedMusicGetKrcLyricByTokenCallback" target='_blank'>IZegoCopyrightedMusicGetKrcLyricByTokenCallback</a>,
  'flutter': <a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetKrcLyricByTokenResult-class.html" target='_blank'>ZegoCopyrightedMusicGetKrcLyricByTokenResult</a>,
  'electron': '其',
  'unity': <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-krc-lyric-by-token-callback" target='_blank'>OnCopyrightedMusicGetKrcLyricByTokenCallback</a>,
  'rn':'其',
}
export const enableAuxBgmBalanceMap = {
  'default': <a href="@enableAuxBgmBalance" target='_blank'>enableAuxBgmBalance</a>,
}
export const loadCopyrightedMusicResourceWithPositionMap = {
  'default': <a href="@loadCopyrightedMusicResourceWithPosition" target='_blank'>loadCopyrightedMusicResourceWithPosition</a>,
}
export const ZegoCopyrightedMusicVendorIDMap = {
  'default': '@ZegoCopyrightedMusicVendorID',
}
export const queryCacheMap = {
  'default': <a href="@queryCache" target='_blank'>queryCache</a>,
}
export const createEngineMap = {
  'default': <a href="@createEngine" target='_blank'>createEngine</a>,
}
export const loginRoomMap = {
  'default': <a href="@loginRoom" target='_blank'>loginRoom</a>,
}
export const createCopyrightedMusicMap = {
  'default': <a href="@createCopyrightedMusic" target='_blank'>createCopyrightedMusic</a>,
}
export const initCopyrightedMusicMap = {
  'default': <a href="@initCopyrightedMusic" target='_blank'>initCopyrightedMusic</a>,
}
export const downloadMap = {
  'default': <a href="@download" target='_blank'>download</a>,
}
export const createMediaPlayerMap = {
  'default': <a href="@createMediaPlayer" target='_blank'>createMediaPlayer</a>,
}
export const startMap={
  'default': <a href="@start" target='_blank'>start</a>,
}
export const enableAuxMap = {
  'default': <a href="@enableAux" target='_blank'>enableAux</a>,
}
export const onDownloadProgressUpdateMap = {
  'default': <a href="@onDownloadProgressUpdate" target='_blank'>onDownloadProgressUpdate</a>,
}
export const IZegoMediaPlayerMap = {
  'default': <a href="@IZegoMediaPlayer" target='_blank'>IZegoMediaPlayer</a>,
}
export const pauseMap = {
  'default': <a href="@pause" target='_blank'>pause</a>,
}
export const resumeMap = {
  'default': <a href="@resume" target='_blank'>resume</a>,
}
export const seekToMap = {
  'default': <a href="@seekTo" target='_blank'>seekTo</a>,
}
export const stopMap = {
  'default': <a href="@stop" target='_blank'>stop</a>,
}
export const startPlayingStreamMap = {
  'default': <a href="@startPlayingStream" target='_blank'>startPlayingStream</a>,
}
export const ZegoCopyrightedMusicResourceSongMap = {
  'default':<code>ZegoCopyrightedMusicResourceSong</code>,
  'Android':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG</code>,
  'Windows':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG</code>,
}
export const ZegoCopyrightedMusicResourceAccompanimentMap = {
  'default':<code>ZegoCopyrightedMusicResourceAccompaniment</code>,
  'Android':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT</code>,
  'Windows':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT</code>,
}
export const ZegoCopyrightedMusicResourceAccompanimentClipMap = {
  'default':<code>ZegoCopyrightedMusicResourceAccompanimentClip</code>,
  'Android':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP</code>,
  'Windows':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP</code>,
}
export const ZegoCopyrightedMusicResourceAccompanimentSegmentMap = {
  'default':<code>ZegoCopyrightedMusicResourceAccompanimentSegment</code>,
  'Android':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_SEGMENT</code>,
  'Windows':<code>ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_SEGMENT</code>,
}
# 获取歌曲与歌词资源接口说明

- - -
<table>
  <colgroup>
    <col width="23%"/>
    <col width="15%"/>
    <col width="45%"/>
    <col width="17%"/>
  </colgroup>
<tbody><tr>
<th>接口</th>
<th>方法名</th>
<th>详情描述</th>
<th>支持的 vendorID 取值</th>
</tr>
<tr>
<td><a href="#获取包含人声的歌曲资源">获取包含人声的歌曲资源</a></td>
<td>requestResource</td>
<td>获取 songID 对应包含人声的歌曲的资源，包括歌曲时长、歌手名、resource_id，我们也称为点歌。</td>
<td>0、1、2、4</td>
</tr>
<tr>
<td><a href="#获取歌曲伴奏资源">获取歌曲伴奏资源</a></td>
<td>requestResource</td>
<td>获取 songID 对应歌曲的<b>伴奏资源</b>，包括歌曲资源个数、resource_id、krc_token 等。</td>
<td>0、1、2、4</td>
</tr>
<tr>
<td><a href="#获取长分片高潮片段资源">获取长分片高潮片段资源</a></td>
<td>requestResource</td>
<td>获取 songID 对应歌曲伴奏的<b>高潮片段资源的长分片</b>，包括高潮片段的开始与结束时间、resource_id、krc_token 等。</td>
<td>0、1</td>
</tr>
<tr>
<td><a href="#获取短分片高潮片段资源">获取短分片高潮片段资源</a></td>
<td>requestResource</td>
<td>获取 songID 对应歌曲伴奏的<b>高潮片段资源的短分片</b>，包括高潮片段短分片的开始与结束时间、抢唱片段的开始与结束时间、resource_id、krc_token 等。</td>
<td>0、1、2</td>
</tr>
<tr>
<td><a href="#获取其他用户分享的歌曲资源">获取其他用户分享的歌曲资源</a></td>
<td>getSharedResource</td>
<td>免费获取一次其他用户分享的歌曲资源。</td>
<td>0、1、2、4</td>
</tr>
<tr>
<td><a href="#1-获取逐行歌词">获取逐行歌词</a></td>
<td>getLrcLyric</td>
<td>获取 songID 对应歌曲的逐行歌词。<br />逐行歌词指的是根据歌曲/伴奏/高潮片段播放进度，将匹配的歌词一行行的展示。</td>
<td>0、1、2、4</td>
</tr>
<tr>
<td><a href="#2-获取逐字歌词">获取逐字歌词</a></td>
<td>getKrcLyricByToken</td>
<td>我们可以通过 requestResource、getSharedResource 接口获取到 krc_token，再调用 getKrcLyricByToken 接口获取到逐字歌词。<br />逐字歌词指的是在歌曲/伴奏/高潮片段播放时，先出现逐行歌词，然后对应播放节奏，将歌词的每个字进行高亮显示。</td>
<td>0、1、2、4</td>
</tr>
</tbody></table>


其中，[获取歌曲伴奏资源](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics#获取歌曲伴奏资源)、[获取长分片高潮片段资源](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics#获取长分片高潮片段资源)、[获取短分片高潮片段资源](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics#获取短分片高潮片段资源) 可获取的资源片段，区别如下：

<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/requestResourcesCallback_AccompanimentClip_requestResource_1.png" width="80%" />


<Warning title="注意">

获取歌曲/伴奏/高潮片段资源中的 resource_id，只在 SDK 的生命周期内有效。其他用户如需获取对应的音乐资源，必须通过调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource-1)  接口获取对应的 resource_id。
</Warning>

## 获取歌曲资源

### 获取包含人声的歌曲资源

用户调用 {getPlatformData2(props,requestResourceMap)} 接口点歌，“资源类型”选择 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG`，通过{getPlatformData2(props,ZegoCopyrightedMusicRequestResourceCallbackMap)}  回调结果，可以获取 songID 对应歌曲的资源，包括歌曲时长、歌手名、resource_id 等。


#### 接口调用示例

```cpp
/** 配置 */
ZegoCopyrightedMusicRequestConfig config;
/** 音乐 songID，从歌曲列表中获取*/
config.songID = songID;
/** 计费模式 */
config.mode = ZEGO_COPYRIGHTED_MUSIC_BILLING_MODE_COUNT;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
config.vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;
/** 场景 sceneID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
/** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
config.sceneID = 0;
/** 资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG;

m_pMusic->requestResource(config, resourceType, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-resource) {
    //resource: 回调结果
    });
```



#### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_name | String | 歌曲名。
└ singer_name | String | 歌手名。
└ song_id | String | 歌曲 ID。
└ duration | Int | 歌曲时长，单位：毫秒。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources)。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质。<br/>• normal：标准，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2、4。**<br/>• hq：高清，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2。**<br/>• sq：无损，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1。**
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_accompany": 0,
    "song_name": "string",
    "singer_name": "string",
    "song_id": "string",
    "duration": 0,
    "token_ttl": 0,
    "resources_size": 1,
    "resources": [
      {
        "resource_id": "string",
        "size": 0,
        "quality": "string",
        "share_token": "string",
        "resource_ttl": 300000
      }
    ]
  }
}
```

### 获取歌曲伴奏资源

用户调用 {getPlatformData2(props,requestResourceMap)}接口点伴奏，“资源类型”选择 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT`，通过 {getPlatformData2(props,ZegoCopyrightedMusicRequestResourceCallbackMap)}回调结果，可以获取 songID 对应歌曲的伴奏资源，包括歌曲资源个数、resource_id、krc_token 等。

#### 接口调用示例

```cpp
/** 配置 */
ZegoCopyrightedMusicRequestConfig config;
/** 音乐 songID，从歌曲列表中获取*/
config.songID = songID;
/** 计费模式 */
config.mode = ZEGO_COPYRIGHTED_MUSIC_BILLING_MODE_COUNT;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
config.vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;
/** 场景 sceneID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
/** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
config.sceneID = 0;
/** 资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT;

m_pMusic->requestResource(config, resourceType, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-resource) {
    //resource: 回调结果
    });
```

#### 回调结果
参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ has_original | Int | 伴奏是否有原唱。<br/>• 0：没有<br/>• 1：有
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_id | String | 歌曲 ID。
└ duration | Int | 歌曲时长，单位：毫秒。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-2)。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质。<br/>• normal：标准，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2、4。**<br/>• hq：高清，**支持该音质资源的版权方 vendorID 取值为 2。**
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "has_original": 1,
    "is_accompany": 1,
    "song_id": "string",
    "share_token": "eyJhbGciOiJIUzI1NiIsInR5c",
    "duration": 0,
    "token_ttl": 0,
    "krc_token":"string",
    "krc_token_ttl":0,
    "resources_size": 1,
    "resources": [
      {
        "resource_id": "string",
        "size": 0,
        "quality": "string",
        "share_token": "string",
        "resource_ttl": 300000
      }
    ]
  }
}
```

### 获取长分片高潮片段资源

用户调用 {getPlatformData2(props,requestResourceMap)} 接口点高潮片段，“资源类型”选择 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP`，通过 {getPlatformData2(props,ZegoCopyrightedMusicRequestResourceCallbackMap)} 回调结果，可以获取 songID 对应歌曲的伴奏资源，包括高潮片段的开始与结束时间、resource_id、krc_token 等。

#### 接口调用示例


```cpp
/** 配置 */
ZegoCopyrightedMusicRequestConfig config;
/** 音乐 songID，从歌曲列表中获取*/
config.songID = songID;
/** 计费模式 */
config.mode = ZEGO_COPYRIGHTED_MUSIC_BILLING_MODE_COUNT;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
config.vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;
/** 场景 sceneID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
/** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
config.sceneID = 0;
/** 资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP;

m_pMusic->requestResource(config, resourceType, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-resource) {
    //resource: 回调结果
    });
```

#### 回调结果
参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_clip | Int | 是否为高潮片段。<br/>• 0：否<br/>• 1：是
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ song_id | String | 歌曲 ID。
└ share_token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为新版参数，与 token_ttl 旧版参数含义相同，新接入用户主要使用该参数。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为旧版参数，与 share_token_ttl 新版参数含义相同，为了兼容早期接入用户使用。
└ segment_begin | Int | 高潮片段相对于原曲时长的开始时间戳，单位：毫秒。
└ segment_end | Int | 高潮片段相对于原曲时长的结束时间戳，单位：毫秒。
└ prelude_duration | Int | 高潮片段的前奏时间，单位：毫秒。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-3)。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质，当前仅包含 **normal（标准）音质**的长分片高潮片段资源。
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。
**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_clip":1,
    "is_accompany":0,
    "krc_token":"UQIFmNmY3NbjZggIwNzFl",
    "krc_token_ttl":43200000,
    "song_id":"300785364",
    "share_token_ttl":3600000,
    "token_ttl":3600000,
    "segment_begin":133157,
    "segment_end":235337,
    "prelude_duration":5000,
    "resources_size":1,
    "resources":[
        {
            "resource_id":"z_301215364_3",
            "size":0,
            "quality":"normal",
            "share_token":"7878787SDASDASDASDASD.SADSDASDASDASDSADSASDASDASDASD.V-sT427morLeej5sYUXgQzEgNjQ-YAoShYHGy5dGFKI",
            "resource_ttl": 300000
        }
    ]
  }
}
```

### 获取短分片高潮片段资源

<Warning title="注意">

- 与 [获取长分片高潮片段资源](#获取长分片高潮片段资源) 相比，本功能提供更短的歌曲资源分片（例如，高潮片段资源的长分片时长约为 40s，短分片时长约为 20s），支持获取抢唱片段的开始与结束时间等信息，适用于 KTV 抢唱场景中。
- 短分片高潮片段资源支持的曲库，可以通过服务端的 [获取标签列表](/online-ktv-server/describe-tags) 接口获取，仅当 vendorID 为 0（默认）、1、2 时支持获取。
</Warning>

用户调用 {getPlatformData2(props,requestResourceMap)} 接口点伴奏片段，“资源类型”选择`ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_SEGMENT`，通过 {getPlatformData2(props,ZegoCopyrightedMusicRequestResourceCallbackMap)} 回调结果，可以获取 songID 对应歌曲的伴奏片段资源，包括高潮片段短分片的开始与结束时间、抢唱片段的开始与结束时间、resource_id、krc_token 等。

#### 接口调用示例

```cpp
/** 配置 */
ZegoCopyrightedMusicRequestConfig config;
/** 音乐 songID，从歌曲列表中获取*/
config.songID = songID;
/** 计费模式 */
config.mode = ZEGO_COPYRIGHTED_MUSIC_BILLING_MODE_COUNT;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
config.vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;
/** 场景 sceneID：1 语聊房、2 直播间在线 K 歌、3 直播间播放背景音乐、4 抢唱*/
/** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
config.sceneID = 0;
/** 资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_SEGMENT;

m_pMusic->requestResource(config, resourceType, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-resource) {
    //resource: 回调结果
    });
```
#### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_clip | Int | 是否为高潮片段。<br/>• 0：否<br/>• 1：是
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ song_id | String | 歌曲 ID。
└ share_token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为新版参数，与 token_ttl 旧版参数含义相同，新接入用户主要使用该参数。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为旧版参数，与 share_token_ttl 新版参数含义相同，为了兼容早期接入用户使用。
└ segment_begin | Int | "长分片高潮片段"相对于"原曲时长"的开始时间戳，单位：毫秒。
└ segment_end | Int | "长分片高潮片段"相对于"原曲时长"的结束时间戳，单位：毫秒。
└ other_segments | Array | 短分片高潮片段的时间分片信息。**仅当版权方 vendorID 取值为 0 或 1 时会返回此字段，其对应的枚举值信息，请联系 ZEGO 商务咨询。**"短分片高潮片段"的开始、结束时间，必须在"长分片高潮片段"的时长范围内。详情可见[other_segments](#other_segments)。<Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/requestResourcesCallback_AccompanimentClip_qc_1.png?time=Wed%20May%2028%202025%2014:57:15%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)" /></Frame>
└ prelude_duration | Int | 长分片高潮片段的前奏时间，单位：毫秒。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-4)。
##### other_segments

参数 | 类型 | 描述
---|---|---
begin | Int | "短分片高潮片段"相对于"长分片高潮片段"时长的开始时间戳，可以直接通过 `seekTo` 接口跳转到该时间点开始播放，单位：毫秒。
end | Int | "短分片高潮片段"相对于"长分片高潮片段"时长的结束时间戳，单位：毫秒。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质，当前仅包含 **normal（标准）音质**的短分片高潮片段资源。
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_clip":1,
    "is_accompany":0,
    "krc_token":"UQIFmNmY3NbjZggIwNzFl",
    "krc_token_ttl":43200000,
    "song_id":"300785364",
    "share_token_ttl":3600000,
    "token_ttl":3600000,
    "segment_begin":133157,
    "segment_end":235337,
    "other_segments":[
        {
            "begin":59776,
            "end":73000
        }
    ],
    "prelude_duration":5000,
    "resources_size":1,
    "resources":[
        {
            "resource_id":"z_301215364_3",
            "size":0,
            "quality":"normal",
            "share_token":"7878787SDASDASDASDASD.SADSDASDASDASDSADSASDASDASDASD.V-sT427morLeej5sYUXgQzEgNjQ-YAoShYHGy5dGFKI",
            "resource_ttl": 300000
        }
    ]
  }
}
```


### 获取其他用户分享的歌曲资源

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource-1) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 {getPlatformData2(props,requestResourceMap)} 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource-1)  接口获取对应的歌曲资源。
</Warning>

用户在获取歌曲/伴奏/高潮片段资源成功后，其他用户调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource-1)  接口获取被分享的音乐资源，通过 {getPlatformData2(props,ZegoCopyrightedMusicGetSharedResourceCallbackMap)} 回调结果，可以获取对应歌曲的 resource_id。

##### 接口调用示例

```cpp
/** 点歌用户分享的歌曲资源对应的 songID */
ZegoCopyrightedMusicGetSharedConfig config ;
config.songID = songID;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
config.vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;

/** 点歌用户分享的歌曲资源对应的资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG;

m_pMusic->getSharedResource(config, resourceType, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-resource) {
    //resource: 回调结果
    });
```

#### 获取包含人声的歌曲资源

##### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_name | String | 歌曲名。
└ singer_name | String | 歌手名。
└ song_id | String | 歌曲 ID。
└ duration | Int | 歌曲时长，单位：毫秒。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-5)。
##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质。<br/>• normal：标准，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2、4。**<br/>• hq：高清，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2。**<br/>• sq：无损，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1。**
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。


**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_accompany": 0,
    "song_name": "string",
    "singer_name": "string",
    "song_id": "string",
    "duration": 0,
    "resources_size": 1,
    "resources": [
      {
        "resource_id": "string",
        "size": 0,
        "quality": "string",
        "resource_ttl": 300000
      }
    ]
  }
}
```
#### 获取伴奏资源

##### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ has_original | Int | 伴奏是否有原唱。<br/>• 0：没有<br/>• 1：有
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_id | String | 歌曲 ID。
└ duration | Int | 歌曲时长，单位：毫秒。
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-6)。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质。<br/>• normal：标准，**支持该音质资源的版权方 vendorID 取值为 0（默认）、1、2、4。**<br/>• hq：高清，**支持该音质资源的版权方 vendorID 取值为 2。**
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "has_original": 1,
    "is_accompany": 1,
    "song_id": "string",
    "duration": 0,
    "krc_token":"string",
    "krc_token_ttl":0,
    "resources_size": 1,
    "resources": [
      {
        "resource_id": "string",
        "size": 0,
        "quality": "string",
        "resource_ttl": 300000
      }
    ]
  }
}
```

#### 获取长分片高潮片段资源

##### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_clip | Int | 是否为高潮片段。<br/>• 0：否<br/>• 1：是
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_id | String | 歌曲 ID。
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为旧版参数，与 share_token_ttl 新版参数含义相同，为了兼容早期接入客户使用。
└ share_token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为新版参数，与 token_ttl 旧版参数含义相同，新接入客户主要使用该参数。
└ segment_begin | Int | 高潮片段相对于原曲时长的开始时间戳，单位：毫秒。
└ segment_end | Int | 高潮片段相对于原曲时长的结束时间戳，单位：毫秒。
└ prelude_duration | Int | 高潮片段的前奏时间，单位：毫秒。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-7)。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质，当前仅包含 **normal（标准）音质**的长分片高潮片段资源。
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_clip":1,
    "is_accompany":0,
    "song_id":"300785364",
    "krc_token":"UQIFmNmY3NbjZggIwNzFl",
    "krc_token_ttl":43200000,
    "token_ttl":3600000,
    "share_token_ttl":3600000,
    "segment_begin":133157,
    "segment_end":235337,
    "prelude_duration":5000,
    "resources_size":1,
    "resources":[
        {
            "resource_id":"z_301215364_3",
            "size":0,
            "quality":"normal",
            "share_token":"7878787SDASDASDASDASD.SADSDASDASDASDSADSASDASDASDASD.V-sT427morLeej5sYUXgQzEgNjQ-YAoShYHGy5dGFKI",
            "resource_ttl": 300000
        }
    ]
  }
}
```

#### 获取短分片高潮片段资源


<Warning title="注意">本功能提供更短的歌曲资源分片，支持获取抢唱片段的开始与结束时间等信息，适用于 KTV 抢唱场景中。</Warning>

##### 回调结果

参数 | 类型 | 描述
---|---|---
code | Number | 返回码，具体请参见 [错误码](/real-time-video-ios-oc/client-sdk/error-code)，如查询不到可联系 ZEGO 技术支持。
message | String | 操作结果描述。
request_id | String | 请求 ID。
data | Object | 响应数据。
└ is_clip | Int | 是否为高潮片段。<br/>• 0：否<br/>• 1：是
└ is_accompany | Int | 是否为伴奏。<br/>• 0：歌曲<br/>• 1：伴奏
└ song_id | String | 歌曲 ID。
└ krc_token | String | 获取逐字歌词所需的 krc_token。
└ krc_token_ttl | Int | 逐字歌词 krc_token 的有效期，默认值为 43200000 毫秒（12 小时）。
└ token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为旧版参数，与 share_token_ttl 新版参数含义相同，为了兼容早期接入客户使用。
└ share_token_ttl | Int | share_token 有效时长，默认值为 3600000 毫秒（1 小时）。该参数为新版参数，与 token_ttl 旧版参数含义相同，新接入客户主要使用该参数。
└ segment_begin | Int | "长分片高潮片段"相对于"原曲时长"的开始时间戳，单位：毫秒。
└ segment_end | Int | "长分片高潮片段"相对于"原曲时长"的结束时间戳，单位：毫秒。
└ other_segments | Array | 短分片高潮片段的时间分片信息。**仅当版权方 vendorID 取值为 0 或 1 时会返回此字段，其对应的枚举值信息，请联系 ZEGO 商务咨询。**"短分片高潮片段"的开始、结束时间，必须在"长分片高潮片段"的时长范围内。详情可见[other_segments](#other_segments)。<Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/requestResourcesCallback_AccompanimentClip_qc_1.png?time=Wed%20May%2028%202025%2014:57:15%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)" /></Frame>
└ prelude_duration | Int | 长分片高潮片段的前奏时间，单位：毫秒。
└ resources_size | Int | 歌曲资源数，resources 中资源个数。
└ resources | Object | 歌曲资源信息，详情可见[resources](#resources-8)。

##### other_segments

参数 | 类型 | 描述
---|---|---
begin | Int | "短分片高潮片段"相对于"长分片高潮片段"时长的开始时间戳，可以直接通过 `seekTo` 接口跳转到该时间点开始播放，单位：毫秒。
end | Int | "短分片高潮片段"相对于"长分片高潮片段"时长的结束时间戳，单位：毫秒。

##### resources

参数 | 类型 | 描述
---|---|---
resource_id | String | 歌曲资源 ID。
size | Int | 歌曲资源大小，单位：字节。
quality | String | 歌曲音质，当前仅包含 **normal（标准）音质**的短分片高潮片段资源。
share_token | String | 旧版参数。
resource_ttl | Int | 该资源的剩余有效时长，单位：毫秒。

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "is_clip":1,
    "is_accompany":0,
    "song_id":"300785364",
    "krc_token":"UQIFmNmY3NbjZggIwNzFl",
    "krc_token_ttl":43200000,
    "token_ttl":3600000,
    "share_token_ttl":3600000,
    "segment_begin":133157,
    "segment_end":235337,
    "other_segments":[
        {
            "begin":59776,
            "end":73000
        }
    ],
    "prelude_duration":5000,
    "resources_size":1,
    "resources":[
        {
            "resource_id":"z_301215364_3",
            "size":0,
            "quality":"normal",
            "share_token":"7878787SDASDASDASDASD.SADSDASDASDASDSADSASDASDASDASD.V-sT427morLeej5sYUXgQzEgNjQ-YAoShYHGy5dGFKI",
            "resource_ttl": 300000
        }
    ]
  }
}
```

## 获取歌词

### 获取逐行歌词

用户调用 {getPlatformData2(props,getLrcLyricMap)} 接口，通过 {getPlatformData2(props,ZegoCopyrightedMusicGetLrcLyricCallbackMap)} 回调结果，可以获取逐行歌词信息。


#### 接口调用示例

```cpp
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ZEGO_COPYRIGHTED_MUSIC_VENDOR_DEFAULT;
m_pMusic->getLrcLyric(song_id, vendorID, [=](/online-ktv-linux/client-api/int-errorcode,-std::string-lyrics) {
    //lyrics: 回调结果
    });
```

#### 回调结果

参数 | 类型 | 描述
---|---|---
lines | Object | 逐行歌词。
└ begin_time | Int | 当前行歌词开始时间，单位：毫秒。
└ end_time | Int | 当前行歌词结束时间，单位：毫秒。
└ content | String | 歌词内容。
lrc_format | String | lrc 格式歌词。

其他字段为歌词源文件中的 title 字段，不同的歌词文件中不一定存在，一般可以选择忽略。具体如下：

<table>
  <colgroup>
    <col width="20%"/>
    <col width="20%"/>
    <col width="60%"/>
  </colgroup>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>al</td>
<td>String</td>
<td>唱片集。</td>
</tr>
<tr>
<td>ar</td>
<td>String</td>
<td>歌手。</td>
</tr>
<tr>
<td>au</td>
<td>String</td>
<td>歌词作者。</td>
</tr>
<tr>
<td>by</td>
<td>String</td>
<td>歌词文件创建者。</td>
</tr>
<tr>
<td>offset</td>
<td>Int</td>
<td>以毫秒为单位、加快（+）或延后（-）歌词播放。</td>
</tr>
<tr>
<td>lenght</td>
<td>Int</td>
<td>歌曲时长，单位：毫秒。</td>
</tr>
<tr>
<td>re</td>
<td>String</td>
<td>创建歌词文件的播放器或编辑器。</td>
</tr>
<tr>
<td>ti</td>
<td>String</td>
<td>歌词标题。</td>
</tr>
<tr>
<td>ve</td>
<td>String</td>
<td>程序版本。</td>
</tr>
</tbody></table>

**回调示例**

```json
{
  "lines": [
    {
      "begin_time": 0,
      "end_time": 0,
      "content": ""
    }
  ],
  "lrc_format": "string",
  "al": "",
  "ar": "",
  "au": "",
  "by": "",
  "offset": 0,
  "lenght": 0,
  "re": "",
  "ti": "",
  "ve": ""
}
```