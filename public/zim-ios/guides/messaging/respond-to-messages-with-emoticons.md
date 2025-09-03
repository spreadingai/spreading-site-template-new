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

export const onMessageReactionsChangedMap = {
  'Android': <a href="@onMessageReactionsChanged" target='_blank'>onMessageReactionsChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageReactionsChanged.html" target='_blank'>onMessageReactionsChanged</a>,
  'Web': <a href="@messageReactionsChanged" target='_blank'>messageReactionsChanged</a>,
  'UTS': <a href="@messageReactionsChanged" target='_blank'>onMessageReactionsChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-reactions-changed" target='_blank'>messageReactionsChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-reactions-changed" target='_blank'>messageReactionsChanged</a>,
}
export const ZIMEventHandlerMap = {
  'Android': <a href="@-ZIMEventHandler" target='_blank'>ZIMEventHandler</a>,
  'Web,UTS': <a href="@on" target='_blank'>on</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>ZIMEventHandler</a>,
}
export const addMessageReactionMap = {
  'Android': <a href="@addMessageReaction" target='_blank'>addMessageReaction</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addMessageReaction.html" target='_blank'>addMessageReaction</a>,
}
export const ZIMMessageReactionAddedCallbackMap = {
  'Android': <a href="@-ZIMMessageReactionAddedCallback" target='_blank'>ZIMMessageReactionAddedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageReactionAddedResult" target='_blank'>ZIMMessageReactionAddedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReactionAddedResult-class.html" target='_blank'>ZIMMessageReactionAddedResult</a>,
  'iOS,mac,window,U3d': <a href="@ZIMMessageReactionAddedCallback" target='_blank'>ZIMMessageReactionAddedCallback</a>,
}
export const deleteMessageReactionMap = {
  'Android': <a href="@deleteMessageReaction" target='_blank'>deleteMessageReaction</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessageReaction.html" target='_blank'>deleteMessageReaction</a>,
}
export const ZIMMessageReactionDeletedCallbackMap = {
  'Android': <a href="@-ZIMMessageReactionDeletedCallback" target='_blank'>ZIMMessageReactionDeletedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageReactionDeletedResult" target='_blank'>ZIMMessageReactionDeletedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReactionDeletedResult-class.html" target='_blank'>ZIMMessageReactionDeletedResult</a>,
  'iOS,mac,window,U3d': <a href="@ZIMMessageReactionDeletedCallback" target='_blank'>ZIMMessageReactionDeletedCallback</a>,
}
export const queryMessageReactionUserListMap = {
  'Android': <a href="@queryMessageReactionUserList" target='_blank'>queryMessageReactionUserList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReactionUserList.html" target='_blank'>queryMessageReactionUserList</a>,
  'iOS,mac': <a href="@queryMessageReactionUserListByMessage" target='_blank'>queryMessageReactionUserListByMessage</a>,
}
export const ZIMMessageReactionUserListQueriedCallbackMap = {
  'Android': <a href="@-ZIMMessageReactionUserListQueriedCallback" target='_blank'>ZIMMessageReactionUserListQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageReactionUserListQueriedResult" target='_blank'>ZIMMessageReactionUserListQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReactionUserListQueriedResult-class.html" target='_blank'>ZIMMessageReactionUserListQueriedResult</a>,
  'iOS,mac,window,U3d': <a href="@ZIMMessageReactionUserListQueriedCallback" target='_blank'>ZIMMessageReactionUserListQueriedCallback</a>,
}



# 消息表态

- - -

## 功能简介

消息表态，是指用户对消息的反应。一般可用于对单聊或群聊的消息添加或删除表情，也可用于发起群组投票、确认群组结果等操作。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/a1d1dddbaa.png" alt="4_ 消息表态_中文.png"/>
</Frame>

<Note title="说明">

以上仅为表态消息的 UI 示意图，ZIM SDK 不提供相关表态的美术资源，需要由您自行实现。
</Note>

## 实现流程

