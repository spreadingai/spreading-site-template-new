<Title>Express 如何从 AppSign 鉴权升级为 Token 鉴权？</Title>


- - -


## 文档导读

为了提高项目的安全性，对于使用 AppSign 鉴权的开发者，当您的产品升级如下版本后，可以使用 Token 鉴权且鉴权通过后才能使用相关服务（如果您不需要，可继续使用 AppSign 鉴权方式），您可以参考本文档进行升级。

- **实时音视频**
    - iOS/Android/macOS/Windows/Unity3D：2.17.0 及以上版本
    - Flutter：2.17.1 及以上版本
    - React Native：0.17.0 及以上版本
    - uni-app：1.5.0 及以上版本
    - Electron：2.17.3 及以上版本
    - Linux（C++）：2.17.3 及以上版本
   
- **本地服务端录制**

    ga01596a1c8 及以上版本（2022-03-23 发布）

- **超级白板**

    iOS/Android：2.3.0 及以上版本（2022-05-26 发布）

- **互动白板**

    说明：使用互动白板 SDK 时，Token 鉴权相关步骤，请参考 <a href="#token_table">使用 Token - 实时音视频</a> 即可，下文不再赘述。

    - iOS/Android：2.3.0 及以上版本（2022-05-26 发布）
    - Electron：2.1.6 及以上版本（2022-05-26 发布）

- **文件共享**

    - iOS/Android：2.3.0 及以上版本（2022-05-26 发布）
    - Electron：2.1.6 及以上版本（2022-05-26 发布）

## 鉴权方式

<table>
  
  <tbody><tr>
    <th>鉴权方式</th>
    <th>功能描述</th>
    <th>安全级别</th>
  </tr>
  <tr>
    <td>AppSign 鉴权</td>
    <td>在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。</td>
    <td>安全级别很低。<br />原因为：如果 AppSign 被泄漏，攻击者会盗用您的云服务流量，并且 AppSign 没有过期机制，建议您尽快升级为 Token 鉴权。</td>
  </tr>
  <tr>
    <td>Token 鉴权<b>（推荐）</b></td>
    <td>Token 鉴权是在创建引擎时将 AppSign <b>传空或不传</b>，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能。 <br />该方式能兼容 Appsign 鉴权，即当您同时传入了 AppSign 和 Token 时，SDK 会把这两个参数都传给 ZEGO 服务端，只要其中一个校验通过则表示鉴权通过。<br /></td>
    <td>安全级别高。<br />原因为：通过开发者自建服务端下发 Token，并且在客户端上进行认证，且下发的 Token 具有时效性。因此，我们推荐您使用 Token 鉴权。</td>
  </tr>
  <tr>
    <td>强制 Token 鉴权</td>
    <td>该方式指的是通过 ZEGO 技术支持配置强制 Token 鉴权服务，此时<b>必须使用 Token 鉴权</b>，鉴权通过后即可使用实时音视频功能。<br />该方式不兼容 AppSign 鉴权。</td>
    <td>安全等级最高。<br />原因为：强制使用 Token 鉴权后，不再兼容 AppSign 鉴权，安全性进一步提高，但是线上使用 AppSign 鉴权的老版本则不能正常使用，您需要谨慎使用。</td>
  </tr>
</tbody></table>


## 兼容性说明

使用 AppSign 鉴权、Token 鉴权、强制 Token 鉴权三种方式具有一定的兼容性，若您历史版本使用 AppSign 鉴权，则：
- **不开启**强制 Token 鉴权开关（默认）：ZEGO Express SDK 新版本可以使用 Token 鉴权或 AppSign 鉴权。
- **开启**强制 Token 鉴权开关：ZEGO Express SDK 无论新老版本，都强制使用 Token 鉴权，不兼容 AppSign 鉴权。

<Note title="说明">



