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

export const queryConversationListMap = {
  'Android': <a href="@queryConversationList" target='_blank'>queryConversationList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target='_blank'>queryConversationList</a>,
  'iOS': <a href="@queryConversationListWithConfig" target='_blank'>queryConversationListWithConfig</a>,
}
export const isPinnedMap = {
  'Android': <a href="@isPinned-ZIMConversation" target='_blank'>isPinned</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation/isPinned.html" target='_blank'>isPinned</a>,
}
export const updateConversationPinnedStateMap = {
  'Android': <a href="@updateConversationPinnedState" target='_blank'>updateConversationPinnedState</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateConversationPinnedState.html" target='_blank'>updateConversationPinnedState</a>,
}
export const queryConversationPinnedListMap = {
  'Android': <a href="@queryConversationPinnedList" target='_blank'>queryConversationPinnedList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationPinnedList.html" target='_blank'>queryConversationPinnedList</a>,
  'iOS': <a href="@queryConversationPinnedListWithConfig" target='_blank'>queryConversationPinnedListWithConfig</a>,
}




# 置顶会话

- - -

## 功能简介

会话置顶指的是将单聊或者群聊会话固定于会话列表的顶部，不会被其他非置顶会话挤到底部，方便用户查找。用户通过客户端将会话置顶后，置顶状态会存储在服务器，因此，当用户切换终端设备后，置顶状态会同步到当前设备。

ZIM 支持用户置顶会话，以及查询置顶会话列表。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/3731b8d2e9.png" alt="7_置顶会话_中文.png"/>
</Frame>

<Note title="说明">

- 仅支持 2.8.0 或以上版本的 ZIM SDK 实现会话置顶。
- 置顶会话数量上限为 100。
</Note>

#### 置顶顺序说明

- 置顶会话始终排在未置顶会话之前。
    
    <Note title="说明">
    
    对于通过调用 {getPlatformData(props,queryConversationListMap)} 接口拉取的会话列表，此规则同样适用。开发者可以通过拉取结果中 ZIMConversation 的 {getPlatformData(props,isPinnedMap)} 字段，确认会话是否被置顶。
    </Note>

- 用户置顶多个会话后，相关会话之间的相对顺序仍然会保持。   
    假设有 5 个会话，在会话列表中的现有排序为：a、b、c、d、e。   
    用户将会话 b 和 d 置顶（不论先置顶哪个），顺序变更为 b、d、a、c、e，即 b 和 d 排在最前面，并且会话 b 仍然排在 d 之前。

    <Note title="说明">
    
    上述场景成立的前提为会话的 orderKey 没有被其他事件改变（如收到新消息后，会话的 order key 会变大）。当 orderKey 变化后，置顶会话列表中的顺序会改变。
    </Note>

## 置顶会话

