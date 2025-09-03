# 游戏语音

- - -

## 功能简介

### 概念解释

- 范围：收听者接收音频的范围。
- 方位：指收听者在游戏世界坐标中的位置和朝向，详情可参考 `5 设置收听者的当前位置`。
- 收听者：房间内接收音频的用户
- 发声者：房间内发送音频的用户。

### 功能描述

ZEGO Express SDK 从 **2.11.0** 版本起，新增游戏语音模块，主要包括：范围语音、3D 音效、小队语音。

<table>

<tbody><tr>
<th>功能</th>
<th>说明</th>
</tr>
<tr>
<td>
范围语音
</td>
<td>
<p>房间内的收听者对音频的接收距离有范围限制，若发声者与自己的距离超过该范围，则无法听到声音。为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。</p>
<p>假如设置音频接收距离的最大范围为 R，若发声者离收听者的距离为 r，则：</p>
<ul><li>当 r &lt; R 时，表示发声者在正常范围内，收听者可以听到声音。</li><li>当 r ≥ R 时，表示发声者超出了最大范围，收听者无法听到声音。</li></ul>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/RangeAudio/AudioRange.png" /></Frame>
<p>上图仅以范围语音模式为“全世界”时为例，更多不同模式组合关系下的声音可达情况请参考 <a href="https://doc-zh.zego.im/article/16838#5_10">设置通用语音模式</a>。</p>
</td>
</tr>
<tr>
<td>3D 音效</td>
<td>声音有 3D 空间感，且按距离衰减。</td>
</tr>
<tr>
<td>
通用语音模式
</td>
<td>
<p>玩家可以选择加入小队，并支持在房间内自由切换“全世界”、“仅小队”、“隐秘小队”语音模式。</p>
<ul><li>全世界：玩家能与世界范围内其他玩家互相通话，同时能够与队友相互通话。</li><li>仅小队：玩家仅与队友互相通话。</li><li>隐秘小队：玩家可与队友互相通话，能且仅能听到世界范围内其他玩家的语音。</li></ul>
<Note title="说明">
<ul><li>队友之间的通话不受“范围”和 “3D 音效” 的影响，详情请查看 <a href="https://doc-zh.zego.im/article/16838#5_10">设置通用语音模式</a>。</li><li>如果您希望自定义语音收发能力，请参考 <a href="https://doc-zh.zego.im/article/16838#5_10">设置自定义语音模式</a>。</li></ul>
</Note>
</td>
</tr>
</tbody></table>

### 适用场景

游戏语音功能适用于吃鸡类游戏、元宇宙类场景。

在吃鸡类游戏中，小队语音提供编队功能，在游戏开始前和开始后都可以更换小队，开发者无需关注流分组以及推拉流的实现，直接实现小队语音功能。

在吃鸡游戏和元宇宙场景中，提供 3D 音效能力，在收听发声者音效时，有方向感距离感，让场景感受更真实。

## 下载示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/Others/RangeAudio” 目录下的文件。

## 前提条件

在实现范围语音之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

并确保开发环境满足以下要求：

- 准备一台可以连接到互联网的 Windows 或 macOS 计算机。
- 推荐使用 56 或以上版本的 Chrome 浏览器，不同浏览器的兼容性说明请参考 [7 浏览器兼容性](https://doc-zh.zego.im/article/16838#7)。

## 注意事项

<Warning title="注意">
使用范围语音功能时请务必关注如下注意事项，以免影响接入。
</Warning>



如果您已经使用 ZEGO Express SDK 的实时音视频功能，需要注意以下事项：

- 由于范围语音功能模块是基于 ZegoExpressEngine 的推拉流接口功能来实现的，使用时无需关注推拉流的概念。在范围语音场景下，推音频流的概念转变为“开启麦克风”，拉音频流的概念转变为“开启扬声器”。建议您不要在接入范围语音功能的同时再使用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口做推拉流操作，避免效果冲突。
- 范围语音功能模块中推拉流的相关回调（[publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update) 和 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update)）不再生效。
- 范围语音功能模块中调用 ZegoExpressEngine 的 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#on) 接口注册了 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 和 [streamExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#stream-extra-info-update) 事件回调后，您接入范围语音功能时请勿调用 ZegoExpressEngine 的 [off](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#off) 接口把所有事件回调注销了。

