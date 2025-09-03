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

export const onGroupMessageReceivedMap = {
  'Android': <a href="@onGroupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'Web': <a href="@groupMessageReceived" target='_blank'>groupMessageReceived</a>,
  'UTS': <a href="@groupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html" target='_blank'>onGroupMessageReceived</a>,
}
export const ZIMTipsMessageEventMap = {
  'Android': <a href="@-ZIMTipsMessageEvent" target='_blank'>ZIMTipsMessageEvent</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTipsMessageEvent.html" target='_blank'>ZIMTipsMessageEvent</a>,
}
export const ZIMTipsMessageGroupChangeInfoMap = {
  'Android': <a href="@-ZIMTipsMessageGroupChangeInfo" target='_blank'>ZIMTipsMessageGroupChangeInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTipsMessageGroupChangeInfo-class.html" target='_blank'>ZIMTipsMessageGroupChangeInfo</a>,
}
export const ZIMTipsMessageChangeInfoTypeMap = {
  'Android': <a href="@-ZIMTipsMessageChangeInfoType" target='_blank'>ZIMTipsMessageChangeInfoType</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTipsMessageChangeInfoType.html" target='_blank'>ZIMTipsMessageChangeInfoType</a>,
}
export const ZIMTipsMessageGroupMemberChangeInfoMap = {
  'Android': <a href="@-ZIMTipsMessageGroupMemberChangeInfo" target='_blank'>ZIMTipsMessageGroupMemberChangeInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTipsMessageGroupMemberChangeInfo-class.html" target='_blank'>ZIMTipsMessageGroupMemberChangeInfo</a>,
}

# 接收 Tips 消息

- - -
## 功能简介

ZIM SDK 支持将用户的某些群组操作（如创建群组、解散群组等），转换为一条群组会话内的特殊类型消息（Tips 消息，枚举值为 32）。该种消息仅能由 ZIM 后台或 ZIM SDK 内部产生，用户不可自行插入本地会话，不可对其设置回执状态、表态和单独删除（但可通过删除会话内所有消息删除该消息）。

<Note title="说明">

仅限 2.15.0 及以上版本的 ZIM SDK 支持此功能。
</Note>

<Frame width="60%" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/4b4e29ffc5.png" alt="Tips_Message_zh.png"/>
</Frame>

## 实现流程

### 1 开通功能

请联系 ZEGO 技术支持开启单个或多个 Tips 消息特性，确认所需的消息事件。可开通的事件包含：

| 事件类型 | 子事件 |
| -------- | ------ |
| 群组管理  | <Note title="说明">在开通本类型时，仅支持开通所有子事件。</Note><ul><li>群创建</li><li>群解散</li><li>用户主动加群</li><li>群内成员邀请群外用户</li><li>群成员主动离开</li><li>群内成员被踢出</li></ul>       |
| 群资料变更 | <Note title="说明">在开通本类型时，请指定所需的子事件。</Note><ul><li>群名变更</li><li>群头像变更</li><li>群公告变更</li><li>群禁言状态变更</li></ul> |
| 群成员变更 | <Note title="说明">在开通本类型时，请指定所需的子事件。</Note><ul><li>群主变更</li><li>群成员角色变更</li><li>群成员禁言状态变更</li></ul> |

### 2 接收消息

当群组会话中出现了相关事件，通过监听 {getPlatformData(props,onGroupMessageReceivedMap)} 回调，即可接收 Tips 消息。

如果 Tips 消息的事件（ {getPlatformData(props,ZIMTipsMessageEventMap)} ）为群资料变更（`ZIMTipsMessageEvent.GROUP_INFO_CHANGED`）和群成员变更（`ZIMTipsMessageEvent.GROUP_MEMBER_INFO_CHANGED`），请遵循以下步骤：
1. 将 Tips 消息中的 `changeInfo` 转换为 {getPlatformData(props,ZIMTipsMessageGroupChangeInfoMap)} 或 {getPlatformData(props,ZIMTipsMessageGroupMemberChangeInfoMap)} 类型。
2. 根据 `changeInfo` 中的 `type`，了解具体事件（ {getPlatformData(props,ZIMTipsMessageChangeInfoTypeMap)} ），从而确认 `changeInfo` 中应该读取的对应字段。对于非对应事件的字段，SDK 不会赋值。如需了解处理详情，可参考下文示例代码。

