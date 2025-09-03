# 发送扩展请求接口说明

- - -



用户通过调用 [sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocopyrightedmusic.html#sendextendedrequest) 接口，传入对应的 command、params，可以获取标签列表、搜索歌曲、榜单歌曲、歌词分片等信息。

- 接口原型

```js
参数说明
* @param {string} command - request command, see details for specific supported commands.
* @param {string} params - request parameters, each request command has corresponding request parameters.
* @return {number} - The serial number of the calling interface.
sendExtendedRequest(command, params).then(function(res){
    //监听结果
    console.log(res);
})
```


- 调用示例（如下以“通过标签获取歌曲”为例）

```js
// 下面以通过标签获取歌曲列表为例
var command = "/tag/song"; // command 参数代表您请求的业务指令，该示例为标签获取歌曲
var params = "{ \"vendor_id\": 0, \"tag_id\": \"587\",  \"page\": 1,  \"filter\": [1]}"; // params 参数，是 JSON 格式的字符串，需要您传入的额外参数

copyRightedMusicInst.sendExtendedRequest(command , params).then(function(res){
    //监听结果
    console.log(res.command);   // 参数代表您请求的业务指令
    console.log(res.result);    // 回调结果，JSON 格式字符串
})
```

## 获取标签列表

通过获取标签列表，可以知道歌曲资源的标签列表、标签分组名称、标签 ID、标签名称等信息。

<Note title="说明">相比原有 [歌单](https://doc-zh.zego.im/article/15438) 接口，本接口歌曲资源更丰富，且支持动态更新。因此，ZEGO 推荐开发者使用本接口获得歌曲列表相关内容。</Note>

#### 请求参数

**command 参数**

`"/tag/list"`     // 扩展请求类型，字符串

**params 参数**

| 参数 | 类型 | 是否必须 | 描述 |
|------|------|---------|------|
| vendor_id | Int | 否 | 版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |

**params 示例**

```json
{
    "vendor_id": 0
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ groups | Array of Object | 标签分组列表，详情可查看[groups](#groups)。 |

##### groups

| 参数 | 类型 | 描述 |
|------|------|------|
| group_id | String | 标签分组 ID。开发者可以通过 group_id，获取版权方 vendor_id 为 0（默认）、1、2 时的短分片高潮片段资源，详情请参考 [获取短分片高潮片段资源](/online-ktv-rn/client-api/apis-to-obtain-songs-and-lyrics)。 |
| group_name | String | 标签分组名称。 |
| tags | Array of Object | 标签列表 |
| └ tag_id | String | 标签 ID，具备唯一性。 |
| └ tag_name | String | 标签名称。 |


**回调示例**

```json
{
    "code": 0,
    "message": "succeed",
    "request_id": "6669156f-11b3-4e71-9413-b3aa57ab2da3",
    "data": {
        "groups": [
            {
                "group_id": "5",
                "group_name": "场景",
                "tags": [
                    {
                        "tag_id": "587",
                        "tag_name": "学习"
                    }
                ]
            }
        ]
    }
}
```


## 根据标签获取歌曲

需通过 [获取标签列表](/online-ktv-rn/client-api/send-extended-request#获取标签列表) 中的标签 ID，可获取对应的歌曲 ID、歌曲名、歌曲专辑、以及版权相关信息等。

#### 请求参数

**command 参数**

`"/tag/song"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>tag_id</td>
    <td>String</td>
    <td>是</td>
    <td>标签 ID，通过 <a href="#获取标签列表">获取标签列表</a> 接口获取。</td>
  </tr>
  <tr>
    <td>page</td>
    <td>Int</td>
    <td>是</td>
    <td>第几页，从 1 开始。</td>
  </tr>
  <tr>
    <td>filter</td>
    <td>Array of Int</td>
    <td>否</td>
    <td>过滤选项。<ul><li>1：过滤不包含词曲权限的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲</li></ul></td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "tag_id": "string",
    "page": 1,
    "filter": [1]
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ songs | Array of Object | 歌曲列表，详情可查看[songs](/online-ktv-rn/client-api/send-extended-request#songs)。 |

###### songs

| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| song_name | String | 歌曲名。 |
| singer_name | String | 歌手名。 |
| singer_img | String | 歌手头像。 |
| album_name | String | 歌曲所属专辑名。 |
| album_img | String | 专辑封面。 |
| album_img_mini | String | 专辑封面 100px 左右。 |
| album_img_small | String | 专辑封面 300px 左右。 |
| album_img_medium | String | 专辑封面 500px 左右。 |
| duration | Int | 歌曲时长，单位：毫秒。 |
| has_clip | Int | 是否具有长分片高潮片段资源。<ul><li>0：否</li><li>1：是</li></ul><b>vendor_id 为 2 时，不会返回此字段。</b> |
| vendor_id | Int | 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |
| pitch_ability | Int | 是否具有音高线。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| copyright | Object | 版权信息。 |
| └ song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ channel | Int | 歌曲渠道。<ul><li>若 channel 为 其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></li></ul> |
**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "songs": [
            {
                "song_id": "string",
                "song_name": "string",
                "singer_id": "string",
                "singer_name": "string",
                "singer_img": "string",
                "album_id": "string",
                "album_name": "string",
                "album_img": "string",
                "album_img_mini": "string",
                "album_img_small": "string",
                "album_img_medium": "string",
                "duration": 248000,
                "accompany_duration": 248000,
                "vendor_id": 2, // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "pitch_ability": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "has_short_segment": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "copyright": {
                    "song_lyric": 0,
                    "recording": 1,
                    "channel": 0
            }
        ]
    }
}
```
## 批量查询歌曲信息

通过歌曲 ID 列表批量查询歌曲信息，可获取包含歌曲信息、歌手信息、歌曲所属专辑信息、歌曲时长、以及是否有伴奏等。

#### 请求参数

**command 参数**

`"/song/infos"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%"/>
    <col width="20%"/>
    <col width="20%"/>
    <col width="40%"/>
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>songs_id</td>
    <td>Array of String</td>
    <td>是</td>
    <td>歌曲 ID 数组。最多只支持查询 30 首歌曲信息。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "songs_id": ["abc", "edf"]
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ songs | Array of Object | 歌曲列表，详情见[songs](/online-ktv-rn/client-api/send-extended-request#songs-2)。 |

##### songs

| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| song_name | String | 歌曲名。 |
| singer_id | String | 歌手 ID。 |
| singer_name | String | 歌手名。 |
| singer_img | String | 歌手头像。 |
| album_id | String | 歌曲所属专辑 ID。 |
| album_name | String | 歌曲所属专辑名。 |
| album_img | String | 专辑封面。 |
| album_img_mini | String | 专辑封面 100px 左右。 |
| album_img_small | String | 专辑封面 300px 左右。 |
| album_img_medium | String | 专辑封面 500px 左右。 |
| duration | Int | 歌曲时长，单位：毫秒。 |
| accompany_duration | Int | 伴奏时长，单位：毫秒。 |
| vendor_id | Int | 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |
| pitch_ability | Int | 是否具有音高线。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| has_short_segment | Int | 是否具有短分片高潮片段资源。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| copyright | Object | 版权信息。 |
| └ song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ channel | Int | 歌曲渠道。<ul><li>若 channel 为其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></li></ul> |

**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "songs": [
            {
                "song_id": "string",
                "song_name": "string",
                "singer_id": "string",
                "singer_name": "string",
                "singer_img": "string",
                "album_id": "string",
                "album_name": "string",
                "album_img": "string",
                "album_img_mini": "string",
                "album_img_small": "string",
                "album_img_medium": "string",
                "duration": 248000,
                "accompany_duration": 248000,
                "vendor_id": 2, // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "pitch_ability": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "has_short_segment": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "copyright": {
                    "song_lyric": 0,
                    "recording": 1,
                    "channel": 0
            }
        ]
    }
}
```

## 搜索提示

根据您输入的关键词内容，在搜索框下方实时展示包含该关键词最符合的提示词，您可以选择对应的提示词进行搜索。

<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）”、“1” 或 “2” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/search/tips"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>keyword</td>
    <td>String</td>
    <td>是</td>
    <td>搜索关键字。</td>
  </tr>
</tbody></table>

**params 示例**

```json
{
    "vendor_id": 0,
    "keyword": "string"
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ tips | Array of String | 搜索提示 tip 列表。 |

**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "tips": [	// 提示列表
            "string"
        ]
    }
}
```

## 搜索歌曲

通过输入关键词，搜索指定版权方的歌曲资源，可获取包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息、以及是否有伴奏等。

#### 请求参数

**command 参数**

`"/search/song"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>keyword</td>
    <td>String</td>
    <td>是</td>
    <td>搜索关键字。</td>
  </tr>
  <tr>
    <td>page</td>
    <td>Int</td>
    <td>是</td>
    <td>第几页，从 1 开始。</td>
  </tr>
  <tr>
    <td>filter</td>
    <td>Array of Int</td>
    <td>否</td>
    <td>过滤选项。<ul><li>1：过滤不包含词曲权限的歌曲</li><li>2：过滤歌名带“纯音乐”的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲</li></ul></td>
  </tr>
