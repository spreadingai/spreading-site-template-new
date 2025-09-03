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

export const setEventHandlerMap = {
  'Android': <a href="https://doc-zh.zego.im/" target="_blank">setEventHandler</a>,
  'Web,harmonyos,UTS':<a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#on" target="_blank">on</a>,
  'Flutter':<a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target="_blank">ZIMEventHandler</a>,
}
export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'U3d': <a href="@OnConversationChanged" target='_blank'>OnConversationChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>onConversationChanged</a>,
  'Web,harmonyos': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im//article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im//article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
}
export const onConversationSyncStateChangedMap = {
  'Android': <a href="@onConversationSyncStateChanged" target='_blank'>onConversationSyncStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationSyncStateChanged.html" target='_blank'>onConversationSyncStateChanged</a>,
  'Web': <a href="@conversationSyncStateChanged" target='_blank'>conversationSyncStateChanged</a>,
  'UTS': <a href="@conversationSyncStateChanged" target='_blank'>onConversationSyncStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im//article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-sync_state-changed" target='_blank'>conversationSyncStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im//article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-sync-state-changed" target='_blank'>conversationSyncStateChanged</a>,
}
export const queryConversationListMap = {
  'Android': <a href="@queryConversationList" target='_blank'>queryConversationList</a>,
  'U3d': <a href="@QueryConversationList" target='_blank'>QueryConversationList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target='_blank'>queryConversationList</a>,
  'iOS,mac': <a href="@queryConversationListWithConfig" target='_blank'>queryConversationListWithConfig</a>,
}
export const ZIMConversationQueryConfigMap = {
  'Android': <a href="@-ZIMConversationQueryConfig" target='_blank'>ZIMConversationQueryConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationQueryConfig-class.html" target='_blank'>ZIMConversationQueryConfig</a>,
}
export const ZIMConversationSyncStateStartedMap = {
  'Android': <code>STARTED</code>,
  'window': <code>ZIM_CONVERSATION_SYNC_STATE_STARTED</code>,
  "iOS,mac": <code>ZIMConversationSyncStateStarted</code>,
  "Flutter": <code>Started</code>,
  "Web,UTS": <code>Started</code>,
}
export const ZIMConversationSyncStateFinishedMap = {
  'Android': <code>FINISHED</code>,
  'window': <code>ZIM_CONVERSATION_SYNC_STATE_FINISHED</code>,
  "iOS,mac": <code>ZIMConversationSyncStateFinished</code>,
  "Flutter": <code>finished</code>,
  "Web,UTS": <code>Finished</code>,
}
export const ZIMConversationSyncStateFailedMap = {
  'Android': <code>FAILED</code>,
  'window': <code>ZIM_CONVERSATION_SYNC_STATE_FAILED</code>,
  "iOS,mac": <code>ZIMConversationSyncStateFailed</code>,
  "Flutter": <code>failed</code>,
  "Web,UTS": <code>Failed</code>,
}

# 获取会话列表

- - -

## 功能简介

`会话`，通常是在用户发送“**单聊/群组**”消息时，ZIM SDK 会自动建立的逻辑关系。仅以下消息类型可用于建立会话：


:::if{props.platform="undefined|iOS|mac|Web|UTS|Flutter|window|harmonyos|UTS"}
<table>
  <tbody>
    <tr>
        <th>消息类型</th>
        <th>可创建会话类型</th>
    </tr>    
    <tr>
        <td>文本消息</td>
        <td rowspan="5"><ul><li>单聊会话</li><li>群组会话</li></ul></td>
    </tr>
    <tr>
        <td>富媒体消息（图片、音频、视频、文件）</td>
    </tr>
    <tr>
        <td>组合消息</td>
    </tr>
    <tr>
        <td>合并消息</td>
    </tr>
    <tr>
        <td>自定义消息</td>
    </tr>
    <tr>
        <td>Tips 消息</td>
        <td>您需要先联系 ZEGO 技术支持开通**群组管理**类的 Tips 消息特性。随后，当用户创建群组时，ZIM SDK 会将此操作转换为一条群组会话内的特殊类型消息（Tips 消息），由此，群组会话成功创建。</td>
    </tr>
  </tbody>
