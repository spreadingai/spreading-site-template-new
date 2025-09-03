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

export const queryConversationMap = {
  'Android': <a href="@queryConversation" target='_blank'>queryConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversation.html" target='_blank'>queryConversation</a>,
}



# 查询会话

- - -

## 功能简介

ZIM 支持通过指定会话 ID 查询会话的详细信息。

## 实现流程

用户登录后，可以调用 {getPlatformData(props,queryConversationMap)} 接口，指定会话 ID 及会话类型，获取对应会话的详细信息（包括会话名称、会话未读数、会话通知状态等）。

:::if{props.platform=undefined}
```java
String conversationID = "convId";
ZIMConversationType type = ZIMConversationType.PEER;

// 查询会话信息
zim.queryConversation(conversationID,type, new ZIMConversationQueriedCallback() {
    @Override
    public void onConversationQueried(ZIMConversation conversation, ZIMError errorInfo) {
        // 查询会话的信息。
    }
});

```

:::
:::if{props.platform="iOS"}
```objc
// 查询会话信息
[[ZIM getInstance] queryConversation:@"targetConversationID" conversationType:ZIMConversationTypePeer callback:^(ZIMConversation * _Nonnull conversation, ZIMError * _Nonnull errorInfo) {
         // 查询会话操作的结果回调
        if (errorInfo.code == ZIMErrorCodeSuccessS) {
            
        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
}];

```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 查询会话信息
const conversationID = "xxx";
const conversationType = 0;

// 拉取会话列表
zim.queryConversation(conversationID, conversationType)
    .then((res: ZIMConversationQueriedResult) => {
        // 查询成功，开发者需要保存和维护数组内的会话对象
    })
    .catch((err: ZIMError) => {
        // 查询失败
    })
```
:::
:::if{props.platform="Flutter"}
```dart
// 查询会话信息
ZIM.getInstance().queryConversation("conversationID", ZIMConversationType.peer).then((value){
    // 查询会话操作的结果回调
}).catchError((onError){
    // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
});
```
:::
:::if{props.platform="window"}
```cpp
// 查询会话信息
zim_->queryConversation(
    "conv_id", conv_type,
    [=](/zim-android/guides/conversation/std::shared_ptr<zim::zimconversation>-conv,-const-zim::zimerror-&errorinfo) {
        // 查询会话操作的结果回调
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {

        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
:::
:::if{props.platform="U3d"}
```cs
// 查询会话信息
ZIM.GetInstance().QueryConversation(
    "conv_id", ZIMConversationType.Peer,
    [=](/zim-android/guides/conversation/zimconversation-conv,-zimerror-errorinfo) {
        // 查询会话操作的结果回调
        if (errorInfo.code == ZIMErrorCode.Success) {

        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
:::
