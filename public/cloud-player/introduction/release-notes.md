# 发布日志

- - -

## 2025 年 07 月

<table>
  <tbody>
    <tr>
      <th width="20%">发布事项</th>
      <th>发布描述</th>
      <th width="20%">相关文档</th>
      <th width="20%">发布时间</th>
    </tr>
    <tr>
      <td>播放器支持延迟销毁</td>
      <td>支持在创建云播放器时传入 <code>DelayDestroySeconds</code> 设置延迟销毁的时间</td>
      <td>[创建云端播放器](/cloud-player-server/create-player)</td>
      <td>2025-07-18</td>
    </tr>
  </tbody>
</table>


## 2025 年 01 月

<table>
  
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td>服务端更新</td>
<td>`CreatePlayer` 接口请求参数 `PlayTime` 取值范围上限调整为 `CreateTime + 1800`。</td>
<td>[创建云端播放器](/cloud-player-server/create-player)</td>
<td>2025-01-21</td>
</tr>
</tbody></table>

## 2024 年 07 月

<table>
  
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td>服务端更新</td>
<td>`DescribePlayers` 接口响应参数新增字段 `DestoryReason`，支持了解云端播放器被销毁的原因。</td>
<td>[查询云端播放器任务列表](/cloud-player-server/describe-players)</td>
<td>2024-07-09</td>
</tr>
</tbody></table>

---

## 2024 年 03 月

<table>
  
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td>服务端更新</td>
<td>支持在创建、更新云端播放器时，设置媒体资源的备用播放地址 `BackupStreamUrl`。当 `StreamUrl` 参数中的地址访问失败时，云端播放器会尝试访问备用地址。</td>
<td> <ul><li>[创建云端播放器](/cloud-player-server/create-player)</li><li>[更新云端播放器](/cloud-player-server/update-player)</li></ul></td>
<td>2024-03-13</td>
</tr>
</tbody></table>

---

## 2023 年 11 月

<table>
  
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td rowspan="2">服务端更新</td>
<td>创建云端播放器时，新增 `RoomUserUpdate` 参数。当该参数设置为 `1` 时，由云端播放器创建的房间将会触发客户端的 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-user-update" target="_blank">onRoomUserUpdate</a> 回调。当房间内有其他用户上线或下线，导致房间内用户列表发生变化时，会通过本回调通知开发者。</td>
<td>[创建云端播放器](/cloud-player-server/create-player)</td>
<td rowspan="2">2023-11-14</td>
</tr>
<tr>
<td>新增回调事件类型（回调参数 `EventType` 新增取值 `4`），该类型表示云端播放器运行中检测到的异常事件。云端播放器检测到该类异常事件后，内部会自动进行重试。如果短时间内多次收到该类异常回调通知，开发者需要检查资源服务器访问是否正常、或做其它容错处理。</td>
<td>[相关回调及校验说明](/cloud-player-server/callback/callback)</td>
</tr>
</tbody></table>

---

## 2023 年 07 月

**发布日期：**

<table>
  
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td rowspan="2">服务端更新</td>
<td><ul><li>新增支持基于 SEI 信息，通过 StreamData 参数配置实时媒体流的播放进度等数据。拉流方可通过监听客户端的 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-sync-recv-sei" target="blank">onPlayerSyncRecvSEI</a> 回调获取该数据。</li><li>优化视频转码配置参数 `VideoOptions` 为 “可选” 参数。该参数不填写时，其中所包含的字段均使用默认值。</li><li>修复在 [创建云端播放器](/cloud-player-server/create-player) 时，音频编码参数 AudioCodec 中的枚举值与实际有效值不一致的问题。</li></ul></td>
<td>[创建云端播放器](/cloud-player-server/create-player)</td>
<td rowspan="2">2023-07-13</td>
</tr>
<tr>
<td>修复回调参数 Detail 名称大小写错误的问题，修复前发送的回调参数名称为 detail。</td>
<td>-</td>
</tr>
</tbody></table>

---

## 2023 年 06 月

<table>
<tbody><tr>
<th width="20%">发布事项</th>
<th>发布描述</th>
<th width="20%">相关文档</th>
<th width="20%">发布时间</th>
</tr>
<tr>
<td>首次发布</td>
<td>支持导入在线媒体流、支持多种媒体文件封装格式和音视频编码格式、精准控制播放进度和次数、以及推流前设置转码参数等多种功能。</td>
<td>-</td>
<td>2023-06-21</td>
</tr>
</tbody></table>
