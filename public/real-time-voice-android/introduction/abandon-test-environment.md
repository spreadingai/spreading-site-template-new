# 测试环境废弃说明

- - -

## 概述

为提供更便捷、更标准的服务，ZEGO 已统一环境概念，**2021-11-16** 之后，不再有正式环境/测试环境之分，**2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建项目的用户，可参考本文档进行 SDK 升级和调整相关代码。

各产品指引请参考下表：

<table>
  <tbody><tr>
    <th>类别</th>
    <th>产品</th>
    <th>平台/框架</th>
  </tr>
  <tr>
    <td rowspan="3">云通讯产品</td>
    <td><a href="#2_1">实时音视频</a></td>
    <td><ul><li><a href="#express_video_ios">iOS</a></li><li><a href="#express_video_android">Android</a></li><li><a href="#express_video_macos">macOS</a></li><li><a href="#express_video_windows">Windows</a></li><li><a href="#express_video_web">Web</a></li><li><a href="#express_video_mini">小程序</a></li><li><a href="#express_video_flutter">Flutter</a></li><li><a href="#express_video_electron">Electron</a></li><li><a href="#express_video_u3d">Unity3D</a></li><li><a href="#express_video_uniapp">uni-app</a></li><li><a href="#express_video_rn">React Native</a></li></ul></td>
  </tr>
  <tr>
    <td><a href="#2_2">实时语音</a></td>
    <td><ul><li><a href="#express_audio_ios">iOS</a></li><li><a href="#express_audio_android">Android</a></li><li><a href="#express_audio_macos">macOS</a></li><li><a href="#express_audio_windows">Windows</a></li><li><a href="#express_audio_web">Web</a></li><li><a href="#express_audio_flutter">Flutter</a></li><li><a href="#express_audio_electron">Electron</a></li><li><a href="#express_audio_u3d">Unity3D</a></li><li><a href="#express_audio_uniapp">uni-app</a></li><li><a href="#express_audio_rn">React Native</a></li></ul></td>
  </tr>
  <tr>
    <td><a href="#2_3">低延迟直播</a></td>
    <td><ul><li><a href="#l3_ios">iOS</a></li><li><a href="#l3_android">Android</a></li><li><a href="#l3_macos">macOS</a></li><li><a href="#l3_windows">Windows</a></li><li><a href="#l3_web">Web</a></li></ul></td>
  </tr>
  <tr>
    <td rowspan="4">配套服务/插件</td>
    <td><a href="#2_4">超级白板</a></td>
    <td><ul><li><a href="#super_board_ios">iOS</a></li><li><a href="#super_board_android">Android</a></li><li><a href="#super_board_web">Web</a></li></ul></td>
  </tr>
  <tr>
    <td><a href="#2_5">互动白板</a></td>
    <td><ul><li><a href="#whiteboard_ios">iOS</a></li><li><a href="#whiteboard_android">Android</a></li><li><a href="#whiteboard_macos">macOS</a></li><li><a href="#whiteboard_windows">Windows</a></li><li><a href="#whiteboard_web">Web</a></li><li><a href="#whiteboard_electron">Electron</a></li></ul></td>
  </tr>
  <tr>
    <td><a href="#2_5">文件共享</a></td>
    <td><ul><li><a href="#file_share_ios">iOS</a></li><li><a href="#file_share_android">Android</a></li><li><a href="#file_share_web">Web</a></li><li><a href="#file_share_electron">Electron</a></li></ul></td>
  </tr>
  <tr>
    <td><a href="#2_6">本地服务端录制</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>服务端 API</td>
    <td><a href="#2_7">服务端 API v2</a></td>
    <td>-</td>
  </tr>
</tbody></table>



<Note title="说明">
- 不在此表格内的产品及平台/框架，暂不涉及废弃测试环境。
- 您可以参考以上产品的“示例源码”进行对应代码的调整。
</Note>


## 升级说明

### 实时音视频

各平台/框架的具体实现流程如下：

<h4 id="express_video_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-ios-oc/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<h4 id="express_video_android"> Android </h4>

1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-android-java/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.GENERAL;
profile.application = getApplication();

