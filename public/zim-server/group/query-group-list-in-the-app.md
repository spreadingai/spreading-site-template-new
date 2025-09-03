
# 查询 App 下的群组列表

- - -

## 描述

获取 App 中所有群组的 ID。

<Warning title="注意">
获取的数据可能会存在最多 **1 分钟** 的延迟。
</Warning>

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=QueryAppGroupList`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>Limit</td>
<td>Number</td>
<td>否</td>
<td><p>单次获取群组 ID 的数量，取值范围为 [0, 10000]，即调用本接口一次最多返回 10000 个群组 ID。</p><p>当 App 内的群组数量存在超过 Limit 时，需调用多次本接口<strong>且 Limit 需保持一致</strong>。</p><p>如果传空或大于 10000，则默认取值为 10000。</p></td>
</tr>
<tr>
<td>Next</td>
<td>Number</td>
<td>否</td>
<td>分页拉取标志，第一次填 0，以后填上一次返回的值，返回的 Next 为 0 代表群列表获取完毕。
<p>例如，App 内有 25000 个群组，调用本接口查询群列表时：</p>
<ul><li>第一次调用本接口，Limit 填 10000，Next 填 0，查询第 1 ～ 10000 个群组；返回结果中的 Next 值为 1 </li><li>第二次调用本接口，Limit 填 10000，Next 填 1，查询第 10001 ～ 20000 名群组；返回结果中 Next 值为 2。</li><li>第三次调用本接口，Limit 填 10000，Next 填 2，查询第 20001 ～ 25000 名群组；查询完毕，返回结果中的 Next 为 0。</li></ul></td>
</tr>
</tbody></table>

## 请求示例

```json
https://zim-api.zego.im/?Action=QueryAppGroupList
&Limit=1000
&Next=0
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>请求结果的说明信息。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5">
<td>TotalCount</td>
<td>Number</td>
<td>App 当前的群组总数。</td>
</tr>
<tr data-row-level="6">
<td>Next</td>
<td>Number</td>
<td>分页拉取的标志。非 0 时表示列表查询未完。<Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>GroupIdList</td>
<td>Array of String</td>
<td>获取到的群组 ID 的集合。</td>
</tr>
<tr data-row-level="7-1">
<td>└GroupId</td>
<td>String</td>
<td>群组的 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└GroupName</td>
<td>String</td>
<td>群组名称。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
  "Code": 0,
  "Message": "success",
  "RequestId": "343649807833778782",
  "TotalCount": 1680,
  "Next": 168,
  "GroupIdList": [
    {
        "GroupId": "groupA",
        "GroupName": "groupNameA"
    },
    {
        "GroupId": "groupB",
        "GroupName": "groupNameB"
    }
  ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请参考 <a href="#请求参数">请求参数</a> 输入正确参数。</td>
</tr>
<tr>
<td>660600006</td>
<td>查询群列表数据出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600007</td>
<td>调用 QueryAppGroupList 接口的频率超出限制。</td>
<td>调用频率为 1 次/秒，请勿超出限制。</td>
</tr>
</tbody></table>
