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

export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>onConversationChanged</a>,
  'Web': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
}
export const setEventHandlerMap = {
  'Android': <a href="@setEventHandler" target='_blank'>setEventHandler</a> ,
  'Web,UTS':<a href="@on" target='_blank'>on</a>,
  "Flutter":" "
}
export const conversationMarksMap = {
  'Android': <a href="@marks-ZIMConversation" target='_blank'>conversation.marks</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation/marks.html" target='_blank'>conversation.marks</a>,
}
export const setConversationMarkMap = {
  'Android': <a href="@setConversationMark" target='_blank'>setConversationMark</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationMark.html" target='_blank'>setConversationMark</a>,
}
export const queryConversationListMap = {
  'Android': <a href="@queryConversationList" target='_blank'>queryConversationList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target='_blank'>queryConversationList</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#query-conversation-list-with-config-callback-1" target='_blank'>queryConversationListWithConfig</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-conversation-list-with-config-callback-1" target='_blank'>queryConversationListWithConfig</a>,
}
export const ZIMConversationFilterOptionMarksMap = {
  'Android': <a href="@marks-ZIMConversationFilterOption" target='_blank'>ZIMConversationFilterOption.marks</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationFilterOption/marks.html" target='_blank'>ZIMConversationFilterOption.marks</a>,
}
export const queryConversationTotalUnreadMessageCountMap = {
  'Android': <a href="@queryConversationTotalUnreadMessageCount" target='_blank'>queryConversationTotalUnreadMessageCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationTotalUnreadMessageCount.html" target='_blank'>queryConversationTotalUnreadMessageCount</a>,
  'iOS,mac': <a href="@queryConversationTotalUnreadMessageCountWithConfig" target='_blank'>queryConversationTotalUnreadMessageCountWithConfig</a>,
}
export const ZIMConversationTotalUnreadMessageCountQueryConfigMarksMap = {
  'Android': <a href="@marks-ZIMConversationTotalUnreadMessageCountQueryConfig" target='_blank'>ZIMConversationTotalUnreadMessageCountQueryConfig.marks</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationTotalUnreadMessageCountQueryConfig/marks.html" target='_blank'>ZIMConversationTotalUnreadMessageCountQueryConfig.marks</a>,
}
export const onConversationTotalUnreadMessageCountUpdatedMap = {
  'Android': <a href="@onConversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationTotalUnreadMessageCountUpdated.html" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Web': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'UTS': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
}

# 标记会话

- - -

## 功能简介

当您遇到需要关注某会话或暂时无法处理某条会话等场景时，您可以标记会话并稍后处理，例如 "会话标星"、"会话折叠"、"会话隐藏"、“会话标记未读”等。为会话设置标记后，即可以标记为过滤项获取会话列表和未读消息总数。

<Note title="说明">
当用户标记了会话，ZIM SDK 只会简单记录会话的标记值，并不会改变会话的底层逻辑。
</Note>

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/eac83b14ce.png" alt="9_会话标记_中文.png"/>
</Frame>

## 设置会话标记

ZIM 支持开发者使用客户端 API 或 服务端 API 实现对会话的标记操作。

### 客户端 API

#### 1 监听 onConversationChanged

:::if{props.platform="undefined|Web|iOS|mac|Flutter|window"}
用户登录 ZIM SDK 后，需监听注册 {getPlatformData(props,setEventHandlerMap)} 监听的 {getPlatformData(props,onConversationChangedMap)} 回调接口，接收会话标记变化通知。
:::
:::if{props.platform="UTS"}
用户登录 ZIM SDK 后，需监听 {getPlatformData(props,onConversationChangedMap)} 回调接口，接收会话标记变化通知。
:::

当会话标记变更后，用户的所有在线设备会收到 {getPlatformData(props,onConversationChangedMap)} 事件通知，从其中 {getPlatformData(props,conversationMarksMap)} 字段可以获取到该会话当前的所有标记。


