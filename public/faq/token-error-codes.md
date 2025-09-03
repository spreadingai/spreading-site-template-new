<Title>Express 如何处理 Token 相关错误码？</Title>



- - -

由于 Token 具有一定的时效性，在应用运行过程中，可能会收到一些与 Token 相关的错误码或事件回调。针对常见的错误码和事件回调，本文提供了触发的原因以及建议的处理方式，方便开发者定位、排查问题。

<Note title="说明">


您可以在 [ZEGO 控制台](https://console.zego.im) 上校验您的服务端生成的 Token 的正确性，详情请参考 [控制台 - 开发辅助 - 临时 Token 生成和 Token 校验](/console/development-assistance/temporary-token#生成临时-token)。

</Note>



## 注意事项

在 Token 过期前 30 秒，SDK 会通过 **onRoomTokenWillExpire** 回调发出通知。收到该回调后，开发者需要从自己的服务端获取新的有效 Token，并调用 SDK 提供的 **renewToken** 接口更新 Token。若未处理，不同版本对 Token 过期的处理机制有所不同：

- 若您接入的是 2.8.0 ～ 2.12.0 版本的 ZEGO Express SDK，此时如果未更新 Token，则当权限位过期时：

    - 已登录房间的用户不会被踢出房间。
    - 当前已成功登录房间的用户推拉流不受影响，但是会影响用户的下一次推拉流操作。

- 若您接入的是 2.13.0 及以上版本的 ZEGO Express SDK：

    - 可以联系 ZEGO 技术支持额外配置权限位过期管理机制，此时如果未更新 Token，则当权限位过期时：
    
        - 已登录房间的用户会被踢出房间，且无法再登录房间。
        - 当前已成功登录房间的用户推流会被停止，也无法进行下一次推流。

    - 若未联系 ZEGO 技术支持额外配置权限位过期管理机制，此时如果未更新 Token：

        - 已登录房间的用户不会被踢出房间。
        - 当前已成功登录房间的用户推拉流不受影响，但是会影响用户的下一次推拉流操作。


## Native 平台

Native 平台主要指 Android、iOS、macOS 和 Windows 平台。


### 错误码

<table>
  
  <tbody><tr>
    <th>错误码</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>1002033</td>
    <td>登录房间鉴权失败。</td>
  </tr>
</tbody></table>


### 事件回调

**onRoomTokenWillExpire**：房间 Token 鉴权将要过期的回调通知，会在 Token 过期前 30 秒发出。当收到此回调后，可通过 renewToken 接口来更新 Token。如果没有更新，将会影响用户的下一次登录和推流操作，对当前的操作没有影响。

API 参考：

- iOS：[onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-room-token-will-expire-room-id)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#switch-room-to-room-id-config)
- Android：[onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-token-will-expire)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#renew-token)
- macOS：[onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~protocol~zego-event-handler#on-room-token-will-expire-room-id)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine#switch-room-to-room-id-config)
- Windows：[onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-room-token-will-expire)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#renew-token)


## Web 平台

### 错误码

<table>
  
  <tbody><tr>
    <th>错误码</th>
    <th>描述</th>
    <th>处理建议</th>
  </tr>
  <tr>
    <td>1102016</td>
    <td>登录 Token 错误。</td>
    <td>可参考 <a target="_blank" href="/real-time-video-web/communication/using-token-authentication">使用 Token 鉴权</a> 来生成正确的 Token。</td>
  </tr>
  <tr>
    <td>1102018</td>
    <td>登录 Token 超时。</td>
    <td>Token 过期时，开发者需要从自己的服务端获取新的有效 Token, 并调用 SDK 提供的 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&amp;jumpType=route#renew-token">renewToken</a> 接口更新 Token。</td>
  </tr>
</tbody></table>

