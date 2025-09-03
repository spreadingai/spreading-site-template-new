# 安全加密

- - -

## 功能简介

该功能可用于加密流信息以保护通信安全。

开发者可在推流时对流进行加密。对于已经加密的流，在拉流时，开发者需提供与加密密钥一致的解密密钥，否则无法成功拉流。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-macos-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/Security”目录下的文件。

## 前提条件

在使用安全加密功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考  [快速开始 - 集成](/real-time-video-macos-cpp/quick-start/integrating-sdk) 和  [快速开始 - 实现流程](/real-time-video-macos-cpp/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。

## 使用步骤

### 1 设置推流加密密钥

调用 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-publish-stream-encryption-key) 可设置推流加密密钥，该接口在推流前后调用都可生效。

<Warning title="注意">


- 该接口仅当向 **Zego RTC 服务器**推流时调用有效。

- 支持在推流中途调用 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-publish-stream-encryption-key) 更新加密密钥，注意此时需要先更新拉流端解密密钥后才能更新推流端加密密钥，否则会导致拉流失败。
- 调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-publishing-stream) 或 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#logout-room) 都将会清空加密密钥。


</Warning>



```cpp
// key 为加密密钥，长度仅支持16/24/32 字节。
engine->setPublishStreamEncryptionKey(key);
```

### 2 设置拉流解密密钥

调用 [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-play-stream-decryption-key-stream-id) 可设置拉流解密密钥，该接口在推流前后调用都可生效。

<Warning title="注意">


- 该接口仅当从 **Zego RTC 或 L3 服务器**拉流时调用有效。
- 支持在拉流中途调用 [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-play-stream-decryption-key-stream-id) 更新解密密钥，注意需要先更新拉流端解密密钥后才能更新推流端加密密钥，否则会导致拉流失败。
- 调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-playing-stream) 或 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#logout-room) 都将会清空加密密钥。


</Warning>



```cpp
// playStreamID 为拉流ID
// key 为解密密钥，长度仅支持16/24/32 字节。
engine->setPlayStreamDecryptionKey(playStreamID,key);
```

### 开始推流、拉流

请参考 [快速开始-实现流程](/real-time-video-macos-cpp/quick-start/implementing-video-call) 依次完成推流和拉流相关操作。


## 5 API 参考列表

| 方法 | 描述 |
|-------|--------|
| [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-publish-stream-encryption-key) | 设置推流加密密钥 |
| [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-play-stream-decryption-key-stream-id) |设置拉流解密密钥|
