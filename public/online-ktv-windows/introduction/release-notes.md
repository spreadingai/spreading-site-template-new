# 发布日志

- - -

## 版权音乐功能重要更新（SDK）

<Warning title="注意">

请注意，本页面**仅更新与版权音乐 KTV 相关的发布日志**，如果您想要了解 Express SDK 的其它变更，请参考 [实时音视频 - 发布日志](/real-time-video-windows-cpp/client-sdk/release-notes)。
</Warning>

### 3.19.0 版本

**发布日期：2025-01-21** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|-------|---------|----------|
| 独唱场景下支持动态响度均衡功能 | 开启动态响度均衡后，根据媒体播放器伴奏的实时表现，SDK 动态调整人声响度，使人声与伴奏响度时刻保持恰当比例，提升人声与伴奏融合度，观众体验更佳，适用于实时 KTV 的独唱场景。 | [enableAuxBgmBalance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-aux-bgm-balance) |

---

### 3.17.0 版本

**发布日期：2024-09-30** 

**修复问题**

**1. 修复版权音乐在开始打分时，可能出现崩溃的问题**

---

### 3.12.0 版本

**发布日期：2023-12-28** 

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
|-------|---------|----------|
| 支持版权音乐插件 | 支持版权音乐功能插件化，当开发者的业务场景仅需更新版权音乐相关的代码时，可以单独集成插件包，无需更新 Express SDK，即可平滑迁移。<Warning title="注意"><ul><li>如需使用该功能，请联系 ZEGO 技术支持。</li><li>版权音乐插件包无法单独使用，必须与 Express SDK 搭配使用。</li></ul></Warning> | [集成 SDK](/real-time-video-windows-cpp/quick-start/integrating-sdk) |

---

### 3.8.0 版本

**发布日期：2023-08-10** 

**修复问题**

**1. 修复获取总分、平均分失败的问题**

---

### 3.6.0 版本

**发布日期：2023-06-12** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|-------|---------|----------|
| 支持区分场景，获取不同歌曲资源 | 支持在 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) 接口传入不同的场景 ID，获取不同的音乐资源，应用于直播、语聊等场景中。 | [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) |

**改进优化**

| 优化项 | 优化描述 | 相关接口 |
|-------|---------|----------|
| 优化错误码提示 | 新增 1017071、1017072、1017073、1017074、1017075、1017076、1017077 等错误码，细化版权音乐的错误提示信息。 | [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) |

---

### 3.4.2 版本

**发布日期：2023-04-24** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|-------|---------|----------|
| 扩展获取到的歌曲资源信息 | <p>支持通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) 接口获取 songID 对应歌曲的"抢唱片段"的开始与结束时间等信息，其他用户可以通过 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 接口获取分享的信息。</p><p><b>该功能仅支持部分版权方使用，请联系 ZEGO 商务人员咨询。</b></p> | <ul><li>[requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource)</li><li>[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource)</li></ul> |
| 新增计费模式 | <p>新增计费模式，按房主包月计费，请联系 ZEGO 商务人员咨询。</p> | - |

---

### 3.4.0 版本

**发布日期：2023-04-14** 

**新增功能**