ZIM SDK 支持对单聊或群聊会话中的指定消息进行表态。以客户端 B 对来自客户端 A 的消息增删表态为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/message_reaction_flowchart.png" /></Frame>

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web"}
1. 客户端 A 和 客户端 B 分别创建自己的 ZIM 实例，并注册 {getPlatformData(props,ZIMEventHandlerMap)} 监听的 {getPlatformData(props,onMessageReactionsChangedMap)} 回调接口，监听消息表态的相关通知。
:::
:::if{props.platform="UTS"}
1. 客户端 A 和 客户端 B 分别创建自己的 ZIM 实例，监听 {getPlatformData(props,onMessageReactionsChangedMap)} 回调接口，监听消息表态的相关通知。
:::
2. 客户端 A 和 客户端 B 分别登录 ZIM SDK。
3. 客户端 A 向 客户端 B 发送单聊消息后，客户端 B 对该消息进行表态时：
    1. 客户端 B 调用 {getPlatformData(props,addMessageReactionMap)} 接口，传入参数 reactionType 和 message ，表态指定的消息。
    2. 客户端 B 通过 {getPlatformData(props,ZIMMessageReactionAddedCallbackMap)} 回调接口得知表态操作的结果。
    3. 客户端 A 通过 {getPlatformData(props,onMessageReactionsChangedMap)} 回调得知消息表态的相关通知。
4. 客户端 B 删除上述表态时：
    1. 客户端 B 调用 {getPlatformData(props,deleteMessageReactionMap)} 接口，传入参数 reactionType 和 message ，表态指定的消息。
    2. 客户端 B 通过 {getPlatformData(props,ZIMMessageReactionDeletedCallbackMap)} 回调接口得知表态操作的结果。
    3. 客户端 A 通过 {getPlatformData(props,onMessageReactionsChangedMap)} 回调得知消息表态的相关通知。

### 1 监听消息表态

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web"}
用户创建 ZIM 示例后，需要注册 {getPlatformData(props,ZIMEventHandlerMap)} 监听的 {getPlatformData(props,onMessageReactionsChangedMap)} 回调接口，监听消息表态的相关通知。
:::
:::if{props.platform="UTS"}
用户创建 ZIM 示例后，需要通过 {getPlatformData(props,onMessageReactionsChangedMap)} 回调接口监听消息表态的相关通知。
:::
当其他用户增加或删除对某条消息的表态后，可以直接获取表态的相关信息，包括表态的类型和人数等。通过此回调可获取的用户信息有限，一般为 5 名用户，如需了解表态相关的更多用户信息，请参考 <a href="#查询表态详情">查询表态详情</a>。

:::if{props.platform=undefined}
```java
// 收到消息表态回调
public void onMessageReactionsChanged(ZIM zim, ArrayList<ZIMMessageReaction> reactions) {

}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 收到消息表态回调
- (void)zim:(ZIM *)zim messageReactionsChanged:(NSArray<ZIMMessageReaction *> *)reactions;
```
:::
:::if{props.platform="window"}
```cpp
// 收到消息表态回调
virtual void onMessageReactionsChanged(ZIM * /*zim*/,
                                       const std::vector<ZIMMessageReaction> & /*reactions*/) {}```
:::
:::if{props.platform="U3d"}
```cs
// Receive message reaction callback
ZIM.GetInstance().onMessageReactionsChanged += (
    ZIM zim,
    List<ZIMMessageReaction> reactionList) =>
    {

    };
```
:::
:::if{props.platform="U3d"}
```cs
// 收到消息表态回调
ZIM.GetInstance().onMessageReactionsChanged += (
    ZIM zim,
    List<ZIMMessageReaction> reactionList) =>
    {

    };
```
:::
:::if{props.platform="Flutter"}
```dart
// 收到消息表态回调
ZIMEventHandler.onMessageReactionsChanged = (ZIM zim, List<ZIMMessageReaction> infos){

};
```
:::
:::if{props.platform="Web"}
```typescript
// 收到消息表态回调
zim.on('messageReactionsChanged', (zim, data) => {
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 收到消息表态回调
zim.onMessageReactionsChanged((data) => {
});
```
:::


### 2 新增消息表态

