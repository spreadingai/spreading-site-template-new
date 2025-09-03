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

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/7633#CreateEngine)” 及 “[登录房间](/real-time-video-ios-oc/quick-start/implementing-video-call#2-登录房间)”。

### 3 初始化 AI 变声引擎实例

1. 调用 [createAIVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-ai-voice-changer) 接口，创建 AI 变声引擎实例。

    当前只支持同时创建一个实例，调用 [destroyAIVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#destroy-ai-voice-changer) 接口销毁实例之前，再次创建将返回 NULL。

    ```cpp
    // 创建 AI 变声引擎实例
    aiVoiceChanger = engine.createAIVoiceChanger();
    ```

2. 调用 [IZegoAIVoiceChanger.setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#set-event-handler) 接口，设置 AI 变声引擎事件回调。

    ```cpp
    // 设置 AI 变声引擎事件回调
    aiVoiceChanger->setEventHandler(this);
    ```

3. 调用 [IZegoAIVoiceChanger.initEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#init-engine) 接口，初始化 AI 变声引擎实例。

<Warning title="注意">


    [IZegoAIVoiceChanger.initEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#init-engine) 接口需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 接口之前调用才有效。
    
</Warning>



    ```cpp
    // 初始化 AI 变声引擎
    aiVoiceChanger->initEngine();
    ```

### 4 更新 AI 变声引擎模型

调用 [IZegoAIVoiceChanger.update](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#update) 接口，更新 AI 变声引擎模型。**AI 变声引擎模型文件较大，首次更新时耗时会比较长，请您耐心等待。**

```cpp
// 更新 AI 变声引擎模型
aiVoiceChanger->update();
```

### 5 获取音色列表

调用 [IZegoAIVoiceChanger.getSpeakerList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#get-speaker-list) 接口，获取可用音色列表。

可用音色列表将通过 [IZegoAIVoiceChangerEventHandler.onGetSpeakerList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChangerEventHandler#on-get-speaker-list) 回调接口返回。

```cpp
// 获取可用音色列表
aiVoiceChanger->getSpeakerList();
```

### 6 设置目标音色

调用 [IZegoAIVoiceChanger.setSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChanger#set-speaker) 接口，设置音色，音色的选择可以通过 [5 获取音色列表](#5-获取音色列表) 获取。

设置音色 ID 为 0 时，表示使用原声。

```cpp
// 设置音色
int speakerID = 0; // 音色 ID
aiVoiceChanger->setSpeaker(speakerID);
```

### 7 销毁 AI 变声引擎实例

功能使用结束后，调用 [destroyAIVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#destroy-ai-voice-changer) 接口，销毁 AI 变声引擎实例，释放麦克风等资源。

```cpp
// 销毁 AI 变声引擎实例
engine.destroyAIVoiceChanger(aiVoiceChanger);
```

## 注意事项

以上步骤完成后，在部署应用前，您需要将 SDK 中的 `cacert.pem` 文件部署到应用主程序的同级目录下，否则无法正常使用 AI 变声功能。