{getPlatformData(props,ZIMTipsMessageEventMap)} 与 {getPlatformData(props,ZIMTipsMessageChangeInfoTypeMap)} 的对应关系如下表所示：

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>事件
（ZIMTipsMessageEvent）</th>
<th>枚举</th>
<th>枚举值</th>
<th>读取 ZIMTipsMessageGroupChangeInfo 操作</th>
</tr>
<tr data-row-level="2">
<td>创建群组</td>
<td>GROUP_CREATED</td>
<td>1</td>
<td rowspan="6">无需操作</td>
</tr>
<tr data-row-level="3">
<td>解散群组</td>
<td>GROUP_DISMISSED</td>
<td>2</td>
</tr>
<tr data-row-level="4">
<td>用户主动入群</td>
<td>GROUP_JOINED</td>
<td>3</td>
</tr>
<tr data-row-level="5">
<td>邀请用户入群</td>
<td>GROUP_INVITED</td>
<td>4</td>
</tr>
<tr data-row-level="6">
<td>群内成员离群</td>
<td>GROUP_LEFT</td>
<td>5</td>
</tr>
<tr data-row-level="7">
<td>群内成员被踢</td>
<td>GROUP_KICKED_OUT</td>
<td>6</td>
</tr>
<tr data-row-level="8" data-row-child="true">
<td>群资料变更</td>
<td>GROUP_INFO_CHANGED</td>
<td>7</td>
<td>需要读取</td>
</tr>
<tr data-row-level="8-1">
<th>额外信息
（ZIMTipsMessageChangeInfoType）</th>
<th>枚举</th>
<th>枚举值</th>
<th>读取 ZIMTipsMessageGroupChangeInfo 操作</th>
</tr>
<tr data-row-level="8-2">
<td>└群名、群头像、群公告多个变更</td>
<td>GROUP_DATA_CHANGED</td>
<td>1</td>
<td>参考示例代码，由 groupDataFlage 进行位运算，取群名，群公告、群头像其中某几个数据</td>
</tr>
<tr data-row-level="8-3">
<td>└群公告变更</td>
<td>GROUP_NOTICE_CHANGED</td>
<td>2</td>
<td>读取 ZIMTipsMessageGroupChangeInfo 的 groupNotice 字段</td>
</tr>
<tr data-row-level="8-4">
<td>└群名变更</td>
<td>GROUP_NAME_CHANGED</td>
<td>3</td>
<td>读取 ZIMTipsMessageGroupChangeInfo 的 groupName 字段</td>
</tr>
<tr data-row-level="8-5">
<td>└群头像变更</td>
<td>GROUP_AVATAR_URL_CHANGED</td>
<td>4</td>
<td>读取 ZIMTipsMessageGroupChangeInfo 的 groupAvatarUrl 字段</td>
</tr>
<tr data-row-level="8-6">
<td>└群禁言状态变更</td>
<td>GROUP_MUTE_CHANGED</td>
<td>5</td>
<td>读取 ZIMTipsMessageGroupChangeInfo 的 groupMutedInfo 字段</td>
</tr>
<tr data-row-level="9" data-row-child="true">
<td>群成员变更</td>
<td>GROUP_MEMBER_INFO_CHANGED</td>
<td>8</td>
<td>根据额外信息而定</td>
</tr>
<tr data-row-level="9-1">
<th>额外信息
（ZIMTipsChangeInfoType）</th>
<th>枚举</th>
<th>枚举值</th>
<th>读取 ZIMTipsMessageGroupMemberChangeInfo 操作</th>
</tr>
<tr data-row-level="9-2">
<td>└群主转移</td>
<td>GROUP_OWNER_TRANSFERRED</td>
<td>10</td>
<td>无需读取</td>
</tr>
<tr data-row-level="9-3">
<td>└群成员角色变更</td>
<td>GROUP_MEMBER_ROLE_CHANGED</td>
<td>11</td>
<td>读取 ZIMTipsMessageGroupMemberChangeInfo 的 memberRole 字段</td>
</tr>
<tr data-row-level="9-4">
<td>└群成员禁言状态变更</td>
<td>GROUP_MEMBER_MUTE_CHANGED</td>
<td>12</td>
<td>读取 ZIMTipsMessageGroupMemberChangeInfo 的 muteExpiredTime 字段</td>
</tr>
</tbody></table>


