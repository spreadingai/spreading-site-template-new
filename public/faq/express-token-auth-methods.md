<Title>Express SDK 有哪些 Token 鉴权方式，该如何使用？</Title>



- - -

### 简介

Express SDK 的 Token 鉴权，分为 `基础鉴权 Token`、`权限认证 Token`，开发者可以根据自己的业务场景选择合适的鉴权方式。

鉴权是指验证用户是否拥有访问系统的权限，来避免因权限控制缺失或操作不当引发的安全风险问题，ZEGO 通过 Token（包括基础鉴权 Token 和权限认证 Token） 对用户进行鉴权。


|鉴权方式|描述|应用场景|
|-|-|-|
|[基础鉴权 Token](!Integration/User_Access_Control#tab_item1)|开发者在登录房间时必须带上 Token 参数，来验证用户的合法性。|基础鉴权 Token 为 Token 的基本能力，用于业务的简单权限验证场景，绝大多数情况下生成该 Token 即可。 |
|[权限认证 Token](!Integration/User_Access_Control#tab_item1)|为了进一步提高安全性开放了房间 ID 和推流 ID 这两个权限位，可以验证登录房间的 ID 和推流 ID。|房间 ID 和推流 ID 权限位的一般使用场景如下：<ul><li>房间有普通房间和会员房间的区别，需要控制非会员用户登录会员房间。</li><li>语聊房或秀场直播中，需要控制推流用户和麦上用户的一致，防止“幽灵麦”现象，即在房间里听到了非麦上用户声音的情况。</li><li>狼人杀等发言游戏，需要防止应用被黑客破解之后，黑客可以使用其他用户 ID 登录同一房间，获取到游戏进行的信息进行作弊，影响正常用户的游戏体验。</li></ul>|


<Warning title="注意">


`基础鉴权 Token` 默认开通相关权限，`权限认证 Token` 需要联系 ZEGO 技术支持开通相关权限。

</Warning>



不同平台的 SDK 支持使用 Token 鉴权功能的版本有所不同（参考如下版本号），您可以通过 [getVersion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#get-version) 接口查询您的当前 SDK 版本，确认是否支持使用该功能。

- iOS/Android/macOS/Windows/Unity3D：2.17.0 及以上版本
- Flutter：2.17.1 及以上版本
- React Native：0.17.0 及以上版本
- uni-app：1.5.0 及以上版本
- Electron：2.17.3 及以上版本
- Linux（C++）：2.17.3 及以上版本

### 实现流程

请根据您的业务开发平台，在下方选择相应的文档参考，实现 Token 鉴权。

<table>
  
<tbody><tr>
<th>产品</th>
<th>参考文档</th>
</tr>
<tr>
<td>实时音视频</td>
<td><ul><li><a target="_blank" href="/real-time-video-ios-oc/communication/using-token-authentication">iOS</a></li><li><a target="_blank" href="/real-time-video-android-java/communication/using-token-authentication">Android</a></li><li><a target="_blank" href="/real-time-video-macos-oc/communication/using-token-authentication">macOS</a></li><li><a target="_blank" href="/real-time-video-windows-cpp/communication/using-token-authentication">Windows</a></li><li><a target="_blank" href="/real-time-video-u3d-cs/communication/using-token-authentication">Unity3D</a></li><li><a target="_blank" href="/real-time-video-flutter/communication/using-token-authentication">Flutter</a></li><li><a target="_blank" href="/real-time-video-rn/communication/using-token-authentication">React Native</a></li><li><a target="_blank" href="/real-time-video-uniapp/communication/using-token-authentication">uni-app</a></li><li><a target="_blank" href="/real-time-video-electron-js/communication/using-token-authentication">Electron</a></li><li><a target="_blank" href="/real-time-video-linux-cpp/communication/using-token-authentication">Linux（C++）</a></li></ul></td>
</tr>
<tr>
<td>实时语音</td>
<td><ul><li><a target="_blank" href="/real-time-voice-ios/communication/using-token-authentication">iOS</a></li><li><a target="_blank" href="/real-time-voice-android/communication/using-token-authentication">Android</a></li><li><a target="_blank" href="/real-time-voice-macos/communication/using-token-authentication">macOS</a></li><li><a target="_blank" href="/real-time-voice-windows/communication/using-token-authentication">Windows</a></li><li><a target="_blank" href="/real-time-voice-u3d/communication/using-token-authentication">Unity3D</a></li><li><a target="_blank" href="/real-time-voice-flutter/communication/using-token-authentication">Flutter</a></li><li><a target="_blank" href="/real-time-voice-rn/communication/using-token-authentication">React Native</a></li><li><a target="_blank" href="/real-time-voice-uniapp/communication/using-token-authentication">uni-app</a></li><li><a target="_blank" href="/real-time-voice-electron/communication/using-token-authentication">Electron</a></li><li><a target="_blank" href="/real-time-voice-linux/communication/using-token-authentication">Linux（C++）</a></li></ul></td>
</tr>
</tbody></table>


### 其他参考

- [如何处理 Token 相关错误码？](https://doc-zh.zego.im/faq/token_error)
- [什么是 Token？如何生成 Token？如何使用 Token？](http://doc-zh.zego.im/faq/token_usage)
- [Express 如何从 AppSign 鉴权升级为 Token 鉴权？](http://doc-zh.zego.im/faq/token_upgrade)