:::if{props.platform=undefined}
```java
// 注册 SDK 事件通知回调
zim.setEventHandler(this);

...

public void onConversationChanged(ZIM zim, ArrayList<ZIMConversationChangeInfo> conversationChangeInfoList) {
    super.onConversationChanged(zim, conversationChangeInfoList);
    for (ZIMConversationChangeInfo conversationChangeInfo : conversationChangeInfoList) {
        // 从 conversationChangeInfo.conversation.marks 中可以获取到该会话的全量标记
    }
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 注册 SDK 事件通知回调
[self.zim setEventHandler:self];

...


// 注册 SDK 事件通知回调
- (void)zim:(ZIM *)zim
conversationChanged:(NSArray<ZIMConversationChangeInfo *> *)conversationChangeInfoList{    
    for(ZIMConversationChangeInfo *changeInfo in conversationChangeInfoList){
        // 从 conversationChangeInfo.conversation.marks 中可以获取到该会话的全量标记
    }
}
```
:::
:::if{props.platform="window"}
```cpp
// 注册 SDK 事件通知回调
class zim_event_handler : public zim::ZIMEventHandler {
    // 
    virtual void onConversationChanged(
        zim::ZIM *zim,
        const std::vector<zim::ZIMConversationChangeInfo> &conversationChangeInfoList) override;
}
```
:::
:::if{props.platform="Web"}
```typescript
// 注册 SDK 事件通知回调
zim.on('conversationChanged', (zim, data) => {
    data.infoList.forEach((info) => {
        console.log(info.conversation.marks);
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 注册 SDK 事件通知回调
zim.onConversationChanged((data) => {
    data.infoList.forEach((info) => {
        console.log(info.conversation.marks);
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 注册 SDK 事件通知回调
ZIMEventHandler.onConversationChanged = (ZIM zim, List<ZIMConversationChangeInfo> conversationChangeInfoList){
    for (ZIMConversationChangeInfo conversationChangeInfo in conversationChangeInfoList) {
        // 从 conversationChangeInfo.conversation.marks 中可以获取到该会话的全量标记
    }
};
```

:::

#### 2 设置或取消标记     

您只需调用 {getPlatformData(props,setConversationMarkMap)} 接口，即可对至多 100 个会话（仅支持**单聊**或**群聊**）设置或取消标记。

<Note title="说明">
- 每名用户最多可标记 1000 个会话。针对标记数量达到上限的情况，不同 ZIM SDK 版本的处理逻辑如下：
  - **SDK 版本 ≥ 2.19.0**：用户可继续标记新会话，ZIM 会自动取消最早标记的会话。
  - **SDK 版本 < 2.19.0**：标记会话时会触发报错，用户需手动取消之前的标记后才能添加新标记。  
- 针对单个会话可拥有的标记上限，不同 ZIM SDK 版本规定如下：
    - **SDK 版本 ≥ 2.19.0**：最多 30 个标记。  
    - **SDK 版本 < 2.19.0**：最多 20 个标记。  
</Note>

:::if{props.platform=undefined}
```java
// 以对一个群聊会话设置标签为 1 为例
Integer markType = 1;
boolean enable  = true;
ArrayList<ZIMConversationBaseInfo> convList = new ArrayList<>();
ZIMConversationBaseInfo conversation = new ZIMConversationBaseInfo();
conversation.conversationID = "GroupConv";
conversation.conversationType = ZIMConversationType.GROUP;
convList.add(conversation);

zim.setConversationMark(markType, enable, convList, new ZIMConversationMarkSetCallback() {
    @Override
    public void onConversationMarkSet(ArrayList<ZIMConversationBaseInfo> failedConversationInfos, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 操作成功的处理。
            // 注意：即便部分操作成功，部分操作失败，errorCode 仍会为 SUCCESS，且会在 failedConversationInfos 返回操作失败的会话
        } else {
            // 对所有会话的操作都失败时的处理
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```Objective-C
// 以对一个群聊会话设置标签为 1 为例
NSNumber *markType = @(1);
BOOL enable = YES;
ZIMConversationBaseInfo *conversationInfo = [[ZIMConversationBaseInfo alloc] init];
conversationInfo.conversationID = @"GroupConv";
conversationInfo.conversationType = ZIMConversationTypeGroup;