## 使用步骤

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RangeVoice_web.png" /></Frame>

上图仅展示了实现游戏语音功能的核心步骤与接口，开发者可以根据业务需要，参考下文文档的详细介绍，实现其他相关接口。

### 1 导入 SDK

1. 执行 `npm i zego-express-engine-webrtc` 命令安装依赖。

<Note title="说明">
npm 下载包支持 typescript 语言（推荐）。
</Note>



2. 在 “index.js” 文件中引入 SDK。

```javascript
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
```

### 2 创建引擎

**1. 创建引擎**

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 `appID`，将接入服务器地址传入参数 `server`。

<Note title="说明">
- “server” 为接入服务器地址，获取的方式请参考
[控制台 - 项目信息](/console/project-info) 。
- 3.6.0 版本及以上 SDK，server 可以改成空字符、null、undefined 或者随意字符，但不能不填。
</Note>

初始化 ZegoExpressEngine 实例 zg 和范围语音功能实例 rangeAudio。

```javascript
const zg = new ZegoExpressEngine(appID, server);
const rangeAudio = zg.createRangeAudioInstance();
```

**2. 监听范围语音事件回调**

如果需要注册回调，开发者可根据实际需要，实现 [ZegoRangeAudioEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRangeAudioEvent) 中的某些方法，通过范围语音实例 rangeAudio 可调用 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#on) 接口设置回调。

```javascript
rangeAudio.on("microphoneStateUpdate", (state, errorCode, extendedData) => {
  if (state === 0) {
    // 关闭麦克风声音
  } else if(state === 1) {
    // 开启麦克风中
  } else if(state === 2) {
    // 打开麦克风发送声音
  }
})
```

### 3 兼容不允许自动播放声音的浏览器

通过 [isAudioContextRunning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#is-audio-context-running) 接口判断浏览器是否支持自动播放声音，如果 `isSupport` 为 `false`，可以引导用户点击界面的 DOM 元素来触发点击事件，并在点击事件中调用 [resumeAudioContext](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#resume-audio-context) 接口来启动自动播放。

```html
<button onclick="enableAutoPlay()">Click me</button>
```

```javascript
const isSupport = rangeAudio.isAudioContextRunning();

async function enableAutoPlay() {
    // result 标识是否启用成功
    const result = await rangeAudio.resumeAudioContext();
}
```

### 4 登录房间

**1. 获取登录 Token**

登录房间需要用于验证身份的 Token，获取方式请参考 [用户权限控制](/real-time-video-web/communication/using-token-authentication)。如需快速调试，可使用控制台生成临时 Token。

**2. 登录房间**

通过 ZegoExpressEngine 实例 zg 调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 `roomID`、`token` 和用户参数 `user`，根据实际情况传入参数 `config`，登录房间。

<Warning title="注意">


- 在登录房间之前，请先注册登录房间后需要监听的所有回调。成功登录房间后，即可接收相关的回调。
- `roomID`、`userID` 和 `userName` 参数的取值都为自定义，`userName`非必填。
- `roomID` 和 `userID` 都必须唯一，建议开发者将 `userID` 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。

</Warning>



```javascript
// 登录房间，成功则返回 true
const result = await zg.loginRoom(roomID, token, {userID, userName});
```

### 5 设置收听者的当前位置

调用 [updateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-self-position) 接口可以添加自身方位，或者在自身方位发生变化时更新自己在世界坐标系中的位置和朝向。

<Note title="说明">


- 在调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker) 打开扬声器之前如果没有调用该接口设置位置信息，则无法接收除小队以外其他人的声音。
- 自身坐标系三个轴的坐标值可以通过第三方 3D 引擎的旋转角度换算矩阵得到。

</Note>



<table>

  <tbody><tr>
    <td>参数名</td>
    <td>描述</td>
  </tr>
  <tr>
    <td>position</td>
    <td>自身在世界坐标系中的坐标，参数是长度为 3 的 number 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisForward</td>
    <td>自身坐标系前轴的单位向量，参数是长度为 3 的 number 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisRight</td>
    <td>自身坐标系右轴的单位向量，参数是长度为 3 的 number 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisUp</td>
    <td>自身坐标系上轴的单位向量，参数是长度为 3 的 number 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
