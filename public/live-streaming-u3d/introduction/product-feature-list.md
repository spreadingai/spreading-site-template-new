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
<td>RTMP 推流到 ZEGO 服务器</td>
<td>在直播场景下，主播可以通过 RTMP 推流工具将音视频流推送到 ZEGO 服务器，实现低延迟的效果。</td>
<td>直播场景。</td>
</tr>
<tr>
<td>混流</td>
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
<td>[用户权限控制](https://doc-zh.zego.im/article/21100)</td>
<td>使用 Token 对用户进行权限控制，如：指定用户可以进房/退房；指定用户发言/静音；指定用户。</td>
<td>视频会议。</td>
</tr>
<tr>
<td>[通话质量监测](https://doc-zh.zego.im/article/21101)</td>
<td>对音视频的质量进行检测，如分辨率、帧率、码率、采样率等多指标检测，确保质量稳定。</td>
<td>银行开户、远程鉴定等对音视频质量有较高要求和限定的场景。</td>
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
<td>[多源采集](https://doc-zh.zego.im/article/21102)</td>
<td>提供灵活易用的音视频采集源与通道管理能力，减少开发者的开发及维护成本。</td>
<td>视频会议、在线教育。</td>
</tr>
<tr>
<td>[云代理](https://doc-zh.zego.im/article/21184)</td>
<td>通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器中转，实现与 RTC、L3（超低延迟直播）通信。</td>
<td>医院、政府、公司内部等有内网等限制性的网络环境中。</td>
</tr>
<tr>
<td>[游戏语音](https://doc-zh.zego.im/article/21185)</td>
<td>模仿真实世界，人根据声音的方位及距离等因素，从而有不同的听觉感受，例如距离越远，声音越小等。同时可以对能接收到音源的人进行分组限定，例如房间中，分组进行讨论，不同组听不到彼此声音等。</td>
<td>
- 元宇宙。
- 同一房间，分组交流或对战。
</td>
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
<td>[房间连接状态说明](https://doc-zh.zego.im/article/21103)</td>
<td>判断用户在房间内的连接状态，以及各个连接状态的转化过程。</td>
<td>-</td>
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
<td>[音频频谱与音量变化](https://doc-zh.zego.im/article/21104)</td>
<td>音频频谱：即数字音频信号在各频点的能量值。音量变化：即某条流音量的大小。</td>
<td>
- 判断麦上的用户谁在说话、麦克风、扬声器等是否可用。
- 音频频谱动画展示。
</td>
</tr>
<tr>
<td>[耳返与声道设置](https://doc-zh.zego.im/article/21105)</td>
<td>耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。</td>
<td>
- 秀场直播。
- 情感 FM。
- 音乐教学等较为专业场景。
</td>
</tr>
<tr>
<td>[音频 3A 处理](https://doc-zh.zego.im/article/21106) </td>
<td>在实时音视频通话或直播时，可以对音频进行 3A 处理，以提高通话或直播质量和用户体验。<ul><li>AEC（回声消除）：对采集到的音频数据进行过滤以减少音频中的回声。</li><li>AGC（自动增益控制）：开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。</li><li>ANS（降噪）：识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。</li></ul></td>
<td>所有希望有高质量实时音视频服务的场景。</td>
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
<td>[屏幕共享](https://doc-zh.zego.im/article/21107)</td>
<td>视频通话或互动直播过程中将屏幕内容以视频的方式共享给房间内的其他用户。</td>
<td>
- 视频会议
- 游戏直播
</td>
</tr>
<tr>
<td>[基础美颜](https://doc-zh.zego.im/article/21108)</td>
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
<td>[自定义视频采集](https://doc-zh.zego.im/article/21109)</td>
<td>自定义向 Zego Express SDK 提供视频输入源输入视频数据，并由 Zego Express SDK 进行编码推流的功能。</td>
<td>
- 使用了第三方美颜厂商的美颜 SDK。
- 摄像头无法被 SDK 正常使用。
- 直播非摄像头采集的数据。
</td>
</tr>
<tr>
<td>[视频大小流和分层编码](https://doc-zh.zego.im/article/21110)</td>
<td>将码流分为基本层和扩展层，可以为不同网络状态、不同设备性能的用户提供更好的体验。</td>
<td>视频通话。</td>
</tr>
<tr>
<td>[推流视频增强](https://doc-zh.zego.im/article/21186)</td>
<td><p>ZEGO Express SDK 提供多种视频前处理增强能力，开发者可以根据业务需要，在推流端对画面的效果进行调整。</p> <ul><li>基础美颜：美白、磨皮、锐化、红润，为用户呈现出良好的肌肤状态，打造独特自然的美颜效果。</li><li>低照度增强：在环境光较暗的情况下，摄像头采集到的画面亮度不满足看清人脸、或无法进行人脸识别等业务需求时，对画面亮度进行增强。</li><li>色彩增强：在保护人物肤色的情况下，增强欠饱和的色彩，让画面色彩更逼真，更符合人的视觉感受。</li></ul></td>
<td><ul><li>秀场直播</li> <li>音视频通话</li></ul></td>
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
<td>[媒体播放器](https://doc-zh.zego.im/article/21111)</td>
<td>提供播放音视频媒体文件的能力，并且支持将所播放的媒体文件的音画数据推流出去。</td>
<td>
- 播放测试音频。&nbsp;
- 播放背景音乐。&nbsp;
- 播放视频文件。
</td>
</tr>
<tr>
<td>[音效文件播放器](https://doc-zh.zego.im/article/21112)</td>
<td>提供音效播放器，并进行音效统一管理，实现对增强真实感或者烘托场景氛围的简短效果音的播放/控制等功能。</td>
<td>
- 秀场直播。
- 游戏娱乐。
</td>
</tr>
</tbody></table>