</tbody></table>

**params 示例**

```json
{
    "vendor_id": 0,
    "keyword": "string",
    "page": 1,
    "filter": [1]
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ songs | Array of Object | 歌曲列表，详情可查看[songs](/online-ktv-rn/client-api/send-extended-request#songs-3)。 |

##### songs

| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| song_name | String | 歌曲名。 |
| singer_id | String | 歌手 ID。 |
| singer_name | String | 歌手名。 |
| singer_img | String | 歌手头像。 |
| album_id | String | 歌曲所属专辑 ID。 |
| album_name | String | 歌曲所属专辑名。 |
| album_img | String | 专辑封面。 |
| album_img_mini | String | 专辑封面 100px 左右。 |
| album_img_small | String | 专辑封面 300px 左右。 |
| album_img_medium | String | 专辑封面 500px 左右。 |
| duration | Int | 歌曲时长，单位：毫秒。 |
| accompany_duration | Int | 伴奏时长，单位：毫秒。 |
| vendor_id | Int | 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |
| pitch_ability | Int | 是否具有音高线。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| has_short_segment | Int | 是否具有短分片高潮片段资源。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| copyright | Object | 版权信息。 |
| └ song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ channel | Int | 歌曲渠道。<ul><li>若 channel 为其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></li></ul> |

**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "songs": [
            {
                "song_id": "string",
                "song_name": "string",
                "singer_id": "string",
                "singer_name": "string",
                "singer_img": "string",
                "album_id": "string",
                "album_name": "string",
                "album_img": "string",
                "album_img_mini": "string",
                "album_img_small": "string",
                "album_img_medium": "string",
                "duration": 0,
                "vendor_id": 2, // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "pitch_ability": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "has_short_segment": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "copyright": {
                    "song_lyric": 0,
                    "recording": 1,
                    "channel": 0
                }
            }
        ]
    }
}
```

