# 游戏语音

- - -

## 功能简介

### 概念解释

- 范围：收听者接收音频的范围。
- 方位：指收听者在游戏世界坐标中的位置和朝向，详情可参考 `设置收听者的当前位置`。
- 收听者：房间内接收音频的用户
- 发声者：房间内发送音频的用户。

### 功能描述

ZEGO Express SDK 从 **2.11.0** 版本起，新增游戏语音模块，主要包括：范围语音、3D 音效、小队语音。

<Warning title="注意">
本功能不支持在 WebGL 环境中运行使用。
</Warning>

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
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/RangeAudio/AudioRange.png" /></Frame><p>上图仅以范围语音模式为“全世界”时为例，更多不同模式组合关系下的声音可达情况请参考 <a href="https://doc-zh.zego.im/article/15167#setRangeAudioMode">设置语音模式</a>。</p>
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
队友之间的通话不受“范围”和 “3D 音效” 的影响，详情请查看 <a href="https://doc-zh.zego.im/article/15167#setRangeAudioMode">设置语音模式</a>。
</Note>

</td>
</tr>
</tbody></table>

### 适用场景

游戏语音功能适用于吃鸡类游戏、元宇宙类场景。

在吃鸡类游戏中，小队语音提供编队功能，在游戏开始前和开始后都可以更换小队，开发者无需关注流分组以及推拉流的实现，直接实现小队语音功能。

在吃鸡游戏和元宇宙场景中，提供 3D 音效能力，在收听发声者音效时，有方向感距离感，让场景感受更真实。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13241) 获取源码。

相关源码请查看 “Assets/ZegoExpressExample/Examples/AdvancedAudioProcessing/RangeAudio.cs” 文件。

## 前提条件

在实现范围语音之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13242) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243)。


## 注意事项

<Warning title="注意">
使用范围语音功能时请务必关注如下注意事项，以免影响接入。
</Warning>



如果您已经使用 ZEGO Express SDK 的实时音视频功能，需要注意以下事项：

