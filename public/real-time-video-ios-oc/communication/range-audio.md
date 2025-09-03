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
<p>上图仅以范围语音模式为“全世界”时为例，更多不同模式组合关系下的声音可达情况请参考 <a href="https://doc-zh.zego.im/article/11666#5_10">设置通用语音模式</a>。</p>
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
<ul><li>队友之间的通话不受“范围”和 “3D 音效” 的影响，详情请查看 <a href="https://doc-zh.zego.im/article/11666#5_10">设置通用语音模式</a>。</li><li>如果您希望自定义语音收发能力，请参考 <a href="https://doc-zh.zego.im/article/11666#5_10">设置自定义语音模式</a>。</li></ul>
</Note>
</td>
</tr>
</tbody></table>

### 适用场景

游戏语音功能适用于吃鸡类游戏、元宇宙类场景。

在吃鸡类游戏中，小队语音提供编队功能，在游戏开始前和开始后都可以更换小队，开发者无需关注流分组以及推拉流的实现，直接实现小队语音功能。

在吃鸡游戏和元宇宙场景中，提供 3D 音效能力，在收听发声者音效时，有方向感距离感，让场景感受更真实。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3126) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/RangeAudio” 目录下的文件。

## 前提条件

在实现范围语音之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628)。


## 注意事项

<Warning title="注意">



使用范围语音功能时请务必关注如下注意事项，以免影响接入。
</Warning>

如果您已经使用 ZEGO Express SDK 的实时音视频功能，需要注意以下事项：

- 由于范围语音功能模块是基于 ZegoExpressEngine 的推拉流接口功能来实现的，使用时无需关注推拉流的概念。在范围语音场景下，推音频流的概念转变为“开启麦克风”，拉音频流的概念转变为“开启扬声器”。建议您不要在接入范围语音功能的同时再使用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 接口做推拉流操作，避免效果冲突。
- 范围语音功能模块中推拉流的相关回调（[onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-publisher-state-update-error-code-extended-data-stream-id) 、[onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-state-update-error-code-extended-data-stream-id)、[onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-publisher-quality-update-stream-id) 和 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-quality-update-stream-id)）不再生效。


## 使用步骤

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RangeVoice_ios.png" /></Frame>

上图仅展示了实现游戏语音功能的核心步骤与接口，开发者可以根据业务需要，参考下文文档的详细介绍，实现其他相关接口。

### 1 创建引擎

调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。


```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID;
//64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123"
profile.appSign = appSign;
//通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenarioDefault;
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

### 2 创建范围语音模块

调用的 [createRangeAudio ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-range-audio) 方法创建范围语音实例。

```objc
ZegoRangeAudio *rangeAudio = [[ZegoExpressEngine sharedEngine] createRangeAudio];
if (rangeAudio == nil) {
    printf("创建范围语音实例模块失败");
}
```

### 3 监听范围语音事件回调

可以根据需要调用 [setEventHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#set-event-handler) 接口为麦克风设置事件回调，用于监听麦克风的开启状态 [microphoneStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoRangeAudioEventHandler#range-audio-microphone-state-update-error-code) 通知。

```objc
/// 设置事件回调监听
[rangeAudio setEventHandler:self];
···

/// 麦克风状态回调
- (void)rangeAudio:(ZegoRangeAudio *)rangeAudio microphoneStateUpdate:(ZegoRangeAudioMicrophoneState)state errorCode:(int)errorCode {
    [self appendLog:[NSString stringWithFormat:@"microphone state update. state: %td, errorCode: %d", state, errorCode]];
}
```


### 4 登录房间

传入用户 ID 参数 userID 和 userName 创建 ZegoUser 用户对象后，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 接口，传入房间 ID 参数 roomID 和用户参数 user，登录房间。

<Warning title="注意">


- 同一个 AppID 内，需保证 roomID 全局唯一。
- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录房间失败。
</Warning>

```objc
// 创建用户对象
ZegoUser *user = [ZegoUser userWithUserID:@"user1"];

