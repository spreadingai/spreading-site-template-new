# 抢唱方案
- - -

## 抢唱玩法简介

一轮抢唱游戏会播放若干首歌曲的高潮片段。播放一首歌曲高潮片段（原唱），并同时进入抢麦倒计时。倒计时结束后，玩家即可参与抢麦。当玩家抢到麦后，开始播放高潮片段的伴奏，抢麦者根据歌词和音高线进行演唱，其余玩家聆听歌声。当歌曲演唱完毕后，系统根据抢麦者演唱时的音准对本次演唱评分。评分结束后，进入下一首歌曲流程，一直循环直至一轮游戏结束。

## 方案简介

KTV 抢唱方案是即构科技基于 ZegoExpressSDK 提供的音视频能力，以及 ZIM SDK 提供的可靠消息传输能力，参考业界抢唱流行玩法而形成的通用解决方案。除了基于 ZEGO 自有技术以外，KTV 抢唱还包含与 ZEGO 合作的版权方提供的正版音乐词曲服务，以保证该方案在商业领域不会出现侵权问题。


本方案的核心思想是状态机，由房间状态驱动业务。后台房间创建成功后，房间即进入等待游戏开始的状态。后台通过接收前端的状态切换指令（通常是一些关键业务接口，例如：开始游戏、点击抢唱），进行状态切换，继而通知前端，前端根据最新状态进行业务活动，例如：更新视图、推拉流、开闭麦等。整个状态转移流程随着房间的销毁而终止。

本文将从抢唱方案的整体架构开始介绍，展示客户端和多个服务之间的关系，然后基于抢唱体验 App 源码，简述移动端的状态切换细节并解释关键流程。


## 方案架构图

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Grab_Mic/Copyrighted_music_Grab_Mic_Structure.png" /></Frame>

