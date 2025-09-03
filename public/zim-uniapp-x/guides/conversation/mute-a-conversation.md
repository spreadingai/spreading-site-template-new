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

export const setConversationNotificationStatusMap = {
  'Android': <a href="@setConversationNotificationStatus" target='_blank'>setConversationNotificationStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationNotificationStatus.html" target='_blank'>setConversationNotificationStatus</a>,
}



# 设置会话免打扰

- - -

## 功能概述

会话消息免打扰，指设置之后，SDK 在接收到当前会话的消息时，将不会进行推送通知，同时 **“消息未读总数”也不会增加**。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/8954a92555.png" alt="6_消息免打扰_中文.png"/>
</Frame>

## 实现流程

调用 {getPlatformData(props,setConversationNotificationStatusMap)} 接口，传入 conversationID 指定某个会话，设置消息免打扰功能。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 将某个会话设置为消息免打扰状态
// 以单聊会话为例

// 设置会话类型为单聊
ZIMConversationType conversationType = ZIMConversationType.PEER;

// 设置会话为免打扰
zim.setConversationNotificationStatus(ZIMConversationNotificationStatus.DO_NOT_DISTURB, "CONV_ID", conversationType, new ZIMConversationNotificationStatusSetCallback() {
    @Override
    public void onConversationNotificationStatusSet(ZIMError errorInfo) {
        // 设置消息免打扰的结果
        if(errorInfo.code == ZIMErrorCodeSuccess) {
          // ......
        } else {
          // ......
        }  
    }
});
```

</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 将某个会话设置成消息免打扰状态
// 以群聊会话为例
[self.zim setConversationNotificationStatus:ZIMConversationNotificationStatusDoNotDisturb conversationID:@"CONV_ID" conversationType:ZIMConversationTypeGroup callback:^(ZIMError * _Nonnull errorInfo) {
    // 设置消息免打扰状态的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
}];
```
</CodeGroup>
:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 将某个会话设置成消息免打扰状态
// 以群聊会话为例
zim->setConversationNotificationStatus(ZIMConversationNotificationStatusDoNotDisturb, "CONV_ID", ZIMConversationTypeGroup, [=](/zim-uniapp-x/guides/conversation/zimerror-errorinfo) {
    // 设置消息免打扰的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
});
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 将某个群会话设置成消息免打扰状态
// 以群聊消息为例

const status = 2;  // 将会话状态设置为免打扰 
const conversationID = '';
const conversationType = 2;  // 会话类型为群聊
zim.setConversationNotificationStatus(status, conversationID, conversationType)
    .then((res: ZIMConversationNotificationStatusSetResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 将某个会话设置成消息免打扰状态
ZIM.GetInstance().SetConversationNotificationStatus(ZIMConversationNotificationStatus.DoNotDisturb, "CONV_ID",
    ZIMConversationType.Group, (string conversationID, ZIMConversationType conversationType,
        ZIMError errorInfo) =>
    {
        // 设置消息免打扰的结果
    });
```
</CodeGroup>
:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 将某个会话设置成消息免打扰状态
// 以群聊会话为例
ZIM
    .getInstance()
    !.setConversationNotificationStatus(
        ZIMConversationNotificationStatus.doNotDisturb,
        'conversationID',
        ZIMConversationType.group)
    .then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::

<Content platform="UTS" />