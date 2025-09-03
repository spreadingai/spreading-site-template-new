# 快速开始

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 已联系 ZEGO 技术支持开通云端语音识别服务。
- 已在客户端集成 [ZEGO Express SDK](https://doc-zh.zego.im/article/195)并实现[视频通话或者语音通话](https://doc-zh.zego.im/article/7627)。

## 使用步骤

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant Server as 业务后台
    participant ASRServer as 云端实时语音识别后台

    rect rgb(174, 229, 248)
        Server->>ASRServer: 开启云端实时语音识别
        ASRServer->>ASRServer: 识别房间内所有音频流
        ASRServer-->>Server: 识别结果回调
        Note right of Server: 通过提前配置好的回调地址
    end
        Server->>Server: 将识别结果通过 RTC 推送自定义消息接口或<br/>自建推送服务传递给客户端
        Server-->>Client: 识别结果
        Server->>ASRServer: 停止云端实时语音识别
```

使用实时语音识别服务的核心步骤如图蓝色块标注步骤所示。在您的业务后台调用[开启云端实时语音识别](/cloud-realtime-asr/api-reference/start)接口后，云端实时语音识别后台会识别房间内所有音频流，通过提前配置好的[回调](/cloud-realtime-asr/callbacks/receiving-callback)地址将识别结果回调给您的业务后台。

如果您需要实现实时字幕等需要在客户端显示识别内容的场景，您需要将识别结果通过 RTC [推送自定义消息](https://doc-zh.zego.im/article/19553)接口或自建推送服务传递给客户端。

<Warning title="注意">
请联系 ZEGO 技术支持配置接收识别结果的回调地址。
</Warning>
<Warning title="注意">
如果 RTC 房间 120 秒后没有真实用户存在，则云端实时语音识别服务会自动停止，并触发 Event 为 Exception 的回调，Data.Code 为 1202。
</Warning>

### 示例代码

以下是服务端相关接口和回调的示例代码（Node.js）：
<CodeGroup>
```javascript 开启云端实时语音识别
const https = require('https');
const querystring = require('querystring');

const data = JSON.stringify({
  "RoomId": "room_1",
  "ASR": {
    "HotWord": "三支一扶|10",
    "Params": {
      "engine_model_type": "16k_zh"
    },
    "VADSilenceSegmentation": 500
  }
});

const params = {
  Action: 'StartRealtimeASRTask',
  AppId: '1234567890',
  SignatureNonce: 'vecj0mc2jcl',
  Timestamp: '1753691152',
  Signature: 'e8032aabe7702091b0bb2ca83cc2f98a',
  SignatureVersion: '2.0'
};

const options = {
  hostname: 'cloud-realtime-asr-api.zegotech.cn',
  path: '/?' + querystring.stringify(params),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', JSON.parse(responseData));
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

```


```javascript 停止云端实时语音识别
const https = require('https');
const querystring = require('querystring');

const data = JSON.stringify({
  "TaskId": "1920370518175780864"
});

const params = {
  Action: 'StopRealtimeASRTask',
  AppId: '1234567890',
  SignatureNonce: 'vecj0mc2jcl',
  Timestamp: '1753691152',
  Signature: 'e8032aabe7702091b0bb2ca83cc2f98a',
  SignatureVersion: '2.0'
};

const options = {
  hostname: 'cloud-realtime-asr-api.zegotech.cn',
  path: '/?' + querystring.stringify(params),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', JSON.parse(responseData));
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

```

```javascript 回调接口
// 服务端ASR回调
function asrCallBack(req, res) {
    const { AppId, RoomId, Event, Data } = req.body;
  // 验证签名参数callbacksecret在控制台获取
  // 验证签名文档：https://doc-zh.zego.im/cloud-realtime-asr/callbacks/receiving-callback#验证签名
  const calcSign = genCallbackSignature(Nonce, callbacksecret, Timestamp);
  // 签名错误
  if (calcSign !== Signature) {
    res.json({
      Code: -1,
      Message: "Signature error",
    });
    return;
  }
    // 返回响应
  res.json({
    Code: 0,
    Message: "ok",
  });
   switch (Event) {
    // 异常事件
    case "ASRResult":
      // 将消息下发给客户端，按实际业务需求实现消息下发逻辑
      sendMessageToClient(RoomId, {
        eventType: "ASRResult",
        data: Data,
      });
      break;
  }
}

```
</CodeGroup>

### 通过 RTC 推送自定义消息接口收发识别结果



- 服务端接口请参考[推送自定义消息](https://doc-zh.zego.im/article/19553)
- 客户端接口请参考各端的 API 接口说明：

| 平台        | ZegoExpress SDK         |
|-------------|------------------------|
| iOS/macOS   | onIMRecvCustomCommand  | 
| Android     | onIMRecvCustomCommand  | 
| Windows     | onIMRecvCustomCommand  | 
| Web         | IMRecvCustomCommand    | 


<Accordion title="服务端及客户端收发示例代码" defaultOpen="false">

<CodeGroup>
```javascript 服务端向客户端发送识别结果
// 将消息发送给客户端的函数
function sendMessageToClient(roomId, message) {
  const https = require('https');
  const querystring = require('querystring');
  
  // 构建请求参数
  const params = {
    Action: 'SendCustomCommand',
    AppId: '1234567890', // 替换为您的 AppId
    SignatureNonce: 'vecj0mc2jcl',
    Timestamp: Math.floor(Date.now() / 1000).toString(),
    SignatureVersion: '2.0',
    RoomId: roomId,
    FromUserId: 'ASR_System', // 系统发送方ID
    // !focus
    MessageContent: encodeURIComponent(JSON.stringify(message))
    // 不填写 ToUserId，消息会广播给房间内所有用户
  };
  
  // 计算签名（实际使用时需要根据您的 AppSign 计算）
  // params.Signature = calculateSignature(params, appSign);
  params.Signature = 'your_calculated_signature';
  
  const options = {
    hostname: 'rtc-api.zego.im',
    path: '/?' + querystring.stringify(params),
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };
  
  const req = https.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      const result = JSON.parse(responseData);
      if (result.Code === 0) {
        console.log('消息发送成功:', roomId);
      } else {
        console.error('消息发送失败:', result.Message);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('发送消息错误:', error);
  });
  
  req.end();
}

```

```javascript 客户端接收识别结果(Web)
// 此处忽略rtc sdk的接入流程，具体参考https://doc-zh.zego.im/article/6839

const userId = "" // 登录 Express SDK房间用户ID
const roomId = "" // RTC 房间 ID，需要与创建ASR任务房间ID一致
const streamId = "" // 用户推流 ID

// 如果服务端使用RTC自定义消息下发ASR结果，需要监听RTC消息回调
// !focus(1:5)
function setupListenr() {
    zg.on("IMRecvCustomCommand", (res) => {
        console.log("识别结果:", res)
    })
}
async function enterRoom() {
  try {
    // 生成 RTC Token [参考文档]（https://doc-zh.zego.im/article/7646）
    const token = await Api.getToken();
    // 登录房间
    await zg.loginRoom(roomId, token, {
      userID: userId,
      userName: "",
    });

    // 创建本地音频流
    const localStream = await zg.createZegoStream({
      camera: {
        video: false,
        audio: true,
      },
    });
    if (localStream) {
      // 推送本地流
      await zg.startPublishingStream(streamId, localStream);
    }
  } catch (error) {
    console.error("进入房间失败:", error);
    throw error;
  }
}
setupListenr()
enterRoom()
```
</CodeGroup>

</Accordion>

## 客户端最佳配置实践

为获得最佳的识别效果，建议您在客户端使用 ZEGO Express SDK 时进行如下配置：

<Tabs>
<Tab title="Android">
- 开启传统音频 3A 处理（回声消除AEC、自动增益控制AGC、噪声抑制ANS）
- 如果是语聊房场景，建议设置房间的使用场景为高品质语聊房场景，SDK 会针对不同的场景采取不同的优化策略
- 设置音频设备模式为默认模式
- 开启 AI 回声消除，提高回声消除效果（该功能需要联系 ZEGO 技术支持获取对应版本的 ZEGOExpress SDK）

```java Android(Java)
ZegoEngineConfig config = new ZegoEngineConfig();
HashMap<String, String> advanceConfig = new HashMap<String, String>();
config.advancedConfig = advanceConfig;
ZegoExpressEngine.setEngineConfig(config);
//设置房间的使用场景为高品质语聊房场景
// !mark
ZegoExpressEngine.getEngine().setRoomScenario(ZegoScenario.HIGH_QUALITY_CHATROOM);
// 设置音频设备模式  默认模式
// !mark
ZegoExpressEngine.getEngine().setAudioDeviceMode(ZegoAudioDeviceMode.GENERAL);
// 开启传统音频 3A 处理
// !mark(1:3)
ZegoExpressEngine.getEngine().enableAEC(true);
ZegoExpressEngine.getEngine().enableAGC(true);
ZegoExpressEngine.getEngine().enableANS(true);
// 开启 AI 回声消除，请注意：开启 AI 回声消除需要联系 ZEGO 技术支持获取对应版本的 ZEGOExpress SDK
// !mark
ZegoExpressEngine.getEngine().setAECMode(ZegoAECMode.AI_AGGRESSIVE2);
// 开启 AI 降噪，适度的噪声抑制
// !mark
ZegoExpressEngine.getEngine().setANSMode(ZegoANSMode.MEDIUM);

```
</Tab>
<Tab title="iOS">
- 开启传统音频 3A 处理（回声消除AEC、自动增益控制AGC、噪声抑制ANS）
- 如果是语聊房场景，建议设置房间的使用场景为高品质语聊房场景，SDK 会针对不同的场景采取不同的优化策略
- 开启 AI 回声消除，提高回声消除效果（该功能需要联系 ZEGO 技术支持获取对应版本的 ZEGOExpress SDK）

```oc iOS(Objective-C)
ZegoEngineProfile* profile = [[ZegoEngineProfile alloc]init];
profile.appID = kZegoAppId;
//高品质语聊房场景，设置该场景可以避免申请相机权限，接入方应按自己的业务场景设置具体值
profile.scenario = ZegoScenarioHighQualityChatroom; 
ZegoEngineConfig* engineConfig = [[ZegoEngineConfig alloc] init];
engineConfig.advancedConfig = @{
};
[ZegoExpressEngine setEngineConfig:engineConfig];
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
// 开启传统音频 3A 处理
// !mark(1:3)
[[ZegoExpressEngine sharedEngine] enableAGC:TRUE];
[[ZegoExpressEngine sharedEngine] enableAEC:TRUE];
[[ZegoExpressEngine sharedEngine] enableANS:TRUE];
// 开启 AI 回声消除，请注意：开启 AI 回声消除需要联系 ZEGO 技术支持获取对应版本的 ZEGOExpress SDK
// !mark
[[ZegoExpressEngine sharedEngine] setAECMode:ZegoAECModeAIAggressive2];
// 开启 AI 降噪，适度的噪声抑制
// !mark
[[ZegoExpressEngine sharedEngine] setANSMode:ZegoANSModeMedium];

```
</Tab>
<Tab title="Web">
- 开启传统音频 3A 处理（回声消除AEC、自动增益控制AGC、噪声抑制ANS）
- 如果是语聊房场景，建议设置房间的使用场景为高品质语聊房场景，SDK 会针对不同的场景采取不同的优化策略
- 推流时，设置推流参数配置自动切换为可用的 `videoCodec`

```javascript Web(JavaScript)
// 引入必要的模块
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// 实例化 ZegoExpressEngine，设置房间的使用场景为高品质语聊房场景
// !mark
const zg = new ZegoExpressEngine(appid, server, { scenario: 7 })

// 创建本地媒体流, 配置传统音频 3A 处理，SDK 默认开启
// !mark
const localStream = await zg.createZegoStream();

// 推送本地媒体流，需要设置自动切换为可用的 videoCodec
// !mark
await zg.startPublishingStream(userStreamId, localStream, {
  enableAutoSwitchVideoCodec: true,
});

// 检查系统要求
async function checkSystemRequirements() {
  // 检测是否支持WebRTC
  const rtcSupport = await zg.checkSystemRequirements("webRTC");
  if (!rtcSupport.result) {
    console.error("浏览器不支持WebRTC");
    return false;
  }

  // 检测麦克风权限
  const micSupport = await zg.checkSystemRequirements("microphone");
  if (!micSupport.result) {
    console.error("未获得麦克风权限");
    return false;
  }

  return true;
}
```
</Tab>
</Tabs>

<Note title="说明">其他端的的配置请联系 ZEGO 技术支持了解详情。</Note>