| 功能项 | 功能描述 | 相关接口 |
|-------|---------|----------|
| 版权内容中心新增音乐版权方歌曲资源 | <p>支持在相关接口的参数 vendorID 中传入不同的版权方取值，进行点歌、获取歌词等操作。</p><p><b>版权方的详细信息，请联系 ZEGO 商务人员咨询。</b></p> | <ul><li>[requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource)</li><li>[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource)</li></ul> |
| 扩展歌曲打分能力支持范围 | 支持多个版权方歌曲的打分、展示音高线的能力，详细信息，请联系 ZEGO 商务人员咨询。 | <a href="/online-ktv-windows/client-api/send-extended-request">发送扩展请求接口说明</a> |
| 支持在多房间模式下使用版权音乐 | 通过在"点歌"和"获取分享资源"的接口中加入 roomID 参数，实现版权音乐在多房间模式下的使用。 | <ul><li>[requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource)</li><li>[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource)</li></ul> |
| 支持歌曲聚合搜索 | 支持通过输入歌手、歌名等关键字，同时在多家版权方曲库中搜索查询，支持对搜索结果筛选、排序、自定义展示。 | <ul><li>[sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#send-extended-request)</li><li><a href="/online-ktv-windows/client-api/send-extended-request">发送扩展请求接口说明</a></li><li><a href="/online-ktv-server/query-song-plus">搜索多版权方的歌曲</a></li></ul> |

**改进优化**

| 优化项 | 优化描述 | 相关接口 |
|-------|---------|----------|
| 优化错误码提示 | 由于歌曲资源存在有效期限制，获取歌曲资源接口，新增返回 1008011 错误码，表示歌曲资源已失效。 | [loadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#load-copyrighted-music-resource-with-position) |

**接口变更**

- **修改接口**

| 修改接口 | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [ZegoCopyrightedMusicVendorID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoCopyrightedMusicVendorID) |  新增一个音乐版权方的枚举值，请联系 ZEGO 商务人员咨询。  | 3.4.0 |

---

### 3.2.1 版本

**发布日期：2023-02-23** 

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
<td><ul><li>[requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource)</li><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-lrc-lyric">getLrcLyric</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#query-cache">queryCache</a></li><li>[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource)</li></ul></td>
</tr>
<tr>
<td>发送扩展请求时，支持根据版权方，获取标签列表、根据标签获取歌曲、批量查询歌曲信息、搜索歌曲。</td>
<td><ul><li>[sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#send-extended-request)</li><li><a href="/online-ktv-windows/client-api/send-extended-request">发送扩展请求接口说明</a></li></ul></td>
</tr>
</tbody></table>

**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-lrc-lyric) |  新增“获取 lrc 格式歌词”接口，支持开发者按照不同的音乐版权方，获取对应 vendorID 的逐行歌词。  | 3.2.1 |
| [queryCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#query-cache) |  新增“查询资源是否有缓存”接口，支持开发者按照不同的音乐版权方，查询不同版权方的音乐资源是否有缓存。  | 3.2.1 |
| [ZegoCopyrightedMusicRequestConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoCopyrightedMusicRequestConfig) 新增 vendorID 属性 |  支持通过版权方，获取资源。  | 3.2.1 |
| [ZegoCopyrightedMusicGetSharedConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoCopyrightedMusicGetSharedConfig) 新增 vendorID 属性 |  支持在分享资源时，配置版权方。  | 3.2.1 |


- **废弃接口**

| 废弃接口 | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| `getLrcLyric` |  废弃原有的 `getLrcLyric` 接口，替换为同名的 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-lrc-lyric)，新接口包含 vendorID 版权方参数，开发者可以逐行解析并获取不同版权方的歌词。   | 3.2.1 |
| `queryCache` |  废弃原有的 `queryCache` 接口，替换为同名的 [queryCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#query-cache)，新接口包含 vendorID 版权方参数，开发者可以查询不同版权方的音乐资源是否有缓存。   | 3.2.1 |

**修复问题**

**1. 修复了获取歌曲伴奏资源、或高潮片段资源时，立即获取音高线会失败的问题**

---


### 3.0.3 版本

**发布日期： 2022-12-06** 

**修复问题**

**1. 修复了查询缓存错误的问题**

---

### 3.0.2 版本

**发布日期： 2022-11-16** 

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
|伴奏打分|支持获取伴奏或高潮片段资源的满分。|[getFullScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-full-score)|

**修复问题**

**1. 修改了播放版权音乐时，音频观察器抛出 playback、 mix pcm 音频数据的问题**

**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 上线版本 |
| -------- | ------- | ----- |
| [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) | 获取音乐资源（包括原曲、伴奏、伴奏高潮片段）。 | 3.0.2 |
| [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) | 获取被分享的歌曲资源。 | 3.0.2 |

- **废弃接口**

| 废弃接口 | 变更说明 | 废弃版本 |
| -------- | ------- | ----- |
| <ul><li>[requestsong](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-song)</li><li>[requestAccompaniment](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-accompaniment)</li><li>[requestAccompanimentClip](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-accompaniment-clip)</li></ul> | 废弃点歌 [requestsong](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-song)、点伴奏 [requestAccompaniment](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-accompaniment)、点伴奏高潮片段 [requestAccompanimentClip](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-accompaniment-clip) 3 个获取音乐资源接口，统一使用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) 接口替代，获取音乐资源方式更规范便捷。 | 3.0.2 |
| [getMusicByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-music-by-token) | 原有的获取他人分享的歌曲或伴奏 [getMusicByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-music-by-token) 接口废弃，替换为 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 接口，不再需要使用 shareToken 分享音乐资源。 | 3.0.2 |
