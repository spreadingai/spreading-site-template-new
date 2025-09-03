# 通话中邀请

默认情况下，一旦发出通话邀请，就不能再邀请其他用户。但是，Call Kit 支持在通话进行中邀请外部用户加入。

## 前提条件

在实现“通话中邀请”功能之前，请确保已集成最新版本的音视频通话 UIKit（Call Kit），并且完成在线邀请功能。详情请参考 [快速开始（包含呼叫邀请）](/callkit-uniapp/quick-start-(with-call-invitation).mdx)。

## 实现流程

<Steps>
<Step title="启用功能">
如果您想要启用通话中邀请功能，请将 `canInvitingInCalling` 属性设置为 true。

当通话中邀请功能启用后，如果您希望允许通话中的所有用户邀请其他用户，而不仅仅是发起者，您可以将 `onlyInitiatorCanInvite` 属性设置为 `false`。

```typescript
ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
    // 是否启用通话中邀请功能。
    // 默认为 false
    canInvitingInCalling: true,
    // 是否仅有呼叫发起用户可以在呼叫中邀请其他用户。
    // 默认为 false
    onlyInitiatorCanInvite: true,
})
```
</Step>
<Step title="添加邀请用户">
启用本功能后，在通话页面的底部菜单栏将出现“邀请成员”按钮。当用户点击此按钮时，会弹出一个默认的“选择用户”的窗口，此时可以通过 `onCallingInvitationListSheetDisplay`回调来设置需要邀请的用户。
```typescript
ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
    callConfig: {
        // 是否在邀请发起用户的界面显示邀请视图。这个视图允许用户取消邀请
        showWaitingCallAcceptAudioVideoView: true
    },
    onCallingInvitationListSheetDisplay() {
        return {
            // 定义邀请列表
            // 列表可以包含最多 9 个用户。
            waitingSelectUsers: [{userID:'123',userName:'U_123'}],
            // 是否默认选中列表中的用户
            defaultChecked: true,
        }
    }
})

```
</Step>
</Steps>

## 功能演示
<Frame width="auto" height="400">
  <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/913a0a334d.gif" />
</Frame>