<Warning title="注意">
本方案是基于 ZegoExpressSDK 和 ZIM SDK 从而实现抢唱功能，如果开发者选择自行集成相关 SDK 到项目，请查看 [Express SDK 集成](/online-ktv-android/quick-starts/integrate-the-sdk/express-video) 和 [即时通讯 - 实现基本消息收发](https://doc-zh.zego.im/zim-android/send-and-receive-messages)。
</Warning>

角色说明：
- 房主 —— 房主负责创建、销毁房间，控制游戏流程，并且房主默认参与抢唱。
- 麦上用户 —— 在房间麦位被占满前加入房间的用户自动成为麦上用户，可以参与抢唱，暂不支持下麦操作。
- 麦下听众 —— 在房间麦位被占满后加入房间的用户自动成为麦下用户，不能参与抢唱。暂不支持房间内麦下听众上麦成为麦上用户。

<Note title="说明">

房主、麦上用户、麦下听众角色属于业务角色，并非 ZegoExpressSDK 内置功能。

</Note>

## 体验 App 源码

ZEGO 针对抢唱玩法提供了 [体验 App 源码](/online-ktv-android/quick-starts/run-the-demo-app-source-code/grab-the-mic)，以供开发者进一步了解 ZEGO 在线 KTV 抢唱方案。

## 业务流程图

抢唱游戏中，房间状态转移如下图所示：

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Grab_Mic/Sequences_Grab_Mic_New.png" /></Frame>

共有 10 个状态：
1. 等待本轮开始 (round_waiting)
2. 准备本轮游戏 (round_preparing)
3. 播放原唱并等待抢唱 (grab_waiting)
4. 抢唱成功 (grab_successfully)
5. 演唱中 (singing_or_listening)
6. 分数展示 (song_end)
7. 无人抢唱 (grab_unsuccessfully)
8. 下一首 (next_song_preparing)
9. 抢唱轮次结束 (round_end)
10. 房间结束 (room_exit)

<Warning title="注意">

抢唱体验 App 源码中，“演唱中（singing_or_listening）”后，存在状态“AI 识别（song_ai）”。该状态为可选非必要状态，开发者可以决定是否在项目中实现。

</Warning>

## 流程详述

<Note title="说明">
随着游戏进程进行，状态不断切换，推拉流和麦克风的操作会非常频繁。因此，这里列出了 ZegoExpressSDK 对应方法的文档，以供参考。

- [开始推流](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android_ios~class~ZegoExpressEngine#start-publishing-stream)，[停止推流](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android_ios~class~ZegoExpressEngine#stop-publishing-stream)

- [开始拉流](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream)，[停止拉流](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android_ios~class~ZegoExpressEngine#stop-playing-stream)

- [开闭麦克风](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android_ios~class~ZegoExpressEngine#mute-microphone)

</Note>

**信令 CMD 编号**

本方案的前端主要用于界面展示以及关键流程触发，需要依赖后台传输的 IM 信令（ZPush）才能完成状态转移以及数据同步的功能。后台的信令 cmd 如下：
- 成员状态变更通知；
- 成员列表变更通知；
- 房间状态变更通知；
- 点歌列表变更通知。

Android 端 对 ZPush 的处理请参考抢唱体验 App 源码的 im.zego.ktv.grab.grabroom.help.ZIMRoomMessageHelp 类。

### 1 状态：等待本轮开始

#### 用户逻辑

- 房主端展示“开始抢唱”按钮。
- 房主端点击“开始抢唱”按钮，调用后台接口，通知后台开始新的一轮游戏。
- 麦上用户和麦下用户等待房主开始游戏。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_game_waiting_2.jpg" /></Frame>

### 2 状态：准备本轮游戏

#### 用户逻辑

- 所有用户得知“游戏开始”。
- 后台切换到 round_preparing 状态的同时会发送新一轮歌单的 push（信令：点歌列表变更通知）。
- 所有用户维持该状态直到房主下载完新一轮歌曲高潮之后，随后通知后台。
- **收到新一轮歌单后，用户下载资源**
    - 房主和麦上用户下载歌曲高潮片段、歌词及音高线；麦下用户只需下载歌曲高潮片段和歌词。
- **房主下载高潮片段的处理**
    - 房主下载完该轮所有高潮片段之后，调用后台接口上报下载情况，后台以此切换到下一个状态。
    - 房主要上报每首歌的下载情况；如果后台遇到因下架导致的下载失败的歌曲，需要将其从本轮流程中剔除。
- **房主推流的处理**
    - 为了保证其他用户在下个状态能够顺利拉流，房主需在这个阶段就推流，其他用户能提前收到流变更并建立链接进行拉流。此时并未推实际数据到流上。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_round_waiting_2.jpg" /></Frame>

#### 体验 App 源码实现

- 判断能否推流，请参考体验 App 源码的 im.zego.ktv.grab.grabroom.help.GrabRoomHelp 类的 canPushStream() 方法。

- 下载歌曲歌词，请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabSongListDownloadManager 类的downLoadAllSong() 方法

#### ZegoExpressSDK 相关方法调用

- [获取歌曲高潮片段信息](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-accompaniment-clip)

- [下载歌曲伴奏](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#download)

- [下载逐字歌词](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-krc-lyric-by-token)

- [获取标准音高线](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-standard-pitch)

### 3 状态：播放原唱并等待抢唱

#### 用户逻辑

- 在此状态期间，所有人自动闭麦。
- 高潮部分只播放指定长度，这里的指定长度是通过运营或者歌词计算提供。
- 由于下载片段包括高潮前奏部分（通常5秒左右），因此播放高潮前需要跳过前奏部分。
- **抢唱权限**
    - 状态开始后进入倒计时，倒计时结束后，房主和麦上用户可以调用后台接口参与抢唱，后台收到抢唱请求会切换到下一个状态。
    - 如果麦上用户的进房时间晚于状态开始时间，视作无法参与本首歌曲的抢唱。
    - 麦下用户不能参与抢唱。
- **高潮片段（原唱）播放来源**
    - 房主本地播放当前歌曲高潮片段（原唱）并继续推流。
    - 如果麦上用户及麦下用户完成下载当前歌曲高潮片段，则本地播放并停止拉流，否则保持拉流收听高潮片段（原唱）。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_waiting_2.jpg" /></Frame>

#### 体验 App 源码实现

- 非房主是否本地播放请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomInfoManager 类的 mGrabWaitingShowSong 字段
- 拉流判断请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomStreamManager 类的 onRoomStreamUpdate() 方法 和 stopPlayingHostStream() 方法
- 歌曲的播放操作请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomStateManager 类的 grabWaiting() 方法
- 歌词的展示请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomProgressTimerManager 类

#### ZegoExpressSDK 相关方法调用

- [加载歌曲资源](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#load-resource-with-position)

- [播放音乐](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#start)

### 4 状态：抢唱成功

#### 房主逻辑

- 所有用户得知“某用户”抢到麦。
- **房主和麦上观众抢麦后，流与麦克风的处理**
    - 假如自己抢麦成功，则从该状态开始推流，关麦，供拉流方提前建立链接；
    - 假如未抢麦或抢麦失败，则关麦，收到 SDK 流新增进行拉流。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_success_2.jpg" /></Frame>

#### 体验 App 源码实现

主动拉流请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomStateManager 类的 grabSuccessfully() 方法

### 5 状态：演唱中
#### 房主 & 麦上用户逻辑

抢麦成功：
- 收到该状态时，自动开麦，播放伴奏，展示歌词和音高线界面。
- 唱完之后，调用后台接口将本地打分结果发给后台，触发后台状态切换；后台也需要做超时判断，避免因歌者掉线导致状态无法变更。
- 歌唱时将播放器和麦克风声音本地混合推出去，通过 SEI 带上本地伴奏进度，帮助其他人对齐歌词展示进度。

未抢麦或抢麦失败：
- 收到该状态时，自动闭麦。
- 拉取抢麦成功用户推的流，并基于其中的 SEI 来对齐歌词展示进度。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_singing_listening_2.jpg" /></Frame>

#### 麦下用户

- 拉取抢麦成功用户推的流，并基于其中的 SEI 来对齐歌词展示进度。

#### 体验 App 源码实现

- 歌曲的播放操作，请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomStateManager 类的 singingOrListening() 方法。

- 歌词和音高线的展示，请参考体验 App 源码的 im.zego.ktv.grab.grabroom.manager.GrabRoomProgressTimerManager 类。

### 6 状态：分数展示

#### 用户逻辑

- 所有用户得知抢麦成功用户演唱该高潮片段的分数。

### 7 状态：无人抢唱

#### 用户逻辑

- 所有用户得知无人抢唱该高潮片段。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_fail_2.jpg" /></Frame>

### 8 状态：下一首

#### 用户逻辑

- 游戏进行到下一首。
- **房主流的处理**

    为了保证其他用户在下个状态能够顺利拉流，房主需在这个阶段就推流，其他用户能提前收到流变更并建立链接进行拉流，此时并未推实际数据到流上。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_next_song_2.jpg" /></Frame>

### 9 状态：抢唱轮次结束

#### 用户逻辑

- 向房主和麦上用户展示本轮抢唱数据，麦下用户可以选择是否退房。
- **房主的权限**
    - 当游戏还未进行到最后一轮，房主可以调用后台接口开始新的一轮游戏，触发后台切换到状态 round_waiting。
    - 当游戏已经处于最后一轮，房主只能选择退出房间。房主退出房间时，房间被销毁，所有人收到状态 room_exit。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/grab_state_round_end_2.jpg" /></Frame>

### 10 状态：房间结束

#### 用户逻辑

- 收到此状态时，呈现房间结束对话框，点击后离开房间。
- 任何时刻，只要房主退出房间，其他人都会收到此状态。

## 时序图

### 创建（房主）/加入（非房主）抢唱房间

<Frame width="auto" height="auto" caption="image description text">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/KTVGrab/Common/User_Join_Room.png" />
</Frame>

参考文档：
- [Express - 使用 Token 鉴权](/real-time-video-android-java/communication/using-token-authentication)
- [Express - 实现视频通话](/real-time-video-android-java/quick-start/implementing-video-call)
- [ZIM - 实现基本消息收发](https://doc-zh.zego.im/zim-android/send-and-receive-messages)
- [功能总览 - 版权音乐](https://doc-zh.zego.im/article/3548)

### 房主开始新一轮抢唱游戏

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/KTVGrab/Common/Host_Begin_Game.png" />
</Frame>

### 房主和麦上用户进行抢麦

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/KTVGrab/Common/Host_and_User_Grab_Mic.png" />
</Frame>


## 常见问题

请参考 [常见问题 - 抢唱方案相关问题](/online-ktv-android/faq#抢唱方案相关问题)。