</tbody></table>


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/RangeAudio/Coordinate_System.png" /></Frame>

```javascript
const position = [0,0,0];
const axisForward = [1,0,0];
const axisRight = [0,1,0];
const axisUp = [0,0,1];

rangeAudio.updateSelfPosition(position, axisForward, axisRight, axisUp);
```

### 6 添加或更新发声者位置信息

登录房间成功后调用 [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-audio-source) 接口来更新发声者位置。

<Warning title="注意">


- 全世界模式下：需要更新房间内，收听者和所有发声者的位置。如果未设置发声者位置，或者发声者超出收听者范围，会出现听不到声音的情况。
- 这里发声者指的是房间内其他人，收听者指的是自己。

</Warning>



- userID：为房间内其他发声用户的 ID。
- position：发声者在世界坐标系中的坐标，参数是长度为 3 的 number 数组，三个值依次表示前、右、上的坐标值。

```javascript
const userID = "other";
const position = [1,0,0];
rangeAudio.updateAudioSource(userID, position);
```

### 7（可选）设置音频接收距离

<Accordion title="请根据业务需要，选择是否设置音频接收距离。如果不设置，默认表示可听见房间内所有人的声音。" defaultOpen="false">
调用 [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-audio-receive-range) 接口设置听者接收音频距离的最大范围，即以自身为起点，3D 空间中以设置的距离为立体空间。设置该范围后，在开启 3D 音效的情况下，声音将会随距离的增加而衰减，直至超出所设置的范围，则不再有声音。小队内的语音，不会受到该值的限制，也不会有 3D 音效。

<Note title="说明">
如果不设置则表示接收音频无距离限制，可听见房间内所有人的声音。
</Note>



```javascript
rangeAudio.setAudioReceiveRange(100);
```
</Accordion>


### 8（可选）实现 3D 音效

<Accordion title="请根据业务需要，选择是否开启 3D 音效。" defaultOpen="false">
调用 [enableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-spatializer) 接口设置 3D 音效，`enable` 取值为 `true` 时表示开启 3D 音效，此时房间内非小队成员的音频，会随着发声者离自身的距离和方向的变化而产生空间感的变化，为 `false` 时表示关闭 3D 音效。（可随时开启或关闭）

<Warning title="注意">
该功能只对小队以外的人生效。
</Warning>



```javascript
// enable 为 true 表示开启，为 false 表示关闭。默认是关闭。
rangeAudio.enableSpatializer(true);
```
</Accordion>


### 9 开启麦克风、扬声器

登录房间成功后：

- 调用 [enableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-microphone) 接口设置是否开启麦克风，当 `enable` 取值为 `true` 时表示开启，取值为 `false` 时表示关闭。（可随时开启或关闭）

    开发者可以通过监听 [microphoneStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRangeAudioEvent#microphone-state-update) 事件回调，获取麦克风更新后的状态。

- 调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker) 接口设置是否开启扬声器，`enable` 取值为 `true` 时表示开始拉取和播放音频流，为 “false” 时表示停止拉取和播放音频流。（可随时开启或关闭）

<Warning title="注意">


调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker) 接口后，当超过最大拉流数限制（目前为 20 路）时，会优先拉取小队内成员音频流（需设置小队模式），再拉取世界内距离自身范围最近的音频流。

</Warning>




```javascript
rangeAudio.on("microphoneStateUpdate", (state, errorCode, extendedData) => {
  if (state === 0) {
    // 关闭麦克风声音
  } else if(state === 1) {
    // 开启麦克风中
  } else if(state === 2) {
    // 已打开麦克风发送声音
  }
})
// 开启麦克风，enable 为 true 表示开启，为 false 表示关闭。
rangeAudio.enableMicrophone(enable);

// 开启扬声器，enable 为 true 表示开启，为 false 表示关闭。
rangeAudio.enableSpeaker(enable);
```

### 10（可选）加入小队、设置语音模式

<Accordion title="请根据业务需要，选择是否实现游戏小队、小队语音等功能。" defaultOpen="false">
#### 加入小队

调用 [setTeamID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-team-id) 接口可根据需要设置想要加入的小队 ID（可随时变更 ID），设置 ID 后即可直接加入。加入小队后，与同一小队内队员之间的交流不受范围语音和 3D 音效的限制。