## 搜索多版权方的歌曲

通过输入关键词搜索歌曲，同时在多家版权方曲库中搜索查询，支持对搜索结果筛选、排序、自定义展示等。搜索结果包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息、以及是否有伴奏等。


#### 请求参数

**command 参数**

`"/search/plus"`     // 扩展请求类型，字符串

**params 参数**

<table>
   <colgroup>
    <col width="20%"/>
    <col width="20%"/>
    <col width="20%"/>
    <col width="40%"/>
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>keyword</td>
    <td>String</td>
    <td>是</td>
    <td>搜索关键字。</td>
  </tr>
  <tr>
    <td>page</td>
    <td>Int</td>
    <td>是</td>
    <td>第几页，从 1 开始。</td>
  </tr>
  <tr>
    <td>filter</td>
    <td>Array of Int</td>
    <td>否</td>
    <td><p>过滤选项。</p><ul><li>1：过滤不包含词曲权限的歌曲</li><li>2：过滤歌名带“纯音乐”的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲，仅在 vendor_id 为 0（默认）或 1 时支持该取值。</li></ul></td>
  </tr>
  <tr>
    <td>vendors_id</td>
    <td>Array of Int</td>
    <td>否</td>
    <td>需要进行搜索的版权方 ID 列表。<b>默认支持搜索所有的版权方。</b><br/>版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>keep_vendor</td>
    <td>Int</td>
    <td>否</td>
    <td>同一歌曲在多个版权方都存在资源时，在搜索结果中指定保留的版权方 ID。<br/>版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>items</td>
    <td>Array of Int</td>
    <td>否</td>
    <td>版权方条目，对应 vendors_id 参数中的各个版权方的展示条目，<b>默认每个版权方各取一条展示。</b></td>
  </tr>
