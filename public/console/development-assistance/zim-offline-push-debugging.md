# ZIM 离线推送调试

- - -

<Warning title="注意">


本文档仅适用于调试 iOS 和 Android 设备（VIVO 设备暂不支持）。

</Warning>



## 概述

在您接入 ZIM 离线推送能力后，可通过控制台进行自助调试，校验“客户端 -> ZPNs 服务器 -> 厂商”链路是否正确，若哪一环节出错控制台会提示相关原因，方便您及时调整。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/location.jpeg" /></Frame>

## 前提条件

在控制台调试离线推送之前，请确保您的项目已接入 ZIM 离线推送功能并获取 PushID，详情请参考：
- iOS：[实现离线推送](/zim-ios/offline-push-notifications/implement-offline-push-notification)
- Android：[实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)
- Flutter：[实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)
- React Native：[实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)

## 调试流程

### 1 输入相关内容

调试所需信息如下表所示：

<table>

<tbody><tr>
<th>字段</th>
<th>是否必填</th>
<th>说明</th>
</tr>
<tr>
<td>AppID</td>
<td>是</td>
<td>
实现离线推送项目的 AppID。

<Warning title="注意">
<p>该项目需已配置离线推送证书，详情请参考 [离线推送配置](/console/service-configuration/im/offline-push-config)</p>
</Warning>

</td>
</tr>
<tr>
<td>推送标题</td>
<td>是</td>
<td>离线推送消息的标题。</td>
</tr>
<tr>
<td>推送内容</td>
<td>是</td>
<td>离线推送消息的内容。</td>
</tr>
<tr>
<td>payload</td>
<td>否</td>
<td>自定义透传字段。</td>
</tr>
<tr>
<td>Push ID</td>
<td>是</td>
<td>设备唯一 ID。</td>
</tr>
</tbody></table>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/offline_push_test_info.jpeg" /></Frame>

### 2 开始调试

输入上述信息后，即可点击 “开始调试”。ZEGO 控制台会检测链路是否正确，并返回相关信息。

如果调试成功，测试设备会收到离线推送。若调试失败，您可根据返回的错误信息进行自助排查。若您无法自助排查，请联系 ZEGO 技术支持。

<Note title="说明">


针对不同类型的 App，各手机厂商可能会有推送测试限额，具体请咨询相关手机厂商。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/offline_push_test_result.jpeg" /></Frame>