// 开始登录房间
[[ZegoExpressEngine sharedEngine] loginRoom:@"room1" user:user];
```

<Note title="说明">


当用户已成功登录房间后，如果应用异常退出，在重启应用后，开发者需先调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#logout-room) 接口退出房间，再调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 接口重新登录房间。

</Note>


### 5 设置收听者的当前位置

开发者可以通过调用 [updateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#update-self-position-axis-forward-axis-right-axis-up) 接口，设置听者自身的所在位置和方位，或者在自身方位发生变化时更新自己在世界坐标系中的位置和朝向。

<Note title="说明">


- 在调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-speaker) 打开扬声器之前如果没有调用该接口设置位置信息，则无法接收除小队以外其他人的声音。
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

```objc
// 自身在世界坐标系中的坐标，顺序是前、右、上。
float position[3] = {100.0, 100.0, 100.0};
// 自身坐标系前朝向的单位向量。
float axisForward[3] = {1.0,0.0,0.0};
// 自身坐标系右朝向的单位向量。
float axisRight[3] = {0.0,1.0,0.0};
// 自身坐标系上朝向的单位向量。
float axisUp[3] = {0.0,0.0,1.0};

// 更新自身位置和朝向
[self.rangeAudio updateSelfPosition: position axisForward: axisForward axisRight: axisRight axisUp: axisUp];
```

### 6 添加或更新发声者位置信息

登录房间成功后，可以通过调用 [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#update-audio-source-position) 接口，添加或更新发声者的位置信息。

<Warning title="注意">

- 全世界模式下：需要更新房间内，收听者和所有发声者的位置。隐秘小队模式下：需要更新房间内，所有在音频接收范围内，且为全世界模式的发声者的位置。如果未设置发声者位置，或者发声者超出收听者范围，会出现听不到声音的情况。
- 这里发声者指的是房间内其他人，收听者指的是自己。
</Warning>

- userID：为房间内其他发声用户的 ID。
- position：发声者在世界坐标系中的坐标，参数是长度为 3 的 float 数组，三个值依次表示前、右、上的坐标值。

```objc
// 用户在世界坐标系中的坐标，顺序是前、右、上。
float position[3] = {100.0, 100.0, 100.0};
// 添加/更新用户位置
[self.rangeAudio updateAudioSource:@"abc" position:position];
```

### 7（可选）设置音频接收距离

<Accordion title="请根据业务需要，选择是否设置音频接收距离。如果不设置，默认表示仅能接收本小队的成员声音。" defaultOpen="false">
调用 [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#set-audio-receive-range) 接口设置听者接收音频距离的最大范围，即以自身为起点，3D 空间中以设置的距离为立体空间。设置该范围后，在开启 3D 音效的情况下，声音将会随距离的增加而衰减，直至超出所设置的范围，则不再有声音。

```objc
// 设置音频接收距离的最大范围，超过该范围的音源声音会听不见
[self.rangeAudio setAudioReceiveRange:1000];
```

同时您也可以通过 [setAudioReceiveRangeWithParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#set-audio-receive-range-with-param) 接口进一步控制衰减范围。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

```objc
// 设置 3D 音效的衰减范围区间 [min, max]
ZegoReceiveRangeParam *param = [[ZegoReceiveRangeParam alloc] init];
param.min = reciveRangeMin;
param.max = reciveRangeMax;
[self.rangeAudio setAudioReceiveRangeWithParam:param];
```

<Note title="说明">


如果不设置音频接收距离，则表示只能接收本小队内的成员声音，无法接收小队外的所有声音。设置后，小队内的语音，不会受到音频接收距离的限制，也不会有 3D 音效。
</Note>
</Accordion>

### 8（可选）实现 3D 音效

<Accordion title="请根据业务需要，选择是否开启 3D 音效、以及是否设置本地播放器的 3D 音效。" defaultOpen="false">
#### 开启 3D 音效

调用 [enableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-spatializer) 接口设置 3D 音效，enable 取值为 true 时表示开启 3D 音效，此时房间内非小队成员的音频，会随着发声者离自身的距离和方向的变化而产生空间感的变化，为 false 时表示关闭 3D 音效。（可随时开启或关闭）

<Warning title="注意">


该功能只对小队以外的人生效。
</Warning>

```objc
[self.rangeAudio enableSpatializer:true];
```

#### 设置本地播放器的 3D 音效

开发者可以将媒体播放器或音效播放器作为声源，并设置其在世界坐标系中的位置。该功能可应用于在虚拟世界场景中的指定位置播放背景音乐，使其拥有 3D 音效效果。

实现此功能完成以下步骤：
1. 调用 [enableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-spatializer) 接口开启 3D 音效。
2. 设置本地播放器的 3D 音效
    - 媒体播放器：

        <Note title="说明">


        请参考 [媒体播放器](https://doc-zh.zego.im/article/1152) 了解如何创建媒体播放器与加载媒体资源。
        </Note>

        1. 调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 接口创建媒体播放器。
        2. 调用 [ZegoMediaPlayer.updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#update-position) 接口设置媒体播放器在世界坐标系中的位置。
        3. 调用 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-with-config-callback) 接口加载媒体资源。
    - 音效播放器：

        <Note title="说明">


        请参考 [音效文件播放器](https://doc-zh.zego.im/article/5669) 了解如何创建音效播放器与加载音效资源。
      </Note>

        1. 调用 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 接口创建音效播放器。
        2. 调用 [ZegoAudioEffectPlayer.start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#start-path-config) 接口播放音效资源。
        3. 在收到 [audioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoAudioEffectPlayerEventHandler#audio-effect-player-audio-effect-id-play-state-update-error-code) 回调状态为 `ZegoAudioEffectPlayState.Playing` 后，调用 [ZegoAudioEffectPlayer.updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#update-position-position) 接口设置正在播放的音效资源在世界坐标系中的位置。

```objc
// 开启 3D 音效，此步骤为前置条件
[self.rangeAudio enableSpatializer:YES];

