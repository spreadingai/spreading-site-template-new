# 功能概述

---

**音视频通话 UIKit** 提供了一组默认的行为和样式，同时我们支持根据您的需求，灵活地的定制或添加您的自定义业务逻辑。

在 [快速开始](/callkit-uniapp/quick-start) 后，您可能会注意到在集成音视频通话 UIKit 时有一个 `ZegoUIKitPrebuiltCallConfig`，您可将其用于自定义配置。

## 功能列表

<CardGroup cols={2}>
<Card title="添加自定义组件" href="/callkit-uniapp/calling-config/add-custom-components">
  在呼叫界面的顶层添加您的自定义组件。
</Card>
<Card title="调整布局" href="/callkit-uniapp/calling-config/configure-layouts">
  选择并配置您想要的布局，目前支持画中画和宫格式布局。
</Card>
<Card title="隐藏用户视图标签" href="/callkit-uniapp/calling-config/hide-the-label-on-the-user-view">
  隐藏浮于用户视图上方的用户名、麦克风和摄像头状态图标。
</Card>
<Card title="实现纯语音互动" href="/callkit-uniapp/calling-config/implement-an-audio-only-call">
  设置摄像头和麦克风的初始状态，实现仅音频通话。
</Card>
<Card title="自定义菜单栏" href="/callkit-uniapp/calling-config/customize-the-menu-bar">
- 在底部菜单栏删除默认按钮或添加自定义按钮。
- 禁用菜单栏的自动隐藏功能。
</Card>
<Card title="实现挂断确认对话框。" href="/callkit-uniapp/calling-config/set-a-hangup-confirmation-dialog">
  添加一个确认对话框以进行双重确认。
</Card>
:::if{props.platform="iOS"}
<Card title="配置呼叫邀请" href="/callkit-uniapp/calling-config/call-invitation-config">
- 设置呼叫邀请发起/接收铃声。
- 隐藏拒绝按钮。
- 修改 UI 文本。
- 基于监听回调实现更多业务逻辑。
</Card>
:::
</CardGroup>

<Content />