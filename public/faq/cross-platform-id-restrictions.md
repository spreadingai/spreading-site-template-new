<Title>Express 各平台 SDK 互通时，userID/roomID/streamID 是否有什么限制？</Title>




- - -

各平台 SDK 互通时：

- 如果需要与 Web SDK 互通，请不要在 userID、roomID 和 streamiID 中使用 ‘%’。
- 如果需要与小程序 SDK 互通，由于小程序自身的限制，`zego-pusher`、`zego-player` 组件的 streamID 仅支持数字，英文字符和‘_’、‘-’。

    如果您的应用中使用了这两个组件，请注意统一 streamID 的字符使用规则。

- 其余平台的 SDK 互通，无特殊限制。