[[ZIM getInstance] setConversationMark:markType enable:enable conversationInfos:@[conversationInfo] callback:^(NSArray<ZIMConversationBaseInfo *> * _Nonnull failedConversationInfos, ZIMError * _Nonnull errorInfo) {
    if (errorInfo.code == ZIMErrorCodeSuccess) {
        // 操作成功的处理
        // 注意：即便部分操作成功，部分操作失败，errorCode 仍会为 SUCCESS，且会在 failedConversationInfos 返回操作失败的会话
    } else {
        // 对所有会话的操作都失败时的处理
    }
}];
```
:::

:::if{props.platform="window"}
```cpp
// 以对一个群聊会话设置标签为 1 为例
int markType = 1;
bool enable = true;
auto infos = std::vector<ZIMConversationBaseInfo>({ZIMConversationBaseInfo("conv_id", ZIMConversationType::ZIM_CONVERSATION_TYPE_GROUP)});

zim_->setConversationMark(
    markType, enable, infos,
    [=](/zim-ios/guides/conversation/const-std::vector<zim::zimconversationbaseinfo>-&failedconversationlist,-const-zim::zimerror-&errorinfo) {
        // 业务逻辑
    });
```

:::
:::if{props.platform="Web|UTS"}
```typescript
// 以对一个单聊会话和一个群聊会话设置标签为 1 为例
const markType = 1;
const enable = true;
const convList: ZIMConversationBaseInfo[] = [
    { conversationID: '单聊', conversationType: 0 },
    { conversationID: '群聊', conversationType: 2 },
];

