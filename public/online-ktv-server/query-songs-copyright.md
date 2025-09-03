# 查询歌曲的版权信息

- - -

## 描述

查询歌曲的版权信息，包含词曲伴奏版权、录音版权、及歌曲渠道。

<Warning title="注意">
仅当传入的版权方 VendorId 为 “0（默认）” 或 “1” 时，才能使用本服务端接口；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。
</Warning>

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=QuerySongsCopyright`
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
    <td>SongsId[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td>歌曲 ID 列表，最多支持 20 个。</td>
  </tr>
</tbody></table>



## 请求示例

```
https://ktv-api.zego.im/?Action=QuerySongsCopyright
&SongsId[]=125282604
&SongsId[]=125282605
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
    <td>Copyright</td>
    <td>Array of JSON</td>
    <td>版权列表，详情可见 [Copyright](#copyright)。</td>
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
    <td>Subright</td>
    <td>Object</td>
    <td>子权限，详情可见 [Subright](#subright)。</td>
  </tr>
  <tr>
    <td>Right</td>
    <td>Number</td>
    <td>总权限，子权限任意一个有版权则为 1。<ul><li>0：无</li><li>1：有</li></ul></td>
  </tr>
  <tr>
    <td>SongId</td>
    <td>String</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>

##### Subright
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

```
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "0d119fdb-3f55-46a8-a169-9ed709307b17",
    "Data": {
        "Copyright": [
            {
                "Subright": {
                    "SongLyric": 0,
                    "Recording": 1,
                    "Channel": 0
                },
                "Right": 1,
                "SongId": "32593638"
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