- 由于范围语音功能模块是基于 ZegoExpressEngine 的推拉流接口功能来实现的，使用时无需关注推拉流的概念。在范围语音场景下，推音频流的概念转变为“开启麦克风”，拉音频流的概念转变为“开启扬声器”。建议您不要在接入范围语音功能的同时再使用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream)、[StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口做推拉流操作，避免效果冲突。
- 范围语音功能模块中推拉流的相关回调（[OnPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-state-update) 、[OnPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-state-update)、[OnPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-quality-update) 和 [OnPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-quality-update)）不再生效。


## 使用步骤

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RangeVoice_u3d.png" /></Frame>

上图仅展示了实现游戏语音功能的核心步骤与接口，开发者可以根据业务需要，参考下文文档的详细介绍，实现其他相关接口。

### 1 创建引擎

调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 传入参数 appID，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。

```csharp
ZegoEngineProfile profile = new ZegoEngineProfile();
// AppID 由 ZEGO 分配给各 App
profile.appID = appID;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;
// 创建引擎实例
ZegoExpressEngine engine = ZegoExpressEngine.createEngine(profile);
if (engine == null) {
    //创建引擎失败
    return;
}
```

### 2 创建范围语音模块

调用的 [CreateRangeAudio ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-range-audio) 方法创建范围语音实例。

```csharp
ZegoRangeAudio rangeAudio = engine.CreateRangeAudio();
if (rangeAudio == null) {
    // 创建范围语音实例模块失败
}
```

### 3 监听范围语音事件回调

可以根据需要设置麦克风事件回调委托，用于监听麦克风的开启状态 [OnRangeAudioMicrophoneStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoRangeAudioHandler#on-range-audio-microphone-state-update) 通知。

```csharp
// 播放器播放某音效的状态变更回调
void OnRangeAudioMicrophoneStateUpdate(ZegoRangeAudio rangeAudio, ZegoRangeAudioMicrophoneState state, int errorCode){
    if(TurningOn == state)
    {
        //麦克风打开中
    }
    else if(Off == state)
    {
        //麦克风关闭
    }
    else if(On == state)
    {
        //麦克风已成功打开
    }
}

rangeAudio.onRangeAudioMicrophoneStateUpdate = OnRangeAudioMicrophoneStateUpdate;
```

### 4 登录房间

传入用户 ID 参数 userID 和 userName 创建 ZegoUser 用户对象后，调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 roomID 和用户参数 user，登录房间。

<Warning title="注意">
- 同一个 AppID 内，需保证 roomID 全局唯一。
- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录房间失败。
</Warning>



```csharp
ZegoUser user = new ZegoUser();
user.userID = "test";
user.userName = "testName";

ZegoRoomConfig roomConfig = new ZegoRoomConfig();
engine.LoginRoom("123",user,roomConfig);
```

<Note title="说明">
当用户已成功登录房间后，如果应用异常退出，在重启应用后，开发者需先调用 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 接口退出房间，再调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口重新登录房间。
</Note>



### 5 设置收听者的当前位置

开发者可以通过调用 [UpdateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#update-self-position) 接口，设置听者自身的所在位置和方位，或者在自身方位发生变化时更新自己在世界坐标系中的位置和朝向。

<Note title="说明">
- 在调用 [EnableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-speaker) 打开扬声器之前如果没有调用该接口设置位置信息，则无法接收除小队以外其他人的声音。
- 自身坐标系三个轴的坐标值可以通过第三方 3D 引擎的旋转角度换算矩阵得到。
</Note>



<table>

  <tbody><tr>
    <td>参数名</td>
    <td>描述</td>
  </tr>
  <tr>
    <td>position</td>
    <td>自身在世界坐标系中的坐标，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisForward</td>
    <td>自身坐标系前轴的单位向量，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisRight</td>
    <td>自身坐标系右轴的单位向量，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
  <tr>
    <td>axisUp</td>
    <td>自身坐标系上轴的单位向量，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。</td>
  </tr>
</tbody></table>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/RangeAudio/Coordinate_System.png" /></Frame>

```csharp
// 自身在世界坐标系中的坐标，顺序是前、右、上。
float position[] = new float[3]{100.0f, 100.0f, 100.0f};
// 自身坐标系前朝向的单位向量。
float axisForward[] = new float[3]{1.0f,0.0f,0.0f};
// 自身坐标系右朝向的单位向量。
float axisRight[] = new float[3]{0.0f,1.0f,0.0f};
// 自身坐标系上朝向的单位向量。
float axisUp[] = new float[3]{0.0f,0.0f,1.0f};

rangeAudio.UpdateSelfPosition(position, axisForward, axisRight, axisUp);
```

### 6 添加或更新发声者位置信息

登录房间成功后，可以通过调用 [UpdateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#update-audio-source) 接口，添加或更新发声者的位置信息。

<Warning title="注意">

- 全世界模式下：需要更新房间内，收听者和所有发声者的位置。隐秘小队模式下：需要更新房间内，所有在音频接收范围内，且为全世界模式的发声者的位置。如果未设置发声者位置，或者发声者超出收听者范围，会出现听不到声音的情况。
- 这里发声者指的是房间内其他人，收听者指的是自己。
</Warning>

- userID：为房间内其他发声用户的 ID。
- position：发声者在世界坐标系中的坐标，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。

```csharp
// 用户在世界坐标系中的坐标，顺序是前、右、上。
float position[] = new float[3]{100.0, 100.0, 100.0};
// 添加/更新用户位置
rangeAudio.UpdateAudioSource("abc",position);
```

### 7（可选）设置音频接收距离

<Accordion title="请根据业务需要，选择是否设置音频接收距离。如果不设置，默认表示仅能接收本小队的成员声音。" defaultOpen="false">
调用 [SetAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-audio-receive-range) 接口设置听者接收音频距离的最大范围，即以自身为起点，3D 空间中以设置的距离为立体空间。设置该范围后，在开启 3D 音效的情况下，声音将会随距离的增加而衰减，直至超出所设置的范围，则不再有声音。

```csharp
// 设置音频接收距离的最大范围，超过该范围的音源声音会听不见
rangeAudio.SetAudioReceiveRange(1000);
```

同时您也可以通过 [SetAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-audio-receive-range-1) 接口进一步控制衰减范围。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

```cs
// 设置 3D 音效的衰减范围区间 [min, max]
ZegoReceiveRangeParam param = new ZegoReceiveRangeParam();
param.min = reciveRangeMin;
param.max = reciveRangeMax;
rangeAudio.SetAudioReceiveRange(param);
```

<Note title="说明">
如果不设置音频接收距离，则表示只能接收本小队内的成员声音，无法接收小队外的所有声音。设置后，小队内的语音，不会受到音频接收距离的限制，也不会有 3D 音效。
</Note>
</Accordion>


### 8（可选）实现 3D 音效

<Accordion title="请根据业务需要，选择是否开启 3D 音效。" defaultOpen="false">
调用 [EnableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-spatializer) 接口设置 3D 音效，enable 取值为 true 时表示开启 3D 音效，此时房间内非小队成员的音频，会随着发声者离自身的距离和方向的变化而产生空间感的变化，为 false 时表示关闭 3D 音效。（可随时开启或关闭）

<Warning title="注意">
该功能只对小队以外的人生效。
</Warning>


```csharp
rangeAudio.EnableSpatializer(true);
```
</Accordion>

### 9 开启麦克风、扬声器

登录房间成功后：

- 调用 [EnableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-microphone) 接口设置是否开启麦克风，当 enable 取值为 true 时表示开启，此时 SDK 将会自动使用主通道推音频流，为 false 时表示关闭。（可随时开启或关闭）

    开发者可以通过监听 [OnRangeAudioMicrophoneStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoRangeAudioHandler#on-range-audio-microphone-state-update) 事件回调，获取麦克风更新后的状态。

- 调用 [EnableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-speaker) 接口设置是否开启扬声器，enable 取值为 true 时表示开启，此时将会自动拉取房间内的音频流，为 false 时表示关闭。（可随时开启或关闭）

<Warning title="注意">
调用 [EnableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-speaker) 接口后，当超过最大拉流数限制（目前为 20 路）时，会优先拉取小队内成员音频流（需设置小队模式），再拉取世界内距离自身范围最近的音频流。

</Warning>



```csharp
// 开启麦克风
rangeAudio.EnableMicrophone(true);
// 开启扬声器
rangeAudio.EnableSpeaker(true);
```

### 10（可选）加入小队、设置语音模式

<Accordion title="请根据业务需要，选择是否实现游戏小队、小队语音等功能。" defaultOpen="false">
#### 设置队伍 ID

调用 [SetTeamID](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-team-id) 接口可根据需要设置想要加入的小队 ID（可随时变更 ID），设置 ID 后即可直接加入。加入小队后，与同一小队内队员之间的交流不受范围语音和 3D 音效的限制。

<p id="setRangeAudioMode"></p>

```csharp
rangeAudio.SetTeamID("123");
```

#### 设置语音模式

调用 [SetRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-range-audio-mode) 接口设置范围语音模式（可随时切换模式），mode 参数取值为 ZegoRangeAudioMode.World 或 ZegoRangeAudioSecret.Team 时表示可以听到所有处于世界模式的人的声音，取值为 ZegoRangeAudioMode.Team 时表示只能听到同一小队内其他成员的声音。

<table>

<tbody><tr>
<th>语音模式</th>
<th>参数取值</th>
<th>功能描述</th>
</tr>
<tr>
<td>全世界</td>
<td>ZegoRangeAudioMode.World</td>
<td>设置该模式后，此用户能与小队成员互相通话，且能与范围内其他全世界模式的人互相通话。</td>
</tr>
<tr>
<td>仅小队</td>
<td>ZegoRangeAudioSecret.Team</td>
<td>设置该模式后，此用户仅能与小队成员互相通话。</td>
</tr>
<tr>
<td>隐秘小队</td>
<td>ZegoRangeAudioMode.SecretTeam</td>
<td>设置该模式后，此用户能与小队成员互相通话，且能单向接收范围内全世界模式的人的语音。</td>
</tr>
</tbody></table>

```csharp
rangeAudio.SetRangeAudioMode(ZegoRangeAudioMode.World);
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
    <td rowspan="6">同一小队</td>
    <td rowspan="3">是</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="6">不同小队</td>
    <td rowspan="3">是</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>否</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
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
    <td rowspan="6">同一小队</td>
    <td rowspan="3">是</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="6">不同小队</td>
    <td rowspan="3">是</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>否</td>
    <td>否</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>否</td>
    <td>否</td>
  </tr>
</tbody></table>


- 假设 A 用户的模式为 “隐秘小队”，则 B 用户在不同范围语音模式下的声音可接收情况如下：

<table>

  <tbody><tr>
    <th>是否在同一小队</th>
    <th>是否在最大范围内</th>
    <th>范围语音模式</th>
    <th>A 能否听到 B 的声音</th>
    <th>B 能否听到 A 的声音</th>
  </tr>
  <tr>
    <td rowspan="6">同一小队</td>
    <td rowspan="3">是</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>是</td>
    <td>是</td>
  </tr>
  <tr>
    <td rowspan="6">不同小队</td>
    <td rowspan="3">是</td>
    <td>全世界（World）</td>
    <td>是</td>
    <td>否</td>
  </tr>
  <tr>
    <td>仅小队（Team）</td>
    <td>否</td>
    <td>否</td>
  </tr>
  <tr>
    <td>隐秘小队（SecretTeam）</td>
    <td>否</td>
    <td>否</td>
  </tr>
  <tr>
    <td rowspan="3">否</td>
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
    <td>隐秘小队（SecretTeam）</td>
    <td>否</td>
    <td>否</td>
  </tr>
</tbody></table>
</Accordion>

### 11 销毁范围语音模块

当不再使用范围语音模块时可调用 [DestroyRangeAudio ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-range-audio) 接口销毁，释放范围语音模块占用的资源。

```csharp
engine.DestroyRangeAudio(rangeAudio);
```

### 12 退出房间

调用 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 接口退出房间，退出后将自动关闭麦克风和扬声器（即无法发送自己的音频，也无法收听别人的声音），并清空发声者信息列表。

```csharp
// 退出房间
engine.LogoutRoom("roomID");
```


## 常见问题


1. **收听范围内的流最多支持同时拉多少路？**

为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。如果超过 20 人且距离一样，则按照调用 [UpdateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#update-audio-source) 接口时，每个 userID 首次传入的先后顺序而定。

2. **范围语音的“范围”指的是收听范围还是发声范围？**

范围语音的“范围”指的是收听范围。

3. **小队语音中的成员连麦有 3D 音效吗？**

小队中的语音是普通连麦的效果，暂无 3D 音效。

4. **若本身就在调用推流接口，此时需要使用范围语音会存在冲突吗？**

范围语音当前使用主路发送音频，如果客户已经使用主路，则会存在冲突。

<Content />


