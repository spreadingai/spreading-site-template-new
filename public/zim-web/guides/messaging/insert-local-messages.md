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

export const insertMessageToLocalDBMap = {
  'Android': <a href="@insertMessageToLocalDB" target='_blank'>insertMessageToLocalDB</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/insertMessageToLocalDB.html" target='_blank'>insertMessageToLocalDB</a>,
}
export const ZIMMessageMap = {
  'Android': <a href="@-ZIMMessage" target='_blank'>ZIMMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html" target='_blank'>ZIMMessage</a>,
}



# 插入本地消息

- - -

:::if{props.platform="U3d"}

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

## 功能简介

ZIM SDK 支持向单聊、群组和房间会话插入本地消息，插入的消息只会存在于设备本地，不会发送给其他用户、不会同步到其他设备；并且在卸载客户端应用后，该消息不会留存。

开发者可使用此功能，向本地数据库插入一条消息，用于展示系统提示。例如：加入群组提示、离开群组等无需跨终端发送给其他用户的本地提示。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/8e7b1bfa86.jpg"/>
</Frame>
<Note title="说明">

- 如需向房间会话插入本地消息，请使用 2.13.0 及以上版本 ZIM SDK。
- ZIM SDK 不支持插入信令消息。
</Note>

## 使用步骤

开发者需要调用 {getPlatformData(props,insertMessageToLocalDBMap)} 接口，传入构造好的 {getPlatformData(props,ZIMMessageMap)} 消息、会话 conversationID、会话类型 conversationType、消息插入者 senderUserID 等参数，即可向本地数据库里插入一条消息。

:::if{props.platform=undefined}
<CodeGroup>

```java title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条自定义消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
String message = "custom";
int subType = 1;// 业务自己定义的消息类型，取值为 [0,200]
ZIMCustomMessage customMessage = new ZIMCustomMessage(message,subType);
String conversationID ="conversationID";
String senderUserID = "senderUserID";
ZIMConversationType type = ZIMConversationType.PEER;
zim.insertMessageToLocalDB(customMessage, conversationID, type, senderUserID, new ZIMMessageInsertedCallback() {
    @Override
    public void onMessageInserted(ZIMMessage message, ZIMError errorInfo) {
        // 开发者可以通过这个回调监听是否插入消息成功
    }
});
```
</CodeGroup>

:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条自定义消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
ZIMCustomMessage *customMessage = [[ZIMCustomMessage alloc] init];
customMessage.message = @"custom";
customMessage.subType = 1; // 业务自己定义的系统消息类型，取值为 [0,200]
NSString *conversationID = @"conversationID";
ZIMConversationType type = ZIMConversationTypePeer;
NSString *senderUserID = @"senderUserID";
[self.zim
    insertMessageToLocalDB:customMessage
            conversationID:conversationID
          conversationType:type
              senderUserID:senderUserID
                  callback:^(ZIMMessage *_Nonnull message, ZIMError *_Nonnull errorInfo) {
    GGLog(@"errorcode", errorInfo.code);
}];
```
</CodeGroup>

:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条自定义消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
std::string conversationID="conversationID";
std::string sender_user_id = "sender_user_id";
zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER;
int subType = 1;// 业务自己定义的系统消息类型，取值 [0,200]
auto customMessage = std::make_shared<zim::ZIMCustomMessage>("custom message",subType);
zim_->insertMessageToLocalDB(std::static_pointer_cast<zim::ZIMMessage>(customMessage),conversationID, type, sender_user_id,[=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,const-zim::zimerror-&errorinfo) { 
              // 开发者可以在这里监听插入消息的回调
            });
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条文本消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
const message: ZIMMessage = { type: 1, message: 'string' };
const conversationType = 0;
zim.insertMessageToLocalDB(
    message,
    'conversationID',
    conversationType,
    'senderUserID'
).then((res: ZIMMessageInsertedResult) => {
    // 开发者可以监听插入是否成功
});
```
</CodeGroup>
:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条自定义消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
String message = "custom";
int subType = 1;// 业务自己定义的系统消息类型，取值为 [0,200]
ZIMCustomMessage customMessage = new ZIMCustomMessage(message,subType);
String conversationID ="conversationID";
String senderUserID = "senderUserID";
ZIMConversationType type = ZIMConversationType.PEER;
zim
    .insertMessageToLocalDB(message, conversationID, type, senderUserID)
    .then((value) => {

})
    .catchError((onError) {

});
```

</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 向本地数据库插入一条消息
// 这里演示的是插入一条自定义消息，开发者可以自行修改为插入其他类型的消息，信令消息不支持。
int subType = 0; //业务自己定义的消息类型，取值为[0, 200]
ZIMCustomMessage customMessage = new ZIMCustomMessage("message", subType);
string conversationID = "conversationID";
string senderUserID = "senderUserID";
ZIMConversationType type = ZIMConversationType.Peer;
ZIM.GetInstance().InsertMessageToLocalDB(customMessage, conversationID, type, senderUserID, (ZIMMessage message, ZIMError errorInfo) => 
{
    // 开发者可以通过这个回调监听是否插入消息成功
});
```

</CodeGroup>
:::

<Content platform="Web" />