用户登录后，可调用 {getPlatformData(props,updateConversationPinnedStateMap)} 接口置顶或取消置顶自己会话列表中的某个会话。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 置顶某单聊会话
boolean isPinned = true;
zim.updateConversationPinnedState(isPinned, conversation.conversationID, conversation.type, new ZIMConversationPinnedStateUpdatedCallback() {
        @Override
        public void onConversationPinnedStateUpdated(String conversationID, ZIMConversationType conversationType, ZIMError errorInfo) {
             // 更新会话置顶状态后的回调。
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="iOS"}

<CodeGroup>
```objc title="示例代码"
// 置顶某单聊会话
bool isPinned = YES;

[[ZIM getInstance] updateConversationPinnedState:isPinned conversationID:@"conversationID" conversationType:ZIMConversationTypePeer callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, ZIMError * _Nonnull errorInfo) {
    //业务逻辑
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 置顶某单聊会话
zim_->updateConversationPinnedState(
    true, conv_id, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    [=](/zim-web/guides/conversation/const-std::string-&conversationid,-zim::zimconversationtype-conversationtype,-const-zim::zimerror-&errorinfo) {
        // 置顶会话操作的结果回调通知
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            //......
        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 置顶某单聊会话
ZIM.GetInstance().UpdateConversationPinnedState(
    true, "conv_id", ZIMConversationType.Peer,
    (string conversationID, ZIMConversationType conversationType,
        ZIMError errorInfo) {
        // 置顶会话操作的结果回调通知
        if (errorInfo.code == ZIMErrorCode.Success) {
            //......
        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 置顶某单聊会话
const isPinned = true;
const conversationID = "";
const conversationType = 0;
zim.updateConversationPinnedState(isPinned, conversationID, conversationType)
    .then((res: ZIMConversationPinnedStateUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })
```
</CodeGroup>

:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 置顶某单聊会话
ZIM.getInstance().updateConversationPinnedState(true, "conversationID", ZIMConversationType.peer
    ).then((value){

}).catchError((onError){
    // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
});
```
</CodeGroup>
:::

## 查询置顶会话列表

用户登录后，可以通过 {getPlatformData(props,queryConversationPinnedListMap)} 接口，获取全量的置顶会话列表。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ZIMConversationQueryConfig config = new ZIMConversationQueryConfig();
config.nextConversation = null;// 第一次传null，后续传列表最后一个会话作为锚点。
config.count = count; // 每次获取置顶会话的数量

// 拉取置顶会话列表
zim.queryConversationPinnedList(config, new ZIMConversationPinnedListQueriedCallback() {
    @Override
    public void onConversationPinnedListQueried(ArrayList<ZIMConversation> conversationList, ZIMError errorInfo) {
        // 获取到置顶列表数据。
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
ZIMConversationQueryConfig *queryConfig = [[ZIMConversationQueryConfig alloc] init];
// 每次获取置顶会话的数量
queryConfig.count = 20;
// 首次查询无需传入
queryConfig.nextConversation = nil;
[[ZIM getInstance] queryConversationPinnedListWithConfig:queryConfig callback:^(NSArray<ZIMConversation *> * _Nonnull conversationList, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code != ZIMErrorCodeSuccess){
        NSLog(@"请根据实际错误码与错误信息，对照错误码表来处理");
        return;
    }
    NSLog(@"conversationList 为查询结果");

    // 下次查询时将末尾的 conversation 传入即可在上次查询结果的基础上继续查询后续内容
    queryConfig.nextConversation = [conversationList lastObject];
}];
```
</CodeGroup>

:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
zim::ZIMConversationQueryConfig config;
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = nullptr;
// 每次获取置顶会话的数量
config.count = 100;
// 拉取置顶会话列表
zim_->queryConversationPinnedList(
    config,
    [=](/zim-web/guides/conversation/const-std::vector<std::shared_ptr<zim::zimconversation>>-&conversationlist,-const-zim::zimerror-&errorinfo) {
        // 拉取置顶会话列表操作的结果回调通知
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            for (const auto &conv : conversationList) {
                //......
            }
        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMConversationQueryConfig config = new ZIMConversationQueryConfig();
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = null;
// 每次获取置顶会话的数量
config.count = 100;
// 拉取置顶会话列表
ZIM.GetInstance().QueryConversationPinnedList(
    config,
    [=](/zim-web/guides/conversation/list<zimconversation>-convlist,-zimerror-errorinfo) {
        // 拉取置顶会话列表操作的结果回调通知
        if (errorInfo.code == ZIMErrorCode.Success) {
            foreach (var conv in convList) {
                //......
            }
        } else {
            // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
        }
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
const config: ZIMConversationQueryConfig = {
    // 会话锚点，传空则代表从最新开始查询
    nextConversation: null,
    // 会话一次分页查询数
    count: 20
};

// 拉取会话列表
zim.queryConversationPinnedList(config)
    .then((res: ZIMConversationPinnedListQueriedResult) => {
        // 查询成功，开发者需要保存和维护数组内的会话对象
    })
    .catch((err: ZIMError) => {
        // 查询失败
    })
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
ZIMConversationQueryConfig config;
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = null;
// 每次获取置顶会话的数量
config.count = 100;
// 拉取置顶会话列表

ZIM.getInstance().queryConversationPinnedList(config).then((value) {
    // 拉取置顶会话列表操作的结果回调通知
}).catchError((onError){
    // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
});
```
</CodeGroup>
:::
<Content platform="Web" />