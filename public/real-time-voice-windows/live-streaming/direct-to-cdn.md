# 直推CDN

---

## 功能简介

直推 CDN（Content Delivery Network，内容分发网络）指的是将音视频流直接从本地客户端推送到 CDN 的过程，用户可直接通过拉流 URL 地址从网页或第三方播放器进行观看。但由于直推 CDN 功能在网络传输过程中不经过 ZEGO 实时音视频云，因此开发者无法使用 ZEGO 的超低延迟音视频服务。

该功能一般由与第三方 CDN 有音视频分发服务合作的开发者使用。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-windows-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/src/CDNAbout” 目录下的文件。

## 前提条件

在实现直推 CDN 功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3577) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7637)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 使用步骤

### 初始化和登录房间

请参考 [快速开始 - 实现流程](/real-time-voice-windows/quick-start/implementing-voice-call#使用步骤) 的 “创建引擎”、“登录房间”。

### 设置 SDK 直推 CDN

直推 CDN 的功能必须“推流前”设置。

- 接口原型

    ```cpp
    /**
     * 是否不经过 Zego 实时视频云服务器直接推流到 CDN，支持设置其他路推流
     *
     * 此接口需要推流前设置。
     * 调用此接口将音视频流直接推往 CDN 之后，调用 [addPublishCdnUrl] 与 [removePublishCdnUrl] 动态转推至 CDN 不再生效，因为这两个接口是从 ZEGO 实时音视频云将音视频流转推或停止转推到 CDN，若直接音视频流直接推往 CDN 将无法通过 ZEGO 实时音视频云将音视频流再动态转推至 CDN。
     *
     * @param enable 是否开启直推 CDN；true 表示开启直推 CDN；false 表示不开启直推 CDN；默认为 false
     * @param config CDN 配置，若为 nullptr 则使用 Zego 的后台配置
     */
    virtual void enablePublishDirectToCDN(bool enable, ZegoCDNConfig* config);
    ```

- 调用示例

    ```cpp
    ZegoCDNConfig config;
    // URL 需要开发者根据实际情况填写
    config.URL = "rtmp://xxxxxxxx";

    engine->enablePublishDirectToCDN(true, &config);
    engine->startPublishing("STREAM_ID")
    ```

### 开始推流

请参考 [快速开始 - 实现流程](/real-time-voice-windows/quick-start/implementing-voice-call#推流) 的 “推流”。

### 监听推流状态通知

- 接口原型

    ```cpp
    /**
     * 推流状态回调
     *
     * 在推流成功后，可以通过该回调接口获取推流状态变更的通知。
     * 开发者可根据 state 参数是否在 [正在请求推流状态] 来大体判断用户的推流网络情况。
     *
     * @param streamID 推流的流 ID
     * @param state 推流状态
     * @param errorCode 推流状态变更对应的错误码。请参考常见错误码文档 [https://doc-zh.zego.im/zh/4380.html]
     * @param extendedData 扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 flv_url_list，rtmp_url_list，hls_url_list。这些对应 flv、rtmp、hls协议的拉流url。若是未使用 ZEGO 的 CDN，不需关注该参数。
     */
    virtual void onPublisherStateUpdate(const std::string& /*streamID*/, ZegoPublisherState /*state*/, int /*errorCode*/, const std::string& /*extendedData*/);
    ```

- 调用示例

    ```cpp
    class MyEventHandler:public IZegoEventHandler{
    public:
        void onPublisherRelayCDNStateUpdate(const std::string& /*streamID*/, const std::vector<ZegoStreamRelayCDNInfo>& /*streamInfoList*/) {
            /** 调用动态转推接口成功后，当CDN连接状态发生变更，如出现网络中断导致转推异常等情况，SDK在重试转推的同时，会通过该回调通知 */
        }
    };
    auto handler = std::make_shared<MyEventHandler>();
    engine->setEventHandler(handler);
    ```

### 观众拉流

- 当开发者使用 ZEGO 配置的 CDN 进行直推时，则可以直接通过 streamID 进行拉流，请参考 [快速开始 - 实现流程](/real-time-voice-windows/quick-start/implementing-voice-call#拉流) 的 “拉流”。
- 当开发者使用第三方 CDN 进行直推时，则可以通过 URL 进行拉流，请参考 [推拉流进阶 - 通过 URL 拉流](/real-time-video-windows-cpp/live-streaming/playing-stream-by-url)。

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [enablePublishDirectToCDN ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#enable-publish-direct-to-cdn) | 使能直推 CDN |
| [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-publishing-stream) | 开始推流 |
| [stopPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-publishing-stream) | 停止推流 |
