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
<td>[RTMP 推流到 ZEGO 服务器](https://doc-zh.zego.im/article/14737)</td>
<td>在直播场景下，主播可以通过 RTMP 推流工具将音视频流推送到 ZEGO 服务器，实现低延迟的效果。</td>
<td>直播场景。</td>
</tr>
<tr>
<td>[混流](https://doc-zh.zego.im/article/14777)</td>
<td>把多人的多路视频流混合为一路流，从而只需要拉取一条流就能看到房间内所有成员的画面，听到房间内所有成员的声音。</td>
<td>多人通话主播连麦。</td>
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
<td>[单流转码](https://doc-zh.zego.im/article/17787)</td>
<td>在云端把单条原始流转换为不同编码格式、不同分辨率的转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。</td>
<td>直播场景。</td>
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
<td>[用户权限控制](https://doc-zh.zego.im/article/14756)</td>
<td>使用 Token 对用户进行权限控制，如：指定用户可以进房/退房；指定用户发言/静音；指定用户。</td>
<td>视频会议。</td>
</tr>
<tr>
<td>[通话质量监测](https://doc-zh.zego.im/article/14771)</td>
<td>对音视频的质量进行检测，如分辨率、帧率、码率、采样率等多指标检测，确保质量稳定。</td>
<td>银行开户、远程鉴定等对音视频质量有较高要求和限定的场景。</td>
</tr>
<tr>
<td>[网络测速](https://doc-zh.zego.im/article/14768)</td>
<td>可在用户进行推/拉流前，检测上行和下行网络速度，判断当前网络环境下适合推/拉多大码率的音视频流。</td>
<td>通话场景、教育场景、直播场景。</td>
</tr>
<tr>
<td>[设备检测](https://doc-zh.zego.im/article/14765)</td>
<td>为了保证实时通信体验，通话或直播前可以进行设备检测，提前识别并排查问题。设备检测主要是检测本地麦克风、摄像头以及扬声器是否能正常工作。</td>
<td>通话场景、教育场景、直播场景。</td>
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
<td>[直播连麦](https://doc-zh.zego.im/article/13395)</td>
<td>一个房间内，可以出现多个主播，进行同屏连麦直播。</td>
<td>
- 多主播不同地区连麦。
- 多人 KTV 合唱。
- 多人连麦直播。
</td>
</tr>
<tr>
<td>[多源采集](https://doc-zh.zego.im/article/16912)</td>
<td>提供灵活易用的音视频采集源与通道管理能力，减少开发者的开发及维护成本。</td>
<td>视频会议、在线教育。</td>
</tr>
<tr>
<td>[同时推多路流](https://doc-zh.zego.im/article/14795)</td>
<td>一个用户可以推送多路音视频流，如分享屏幕的同时，将摄像头的视频流进行发送。</td>
<td>视频会议中播放 PPT 的同时，看到主讲人的画面。</td>
</tr>
<tr>
<td>[媒体补充增强信息（SEI）](https://doc-zh.zego.im/article/14842)</td>
<td>文本信息与音视频内容打包在一起通过流媒体通道进行传输，以此实现文本数据与音视频内容的精准同步的目的。</td>
<td><ul><li>视频画面的精准布局。</li> <li>远端歌词同步。</li> <li>直播答题。</li></ul></td>
</tr>
<tr>
<td>[云代理](https://doc-zh.zego.im/article/18104)</td>
<td>通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器中转，实现与 RTC、L3（超低延迟直播）通信。</td>
<td>医院、政府、公司内部等有内网等限制性的网络环境中。</td>
</tr>
<tr>
<td>[音视频流加密](https://doc-zh.zego.im/article/14845)</td>
<td>推流时对流进行加密，拉流时必须有与加密密钥一致的解密密钥。</td>
<td>需要加密流信息以保护通信安全的场景。</td>
</tr>
<tr>
<td>[游戏语音](https://doc-zh.zego.im/article/16840)</td>
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
<td>[房间连接状态说明](https://doc-zh.zego.im/article/14774)</td>
<td>判断用户在房间内的连接状态，以及各个连接状态的转化过程。</td>
<td>-</td>
</tr>
<tr>
<td>[实时消息与信令](https://doc-zh.zego.im/article/14783)</td>
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
<td>[登录多房间](https://doc-zh.zego.im/article/14839)</td>
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
<td>[音频频谱与音量变化](https://doc-zh.zego.im/article/14816)</td>
<td>音频频谱：即数字音频信号在各频点的能量值。音量变化：即某条流音量的大小。</td>
<td>
- 判断麦上的用户谁在说话、麦克风、扬声器等是否可用。
- 音频频谱动画展示。
</td>
</tr>
<tr>
<td>[耳返与声道设置](https://doc-zh.zego.im/article/14819)</td>
<td>耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。</td>
<td>
- 秀场直播。
- 情感 FM。
- 音乐教学等较为专业场景。
</td>
</tr>
<tr>
<td>[音频 3A 处理](https://doc-zh.zego.im/article/14825) </td>
<td>在实时音视频通话或直播时，可以对音频进行 3A 处理，以提高通话或直播质量和用户体验。<ul><li>AEC（回声消除）：对采集到的音频数据进行过滤以减少音频中的回声。</li><li>AGC（自动增益控制）：开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。</li><li>ANS（降噪）：识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。</li></ul></td>
<td>所有希望有高质量实时音视频服务的场景。</td>
</tr>
<tr>
<td>[变声/混响/立体声](https://doc-zh.zego.im/article/14813)  </td>
<td><p>为增加趣味性和互动性，用户可以通过变声来搞怪，通过混响烘托气氛，通过立体声使声音更具立体感。</p><p>ZEGO Express SDK 提供了多种预设的变声、混响、混响回声、立体声效果，开发者可以灵活设置自己想要的声音。</p></td>
<td><ul><li>直播</li><li>语聊房</li><li>K 歌房</li><li>匿名社交</li><li>游戏娱乐</li><li>角色扮演</li></ul></td>
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
<td>[场景化 AI 降噪](https://doc-zh.zego.im/article/14829)</td>
<td>实时自动识别不同场景，智能调整 AI 降噪策略提供最佳的降噪及音质效果。
通话场景下将除人声外的所有声音识别为噪音并进行消除。
音乐场景下自动调整降噪效果还原音乐音质。</td>
<td>语音房、会议、语音开黑等 1v1 或多人音视频通话场景，以及声卡、弹唱、近场音乐的直播或者在线 KTV 场景。</td>
</tr>
<tr>
<td>[自定义音频采集](https://doc-zh.zego.im/article/14833)</td>
<td>开发者可以自行获取音频信息后，交给 Zego Express SDK 进行传输。</td>
<td>
- 在线或本地音频文件传输。
- 定制采集系统的音频文件进行传输。
</td>
</tr>
<tr>
<td>[自定义音频渲染](https://doc-zh.zego.im/article/14833)</td>
<td>音频的由开发者自行渲染后进行播放。</td>
<td>开发者有自己的特殊渲染需求。</td>
</tr>
<tr>
<td>[自定义音频处理](https://doc-zh.zego.im/article/14836)</td>
<td>开发者可以自行进行音频特殊处理。</td>
<td>有 Zego Express SDK 无法满足的特殊的声音处理需求时，如特殊变声。</td>
</tr>
<tr>
<td>[AI 变声](https://doc-zh.zego.im/article/18441)</td>
<td>实时通话中的“柯南变声领结”，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调，随心所欲切换音色，超低延迟。</td>
<td><ul><li>社交语聊</li> <li>直播</li> <li>游戏语音</li></ul></td>
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
<td>[常用视频配置](https://doc-zh.zego.im/article/14759)</td>
<td>在直播时，自定义设置采集及播放的视频相关配置，如视频采集分辨率、视频编码输出分辨率、视频帧率、视频码率、视图模式和镜像模式等。</td>
<td>对分辨率、码率、镜像等有特殊要求的场景。</td>
</tr>
<tr>
<td>[视频采集旋转](https://doc-zh.zego.im/article/16146)</td>
<td>用户使用移动设备进行直播时，可以采用不同的视频采集方向，并且可以根据对端用户的摄像头方向和角度进行适配调整。</td>
<td>多类型设备直播场景，或需要最佳视频播放角度的场景。</td>
</tr>
<tr>
<td>[屏幕共享](https://doc-zh.zego.im/article/14734)</td>
<td>视频通话或互动直播过程中将屏幕内容以视频的方式共享给房间内的其他用户。</td>
<td>
- 视频会议
- 游戏直播
</td>
</tr>
<tr>
<td>[水印与截图](https://doc-zh.zego.im/article/14789)</td>
<td>可以在视频画面上添加版权 Logo 等水印。</td>
<td>有版权的视频分享等。</td>
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
<td>[设置视频编码方式](https://doc-zh.zego.im/article/14792) </td>
<td>可对视频的编解码进行详细设置，包括启用分层视频编码、使用硬件编解码和设置编码方式等。</td>
<td>对编解码有特殊要求时。</td>
</tr>
<tr>
<td>[自定义视频采集](https://doc-zh.zego.im/article/14804)</td>
<td>自定义向 Zego Express SDK 提供视频输入源输入视频数据，并由 Zego Express SDK 进行编码推流的功能。</td>
<td>
- 使用了第三方美颜厂商的美颜 SDK。
- 摄像头无法被 SDK 正常使用。
- 直播非摄像头采集的数据。
</td>
</tr>
<tr>
<td>[自定义视频渲染](https://doc-zh.zego.im/article/14810)</td>
<td>自定义视频渲染指的是 Zego Express SDK 向外部提供本地预览及远端拉流的视频帧数据，供用户自行渲染。</td>
<td>
- App 使用了跨平台界面框架或游戏引擎。
- App 需要获取 Zego Express SDK 采集或拉流的视频帧数据进行特殊处理。
</td>
</tr>
<tr>
<td>[自定义视频前处理](https://doc-zh.zego.im/article/14807)</td>
<td>开发者自行对视频数据进行自定义的前处理。</td>
<td>美颜、添加挂件等操作。</td>
</tr>
<tr>
<td>[超分辨率](https://doc-zh.zego.im/article/16518)</td>
<td>在拉流端对拉取到的视频流画面的宽和高进行倍增。例如：拉流端拉取到的原始画面分辨率为 640p x 360p，对画面进行超分处理后分辨率将提升为 1280p x 720p。</td>
<td>1V1 视频通话场景、直播场景、在线教育。</td>
</tr>
<tr>
<td>[主体分割](https://doc-zh.zego.im/article/16523)</td>
<td>ZEGO 业内领先技术。在推流端将矩形视频内的主体（多数情况下是人）通过 AI 算法分离出来并在 RTC 网络中传输、在拉流端渲染。</td>
<td>多人异地同台、秀场直播同台 PK、多人在线自习等多人同台场景。</td>
</tr>
<tr>
<td>[H.265](https://doc-zh.zego.im/article/14801)</td>
<td>通过更加先进的 H.265 编码技术，在相同码率的情况下，提供更高的清晰度。</td>
<td>网络环境较差下需要较高的音视频通话、直播体验对带宽较为敏感。</td>
</tr>
<tr>
<td>[视频大小流和分层编码](https://doc-zh.zego.im/article/17955)</td>
<td>将码流分为基本层和扩展层，可以为不同网络状态、不同设备性能的用户提供更好的体验。</td>
<td>视频通话。</td>
</tr>
<tr>
<td>[推流视频增强](https://doc-zh.zego.im/article/18881)</td>
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
<td>[媒体播放器](https://doc-zh.zego.im/article/14780)</td>
<td>提供播放音视频媒体文件的能力，并且支持将所播放的媒体文件的音画数据推流出去。</td>
<td>
- 播放测试音频。&nbsp;
- 播放背景音乐。&nbsp;
- 播放视频文件。
</td>
</tr>
<tr>
<td>[音效文件播放器](https://doc-zh.zego.im/article/14822)</td>
<td>提供音效播放器，并进行音效统一管理，实现对增强真实感或者烘托场景氛围的简短效果音的播放/控制等功能。</td>
<td>
- 秀场直播。
- 游戏娱乐。
</td>
</tr>
<tr>
<td>[音视频录制](https://doc-zh.zego.im/article/14798)</td>
<td>本地媒体录制组件提供媒体本地录制的能力，把直播过程中的音视频数据录制存储到本地文件。</td>
<td>会议录制直播录制。</td>
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
<td>[播放透明礼物特效](https://doc-zh.zego.im/article/17501)</td>
<td>ZEGO Express SDK 媒体播放器提供 RGB 通道与 Alpha 通道分离播放 MP4 素材（RGB 与 Alpha 拼接后的 MP4 素材）的功能，实现播放透明礼物的动态效果，即播放礼物特效时，不会挡住直播间内容，大大提升用户体验。</td>
<td> <ul><li>语聊房</li> <li>直播</li></ul></td>
</tr>
</tbody></table>