</tbody></table>

<Warning title="注意">如果您填写了 vendors_id 和 items 参数（不使用默认配置），请注意确保 vendors_id 中的版权方和 items 中的版权方条目是一一对应的，否则调用本接口将会出错。</Warning>

**params 示例**

```json
{
    "keyword": "string",
    "page": 1,
    "filter": [1],
    "vendors_id": [1, 2],
    "keep_vendor": 1,
    "items": [1,2]
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ songs | Array of Object | 歌曲列表，详情可查看[songs](/online-ktv-rn/client-api/send-extended-request#songs-4)。 |
##### songs
| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| song_name | String | 歌曲名。 |
| singer_id | String | 歌手 ID。 |
| singer_name | String | 歌手名。 |
| singer_img | String | 歌手头像。 |
| album_id | String | 歌曲所属专辑 ID。 |
| album_name | String | 歌曲所属专辑名。 |
| album_img | String | 专辑封面。 |
| album_img_mini | String | 专辑封面 100px 左右。 |
| album_img_small | String | 专辑封面 300px 左右。 |
| album_img_medium | String | 专辑封面 500px 左右。 |
| duration | Int | 歌曲时长，单位：毫秒。 |
| vendor_id | Int | 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |
| pitch_ability | Int | 是否具有音高线。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| has_short_segment | Int | 是否具有短分片高潮片段资源。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| copyright | Object | 版权信息。 |
| └ song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ channel | Int | 歌曲渠道。<ul><li>若 channel 为 其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></Frame></li></ul> |

**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "songs": [
            {
                "song_id": "string",
                "song_name": "string",
                "singer_id": "string",
                "singer_name": "string",
                "singer_img": "string",
                "album_id": "string",
                "album_name": "string",
                "album_img": "string",
                "album_img_mini": "string",
                "album_img_small": "string",
                "album_img_medium": "string",
                "duration": 0,
                "vendor_id": 2, // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "pitch_ability": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "has_short_segment": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "copyright": {
                    "song_lyric": 0,
                    "recording": 1,
                    "channel": 0
                }
            }
        ]
    }
}
```

## 获取榜单歌曲

通过榜单 ID 获取榜单歌曲，包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息、以及是否有伴奏等。

<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）”、“1” 或 “2” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/top/song"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" / >
    <col width="40%" / >
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>top_id</td>
    <td>String</td>
    <td>是</td>
    <td><p>榜单 ID。</p><ul><li>版权方 VendorId 为 “0（默认）” 或 “1” 时，对应榜单 ID 如下：<ul><li>6666：最新飙升</li><li>8888：热歌推荐</li><li>23784：网络红歌</li><li>24971：动感 DJ</li></ul></li><li>版权方 VendorId 为 “2” 时，对应榜单 ID 如下：<ul><li>22004：大众流行（K 歌场景）</li><li>22005：经典金曲（K 歌场景）</li><li>22006：甜蜜情歌（通用场景）</li><li>22007：甜蜜情歌（K 歌场景）</li><li>22008：甜蜜情歌（听歌场景）</li><li>22009：伤感情歌（通用场景）</li><li>22010：伤感情歌（K 歌场景）</li><li>22011：伤感情歌（听歌场景）</li><li>22015：90&00 后（通用场景）</li><li>22016：90&00 后（K 歌场景）</li><li>22017：90&00 后（听歌场景）</li><li>22018：70&80 后（通用场景）</li><li>22019：70&80 后（K 歌场景）</li><li>22020：70&80 后（听歌场景）</li><li>22026：情歌对唱（K 歌场景）</li></ul></li></ul></td>
  </tr>
  <tr>
    <td>page</td>
    <td>Int</td>
    <td>是</td>
    <td>第几页，从 1 开始。</td>
  </tr>
  <tr>
    <td>filter</td>
    <td>Array of Int</td>
    <td>否</td>
    <td>过滤选项。<ul><li>1：过滤不包含词曲权限的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲</li></ul></td>
  </tr>
