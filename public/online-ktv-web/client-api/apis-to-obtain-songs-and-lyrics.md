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
<td><a href="#获取逐行歌词">获取逐行歌词</a></td>
<td>getLrcLyric</td>
<td>获取 songID 对应歌曲的逐行歌词。<br />逐行歌词指的是根据歌曲/伴奏/高潮片段播放进度，将匹配的歌词一行行的展示。</td>
<td>0、1、2、4</td>
</tr>
<tr>
<td><a href="#获取逐字歌词">获取逐字歌词</a></td>
<td>getKrcLyricByToken</td>
<td>我们可以通过 requestResource、getSharedResource 接口获取到 krc_token，再调用 getKrcLyricByToken 接口获取到逐字歌词。<br />逐字歌词指的是在歌曲/伴奏/高潮片段播放时，先出现逐行歌词，然后对应播放节奏，将歌词的每个字进行高亮显示。</td>
<td>0、1、2、4</td>
</tr>
</tbody></table>


其中，[获取歌曲伴奏资源](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics#获取歌曲伴奏资源)、[获取长分片高潮片段资源](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics#获取长分片高潮片段资源)、[获取短分片高潮片段资源](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics#获取短分片高潮片段资源) 可获取的资源片段，区别如下：

<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/requestResourcesCallback_AccompanimentClip_requestResource_1.png" width="80%" />


<Warning title="注意">
获取歌曲/伴奏/高潮片段资源中的 resource_id，只在 SDK 的生命周期内有效。其他用户如需获取对应的音乐资源，必须通过调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的 resource_id。
</Warning>

## 获取歌曲资源

### 获取包含人声的歌曲资源

用户调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口点歌，“资源类型”选择 `0`，即歌曲原唱资源，通过其回调结果，可以获取 songID 对应歌曲的资源，包括歌曲时长、歌手名、resource_id 等。

#### 接口调用示例

```js
/** 音乐 songID，从歌曲列表中获取*/
/** 版权方 vendorID */
/**
 * 资源类型 type 包含：
 * 0：包含人声的原曲
 * 1：伴奏
 * 2：伴奏高潮片段
 */
const requestConfig = {
    songID: songId,
    vendorID: 2, // 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询
    mode: 0, // 计费模式，0 为按次数计费
    /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
    sceneID: 0
};
// 原声歌曲的枚举值为 0
const typeSong = 0;
/** 点歌 */
copyrightedMusic.requestResource(requestConfig, typeSong).then(function(res) {
    if (res.errorCode === 0) {
        resourceID = res.resource.data.resources[0].resource_id;
    } else {
        // 报错处理
    }
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

用户调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口点伴奏，“资源类型”选择 `1`，通过其回调结果，可以获取 songID 对应歌曲的伴奏资源，包括歌曲资源个数、resource_id、krc_token 等。

#### 接口调用示例

```js
/** 音乐 songID，从歌曲列表中获取*/
const requestConfig = {
    songID: songId,
    vendorID: 2, // 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询
    mode: 0, // 计费模式，0 为按次数计费
    /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
    sceneID: 0
};
// 伴奏的枚举值为 1
const typeAccompaniment = 1;
/** 点歌 */
copyrightedMusic.requestResource(requestConfig, typeAccompaniment).then(function(res) {
    if (res.errorCode === 0) {
        resourceID = res.resource.data.resources[0].resource_id;
    } else {
        // 报错处理
    }
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

用户调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口点高潮片段，“资源类型”选择 `2`，通过其回调结果，可以获取 songID 对应歌曲的伴奏资源，包括高潮片段的开始与结束时间、resource_id、krc_token 等。

#### 接口调用示例

```js
/** 音乐 songID，从歌曲列表中获取*/
const requestConfig = {
    songID: songId,
    vendorID: 2, // 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询
    mode: 0, // 计费模式，0 为按次数计费
    /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
    sceneID: 0
};
// 歌曲高潮片段的枚举值为 2
const typeAccompanimentClip = 2;
/** 点歌 */
copyrightedMusic.requestResource(requestConfig, typeAccompanimentClip).then(function(res) {
    if (res.errorCode === 0) {
        resourceID = res.resource.data.resources[0].resource_id;
    } else {
        // 报错处理
    }
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
- 与 [获取长分片高潮片段资源](#获取长分片高潮片段资源)  相比，本功能提供更短的歌曲资源分片（例如，高潮片段资源的长分片时长约为 40s，短分片时长约为 20s），支持获取抢唱片段的开始与结束时间等信息，适用于 KTV 抢唱场景中。
- 短分片高潮片段资源支持的曲库，可以通过服务端的 [获取标签列表](/online-ktv-server/describe-tags) 接口获取，仅当 vendorID 为 0（默认）、1、2 时支持获取。
</Warning>

用户调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口点伴奏，“资源类型”选择 `3`，通过其回调结果，可以获取 songID 对应歌曲的伴奏片段资源，包括高潮片段短分片的开始与结束时间、抢唱片段的开始与结束时间、resource_id、krc_token 等。

#### 接口调用示例

```js
/** 音乐 songID，从歌曲列表中获取*/
const requestConfig = {
    songID: songId,
    vendorID: 2, // 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询
    mode: 0, // 计费模式，0 为按次数计费
    /** 请联系 ZEGO 商务开通使用场景，使用过程请传入正确的场景 ID。*/
    sceneID: 0
};
// 歌曲短分片高潮片段的枚举值为 3
const typeAccompanimentSegment = 3;
/** 点歌 */
copyrightedMusic.requestResource(requestConfig, typeAccompanimentClip).then(function(res) {
    if (res.errorCode === 0) {
        resourceID = res.resource.data.resources[0].resource_id;
    } else {
        // 报错处理
    }
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
调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

用户在获取歌曲/伴奏/高潮片段资源成功后，其他用户调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取被分享的音乐资源，通过其回调结果，可以获取对应歌曲的 resource_id。

##### 接口调用示例

```js
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/

/**
 * 资源类型 type 包含：
 * 0：包含人声的原曲
 * 1：伴奏
 * 2：伴奏高潮片段
 */
const typeAccompaniment = 2;
/** 点歌用户分享的歌曲资源对应的 songID */
copyrightedMusic.getSharedResource(
    {songID: 0, vendorID: 2},
    typeAccompaniment
).then(({res})=>{
    //监听结果
    if(res.errorCode ===0)
    {
        // 歌曲资源获取成功，可进行下载歌曲等操作
    }
    else
    {
        // 失败
    }
})
```

#### 获取歌曲资源

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

###  获取逐行歌词

用户调用 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-lrc-lyric) 接口，通过其回调结果，可以获取逐行歌词信息。

#### 接口调用示例

```js
/** 歌曲的 songID */
const songID = "";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
const vendorID = 2;
// 一次性获取逐行歌词
copyrightedMusic.getLrcLyric(
    songID,
    vendorID
).then(
    ({ errorCode, lyrics })=>{
    // errorCode 为 0, 则成功获取到歌词信息  lyrics
    }
);
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


###  获取逐字歌词

用户先通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource)、[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取到 krc_token，再调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口，通过其回调结果，可以获取逐字歌词信息。

#### 接口调用示例

```js
/** 点歌时获取的 krcToken */
const krcToken = "";

// 一次性获取逐字歌词
copyrightedMusic.getKrcLyricByToken(krcToken).then(
    ({ errorCode, lyrics })=>{
        // errorCode 为 0, 则成功获取到歌词信息  lyrics
    }
);
```

#### 回调结果

参数 | 类型 | 描述
---|---|---
lines | Object | SDK 解析后的歌词。
└ begin_time | Int | 行开始时间，单位：毫秒。
└ duration | Int | 行持续时间，单位：毫秒。<Warning title="注意">此处与获取逐行歌词的参数格式不同。</Warning>
└ content | String | 歌词内容。
└ words | Object | 歌词逐字内容，详情可见[words](#words)。

##### words

参数 | 类型 | 描述
---|---|---
offset | Int | 字偏移时间，单位：毫秒。<Note title="说明">字偏移指的是在歌词中该字的开始时间与该行开始时间对比的偏移。</Note>
duration | Int | 字持续时间，单位：毫秒。
word | String | 歌词内容。

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
      "begin_time": 12076,
      "duration": 6158,
      "content": "string",
      "words": [
        {
          "offset": 0,
          "duration": 496,
          "word": "string"
        }
      ]
    }
  ],
  "al": "",
  "ar": "",
  "au": "",
  "by": "",
  "lenght": 0,
  "re": "",
  "ti": "",
  "ve": "",
}
```