版本信息请参考 [文档导读](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all#1)。

</Note>





## 升级指导

### 服务开通

Token 鉴权默认开通。

<Warning title="注意">


若您需要开启强制 Token 鉴权，则需联系 ZEGO 技术支持开通。

</Warning>




### 生成 Token

开发者客户端向开发者服务端发送请求申请 Token，由开发者服务端生成 Token 后返回给到对应客户端。

ZEGO 在 GitHub/Gitee 提供了一个开源的 zego_server_assistant 插件，支持使用 Go、C++、Java、Python、PHP、.NET、Node.js 语言，在开发者的服务端或客户端部署生成 Token（不推荐客户端生成）。

<Warning title="注意">


[zego_server_assistant](https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token) 中包含 token03 和 token04 两个版本的插件，以 ZEGO Express SDK iOS 平台为例， SDK 对插件的支持情况如下：

- token03：ZEGO Express SDK 2.8.0 及以上版本都支持。
- token04：只有 ZEGO Express SDK 2.17.0 及以上版本支持。
 

</Warning>




生成 Token 的详细介绍请参考如下文档：

<table>
  
<tbody><tr>
<th>产品</th>
<th>参考文档</th>
</tr>
<tr>
<td>实时音视频</td>
<td><ul><li><a target="_blank" href="/real-time-video-ios-oc/communication/using-token-authentication#生成-token-与使用">iOS</a></li><li><a target="_blank" href="/real-time-video-android-java/communication/using-token-authentication#生成-token-与使用">Android</a></li><li><a target="_blank" href="/real-time-video-macos-oc/communication/using-token-authentication#生成-token-与使用">macOS</a></li><li><a target="_blank" href="/real-time-video-windows-cpp/communication/using-token-authentication#生成-token-与使用">Windows</a></li><li><a target="_blank" href="/real-time-video-u3d-cs/communication/using-token-authentication#生成-token-与使用">Unity3D</a></li><li><a target="_blank" href="/real-time-video-flutter/communication/using-token-authentication#生成-token-与使用">Flutter</a></li><li><a target="_blank" href="/real-time-video-rn/communication/using-token-authentication#token-的生成与使用">React Native</a></li><li><a target="_blank" href="/real-time-video-uniapp/communication/using-token-authentication#token-的生成与使用">uni-app</a></li><li><a target="_blank" href="/real-time-video-electron-js/communication/using-token-authentication#token-的生成与使用">Electron</a></li><li><a target="_blank" href="/real-time-video-linux-cpp/communication/using-token-authentication#token-的生成与使用">Linux（C++）</a></li></ul></td>
</tr>
<tr>
<td>实时语音</td>
<td><ul><li><a target="_blank" href="/real-time-voice-ios/communication/using-token-authentication#生成-token-与使用">iOS</a></li><li><a target="_blank" href="/real-time-voice-android/communication/using-token-authentication#生成-token-与使用">Android</a></li><li><a target="_blank" href="/real-time-voice-macos/communication/using-token-authentication#生成-token-与使用">macOS</a></li><li><a target="_blank" href="/real-time-voice-windows/communication/using-token-authentication#生成-token-与使用">Windows</a></li><li><a target="_blank" href="/real-time-voice-u3d/communication/using-token-authentication#生成-token-与使用">Unity3D</a></li><li><a target="_blank" href="/real-time-voice-flutter/communication/using-token-authentication#生成-token-与使用">Flutter</a></li><li><a target="_blank" href="/real-time-voice-rn/communication/using-token-authentication#生成-token-与使用">React Native</a></li><li><a target="_blank" href="/real-time-voice-uniapp/communication/using-token-authentication#生成-token-与使用">uni-app</a></li><li><a target="_blank" href="/real-time-voice-electron/communication/using-token-authentication#生成-token-与使用">Electron</a></li><li><a target="_blank" href="/real-time-voice-linux/communication/using-token-authentication#生成-token-与使用">Linux（C++）</a></li></ul></td>
</tr>
<tr>
<td>本地服务端录制</td>
<td><a target="_blank" href="/local-recording-linux-cpp/integration/user-access-control#生成-token">Linux</a></td>
</tr>
<tr>
<td>超级白板</td>
<td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/15009#4_2">iOS</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15010#4_2">Android</a></li><li><a target="_blank" href="/super-board-web/quick-start/user-access-control#42-生成-token">Web</a></li></ul></td>
</tr>
<tr>
<td>互动白板</td>
<td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/15004#4_2">iOS</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15005#4_2">Android</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15006#4_2">Web</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15007#4_2">Electron</a></li></ul></td>
</tr>
<tr>
<td>文件共享</td>
<td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/14999#4_2">iOS</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15000#4_2">Android</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15001#4_2">Web</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/15002#4_2">Electron</a></li></ul></td>
</tr>
</tbody></table>






### 使用 Token


本章主要介绍您升级 SDK 后如何使用 Token 功能。

<table id="token_table">
  
<tbody><tr>
<th>产品</th>
<th>平台</th>
</tr>
<tr>
<td>实时音视频/实时语音</td>
<td><ul><li><a href="#express_video_ios">iOS</a></li><li><a href="#express_video_android">Android</a></li><li><a href="#express_video_macos">macOS</a></li><li><a href="#express_video_windows">Windows</a></li><li><a href="#express_video_unity3d">Unity3D</a></li><li><a href="#express_video_flutter">Flutter</a></li><li><a href="#express_video_rn">React Native</a></li><li><a href="#express_video_uniapp">uni-app</a></li><li><a href="#express_video_electron">Electron</a></li><li><a href="#express_video__linux_c++">Linux（C++）</a></li></ul></td>
</tr>
<tr>
<td>本地服务端录制</td>
<td><a href="#local_server_recording_linux">Linux</a></td>
</tr>
<tr>
<td>超级白板</td>
<td><ul><li><a href="#superboard_ios">iOS</a></li><li><a href="#superboard_android">Android</a></li></ul></td>
</tr>
<tr>
<td>文件共享</td>
<td><ul><li><a href="#ZegoDocsView_ios">iOS</a></li><li><a href="#ZegoDocsView_android">Android</a></li><li><a href="#ZegoDocsView_electron">Electron</a></li></ul></td>
</tr>
</tbody></table>



#### 实时音视频/实时语音

各平台的实现流程如下：

<b id="express_video_ios">iOS</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-rn/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-ios-oc/quick-start/integrating-sdk)。
2. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_ios~class~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID; 
//通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenarioDefault; 
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user-config) 接口登录房间时，房间进阶配置 [ZegoRoomCofig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_ios~class~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```objc
NSString *roomID = @"xxx"; // 要登录的房间ID
ZegoUser *user = [ZegoUser userWithUserID:@"xxxx"];
ZegoRoomConfig *config = [[ZegoRoomConfig alloc] init];
config.token = @"xxxxxxxx"; // 请求开发者服务端获取

[[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user config:config];
```

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-token-will-expire-room-id) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#renew-token-room-id) 接口更新 Token 并传入 SDK 即可。