// 设置本地播放器的位置
// 媒体播放器
// 1. 创建媒体播放器
ZegoMediaPlayer *mediaPlayer = [[ZegoExpressEngine sharedEngine] createMediaPlayer];
// 2. 设置媒体播放器在世界坐标系中的位置，顺序是前、右、上
float mediaPlayerPosition[3] = {0, 0, 0};
[mediaPlayer updatePosition:mediaPlayerPosition];
// 3. 使用媒体播放器加载媒体资源
ZegoMediaPlayerResource *resource = [[ZegoMediaPlayerResource alloc] init];
resource.loadType = ZegoMultimediaLoadTypeFilePath;
resource.filePath = @"path";
[mediaPlayer loadResourceWithConfig:resource callback:^(int errorCode) {
    if (errorCode == 0)
        [mediaPlayer start];
}];

// 音效播放器
// 1. 创建音效播放器
self.audioEffectPlayer = [[ZegoExpressEngine sharedEngine] createAudioEffectPlayer];
// 2. 开始播放音效资源
unsigned int effectSoundID = 1;
NSString *path = @"path";
[self.audioEffectPlayer start:effectSoundID path:path config:nil];
// 3. 收到 [audioEffectPlayer] 回调状态为 ZegoAudioEffectPlayState.Playing 后
//    设置音效播放器在世界坐标系中的位置，顺序是前、右、上
float audioEffectPlayerposition[3] = {0, 0, 0};
[self.audioEffectPlayer updatePosition:effectSoundID position:audioEffectPlayerposition];
```
</Accordion>


### 9 开启麦克风、扬声器

登录房间成功后：

- 调用 [enableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-microphone) 接口，设置是否开启麦克风。当 enable 取值为 true 时表示开启，此时 SDK 将会自动使用主通道推音频流，为 false 时表示关闭。（可随时开启或关闭）

    开发者可以通过监听 [microphoneStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoRangeAudioEventHandler#range-audio-microphone-state-update-error-code) 事件回调，获取麦克风更新后的状态。

- 调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-speaker) 接口，设置是否开启扬声器。enable 取值为 true 时表示开启，此时将会自动拉取房间内的音频流，为 false 时表示关闭。（可随时开启或关闭）

<Warning title="注意">


调用 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#enable-speaker) 接口后，当超过最大拉流数限制（目前为 20 路）时，会优先拉取小队内成员音频流（需设置小队模式），再拉取世界内距离自身范围最近的音频流。
</Warning>

```objc
// 开启麦克风
[self.rangeAudio enableMicrophone:true];
// 开启扬声器
[self.rangeAudio enableSpeaker:true];
```

### 10（可选）加入小队、设置语音模式

<Accordion title="请根据业务需要，选择是否实现游戏小队、小队语音等功能。" defaultOpen="false">
#### 加入小队

调用 [setTeamID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#set-team-id) 接口可根据需要设置想要加入的小队 ID（可随时变更 ID），设置 ID 后即可直接加入。加入小队后，与同一小队内队员之间的交流不受范围语音和 3D 音效的限制。

<p id="setRangeAudioMode"></p>

```objc
[self.rangeAudio setTeamID:@"123"];
```

#### 设置通用语音模式

调用 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#set-range-audio-mode) 接口设置范围语音模式（可随时切换模式），mode 参数取值为 ZegoRangeAudioModeWorld 或 ZegoRangeAudioSecretTeam 时表示可以听到所有处于世界模式的人的声音，取值为 ZegoRangeAudioModeTeam 时表示只能听到同一小队内其他成员的声音。


<table>

<tbody><tr>
<th>语音模式</th>
<th>参数取值</th>
<th>功能描述</th>
</tr>
<tr>
<td>全世界</td>
<td>ZegoRangeAudioModeWorld</td>
<td>设置该模式后，此用户能与小队成员互相通话，且能与范围内其他全世界模式的人互相通话。</td>
</tr>
<tr>
<td>仅小队</td>
<td>ZegoRangeAudioModeTeam</td>
<td>设置该模式后，此用户仅能与小队成员互相通话。</td>
</tr>
<tr>
<td>隐秘小队</td>
<td>ZegoRangeAudioModeSecretTeam</td>
<td>设置该模式后，此用户能与小队成员互相通话，且能单向接收范围内全世界模式的人的语音。</td>
</tr>
</tbody></table>

```objc
[self.rangeAudio setRangeAudioMode:ZegoRangeAudioModeWorld];
```

不同范围语音模式下，发声者声音的可接收情况有所不同。

- 假设 A 用户的模式为 “全世界”，则 B 用户在不同范围语音模式下的声音可接收情况如下：

<table>
  <colgroup>
    <col/>
    <col/>
    <col/>
    <col/>
    <col/>
  </colgroup>
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
  <colgroup>
    <col/>
    <col/>
    <col/>
    <col/>
    <col/>
  </colgroup>
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
  <colgroup>
    <col/>
    <col/>
    <col/>
    <col/>
    <col/>
  </colgroup>
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


#### 设置自定义语音模式

<Warning title="注意">
<ul>
<li>自定义语音模式和通用语音模式不可以同时使用。</li>
<li>如需使用自定义语音模式，请确保游戏语音内的所有线上用户使用的 Express SDK 为 3.3.0 及以上版本。</li>
</ul>
</Warning>

通过自定义语音模式，您可以自由控制音频的收发逻辑，以完成各种音频互动，示例如下：
    假设 A、B、C 为同一小队成员，且 C 在 A 的接收范围内，可通过表格中的配置完成预期的音频体验


<table>
  <colgroup>
    <col/>
    <col/>
  </colgroup>
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
<td>全部</td>
<td>全部</td>
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

```objc
[self.rangeAudio setRangeAudioCustomMode:ZegoRangeAudioSpeakModeAll listenMode:ZegoRangeAudioListenModeAll];
```
</Accordion>


### 11 销毁范围语音模块

当不再使用范围语音模块时可调用 [destroyRangeAudio ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#destroy-range-audio) 接口销毁，释放范围语音模块占用的资源。

```objc
[[ZegoExpressEngine sharedEngine] destroyRangeAudio:rangeAudio];
```

### 12 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#logout-room) 接口退出房间，退出后将自动关闭麦克风和扬声器（即无法发送自己的音频，也无法收听别人的声音），并清空发声者信息列表。

```objc
// 退出房间
[[ZegoExpressEngine sharedEngine] logoutRoom:@"room1"];
```


## 常见问题


1. **收听范围内的流最多支持同时拉多少路？**

为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。如果超过 20 人且距离一样，则按照调用 [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeAudio#update-audio-source-position) 接口时，每个 userID 首次传入的先后顺序而定。

2. **范围语音的“范围”指的是收听范围还是发声范围？**

范围语音的“范围”指的是收听范围。

3. **小队语音中的成员连麦有 3D 音效吗？**

小队中的语音是普通连麦的效果，暂无 3D 音效。

4. **若本身就在调用推流接口，此时需要使用范围语音会存在冲突吗？**

范围语音当前使用主路发送音频，如果客户已经使用主路，则会存在冲突。