zim.setConversationMark(markType, enable, convList)
    .then((res: ZIMConversationMarkSetResult) => {
        // 操作成功，部分失败的会话通过 res.failedConversationInfos 返回
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="Flutter"}
```dart
// 以对一个群聊会话设置标签为 1 为例
int markType = 1;
bool enable = true;
List<ZIMConversationBaseInfo> convList = [];
ZIMConversationBaseInfo conversationBaseInfo = ZIMConversationBaseInfo();
conversationBaseInfo.conversationID = "GroupConv";
conversationBaseInfo.conversationType = ZIMConversationType.group;
convList.add(conversationBaseInfo);
ZIM.getInstance()?.setConversationMark(markType, enable, convList).then((value) {
        // 操作成功的处理。
        // 注意：即便部分操作成功，部分操作失败，errorCode 仍会为 SUCCESS，且会在 failedConversationInfos 返回操作失败的会话
    }).catchError((onError){
        if(onError is PlatformException){
            // 对所有会话的操作都失败时的处理
        }
});
```

:::
### 服务端 API

开发者可以通过调用服务端 API 批量对多名用户设置或取消会话标记，详情请参考服务端 API 文档 [设置会话标记](/zim-server/conversation/set-conversation-marks)。

## 按标记查询会话列表

调用 {getPlatformData(props,queryConversationListMap)} 接口，通过 {getPlatformData(props,ZIMConversationFilterOptionMarksMap)} 传入会话标记列表，即可将标记作为过滤项查询会话列表。

<Note title="说明">

- 会话标记列表（{getPlatformData(props,ZIMConversationFilterOptionMarksMap)}）只支持 [1, 20] 的整数：
    - 若列表包含 -1，查询结果为所有已标记会话；
    - 若列表包含 0，查询结果为所有无标记的会话；
    - 若传入多个标记，查询结果为所有传入标记的并集；
    - 若列表为空，则查询结果为所有会话。
- 仅查询单聊会话和群聊会话。
</Note>

此外，如果查询时需要考虑会话是否存在未读数，在调用 {getPlatformData(props,queryConversationListMap)} 接口时，传入 `isOnlyUnreadConversation` 为 true 即可。


:::if{props.platform=undefined}
```java
// 以查询拥有标记为 1 且包含存在未读数的群聊会话列表为例
ZIMConversationQueryConfig config = new ZIMConversationQueryConfig();
config.count = 100;
config.nextConversation = null; // 首次查询填 null，多次分页查询则传入返回结果中的会话列表中的最后一个
ZIMConversationFilterOption option = new ZIMConversationFilterOption();
option.marks.add(1); // 这里填入需要查询的标记
option.conversationTypes.add(ZIMConversationType.GROUP); // 这里填入需要查询的会话类型，若该列表为空，则同时查询单聊和群聊会话。
option.isOnlyUnreadConversation = true； // 这里填入是否仅查询存在未读数的会话，默认为 false，查询时不考虑会话是否存在未读数

zim.queryConversationList(config, option, new ZIMConversationListQueriedCallback() {
    @Override
    public void onConversationListQueried(ArrayList<ZIMConversation> conversationList, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 查询成功的处理
        } else {
            // 查询失败的处理
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```Objective-C
// 以查询拥有标记为 1 且包含存在未读数的群聊会话列表为例
ZIMConversationQueryConfig *config = [[ZIMConversationQueryConfig alloc] init];
config.count = 100;
config.nextConversation = nil; // 首次查询填 nil，多次分页查询则传入返回结果中的会话列表中的最后一个

ZIMConversationFilterOption *option = [[ZIMConversationFilterOption alloc] init];
option.marks = @[@(1)];
option.conversationTypes = @[@(ZIMConversationTypeGroup)];
option.isOnlyUnreadConversation = YES; // 这里填入是否仅查询存在未读数的会话，默认为 NO，查询时不考虑会话是否存在未读数

[zim queryConversationListWithConfig:config
                                option:option
                                callback:^(NSArray<ZIMConversation *> *conversationList, ZIMError *errorInfo) {
    if (errorInfo.code == ZIMErrorCodeSuccess) {
        // 查询成功的处理
    } else {
        // 查询失败的处理
    }
}];
```
:::

:::if{props.platform="window"}
```cpp
// 以查询拥有标记为 1 且包含存在未读数的群聊会话列表为例
zim::ZIMConversationQueryConfig queryConfig;
queryConfig.nextConversation = nullptr; // 首次查询填 nullptr，多次分页查询则传入返回结果中的会话列表中的最后一个
queryConfig.count = 100;

zim::ZIMConversationFilterOption option;
option.marks.push_back(1); // 这里填入需要查询的标记
option.conversationTypes.push_back(ZIMConversationType::ZIM_CONVERSATION_TYPE_GROUP);  // 这里填入需要查询的会话类型。若该列表为空，则同时查询单聊和群聊会话。

option.isOnlyUnreadConversation = true; // 这里填入是否仅查询存在未读数的会话，默认为 false，查询时不考虑会话是否存在未读数

zim_sdk_->GetInstance()->queryConversationList(
queryConfig, option,
[=](/zim-ios/guides/conversation/const-std::vector<std::shared_ptr<zim::zimconversation>>-&conversationlist,-const-zim::zimerror-&errorinfo) {
    // 业务逻辑
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 以查询拥有标记为 1 且包含存在未读数的会话列表（包含单聊和群聊）为例
const config: ZIMConversationQueryConfig = { count: 10 };
const option: ZIMConversationFilterOption = {
    marks: [1],
    conversationTypes: [],
    isOnlyUnreadConversation: true,
};

zim.queryConversationList(config, option)
    .then((res: ZIMConversationListQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="Flutter"}
```dart
// 以查询拥有标记为 1 且包含存在未读数的群聊会话列表为例
ZIMConversationQueryConfig config = ZIMConversationQueryConfig();
config.count = 100;
config.nextConversation = null; // 首次查询填 null，多次分页查询则传入返回结果中的会话列表中的最后一个
ZIMConversationFilterOption option = ZIMConversationFilterOption();
option.marks.add(1); // 这里填入需要查询的标记
option.conversationTypes.add(ZIMConversationType.group); // 这里填入需要查询的会话类型，若该列表为空，则同时查询单聊和群聊会话。
option.isOnlyUnreadConversation = true; // 这里填入是否仅查询存在未读数的会话，默认为 false，查询时不考虑会话是否存在未读数

ZIM.getInstance()?.queryConversationList(config,option).then((value) {
// 查询成功的处理
}).catchError((onError){
if(onError is PlatformException){
    // 查询失败的处理
    onError.code;
    onError.message;
}
});
```

:::

## 按标记查询消息未读总数

调用 {getPlatformData(props,queryConversationTotalUnreadMessageCountMap)} 接口，通过 {getPlatformData(props,ZIMConversationTotalUnreadMessageCountQueryConfigMarksMap)} 传入会话标记列表，即可按标记查询相关会话的消息未读总数。

<Note title="说明">

- 此处计算消息未读总数的规则与 {getPlatformData(props,onConversationTotalUnreadMessageCountUpdatedMap)} 事件一致，即如果有符合要求的会话已开启免打扰，那么这个会话的未读数不会被计入这里查询出来的总未读数。
- 会话标记列表（{getPlatformData(props,ZIMConversationTotalUnreadMessageCountQueryConfigMarksMap)}）只支持 [1, 20] 的整数：
    - 若列表包含 -1，查询结果为所有已标记会话；
    - 若列表包含 0，查询结果为所有无标记的会话；
    - 若传入多个标记，查询结果为所有传入标记的并集；
    - 若列表为空，则查询结果为所有会话。
- 仅查询单聊会话和群聊会话。
</Note>


:::if{props.platform=undefined}
```java
// 以查询包含标记为 1 的群聊会话总未读数为例
ZIMConversationTotalUnreadMessageCountQueryConfig config = new ZIMConversationTotalUnreadMessageCountQueryConfig();
config.marks.add(1); // 这里填入需要查询的标记
config.conversationTypes.add(ZIMConversationType.GROUP); // 这里填入需要查询的会话类型。若该列表为空，则同时查询单聊和群聊会话。
zim.queryConversationTotalUnreadMessageCount(config, new ZIMConversationTotalUnreadMessageCountQueriedCallback() {
    @Override
    public void onConversationTotalUnreadMessageCountQueried(int unreadMessageCount, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 查询成功的处理
        } else {
            // 查询失败的处理
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```Objective-C
// 以查询包含标记为 1 的群聊会话总未读数为例
ZIMConversationTotalUnreadMessageCountQueryConfig *config = [[ZIMConversationTotalUnreadMessageCountQueryConfig alloc] init];
config.marks =@[@(1)]; // 这里填入需要查询的标记
config.conversationTypes = @[@(ZIMConversationTypeGroup)]; // 这里填入需要查询的会话类型。若该列表为空，则同时查询单聊和群聊会话。


[[ZIM getInstance] queryConversationTotalUnreadMessageCountWithConfig:config callback:^(unsigned int unreadMessageCount, ZIMError * _Nonnull errorInfo) {
    if (errorInfo.code == ZIMErrorCodeSUCCESS) {
        // 查询成功的处理
    } else {
        // 查询失败的处理
    }
}];
```
:::
:::if{props.platform="window"}
```cpp
// 以查询包含标记为 1 的群聊会话总未读数为例
zim::ZIMConversationTotalUnreadMessageCountQueryConfig queryConfig;
queryConfig.marks.push_back(1); // 这里填入需要查询的标记
queryConfig.conversationTypes.push_back(ZIMConversationType::ZIM_CONVERSATION_TYPE_GROUP); // 这里填入需要查询的会话类型。若该列表为空，则同时查询单聊和群聊会话。

zim_sdk_->GetInstance()->queryConversationTotalUnreadMessageCount(
    queryConfig, [=](/zim-ios/guides/conversation/unsigned-int-totalunreadcount,-const-zim::zimerror-&errorinfo) {
        // 业务逻辑
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 以查询包含标记为 1 的会话总未读数（包含单聊和群聊）为例
const config: ZIMConversationTotalUnreadMessageCountQueryConfig = {
    marks: [1],
    conversationTypes: [],
};

zim.queryConversationTotalUnreadMessageCount(config)
    .then((res: ZIMConversationTotalUnreadMessageCountQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="Flutter"}
```dart
// 以查询包含标记为 1 的群聊会话总未读数为例
ZIMConversationTotalUnreadMessageCountQueryConfig config =  ZIMConversationTotalUnreadMessageCountQueryConfig();
config.marks.add(1); // 这里填入需要查询的标记
config.conversationTypes.add(ZIMConversationType.group); // 这里填入需要查询的会话类型。若该列表为空，则同时查询单聊和群聊会话。
ZIM.getInstance()?.queryConversationTotalUnreadMessageCount(config).then((value) {
    // 查询成功的处理
}).catchError((onError){
    if(onError is PlatformException){
        // 查询失败的处理
    }
});
```
:::
<Content platform="iOS" />