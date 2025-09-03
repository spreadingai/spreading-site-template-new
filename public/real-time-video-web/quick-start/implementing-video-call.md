# 实现视频通话

---

## 功能简介


本文介绍如何快速实现一个简单的实时音视频通话。

在开始之前，您可以先了解一些音视频的基础概念：

- 流：一组按指定编码格式封装的音视频数据内容。一个流可以包含几个轨道，比如视频和音频轨道。
- 推流：把采集阶段封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。

更多相关概念可参考 [术语说明](/glossary/term-explanation)。

## 前提条件

在实现基本的实时音视频功能之前，请确保：
- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-web/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 示例代码

我们提供了一个实现了基本流程的完整示例 HTML 文件，可作为开发过程中的参考。

<Accordion title="完整示例 HTML" defaultOpen="false">
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Zego Express Video Call</title>
    <!-- 此处需要改成正确的 SDK 版本号 -->
    <script src="ZegoExpressWebRTC-x.x.x.js"></script>

</head>

<body>
    <h1>
        Zego RTC Video Call
    </h1>
    <div class="video-wrapper">
        **Local video**
        **Remote video**
        <div id="local-video"></div>
        <div id="remote-video"></div>
    </div>
    <script>
        // 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
        let appID = 0
        // 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取（获取方式请参考上文“前提条件”）
        let server = ""

        // 初始化实例
        const zg = new ZegoExpressEngine(appID, server);
        zg.setDebugVerbose(false)
        // 房间状态更新回调
        // 此处在登录房间成功后，立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证当前房间连接状态是连接成功的即可。
        // 房间状态更新回调
        zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {
            if (reason == 'LOGINED') {
                console.log("与房间连接成功，只有当房间状态是连接成功时，才能进行推流、拉流等操作。")
            }
        })

        zg.on('roomUserUpdate', (roomID, updateType, userList) => {
            // 其他用户进出房间的通知
        });

        zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
            // 房间内其他用户音视频流变化的通知
            if (updateType == 'ADD') {
                // 流新增，开始拉流
                // 此处演示拉取流新增的列表中第一条流的音视频
                const streamID = streamList[0].streamID;
                // streamList 中有对应流的 streamID
                const remoteStream = await zg.startPlayingStream(streamID);
                // 创建媒体流播放组件
                const remoteView = zg.createRemoteStreamView(remoteStream);
                remoteView.play("remote-video", {enableAutoplayDialog:true});

            } else if (updateType == 'DELETE') {
                // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
                const streamID = streamList[0].streamID;
                zg.stopPlayingStream(streamID)
            }
        });

        // 登录房间，成功则返回 true
        // userUpdate 设置为 true 才能收到 roomUserUpdate 回调。
        let userID = "user1"; // userID 用户自己设置，必须保证全局唯一
        let userName = "user1";// userName 用户自己设置，没有唯一性要求，非必填
        let roomID = "123"; // roomID 用户自己设置，必须保证全局唯一
        // token 由用户自己的服务端生成，为了更快跑通流程，可以通过 ZEGO 控制台 https://console.zego.im/ 获取临时的音视频 token，token 为字符串
        let token = ``;

        zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(async result => {
            if (result == true) {
                console.log("login success");
                // 与房间连接成功，只有当房间状态是连接成功时，才能进行推流、拉流等操作。
                // 创建流、预览
                // 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回流媒体对象才能执行后续操作
                const localStream = await zg.createZegoStream();
                // 预览画面
                localStream.playVideo(document.querySelector("#local-video"), {enableAutoplayDialog:true});
                // 开始推流，将自己的音视频流推送到 ZEGO 音视频云，此处 streamID 由用户定义，需全局唯一
                let streamID = new Date().getTime().toString();
                zg.startPublishingStream(streamID, localStream)
            }
        });
        // // 登录房间的第二种写法
        // (async function main(){
        //     await zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true })
        // })()
    </script>
</body>

