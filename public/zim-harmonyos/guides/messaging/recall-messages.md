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

export const ZIMMessageRevokeConfigMap = {
  'Android': <a href="@-ZIMMessageRevokeConfig" target='_blank'>ZIMMessageRevokeConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRevokeConfig-class.html" target='_blank'>ZIMMessageRevokeConfig</a>,
}
export const onMessageRevokeReceivedMap = {
  'Android': <a href="@onMessageRevokeReceived" target='_blank'>onMessageRevokeReceived</a>,
  'Web': <a href="@messageRevokeReceived" target='_blank'>messageRevokeReceived</a>,
  'UTS': <a href="@messageRevokeReceived" target='_blank'>onMessageRevokeReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-revoke-received" target='_blank'>messageRevokeReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-revoke-received" target='_blank'>messageRevokeReceived</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageRevokeReceived.html" target='_blank'>onMessageRevokeReceived</a>,
}
export const setEventHandlerMap = {
  'Android': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
  'Web,UTS': <a href="@on" target='_blank'>on</a>,
  'U3d': "setEventHandler",
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>setEventHandler</a>,
}
export const revokeMessageMap = {
  'Android': <a href="@revokeMessage" target='_blank'>revokeMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/revokeMessage.html" target='_blank'>revokeMessage</a>,
}
export const ZIMMessageRevokedCallbackMap = {
  'Android': <a href="@-ZIMMessageRevokedCallback" target='_blank'>ZIMMessageRevokedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageRevokedResult" target='_blank'>ZIMMessageRevokedResult</a>,
  'window,iOS,mac': <a href="@ZIMMessageRevokedCallback" target='_blank'>ZIMMessageRevokedCallback</a>,
  'U3d': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-group-message-receipt-member-list-queried-callback" target='_blank'>ZIMMessageRevokedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRevokedResult-class.html" target='_blank'>ZIMMessageRevokedResult</a>,
}


# 撤回消息

- - -
:::if{props.platform="U3d"}
<Note title="说明">
本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

## 功能简介

ZIM SDK 支持在单聊或群聊会话中撤回本端发送的消息，以及支持群主在群聊会话中撤回他人发送的消息。

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/14e7c6ccda.png" alt="2_撤回消息_中文.png"/>
</Frame>

本文档介绍了如何使用 ZIM SDK 的接口，实现撤回某个会话中指定的消息。


<Note title="说明">

如果消息接收端使用的 ZIM SDK 版本低于 2.5.0，当消息被撤回，会出现以下 3 种情况：
- 用户为在线状态时收到该消息，仍看到该消息。
- 用户为离线时收到该消息，登录后未主动查询历史消息，不会看到该消息。
- 用户为离线时收到该消息，登录后主动查询历史消息，查询结果回调会显示该消息的类型为 unknown。
</Note>

## 实现流程

ZIM SDK 支持撤回某个会话中指定的消息。开发者可以通过 {getPlatformData(props,ZIMMessageRevokeConfigMap)} 对象，设置撤回消息相关的高级属性配置。

以客户端 A 撤回发送给客户端 B 的指定消息为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/message_revoked.png" /></Frame>

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|U3d"}
1. 客户端 A 和 客户端 B 分别创建自己的 ZIM 实例，注册 {getPlatformData(props,setEventHandlerMap)} 监听的 {getPlatformData(props,onMessageRevokeReceivedMap)} 回调接口，用于接收消息撤回通知。
:::
:::if{props.platform="UTS"}
1. 客户端 A 和 客户端 B 分别创建自己的 ZIM 实例，监听 {getPlatformData(props,onMessageRevokeReceivedMap)} 回调接口，用于接收消息撤回通知。
:::
2. 客户端 A 和 客户端 B 分别登录 ZIM SDK。
3. 客户端 A 向 客户端 B 发送单聊消息后，需要撤回发送给客户端 B 的某条消息时：
    1. 客户端 A 调用 {getPlatformData(props,revokeMessageMap)} 接口，传入参数 message 和 config，撤回指定的消息。
    2. 客户端 A 通过 {getPlatformData(props,ZIMMessageRevokedCallbackMap)} 回调接口得知撤回操作的结果。
    3. 客户端 B 通过 {getPlatformData(props,onMessageRevokeReceivedMap)} 回调得知消息撤回的相关通知。

