# 发布日志

- - -

## 版权音乐功能重要更新（SDK）

<Warning title="注意">

请注意，本页面**仅更新与版权音乐 KTV 相关的发布日志**，如果您想要了解 Express SDK 的其它变更，请参考 [实时音视频 - 发布日志](/real-time-video-linux-cpp/client-sdk/release-notes)。
</Warning>

### 3.20.5 版本

**发布日期：2024-01-08** 

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
|--------|----------|----------|
| 版权音乐支持 Flutter Web | 支持开发者使用 Express Flutter SDK 开发 Web KTV 应用。 | [集成 SDK](/online-ktv-flutter/quick-starts/integrate-the-sdk/express-video) |

### 3.10.0 版本

**发布日期：2023-10-27** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|--------|----------|----------|
| 支持区分场景，获取不同歌曲资源 | 支持在 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口传入不同的场景 ID，获取不同的音乐资源，应用于直播、语聊等场景中。 | [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) |

**改进优化**

| 优化项 | 优化描述 | 相关接口 |
|--------|----------|----------|
| 优化错误码提示 | 新增 1017071、1017072、1017073、1017074、1017075、1017076、1017077 等错误码，细化版权音乐的错误提示信息。 | [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) |

**修复问题**

**1. 修复获取总分、平均分失败的问题**

**2. 修复 KTV 场景中出现打分结果延迟更新的问题**

---

### 3.4.2 版本

**发布日期：2023-04-26** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|--------|----------|----------|
| 版权内容中心新增音乐版权方歌曲资源 | 支持在相关接口的参数 vendorID 中传入不同的版权方取值，进行点歌、获取歌词等操作。**版权方的详细信息，请联系 ZEGO 商务人员咨询。** | <ul><li>[requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html)</li><li>[getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html)</li></ul> |
| 扩展歌曲打分能力支持范围 | 支持多个版权方歌曲的打分、展示音高线的能力，详细信息，请联系 ZEGO 商务人员咨询。 | [发送扩展请求接口说明](/online-ktv-flutter/client-api/send-extended-request) |
| 支持在多房间模式下使用版权音乐 | 通过在"点歌"和"获取分享资源"的接口中加入 roomID 参数，实现版权音乐在多房间模式下的使用。 | <ul><li>[requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html)</li><li>[getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html)</li></ul> |
| 支持歌曲聚合搜索 | 支持通过输入歌手、歌名等关键字，同时在多家版权方曲库中搜索查询，支持对搜索结果筛选、排序、自定义展示。 | <ul><li>[sendExtendedRequest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html)</li><li>[发送扩展请求接口说明](/online-ktv-flutter/client-api/send-extended-request)</li><li>[搜索多版权方的歌曲](/online-ktv-server/query-song-plus)</li></ul> |
| 扩展获取到的歌曲资源信息 | 支持通过 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口获取 songID 对应歌曲的"抢唱片段"的开始与结束时间等信息，其他用户可以通过 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 接口获取分享的信息。**该功能仅支持部分版权方使用，请联系 ZEGO 商务人员咨询。** | <ul><li>[requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html)</li><li>[getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html)</li></ul> |
| 新增计费模式 | 新增计费模式，按房主包月计费，请联系 ZEGO 商务人员咨询。 | - |

**改进优化**

| 优化项 | 优化描述 | 相关接口 |
|--------|----------|----------|
| 优化错误码提示 | 由于歌曲资源存在有效期限制，获取歌曲资源接口，新增返回 1008011 错误码，表示歌曲资源已失效。 | [loadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadCopyrightedMusicResourceWithPosition.html) |

**接口变更**

- **修改接口**

| 修改接口 | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [ZegoCopyrightedMusicVendorID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicVendorID.html) |  新增一个音乐版权方的枚举值，请联系 ZEGO 商务人员咨询。  | 3.4.2 |



---


### 3.3.0 版本

**发布日期：2023-03-20** 

**新增功能**

<table>
<tbody><tr>
<th>功能项</th>
<th>功能描述</th>
<th>相关接口</th>
</tr>
<tr>
<td rowspan="2">新增版权内容中心，部分接口支持区分版权方查询</td>
<td><p>支持根据版权方，点歌、获取逐行解析歌词、以及查询资源是否有缓存。</p><p><b>版权方的详细信息，请联系 ZEGO 商务人员咨询。</b></p></td>
<td><ul><li><a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html">requestResource</a></li><li><a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getLrcLyric.html">getLrcLyric</a></li><li><a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/queryCache.html">queryCache</a></li><li><a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html">getSharedResource</a></li></ul></td>
</tr>
<tr>
<td>发送扩展请求时，支持根据版权方，获取标签列表、根据标签获取歌曲、批量查询歌曲信息、搜索歌曲。</td>
<td><ul><li><a href="https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/sendExtendedRequest.html">sendExtendedRequest</a></li><li><a href="/online-ktv-flutter/client-api/send-extended-request">发送扩展请求接口说明</a></li></ul></td>
</tr>
</tbody></table>

**接口变更**

- **修改接口**

| 修改接口 | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [getLrcLyric](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getLrcLyric.html) 新增 vendorID 可选参数 |  新增 vendorID 可选参数，支持开发者按照不同的音乐版权方，获取对应 vendorID 的逐行歌词。  | 3.3.0 |
| [queryCache](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/queryCache.html) 新增 vendorID 可选参数 |  新增 vendorID 可选参数，支持开发者按照不同的音乐版权方，查询不同版权方的音乐资源是否有缓存。  | 3.3.0 |
| [ZegoCopyrightedMusicRequestConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicRequestConfig-class.html) 新增 vendorID 属性 |  支持通过版权方，获取资源。  | 3.3.0 |
| [ZegoCopyrightedMusicGetSharedConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetSharedConfig-class.html) 新增 vendorID 属性 |  支持在分享资源时，配置版权方。  | 3.3.0 |


**修复问题**

**1. 修复了获取歌曲伴奏资源、或高潮片段资源时，立即获取音高线会失败的问题**

---


### 3.1.0 版本

**发布日期： 2022-12-27** 

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
|伴奏打分|支持获取伴奏或高潮片段资源的满分。|[getFullScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getFullScore.html)|

**修复问题**

**1. 修改了播放版权音乐时，音频观察器抛出 playback、 mix pcm 音频数据的问题**

**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 上线版本 |
| -------- | ------- | ----- |
| [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) | 获取音乐资源（包括原曲、伴奏、伴奏高潮片段）。 | 3.1.0 |
| [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) | 获取被分享的歌曲资源。 | 3.1.0 |

- **废弃接口**

| 废弃接口 | 变更说明 | 废弃版本 |
| -------- | ------- | ----- |
| <ul><li>[requestSong](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestSong.html)</li><li>[requestAccompaniment](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestAccompaniment.html)</li><li>[requestAccompanimentClip](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestAccompanimentClip.html)</li></ul> | 废弃点歌 [requestsong](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestSong.html)、点伴奏 [requestAccompaniment](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestAccompaniment.html)、点伴奏高潮片段 [requestAccompanimentClip](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestAccompanimentClip.html) 3 个获取音乐资源接口，统一使用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口替代，获取音乐资源方式更规范便捷。 | 3.1.0 |
| [getMusicByToken](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getMusicByToken.html) | 原有的获取他人分享的歌曲或伴奏 [getMusicByToken](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getMusicByToken.html) 接口废弃，替换为 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 接口，不再需要使用 shareToken 分享音乐资源。 | 3.1.0 |
