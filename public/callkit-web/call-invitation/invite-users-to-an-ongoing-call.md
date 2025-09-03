# 通话中邀请

默认情况下，一旦发出通话邀请，就不能再邀请其他用户。但是，Call Kit 支持在通话进行中邀请外部用户加入。

<Note title="说明">
如需使用本功能，请将音视频通话 UIKit 至 v2.11.0 或更新版本。
</Note>

## 启用功能

如果您想要启用通话中邀请功能，请将 `canInvitingInCalling` 属性设置为 true。

当通话中邀请功能启用后，如果您希望允许通话中的所有用户邀请其他用户，而不仅仅是发起者，您可以将 `onlyInitiatorCanInvite` 属性设置为 `false`。

```typescript {2-7}
zp.setCallInvitationConfig({
    // 是否启用通话中邀请功能。
    // 默认为 false        
    canInvitingInCalling: true,
    // 是否仅有呼叫发起用户可以在呼叫中邀请其他用户。
    // 默认为 false        
    onlyInitiatorCanInvite: true,
})
```

启用本功能后，您可以在通话页面的底部菜单栏点击"..."按钮后，找到“邀请成员”按钮。此时，还需要定义受邀用户列表，详情请参考 [定义受邀请人列表](/callkit-web/03-call-invitation/invite-users-to-an-ongoing-call#定义受邀请人列表)。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/83d7ab7085.jpeg" alt="Call_button_zh.jpeg"/>
</Frame>

## 定义受邀请人列表

在开启通话中邀请功能后，您需要自定义受邀请人列表，以便从该列表中邀请用户。

在加入房间之前，您可以通过 `callingInvitationListConfig.waitingSelectUsers` 定义受邀请人列表。

在加入房间之后，您也可以通过调用 `updateCallingInvitationListConfig` 接口更新列表。

<Note title="说明">`waitingSelectUsers` 至多可包括 9 名用户。</Note>

完成上述定义后，点击“邀请成员”按钮，展开“受邀请人”侧边栏，即可查看受邀请人列表，勾选需要邀请的用户，向他们发起邀请。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/6a17e295e0.jpeg" />
</Frame>


```typescript {1-4,11-16,22-25}
interface CallingInvitationListConfig {
    waitingSelectUsers: ZegoUser[]; // 等待邀请的成员列表
    defaultChecked?: boolean; // 是否默认勾选待邀请的成员， 默认 true
}
// 加入房间前
zp.setCallInvitationConfig({
    onSetRoomConfigBeforeJoining() {
        return {
            // 是否在邀请发起用户的界面显示邀请视图。这个视图允许用户取消邀请
            showWaitingCallAcceptAudioVideoView: true,
            // 定义邀请列表
            // 列表可以包含最多 9 个用户。
            callingInvitationListConfig: {
                waitingSelectUsers: [{userID:'123',userName:'U_123'}],
                // 是否默认选中列表中的用户
                defaultChecked: true,
            },
        }
    }
})

// 加入房间后
zp.updateCallingInvitationListConfig({
    waitingSelectUsers: [{userID:'456',userName:'U_456'}],
    defaultChecked: true,
})
```
