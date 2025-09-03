# AI 变声

- - -

## 功能简介

实时通话中的“柯南变声领结”，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调，随心所欲切换音色，超低延迟让用户自在畅享社交语聊、直播、游戏语音等场景。

<Warning title="注意">

- “AI 变声”功能为付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。
- 该功能从 3.10.0 版本开始支持，当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。
- 目前，该功能暂不支持和 “自定义音频处理” 同时使用。

</Warning>



### 功能优势

- 超高音质，超低延迟。
- 灵动真实，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调。
- 海量音色灵活选择，支持音色定制。

### 效果演示

<table>

<tbody><tr>
<th>原始声音</th>
<th colspan="2">目标音色</th>
<th>AI 变声后</th>
</tr>
<tr>
<td rowspan="4"><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/original_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
<td>青年男性</td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/young_male_target_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/young_male_changer_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
</tr>
<tr>
<td>成年男性</td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/adult_male_target_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/adult_male_changer_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
</tr>
<tr>
<td>青年女性</td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/young_female_target_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/young_female_changer_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
</tr>
<tr>
<td>成年女性</td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/adult_female_target_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
<td><audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/VoiceChanger/adult_female_changer_voice.wav" controls>您的浏览器不支持 audio 标签。</audio></td>
</tr>
</tbody></table>

### 适用场景

该功能可用于以下实时场景中，实现用户的音色变换。

- 社交语聊
- 游戏语音
- 音视频直播
- 虚拟人

## 前提条件

在实现 AI 变声功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13197)。


## 使用步骤

开发者可以按照以下步骤完成 AI 变声的相关设置：

### 1 开启权限

请确认您已联系 ZEGO 技术支持进行特殊编包，并开启了 AI 变声权限。

### 2 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/13197#initialization)” 及 “[登录房间](https://doc-zh.zego.im/article/13197#createroom)”。

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

调用 [ZegoAIVoiceChanger.setSpeaker](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAIVoiceChanger/setSpeaker.html) 接口，设置音色，音色的选择可以通过 [5 获取音色列表](https://doc-zh.zego.im/article/18594#3_5) 获取。

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

<Content />

