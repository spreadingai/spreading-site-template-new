# 网络测速

- - -

## 功能简介

ZEGO 提供网络测速功能，可在用户进行推/拉流前，检测上行和下行网络速度，判断当前网络环境下适合推/拉多大码率的音视频流。

当上行测速结果为网络质量差时，建议用户更换更好的网络或者通过降低分辨率或帧率等方法来降低推流码率，以保证正常推流。

开发者业务中出现以下情况时，ZEGO 推荐使用 SDK 的网络测速功能：

- 通话场景下，需要进行网络质量评估。
- 教育场景下，需要进行课前网络检测。
- 直播场景下，需要进行网络连接速度测试。


网络测速基本原理如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Network_speed_test_web.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/Others/NetworkDetection” 目录下的文件。

## 前提条件

在实现网络测速功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 实现操作

1. 创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 实例对象 zg。
2. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录用于测试网络的房间。
3. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，在 `quality` 参数中设置期望网络满足的视频质量参数和码率，创建摄像头相关的 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象。
4. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口进行推流，通过监听 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update) 事件获取上行网络质量 `stats.video.videoQuality`。
5. 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口进行拉流，通过监听 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) 事件获取下行网络质量 `stats.video.videoQuality`。
6. 整个网络测速过程可持续 15 秒左右（至少 7 秒），最后按照网络质量的回调次数（从推拉流开始后的第 6 秒开始回调，每 3 秒回调一次）取平均网络质量，从而大致判断出上下行网络情况。测试结束后可自行选择是否退出房间和销毁媒体流。

### 示例代码

```js
/**
 * Use ZegoExpressEngine to detect network quality.
 * @param {ZegoExpressEngine} zg -- ZegoExpressEngine 实例
 * @param {number} seconds -- 检测时长，至少 8 秒
 * @returns Promise 异步返回检测结果
 */
function detectNetworkQuality(zg, seconds = 10) {
  return new Promise(async (resolve, reject) => {
    if (!zg) {
      reject()
      return
    }

    let isLogin = false;
    let localStream = null
    let testStreamID = "for_testing_" + Date.now()
    let uplinkList = []
    let downlinkList = []

    function onDetectionEnd(error) {
      // 检测结束注销事件、销毁流、登出房间
      zg.off("publishQualityUpdate", eventHandler.publishQualityUpdate)
      zg.off("playQualityUpdate", eventHandler.playQualityUpdate)
      zg.off("publisherStateUpdate", eventHandler.publisherStateUpdate)
      zg.off("playerStateUpdate", eventHandler.playerStateUpdate)
      if (localStream) {
        zg.destroyStream(localStream)
        localStream = null
      }
      zg.logoutRoom()
      isLogin = false
      if (error) {
        reject(error)
      }
      // 计算上下行网络平均值
      const downlink = downlinkList.length ? (downlinkList.reduce((result, item) => (result + item), 0) / downlinkList.length) : -1
      const uplink = uplinkList.length ? (uplinkList.reduce((result, item) => (result + item), 0) / uplinkList.length) : -1
      resolve({
        downlink: Math.round(downlink),
        uplink: Math.round(uplink)
      })
    }
    const eventHandler = {
      playQualityUpdate: (streamID, stats) => {
        // 通过监听 playQualityUpdate 事件获取下行网络质量 stats.video.videoQuality
        const quality = stats.video.videoQuality
        if (quality > -1) {
          downlinkList.push(quality)
        }
      },
      publishQualityUpdate: (streamID, stats) => {
        // 通过监听 publishQualityUpdate 事件获取上行网络质量 stats.video.videoQuality
        const quality = stats.video.videoQuality
        if (quality > -1) {
          uplinkList.push(quality)
        }
      },
      publisherStateUpdate: ({ streamID, state }) => {
        if (streamID === testStreamID && state === "PUBLISHING") {
          // 调用 startPlayingStream 进行拉流
          zg.startPlayingStream(streamID)
        }
      },
      playerStateUpdate: async ({ streamID, state }) => {
        if (streamID === testStreamID && state === "PLAYING") {
          setTimeout(() => {
            onDetectionEnd()
          }, seconds * 1e3)
        }
      }
    }

    zg.on("publishQualityUpdate", eventHandler.publishQualityUpdate)
    zg.on("playQualityUpdate", eventHandler.playQualityUpdate)
    zg.on("publisherStateUpdate", eventHandler.publisherStateUpdate)
    zg.on("playerStateUpdate", eventHandler.playerStateUpdate)

    // 调用 loginRoom 接口登录用于测试网络的房间。
    isLogin = await zg.loginRoom(roomID, token, {
      userID
    }).catch(error => {
      let errMsg = error.msg
      if (error.code === 1102016) {
        errMsg = "Token error"
      }
      onDetectionEnd(errMsg)
      throw error
    })
    if (!isLogin) {
      onDetectionEnd(errMsg)
    }
    // 调用 createZegoStream 接口创建摄像头相关的媒体流对象，在 createZegoStream 接口参数中设置期望网络满足的视频质量参数和码率
    localStream = await zg.createZegoStream({
      camera: {
        video: {
          quality: 3
        }
      }
    }).catch(error => {
      onDetectionEnd(errMsg)
      throw error
    })
    // 调用 startPublishingStream 进行推流
    zg.startPublishingStream(testStreamID, localStream)
  })
}

// 创建 ZegoExpressEngine 实例对象 zg
const zg = new ZegoExpressEngine(appID, server)
// 开始检测网络质量
detectNetworkQuality(zg, 15).then(({ uplink, downlink }) => {
  // 获取到上下行网络质量 uplink 和 downlink，通过 UI 展示检测结果
}).catch(err => {
  // 检测过程出错，可能是登录失败或创建流失败，通过 UI 提示检测失败
})
```

### 结果分析

通过如上步骤，获取到上行平均网络质量和下行平均网络质量。网络质量 [videoQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-quality) 的枚举值含义如下：

<table>

<tbody><tr>
<td>数值</td>
<td>含义</td>
</tr>
<tr>
<td>-1</td>
<td>网络状况未知，表示当前 zg 实例还没有建立上行/下行连接。</td>
</tr>
<tr>
<td>0</td>
<td>网络状况极佳。</td>
</tr>
<tr>
<td>1</td>
<td>网络状况较好。</td>
</tr>
<tr>
<td>2</td>
<td>网络状况一般。</td>
</tr>
<tr>
<td>3</td>
<td>网络状况较差。</td>
</tr>
<tr>
<td>4</td>
<td>网络状况极差。</td>
</tr>
</tbody></table>

<Content />

