# 离线登录

## 功能简介

离线登录，是指应用被清理后，用户再次点击应用图标启动应用时，在无网络、未登录成功的状态下直接访问用户本地 SDK 数据，常用于自动登录 App。

<Note title="说明">

用户只能使用上一次成功登录的 UserID 进行离线登录；否则，登录不会成功。
</Note>

## 技术原理

当调用接口离线登录时，ZIM SDK 会进行校验（UseID 校验；如果使用 token 方式登录，还会校验 token 有效期）。校验成功后，SDK 会先行返回登陆成功的回调，允许用户查询本地数据，而 SDK 内部会自动尝试连接后台服务。


## 实现流程

### 1 离线登录

在无网络且应用已被清理的情况下，可以调用 [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) 接口时，[ZIMLoginConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig-class.html) 中的 [isOfflineLogin](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig/isOfflineLogin.html) 传入 `true`，实现使用上一次的用户信息离线登录 App。登录成功后，即可访问本地 SDK 数据。 

<Note title="说明">

建议您缓存每次登录使用的用户信息。当 App 打开时，读取缓存，实现以下逻辑：
- 如果判断用户不是使用上一次在线登录的 UserID ，此时 [isOfflineLogin](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig/isOfflineLogin.html) 应为 `false`，此时离线登录会失败，不允许用户访问该 UserID 的本地 SDK 数据。
- 如果用户使用上一次在线登录的 UserID，为了实现自动登录、加速进入 App 主页以及提前渲染 UI，[isOfflineLogin](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig/isOfflineLogin.html) 应为 `true`，实现离线登录。
</Note>



<CodeGroup>
```dart title="示例代码"
ZIMLoginConfig loginConfig = ZIMLoginConfig();
loginConfig.userName = 'username';
// This parameter is not required when using AppSign authentication
loginConfig.token = 'token';
// Whether it is an offline login
login.isOfflineLogin = true;

try {
    await ZIM.getInstance()!.login('zego', loginConfig);
    // Login successful
} on PlatformException catch (onError) {
    // Login failed
}
```
</CodeGroup>

### 2 访问本地 SDK 数据

在成功的离线登录后，用户可以在离线状态下执行以下操作（截至版本2.12）：

<table>
<tbody><tr>
<th>分类</th>
<th>接口</th>
</tr>
<tr>
<td>用户相关</td>
<td><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryUsersInfo.html" target="_blank" referer="noopener">queryUsersInfo</a></td>
</tr>
<tr>
<td>群组相关</td>
<td><ul>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupList.html" target="_blank" referer="noopener">queryGroupList</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroups.html" target="_blank" referer="noopener">searchLocalGroups</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupInfo.html" target="_blank" referer="noopener">queryGroupInfo</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupAttributes.html" target="_blank" referer="noopener">queryGroupAttributes</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupAllAttributes.html" target="_blank" referer="noopener">queryGroupAllAttributes</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberList.html" target="_blank" referer="noopener">queryGroupMemberList</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroupMembers.html" target="_blank" referer="noopener">searchLocalGroupMembers</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberInfo.html" target="_blank" referer="noopener">queryGroupMemberInfo</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberCount.html" target="_blank" referer="noopener">queryGroupMemberCount</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptReadMemberList.html" target="_blank" referer="noopener">queryGroupMessageReceiptReadMemberList</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptUnreadMemberList.html" target="_blank" referer="noopener">queryGroupMessageReceiptUnreadMemberList</a></li>
</ul></td>
</tr>
<tr>
<td>消息相关</td>
<td><ul>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryHistoryMessage.html" target="_blank" referer="noopener">queryHistoryMessage</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateMessageLocalExtendedData.html" target="_blank" referer="noopener">updateMessageLocalExtendedData</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalMessages.html" target="_blank" referer="noopener">searchLocalMessages</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchGlobalLocalMessages.html" target="_blank" referer="noopener">searchGlobalLocalMessages</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/insertMessageToLocalDB.html" target="_blank" referer="noopener">insertMessageToLocalDB</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllMessage.html" target="_blank" referer="noopener">deleteAllMessage</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessages.html" target="_blank" referer="noopener">deleteMessages</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReceiptsInfo.html" target="_blank" referer="noopener">queryMessageReceiptsInfo</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReactionUserList.html" target="_blank" referer="noopener">queryMessageReactionUserList</a></li>
</ul></td>
</tr>
<tr>
<td>呼叫邀请相关</td>
<td><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryCallInvitationList.html" target="_blank" referer="noopener">queryCallInvitationList</a></td>
</tr>
<tr>
<td>会话相关</td>
<td><ul>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversation.html" target="_blank" referer="noopener">queryConversation</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target="_blank" referer="noopener">queryConversationList</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationPinnedList.html" target="_blank" referer="noopener">queryConversationPinnedList</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalConversations.html" target="_blank" referer="noopener">searchLocalConversations</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationUnreadMessageCount.html" target="_blank" referer="noopener">clearConversationUnreadMessageCount</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationTotalUnreadMessageCount.html" target="_blank" referer="noopener">clearConversationTotalUnreadMessageCount</a></li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.html" target="_blank" referer="noopener">deleteConversation</a>：仅支持删除本地数据库中会话。</li>
<li><a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversations.html" target="_blank" referer="noopener">deleteAllConversations</a>：仅支持删除本地数据库中会话。</li>
</ul></td>
</tr>
</tbody></table>

### 3 监听事件

用户可以监听 [onConnectionStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html) 事件通知获取 SDK 与 ZIM 后台服务的连接情况。

当离线登录成功时，[onConnectionStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html) 返回 [ZIMConnectionState](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConnectionState.html) 为 Connecting（枚举值为 1）。

当用户网络恢复连接，ZIM SDK 内部自动连接 ZIM 后台服务成功后，[onConnectionStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html) 返回 [ZIMConnectionState](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConnectionState.html) 为 Connected（枚举值为 2）时，ZIM SDK 才允许调用强依赖网络的接口，并同步后台数据。