</html>
```
</Accordion>


## 实现流程

以用户 A 拉取用户 B 的流为例，一次简单的实时音视频通话主要流程如下：

1. 用户 A 创建实例，登录房间。（登录成功后，可预览自己的画面并推流。）
2. 用户 B 创建实例，登录同一个房间。登录成功后，用户 B 开始推流，此时 SDK 会触发 [roomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调，表示房间内有流的变化。
3. 用户 A 可通过监听 [roomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调，当回调通知有流新增时，获取用户 B 的流 ID，来拉取播放用户 B 刚刚推送的流。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_zh_Web.png" /></Frame>



### 创建界面

为方便实现基本的实时音视频功能，您可参考下图实现一个简单的页面。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call_pc.png" />
</Frame>


<a id="CreateEngine"> </a>

### 创建引擎并监听回调

1. 创建并初始化一个 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的实例，将您项目的 AppID 传入参数 “appID”，Server 传入参数 “server”。

<Warning title="注意">


  ZegoExpressEngine 的实例不能被框架以响应式的方式处理，否则会发生不可预测的问题。例如，Vue3 框架上可以通过 Vue3 的 markRaw 接口标记 SDK 实例，避免被转为代理。

</Warning>



2. SDK 提供如房间连接状态、音视频流变化、用户进出等通知回调。创建引擎后，您可以通过引擎实例的[on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on)方法注册回调。

<Warning title="注意">


  为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>



  ```javascript
  // 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
  let appID = ;
  // 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取（获取方式请参考上文“前提条件”）
  let server = "";

  // 初始化实例
  const zg = new ZegoExpressEngine(appID, server);

  // 房间状态更新回调
  zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
      if (reason == 'LOGINING') {
          // 登录中
      } else if (reason == 'LOGINED') {
          // 登录成功
          //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
          //将自己的音视频流推送到 ZEGO 音视频云
      } else if (reason == 'LOGIN_FAILED') {
          // 登录失败
      } else if (reason == 'RECONNECTING') {
          // 重连中
      } else if (reason == 'RECONNECTED') {
          // 重连成功
      } else if (reason == 'RECONNECT_FAILED') {
          // 重连失败
      } else if (reason == 'KICKOUT') {
          // 被踢出房间
      } else if (reason == 'LOGOUT') {
          // 登出成功
      } else if (reason == 'LOGOUT_FAILED') {
          // 登出失败
      }
  });

  //房间内其他用户进出房间的通知
  //只有调用 loginRoom 登录房间时传入 ZegoRoomConfig，且 ZegoRoomConfig 的 userUpdate 参数为 “true” 时，用户才能收到 roomUserUpdate回调。
  zg.on('roomUserUpdate', (roomID, updateType, userList) => {
      if (updateType == 'ADD') {
          for (var i = 0; i < userList.length; i++) {
              console.log(userList[i]['userID'], '加入了房间：', roomID)
          }
      } else if (updateType == 'DELETE') {
          for (var i = 0; i < userList.length; i++) {
              console.log(userList[i]['userID'], '退出了房间：', roomID)
          }
      }
  });

  zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      // 房间内其他用户音视频流变化的通知
  });
  ```



<Accordion title="常用通知回调" defaultOpen="false">
```javascript
// 房间连接状态更新回调
// 本地调用 loginRoom 加入房间时，您可通过监听 roomStateChanged 回调实时监控自己在本房间内的连接状态。
zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
    if (reason == 'LOGINING') {
        // 登录中
    } else if (reason == 'LOGINED') {
        // 登录成功
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    } else if (reason == 'LOGIN_FAILED') {
        // 登录失败
    } else if (reason == 'RECONNECTING') {
        // 重连中
    } else if (reason == 'RECONNECTED') {
        // 重连成功
    } else if (reason == 'RECONNECT_FAILED') {
        // 重连失败
    } else if (reason == 'KICKOUT') {
        // 被踢出房间
    } else if (reason == 'LOGOUT') {
        // 登出成功
    } else if (reason == 'LOGOUT_FAILED') {
        // 登出失败
    }
});

//房间内其他用户推送的音视频流新增/减少的通知
//自己推送的流不能在这里接收到通知
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增
        for (var i = 0; i < streamList.length; i++) {
            console.log('房间',roomID,'内新增了流：', streamList[i]['streamID'])
        }
        const message = "其他用户的视频流streamID: " + streamID.toString();
    } else if (updateType == 'DELETE') {
        // 流删除
        for (var i = 0; i < streamList.length; i++) {
            console.log('房间',roomID,'内减少了流：', streamList[i]['streamID'])
        }
    }
});