</tbody></table>

**params 示例**

```json
{
    "vendor_id": 0,
    "top_id": "8888",
    "page": 1,
    "filter": [1]
}
```

#### 回调结果
| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ songs | Array of Object | 歌曲列表，详情可查看[songs](/online-ktv-rn/client-api/send-extended-request#songs-5)。 |

##### songs

| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| song_name | String | 歌曲名。 |
| singer_id | String | 歌手 ID。 |
| singer_name | String | 歌手名。 |
| singer_img | String | 歌手头像。 |
| album_id | String | 歌曲所属专辑 ID。 |
| album_name | String | 歌曲所属专辑名。 |
| album_img | String | 专辑封面。 |
| album_img_mini | String | 专辑封面 100px 左右。 |
| album_img_small | String | 专辑封面 300px 左右。 |
| album_img_medium | String | 专辑封面 500px 左右。 |
| duration | Int | 歌曲时长，单位：毫秒。 |
| accompany_duration | Int | 伴奏时长，单位：毫秒。 |
| vendor_id | Int | 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。 |
| pitch_ability | Int | 是否具有音高线。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| has_short_segment | Int | 是否具有短分片高潮片段资源。<ul><li>1：有。</li><li>2：没有。</li></ul><b>仅当 vendor_id 为 2 时，才会返回此字段。</b> |
| copyright | Object | 版权信息。 |
| └ song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| └ channel | Int | 歌曲渠道。<ul><li>若 channel 为其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></li></ul> |

**回调示例**

```json
{
    "code": 0,
    "message": "string",
    "request_id": "string",
    "data": {
        "songs": [
            {
                "song_id": "string",
                "song_name": "string",
                "singer_id": "string",
                "singer_name": "string",
                "singer_img": "string",
                "album_id": "string",
                "album_name": "string",
                "album_img": "string",
                "album_img_mini": "string",
                "album_img_small": "string",
                "album_img_medium": "string",
                "duration": int,
                "vendor_id": 2, // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "pitch_ability": 1, //仅当 vendor_id 为 2 时，才会返回此字段
                "copyright": {
                    "song_lyric": 0,
                    "recording": 0,
                    "channel": 0
                }
            }
        ]
    }
}
```

## 查询歌曲的版权信息

查询歌曲的版权信息，包含词曲伴奏版权、录音版权、及歌曲渠道。
 
<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）” 或 “1” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/song/copyright"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>songs_id[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td>歌曲 ID 列表，最多支持 20 个。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "songs_id": [
        "28466292",
        "287915293",
        "257333192"
    ]
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ copyright | Array of JSON | 版权列表，详情见[copyright](/online-ktv-rn/client-api/send-extended-request#copyright)。 |

##### copyright

| 参数 | 类型 | 描述 |
|------|------|------|
| song_id | String | 歌曲 ID。 |
| right | Int | 总版权，子版权任意一个有版权则为 1。<ul><li>0：无</li><li>1：有</li></ul> |
| └ subright | Object | 子版权，详情见[subright](/online-ktv-rn/client-api/send-extended-request#subright)。 |

##### subright

| 参数 | 类型 | 描述 |
|------|------|------|
| song_lyric | Int | 是否有词曲伴奏版权，可以通过 requestAccompaniment 拿到伴奏资源。<ul><li>0：否</li><li>1：是</li></ul> |
| recording | Int | 是否有歌曲录音版权，可以通过 requestSong 拿到歌曲资源。<ul><li>0：否</li><li>1：是</li></ul> |
| channel | Int | 歌曲渠道。<ul><li>若 channel 为其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></li></ul> |

**回调示例**

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "copyright": [
      {
        "right": 1,
        "song_id": "string",
        "subright": {
          "song_lyric": 0,
          "recording": 1,
          "channel": 0
        }
      },
      {
        "right": 1,
        "song_id": "string",
        "subright": {
          "song_lyric": 1,
          "recording": 1,
          "channel": 0
        }
      },
      {
        "right": 1,
        "song_id": "string",
        "subright": {
          "song_lyric": 1,
          "recording": 1,
          "channel": 0
        }
      }
    ]
  }
}
```

## 获取歌词分片

当多人合唱一首歌曲时，将一首歌中的歌词打上标签（如增加颜色区分），分成不同的歌词片段。因为每段歌词对应着相应的歌曲/伴奏片段，所以每个人可以选择不同的歌词片段进行演唱。

<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）” 或 “1” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/song/accompany/krc/segment"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>song_id</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "song_id": "28466292"
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。 |
| request_id | String | 请求 ID。 |
| data | Object | 响应数据。 |
| └ tags | Array of Object | 第 N 个人唱或多个人唱。，详情见[tags](/online-ktv-rn/client-api/send-extended-request#tags)。 |

##### tags

| 参数 | 类型 | 描述 |
|------|------|------|
| end | Int | 结束时间，单位为毫秒，以完整歌曲开始播放的时间为准。 |
| start | Int | 开始时间，单位为毫秒，以完整歌曲开始播放的时间为准。 |
| tags | Array of String | 标签。 |

**回调示例**

```json
{
  "code": 0,
  "message": "succeed",
  "request_id": "6f92edae-5cfa-4caa-9dd1-584c613671d3",
  "data": {
    "tags": [
      {
        "end": 21660,
        "start": 510,
        "tags": [
          "1"
        ]
      },
      {
        "end": 32600,
        "start": 21660,
        "tags": [
          "2"
        ]
      },
      {
        "end": 43730,
        "start": 32600,
        "tags": [
          "1"
        ]
      },
      {
        "end": 54210,
        "start": 43730,
        "tags": [
          "2"
        ]
      }
    ]
  }
}
```


## 获取伴奏高潮时间点

通过获取伴奏高潮时间点，可以标示出一首伴奏中高潮片段的时间节点。

#### 请求参数

**command 参数**

`"/song/accompany/clip_info"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>song_id</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "song_id": "28466292"
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。|
| request_id | String | 请求 ID。|
| data | Object | 响应数据。|
| └ segment_begin | Int | 高潮开始时间，单位：毫秒。**仅当 vendor_id 为 0 或 1 时，此字段的返回值才有实际意义。** |
| └ segment_end | Int | 高潮结束时间，单位：毫秒。**仅当 vendor_id 为 0 或 1 时，此字段的返回值才有实际意义。** |  
| └ short_segment_begin | Int | 高潮片段资源短分片的开始时间，单位：毫秒。**仅当 vendor_id 为 2 时，此字段的返回值才有实际意义。** |
| └ short_segment_end | Int | 高潮片段资源短分片的结束时间，单位：毫秒。**仅当 vendor_id 为 2 时，此字段的返回值才有实际意义。** |

