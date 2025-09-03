# 获取歌曲的歌词

- - -

## 描述

通过歌曲 ID 获取歌曲的整首歌词。

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=DescribeSongLyric`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
在线 KTV 服务端接口的公共请求参数与实时音视频、实时语音的不同，包含了 VendorId（版权方 ID），请务必阅读上述参考文档。
</Note>

<table>
  
  <tbody>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>SongId</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>



## 请求示例

```
https://ktv-api.zego.im/?Action=DescribeSongLyric
&SongId=125282604
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
    <td>Lyric</td>
    <td>String</td>
    <td>歌词。</td>
  </tr>
</tbody></table>


## 响应示例

```
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "1a6d02a8-66ba-455f-9e05-fe77da6a1f14",
    "Data": {
        "Lyric": "•[id:$00000000]\r\n[ar:韩红]\r\n[ti:我和我的祖国]\r\n[by:]\r\n[hash:15568cf4d9db1faf260cf3a965017cd8]\r\n[al:]\r\n[sign:]\r\n[qq:]\r\n[total:248000]\r\n[offset:0]\r\n[00:00.77]韩红 - 我和我的祖国\r\n[00:03.25]作词：张藜\r\n[00:04.41]作曲：秦咏诚\r\n[00:24.67]我和我的祖国\r\n[00:30.07]一刻也不能分割\r\n[00:35.48]无论我走到哪里\r\n[00:41.00]都留下一首赞歌\r\n[00:46.40]我歌唱每一座高山\r\n[00:51.70]我歌唱每一条河\r\n[00:57.51]袅袅炊烟\r\n[00:59.89]小小村落\r\n[01:02.92]路上一道辙\r\n[01:09.07]我亲爱的祖国\r\n[01:15.64]我永远紧依着你的心窝\r\n[01:22.41]你用你那母亲的脉搏\r\n[01:27.87]和我诉说\r\n[01:58.18]我的祖国和我\r\n[02:03.28]像海和浪花一朵\r\n[02:08.89]浪是那海的赤子\r\n[02:14.25]海是那浪的依托\r\n[02:19.86]每当大海在微笑\r\n[02:25.12]我就是笑的旋涡\r\n[02:30.52]我分担着海的忧愁\r\n[02:36.09]分享海的欢乐\r\n[02:42.27]我亲爱的祖国\r\n[02:49.17]你是大海永不干涸\r\n[02:55.85]永远给我碧浪清波\r\n[03:01.40]心中的歌\r\n[03:07.60]我亲爱的祖国\r\n[03:14.23]你是大海永不干涸\r\n[03:21.16]永远给我碧浪清波心中的歌\r\n[03:32.48]永远给我碧浪清波心中的歌\r\n"
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
