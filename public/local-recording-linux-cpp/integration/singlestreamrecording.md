# 录制单流
- - - 

##   功能简介

本地服务端录制 SDK 支持录制房间内的单条音视频流，集成 SDK 后，即可开始使用 SDK 的单流录制功能。

##   前提条件


- 已在项目中集成 ZEGO 本地服务端录制 SDK，详情请参考 [快速开始 - 集成](/local-recording-linux-cpp/integration/sdk-integration)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

Version: ga01596a1c8 之前的 ZEGO 本地服务端录制 SDK 版本（2022-03-23 之前发布）需要在 [ZEGO 控制台](https://console.zego.im) 申请有效的 AppID，并联系 ZEGO 技术支持获取 AppSign。若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)。
</Warning>


##   使用步骤

### 设置回调监听

在初始化之前需要先继承实现 ICallback，并设置回调监听。

- 接口原型：

  ```cpp
  ZEGO_API bool SetCallback(ICallback* pCB)
  ```
    
- 参数：

  `pCB`：回调对象指针。
  
- 备注：

  在初始化 SDK 前可以根据需要调用如下接口：

  [SetLogDirAndSize](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a3b3fbef85f70e1796df124616ad3eb5e)  设置日志文件路径和大小 
    
### 初始化 SDK

调用 [InitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af8fcc2e5a69e83075637631d68fcf4ea) 接口初始化 SDK，将申请到的 AppID 传入参数 “uiAppID”。


- 接口原型：

  ```cpp
  ZEGO_API bool InitSDK(unsigned int uiAppID)
  ```
    
- 参数：

  `uiAppID`：ZEGO 派发的数字 ID，各个开发者的唯一标识。
  

- 异步回调接口：

  ```cpp
  class ICallback
  {
  public:
      virtual void OnInitSDK(int errorCode) {}
  }
  ```
  errorCode == 0 表示初始化成功。


### 设置 token

在登录房间之前调用 [SetCustomToken](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a68bdea0d66d62c8bf4d671284707b3ae) 接口将 Token 传入 SDK。

- 接口原型：

  ```cpp
  ZEGO_API void SetCustomToken(const char *thirdPartyToken)
  ```

- 参数：

  `thirdPartyToken`：鉴权 Token。

### 登录房间

录制之前需要先登录房间。

- 接口原型：

  ```cpp
  ZEGO_API bool LoginRoom(const char* pszRoomID)
  ```
    
- 参数：  

  `pszRoomID`：房间 ID，正在推流的房间的 ID。
  
- 异步回调接口：

  ```cpp
  class ICallback
  {
  public:
      virtual void OnLoginRoom(int errorCode, const char *pszRoomID) = 0;
  }
  ```
    
### 开始录制

1. 此接口必须在初始化成功后调用。
2. 建议在登录房间后并收到 [OnStreamUpdate](https://doc-zh.zego.im/API/ServerRecord/class_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_i_callback.html#a6d0fe744187badddf744918869c59dfd) 流信息更新回调后，根据增加流信息来开启录制。
3. 可在开始录制之前调用 [GetMaxRecordCount](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ac0a46bc40d185af50d12dc3b210c7bc7) 获取 SDK 支持的最大同时录制流数，根据其值处理同时录制的流数量。

- 接口原型：

  ```cpp
  ZEGO_API bool StartRecordSingleStream(const char* pszStreamID, const char *pszPathAndName, MuxerStreamType nMuxerStreamType = MuxerStreamTypeBoth, int nFragmentSeconds = 2)
  ```
    
- 参数：  

  pszStreamID：待录制的流 ID。

  pszPathAndName：录制文件全路径（包括文件名），且必须以 .mp4、.m3u8、.flv、.mp3、.aac 结尾（其中 .mp3 和 .aac 只支持录制纯音频），SDK 内部会自动创建对应路径，若有相同的文件会直接覆盖原文件。

  nMuxerStreamType：录制流类型，请参考 [MuxerStreamType](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#aa3bdd4c85ace109d95354ff574454b96)，默认录制音视频。

  nFragmentSeconds：录制文件分片间隔（0~10s），0表示不分片，大于0表示分片；默认间隔为2s。进行分片能保证录制发生异常中断等问题时，已保存的录制文件可以正常播放；注意，这儿的分片是 SDK 内部处理录制文件的一个逻辑概念，而不是将录制文件按间隔时间分成多个小文件存储。
  
- 异步回调接口：

  ```cpp
  class ICallback
  {
  public:
      virtual void OnStreamRecordBegin(const char* pszStreamID, const char *pszPathAndName) = 0;
  }
  ```
录制启动成功会收到录制开始的回调。
      
### 停止录制

- 接口原型：

  ```cpp
  ZEGO_API bool StopRecordSingleStream(const char* pszStreamID)
  ```
    
- 参数：  

  pszStreamID：流 ID。

- 异步回调接口：

  ```cpp
  class ICallback
  {
  public:
      virtual void OnStreamRecordEnd(const char* pszStreamID, const char *pszPathAndName, RecordEndReason reason) = 0;
  }
  ```
    
- 备注：

  建议在不需要再录制的时候，做以下处理：
  1. 调用 [LogoutRoom](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a02b98c29388acfea615e98580dbf37be) 退出房间。
  2. 调用 `LIVEROOM::SetCallback(nullptr);` 去掉回调监听。
  3. 调用 [UnInitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ad22d5b7f5f22a4f2339d7a09fbc8e149) 反初始化 SDK。

##   API 参考列表

| 方法 | 描述 |
|-------|--------|
| [SetCallback](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ac65bb0a987f3c4c2339869c8d42317ca) | 设置回调监听 |
| [InitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af8fcc2e5a69e83075637631d68fcf4ea) | 初始化 SDK |
| [LoginRoom](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#1ac13869a794f456b739a5c9240e8f752c) | 登录房间 |
| [GetMaxRecordCount](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ac0a46bc40d185af50d12dc3b210c7bc7) | 获取 SDK 支持的最大同时录制流数 |
| [StartRecordSingleStream](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a74b2db523b91d3c19b403cb63ae42e71) | 开始单流录制 |
| [StopRecordSingleStream](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a71af2d4df09f6ad42b3b51715fe7eb7f) | 停止单流录制 |
| [SetMuxerOutType](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a079d86fab862ef7691b72aae74a825b0) | 设置录制数据输出方式 |
| [SetLogDirAndSize](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a3b3fbef85f70e1796df124616ad3eb5e) | 设置 SDK log 路径和单个 log 文件大小 |
| [SetConfig](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a06880edde0dc25a759e0227b34f0e059) | 设置配置信息 |
| [SetMuxerCacheSize](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a3f5e354e62a78ed4d0145f46cc06ed2c) | 设置文件落地前的缓存大小(64KB~1MB) |
| [GetSDKVersion](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af4eea202c9ac60b679c34e60d0c26729) | 获取 SDK 版本 |
| [UploadLog](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a932b070c8f8537f5ff90e7e0feebf360) | 上传 log 文件到 ZEGO 后台 |
| [UnInitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ad22d5b7f5f22a4f2339d7a09fbc8e149) | 反初始化 SDK |
| [LogoutRoom](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a02b98c29388acfea615e98580dbf37be) | 退出房间 |