**回调示例**

```json
{
    "code": 0,
    "message": "succeed",
    "request_id": "8857e1e1-63c3-4dc4-837a-90919cbbf91e",
    "data": {
        "segment_begin": 0,
        "segment_end": 0,
        "short_segment_begin": 77059,
        "short_segment_end": 103955
    }
}
```


## 判断是否存在伴奏高潮片段

通过判断是否存在伴奏高潮片段，可以知道该伴奏是否具有高潮片段资源。

<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）”、“1” 或 “2” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/song/accompany/clip_url/status"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>song_id</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "song_id": "28466292"
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。|
| request_id | String | 请求 ID。|
| data | Object | 响应数据。|
| └ has_clip_url | Int | 是否具有长分片高潮片段资源。<ul><li>0：否</li><li>1：是</li></ul>**vendor_id 为 2 时，不会返回此字段。** |
| └ has_short_segment_url | Int | 是否具有短分片高潮片段资源。<ul><li>0：没有</li><li>1：有</li></ul>**仅当 vendor_id 为 2 时，才会返回此字段。** |

**回调示例**

```json
{
    "code": 0,
    "message": "succeed",
    "request_id": "16e5b05a-a189-49e6-9bc9-805dee58af79",
    "data": {
        "has_clip_url": 1,
        "has_short_segment_url": 1
    }
}
```



