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

export const ZIMRoomAdvancedConfigMap = {
  'Android': <a href="@-ZIMRoomAdvancedConfig" target="_blank">自定义配置支持存储</a>,
  'Flutter':<a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomAdvancedConfig-class.html" target="_blank">自定义配置支持存储</a>,
}

# 基本概念介绍

- - -


## 群组

[群组](/zim-web/guides/group/manage-groups)，指两个或以上的用户一起进行聊天。有成员在群组内发送消息时，其他成员会收到消息；当 App 在后台运行或者 App 进程被杀死后，不在线的群内成员也可以接收到离线消息的推送通知。

ZIM 会持久化存储群组关系链，不会因为群成员的在线、离线状态而变更关系链。


## 房间

[房间](/zim-web/guides/room/manage-rooms)指两个或以上的用户一起进行聊天。有用户在房间内发送消息时，其他用户会收到消息；当 App 在后台运行或者 App 进程被杀死后，不会接收到消息的推送通知。

当房间成员离线 30s（默认）后，会被踢出房间，被踢出房间后将不会再接收到任何聊天室中的消息。默认配置不存储历史消息，但是用户可以{getPlatformData(props,ZIMRoomAdvancedConfigMap)}、获取最多 3 个小时的历史消息。

## 单聊

两个用户一对一进行单聊聊天，当 App 在后台运行或者 App 进程被杀死后，有新消息时也可以收到推送通知。


## 会话列表

每个单聊、群聊会有单独的会话 ID。[会话列表](/zim-web/guides/conversation/get-the-conversation-list)指各类会话 ID 根据时间顺序排列的列表。列表的顺序会按照各个会话最近一条消息的时间、置顶等因素影响。房间聊天不属于会话列表范畴。


## 离线消息

指用户不在线（离线）时，可以接收到的消息。当 App 在后台运行或者 App 进程被杀死后，服务器会暂存离线消息，当用户再次登录 ZIM 时，会自动拉取离线阶段的消息，实现消息必达。

目前 ZIM 支持单聊/群组的离线消息推送功能。


## 离线推送

当用户离线时，ZIM 消息可通过手机厂商推送通道触达客户端，在用户终端的通知栏内展示推送。

:::if{props.platform="iOS"}
目前 ZIM 已支持 [Apple](/zim-web/offline-push-notifications/integrate-apns)、华为、小米、vivo、OPPO、Google 等主流手机厂商。
:::
:::if{props.platform=undefined}
目前 ZIM 已支持 Apple、[华为](/zim-web/offline-push-notifications/integrate-huawei)、[小米](/zim-web/offline-push-notifications/integrate-xiaomi)、[vivo](/zim-web/offline-push-notifications/integrate-vivo)、[OPPO](/zim-web/offline-push-notifications/integrate-oppo)、[Google](/zim-web/offline-push-notifications/integrate-fcm) 等主流手机厂商。
:::
:::if{props.platform="Flutter|RN|uniapp"}
目前 ZIM 已支持 [Apple](/zim-web/offline-push-notifications/integrate-apns)、[华为](/zim-web/offline-push-notifications/integrate-huawei)、[小米](/zim-web/offline-push-notifications/integrate-xiaomi)、[vivo](/zim-web/offline-push-notifications/integrate-vivo)、[OPPO](/zim-web/offline-push-notifications/integrate-oppo)、[Google](/zim-web/offline-push-notifications/integrate-fcm) 等主流手机厂商。
:::
:::if{props.platform="Web|U3D|mac|Windows|HarmonyOS"}
目前 ZIM 已支持 Apple、华为、小米、vivo、OPPO、Google 等主流手机厂商。
:::

## 消息漫游

当用户用一台新设备登录 ZIM 时，支持将该 ZIM 账号已接收到的消息，从 ZIM 服务器内拉取至客户端。

## 消息优先级

开发者可设置消息优先级为低、中、高三级，该设置通过以下方式影响消息传输：
- 接口调用达限时优先处理：当消息发送接口调用次数达到上限（例如 1 秒 20 次），ZIM 将优先保障高优先级消息的正常发送。典型场景：用户在前 0.5 秒发送10条低优先级消息后，剩余 0.5 秒仍可发送 20 条高优先级消息。
- 服务端性能异常时优先推送：若服务端因性能问题（如负载过高）导致消息处理延迟，ZIM 将优先推送高优先级消息至接收方。

## 信令消息

开发者可根据业务需求自定义信令消息类型、内容，ZIM 将消息透传至业务服务器，帮助开发者实现相应业务逻辑。


## 消息云存储

用户发送的单聊、群组、房间消息将存储在 ZIM 服务器上，方便更换设备、离线登录后重新获取。

出于隐私保护需求，用户可设置消息实际存储时长，或删除消息存储。

## 注册

用户注册时使用 ZIM 服务的必要条件，可通过以下两种方式实现：
- 自动注册：用户首次在客户端调用 `login` 方法时，ZIM 会自动完成注册。
- 手动注册：开发者可通过 [服务端 API](https://doc-zh.zego.im/zim-server/user/batch-register-users) 注册用户。

<Content platform="Web" />