在单聊或群聊会话发送消息后，您可以调用 {getPlatformData(props,addMessageReactionMap)} 对任意消息进行表态。增加表态操作的结果将通过 {getPlatformData(props,ZIMMessageReactionAddedCallbackMap)} 返回。通过此 `callback` 可获取的用户信息有限，一般为 5 名用户，如需了解表态相关的更多用户信息，请参考 <a href="#查询表态详情">查询表态详情</a>。


<Note title="说明">

- 重复调用本接口，对同一条消息进行相同类型的表态会报错。
- 一条消息默认表态类型上限为 100，如需调整，请联系 ZEGO 技术支持。
</Note>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 添加消息表态
String reactionType = "key";

zim.addMessageReaction(reactionType, message, new ZIMMessageReactionAddedCallback() {
    @Override
    public void onMessageReactionAdded(ZIMMessageReaction reaction, ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS){
            // 操作成功
        }else {
            // 操作失败
        }
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 新增消息表态
NSString* reactionType = @"key";

[zim addMessageReaction:reactionType message:message callback:^(ZIMMessageReaction * _Nonnull reaction, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == 0){
        // 操作成功
    }
    else{
        // 操作失败
    }
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title ="示例代码"
// 添加消息表态
auto reactionType = "key";
zim->addMessageReaction(reactionType,messagePtr, [=](/zim-ios/guides/messaging/const-zimmessagereaction-&reaction,-const-zimerror-&errorinfo) {
    if (errorInfo.code == 0) {
        // 操作成功
    }
    else {
        // 操作失败
    }
});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 添加消息表态
string reactionType = "key";
ZIM.GetInstance().AddMessageReaction(reactionType, message, (ZIMMessageReaction reaction, ZIMError errorInfo) =>
{
    if (errorInfo.code == ZIMErrorCode.Success){
        // 操作成功
    }else {
        // 操作失败
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 添加消息表态
ZIM.getInstance()!.addMessageReaction('key', ZIMTextMessage(message: 'message')).then((value) => {
    //添加消息表态成功
}).catchError((onError){
    //添加消息表态失败
});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
const reactionType = "key";
const messageObj: ZIMMessage = {};

zim.addMessageReaction(reactionType, messageObj)
    .then((res: ZIMMessageReactionAddedResult) => {
        // 操作成功，在 UI 上更新该消息的表态列表
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::


### 3 删除消息表态

对消息表态后，您可以调用 {getPlatformData(props,deleteMessageReactionMap)} 删除该表态。删除操作的结果将通过 {getPlatformData(props,ZIMMessageReactionDeletedCallbackMap)} 返回。通过此 `callback` 可获取的用户信息有限，一般为 5 名用户，如需了解表态相关的更多用户信息，请参考 <a href="#查询表态详情">查询表态详情</a>。


<Note title="说明">

调用本接口只能删除自己所作的表态。
</Note>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 删除消息表态
String reactionType = "key";

zim.deleteMessageReaction(reactionType, message, new ZIMMessageReactionDeletedCallback() {
    @Override
    public void onMessageReactionDeleted(ZIMMessageReaction reaction, ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS){
            // 操作成功
        }else {
            // 操作失败
        }
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 删除消息表态
NSString* reactionType = @"key";

[zim deleteMessageReaction:reactionType message:message callback:^(ZIMMessageReaction * _Nonnull reaction, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == 0){
        // 操作成功
    }
    else{
        // 操作失败
    }
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 删除消息表态
auto reactionType = "key";
zim->deleteMessageReaction(reactionType,messagePtr, [=](/zim-ios/guides/messaging/const-zimmessagereaction-&reaction,-const-zimerror-&errorinfo) {
        if (errorInfo.code == 0) {
            // 操作成功
        }
        else {
            // 操作失败
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 删除消息表态
string reactionType = "key";

ZIM.GetInstance().DeleteMessageReaction(reactionType, message, (ZIMMessageReaction reaction, ZIMError errorInfo) =>
{
    if (errorInfo.code == ZIMErrorCode.Success){
        // 操作成功
    }else {
        // 操作失败
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 删除消息表态
ZIM.getInstance()!.deleteMessageReaction('Key', ZIMTextMessage(message: 'message')).then((value) => {
    // 删除消息表态成功
}).catchError((onError){
    // 删除消息表态失败
});

```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
const reactionType = "key";
const messageObj: ZIMMessage = {};

zim.deleteMessageReaction(reactionType, messageObj)
    .then((res: ZIMMessageReactionDeletedResult) => {
        // 操作成功，在 UI 上更新该消息的表态列表
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

## 更多功能

### 查询表态详情

表态操作（监听、增加以及删除表态）只会返回概要用户信息，默认是 5 个，如需调整，请联系 ZEGO 技术支持。因此，当需要查询有哪些用户对某条消息作出了指定类型表态时，可以通过调用 {getPlatformData(props,queryMessageReactionUserListMap)} 进行查询。操作的结果将通过 {getPlatformData(props,ZIMMessageReactionUserListQueriedCallbackMap)} 返回，可知有哪些用户对这条消息增加了这种类型的表态。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 查询表态详情
ZIMMessageReactionUserQueryConfig config =new ZIMMessageReactionUserQueryConfig();
config.reactionType = "key";
// count 超过 100 条会返回报错
config.count = 10;
config.nextFlag = 0;
zim.queryMessageReactionUserList(message, config,new ZIMMessageReactionUserListQueriedCallback() {
    @Override
    public void onMessageReactionUserListQueried(ZIMMessage message, ArrayList<ZIMMessageReactionUserInfo> userList,
                    String reactionType, long nextFlag, int totalCount,
                    ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS){
            // 操作成功
        }else {
            // 操作失败
        }
    }
});
```
</CodeGroup>
:::

:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 查询表态详情
ZIMMessageReactionUserQueryConfig *config = [[ZIMMessageReactionUserQueryConfig alloc] init];
config.nextFlag = 0;
config.reactionType = @"key";
// count 超过 100 条会返回报错
config.count = 20;

[zim queryMessageReactionUserListByMessage:message config:config callback:^(ZIMMessage * _Nonnull message, NSArray<ZIMMessageReactionUserInfo *> * _Nonnull userList, NSString * _Nonnull reactionType, long long nextFlag, int totalCount, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == 0){
        // 操作成功
    }
    else{
        // 操作失败
    }
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 查询表态详情
ZIMMessageReactionUserQueryConfig config;
config.nextFlag = 0;
// count 超过 100 条会返回报错
config.count = 10;
config.reactionType = "key";

zim->queryMessageReactionUserList(messagePtr,config, [=](/zim-ios/guides/messaging/const-std::shared_ptr<zimmessage>-&message,-const-std::vector<zimmessagereactionuserinfo>-&userlist,-const-std::string-&reactiontype,-const-long-long-nextflag,-const-unsigned-int-totalcount,-const-zimerror-&errorinfo) {
        if (errorInfo.code == 0) {
            // 操作成功
        }
        else {
            // 操作失败
        }
    });
```
</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 查询表态详情
ZIMMessageReactionUserQueryConfig config =new ZIMMessageReactionUserQueryConfig();
config.reactionType = "key";
// count 超过 100 条会返回报错
config.count = 10;
config.nextFlag = 0;

ZIM.GetInstance().QueryConversationList(config , (List<ZIMConversation> conversationList, ZIMError errorInfo) =>
{
    if (errorInfo.code == ZIMErrorCode.SUCCESS){
        // 操作成功
    }else {
        // 操作失败
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 查询表态详情
ZIMMessageReactionUsersQueryConfig config = ZIMMessageReactionUsersQueryConfig(reactionType: "key");
// count 超过 100 条会返回报错
config.count = 20;
config.nextFlag = 0;
ZIM.getInstance()!.queryMessageReactionUserList(ZIMTextMessage(message: 'message'), config).then((value) => {
// 操作成功，在 UI 上更新该消息的表态列表
}).catchError((onError){
// 操作失败
});
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
const config: ZIMMessageReactionUserQueryConfig = {
    nextFlag: 0,
    reactionType: "key",
    // count 超过 100 条会返回报错
    count: 20,
};
const messageObj: ZIMMessage = {};

zim.queryMessageReactionUserList(messageObj, config)
    .then((res: ZIMMessageReactionUserListQueriedResult) => {
        // 操作成功，在 UI 上更新该消息的表态列表
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

<Content platform="iOS" />