<p id="setRangeAudioMode"></p>

```javascript
// 参数 teamID 传入字符串表示加入对应 teamID 的小队。
rangeAudio.setTeamID("teamID");
// 参数 teamID 不传或者传 undefined 表示退出小队。
rangeAudio.setTeamID();
```

#### 设置通用语音模式

调用 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode) 接口设置范围语音模式，`mode` 参数取值为 `0` 时表示可以听到所有人的声音，取值为 `1` 时表示只能听到同一小队内其他成员的声音。

<table>

<tbody><tr>
<th>语音模式</th>
<th>参数取值</th>
<th>功能描述</th>
</tr>
<tr>
<td>全世界</td>
<td>0</td>
<td>设置该模式后，此用户能与小队成员互相通话，且能与范围内其他全世界模式的人互相通话。</td>
</tr>
<tr>
<td>仅小队</td>
<td>1</td>
<td>设置该模式后，此用户仅能与小队成员互相通话。</td>
</tr>
</tbody></table>

```javascript
// 参数 mode 可传 0 或 1。
// 0 为世界模式，可与登录房间内的所有人交流。
// 1 为仅小队模式，只与小队内的队员交流。
rangeAudio.setRangeAudioMode(1);
```

不同范围语音模式下，发声者声音的可接收情况有所不同。

- 假设 A 用户的模式为 “全世界”，则 B 用户在不同范围语音模式下的声音可接收情况如下：

<table>

<tbody><tr>
<th>是否在同一小队</th>
<th>是否在最大范围内</th>
<th>范围语音模式</th>
<th>A 能否听到 B 的声音</th>
<th>B 能否听到 A 的声音</th>
</tr>
<tr>
<td rowspan="4">同一小队</td>
<td rowspan="2">是</td>
<td>全世界（World）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td rowspan="2">否</td>
<td>全世界（World）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td rowspan="4">不同小队</td>
<td rowspan="2">是</td>
<td>全世界（World）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>否</td>
<td>否</td>
</tr>
<tr>
<td rowspan="2">否</td>
<td>全世界（World）</td>
<td>否</td>
<td>否</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>否</td>
<td>否</td>
</tr>
</tbody></table>

- 假设 A 用户的模式为 “仅小队”，则 B 用户在不同范围语音模式下的声音可接收情况如下：

<table>

<tbody><tr>
<th>是否在同一小队</th>
<th>是否在最大范围内</th>
<th>范围语音模式</th>
<th>A 能否听到 B 的声音</th>
<th>B 能否听到 A 的声音</th>
</tr>
<tr>
<td rowspan="4">同一小队</td>
<td rowspan="2">是</td>
<td>全世界（World）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td rowspan="2">否</td>
<td>全世界（World）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>是</td>
<td>是</td>
</tr>
<tr>
<td rowspan="4">不同小队</td>
<td rowspan="2">是</td>
<td>全世界（World）</td>
<td>否</td>
<td>否</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>否</td>
<td>否</td>
</tr>
<tr>
<td rowspan="2">否</td>
<td>全世界（World）</td>
<td>否</td>
<td>否</td>
</tr>
<tr>
<td>仅小队（Team）</td>
<td>否</td>
<td>否</td>
</tr>
</tbody></table>

#### 设置自定义语音模式

<Warning title="注意">


- 自定义语音模式和通用语音模式不可以同时使用。
- 如需使用自定义语音模式，请保证游戏语音内的所有用户的线上 SDK 版本为 2.24.0 及以上版本。

</Warning>



通过自定义语音模式，您可以自由控制音频的收发逻辑，以完成各种音频互动，示例如下：
    假设 A、B、C 为同一小队成员，且 C 在 A 的接收范围内，可通过表格中的配置完成预期的音频体验。


<table>

