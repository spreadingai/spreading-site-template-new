<Title>如何禁用 callInviteButton 的 toast 显示？</Title>



---

ZegoSendCallInvitationButton 默认会显示一些错误的 toast，您可以通过以下方式禁用 toast：

```java
ZegoSendCallInvitationButton callInviteButton;

// ...

callInviteButton.showErrorToast(false);
callInviteButton.setOnClickListener(new ClickListener() {
    @Override
    public void onClick(int errorCode, String errorMessage, List<ZegoCallUser> errorInvitees) {
        // 添加您自定义的请求结果逻辑。0 表示请求发送成功，其他值表示失败。当 errorCode 为 0 时，可能仍然存在一些错误的被邀请者，请检查是否所有被邀请者都接收成功。
    }
});
```
