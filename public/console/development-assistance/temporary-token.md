# 临时 Token 生成和 Token 校验

- - -

借助 ZEGO 控制台，您可以使用开发辅助页面，生成临时 Token，便于调试；也可以借助此页面，校验您的服务端生成的 Token 的正确性，避免因权限控制缺失或操作不当引发的安全风险问题。

<Note title="说明">


有关不同产品如何生成和使用 Token 的更多内容，请查看：

- 实时音视频：[使用 Token 鉴权](/real-time-video-android-java/communication/using-token-authentication)。
- 实时语音：[使用 Token 鉴权](/real-time-voice-android/communication/using-token-authentication)。
- 超低延迟直播：[使用 Token 鉴权](/live-streaming-uniapp/communication/using-token-authentication)。
- 即时通讯：[使用 Token 鉴权](/zim-android/guides/users/authentication)。

</Note>



## 生成临时 Token
为便于调试，您可在 ZEGO 控制台上生成临时 Token。但是，在您的线上环境中，务必要通过自己的服务端生成 Token。
选择 AppID、输入UserID后，点击 “生成临时 Token“ 即可生成临时 Token。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10091.png" /></Frame>
临时 Token 生成后，您可以点击 “复制”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10092.png" /></Frame>

## Token 校验
当您通过自己的服务端生成 Token 后，若需要校验正确性，可以使用 ZEGO 控制台的自助校验工具。您向 ZEGO 控制台提供 Token，ZEGO 控制台反向解析该 Token，提供解析参数，方便您自行比对。

<Warning title="注意">

目前，ZEGO 控制台只支持校验 zego_server_assistant 中 token03 和 token04 插件生成的 Token。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10093.png" /></Frame>

若 ZEGO 控制台可以反向解析该 Token，则会展示具体的每一个参数信息，方便您自行比对。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10094.png" /></Frame>

若 ZEGO 控制台无法反向解析该 Token，您可以获得具体的失败原因。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10095.png" /></Frame>