ZegoExpressEngine.createEngine(profile, null);
```

<h4 id="express_video_macos"> macOS </h4>

- 如果您使用的是 Objective-C：

    1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-macos-oc/quick-start/integrating-sdk)。

    2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

    ```objc
    ZegoEngineProfile *profile = [ZegoEngineProfile new];
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = ZegoScenarioGeneral;

    [ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
    ```


- 如果您使用的是 C++：

    1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-macos-cpp/quick-start/integrating-sdk)。

    2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-zego-express-sdk#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

    ```cpp
    ZegoEngineProfile profile;
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;

    ZegoExpressSDK::createEngine(profile, nullptr);
    ```


<h4 id="express_video_windows"> Windows </h4>

- 如果您使用的是 C++：

    1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-windows-cpp/quick-start/integrating-sdk)。

    2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

    ```cpp
    ZegoEngineProfile profile;
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;

    ZegoExpressSDK::createEngine(profile, nullptr);
    ```

- 如果您使用的是 C#：

    1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-windows-cs/quick-start/integrating-sdk)。
    2. 初始化 SDK 时，请使用最新的 createEngine 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

    ```C#
    ZegoEngineProfile engine_profile = new ZegoEngineProfile();
    engine_profile.appID = appID;
    engine_profile.appSign = appSign;
    engine_profile.scenario = ZegoScenario.General;
    var context = SynchronizationContext.Current;

    var engine = ZegoExpressEngine.CreateEngine(engine_profile, context);
    ```


<h4 id="express_video_web"> Web </h4>


- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本平台的功能是默认开启的，可直接使用，正式环境下本平台的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本平台的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。




<h4 id="express_video_mini"> 小程序 </h4>


- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本平台的功能是默认开启的，可直接使用，正式环境下本平台的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本平台的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。



<h4 id="express_video_flutter"> Flutter </h4>

1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-flutter/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Dart_flutter~class~zego-express-engine#create-engine-with-profile) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```dart
ZegoEngineProfile profile = ZegoEngineProfile(
    appID,
    appSign,
    ZegoScenario.General,
    true);

ZegoExpressEngine.createEngineWithProfile(profile);
```


<h4 id="express_video_electron"> Electron </h4>

1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-electron-js/client-sdk/download-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口，示例代码如下：

```js
const profile = {
appID : xxx,
appSign : "xxx",
scenario : zgDefines.ZegoScenario.General
};

zgEngine.createEngine(profile)
.then(() => {
    console.log("init succeed")
}).catch((e) => {
    console.log("init failed", e)
});
```

<h4 id="express_video_u3d"> Unity3D </h4>

1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-u3d-cs/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 CreateEngine 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```csharp
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.General;

ZegoExpressEngine.CreateEngine(profile);
```

<h4 id="express_video_uniapp"> uni-app </h4>


1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-uniapp/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~JavaScript_uni-app~class~zego-express-engine#create-engine-with-profile) 接口，示例代码如下：

```js
const profile = {
appID : xxx,
appSign : "xxx",
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

<h4 id="express_video_rn"> React Native</h4>


1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-video-rn/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~JavaScript_react-native~class~zego-express-engine#create-engine-with-profile) 接口，示例代码如下：

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


### 实时语音

各平台/框架的具体实现流程如下：

<h4 id="express_audio_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-ios/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<h4 id="express_audio_android"> Android </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-android/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.GENERAL;
profile.application = getApplication();

ZegoExpressEngine.createEngine(profile, null);
```

<h4 id="express_audio_macos"> macOS </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-macos/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~ObjectiveC_macos~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```



<h4 id="express_audio_windows"> Windows </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-windows/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```cpp
ZegoEngineProfile profile;
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;

ZegoExpressSDK::createEngine(profile, nullptr);
```


<h4 id="express_audio_web"> Web </h4>


- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本平台的功能是默认开启的，可直接使用，正式环境下本平台的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本平台的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。


<h4 id="express_audio_flutter"> Flutter </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-flutter/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~Dart_flutter~class~zego-express-engine#create-engine-with-profile) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```dart
ZegoEngineProfile profile = ZegoEngineProfile(
    appID,
    appSign,
    ZegoScenario.General,
    true);

ZegoExpressEngine.createEngineWithProfile(profile);
```


<h4 id="express_audio_electron"> Electron </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-electron/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口，示例代码如下：

```js
const profile = {
appID : xxx,
appSign : "xxx",
scenario : zgDefines.ZegoScenario.General
};

zgEngine.createEngine(profile)
.then(() => {
    console.log("init succeed")
}).catch((e) => {
    console.log("init failed", e)
});
```

<h4 id="express_audio_u3d"> Unity3D </h4>

1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-u3d/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 CreateEngine 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```c
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.General;

ZegoExpressEngine.CreateEngine(profile);
```

<h4 id="express_audio_uniapp"> uni-app </h4>


1. 已集成最新版本的 SDK，请参考 [实时语音 - 下载 SDK](/real-time-voice-uniapp/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~JavaScript_uni-app~class~zego-express-engine#create-engine-with-profile) 接口，示例代码如下：

```js
const profile = {
appID : xxx,
appSign : "xxx",
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

<h4 id="express_audio_rn"> React Native</h4>


1. 已集成最新版本的 SDK，请参考 [实时音视频 - 下载 SDK](/real-time-voice-rn/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~JavaScript_react-native~class~zego-express-engine#create-engine-with-profile) 接口，示例代码如下：

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

### 低延迟直播

各平台/框架的具体实现流程如下：

<h4 id="l3_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [低延迟直播 - 下载 SDK](/live-streaming-ios/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<h4 id="l3_android"> Android </h4>

1. 已集成最新版本的 SDK，请参考 [低延迟直播 - 下载 SDK](/live-streaming-android/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.GENERAL;
profile.application = getApplication();

ZegoExpressEngine.createEngine(profile, null);
```

<h4 id="l3_macos"> macOS </h4>

1. 已集成最新版本的 SDK，请参考 [低延迟直播 - 下载 SDK](/live-streaming-macos/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```




<h4 id="l3_windows"> Windows </h4>

1. 已集成最新版本的 SDK，请参考 [低延迟直播 - 下载 SDK](/live-streaming-windows/quick-start/integrating-sdk)。

2. 初始化 SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```cpp
ZegoEngineProfile profile;
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;

ZegoExpressSDK::createEngine(profile, nullptr);
```


<h4 id="l3_web"> Web </h4>


- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本平台的功能是默认开启的，可直接使用，正式环境下本平台的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本平台的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。




### 超级白板


- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本产品的功能是默认开启的，可直接使用，正式环境下本产品的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本产品的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。




各平台/框架的具体实现流程如下：

<h4 id="super_board_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [超级白板 - 下载 SDK](/super-board-ios/quick-start/create-white-board)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

3. 初始化 ZegoSuperBoard SDK 时，使用 [initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objectivec_ios~class~ZegoSuperBoardManager%2BWhiteBoard#init-with-config) 接口时，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoSuperBoardInitConfig * config = [ZegoSuperBoardInitConfig new];
config.appID = appID;
config.appSign = appSign;

[ZegoSuperBoardManager sharedInstance].delegate = self;

[[ZegoSuperBoardManager sharedInstance] initWithConfig:config complete:^(ZegoSuperBoardError errorCode) {
    if (errorCode == ZegoSuperBoardSuccess) {
         /** 初始化成功 */
    } else {
        /** 初始化失败 */
    }
}];
```


<h4 id="super_board_android"> Android </h4>


1. 已集成最新版本的 SDK，请参考 [超级白板 - 下载 SDK](/super-board-android/quick-start/create-white-board)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.GENERAL;
profile.application = getApplication();

ZegoExpressEngine.createEngine(profile, null);
```

3. 初始化 ZegoSuperBoard SDK 时，使用 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#init) 接口时，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```
ZegoSuperBoardInitConfig config = new ZegoSuperBoardInitConfig();
config.appID = appID;
config.appSign = appSign;

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

<h4 id="super_board_web"> Web </h4>


1. 已集成最新版本的 SDK，请参考 [超级白板 - 下载 SDK](/super-board-web/quick-start/create-white-board)。

2. 初始化 ZegoSuperBoard SDK 时，使用 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#init) 接口时，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```
zegoSuperBoard = ZegoSuperBoardManager.getInstance();
const result = await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID',
    appID: 0,
    userID: '',
    token: ''
});
```



### 互动白板

各平台/框架的具体实现流程如下：

<h4 id="whiteboard_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/4406)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<h4 id="whiteboard_android"> Android </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/4405)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.GENERAL;
profile.application = getApplication();

ZegoExpressEngine.createEngine(profile, null);
```

<h4 id="whiteboard_macos"> macOS </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/6213)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenarioGeneral;

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<h4 id="whiteboard_windows"> Windows </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/6435)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#create-engine) 接口，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```cpp
ZegoEngineProfile profile;
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;

ZegoExpressSDK::createEngine(profile, nullptr);
```


<h4 id="whiteboard_web"> Web </h4>

- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本平台的功能是默认开启的，可直接使用，正式环境下本平台的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本平台的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。



<h4 id="whiteboard_electron"> Electron </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/6497)。

2. 初始化 ZegoExpress-Video SDK 时，请使用最新的 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口，示例代码如下：

```js
zegoExpressEngine.createEngine({ appID: zegoauth.appID, appSign: zegoauth.appSign, scenario: 0 });
```


### 文件共享

- **2021-11-16** 及之前在 [ZEGO 控制台](https://console.zego.im) 创建的项目，测试环境下本产品的功能是默认开启的，可直接使用，正式环境下本产品的功能不是默认开启的，如需使用按原有流程开通。
- **2021-11-16** 之后在 [ZEGO 控制台](https://console.zego.im) 创建的项目，不再区分正式/测试环境，但是本产品的功能不是默认开启的，使用前请联系 ZEGO 技术支持开通。



各平台/框架的具体实现流程如下：


<h4 id="file_share_ios"> iOS </h4>

1. 已集成最新版本的 SDK，请参考 [文件共享 - 下载 SDK](https://doc-zh.zego.im/article/4408)。

2. 初始化 SDK 时，使用 [initWithConfig](https://doc-zh.zego.im/article/api?doc=docsview_API~objectivec_ios~class~ZegoDocsViewManager#init-with-config) 接口时，不再需要设置 isTestEnv 区分正式/测试环境，示例代码如下：

```objc
ZegoDocsViewConfig *config = [ZegoDocsViewConfig new];
config.appSign = appSign;
config.appID = appID;
config.dataFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"data"];
config.cacheFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"doc"];
config.logFolder = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoDocs"] stringByAppendingString:@"log"];

