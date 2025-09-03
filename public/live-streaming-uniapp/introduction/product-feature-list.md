# 产品功能

- - -

## 直播能力


### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[混流](https://doc-zh.zego.im/article/21046)</td>
<td>把多人的多路视频流混合为一路流，从而只需要拉取一条流就能看到房间内所有成员的画面，听到房间内所有成员的声音。</td>
<td>多人通话主播连麦。</td>
</tr>
</tbody></table>


## 通信能力

### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[用户权限控制](https://doc-zh.zego.im/article/21047)</td>
<td>使用 Token 对用户进行权限控制，如：指定用户可以进房/退房；指定用户发言/静音；指定用户。</td>
<td>视频会议。</td>
</tr>
<tr>
<td>[通话质量监测](https://doc-zh.zego.im/article/21048)</td>
<td>对音视频的质量进行检测，如分辨率、帧率、码率、采样率等多指标检测，确保质量稳定。</td>
<td>银行开户、远程鉴定等对音视频质量有较高要求和限定的场景。</td>
</tr>
</tbody></table>


## 房间能力

### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[实时消息与信令](https://doc-zh.zego.im/article/21049)</td>
<td>实时消息主要提供纯文本消息的收发功能，可向同一房间内的其他用户发送广播消息和弹幕消息，或者对某些指定用户发送自定义消息，并可以根据需要自行实现点赞、送礼物、答题等互动功能。</td>
<td>
- 秀场直播。
- 语聊房。
</td>
</tr>
</tbody></table>

### 进阶功能

<table>
  
<tbody><tr>
<th>进阶功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[登录多房间](https://doc-zh.zego.im/article/21050)</td>
<td>一个用户可以同时进入多个房间进行音视频通话或观看直播。</td>
<td>老师多班在线教学。</td>
</tr>
</tbody></table>

## 音频能力

### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[音量变化](https://doc-zh.zego.im/article/21051)</td>
<td>音频频谱：即数字音频信号在各频点的能量值。音量变化：即某条流音量的大小。</td>
<td>
- 判断麦上的用户谁在说话、麦克风、扬声器等是否可用。
- 音频频谱动画展示。
</td>
</tr>
</tbody></table>



## 视频能力

### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[常用视频配置](https://doc-zh.zego.im/article/21052)</td>
<td>在直播时，自定义设置采集及播放的视频相关配置，如视频采集分辨率、视频编码输出分辨率、视频帧率、视频码率、视图模式和镜像模式等。</td>
<td>对分辨率、码率、镜像等有特殊要求的场景。</td>
</tr>
<tr>
<td>[视频画面旋转](https://doc-zh.zego.im/article/21053)</td>
<td>用户使用移动设备进行直播或视频通话时，可以采用不同的视频采集方向，并且可以根据对端用户的摄像头方向的角度进行适配调整。</td>
<td>多类型设备视频通话、直播场景，需要最佳的视频播放角度的场景。</td>
</tr>
<tr>
<td>[基础美颜](https://doc-zh.zego.im/article/21055)</td>
<td>当在视频通话或直播时，希望向对方呈现出良好的肌肤状态。</td>
<td><ul><li>秀场直播</li> <li>音视频通话</li></ul> </td>
</tr>
</tbody></table>


### 进阶功能

<table>
  
<tbody><tr>
<th>进阶功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[设置视频编码方式](https://doc-zh.zego.im/article/21058) </td>
<td>可对视频的编解码进行详细设置，包括启用分层视频编码、使用硬件编解码和设置编码方式等。</td>
<td>对编解码有特殊要求时。</td>
</tr>
</tbody></table>



## 其他能力

### 基础功能

<table>
  
<tbody><tr>
<th>基础功能</th>
<th>功能描述</th>
<th>业务场景</th>
</tr>
<tr>
<td>[媒体播放器](https://doc-zh.zego.im/article/21059)</td>
<td>提供播放音视频媒体文件的能力，并且支持将所播放的媒体文件的音画数据推流出去。</td>
<td>
- 播放测试音频。&nbsp;
- 播放背景音乐。&nbsp;
- 播放视频文件。
</td>
</tr>
<tr>
<td>[音视频录制](https://doc-zh.zego.im/article/21060)</td>
<td>本地媒体录制组件提供媒体本地录制的能力，把直播过程中的音视频数据录制存储到本地文件。</td>
<td>会议录制直播录制。</td>
</tr>
<tr>
<td>[播放透明礼物特效](https://doc-zh.zego.im/article/21061)</td>
<td>ZEGO Express SDK 媒体播放器提供 RGB 通道与 Alpha 通道分离播放 MP4 素材（RGB 与 Alpha 拼接后的 MP4 素材）的功能，实现播放透明礼物的动态效果，即播放礼物特效时，不会挡住直播间内容，大大提升用户体验。</td>
<td><ul><li>语聊房</li> <li>直播</li></ul></td>
</tr>
</tbody></table>
