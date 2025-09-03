# 场景化 AI 降噪

- - -

场景化 AI 降噪，是指实时自动识别不同的场景，智能调整 AI 降噪策略，提供最佳的降噪及音质效果。目前支持两种常见降噪场景：
- 通话场景下，将除人声外的所有声音识别为噪音并进行消除。
在消除稳态噪声（详情请参考 [音频 3A 处理](https://doc-zh.zego.im/article/10182)）的基础上，有效消除非稳态噪声且实现人声高保真，主要噪声包括鼠标、键盘、敲击、空调、厨房碗碟、嘈杂餐厅、环境风声、咳嗽、吹气等非人声的噪声，以及小房间的人声混响。
- 音乐场景下，自动调整降噪效果，还原音乐音质。
实时对 mic 输入进行音乐检测，在声卡、弹唱或近场音乐场景下，自动调整降噪等级，保证音乐的高保真音质。

<Warning title="注意">
- 使用 AI 降噪功能前，请先联系 ZEGO 技术支持进行特殊编包。
- ZEGO Express SDK 从 3.0.0 版本开始，支持智能识别音乐场景。在音乐场景下，AI 降噪可以自动降低降噪等级，提升音质体验。如需使用该功能，请联系 ZEGO 技术支持进行特殊编包与配置。
</Warning>

### 功能优势

- 能消除 80% 的噪声。
- 延迟低。
- 占用内存少，和传统降噪基本一致。
- CPU 使用率低。
- 音乐场景识别准确率达 99%。


### 使用场景

本功能适用于语音房、会议、语音开黑等 1v1 或多人音视频通话场景，以及声卡、弹唱、近场音乐的直播或者在线 KTV 场景。

<Warning title="注意">
音乐场景识别需要打开音乐检测开关，请联系 ZEGO 技术支持配置开启音乐检测功能。
</Warning>


### 可消除的噪声

开发者可以使用本功能，消除以下噪音：

<table>
  <colgroup>
    <col width="30%"/>
    <col width="70%"/>
  </colgroup>
  <tbody><tr>
    <th>场景</th>
    <th>一些典型噪声</th>
  </tr>
  <tr>
    <td>会议室</td>
    <td><ul><li>键盘声</li><li>桌子敲击声</li></ul></td>
  </tr>
  <tr>
    <td>办公室</td>
    <td><ul><li>键盘声</li><li>周围同事说话声</li></ul></td>
  </tr>
  <tr>
    <td>交通工具</td>
    <td><ul>
<li>汽笛声</li>
<li>汽车经过的呼啸声</li>
<li>车载音乐声</li>
<li>雨声及雨刮声</li>
</ul></td>
  </tr>
  <tr>
    <td>网吧</td>
    <td><ul>
<li>键盘声</li>
<li>周围人语音声</li>
</ul></td>
  </tr>
  <tr>
    <td>咖啡厅</td>
    <td><ul>
<li>椅子拖动声</li>
<li>周围人说话声</li>
<li>尖锐碰撞声</li>
</ul></td>
  </tr>
</tbody></table>

## 效果展示

**办公室**

原始音频包含：鼠标点击声、键盘声、鼓掌声、摩擦声、办公室嘈杂声、空调声等。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/office_noise_original.mp3" controls>您的浏览器不支持 audio 标签。</audio>

AI 降噪后：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/office_noise_AIDenoise.mp3" controls>您的浏览器不支持 audio 标签。</audio>

**公共场所**

原始音频包含：雨声、电车声、炒菜声、汽车呼啸声等。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/public_noise_original.mp3" controls>您的浏览器不支持 audio 标签。</audio>

AI 降噪后：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/public_noise_AIDenoise.mp3" controls>您的浏览器不支持 audio 标签。</audio>


**音乐场景**

原始音频：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Original_audio.mp3" controls>您的浏览器不支持 audio 标签。</audio>

常规 AI 降噪：消除噪音，但音乐损伤大。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Conventional_AI_noise_reduction_effect.mp3" controls>您的浏览器不支持 audio 标签。</audio>

场景化 AI 降噪后：消除噪音，音乐品质保真。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Scenario_based_AI_noise_reduction_effect.mp3" controls>您的浏览器不支持 audio 标签。</audio>
## 前提条件

在实现场景化 AI 降噪功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/197) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633)。


## 使用步骤

开发者可以按照以下步骤完成 AI 降噪的相关设置：

1. 请联系 ZEGO 技术支持配置开启音乐检测功能。如果已开启，请忽略该步骤。

2. 初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/7633#CreateEngine)” 及 “[登录房间](https://doc-zh.zego.im/article/7633#createroom)”。

3. 调用 [enableANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-ans) 接口，开启噪声抑制，该功能开启后可以使人声更加清晰。

4. 开启噪声抑制后，开发者可通过调用 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-ans-mode) 接口，设置 ANS 模式，开启 AI 降噪功能。以下展示了部分 AI 降噪模式，更多模式请参考 [ZegoANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoANSMode)。

    <table>

    <tbody><tr>
    <th>AI 降噪模式</th>
    <th>适用场景</th>
    </tr>
    <tr>
    <td>ZEGO_ANS_MODE_AI</td>
    <td>轻量模式，极低的功耗与包体增量下依然具备良好的降噪效果，适用于室内噪音等环境以及相对舒适的国内地区。</td>
    </tr>
    <tr>
    <td>ZEGO_ANS_MODE_AI_BALANCED</td>
    <td>均衡模式，全面消除噪音同时无损人声，但功耗稍微增加。适用于复杂的通话环境，如户外闹市、交通出行等环境以及噪音干扰严重的地区。</td>
    </tr>
    <tr>
    <td>ZEGO_ANS_MODE_AI_LOW_LATENCY</td>
    <td>低延迟模式，10ms 延迟下依然保持纯净的降噪效果以及高保真的人声音质，适用于游戏语音、游戏开黑、实时合唱等对延迟较为敏感的场景。</td>
    </tr>
    </tbody></table>

    ```cpp
    // 开启 ANS
    engine->enableANS(true);
    // 根据需求设置 AI 降噪模式，注意：设置 ANS 模式为 ZEGO_ANS_MODE 后，ZEGO Express SDK 会强制关闭瞬态噪声抑制 [enableTransientANS]
    engine->setANSMode(ZEGO_ANS_MODE_AI);
    ```