```objc
NSString *token = [MyToken getToken]; // 重新请求开发者服务端获取 Token
[[ZegoExpressEngine sharedEngine] renewToken:token roomID:roomID];
```

<b id="express_video_android">Android</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-android-java/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-android-java/quick-start/integrating-sdk)。
2. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine-scrap-0) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```Java
// 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
// 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入，请根据实际情况选择合适的场景
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room-1) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```java
String roomID = "xxx" // 要登录的房间ID
ZegoUser user = new ZegoUser("xxxx");
ZegoRoomConfig config = new ZegoRoomConfig();
config.token = "xxxxxxxxxx"; // 请求开发者服务端获取
engine.loginRoom(roomID, user, config);
```

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```java
String token = getToken(); // 重新请求开发者服务端获取 Token;
engine.renewToken(roomID, token);
```


<b id="express_video_macos">macOS</b>

- 如果您使用的是 Objective-C：请参考 iOS。
- 如果您使用的是 C++：请参考 Windows。

<b id="express_video_windows">Windows</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-windows-cpp/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-windows-cpp/quick-start/integrating-sdk)。
2. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine-scrap-0) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```cpp
ZegoEngineProfile profile;
// AppID 由 ZEGO 分配给各 App
profile.appID = appID;
// 通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room-1) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```cpp
std::string roomID = 'xxx'; // 要登录的房间ID
ZegoUser user;
user.userID = 'xxxx';
user.userName = 'xxxx';
ZegoRoomConfig config;
config.token = 'xxxxxxxxxx' // 请求开发者服务端获取
engine->loginRoom(roomID, user, config);
```

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```cpp
void onRoomTokenWillExpire(const std::string& /*roomID*/, int /*remainTimeInSecond*/) override {
    std::string token = getToken(); // 重新请求开发者服务端获取 Token
    engine->renewToken(roomID, token);
}
```


<b id="express_video_unity3d">Unity3D</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-u3d-cs/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-u3d-cs/quick-start/integrating-sdk)。
2. 调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~struct~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```c#
// 定义 SDK 引擎对象
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID; // 请通过官网注册获取，格式为 123456789
profile.scenario = ZegoScenario.Default; // 通用场景接入，请根据实际情况选择合适的场景
// 初始化SDK
engine = ZegoExpressEngine.CreateEngine(profile);
```

3. 调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~struct~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```c#
string roomID = "xxx"; // 要登录的房间ID
ZegoUser user = new ZegoUser();
user.userID = "xxxx";
user.userName = "xxxx";
ZegoRoomConfig config = new ZegoRoomConfig();
config.token = "xxxxxxxxxx"; // 请求开发者服务端获取
engine.LoginRoom(roomID, user, config);
```

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~class~IZegoEventHandler#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=express-audio-sdk_API~cs_unity3d~class~ZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```c#
void OnRoomTokenWillExpire(string roomID, int remainTimeInSecond){
    string token = getToken(); // 重新请求开发者服务端获取 Token
    engine.RenewToken(roomID, token);
}
```

<b id="express_video_flutter">Flutter</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-flutter/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-flutter/quick-start/integrating-sdk)。
2. 调用 [createEngineWithProfile](https://pub.dev/documentation/zego_express_engine/latest/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口创建引擎时，ZegoEngineProfile 中的 “AppSign” 传空或者不传。

```dart
ZegoEngineProfile profile = ZegoEngineProfile(
    appID, // 请通过官网注册获取，格式为：1234567890
    ZegoScenario.General, // 通用场景接入
    enablePlatformView: true);