//房间内其他用户进出房间的通知
//只有调用 loginRoom 登录房间时传入 ZegoRoomConfig，且 ZegoRoomConfig 的 userUpdate 参数为 “true” 时，用户才能收到 roomUserUpdate回调。
zg.on('roomUserUpdate', (roomID, updateType, userList) => {
    if (updateType == 'ADD') {
        for (var i = 0; i < userList.length; i++) {
            console.log(userList[i]['userID'], '加入了房间：', roomID)
        }
    } else if (updateType == 'DELETE') {
        for (var i = 0; i < userList.length; i++) {
            console.log(userList[i]['userID'], '退出了房间：', roomID)
        }
    }
});

//用户推送音视频流的状态通知
//用户推送音视频流的状态发生变更时，会收到该回调。如果网络中断导致推流异常，SDK 在重试推流的同时也会通知状态变化。
zg.on('publisherStateUpdate', result => {
    // 推流状态更新回调
    var state = result['state']
    var streamID = result['streamID']
    var errorCode = result['errorCode']
    var extendedData = result['extendedData']
    if (state == 'PUBLISHING') {
        console.log('成功推送音视频流：', streamID);
    } else if (state == 'NO_PUBLISH') {
        console.log('未推送音视频流');
    } else if (state == 'PUBLISH_REQUESTING') {
        console.log('请求推送音视频流：', streamID);
    }
    console.log('错误码:', errorCode,' 额外信息:', extendedData)
})

//推流质量回调。
//成功推流后，您会定时收到回调音视频流质量数据（如分辨率、帧率、码率等）。
zg.on('publishQualityUpdate', (streamID, stats) => {
    // 推流质量回调
    console.log('流质量回调')
})

//用户拉取音视频流的状态通知
//用户拉取音视频流的状态发生变更时，会收到该回调。如果网络中断导致拉流异常，SDK 会自动进行重试。
zg.on('playerStateUpdate', result => {
    // 拉流状态更新回调
    var state = result['state']
    var streamID = result['streamID']
    var errorCode = result['errorCode']
    var extendedData = result['extendedData']
    if (state == 'PLAYING') {
        console.log('成功拉取音视频流：', streamID);
    } else if (state == 'NO_PLAY') {
        console.log('未拉取音视频流');
    } else if (state == 'PLAY_REQUESTING') {
        console.log('请求拉取音视频流：', streamID);
    }
    console.log('错误码:', errorCode,' 额外信息:', extendedData)
})

//拉取音视频流时的质量回调。
//成功拉流后，您会定时收到拉取音视频流时的质量数据通知（如分辨率、帧率、码率等）。
zg.on('playQualityUpdate', (streamID,stats) => {
    // 拉流质量回调
})

//收到广播消息的通知
zg.on('IMRecvBroadcastMessage', (roomID, chatData) => {
    console.log('广播消息IMRecvBroadcastMessage', roomID, chatData[0].message);
    alert(chatData[0].message)
});

//收到弹幕消息的通知
zg.on('IMRecvBarrageMessage', (roomID, chatData) => {
    console.log('弹幕消息IMRecvBroadcastMessage', roomID, chatData[0].message);
    alert(chatData[0].message)
});