## 获取歌曲附加信息

通过获取歌曲附加信息，可以知道该歌曲的节拍数、节拍类型、以及所属流派信息。

<Warning title="注意">仅当传入的版权方 vendor_id 为 “0（默认）” 或 “1” 时，才能使用本扩展请求；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。</Warning>

#### 请求参数

**command 参数**

`"/song/extra"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="20%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>song_id</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "song_id": "28466292"
}
```

#### 回调结果

| 参数 | 类型 | 描述 |
|------|------|------|
| code | Int | 返回码，具体请参见 <a target="_blank" href="/real-time-video-ios-oc/client-sdk/error-code">错误码</a>，如查询不到可联系 ZEGO 技术支持。 |
| message | String | 操作结果描述。|
| request_id | String | 请求 ID。|
| data | Object | 响应数据。|
| └ bpm | Int | 歌曲节拍数。|
| └ bpm_type | String | 节拍类型。<ul><li>0：未知</li><li>1：慢</li><li>2：中</li><li>3：快</li></ul>|
| └ genres | Array of Int | 歌曲流派，一首歌曲可能属于多个流派。<ul><li>1：ACG</li><li>2：DJ</li><li>3：R&B</li><li>4：世界音乐</li><li>5：中国特色音乐</li><li>6：乡村音乐</li><li>7：儿童</li><li>8：其他</li><li>9：古典音乐</li><li>10：另类/独立</li><li>11：嘻哈</li><li>12：国风音乐</li><li>13：实验音乐</li><li>14：工业&哥特</li><li>15：布鲁斯</li><li>16：拉丁</li><li>17：摇滚</li><li>18：朋克</li><li>19：民谣</li><li>20：流行</li><li>21：爵士乐</li><li>22：电子</li><li>23：纯音乐</li><li>24：舞曲</li><li>25：金属</li><li>26：雷鬼</li><li>27：潮玩</li></ul>|

**回调示例**

```json
{
    "code": 0,
    "message": "succeed",
    "request_id": "3d0409a2-6462-4bd1-9b4e-b2180c3e2209",
    "data": {
        "bpm": 130,
        "bpm_type": "3",
        "genres": [
            5
        ]
    }
}
```
## 获取伴奏的前奏结束时间

获取伴奏的前奏结束时间，用户可获取该时间跳过前奏。

<Warning title="注意">需在获取伴奏资源**成功**且获取音高线**成功**后，再调用此扩展协议。</Warning>

#### 请求参数

**command 参数**

`"/api/get_prelude_end_time"`     // 扩展请求类型，字符串

**params 参数**

<table>
  <colgroup>
    <col width="20%"/>
    <col width="20%"/>
    <col width="20%"/>
    <col width="40%"/>
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必须</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>vendor_id</td>
    <td>Int</td>
    <td>否</td>
    <td>版权方 ID。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>resource_id</td>
    <td>String</td>
    <td>是</td>
    <td>资源 ID。</td>
  </tr>
</tbody></table>


**params 示例**

```json
{
    "vendor_id": 0,
    "resource_id": "z_28466292_2"
}
```

#### 回调结果

<table>
  <colgroup>
    <col width="30%"/>
    <col width="30%"/>
    <col width="40%"/>
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>prelude_end_time</td>
    <td>Int</td>
    <td>伴奏的前奏结束时间(单位 ms)。</td>
  </tr>
</tbody></table>

**回调示例**

```json
{
    "prelude_end_time": 0
}
```
<Content />