### 1 设置监听

用户登录成功后，可以通过 {getPlatformData(props,onMessageRevokeReceivedMap)} 回调监听消息撤回的相关通知。当其他用户撤回消息后，可以直接获取被撤回消息的相关信息，包括撤回时间和撤回类型等。

### 2 撤回消息

在默认情况下，用户可以在发布消息后的 2 分钟内调用 {getPlatformData(props,revokeMessageMap)} 撤回消息。撤回操作的结果将通过 {getPlatformData(props,ZIMMessageRevokedCallbackMap)} 通知给用户。

<Note title="说明">

* 若要实现群主撤销其他用户的消息，请集成ZIM SDK 2.9.0及以上版本。
* ZIM SDK目前默认支持2分钟内撤销消息，如需修改配置（最长支持24小时），请联系ZEGO技术支持。
</Note>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.content = "撤回了一条消息";
pushConfig.title = messageInfo.getUserName();
ZIMMessageRevokeConfig config = new ZIMMessageRevokeConfig();
config.pushConfig = pushConfig;
zim.revokeMessage(message, config, new ZIMMessageRevokedCallback() {
    @Override
    public void onMessageRevoked(ZIMMessage zimMessage, ZIMError zimError) {
        if (zimError.code == ZIMErrorCode.SUCCESS) {
            // 撤回成功
        } else {
            toast("撤回消息失败，" + zimError.code + "，" + zimError.message);
        }
    }
});
```
</CodeGroup>

:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 撤回会话的指定消息

zim::ZIMMessageRevokeConfig revoke_config;
revoke_config.config = nullptr;
revoke_config.revokeExtendedData = "Revoke Content";
zim_->revokeMessage(
    last_message, revoke_config,
    [=](/zim-harmonyos/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        if (message->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_REVOKE) {
            auto revoked_message = std::static_pointer_cast<zim::ZIMRevokeMessage>(message);
        }
    });
```
</CodeGroup>
:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="Sample code"
ZIMMessageRevokeConfig revokeConfig = ZIMMessageRevokeConfig();
revokeConfig.revokeExtendedData = '';

// pushConfig is Optional. Fill in if offline push is needed.
ZIMPushConfig pushConfig = ZIMPushConfig();
pushConfig.title = '$userName';
pushConfig.content = 'A message is recalled.';

ZIM
    .getInstance()！
    .revokeMessage(message, revokeConfig)
    .then((result){
      // Recalling successful.
    })
    .catchError((onError) {
      // Message recalling failed
    });
```
</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMMessage message = new ZIMMessage();
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.content = "content";
pushConfig.title = "title";
ZIMMessageRevokeConfig revokeConfigConfig = new ZIMMessageRevokeConfig();
revokeConfigConfig.config = pushConfig;
ZIM.GetInstance().RevokeMessage(message, revokeConfigConfig, (ZIMMessage message, ZIMError errorInfo) =>
{
    // 撤回结果
});
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 撤回会话的指定消息
const config: ZIMMessageRevokeConfig = {
    revokeExtendedData: "test"
};

zim.revokeMessage(message, config)
    .then((res: ZIMMessageRevokedResult) => {
        // 操作成功，将撤回后的消息更新至本地消息列表
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 撤回会话的指定消息
ZIMMessageRevokeConfig *revokeConfig = [[ZIMMessageRevokeConfig alloc] init];
revokeConfig.revokeExtendedData = @"your extended data";

[[ZIM getInstance] revokeMessage:message config:revokeConfig callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {

}];
```
</CodeGroup>
:::

<Content platform="Web" />