[[ZegoDocsViewManager sharedInstance] initWithConfig:config completionBlock:^(ZegoDocsViewError errorCode) {
    if (errorCode == ZegoDocsViewSuccess) {
        NSLog(@"初始化 SDK 成功");
    } else {
        NSLog(@"初始化 SDK 失败 %ld",errorCode);
    }
}];
```


<h4 id="file_share_android"> Android </h4>


1. 已集成最新版本的 SDK，请参考 [文件共享 - 下载 SDK](https://doc-zh.zego.im/article/4407)。

2. 初始化 SDK 时，使用 [init](https://doc-zh.zego.im/article/api?doc=docsview_API~java_android~class~ZegoDocsViewManager#init) 接口时，不再需要设置 setTestEnv 区分正式/测试环境，示例代码如下：

```
ZegoDocsViewConfig config = new ZegoDocsViewConfig();
config.setAppID(appID);
config.setAppSign(appSign);

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


<h4 id="file_share_web"> Web </h4>


1. 已集成最新版本的 SDK，请参考 [文件共享 - 下载 SDK](https://doc-zh.zego.im/article/4424)。

2. 初始化 SDK 时，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```js
const zegoExpressDocs = new window.ZegoExpressDocs({appID, token, userID});
```


<h4 id="file_share_electron"> Electron </h4>

1. 已集成最新版本的 SDK，请参考 [互动白板 - 下载 SDK](https://doc-zh.zego.im/article/6498)。

2. 初始化 SDK 时，不再需要设置 isTestEnv 参数区分正式/测试环境，示例代码如下：

```js
const zegoExpressDocs = new ZegoExpressDocs({
    appID,
    appSign,
    dataFolder,
    cacheFolder,
    logFolder
});
```


### 本地服务端录制

[SetUseTestEnv](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a67f490d5db300dffbdfc0bfde4d88076) 即将废弃，请删除该接口的相关代码，还可参考下文 “常见问题” 中的 “如何做项目的数据隔离？”进行区分正式/测试环境。




### 服务端 API v2

所有接口的公共请求参数 isTest，默认值为 false，表示正式环境。

<ul><li>针对 <b>2021-11-16</b> 及之前在 <a target="_blank" href="https://console.zego.im">ZEGO 控制台</a> 创建的项目：<ul><li>从控制台申请的 AppID 和 AppSign 等信息默认是测试环境。</li><li>可根据 AppId 环境类型及业务需求设置本参数。</li></ul></li><li>针对 <b>2021-11-16</b> 之后在 <a target="_blank" href="https://console.zego.im">ZEGO 控制台</a> 创建的项目：<ul><li>从控制台申请的 AppID 和 AppSign 等信息都为正式环境。</li><li>必须将此参数修改为 “false”，表示使用正式环境。</li></ul></li></ul>


## 常见问题

### 如何做项目的数据隔离？

您可以在 [ZEGO 控制台](https://console.zego.im) 创建 2 个项目，1 个作为测试使用，1 个作为正式使用，基于此进行项目的数据隔离。

为方便您的使用，控制台也提供了“项目阶段”的标识，您可以自行给项目标注当前所处阶段，比如“测试中”、“已上线”，方便您有多个项目时，也能进行区分而不混淆。
