# 3.8.1 及以上版本升级指南

- - -

<Warning title="注意">


- 如果您当前的 SDK 低于 3.8.1 版本，需要升级到任一 3.8.1 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12552) 中两个版本区间的变更说明，检查您的业务相关接口。

</Warning>



在 3.8.1 版本，对以下 API 接口进行废弃变更。

## onPublisherSendAudioFirstFrame

废弃了原有的 `onPublisherSendAudioFirstFrame` 回调接口，替换为同名的 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html) 回调，并新增通道 channel 参数，支持按推流通道回调相关的事件活动。
    
- 从原来的

    ```dart
    static void Function()? onPublisherSendAudioFirstFrame;
    ```

- 修改为

    ```dart
    static void Function(ZegoPublishChannel channel)? onPublisherSendAudioFirstFrame;
    ```

**适配方式**

<Tabs>
<Tab title="3.8.1 版本前">
```dart
    ZegoExpressEngine.onPublisherSendAudioFirstFrame = () {
        // ...
    };
    ```
</Tab>
<Tab title="3.8.1 版本及以上">
```dart
    ZegoExpressEngine.onPublisherSendAudioFirstFrame = (channel) {
        // ...
    };
    ```
</Tab>
</Tabs>
## setAudioReceiveRange

废弃了原有的 [ZegoRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio-class.html) 类的成员函数 `setAudioReceiveRange` 接口，替换为同名的 [setAudioReceiveRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setAudioReceiveRange.html) 接口，并扩展参数 [ZegoReceiveRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoReceiveRangeParam-class.html) 类型，支持设置范围语音的音频接收范围。

    
- 从原来的

    ```dart
    Future<void> setAudioReceiveRange(double range);
    ```

- 修改为

    ```dart
    Future<int> setAudioReceiveRange(ZegoReceiveRangeParam param);
    ```

**适配方式**

<Tabs>
<Tab title="3.8.1 版本前">
```dart
rangeAudio.setAudioReceiveRange(1.0);
```
</Tab>
<Tab title="3.8.1 版本及以上">
```dart
var param = ZegoReceiveRangeParam(0.5, 1.0);
rangeAudio.setAudioReceiveRange(param);
```
</Tab>
</Tabs>


## setStreamVocalRange

废弃了原有的 [ZegoRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio-class.html) 类的成员函数 `setStreamVocalRange` 接口，替换为同名的 [setStreamVocalRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setStreamVocalRange.html) 接口，并扩展参数 [ZegoVocalRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVocalRangeParam-class.html) 类型，支持设置范围语音的单条流发声范围。

- 从原来的

    ```dart
    Future<void> setStreamVocalRange(String streamID, double vocalRange);
    ```

- 修改为

    ```dart
    Future<int> setStreamVocalRange(String streamID, ZegoVocalRangeParam param);
    ```

**适配方式**

<Tabs>
<Tab title="3.8.1 版本前">
```dart
rangeAudio.setStreamVocalRange(streamid, 1.0);
```
</Tab>
<Tab title="3.8.1 版本及以上">
```dart
var param = ZegoVocalRangeParam(0.5, 1.0);
rangeAudio.setStreamVocalRange(streamid, param);
```
</Tab>
</Tabs>