// 创建引擎
ZegoExpressEngine.createEngineWithProfile(profile);
```  

3. 调用 [loginRoom](https://pub.dev/documentation/zego_express_engine/latest/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://pub.dev/documentation/zego_express_engine/latest/zego_express_engine/ZegoRoomConfig-class.html) 中需要填入开发者服务器生成的 Token。

```dart
// 创建用户对象
ZegoUser user = ZegoUser.id('user1');
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig config = ZegoRoomConfig.defaultConfig();
config.isUserStatusNotify = true;
// token 由用户自己的服务端生成，为了更快跑通流程，也可以通过即构控制台获取临时的音视频 token
config.token = "xxxx";
// 开始登录房间
ZegoExpressEngine.instance.loginRoom('room1', user, config: config);
```  

4. 在收到的 [onRoomTokenWillExpire](https://pub.dev/documentation/zego_express_engine/latest/zego_express_engine/ZegoExpressEngine/onRoomTokenWillExpire.html) 回调后，调用 [renewToken](https://pub.dev/documentation/zego_express_engine/latest/zego_express_engine/ZegoExpressEngineRoom/renewToken.html) 接口更新 Token 并传入 SDK 即可。

```dart
ZegoExpressEngine.onRoomTokenWillExpire = (String roomID, int remainTimeInSecond) {
    String token = getToken(); // 重新请求开发者服务端获取 Token；
    ZegoExpressEngine.instance.renewToken(roomID, token);
  };