:::if{props.platform=undefined}
```java
// 接收群组消息
zim.setEventHandler(new ZIMEventHandler(){
@Override
public void onGroupMessageReceived(ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromGroupID) {
        for (ZIMMessage message : messageList) {
            // 消息为 Tips
            if (message.getType() == ZIMMessageType.TIPS) {
                ZIMTipsMessage tipsMessage = (ZIMTipsMessage) message;
                // 如果 Tips 消息类型为群资料变更
                if (tipsMessage.event == ZIMTipsMessageEvent.GROUP_INFO_CHANGED) {
                    ZIMTipsMessageGroupChangeInfo info = (ZIMTipsMessageGroupChangeInfo)tipsMessage.changeInfo;
                    if (info.type == ZIMTipsMessageChangeInfoType.GROUP_DATA_CHANGED) {
                        if ((info.groupDataFlag & ZIMGroupDataFlag.NAME) == ZIMGroupDataFlag.NAME) {
                            // 群名变更
                            String newGroupName = info.groupName;
                        }

                        if ((info.groupDataFlag & ZIMGroupDataFlag.NOTICE) == ZIMGroupDataFlag.NOTICE) {
                            // 群公告变更
                            String newGroupNotice = info.groupNotice;
                        }

                        if ((info.groupDataFlag &  ZIMGroupDataFlag.AVATAR_URL) == ZIMGroupDataFlag.AVATAR_URL) {
                            // 群头像变更
                            String newGroupAvatarUrl = info.groupAvatarUrl;
                        }
                    }

                    // ... 业务逻辑
                } else if (tipsMessage.event == ZIMTipsMessageEvent.GROUP_MEMBER_INFO_CHANGED) {
                    ZIMTipsMessageGroupMemberChangeInfo memberInfo = (ZIMTipsMessageGroupMemberChangeInfo) tipsMessage.changeInfo;
                    // ... 业务逻辑
                }
                // ... 其他逻辑
            }
        }
    }
});
```
:::
:::if{props.platform="window"}
```cpp
// 接收群组消息
void zim_event_handler::onGroupMessageReceived(
    zim::ZIM *, const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
    const ZIMMessageReceivedInfo info,
    const std::string &fromGroupID) {

    for (const auto &message: messageList) {
        // 消息为 Tips
        if (message->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_TIPS) {
            auto tips_message = std::static_pointer_cast<zim::ZIMTipsMessage>(message);
            // 如果 Tips 消息类型为群资料变更
            if (tips_message->getEvent() == zim::ZIMTipsMessageEvent::ZIM_TIPS_MESSAGE_EVENT_GROUP_INFO_CHANGED) {
                auto info = std::static_pointer_cast<zim::ZIMTipsMessageGroupChangeInfo>(tips_message->getChangeInfo());

                if (info->getType() == zim::ZIMTipsMessageChangeInfoType::ZIM_TIPS_MESSAGE_CHANGE_INFO_TYPE_GROUP_DATA_CHANGED) {
                    if (info->getGroupDataFlag() & ZIM_GROUP_DATA_FLAG_NAME) {
                        // 群名变更
                        auto new_group_name = info->getGroupName();
                    }

                    if (info->getGroupDataFlag() & ZIM_GROUP_DATA_FLAG_NOTICE) {
                        // 群公告变更
                        auto new_group_notice = info->getGroupNotice();
                    }

                    if (info->getGroupDataFlag() & ZIM_GROUP_DATA_FLAG_AVATAR_URL) {
                        // 群头像变更
                        auto new_group_avatar_url = info->getGroupAvatarUrl();
                    }
                }

                ......// 业务逻辑
            } else if (tips_message->getEvent() == zim::ZIMTipsMessageEvent::ZIM_TIPS_MESSAGE_EVENT_GROUP_MEMBER_INFO_CHANGED) {
                // 如果 Tips 消息类型为群成员变更。
                auto info = std::static_pointer_cast<zim::ZIMTipsMessageGroupMemberChangeInfo>(tips_message->getChangeInfo());
                ......// 业务逻辑
            }
            ......
        }
    }

}

```
:::

:::if{props.platform="Flutter"}
```dart
// 接收群组消息
ZIMEventHandler.onGroupMessageReceived = (ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromGroupID){
    for (ZIMMessage message in messageList){
      // 消息为 Tips
      if(message.type == ZIMMessageType.tips){
        ZIMTipsMessage tipsMessage = message as ZIMTipsMessage;
        // 如果 Tips 消息类型为群资料变更
        if(tipsMessage.event == ZIMTipsMessageEvent.groupInfoChanged){
          ZIMTipsMessageGroupChangeInfo info = tipsMessage.changeInfo as ZIMTipsMessageGroupChangeInfo;
          if(info.type == ZIMTipsMessageChangeInfoType.groupDataChanged){
            if((info.groupDataFlag & ZIMGroupDataFlag.groupName) != 0){
              // 群名变更
              String newGroupName = info.groupName;
            }
            if((info.groupDataFlag & ZIMGroupDataFlag.groupNotice) != 0){
              // 群公告变更
              String groupNotice = info.groupNotice;
            }

            if((info.groupDataFlag & ZIMGroupDataFlag.avatarUrl) != 0){
              // 群头像变更
              String newGroupAvatarUrl = info.groupAvatarUrl;
            }
          }
        } else if (tipsMessage.event == ZIMTipsMessageEvent.groupMemberInfoChanged){
          ZIMTipsMessageGroupMemberChangeInfo memberInfo =  tipsMessage.changeInfo as ZIMTipsMessageGroupMemberChangeInfo;
          // ... 业务逻辑
        }
        // ... 其他逻辑
      }
    }
};
```
:::