<tbody><tr>
<th>用户</th>
<th>发声预期</th>
<th>收听预期</th>
<th>发声模式配置</th>
<th>收听模式配置</th>
<th>备注</th>
</tr>
<tr>
<td>&nbsp;A</td>
<td>向小队成员和范围内其他用户发送音频</td>
<td>收听小队成员和范围内其他用户的音频</td>
<td>所有人</td>
<td>所有人</td>
<td>A 能同时与 B、C 交流</td>
</tr>
<tr>
<td>B</td>
<td>仅向小队成员发送音频</td>
<td>仅收听小队成员的音频</td>
<td>小队</td>
<td>小队</td>
<td>B 仅能与 A 交流</td>
</tr>
<tr>
<td>C</td>
<td>仅向范围内的用户发送音频</td>
<td>仅收听范围内用户的音频</td>
<td>世界</td>
<td>世界</td>
<td>C 仅能与 A 交流</td>
</tr>
</tbody></table>

<table>

<tbody><tr>
<th colspan="2">语音模式</th>
<th>参数取值</th>
<th>功能描述</th>
</tr>
<tr>
<td rowspan="3">发声模式</td>
<td>所有人模式</td>
<td>0</td>
<td>发声到所有人模式，房间内的所有人都能听到发声者的声音。</td>
</tr>
<tr>
<td>世界模式</td>
<td>1</td>
<td>发声到世界模式，只有处于范围内的人才能听到发声者的声音。</td>
</tr>
<tr>
<td>小队模式</td>
<td>2</td>
<td>发声到所属小队模式，只有小队内的成员才能听到发声者的声音（不受范围限制）。</td>
</tr>
<tr>
<td rowspan="3">收听模式</td>
<td>所有人模式</td>
<td>0</td>
<td>收听所有人模式，可以收听到房间内所有人的声音。</td>
</tr>
<tr>
<td>世界模式</td>
<td>1</td>
<td>只收听世界的人模式，只收听处于范围内的人员的声音。</td>
</tr>
<tr>
<td>小队模式</td>
<td>2</td>
<td>只收听所属小队模式，只收听所属小队内的成员的声音（不受范围限制）。</td>
</tr>
</tbody></table>

```ts
zg.setRangeAudioCustomMode(0, 0);
```
</Accordion>


### 11 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间，退出后将自动关闭麦克风和扬声器（即无法发送自己的音频，也无法收听别人的声音），并清空发声者信息列表。

```javascript
zg.logoutRoom(roomID)
```


## 常见问题

1. **收听范围内的流最多支持同时拉多少路？**

范围语音最多支持同时拉 20 路流。

为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。如果超过 20 人且距离一样，则按照调用 [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-audio-source) 接口时，每个 `userID` 首次传入的先后顺序而定。

2. **范围语音的“范围”指的是收听范围还是发声范围？**

范围语音的“范围”指的是收听范围。

3. **小队语音中的成员连麦有 3D 音效吗？**

小队中的语音是普通连麦的效果，暂无 3D 音效。

4. **若本身就在调用推流接口，此时需要使用范围语音会存在冲突吗？**

范围语音当前使用主路发送音频，如果客户已经使用主路，则会存在冲突。

## 浏览器兼容性

- 范围语音的浏览器兼容性请参考 [ZEGO Express Web SDK 支持哪些浏览器](https://doc-zh.zego.im/faq/browser_support) 。
- 3D 音效的浏览器兼容性如下：
<table>

  <tbody><tr>
    <th>浏览器</th>
    <th>兼容性</th>
  </tr>
  <tr>
    <td>Chrome</td>
    <td>14 及以上</td>
  </tr>
  <tr>
    <td>Edge</td>
    <td>79 及以上</td>
  </tr>
  <tr>
    <td>Firefox</td>
    <td>53 及以上</td>
  </tr>
  <tr>
    <td>Opera</td>
    <td>15 及以上</td>
  </tr>
  <tr>
    <td>IE</td>
    <td>不支持</td>
  </tr>
  <tr>
    <td>Safari</td>
    <td>14.1 及以上</td>
  </tr>
  <tr>
    <td>WebView Android</td>
    <td>55 及以上</td>
  </tr>
  <tr>
    <td>Firefox for Android</td>
    <td>53 及以上</td>
  </tr>
  <tr>
    <td>Opera Android</td>
    <td>42 及以上</td>
  </tr>
  <tr>
    <td>Safari on iOS</td>
    <td>14.5 及以上</td>
  </tr>
  <tr>
    <td>Samsung Internet</td>
    <td>6.0 及以上</td>
  </tr>
</tbody></table>

<Content />

