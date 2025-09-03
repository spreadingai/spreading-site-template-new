# 常用视频配置

- - -

## 功能简介

当视频通话或直播时，开发者可以根据需要设置视频属性，调整视频画面的清晰度、流畅度，从而获得较好的用户体验。

- 分辨率：
    - 视频分辨率：用于度量图像内数据量多少的一个参数，通常表示成 ppi。
    - 采集分辨率：指摄像头等采集设备提供的画面分辨率。
    - 编码分辨率：指经过编码处理的画面的分辨率。
- 码率：指每秒传输的比特（bit）数，单位为 bps（bit per second）。
- 帧率：单位时间内视频显示帧数的量度单位，单位为 fps（Frame Per Second）。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/CommonFeatures/CommonVideoConfig” 目录下的文件。

## 开发注意事项

- 不同的设备和浏览器，对分辨率的支持可能不同。如果某些设备的摄像头只能以特定的分辨率采集，在这种情况下，浏览器会自动调整分辨率；但同时也可能因无法采集画面而出现黑屏。为了尽可能多地兼容不同的设备和浏览器，建议开发者在自定义视频属性时，将分辨率的宽高设为 8 的倍数。如果仍不能解决黑屏问题，请查看摄像头权限设置、或更换摄像头设备。
- 视频能否达到 1080p 以上的分辨率，取决于设备的性能。在性能配备较低的设备上可能无法达到此分辨率要求。如果采用 720p 分辨率而设备性能跟不上，则有可能出现帧率过低的情况。

## 前提条件

在设置视频属性之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 设置视频属性配置

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 流实例对象，不同的视频数据采集方式使用不同的参数设置视频属性配置。若不进行特殊设置，则 SDK 会根据选定的场景，自动应用适合该场景的分辨率、码率、帧率，以获取最佳体验效果，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16788)。

<Note title="说明">


- 每次创建流时只能取 “camera”、“screen”、“custom” 中的一种。如果需要创建多种流，可以分多次调用 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口。
- 虽然 API 支持设置分辨率，但是很多设备对于自定义的分辨率并不支持，推荐使用预设值。

</Note>




- **camera**

  当通过摄像头采集源数据时，使用 “camera” 对象中的 “quality” 参数设置视频质量。该参数的组合值如下表，其中 1、2、3 为预设值，若取值为 4，则表示开发者可以自定义分辨率、帧率和码率。相关设置，请参考本文 [如何选择视频的分辨率/帧率/码率](#如何选择视频的分辨率帧率码率)。

<Warning title="注意">


  为了尽可能多地兼容设备和浏览器对视频画面采集，建议在自定义设置视频参数时将分辨率的宽高设为 8 的倍数。

</Warning>



  | 取值 | 分辨率         | 帧率（fps） | 码率（kbps） |
  | ---- | -------------- | ----------- | ------------ |
  | 1    | 320 × 240      | 15          | 300          |
  | 2    | 640 × 480      | 15          | 800          |
  | 3    | 1280 × 720     | 20          | 1500         |
  | 4    | width × height | frameRate   | bitrate      |

  ```js
  // 按推荐参数
  let option = {
      audioBitrate: 48
  }

  // 自定义设置
  option = {
      videoBitrate: 300,
      audioBitrate: 48,
      camera: {
          audio: true,
          video : {
              quality: 4,
              width: 480,
              height: 480,
              frameRate: 15
          }
      }
  }

  zg.createZegoStream(option)
  ```

- **screen**

  当通过屏幕采集源数据时，使用 “screen” 对象中的 “quality” 参数设置屏幕共享视频质量。该参数的组合值如下表，其中 1、2、3 为预设值，若取值为 4，则表示开发者可以自定义帧率和码率。屏幕共享的分辨率通过 width 和 height 设置，但不会改变实际采集的画面比例。

| 取值 | 帧率（fps） | 码率（kbps） | 适用场景                                 |
| ---- | ----------- | ------------ | ---------------------------------------- |
| 1    | 20          | 800          | 适合对流畅度要求较高的场景。             |
| 2    | 15          | 1500         | 适合在流畅度和清晰度之间取得平衡的场景。 |
| 3    | 5           | 2000         | 适合对清晰度要求较高的场景。             |
| 4    | frameRate   | bitrate      | 自定义。                                 |

  ```javascript
  // 传入布尔值
  let option = {
      screen: {
          video: true
      },

      // equal to
      screen: {
          audio: false,
          video: {
              frameRate: 15,
              bitRate: 1500
         }
      }
  }

  // 传入对象
  option = {
      videoBitrate: 1500,
      screen: {
          audio: false,
          video: {
              quality: 4,
              frameRate: 15,
              width: 1280,
              height: 720
          }
      }
  }
  zg.createZegoStream(option)
  ```

- **custom**

  当使用第三方源数据时，通过 “custom” 对象中的 “bitrate” 参数设置视频码率，范围为 0 ～ 10240，默认值为 “800”。

  ```javascript
  const el = document.querySelector("video")

  let option = {
      videoBitrate: 800,
      custom: {
          video: {
              source: el // source 可以是 <video> 或<audio> 媒体对象或 MediaStream
          },
          audio: {
              source: el // source 可以是 <video> 或<audio> 媒体对象或 MediaStream
          }
      }
  }

  zg.createZegoStream(option)
  ```

### 修改推流的视频属性配置

开发者可以调用接口 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)，设置推流视频的质量参数。

