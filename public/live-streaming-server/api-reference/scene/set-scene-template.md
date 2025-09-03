# 场景模板配置

---

## 描述

Express 支持自定义场景模版配置，用于登录到对应配置的场景。
当系统预置的配置模板无法满足您的业务需求时，您可以通过该服务端 API 创建自定义模板，设置相关参数。

<Warning title="注意">



自定义模板上限为 50，如果您需要更多的模板数量，请联系 ZEGO 技术支持。

</Warning>





## 接口原型

- 请求方法：GET
- 请求地址：`metaworld-api.zego.im`
- Action：SetSceneTemplate
- 传输协议：HTTPS
- 调用频率限制：50


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<Note title="说明">

测试环境下（详见 <a target="_blank" href="/live-streaming-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），流 ID 需要加上 “zegotest-AppId-” 前缀。例如，流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。

</Note>



<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>AppId</td>
<td>Number</td>
<td>是</td>
<td>应用 AppID</td>
</tr>
<tr>
<td>TemplateId</td>
<td>Number</td>
<td>是</td>
<td>模板 ID</td>
</tr>
<tr>
<td>LeftBottomX</td>
<td>Number</td>
<td>否</td>
<td>地图左下角横坐标（见下图）</td>
</tr>
<tr>
<td>LeftBottomZ</td>
<td>Number</td>
<td>否</td>
<td>地图左下角纵坐标（见下图）</td>
</tr>
<tr>
<td>RightUpX</td>
<td>Number</td>
<td>否</td>
<td>地图右上角横坐标（见下图）</td>
</tr>
<tr>
<td>RightUpZ</td>
<td>Number</td>
<td>否</td>
<td>地图右上角纵坐标（见下图）</td>
</tr>
<tr>
<td>MaxUserNum</td>
<td>Number</td>
<td>是</td>
<td>场景人数上限<br />无限制，达到上限后，后续用户将登录失败</td>
</tr>
<tr>
<td>ViewRadius</td>
<td>Number</td>
<td>是</td>
<td>AOI 半径（用户视野半径）</td>
</tr>
<tr>
<td>MaxVisibleNum</td>
<td>Number</td>
<td>是</td>
<td>AOI 人数上限<br />本端用户的AOI范围内，可视远端用户数的上限，人数上限最多 100</td>
</tr>

</tbody></table>

```
                        -------------------------------------------(RightUpX, RightUpZ)
                        |	                                   |
                        |	                                   |
                        |	                                   |
                        |	                                   |
                        |	                                   |											                
(LeftBottomX, LeftBottomZ)------------------------------------------

```

<Warning title="注意">



模板配置更改后，正在使用该模板的场景不会立刻生效，需等待场景销毁后（场景中全部用户退出 10 分钟后，该场景会被自动销毁），重新创建才可生效。

</Warning>





## 请求示例

```
https://metaworld-api.zego.im/?Action=SetSceneTemplate&SignatureNonce=8cb67a4cd41df5dc&Timestamp=1670576924&Signature=a6da407f29dfab00c6aed21979634df8&SignatureVersion=2.0&IsTest=true&AppId=111111111&TemplateId=10080&ViewRadius=3&MaxUserNum=50000&MaxVisibleNum=50&MaxItemNum=100&MaxVisibleItemNum=10&MaxBindItemNum=3&MaxItemCapacity=5&LeftBottomX=0.00&LeftBottomZ=0.00&RightUpX=500.00&RightUpZ=500.00
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
<td>错误码</td>
</tr>
<tr>
<td>Message</td>
<td>String</td>
<td>错误信息描述</td>
</tr>
<tr>
<td>RequestId</td>
<td>String</td>
<td>请求 ID</td>
</tr>
<tr>
<td>Data</td>
<td>Object</td>
<td>返回数据内容</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "9f674801-69e9-463f-a966-1ba2c6b5dbbe",
    "Data": null
}
```


## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 340004003|  模版已存在。| 设置其他模版 ID。|
| 340006003|  参数错误。| 根据错误提示设置正确的请求参数。|