//收到自定义信令消息的通知
zg.on('IMRecvCustomCommand', (roomID, fromUser, command) => {
    console.log('自定义消息IMRecvCustomCommand', roomID, fromUser, command);
    alert(command)
});
```
</Accordion>

### 检测兼容性

考虑到不同的浏览器对 WebRTC 的兼容性不同，在实现推拉流功能之前，您需要检测浏览器能否正常运行 WebRTC。

您可以调用 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测浏览器的兼容性，检测结果的含义，请参考 [ZegoCapabilityDetection](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCapabilityDetection) 接口下的参数描述。

```js
const result = await zg.checkSystemRequirements();
// 返回的 result 为兼容性检测结果。 webRTC 为 true 时表示支持 webRTC，其他属性含义可以参考接口 API 文档。
console.log(result);
// {
//   webRTC: true,
//   customCapture: true,
//   camera: true,
//   microphone: true,
//   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
//   screenSharing: true,
//   errInfo: {}
// }
```

您还可以通过 ZEGO 提供的 [在线检测工具](https://zegodev.github.io/zego-express-webrtc-sample/webrtcCheck/index.html)，在需要检测的浏览器中打开，直接检测浏览器的兼容性。请参考 [浏览器兼容性和已知问题](/real-time-video-web/introduction/browser-restrictions) 获取 SDK 支持的浏览器兼容版本。

<a id="createroom"></a>

### 登录房间

**1. 生成 Token**

登录房间需要用于验证身份的 Token，开发者可直接在 [ZEGO 控制台](https://console.zego.im/dashboard)获取临时 Token（有效期为 24 小时）来使用，详情请参考 [控制台 - 项目管理](/console/project-info) 中的 “项目信息”。

<Note title="说明">


临时 Token 仅供调试，正式上线前，请从开发者的业务服务器生成 Token，详情可参考 [使用 Token 鉴权](/real-time-video-web/communication/using-token-authentication)。

</Note>



**2. 登录房间**

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，根据实际情况传入参数 “config”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

<Warning title="注意">


- “roomID”、“userID” 和 “userName” 参数的取值都为自定义，其中“userName”非必填。
- “roomID” 和 “userID” 都必须唯一，建议开发者将 “userID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- “userID” 必须与生成 token 时传入的 userID 保持一致，否则登录失败。
- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRoomConfig) 配置，且 “userUpdate” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调。

</Warning>



```javascript
// “roomID”、“userID” 和 “userName” 参数的取值需要根据实际情况填写。
// 登录房间，成功则返回 true。
// userUpdate 设置为 true 才能收到 roomUserUpdate 回调。
let userID = "0001";
let userName = "user0001";
let roomID = "0001";
let token = ;
// 为避免错过任何通知，您需要在登录房间前先监听用户加入/退出房间、房间连接状态变更、推流状态变更等回调。
zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {

})
zg.loginRoom(roomID, token, { userID: userID, userName: userName }, { userUpdate: true }).then(result => {
     if (result == true) {
        console.log("login success")
     }
});
```

您可以监听 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调实时监控自己与房间的连接状态。只有当房间状态是连接成功时，才能进行推流、拉流等操作。如果登录房间失败，可参考 [错误码](https://doc-zh.zego.im/article/4381) 进行操作。

<a id="publishingStream"></a>

### 预览自己的画面，并推送到 ZEGO 音视频云

1. 创建流并预览自己的画面

<Note title="说明">


无论是否调用预览，都可以将自己的音视频流推送到 ZEGO 音视频云。

</Note>




开始推流前需要创建本端的音视频流，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口获取 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream，默认会采集摄像头画面和麦克风声音。

通过 localStream 的 [playVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play-video)、[playAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play-audio) 接口，创建本地媒体流播放组件，播放待推送或者已经成功推流的音视频。

2. 需等待 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口返回 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream 后，再将自己的音视频流推送到 ZEGO 音视频云。

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID” 和创建流得到的流对象 “localStream”，向远端用户发送本端的音视频流。

<Note title="说明">


- “streamID” 由您本地生成，但是需要保证同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。
- 如果您需要与其它平台互通、或使用 [转推 CDN 功能](/real-time-video-web/live-streaming/using-cdn-for-live-streaming)，请将视频编码格式设置为 H.264，详情请参考 [设置视频编码属性](/real-time-video-web/video/set-video-encoding-attributes)。

</Note>




```javascript
// 此处在登录房间成功后，立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证当前房间连接状态是连接成功的即可。

zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(async result => {
     if (result == true) {
        console.log("login success")
        // 创建流、预览
        // 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回 ZegoLocalStream 实例对象才能执行后续操作
        const localStream = await zg.createZegoStream();

        // 预览画面，将播放组件挂载到页面，"local-video" 为组件容器 <div> 元素的 id 。
        localStream.playVideo(document.querySelector("#local-video"));

        // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
        let streamID = new Date().getTime().toString();
        zg.startPublishingStream(streamID, localStream)
     }
});
```

（可选）设置音视频采集参数

<Accordion title="通过属性设置相关采集参数" defaultOpen="false">
可根据需要通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口中的如下属性设置音视频相关采集参数，详情可参考 [自定义视频采集](/real-time-video-web/video/custom-video-capture)：

- [camera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#camera)：摄像头麦克风采集流相关配置

- [screen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#screen)：屏幕捕捉采集流相关配置

- [custom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#custom)：第三方流采集相关配置
</Accordion>



### 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

房间内有其他用户加入时，SDK 会触发 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调，通知房间内有流新增，基于此可获取其他用户的 “streamID”。此时，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口根据传入的其他用户的 “streamID”，拉取远端已推送到 ZEGO 服务器的音视频画面。若需要从 CDN 拉流，可参考 [使用 CDN 直播](/real-time-video-web/live-streaming/using-cdn-for-live-streaming)。

<Warning title="注意">


推荐用 [createRemoteStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-remote-stream-view) 播放媒体流，不建议使用 audio或 video 标签播放媒体流。

</Warning>






```javascript
// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    // 当 updateType 为 ADD 时，代表有音视频流新增，此时可以调用 startPlayingStream 接口拉取播放该音视频流
    if (updateType == 'ADD') {
        // 流新增，开始拉流
        // 这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
        const streamID = streamList[0].streamID;
        // streamList 中有对应流的 streamID
        const remoteStream = await zg.startPlayingStream(streamID);

        // 创建媒体流播放组件对象，用于播放远端媒体流 。
        const remoteView = zg.createRemoteStreamView(remoteStream);
        // 将播放组件挂载到页面，"remote-video" 为组件容器 <div> 元素的 id 。
        remoteView.play("remote-video");

    } else if (updateType == 'DELETE') {
        // 流删除，停止拉流
    }
});
```

<Warning title="注意">


- 部分浏览器因自动播放限制策略问题，使用 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 媒体流播放组件进行播放媒体流可能受阻，SDK 默认会在界面上弹窗提示恢复播放。
- 您可以将 ZegoStreamView.play() 方法的第二个参数 options.enableAutoplayDialog 设置为 false 关闭自动弹窗，通过在 [autoplayFailed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#autoplay-failed) 事件回调中，在页面上显示一个按钮，引导用户点击恢复播放。

</Warning>




至此，您已经成功实现了简单的实时音视频通话，可在浏览器中打开 "index.html"，体验实时音视频功能。

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止音视频通话

**1. 停止推流、销毁流**

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 接口销毁创建的流数据。


```javascript
// 根据本端 streamID 停止推流
zg.stopPublishingStream(streamID)
// localStream 是调用 createZegoStream 接口获取的 ZegoLocalStream 实例对象
zg.destroyStream(localStream)
```

**2. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```javascript
// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增，开始拉流
    } else if (updateType == 'DELETE') {
        // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
        const streamID = streamList[0].streamID;
        zg.stopPlayingStream(streamID)
    }
});
```

**3. 退出房间**

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间。

```javascript
zg.logoutRoom(roomID)
```

**4. 销毁引擎**

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```javascript
zg.destroyEngine()
zg = null
```

以上整个推拉流过程的 API 调用时序可参考下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_web_new1.png" /></Frame>


## 常见问题

**推流后，浏览器调试模式下 console 窗口频繁打印如下警告“Error: Failed to execute put on IDBObjectStore': #\<Object> could not be cloned.”是什么原因？**

ZegoExpressEngine 实例不能被框架以响应式的方式处理，否则将会报错。

## 相关文档
- [错误码文档](https://doc-zh.zego.im/article/4381)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=web)
- [移动端如何使用 ZEGO Express Web SDK？](https://doc-zh.zego.im/faq/web_mobile?product=ExpressVideo&platform=web)
- [如何处理 Web 平台直播过程中出现黑屏或无声？](https://doc-zh.zego.im/faq/web_blank?product=ExpressVideo&platform=web)
- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=web)
