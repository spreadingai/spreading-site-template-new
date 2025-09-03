# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式共享给房间内的其他用户，支持共享整个屏幕、共享指定窗口或标签页。例如在教育场景中，教师需将桌面上的 PPT 展示给房间内的其他学生观看，提高沟通效率。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code) 获取源码。

相关源码请查看 “src/Examples/Others/ScreenSharing” 目录下的文件。

## 前提条件

在使用屏幕共享前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。
- 当前浏览器支持无插件或有插件形式的屏幕共享。

<Warning title="注意">


1. 屏幕共享目前仅支持桌面端（例如 Windows 和 macOS）的 Google Chrome 、Microsoft Edge 和 Firefox 浏览器，以及 macOS 的 Safari 浏览器。
    - 有插件形式：支持在 Google Chrome 65 或以上版本的浏览器共享屏幕。
    - 无插件形式：支持在 Google Chrome 72 或以上版本的浏览器，Microsoft Edge 80 或以上版本的浏览器，以及 Firefox 和 Safari 13 或以上版本浏览器共享屏幕。

2. 如果开发者使用 macOS 系统，请先打开电脑的“系统偏好设置 > 安全性与隐私 > 屏幕录制”，添加使用的浏览器，才可以进行屏幕共享。

</Warning>



## 使用步骤

### （可选）安装屏幕共享插件

<Accordion title="安装屏幕共享插件" defaultOpen="false">
仅 Google Chrome 浏览器支持插件形式的屏幕共享，当开发者使用的浏览器为 Google Chrome 且版本在 65 ～ 72 之间时需要执行如下操作安装插件：