```

<b id="express_video_rn">React Native</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-rn/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-rn/quick-start/integrating-sdk)。
2. 调用 [createEngineWithProfile](https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口创建引擎时，ZegoEngineProfile 中的 “AppSign” 传空或者不传。

```javascript
// 导入
import ZegoExpressEngine from 'zego-express-engine-reactnative';

// 采用通用场景
const profile = {
appID : xxx,
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

3. 调用 [loginRoom](https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressdefines_.zegoroomconfig.html) 中需要填入开发者服务器生成的 Token。

```javascript
let roomConfig = {};
//token 由用户自己的服务端生成，为了更快跑通流程，也可以通过即构控制台获取临时的音视频 token
roomConfig.token = "xxxx";
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;
// 登录房间
// 开始登录房间
ZegoExpressEngine.instance().loginRoom('room1', {'userID': 'id1', 'userName': 'user1'}, roomConfig);
```

4. 在收到的 [roomTokenWillExpire](https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomtokenwillexpire) 回调后，调用 [renewToken](https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#renewtoken) 接口更新 Token 并传入 SDK 即可。

```javascript
ZegoExpressEngine.instance().on("roomTokenWillExpire", (roomID, remainTimeInSecond){
    let token = getToken(); // 重新请求开发者服务端获取 Token;
    ZegoExpressEngine.instance().renewToken(roomID, token);
});
```

<b id="express_video_uniapp">uni-app</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-uniapp/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-uniapp/quick-start/integrating-sdk)。
2. 调用 [createEngineWithProfile](https://doc-en-api.zego.im/UniApp/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口创建引擎时，ZegoEngineProfile 中的 “AppSign” 传空或者不传。

```javascript
// 导入
import ZegoExpressEngine from '@/zego-express-video-uniapp/lib/ZegoExpressEngine';

// 采用通用场景
const profile = {
appID : xxx,
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

3. 调用 [loginRoom](https://doc-en-api.zego.im/UniApp/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-en-api.zego.im/UniApp/interfaces/_zegoexpressdefines_.zegoroomconfig.html) 中需要填入开发者服务器生成的 Token。

```javascript
let roomConfig = {};
//token 由用户自己的服务端生成，为了更快跑通流程，也可以通过即构控制台获取临时的音视频 token
roomConfig.token = "xxxx";
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;
// 登录房间
// 开始登录房间
ZegoExpressEngine.instance().loginRoom('room1', {'userID': 'id1', 'userName': 'user1'}, roomConfig);
```

4. 在收到的 [roomTokenWillExpire](https://doc-en-api.zego.im/UniApp/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomtokenwillexpire) 回调后，调用 [renewToken](https://doc-en-api.zego.im/UniApp/classes/_zegoexpressengine_.zegoexpressengine.html#renewtoken) 接口更新 Token 并传入 SDK 即可。

```javascript
ZegoExpressEngine.instance().on("roomTokenWillExpire", (roomID, remainTimeInSecond){
    let token = getToken(); // 重新请求开发者服务端获取 Token;
    ZegoExpressEngine.instance().renewToken(roomID, token);
});
```

<b id="express_video_electron">Electron</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-electron-js/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-electron-js/quick-start/integrating-sdk)。
2. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口创建引擎时，ZegoEngineProfile 中的 “AppSign” 传空或者不传。

```js
// 引入 ZegoExpressEngine
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');

// AppID 由 ZEGO 分配给各 App；从 2.17.3 版本开始，ZEGO 不再下发 appSign，即用户在创建引擎时可将 appSign 填空或者不填，但是要正常使用 SDK 的功能，必须在登录房间时传入 token 进行鉴权校验；
// 采用通用场景
const profile = {
appID : xxx,
scenario : zgDefines.ZegoScenario.General
};

zgEngine.createEngine(profile)
.then(() => {
    console.log("init succeed")
}).catch((e) => {
    console.log("init failed", e)
});
``` 

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~struct~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```javascript
zgEngine.loginRoom('roomID', { userID: 'zego', userName: zego}, config = {token: 'xxxx'});
```  

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```javascript
zgEngine.on("onRoomTokenWillExpire", res=>
{
    zgEngine.renewToken(roomID = TheRoomID, token = 'xxxx');
});
```



<b id="express_video__linux_c++">Linux（C++）</b>

1. 已下载并集成最新版本的 [SDK](/real-time-video-linux-cpp/client-sdk/download-sdk)，详情请参考 [集成 SDK](/real-time-video-linux-cpp/quick-start/integrating-sdk)。
2. 调用 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~cpp_linux~class~ZegoExpressSDK#create-engine) 接口创建引擎时，ZegoEngineProfile 中的 “AppSign” 传空或者不传。

```cpp
ZegoEngineProfile profile;
// AppID 由 ZEGO 分配给各 App
profile.appID = appID;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#login-room) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```cpp
std::string roomID = 'xxx'; // 要登录的房间ID
ZegoUser user;
user.userID = 'xxxx';
user.userName = 'xxxx';
ZegoRoomConfig config;
config.token = 'xxxxxxxxxx' // 请求开发者服务端获取
engine->loginRoom(roomID, user, config);
```

4. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoEventHandler#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```cpp
void onRoomTokenWillExpire(const std::string& /*roomID*/, int /*remainTimeInSecond*/) override {
    std::string token = getToken(); // 重新请求开发者服务端获取 Token
    engine->renewToken(roomID, token);
}
```

#### 本地服务端录制

<b id="local_server_recording_linux">Linux</b>


1. 已下载并集成最新版本的 [SDK](/local-recording-linux-cpp/downloadsdk)，详情请参考 [集成 SDK](/local-recording-linux-cpp/integration/sdk-integration)。
2. 调用 [InitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af8fcc2e5a69e83075637631d68fcf4ea) 接口初始化 SDK，将申请到的 AppID 传入参数 “uiAppID”。

```cpp
unsigned int appId = appID;//此处填写 AppID
LIVEROOM::InitSDK(appId);
```

3. 在登录房间之前调用 [SetCustomToken](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a68bdea0d66d62c8bf4d671284707b3ae) 接口将 Token 传入 SDK。

```cpp
LIVEROOM::SetCustomToken("token"); // 此处填写正确的鉴权 Token
```



#### 超级白板

<b id="superboard_ios">iOS</b>

1. 已下载并集成最新版本的 [ZegoSuperBoard SDK](/super-board-ios/download-sdk)（已包含 ZegoExpressEngine SDK），详情请参考 [集成 SDK](/super-board-ios/quick-start/create-white-board#集成-sdk)。
2. 调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine) 的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_ios~class~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID; 
//通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenarioDefault; 
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

3. 使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager) 的 [initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete) 方法初始化 ZegoSuperBoard SDK 时，传入 userID，并填入开发者服务器生成的 Token。

```objc
/** 填写 appID*/
unsigned int appID = ;  /** 请通过官网注册获取，格式为 123456789L */

//创建一个初始化配置类ZegoSuperBoardInitConfig
ZegoSuperBoardInitConfig * config = [ZegoSuperBoardInitConfig new];
config.appID = appID; //赋值 appID
config.token = token; //赋值 token
config.userID = userID; //赋值 userID

//设置ZegoSuperBoardManager监听,需要在登录房间之前设置
[ZegoSuperBoardManager sharedInstance].delegate = self;

[[ZegoSuperBoardManager sharedInstance] initWithConfig:config complete:^(ZegoSuperBoardError errorCode) {
    if (errorCode == ZegoSuperBoardSuccess) {
         /** 初始化成功 */
    } else {
        /** 初始化失败 */
    }
}];
``` 

4. 调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine) 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user-config) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_ios~class~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```objc
NSString *roomID = @"xxx"; // 要登录的房间ID
ZegoUser *user = [ZegoUser userWithUserID:@"xxxx"];
ZegoRoomConfig *config = [[ZegoRoomConfig alloc] init];
config.token = @"xxxxxxxx"; // 请求开发者服务端获取

[[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user config:config];
```

5. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-token-will-expire-room-id) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#renew-token-room-id) 接口更新 Token 并传入 SDK 即可。

```objc
NSString *token = [MyToken getToken]; // 重新请求开发者服务端获取 Token
[[ZegoExpressEngine sharedEngine] renewToken:token roomID:roomID];
```

<b id="superboard_android">Android</b>

1. 已下载并集成最新版本的 [ZegoSuperBoard SDK](/super-board-android/download-sdk)（已包含 ZegoExpressEngine SDK），详情请参考 [集成 SDK](/super-board-android/quick-start/create-white-board#集成-sdk)。
2. 调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine) 的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine-scrap-0) 接口创建引擎时，[ZegoEngineProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoEngineProfile) 中的 “AppSign” 传空或者不传。

```Java
// 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
// 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入，请根据实际情况选择合适的场景
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

3. 使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager) 的 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#init) 方法初始化 ZegoSuperBoard SDK 时，传入 userID，并填入开发者服务器生成的 Token。

```java
// 配置superBoard初始化所需要的appID，token和UserID
ZegoSuperBoardInitConfig config = new ZegoSuperBoardInitConfig();
config.appID = appID; //赋值 appID
config.token = token; //赋值 token
config.userID = userID; //赋值 userID

// 调用SuperBoardManager初始化SuperBoard sdk
// this 为Android的Application上下文，因此此段代码建议放在Application中实现
ZegoSuperBoardManager.getInstance().init(this, config, new IZegoSuperBoardInitCallback() {
    @Override
    public void onInit(int errorCode) {
        Log.d(TAG, "init ZegoSuperBoardManager result: errorCode = [" + errorCode + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 初始化成功 */
        } else {
            /** 初始化失败 */
        }
    }
});
```

4. 调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine) 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room-1) 接口登录房间时，房间进阶配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRoomConfig) 中需要填入开发者服务器生成的 Token。