:::if{props.platform="Web"}
```typescript
// 接收群组消息
zim.on('groupMessageReceived', (zim, data) => {
    data.messageList.forEach((message) => {
        // 消息为 Tips
        if (message.type == 32) {
            // 如果 Tips 消息类型为群资料变更
            if (message.event == 7) {
                const info = message.changeInfo;
                // 服务端API修改群资料的多个属性
                if (info.type == 1 && info.groupDataFlag) {
                    if (info.groupDataFlag & 1 == 1) {
                        // 群名变更
                        const groupName = info.groupName;
                    }

                    if (info.groupDataFlag & 2 == 2) {
                        // 群公告变更
                        const groupNotice = info.groupNotice;
                    }

                    if (info.groupDataFlag & 4 == 4) {
                        // 群头像变更
                        const groupAvatarUrl = info.groupAvatarUrl;
                    }
                }
                // 业务逻辑
            } else if (message.event == 8) {
                // 如果 Tips 消息类型为群成员变更。
                const info = message.changeInfo;
                // 业务逻辑
            }
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 接收群组消息
zim.onGroupMessageReceived((data) => {
    data.messageList.forEach((message) => {
        // 消息为 Tips
        if (message.type == 32) {
            // 如果 Tips 消息类型为群资料变更
            if (message.event == 7) {
                const info = message.changeInfo;
                // 服务端API修改群资料的多个属性
                if (info.type == 1 && info.groupDataFlag) {
                    if (info.groupDataFlag & 1 == 1) {
                        // 群名变更
                        const groupName = info.groupName;
                    }

                    if (info.groupDataFlag & 2 == 2) {
                        // 群公告变更
                        const groupNotice = info.groupNotice;
                    }

                    if (info.groupDataFlag & 4 == 4) {
                        // 群头像变更
                        const groupAvatarUrl = info.groupAvatarUrl;
                    }
                }
                // 业务逻辑
            } else if (message.event == 8) {
                // 如果 Tips 消息类型为群成员变更。
                const info = message.changeInfo;
                // 业务逻辑
            }
        }
    });
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 接收群组消息
- (void)groupMessageReceived:(ZIM *)zim 
                 messageList:(NSArray<ZIMMessage *> *)messageList 
                  info:(ZIMMessageReceivedInfo *)info
                  fromGroupID:(NSString *)fromGroupID {

    for (ZIMMessage *message in messageList) {
        // 消息为 Tips
        if (message.type == ZIMMessageTypeTips) {
            ZIMTipsMessage *tipsMessage = (ZIMTipsMessage *)message;
            // 如果 Tips 消息类型为群资料变更
            if (tipsMessage.event == ZIMTipsMessageEventGroupInfoChanged) {
                ZIMTipsMessageGroupChangeInfo *info = (ZIMTipsMessageGroupChangeInfo *)tipsMessage.changeInfo;

                if (info.type == ZIMTipsMessageChangeInfoTypeGroupDataChanged) {
                    if (info.groupDataFlag & ZIMGroupDataFlagName) {
                        // 群名变更
                        NSString *newGroupName = info.groupName;
                    }

                    if (info.groupDataFlag & ZIMGroupDataFlagNotice) {
                        // 群公告变更
                        NSString *newGroupNotice = info.groupNotice;
                    }

                    if (info.groupDataFlag & ZIMGroupDataFlagAvatarUrl) {
                        // 群头像变更
                        NSString *newGroupAvatarUrl = info.groupAvatarUrl;
                    }
                }

                // 业务逻辑
            } else if (tipsMessage.event == ZIMTipsMessageEventGroupMemberInfoChanged) {
                // 如果 Tips 消息类型为群成员变更。
                ZIMTipsMessageGroupMemberChangeInfo *info = (ZIMTipsMessageGroupMemberChangeInfo *)tipsMessage.changeInfo;

                // 业务逻辑
            }

            // 其他业务逻辑
        }
    }
}
```
:::


### 3 展示消息
根据以上获取到的 Tips 消息，根据以上获取的信息，开发者需要自行生成对应事件的字符串并在 App UI 上展示该文本。


<Content platform="iOS" />