</table>

<Note title="说明">若用户在会话尚未存在时 [插入本地消息](/zim-uniapp-x/guides/messaging/insert-local-messages) 或 [保存会话草稿](/zim-uniapp-x/guides/conversation/set-conversation-draft)，将生成本地会话。当该用户 [从本地数据库获取会话列表](#从本地数据库获取) 时，这些本地会话会被查到。</Note>
:::
:::if{props.platform="U3d"}
<table>
  <tbody>
    <tr>
        <th>消息类型</th>
        <th>可创建会话类型</th>
    </tr>    
    <tr>
        <td>文本消息</td>
        <td rowspan="3"><ul><li>单聊会话</li><li>群组会话</li></ul></td>
    </tr>
    <tr>
        <td>富媒体消息（图片、音频、视频、文件）</td>
    </tr>
    <tr>
        <td>自定义消息</td>
    </tr>
  </tbody>
</table>

<Note title="说明">若用户在会话尚未存在时 [插入本地消息](/zim-uniapp-x/guides/messaging/insert-local-messages)，将生成本地会话。当该用户 [从本地数据库获取会话列表](#从本地数据库获取) 时，这些本地会话会被查到。</Note>
:::

用户登录后，ZIM SDK 会自动从服务端同步其最新会话列表。当会话列表发生变更时，SDK 会通过回调通知用户。同时，用户也可主动从本地数据库拉取会话列表；开发者亦可通过服务端接口获取指定用户的全量会话数据。

开发者可在社交聊天、游戏社区、在线咨询等场景中获取并展示单聊、群组会话列表。

<Frame width="300" height="auto"><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/messagesList.png" /></Frame>

:::if{props.platform="undefined|iOS|mac|Web|Flutter|window|UTS"}
## 监听会话列表同步状态变更
:::

:::if{props.platform="undefined|iOS|mac|Web|Flutter|window"}
在用户登录前，请调用 {getPlatformData(props,setEventHandlerMap)} 接口并监听 {getPlatformData(props,onConversationSyncStateChangedMap)} 回调，以便获知其从 ZIM 服务端同步最新会话列表的状态。
:::

:::if{props.platform="UTS"}
在用户登录前，请监听 {getPlatformData(props,onConversationSyncStateChangedMap)} 回调，以便获知其从 ZIM 服务端同步最新会话列表的状态。
:::

:::if{props.platform="undefined|iOS|mac|Web|Flutter|window|UTS"}

<Note title="说明">
仅限登录成功后或重连后会接收到此回调。
</Note>

<div>
| 枚举 | 枚举值 | 事件 | 建议操作 |
|------|--------|------|----------|
| {getPlatformData(props,ZIMConversationSyncStateStartedMap)} | 0 |会话列表同步开始。 | 业务层可以通过本事件在 UI 上开始展示"拉取中"。建议在会话列表同步期间不要查询会话列表，等待会话列表拉取完成后再进行查询。 |
| {getPlatformData(props,ZIMConversationSyncStateFinishedMap)} | 1 | 会话列表同步完成。 | 业务层可以通过本事件在 UI 上取消展示"拉取中"。此时可以开始查询会话列表。 |
| {getPlatformData(props,ZIMConversationSyncStateFailedMap)} | 2 | 会话列表同步失败。 | 业务层可以通过本事件在 UI 上取消展示"拉取中"。 |
</div>
:::

:::if{props.platform=undefined}
```java
// 注册 SDK 事件通知回调
zim.setEventHandler(this);

...

public void onConversationSyncStateChanged(ZIM zim, ZIMConversationSyncState state) {
    super.onConversationSyncStateChanged(zim, state);

    if (state == ZIMConversationSyncState.STARTED) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == ZIMConversationSyncState.FINISHED) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == ZIMConversationSyncState.FAILED) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 注册 SDK 事件通知回调
[self.zim setEventHandler:self];

...

- (void)zim:(ZIM *)zim conversationSyncStateChanged:(ZIMConversationSyncState)state {
    if (state == ZIMConversationSyncStateStarted) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == ZIMConversationSyncStateFinished) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == ZIMConversationSyncStateFailed) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
}
```
:::
:::if{props.platform="window"}
```cpp
// 注册 SDK 事件通知回调
zim->setEventHandler(shared_from_this());

...

void onConversationSyncStateChanged(ZIM * /*zim*/, ZIMConversationSyncState state) {
    if (state == ZIM_CONVERSATION_SYNC_STATE_STARTED) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == ZIM_CONVERSATION_SYNC_STATE_FINISHED) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == ZIM_CONVERSATION_SYNC_STATE_FAILED) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
}
```

:::
:::if{props.platform="Web"}
```typescript
zim.on('conversationSyncStateChanged', (zim, data) => {
    console.log('conversationSyncStateChanged', data);
    const state = data.state;
    if (state == 0) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == 1) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == 2) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationSyncStateChanged((data) => {
    console.log('conversationSyncStateChanged', data);
    const state = data.state;
    if (state == 0) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == 1) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == 2) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConversationSyncStateChanged = (ZIM zim, ZIMConversationSyncStatestate) {
    if (state == started) {
        // 开始从服务端同步会话列表，UI 可以展示“拉取中”
    } else if (state == finished) {
        // 从服务端同步会话列表完成，UI 可以取消展示“拉取中”
    } else if (state == failed) {
        // 从服务端同步会话列表失败，UI 可以取消展示“拉取中”，并记录失败上传日志等
    }
};
```

:::




## 监听会话变更

:::if{props.platform="undefined|iOS|mac|Web|Flutter|window|harmonyos"}
在用户登录之前，请调用 {getPlatformData(props,setEventHandlerMap)} 接口，监听 {getPlatformData(props,onConversationChangedMap)} 回调，将会在如下情形时收到会话变更通知：
:::
:::if{props.platform="UTS|U3d"}
在用户登录之前，请监听 {getPlatformData(props,onConversationChangedMap)} 回调，将会在如下情形时收到会话变更通知：
:::

<table>
<tbody><tr>
<th>类别</th>
<th>事件</th>
<th>对应 Event</th>
<th>对应 ZIMConnversation 属性</th>
</tr>
<tr>
<td rowspan="4">会话内基础属性</td>
<td>会话名称变更。</td>
<td rowspan="11"><code>Updated</code></td>
<td><code>conversationName</code></td>
</tr>
<tr>
<td>会话头像 URL 变更。</td>
<td><code>conversationAvatarUrl</code></td>
</tr>
<tr>
<td><ul><li>用户为好友设置备注（<code>friendAlias</code>）后，ZIM SDK 同步修改相关单聊的会话别名。</li><li>用户为群组设置备注（<code>groupAlias</code>）后，ZIM SDK 同步修改相关群组的会话别名</li></ul></td>
<td><code>conversationAlias</code></td>
</tr>
<tr>
<td>会话未读数变更，包含因用户删除了未读消息导致的变更。</td>
<td><code>unreadMessageCount</code></td>
</tr>
<tr>
<td rowspan="4">会话内额外属性</td>
<td>用户设置/取消置顶会话。</td>
<td><code>isPinned</code></td>
</tr>
<tr>
<td>用户对会话设置通知状态。</td>
<td><code>notificationStatus</code></td>
</tr>
<tr>
<td>用户保存会话草稿。</td>
<td><code>draft</code></td>
</tr>
<tr>
<td>用户在会话中被提醒。若用户删除了 @ 自己的消息，也会接收到此事件通知。</td>
<td><code>mentionedInfoList</code></td>
</tr>
<tr>
<td rowspan="3">会话最后一条消息变更</td>
<td>用户收到新消息。</td>
<td rowspan="3"><code>lastMessage</code></td>
</tr>
<tr>
<td>用户发送新消息。</td>
</tr>
<tr>
<td>最后一条消息的状态、内容变更，或被用户删除。</td>
</tr>
<tr>
<td rowspan="6">会话状态变更</td>
<td>用户有新会话。</td>
<td><code>Added</code></td>
<td>-</td>
</tr>
<tr>
<td>
用户主动离开/被踢出群组会话。
<Note title="说明">

前提是群组会话已存在（即会话内有消息）。
</Note>
</td>
<td rowspan="4"><code>Disabled</code></td>
<td rowspan="4">-</td>
</tr>
<tr>
<td>
群组会话被解散。
<Note title="说明">
前提是群组会话已存在（即会话内有消息）。
</Note>
</td>
</tr>
<tr>
<td>发送单聊消息时对端用户不存在。</td>
</tr>
<tr>
<td>在未加入某群组时，用户向该群组发送消息。</td>
</tr>
<tr>
<td>在多端登录场景下，当用户在某一设备上删除会话后，其他设备会立即收到该会话事件的通知。</td>
<td><code>Deleted</code></td>
<td>-</td>
</tr>
</tbody>
</table>

此时开发者可根据需求 <a href="#获取会话列表">获取会话列表</a>。

<Note title="说明">

{getPlatformData(props,onConversationChangedMap)} 回调接口，目前仅通知“存放于用户本地数据库和 ZIM 服务端的会话列表增量变化情况”。   

开发者需要通过维护从 {getPlatformData(props,queryConversationListMap)} 接口中获取到的会话列表数组，根据当前会话更新情况，进行相应的属性更改、插入、和排序展示。
</Note>


:::if{props.platform=undefined}
```java
// 注册 SDK 事件通知回调
zim.setEventHandler(this);

...

public void onConversationChanged(ZIM zim, ArrayList<ZIMConversationChangeInfo> conversationChangeInfoList) {
    super.onConversationChanged(zim, conversationChangeInfoList);

}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 注册 SDK 事件通知回调
[self.zim setEventHandler:self];

...

- (void)zim:(ZIM *)zim conversationChanged:(NSArray<ZIMConversationChangeInfo *> *)conversationChangeInfoList {
    // 获取会话变更列表
    for (ZIMConversationChangeInfo *info in conversationChangeInfoList) {
        if (info.event == ZIMConversationEventAdded) {
            // 添加到开发者自行维护的列表中，同时刷新 UI
        } else if (info.event == ZIMConversationEventUpdated) {
           // 修改会话属性，同时刷新 UI
        }
    }
}
```
:::
:::if{props.platform="window"}
```cpp
// 注册 SDK 事件通知回调
zim->setEventHandler(shared_from_this());

...

void onConversationChanged(ZIM * zim, const std::vector<ZIMConversationChangeInfo> & conversationChangeInfoList) {
    // 获取会话变更列表
    for (auto &info : conversationChangeInfoList) {
        if (info.event == ZIMConversationEventAdded) {
            // 添加到开发者自行维护的列表中，同时刷新 UI
        } else if (info.event == ZIMConversationEventUpdated) {
           // 修改会话属性，同时刷新 UI
        }
    }
}
```

:::
:::if{props.platform="U3d"}
```cs
ZIM.GetInstance().onConversationChanged = (
    ZIM zim, List<ZIMConversationChangeInfo> conversationChangeInfoList) =>
{
    //会话变更通知
};
```

:::
:::if{props.platform="Web|harmonyos"}
```typescript
zim.on('conversationChanged', (zim, data) => {
    console.log('conversationChanged', data.infoList);
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationChanged((data) => {
    console.log('conversationChanged', data.infoList);
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConversationChanged = (zim, conversationChangeInfoList) {
    
};
```

:::



## 获取会话列表

ZIM 支持用户从本地数据库获取会话列表，也支持向 ZIM 服务端发起请求获取指定用户的全量会话列表。

拉取到会话列表后，开发者可以用于自定义会话列表的 UI 展示。

### 从本地数据库获取

<Note title="说明">

- ZIM SDK 当前仅支持拉取“单聊”和“群组”会话列表，暂不支持拉取“房间”会话列表。
- 会话列表存于本地数据库，拉取会话列表时，会从本地数据库中获取相关数据。
- 建议开发者在首屏会话页里使用本功能。
</Note>


用户登录后，如果想要查询自己参与过的会话记录，可以调用 {getPlatformData(props,queryConversationListMap)} 接口，拉取会话数据列表。

由于本地会话可能数量较多，拉取会话时，开发者可以通过 {getPlatformData(props,ZIMConversationQueryConfigMap)} 对象，设置自定义分页拉取会话的数量，避免引起一次性拉取过多的会话导致耗时较久、会话界面加载较慢等问题。


:::if{props.platform=undefined}
```java
ZIMConversationQueryConfig config = new ZIMConversationQueryConfig();
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = null;
// 会话一次分页查询数
config.count = 20;

// 拉取会话列表
zim.queryConversationList(config, new ZIMConversationListQueriedCallback() {
    @Override
    public void onConversationListQueried(ArrayList<ZIMConversation> conversationList, ZIMError errorInfo) {
        // 获取会话列表查询结果
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
          // 开发者需要保存和维护数组内的会话对象
        } else {
          // ......
        }      
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMConversationQueryConfig *config = [[ZIMConversationQueryConfig alloc] init];
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = nil;
// 会话一次分页查询数
config.count = 20;

// 拉取会话列表
[self.zim queryConversationListWithConfig:config callback:^(NSArray<ZIMConversation *> * _Nonnull conversationList, ZIMError * _Nonnull errorInfo) {
    // 获取会话列表查询结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // 开发者需要保存和维护数组内的会话对象
    } else {
      // ......
    }
}];
```
:::
:::if{props.platform="window"}
```Cpp
ZIMConversationQueryConfig config;
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = nullptr;
// 会话一次分页查询数
config.count = 20;

// 拉取会话列表
zim->queryConversationList(config, [=](/zim-uniapp-x/guides/conversation/std::vector<std::shared_ptr<zimconversation>>-conversationlist,-zimerror-errorinfo) {
    // 获取会话列表查询结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // 开发者需要保存和维护数组内的会话对象
    } else {
      // ......
    }
});
```
:::
:::if{props.platform="U3d"}
```cs
ZIMConversationQueryConfig config = new ZIMConversationQueryConfig();
// 会话锚点，传空则代表从最新开始查询
config.nextConversation = null;
// 会话一次分页查询数
config.count = 20;

// 拉取会话列表
ZIM.GetInstance().QueryConversationList(config, (List<ZIMConversation> conversationList,
                   ZIMError errorInfo) => 
{
        //拉取结果的回调           
});
```
:::
:::if{props.platform="Web|UTS|harmonyos"}
```typescript
const config: ZIMConversationQueryConfig = {
    // 会话锚点，传空则代表从最新开始查询
    nextConversation: null,
    // 会话一次分页查询数
    count: 20
};

// 拉取会话列表
zim.queryConversationList(config)
    .then((res: ZIMConversationListQueriedResult) => {
        // 查询成功，开发者需要保存和维护数组内的会话对象
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMConversationQueryConfig conversationQueryConfig =
    ZIMConversationQueryConfig();
conversationQueryConfig.nextConversation = null;
// 会话一次分页查询数
conversationQueryConfig.count = 20;

//拉取会话列表
ZIM
    .getInstance()
    !.queryConversationList(conversationQueryConfig)
    .then((value) => {
      // 开发者需要保存和维护数组内的会话对象
    })
    .catchError((onError) {});
```
:::

### 从 ZIM 服务端获取

开发者可以通过调用服务端 API 获取用户的会话列表，详情请参考服务端 API 文档 [查询会话列表](/zim-server/conversation/query-conversation-list)。

<Content platform="UTS" />