```java
String roomID = "xxx" // 要登录的房间ID
ZegoUser user = new ZegoUser("xxxx");
ZegoRoomConfig config = new ZegoRoomConfig();
config.token = "xxxxxxxxxx"; // 请求开发者服务端获取
engine.loginRoom(roomID, user, config);
```

5. 在收到的 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#renew-token) 接口更新 Token 并传入 SDK 即可。

```java
String token = getToken(); // 重新请求开发者服务端获取 Token;
engine.renewToken(roomID, token);
```


#### 文件共享

<b id="ZegoDocsView_ios">iOS</b>

1. 已下载并集成最新版本的 [ZegoDocsView SDK](https://doc-zh.zego.im/article/4408)，详情请参考 [集成 SDK](https://doc-zh.zego.im/article/4373)。
2. 使用 [ZegoDocsViewManager](https://doc-zh.zego.im/article/api?doc=DocsView_API~objective-c_ios~class~ZegoDocsViewManager) 的 [initWithConfig](https://doc-zh.zego.im/article/api?doc=DocsView_API~objective-c_ios~class~ZegoDocsViewManager#init-with-config-config-completion-block) 方法初始化 ZegoDocsView SDK 时，传入 userID，并填入开发者服务器生成的 Token。

```objc
ZegoDocsViewConfig *config = [ZegoDocsViewConfig new];
config.appID = appID;//即构 AppID
config.userID = userID;//用户 userID
config.token = token;//鉴权token，从客户自己的服务器拿到

config.dataFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"data"];//SDK 相关数据目录
config.cacheFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"doc"];//SDK 相关缓存目录
config.logFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"log"];//SDK 相关日志目录

[[ZegoDocsViewManager sharedInstance] initWithConfig:config completionBlock:^(ZegoDocsViewError errorCode) {
    if (errorCode == ZegoDocsViewSuccess) {
        NSLog(@"初始化 SDK 成功");
    } else {
        NSLog(@"初始化 SDK 失败 %ld",errorCode);
    }
}];
```

3. 在收到的 `tokenWillExpire` 回调后，调用 `renewToken` 接口更新 Token 并传入 SDK 即可。

```objc
- (void)tokenWillExpire
{
    NSString * token = **; //后台获取到的token
    [[ZegoDocsViewManager sharedInstance] renewToken:token];
}
```

<b id="ZegoDocsView_android">Android</b>

1. 已下载并集成最新版本的 [ZegoDocsView SDK](https://doc-zh.zego.im/article/4407)，详情请参考 [集成 SDK](https://doc-zh.zego.im/article/4347)。
2. 使用 [ZegoDocsViewManager](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class~ZegoDocsViewManager) 的 [init](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class~ZegoDocsViewManager#init) 方法初始化 ZegoDocsView SDK 时，传入 userID，并填入开发者服务器生成的 Token。

```java
long appID = ;  /** 请通过官网注册获取，格式为 123456789L */
String token = ;  /** 鉴权token*/
String UserID = ; /** 用户唯一ID*/
Application application ; //android app的 application

ZegoDocsViewConfig config = new ZegoDocsViewConfig();  
config.setAppID(appID);
config.setToken(token);
config.setUserID(userID);

ZegoDocsViewManager.getInstance().init(application,config, new IZegoDocsViewInitListener() {
    @Override
    public void onInit(int errorCode) {
        if (errorCode == 0) {
            /** 初始化成功 */
        } else {
            /** 初始化失败 */
        }
    }
});
```

3. 在收到的 `onTokenWillExpire` 回调后，调用 `renewToken` 接口更新 Token 并传入 SDK 即可。

```java
ZegoDocsViewManager.getInstance().setTokenListener(new IZegoDocsViewSetTokenListener() {
    @Override
    public void onTokenWillExpire(int remainTimeInSecond) {
        //从服务器获取新的token
        String token = getTokenFromServer();
        ZegoDocsViewManager.getInstance().renewToken(token);
    }
});
```

<b id="ZegoDocsView_electron">Electron</b>

1. 已下载并集成最新版本的 [ZegoDocsView SDK](https://doc-zh.zego.im/article/6498)，详情请参考 [集成 SDK](https://doc-zh.zego.im/article/6493)。
2. 初始化 ZegoDocsView SDK 时，传入 userID，并填入开发者服务器生成的 Token。

```
/** 引入 ZegoExpressDocs SDK */
const ZegoExpressDocs = window.require('zego-express-docsview-electron');
/**
* 初始化 ZegoExpressDocs SDK
* @param appID: ZEGO 为开发者签发的应用 ID，请从 ZEGO 管理控制台申请
* @param dataFolder: 可选，SDK 内部数据保存目录，开发者无需关注此目录下的具体内容
* @param cacheFolder: 可选，SDK 缓存保存目录
* @param logFolder: 可选，日志保存目录，记录 SDK 运行过程中的日志，便于定位
* @param token: 用于验证身份的 Token
* @param userID: 同一个 AppID 内，需保证 “userID” 全局唯一
*/
const zegoExpressDocs = new ZegoExpressDocs({
    appID, 
    dataFolder, 
    cacheFolder, 
    logFolder,
    token,
    userID
});
```

3. 在收到的 `onTokenWillExpire` 回调后，调用 `renewToken` 接口更新 Token 并传入 SDK 即可。

```js
zegoExpressDocs.on('onTokenWillExpire', function(data){
    var newToken = 'new token';
    zegoExpressDocs.renewToken(newToken)
})
```