# 功能概述


**语聊房 UIKit（Live Audio Room Kit）** 提供了一组默认的行为和样式，同时我们支持根据您的需求，灵活地的定制或添加您的自定义业务逻辑。


集成语聊房时，提供 `ZegoUIKitPrebuiltLiveAudioRoomConfig` 用于自定义配置，更多内容可参考 [快速开始](/live-audio-room-kit-android/quick-start)。

目前，我们支持以下自定义功能：

<CardGroup cols={2}>
<Card title="设置用户头像" href="/live-audio-room-kit-android/custom-prebuilt-features/set-avatar-for-users">
  为应用用户设置头像图片（否则，默认使用用户名的第一个字母）。
</Card>
<Card title="自定义麦位" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-the-seats">
  <ul><li>自定义座位布局。</li>
    <li>根据语聊房中的角色相应设置指定的座位。</li></ul>
</Card>
<Card title="自定义背景" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-the-background">
  自定义语聊房的背景视图。
</Card>
<Card title="设置退出确认框" href="/live-audio-room-kit-android/custom-prebuilt-features/set-a-leave-confirmation-dialog">
  添加一个确认对话框进行双重确认。
</Card>
<Card title="自定义 UI 文案" href="/live-audio-room-kit-android/custom-prebuilt-features/modify-user-interface-text">
  自定义内部组件的用户界面文本。
</Card>
<Card title="自定义菜单栏按钮" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-the-bottom-menu-bar-buttons">
  移除默认按钮或向底部菜单栏添加自定义按钮。
</Card>

:::if{props.platform=undefined}

<Card title="自定义上麦逻辑" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-the-seat-taking-logic">
  <ul><li>自定义您的业务逻辑。</li>
    <li>自定义观众的座位占用逻辑。</li></ul>
</Card>
<Card title="自定义用户属性" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-user-attributes">
  用户属性是键值对格式，用于实现自定义功能。
</Card>
<Card title="自定义文本消息 UI" href="/live-audio-room-kit-android/custom-prebuilt-features/customize-the-text-message-ui">
  自定义文本消息列表项。
</Card>

:::
</CardGroup>
