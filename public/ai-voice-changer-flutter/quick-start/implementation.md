# 实现 AI 变声

- - -

本文介绍如何通过 ZEGO Express SDK，实现 AI 变声功能。

## 前提条件

在实现 AI 变声功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/ai-voice-changer-ios/quick-start/integrate)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。


## 使用步骤

开发者可以按照以下步骤完成 AI 变声的相关设置：

### 1 开启权限

请参考 [控制台 - 云市场 - 大饼 AI 变声](/console/cloud-market/dabing-ai-voice-changer)，按照页面指引，自助开通 `大饼 AI 变声` 相关权限；并在自己的项目中集成 `大饼 AI 变声` 的 SDK 包。

### 2 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](/real-time-video-ios-oc/quick-start/implementing-video-call#1-初始化)” 及 “[登录房间](/real-time-video-ios-oc/quick-start/implementing-video-call#2-登录房间)”。

### 3 初始化 AI 变声引擎实例

1. 调用 [createAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/createAIVoiceChanger.html) 接口，创建 AI 变声引擎实例。

    当前只支持同时创建一个实例，调用 [destroyAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/destroyAIVoiceChanger.html) 接口销毁实例之前，再次创建将返回 null。

    ```dart
    // 创建 AI 变声引擎实例
    var changer = await ZegoExpressEngine.instance.createAIVoiceChanger();
    ```

2. 监听 AI 变声引擎事件回调。

    ```dart
    // 设置 AI 变声引擎事件回调
    ZegoExpressEngine.onAIVoiceChangerInit = (aiVoiceChanger, errorCode) {
      print('📽️ [onAIVoiceChangerInit] '
          'idx: ${aiVoiceChanger.getIndex()}, errorCode: $errorCode');
    };

    ZegoExpressEngine.onAIVoiceChangerUpdate = (aiVoiceChanger, errorCode) {
      print('📽️ [onAIVoiceChangerUpdate] '
          'idx: ${aiVoiceChanger.getIndex()}, errorCode: $errorCode');
    };

    ZegoExpressEngine.onAIVoiceChangerGetSpeakerList =
        (aiVoiceChanger, errorCode, speakerList) {
      String content = '';
      int index = 0;
      for (ZegoAIVoiceChangerSpeakerInfo info in speakerList) {
        index += 1;
        content += '$index:[ID:${info.id}][name:${info.name}];';
      }
      print('📽️ [onAIVoiceChangerGetSpeakerList] '
          'idx: ${aiVoiceChanger.getIndex()}, errorCode: $errorCode, speakerList: $content');
    };
    ```

3. 调用 [ZegoAIVoiceChanger.initEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/initEngine.html) 接口，初始化 AI 变声引擎实例。

    <Warning title="注意">

    [ZegoAIVoiceChanger.initEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/initEngine.html) 接口需要在 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口之前调用才有效。
    </Warning>

    ```dart
    // 初始化 AI 变声引擎
    await _changer?.initEngine();
    ```

### 4 更新 AI 变声引擎模型

调用 [ZegoAIVoiceChanger.update](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/update.html) 接口，更新 AI 变声引擎模型。**AI 变声引擎模型文件较大，首次更新时耗时会比较长，请您耐心等待。**

```dart
// 更新 AI 变声引擎模型
await _changer?.update();
```

### 5 获取音色列表

调用 [ZegoAIVoiceChanger.getSpeakerList](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/getSpeakerList.html) 接口，获取可用音色列表。

可用音色列表将通过 [ZegoExpressEngine.onAIVoiceChangerGetSpeakerList](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAIVoiceChangerGetSpeakerList.html) 回调接口返回。

```dart
// 获取可用音色列表
await _changer?.getSpeakerList();
```

### 6 设置目标音色

调用 [ZegoAIVoiceChanger.setSpeaker](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/setSpeaker.html) 接口，设置音色，音色的选择可以通过 [5 获取音色列表](#5-获取音色列表) 获取。

设置音色 ID 为 0 时，表示使用原声。

```dart
// 设置音色
int speakerID = 0; // 音色 ID
await _changer?.setSpeaker(speakerID);
```

### 7 销毁 AI 变声引擎实例

功能使用结束后，调用 [destroyAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/destroyAIVoiceChanger.html) 接口，销毁 AI 变声引擎实例，释放麦克风等资源。

```dart
// 销毁 AI 变声引擎实例
await ZegoExpressEngine.instance.destroyAIVoiceChanger(_changer);
```
