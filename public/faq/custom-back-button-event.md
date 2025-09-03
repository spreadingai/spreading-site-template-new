<Title>如何自定义通话中的返回按钮事件？</Title>



---

默认情况下，当通话中点击 Android 的返回按钮时，用户会直接离开通话。

如果您想添加一个确认对话框，可以像这样更改 `callInvitationConfig`：

```java
ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();

callInvitationConfig.provider = new ZegoUIKitPrebuiltCallConfigProvider() {
    @Override
    public ZegoUIKitPrebuiltCallConfig requireConfig(ZegoCallInvitationData invitationData) {
        ZegoUIKitPrebuiltCallConfig config = null;
        boolean isVideoCall = invitationData.type == ZegoInvitationType.VIDEO_CALL.getValue();
        boolean isGroupCall = invitationData.invitees.size() > 1;
        if (isVideoCall && isGroupCall) {
            config = ZegoUIKitPrebuiltCallConfig.groupVideoCall();
        } else if (!isVideoCall && isGroupCall) {
            config = ZegoUIKitPrebuiltCallConfig.groupVoiceCall();
        } else if (!isVideoCall) {
            config = ZegoUIKitPrebuiltCallConfig.oneOnOneVoiceCall();
        } else {
            config = ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall();
        }
        config.hangUpConfirmDialogInfo = new ZegoHangUpConfirmDialogInfo();
        return config;
    }
};
```
您可以调整成员变量 config.hangUpConfirmDialogInfo 的值来更改对话框的文本。

而且，您可以重写 BackPressEvent 来自定义返回按钮事件，示例如下：
```java
ZegoUIKitPrebuiltCallService.events.setBackPressEvent(new BackPressEvent() {
    @Override
    public boolean onBackPressed() {
    // 如果返回 true，则表示您需要自定义返回按钮事件；如果返回 false，则表示您不需要自定义返回按钮事件，它将按照默认行为执行。
        return true;
    }
});
``` 

例如，如果您想在已经在 config 中添加了 `ZegoMenuBarButtonName.MINIMIZING_BUTTON` 的情况下将通话最小化，您可以在回调中调用 `ZegoUIKitPrebuiltCallService.minimizeCall()`：

```java
ZegoUIKitPrebuiltCallService.events.setBackPressEvent(new BackPressEvent() {
    @Override
    public boolean onBackPressed() {
        ZegoUIKitPrebuiltCallService.minimizeCall();
        return true;
    }
});
``` 