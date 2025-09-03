# 搜索多版权方的歌曲

- - -

## 描述

通过输入关键词搜索歌曲，同时在多家版权方曲库中搜索查询，支持对搜索结果筛选、排序等。搜索结果包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息、以及是否有伴奏等。

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=QuerySongPlus`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>Keyword</td>
<td>String</td>
<td>是</td>
<td>关键词。</td>
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
<td><p>过滤选项。</p><ul><li>1：过滤不包含词曲权限的歌曲</li><li>2：过滤歌名带“纯音乐”的歌曲</li><li>3：过滤没有逐字歌词的歌曲</li><li>4：过滤没有音高线的歌曲，仅在 VendorID 为 0（默认）或 1 时支持该取值。</li></ul></td>
</tr>
<tr>
<td>VendorsId[]</td>
<td>Array of Number</td>
<td>否</td>
<td><p>需要进行搜索的版权方 ID 列表。<b>默认支持搜索所有的版权方。</b></p><p>版权方的详细信息，请联系 ZEGO 商务人员咨询。</p></td>
</tr>
<tr>
<td>KeepVendor</td>
<td>Number</td>
<td>否</td>
<td><p>同一歌曲在多个版权方都存在资源时，在搜索结果中指定保留的版权方 ID。</p><p>版权方的详细信息，请联系 ZEGO 商务人员咨询。</p></td>
</tr>
<tr>
<td>Items[]</td>
<td>Array of Number</td>
<td>否</td>
<td>版权方条目，对应 VendorsId[] 参数中的各个版权方的展示条目，<b>默认每个版权方各取一条展示。</b></td>
</tr>
</tbody></table>

<Warning title="注意">


如果您填写了 VendorsId[] 和 Items[] 参数（不使用默认配置），请注意确保 VendorsId[] 中的版权方和 Items[] 中的版权方条目是一一对应的，否则调用本接口将会出错。 
</Warning>


## 请求示例

```
https://ktv-api.zego.im/?Action=QuerySongPlus
&Keyword=我和我的祖国
&Page=1
&Filter[]=1
&VendorsId[]=1
&VendorsId[]=2
&KeepVendor=1
&Items[]=1
&Items[]=2
&<公共请求参数>
```

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
    <td>Array of JSON</td>
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
    <td>SongId</td>
    <td>String</td>
    <td>歌曲 ID。</td>
  </tr>
  <tr>
    <td>SongName</td>
    <td>String</td>
    <td>歌曲名。</td>
  </tr>
  <tr>
    <td>SingerId</td>
    <td>String</td>
    <td>歌手 ID。</td>
  </tr>
  <tr>
    <td>SingerName</td>
    <td>String</td>
    <td>歌手名。</td>
  </tr>
  <tr>
    <td>SingerImg</td>
    <td>String</td>
    <td>歌手头像。</td>
  </tr>
  <tr>
    <td>AlbumId</td>
    <td>String</td>
    <td>歌曲所属专辑 ID。</td>
  </tr>
  <tr>
    <td>AlbumName</td>
    <td>String</td>
    <td>歌曲所属专辑名。</td>
  </tr>
  <tr>
    <td>AlbumImg</td>
    <td>String</td>
    <td>专辑封面。</td>
  </tr>
  <tr>
    <td>AlbumImgMini</td>
    <td>String</td>
    <td>专辑封面 100px 左右。</td>
  </tr>
  <tr>
    <td>AlbumImgSmall</td>
    <td>String</td>
    <td>专辑封面 300px 左右。</td>
  </tr>
  <tr>
    <td>AlbumImgMedium</td>
    <td>String</td>
    <td>专辑封面 500px 左右。</td>
  </tr>
  <tr>
    <td>Duration</td>
    <td>Number</td>
    <td>歌曲时长，单位：毫秒。</td>
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
    <td>HasShortSegment</td>
    <td>Number</td>
    <td>是否具有短分片高潮片段资源。<ul><li>1：有</li><li>2：没有</li></ul><p><b>仅当 VendorId 为 2 时，才会返回此字段。</b></p></td>
  </tr>
  <tr>
    <td>Copyright</td>
    <td>Object</td>
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
    <td>是否有词曲版权，可以唱。<ul><li>0：否</li><li>1：是</li></ul></td>
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
                "SingerImg": "http://xxx.xxx.xxx/uploadpic/softhead/150/20210506/20210506171823975.jpg",
                "AlbumId": "123",
                "AlbumImg": "http://xxx.xxx.xxx/stdmusic/150/20150719/20150719001841825066.jpg",
                "AlbumImgMini": "http://xxx.xxx.xxx/stdmusic/150/20150719/20150719001841825066.jpg",
                "AlbumImgSmall": "http://xxx.xxx.xxx/stdmusic/240/20150719/20150719001841825066.jpg",
                "AlbumImgMedium": "http://xxx.xxx.xxx/stdmusic/480/20150719/20150719001841825066.jpg",
                "SongId": "40282741",
                "SongName": "我和我的祖国",
                "SingerId": "2345",
                "SingerName": "韩红",
                "AlbumName": "红歌②",
                "Duration": 250000,
                "VendorId": 2,  // 歌曲的版权方。版权方的详细信息，请联系 ZEGO 商务人员咨询
                "PitchAbility": 1, //仅当 VendorId 为 2 时，才会返回此字段
                "HasShortSegment": 1, //仅当 VendorId 为 2 时，才会返回此字段
                "Copyright": {
                    "SongLyric": 0,
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
