export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

# resourcesID 说明

resourcesID 是一个可映射多个厂商进阶推送配置的英文字符串，长度不超过 32 个字符，由开发者自定义。使用此字段，可将多个厂商的推送配置抽象为一种您自定的推送策略。

每个项目默认至多可以同时拥有 10 个 resourcesID，如需上调，请联系 ZEGO 技术支持。

## resourcesID 可映射参数说明

对于不同厂商，resourcesID 可映射的参数不同，具体说明如下表所示：

<table>
<tbody>
<tr>
<th>厂商</th>
<th>可映射参数</th>
<th>参数说明</th>
<th>参考文档</th>
</tr>
<tr>
<td rowspan="2">苹果</td>
<td>sound</td>
<td>自定义推送铃声字段，仅在推送类型为 Alert 时生效。</td>
<td>[自定义通知铃声](/zim-ios/offline-push-notifications/customize-notification-sound)</td>
</tr>
<tr>
<td>mutable_content</td>
<td>是否开启推送拦截。</td>
<td>Apple 官网文档 [Modifying content in newly delivered notifications](https://developer.apple.com/documentation/usernotifications/modifying_content_in_newly_delivered_notifications?language=objc)</td>
</tr>
<tr>
<td rowspan="5">HarmonyOS</td>
<td>test_message</td>
<td>消息类型：<ul><li>0：（默认）正式。</li><li>1：测试。</li></ul></td>
</tr>
<tr>
<td>push_type</td>
<td>推送类型：<ul><li>0：（默认）通知消息</li><li>6：静默（后台）消息</li><li>10：VOIP消息</li></ul></td>
<td>参考 HarmonyOS Push Kit [场景化消息 - 请求体结构说明 - Request Header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-struct#section20573634202313)</td>
</tr>
<tr>
<td>category</td>
<td>推送类别</td>
<td>参考 HarmonyOS Push Kit [场景化消息 - 请求体参数说明 - Notification](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-param#section17371529101117)</td>
</tr>
<tr>
<td>click_type</td>
<td>（可选）点击跳转类型：<ul><li>0：（默认）打开应用首页。</li><li>1：打开应用自定义页面。</li></ul></td>
<td>参考 HarmonyOS Push Kit [场景化消息 - 请求体参数说明 - ClickAction - actionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-param#section152462191216)</td>
</tr>
<tr>
<td>uri</td>
<td>（可选）应用内置页面 ability 对应的 URI。仅当 ActionType 为 1 时必填。</td>
<td>参考 HarmonyOS Push Kit [场景化消息 - 请求体参数说明 - ClickAction - uri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-param#section17371529101117)</td>
</tr>
<tr>
<td rowspan="3">FCM<br/>（仅适用于 Android 设备）</td>
<td>sound</td>
<td>自定义推送铃声字段，仅在推送类型为 Notification Message 时生效。</td>
<td><ul><li>Android：[自定义通知铃声](/zim-android/offline-push-notifications/customize-notification-sound)</li><li>Flutter：[自定义通知铃声](/zim-flutter/offline-push-notifications/customize-notification-sound)</li><li>React Native：[自定义通知铃声](/zim-rn/offline-push-notifications/customize-notification-sound)</li></ul></td>
</tr>
<tr>
<td>channel_id</td>
<td>Android 推送通道字段，用于指定本次离线推送的推送通道。</td>
<td>Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)</td>
</tr>
<tr>
<td>推送类型</td>
<td>
- **data message**：本次推送仅触发相关回调，不触发系统通知。
- **notification message**：系统默认弹框通知。
</td>
<td><ul><li>Android：[实现静默推送](/zim-android/offline-push-notifications/implement-silent-push-notifications)</li><li>Flutter：[实现静默推送](/zim-flutter/offline-push-notifications/implement-silent-push-notifications)</li><li>React Native：[实现静默推送](/zim-rn/offline-push-notifications/implement-silent-push-notifications)</li></ul></td>
</tr>
<tr>
<td rowspan="3">华为</td>
<td>target_user_type</td>
<td>推送类型，分为正式推送与测试推送。</td>
<td>[华为推送集成指南 - 基于消息分类实现无限制推送](/zim-android/offline-push-notifications/integrate-huawei#基于消息分类实现无限制推送)</td>
</tr>
<tr>
<td>channel Id</td>
<td>离线推送推送通道。</td>
<td>Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)</td>
</tr>
<tr>
<td>category</td>
<td>华为推送类别。</td>
<td>[华为推送集成指南 - 基于消息分类实现无限制推送](/zim-android/offline-push-notifications/integrate-huawei#基于消息分类实现无限制推送)</td>
</tr>
<tr>
<td rowspan="3">OPPO</td>
<td>channel_id</td>
<td>Android 推送通道字段，用于指定本次离线推送的推送通道。</td>
<td>Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)</td>
</tr>
<tr>
<td>category</td>
<td>推送类别</td>
<td>[OPPO 推送集成指南 - 消息分类新规申请消息分类](/zim-android/offline-push-notifications/integrate-oppo#根据-oppo-消息分类新规申请消息分类)</td>
</tr>
<tr>
<td>notify_level</td>
<td>通知栏消息提醒等级</td>
<td>[OPPO 推送集成指南 - 消息分类新规申请消息分类](/zim-android/offline-push-notifications/integrate-oppo#根据-oppo-消息分类新规申请消息分类)</td>
</tr>
<tr>
<td rowspan="3">小米</td>
<td>channel_id</td>
<td>Android 推送通道字段，用于指定本次离线推送的推送通道。</td>
<td>Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)</td>
</tr>
<tr>
<td>Channel Name</td>
<td>Android 推送通道名称。</td>
<td>
- 参考文档：Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)
- 在 ZEGO 中的应用：[使用私信通道发送不限量推送](/zim-android/offline-push-notifications/integrate-xiaomi)
</td>
</tr>
<tr>
<td>Channel description</td>
<td>Android 推送通道描述。</td>
<td>
- 参考文档：Android 官网文档 [创建和管理通知渠道](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)
- 在 ZEGO 中的应用：[小米推送集成指南 - 使用私信通道无限制推送](/zim-android/offline-push-notifications/integrate-xiaomi#基于系统消息配置不限量推送)
</td>
</tr>
<tr>
<td rowspan="2">vivo</td>
<td>category</td>
<td>推送类别</td>
<td rowspan="2">[vivo 推送集成指南 - 基于系统消息配置不限量推送](/zim-android/offline-push-notifications/integrate-vivo#基于系统消息配置不限量推送)</td>
</tr>
<tr>
<td>push_mode</td>
<td>推送环境</td>
</tr>
</tbody>
</table>

## 配置

1. 登录 ZEGO 控制台，在 “项目管理” 页签中单击合适的项目，进入项目详情页。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Enter_project_1.jpeg" /></Frame>

2. 选择“服务配置 > 即时通讯” 页签。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Add_1.jpeg" /></Frame>

3. 找到 “自定义推送策略（resourcesID）配置”，单击 “添加 reourcesID”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/resouceID.jpeg" /></Frame>

4. 在弹窗中输入 resourcesID 的相关信息并单击 “确定”。

5. 完成输入后，“自定义推送策略（resourcesID）配置” 下会出现该 resourcesID 的具体信息。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Copy_1.jpeg" /></Frame>

## 使用

开发者需要在调用包含 `pushConfig` 参数的 ZIM 接口时传入 resourcesID 字段。ZPNs 服务端会根据接收端设备厂商的不同，选取合适的厂商配置来完成推送。
