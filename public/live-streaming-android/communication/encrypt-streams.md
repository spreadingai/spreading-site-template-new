# 音视频流加密

- - -

## 功能简介

该功能可用于加密流信息以保护通信安全。

开发者可在推流时对流进行加密。对于已经加密的流，在拉流时，开发者需提供与加密密钥一致的解密密钥，否则无法成功拉流。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13396) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/im/zego/others/security” 目录下的文件。

## 前提条件

在使用音视频流加密功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。


## 使用步骤

### 1 设置推流加密密钥

调用 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-publish-stream-encryption-key) 接口可设置推流的加密密钥，该接口在推流前后调用都可生效。加密密钥由开发者自行设定，长度仅支持 16/24/32 字节。开发者在拉加密后的流时，需提供与加密密钥一致的解密密钥，否则无法成功拉流。

<Warning title="注意">

- 该接口仅当向 **ZEGO 实时音视频服务器** 或 **低延迟直播服务器** 推流时调用有效。
- 支持在推流中途调用 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-publish-stream-encryption-key) 更新加密密钥，注意需要先更新拉流端解密密钥后，才能更新推流端加密密钥。
- 若先更新推流端加密密钥再更新拉流端解密密钥，拉流端可能出现部分帧无法解密的情况，进而导致拉流失败。若先更新拉流端解密密钥，则 SDK 会存储新旧两个解密密钥，可以做到无缝切换。
- 调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-publishing-stream) 或 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 都将会清空加密密钥。

</Warning>


```java
// key 为加密密钥，长度仅支持 16/24/32 字节。
// 加密密钥由开发者自行设定。
engine.setPublishStreamEncryptionKey(key);
```

### 2 设置拉流解密密钥

调用 [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-play-stream-decryption-key) 接口可设置拉流解密密钥，该接口在拉流前后调用都可生效。

<Warning title="注意">

- 该接口仅当从 **ZEGO 实时音视频服务器** 或 **低延迟直播服务器** 拉流时调用有效。
- 支持在拉流中途调用 [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-play-stream-decryption-key) 更新解密密钥，注意需要先更新拉流端解密密钥后，才能更新推流端加密密钥。
- 调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 或 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 都将会清空解密密钥。

</Warning>

```java
// playStreamID 为拉流 ID
// key 为解密密钥，长度仅支持 16/24/32 字节。
engine.setPlayStreamDecryptionKey(playStreamID,key);

```

### 3 开始推流/拉流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395#publishingStream) 依次完成”推流“和”拉流“相关操作。

<Content />