```js
setVideoConfig(localStream, {
    width: 320,
    height: 240,
    frameRate: 15,
    maxBitrate: 300
})
```

<Note title="说明">


- [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口支持动态修改推流视频的质量参数。
- [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口不支持修改采集的第三方视频的属性配置。
- [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口仅支持 Chrome 63 或以上版本、Safari 11 或以上版本的浏览器。
- 调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口修改分辨率时，可以修改为低于当前分辨率的取值；如果需要修改为高于当前分辨率时，最高只能调整到摄像头采集的最佳分辨率（不是最大分辨率）。
- 调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口修改帧率和分辨率时，已知问题如下：
    - Safari 13 及以下版本对帧率的设置不生效。
    - Safari 11 及以下版本只支持特定分辨率。
    - iOS Safari 无法在 H.264 编码下使用较低的分辨率。
    - Firefox 只支持视频帧率为 30 fps。

</Note>



## 如何选择视频的分辨率/帧率/码率

在 [使用步骤](#使用步骤) 已经讲解了如何通过 SDK 接口设置分辨率、帧率、码率等参数。通常视频参数的选择要根据实际情况来确定，开发者在开发自己的音视频应用时，如果还不清楚该使用什么样的分辨率、帧率、码率最为合适，请参考以下推荐使用值。

### 分辨率/帧率/码率

#### 分辨率

分辨率参数中的宽和高，分别表示的是水平像素数和垂直像素数。单位长度中像素数越高，画面越细腻。

在选择分辨率时，开发者可以根据视频窗口大小（即 `<video>` 标签的宽高尺寸）来选择视频分辨率。如果视频窗口较小，推荐选择低分辨率；视频窗口较大则选择高分辨率。

SDK 中预设值三种视频质量参数中分辨率，开发者可以根据自己的产品对分辨率和画面比例需求来参照下面的常用分辨率推荐表进行自定义设置。

<Note title="说明">


以下是 PC 端宽屏的分辨率，移动端和 PC 端对视频宽高的理解不一样，两者恰好相反，同样的分辨率在 pc 端是横屏，在移动端就是竖屏。

</Note>




| 清晰度/比例 | 16:9        | 4:3         | 1:1         | SDK 预设值 |
| ----------- | ----------- | ----------- | ----------- | ---------- |
| 极低        | 160 × 90    | 160 × 120   | 120 × 120   | -          |
| 低          | 320 × 180   | 320 × 240   | 240 × 240   | 320 × 240  |
| 标准        | 640 × 360   | 640 × 480   | 480 × 480   | 640 × 480  |
| 720p       | 1280 × 720  | 960 × 720    | 720 × 720   | 1280 × 720 |
| 1080p       | 1920 × 1080 | 1440 × 1080 | 1080 × 1080 | -          |

#### 帧率

帧率，表示每秒钟编码多少帧画面，帧率越高，画面越流畅。SDK 预设推荐值有 5、15、20 等值，开发者可以按需设置。

#### 码率

码率，指视频文件在单位时间内使用的数据流量。码率参数的设置，主要用于控制带宽压力及编解码的资源消耗。

### 分辨率/帧率/码率的关系

码率大小约等于帧率乘以一帧画面的数据量大小。所以帧率和分辨率越高，传输的码率也就越高。

当由于网络较差、设备和浏览器限制、设置的目标码率参数较低等原因导致实际传输码率低时，实时的帧率和分辨率都会有些波动，但会优先保持帧率而降分辨率。

所以如果开发者对画面流畅度没有较高的要求，推荐通过设置低帧率，保持画面清晰度。

<Warning title="注意">


这里存在一个常见的误区，误以为码率越高越好。实际应用中，较高的码率需要较高的分辨率和帧率来匹配，例如，对于分辨率为 320 × 240，码率为 1000 kbps，过高的码率会占用网络带宽和视频解码资源，造成浪费。

</Warning>




## 相关文档

[如何选择视频分辨率、帧率、码率？](https://doc-zh.zego.im/faq/video_info)

<Content />