1. 点击下载 [ZEGO 共享插件](https://artifact-sdk.zego.im/downloads/jZego-screen-extention.zip)，并解压。

2. 打开 Google Chrome 浏览器，单击窗口右上方的“自定义及控制 Google Chrome”按钮，选择“更多工具 > 扩展程序”。

3. 打开右上角的“开发者模式”开关，单击“加载已解压的扩展程序”，并选择已解压的“ZEGO 共享插件”文件夹，即可完成安装。

<Warning title="注意">


- 若安装了插件，则 SDK 优先选择插件形式的屏幕共享，否则使用无插件形式。

</Warning>
</Accordion>



### （可选）监听事件回调

<Accordion title="监听事件回调" defaultOpen="false">
通过调用 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on) 接口监听停止屏幕共享的 [screenSharingEnded ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#screen-sharing-ended) 回调。

<Warning title="注意">


只有推流端才能接收到该回调的通知，拉流端无法接收。

</Warning>




```javascript
zg.on('screenSharingEnded', (stream)=> {
    //do something
    console.warn('screen sharing end');

});
```
</Accordion>


### 创建屏幕共享流

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 方法创建屏幕共享流。

[createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口参数 “source” 包含的对象 “screen”，可以对屏幕捕捉采集流进行相关配置。

#### 设置音频共享

<Warning title="注意">


- 设置共享音频时，Google Chrome 浏览器只支持采集并推送系统扬声器声音（例如 PC 机上播放的音乐声），外部麦克风采集的声音需要另外推流（例如通过麦克风说话的声音）。
- 部分浏览器无法共享所有系统扬声器声音，例如：macOS 的 Google Chrome 仅能共享标签页音频，不能共享整个屏幕或制定窗口的音频。

</Warning>



通过 “screen” 对象下的 “audio” 参数可以设置是否需要共享音频。参数取值如下：

<table>

  <tbody><tr>
    <th>参数取值</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>false</td>
    <td>默认值，即不共享音频。</td>
  </tr>
  <tr>
    <td>true</td>
    <td>共享音频。不同的浏览器，开启音频共享的方式不同，请参考如下。</td>
  </tr>
</tbody></table>


<Accordion title="Google Chrome 浏览器" defaultOpen="false">
在 Google Chrome 浏览器中，“audio” 设置为 “true” 后，还需要在浏览器的弹窗中勾选“分享音频”，才能将声音推送给对端用户。开发者在选择不同的共享内容时，浏览器弹窗中的“分享音频”选项是否展示，请参考如下：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Common/web_screenSharing_audioSharing.png" /></Frame>

<table>

  <tbody><tr>
    <th>在 Google Chrome 共享内容</th>
    <th>macOS</th>
    <th>Windows</th>
  </tr>
  <tr>
    <td>整个屏幕</td>
    <td>无“分享音频”选项。</td>
    <td><p>有“分享音频”选项。</p><p>勾选此选项，整个电脑屏幕（包含其它 App）的声音都会被推送给对端用户，但不包括麦克风收录的声音。</p></td>
  </tr>
  <tr>
    <td>窗口</td>
    <td colspan="2">无“分享音频”选项。</td>
  </tr>
  <tr>
    <td>Google Chrome 标签页</td>
    <td colspan="2"><p>有“分享音频”选项。</p><p>勾选此选项，只有选择的标签页中正在发声的媒体声音（不包含静音媒体）会被推送给对端用户。</p></td>
  </tr>
</tbody></table>

<Warning title="注意">


只有勾选了“分享音频”，才能将声音推送给对端用户，拉流方才会有声音。

</Warning>
</Accordion>



<Accordion title="Microsoft Edge 浏览器" defaultOpen="false">
在 Microsoft Edge 浏览器中，“audio” 设置为 “true” 后，还需要在浏览器的弹窗中勾选“共享音频”，才能将声音推送给对端用户。开发者在选择不同的共享内容时，浏览器弹窗中的“共享音频”选项是否展示，请参考如下：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Common/web_screenSharing_audioSharing_Edge.png" /></Frame>

<table>

  <tbody><tr>
    <th>在 Microsoft Edge 共享内容</th>
    <th>macOS</th>
    <th>Windows</th>
  </tr>
  <tr>
    <td>整个屏幕</td>
    <td>无“共享音频”选项。</td>
    <td><p>有“共享音频”选项。</p><p>勾选此选项，整个电脑屏幕（包含其它 App）的声音都会被推送给对端用户，但不包括麦克风收录的声音。</p></td>
  </tr>
  <tr>
    <td>窗口</td>
    <td colspan="2">无“共享音频”选项。</td>
  </tr>
  <tr>
    <td>Microsoft Edge 标签页</td>
    <td colspan="2"><p>有“共享音频”选项。</p><p>勾选此选项，只有选择的标签页中正在发声的媒体声音（不包含静音媒体）会被推送给对端用户。</p></td>
  </tr>
</tbody></table>

<Warning title="注意">


只有勾选了“共享音频”，才能将声音推送给对端用户，拉流方才会有声音。

</Warning>
</Accordion>


<Accordion title="Firefox 浏览器" defaultOpen="false">
在 Firefox 浏览器中，共享屏幕时，“audio” 设置为 “true” 后：

- 在 Windows 中，不支持分享屏幕中的声音（浏览器网页、其它 App 等的声音），但支持将麦克风收录到的声音推送给对端用户。
- 在 macOS 中，支持分享屏幕中的声音（浏览器网页、其它 App 等的声音）、以及麦克风收录到的声音。开发者可以在浏览器中进行屏幕共享时，选择允许打开麦克风等的权限，即可分享音频。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Common/web_screenSharing_audioSharing_Firefox.png" /></Frame>
</Accordion>


<Accordion title="Safari 浏览器" defaultOpen="false">
不支持分享音频。
</Accordion>




#### 设置屏幕共享视频质量

通过 “screen” 对象下的 “videoQuality” 参数可以设置屏幕共享视频质量（分辨率、帧率和码率），该参数取值及含义如下：

<table>

<tbody><tr>
<th>取值</th>
<th>分辨率</th>
<th>帧率（fps）</th>
<th>码率（kbps）</th>
<th>应用场景</th>
</tr>
<tr>
<td>1</td>
<td>实际共享分辨率宽 × 实际共享分辨率高</td>
<td>20</td>
<td>800</td>
<td>“1” 为预设值，帧率较大，适用于对视频流畅度要求较高的场景。</td>
</tr>
<tr>
<td>2</td>
<td>实际共享分辨率宽 × 实际共享分辨率高</td>
<td>15</td>
<td>1500</td>
<td>“2” 为预设值，适用于在视频流畅度和清晰度之间取得平衡的场景。</td>
</tr>
<tr>
<td>3</td>
<td>实际共享分辨率宽 × 实际共享分辨率高</td>
<td>5</td>
<td>2000</td>
<td>“3” 为预设值，码率较大，适用于对视频清晰度要求较高的场景。</td>
</tr>
<tr>
<td>4</td>
<td>width × height</td>
<td>frameRate</td>
<td>bitrate</td>
<td>“4” 为自定义取值，适用于开发者想根据自己需要设置共享区域、帧率、码率的场景。</td>
</tr>
</tbody></table>

```javascript
const screenStream = await zg.createZegoStream({
    videoBitrate: 1500,
    screen: {
        audio: document.getElementById('isScreenAudio').value == 'yes' ? true : false,
        video: {
            quality: 4,
            frameRate: 15,
            width: document.getElementById('screenWidth').value * 1 || screen.width,
            height:  document.getElementById('screenHeight').value* 1 || screen.height
        }
    },
});
```


### 推屏幕共享流

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 方法将 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 创建的屏幕共享流推送到 ZEGO 实时音视频云。当同时推多路流时，建议只推 1 路音频，防止出现回音。

```javascript
const publisRes = zg.startPublishingStream(screenStreamId, screenStream);
```


### 观看远端屏幕共享

当屏幕共享流推送到 ZEGO 实时音视频云后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流。

### 销毁屏幕共享流

#### 停止推流

若要销毁屏幕共享流，需要先调用 [stopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 方法停止推流，否则对端画面会卡住。

```javascript
zg.stopPublishingStream(screenStreamId);
```

#### 销毁屏幕共享流

停止推流后，需要及时调用 [destroyStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 方法销毁屏幕共享流数据，释放被占用的资源。

```javascript
zg.destroyStream(screenStream);
```

## 相关文档

- [如何切换屏幕共享流和摄像头视频流？](https://doc-zh.zego.im/faq/web_switch_screen_camera)
- [如何解决 Web 平台屏幕共享的质量问题？](https://doc-zh.zego.im/faq/web_screen_share)
