# 根据标签获取歌曲

- - -

## 描述

本接口调用需通过 [获取标签列表](/online-ktv-server/describe-tags) 中的标签 ID，可获取对应的歌曲 ID、歌曲名、歌曲专辑、以及版权相关信息等。

<Note title="说明">

相比原有 [歌单](https://doc-zh.zego.im/article/13719) 接口，本接口歌曲资源更丰富，且支持动态更新。因此，ZEGO 推荐开发者使用本接口获得歌曲列表相关内容。
</Note>

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=DescribeTagSongs`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
在线 KTV 服务端接口的公共请求参数与实时音视频、实时语音的不同，包含了 VendorId（版权方 ID），请务必阅读上述参考文档。
</Note>

<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>TagId</td>
<td>String</td>
<td>是</td>
<td>标签 ID，通过 [获取标签列表](/online-ktv-server/describe-tags) 接口获取。</td>
</tr>
<tr>
<td>Page</td>
<td>Number</td>
<td>是</td>
<td>第几页，从 1 开始。</td>
</tr>
<tr>
<td>Filter[]</td>
<td>Array of Number</td>
<td>否</td>
<td>过滤选项。<ul><li>1：过滤不包含词曲版权的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲</li></ul></td>
</tr>
</tbody></table>



## 请求示例

```
https://ktv-api.zego.im/?Action=DescribeTagSongs
&TagId=1107
&Page=1
&Filter[]=1
&Filter[]=3
&<公共请求参数>
```

以上示例表示：根据标签 ID 是 1107，通过过滤选项 1 和 3，筛选出有词曲版权且含有歌词的歌曲，展示列表第一页的内容。


## 响应参数


<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>Code</td>
    <td>Number</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>请求结果的说明信息。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应结果，详情可见 [Data](#data)。</td>
  </tr>
</tbody></table>

##### Data
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>Songs</td>
    <td>Array of Object</td>
    <td>歌曲列表，详情可见 [Songs](#songs)。</td>
  </tr>
</tbody></table>

##### Songs
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td> SongId </td>
    <td> String </td>
    <td>歌曲 ID。</td>
  </tr>
  <tr>
    <td> SongName </td>
    <td> String </td>
    <td>歌曲名。</td>
  </tr>
  <tr>
    <td> SingerName </td>
    <td> String </td>
    <td>歌手名。</td>
  </tr>
  <tr>
    <td> SingerImg </td>
    <td> String </td>
    <td>歌手头像。</td>
  </tr>
  <tr>
    <td> AlbumName </td>
    <td> String </td>
    <td>歌曲所属专辑名。</td>
  </tr>
  <tr>
    <td> AlbumImg </td>
    <td> String </td>
    <td>专辑封面。</td>
  </tr>
  <tr>
    <td> AlbumImgMini </td>
    <td> String </td>
    <td>专辑封面 100px 左右。</td>
  </tr>
  <tr>
    <td> AlbumImgSmall </td>
    <td> String </td>
    <td>专辑封面 300px 左右。</td>
  </tr>
  <tr>
    <td> AlbumImgMedium </td>
    <td> String </td>
    <td>专辑封面 500px 左右。</td>
  </tr>
  <tr>
    <td>Duration</td>
    <td>Number</td>
    <td>歌曲时长，单位：毫秒。</td>
  </tr>
  <tr>
    <td>HasClip</td>
    <td>Number</td>
    <td>是否具有长分片高潮片段资源。<ul><li>0：否</li><li>1：是</li></ul><p><b>VendorId 为 2 时，不会返回此字段。</b></p></td>
  </tr>
  <tr>
    <td>VendorId</td>
    <td>Number</td>
    <td>歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询。</td>
  </tr>
  <tr>
    <td>PitchAbility</td>
    <td>Number</td>
    <td>是否具有音高线。<ul><li>1：有</li><li>2：没有</li></ul><p><b>仅当 VendorId 为 2 时，才会返回此字段。</b></p></td>
  </tr>
  <tr>
    <td> Copyright </td>
    <td> Object </td>
    <td>版权信息，详情可见 [Copyright](#copyright)。</td>
  </tr>
</tbody></table>

##### Copyright
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>SongLyric</td>
    <td>Number</td>
    <td>是否有词曲版权，可以唱。一般有词曲版权则表示有录音版权。<ul><li>0：否</li><li>1：是</li></ul></td>
  </tr>
  <tr>
    <td>Recording</td>
    <td>Number</td>
    <td>是否有录音版权，可以播放。<ul><li>0：否</li><li>1：是</li></ul></td>
  </tr>
  <tr>
    <td>Channel</td>
    <td>Number</td>
    <td>歌曲渠道。<ul><li>若 channel 为 其他值，表示其他渠道歌曲。</li><li>若 channel 为 0，需要在 UI 界面展示 logo 标志。开发者可通过 <a href="https://artifact-sdk.zego.im/sdk-doc/doc/files/external/Yinsuda_logo.zip">本链接</a> 下载相关 logo 资源。UI 界面示例如下：<br /><Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Chart_songs.png" /></Frame></li></ul></td>
  </tr>
</tbody></table>



## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "1a6d02a8-66ba-455f-9e05-fe77da6a1f14",
    "Data": {
        "Songs": [
            {
                "SingerImg": "http://singerimg.kugou.com/uploadpic/softhead/150/20210107/20210107101003717.jpg",
                "AlbumImg": "http://imge.kugou.com/stdmusic/150/20160907/20160907184908526143.jpg",
                "AlbumImgMini": "http://imge.kugou.com/stdmusic/150/20160907/20160907184908526143.jpg",
                "AlbumImgSmall": "http://imge.kugou.com/stdmusic/240/20160907/20160907184908526143.jpg",
                "AlbumImgMedium": "http://imge.kugou.com/stdmusic/480/20160907/20160907184908526143.jpg",
                "SongId": "28341435",
                "SongName": "朋友的酒",
                "SingerName": "李晓杰",
                "AlbumName": "老大",
                "Duration": 250000,
                "HasClip": 1,
                "VendorId": 2,  // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "PitchAbility": 1, //仅当 VendorId 为 2 时，才会返回此字段
                "Copyright": {
                    "SongLyric": 1,
                    "Recording": 1,
                    "Channel": 0
                }
            }
        ]
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](/online-ktv-server/return-code)。

|返回码|说明|处理建议|
|-|-|-|
| 320000004 | 参数非法。 | 请根据 Message 提示判断非法参数，调整对应参数值。 |
| 320010000 | AppId 不可用 | 请联系 ZEGO 技术支持开通版权音乐服务。 |
| 320010001 | 不支持的付费类型。 | 请联系 ZEGO 技术支持开通版权音乐对应的付费类型。<ul><li>按次计费</li></ul>  |
| 320050000 | 系统错误。 | 请联系 ZEGO 技术支持。|
| 320050002 | 系统繁忙。 | 请稍后重试。|
| 320050003 | 未定义的引擎错误。 | 请联系 ZEGO 技术支持。|
| 320050004 | 引擎内部错误。 | 请联系 ZEGO 技术支持。|
