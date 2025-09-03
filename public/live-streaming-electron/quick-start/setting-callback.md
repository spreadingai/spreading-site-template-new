# 设置回调

- - -

<Warning title="注意">


此文档仅用于说明 Electron 平台的回调设置方式及参数使用方式。详细的 **功能介绍** 和 **参数说明** 请参考具体API说明。 

</Warning>



## 模块说明
Express Electron SDK的回调在多个模块进行管理。模块及其实例获取方式如下：

1. [ZegoExpressEngine](https://doc-zh.zego.im/article/21397#2_1)  

    创建 SDK 实例 zegoEngine
    ```js
    // 创建 SDK 实例 
    const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
    ```

2. [ZegoExpressMediaPlayer](https://doc-zh.zego.im/article/21397#2_2)  

    [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-media-player) --- 创建媒体播放器实例 zgMediaPlayer
    ```js
    // 创建媒体播放器实例
    const zgMediaPlayer = zgEngine.createMediaPlayer();
    ```

3. [ZegoExpressAudioEffectPlayer](https://doc-zh.zego.im/article/21397#2_3)  

    [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-audio-effect-player) --- 创建音频效果播放器实例 zgAudioEffectPlayer

    ```js
    // 创建音频效果播放器实例
    const zgAudioEffectPlayer = zgEngine.createAudioEffectPlayer();
    ```

4. [ZegoExpressScreenCaptureSource](https://doc-zh.zego.im/article/21397#2_4)  

    [createScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-screen-capture-source) --- 创建屏幕捕获源实例 zgScreenCaptureSource

    ```js
    // 创建屏幕捕获源实例
    // sourceId  {number}指定的屏幕 ID 或窗口 ID
    // sourceType  {ZegoScreenCaptureSourceType} 指定的 screen 源类型。
    const zgScreenCaptureSource = zgEngine.createScreenCaptureSource(sourceId, sourceType);
    ```

## 注册回调
### ZegoExpressEngine

<a id="onDebugError"></a> 

#### [onDebugError](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-debug-error)

使用示例：

```js
zgEngine.on("onDebugError",({errorCode,funcName,info})=>{
  console.log(`onDebugError: ${errorCode},${funcName},${info}`)
})
```

<a id="onEngineStateUpdate"></a> 

#### [onEngineStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-engine-state-update)

使用示例：

```js
zgEngine.on("onEngineStateUpdate",({state})=>{
  console.log(`onEngineStateUpdate: ${state}`)
})
```

<a id="onRecvExperimentalAPI"></a> 

#### [onRecvExperimentalAPI](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-recv-experimental-api)

使用示例：

```js
zgEngine.on("onRecvExperimentalAPI",({content})=>{
  console.log(`onRecvExperimentalAPI: ${content}`)
})
```

<a id="onRoomStateUpdate"></a> 

#### [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-state-update)

使用示例：

```js
zgEngine.on("onRoomStateUpdate",({roomID,state,errorCode,extendedData})=>{
  console.log(`onRoomStateUpdate: ${roomID},${state},${errorCode},${extendedData}`)
})
```

<a id="onRoomStateChanged"></a> 

#### [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-state-changed)

使用示例：

```js
zgEngine.on("onRoomStateChanged",({roomID,reason,errorCode,extendedData})=>{
  console.log(`onRoomStateChanged: ${roomID},${reason},${errorCode},${extendedData}`)
})
```

<a id="onRoomUserUpdate"></a> 

#### [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-user-update)

使用示例：

```js
zgEngine.on("onRoomUserUpdate",({roomID,updateType,userList})=>{
  console.log(`onRoomUserUpdate: ${roomID},${updateType},${userList}`)
})
```

<a id="onRoomOnlineUserCountUpdate"></a> 

#### [onRoomOnlineUserCountUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-online-user-count-update)

使用示例：

```js
zgEngine.on("onRoomOnlineUserCountUpdate",({roomID,count})=>{
  console.log(`onRoomOnlineUserCountUpdate: ${roomID},${count}`)
})
```

<a id="onRoomStreamUpdate"></a> 

#### [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-stream-update)

使用示例：

```js
zgEngine.on("onRoomStreamUpdate",({roomID,updateType,streamList,extendedData})=>{
  console.log(`onRoomStreamUpdate: ${roomID},${updateType},${streamList},${extendedData}`)
})
```

<a id="onRoomStreamExtraInfoUpdate"></a> 

#### [onRoomStreamExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-stream-extra-info-update)

使用示例：

```js
zgEngine.on("onRoomStreamExtraInfoUpdate",({roomID,streamList})=>{
  console.log(`onRoomStreamExtraInfoUpdate: ${roomID},${streamList}`)
})
```

<a id="onRoomExtraInfoUpdate"></a> 

#### [onRoomExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-extra-info-update)

使用示例：

```js
zgEngine.on("onRoomExtraInfoUpdate",({roomID,roomExtraInfoList})=>{
  console.log(`onRoomExtraInfoUpdate: ${roomID},${roomExtraInfoList}`)
})
```

<a id="onRoomTokenWillExpire"></a> 

#### [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-token-will-expire)

使用示例：

```js
zgEngine.on("onRoomTokenWillExpire",({roomID,remainTimeInSecond})=>{
  console.log(`onRoomTokenWillExpire: ${roomID},${remainTimeInSecond}`)
})
```

<a id="onPublisherStateUpdate"></a> 

#### [onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-state-update)

使用示例：

```js
zgEngine.on("onPublisherStateUpdate",({streamID,state,errorCode,extendedData})=>{
  console.log(`onPublisherStateUpdate: ${streamID},${state},${errorCode},${extendedData}`)
})
```

<a id="onPublisherQualityUpdate"></a> 

#### [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-quality-update)

使用示例：

```js
zgEngine.on("onPublisherQualityUpdate",({streamID,quality})=>{
  console.log(`onPublisherQualityUpdate: ${streamID},${quality}`)
})
```

<a id="onPublisherCapturedAudioFirstFrame"></a> 

#### [onPublisherCapturedAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-captured-audio-first-frame)

使用示例：

```js
zgEngine.on("onPublisherCapturedAudioFirstFrame",()=>{
  console.log(`onPublisherCapturedAudioFirstFrame: `)
})
```

<a id="onPublisherCapturedVideoFirstFrame"></a> 

#### [onPublisherCapturedVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-captured-video-first-frame)

使用示例：

```js
zgEngine.on("onPublisherCapturedVideoFirstFrame",({channel})=>{
  console.log(`onPublisherCapturedVideoFirstFrame: ${channel}`)
})
```

<a id="onPublisherSendAudioFirstFrame"></a> 

#### [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-send-audio-first-frame)

使用示例：

```js
zgEngine.on("onPublisherSendAudioFirstFrame",({channel})=>{
  console.log(`onPublisherSendAudioFirstFrame: ${channel}`)
})
```

<a id="onPublisherSendVideoFirstFrame"></a> 

#### [onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-send-video-first-frame)

使用示例：

```js
zgEngine.on("onPublisherSendVideoFirstFrame",({channel})=>{
  console.log(`onPublisherSendVideoFirstFrame: ${channel}`)
})
```

<a id="onPublisherVideoSizeChanged"></a> 

#### [onPublisherVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-video-size-changed)

使用示例：

```js
zgEngine.on("onPublisherVideoSizeChanged",({width,height,channel})=>{
  console.log(`onPublisherVideoSizeChanged: ${width},${height},${channel}`)
})
```

<a id="onPublisherRelayCDNStateUpdate"></a> 

#### [onPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-publisher-relay-cdn-state-update)

使用示例：

```js
zgEngine.on("onPublisherRelayCDNStateUpdate",({streamID,infoList})=>{
  console.log(`onPublisherRelayCDNStateUpdate: ${streamID},${infoList}`)
})
```

<a id="onVideoObjectSegmentationStateChanged"></a> 

#### [onVideoObjectSegmentationStateChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-video-object-segmentation-state-changed)

使用示例：

```js
zgEngine.on("onVideoObjectSegmentationStateChanged",({state,channel,errorCode})=>{
  console.log(`onVideoObjectSegmentationStateChanged: ${state},${channel},${errorCode}`)
})
```

<a id="onPlayerStateUpdate"></a> 

#### [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-state-update)

使用示例：

```js
zgEngine.on("onPlayerStateUpdate",({streamID,state,errorCode,extendedData})=>{
  console.log(`onPlayerStateUpdate: ${streamID},${state},${errorCode},${extendedData}`)
})
```

<a id="onPlayerQualityUpdate"></a> 

#### [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-quality-update)

使用示例：

```js
zgEngine.on("onPlayerQualityUpdate",({streamID,quality})=>{
  console.log(`onPlayerQualityUpdate: ${streamID},${quality}`)
})
```

<a id="onPlayerMediaEvent"></a> 

#### [onPlayerMediaEvent](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-media-event)

使用示例：

```js
zgEngine.on("onPlayerMediaEvent",({streamID,event})=>{
  console.log(`onPlayerMediaEvent: ${streamID},${event}`)
})
```

<a id="onPlayerRecvAudioFirstFrame"></a> 

#### [onPlayerRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-recv-audio-first-frame)

使用示例：

```js
zgEngine.on("onPlayerRecvAudioFirstFrame",({streamID})=>{
  console.log(`onPlayerRecvAudioFirstFrame: ${streamID}`)
})
```

<a id="onPlayerRecvVideoFirstFrame"></a> 

#### [onPlayerRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-recv-video-first-frame)

使用示例：

```js
zgEngine.on("onPlayerRecvVideoFirstFrame",({streamID})=>{
  console.log(`onPlayerRecvVideoFirstFrame: ${streamID}`)
})
```

<a id="onPlayerRenderVideoFirstFrame"></a> 

#### [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-render-video-first-frame)

使用示例：

```js
zgEngine.on("onPlayerRenderVideoFirstFrame",({streamID})=>{
  console.log(`onPlayerRenderVideoFirstFrame: ${streamID}`)
})
```

<a id="onPlayerVideoSizeChanged"></a> 

#### [onPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-video-size-changed)

使用示例：

```js
zgEngine.on("onPlayerVideoSizeChanged",({streamID,width,height})=>{
  console.log(`onPlayerVideoSizeChanged: ${streamID},${width},${height}`)
})
```

<a id="onPlayerRecvSEI"></a> 

#### [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-recv-sei)

使用示例：

```js
zgEngine.on("onPlayerRecvSEI",({streamID,data})=>{
  console.log(`onPlayerRecvSEI: ${streamID},${data}`)
})
```

<a id="onPlayerSyncRecvSEI"></a> 

#### [onPlayerSyncRecvSEI](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-player-sync-recv-sei)

使用示例：

```js
zgEngine.on("onPlayerSyncRecvSEI",({streamID,data})=>{
  console.log(`onPlayerSyncRecvSEI: ${streamID},${data}`)
})
```

<a id="onAudioDeviceStateChanged"></a> 

#### [onAudioDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-audio-device-state-changed)

使用示例：

```js
zgEngine.on("onAudioDeviceStateChanged",({updateType,deviceType,deviceInfo})=>{
  console.log(`onAudioDeviceStateChanged: ${updateType},${deviceType},${deviceInfo}`)
})
```

<a id="onAudioDeviceVolumeChanged"></a> 

#### [onAudioDeviceVolumeChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-audio-device-volume-changed)

使用示例：

```js
zgEngine.on("onAudioDeviceVolumeChanged",({deviceType,deviceID,volume})=>{
  console.log(`onAudioDeviceVolumeChanged: ${deviceType},${deviceID},${volume}`)
})
```

<a id="onVideoDeviceStateChanged"></a> 

#### [onVideoDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-video-device-state-changed)

使用示例：

```js
zgEngine.on("onVideoDeviceStateChanged",({updateType,deviceInfo})=>{
  console.log(`onVideoDeviceStateChanged: ${updateType},${deviceInfo}`)
})
```

<a id="onCapturedSoundLevelUpdate"></a> 

#### [onCapturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-captured-sound-level-update)

使用示例：

```js
zgEngine.on("onCapturedSoundLevelUpdate",({soundLevel})=>{
  console.log(`onCapturedSoundLevelUpdate: ${soundLevel}`)
})
```

<a id="onCapturedSoundLevelInfoUpdate"></a> 

#### [onCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-captured-sound-level-info-update)

使用示例：

```js
zgEngine.on("onCapturedSoundLevelInfoUpdate",({soundLevelInfo})=>{
  console.log(`onCapturedSoundLevelInfoUpdate: ${soundLevelInfo}`)
})
```

<a id="onRemoteSoundLevelUpdate"></a> 

#### [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-sound-level-update)

使用示例：

```js
zgEngine.on("onRemoteSoundLevelUpdate",({soundLevels})=>{
  console.log(`onRemoteSoundLevelUpdate: ${soundLevels}`)
})
```

<a id="onLocalCaptureVideoData"></a> 

#### [onLocalCaptureVideoData](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-local-capture-video-data)

使用示例：

```js
zgEngine.on("onLocalCaptureVideoData",({videoParam})=>{
  console.log(`onLocalCaptureVideoData: ${videoParam}`)
})
```

<a id="onRemotePlayVideoData"></a> 

#### [onRemotePlayVideoData](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-play-video-data)

使用示例：

```js
zgEngine.on("onRemotePlayVideoData",({videoParam})=>{
  console.log(`onRemotePlayVideoData: ${videoParam}`)
})
```

<a id="onRemoteSoundLevelInfoUpdate"></a> 

#### [onRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-sound-level-info-update)

使用示例：

```js
zgEngine.on("onRemoteSoundLevelInfoUpdate",({soundLevelInfos})=>{
  console.log(`onRemoteSoundLevelInfoUpdate: ${soundLevelInfos}`)
})
```

<a id="onCapturedAudioSpectrumUpdate"></a> 

#### [onCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-captured-audio-spectrum-update)

使用示例：

```js
zgEngine.on("onCapturedAudioSpectrumUpdate",({audioSpectrum})=>{
  console.log(`onCapturedAudioSpectrumUpdate: ${audioSpectrum}`)
})
```

<a id="onRemoteAudioSpectrumUpdate"></a> 

#### [onRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-audio-spectrum-update)

使用示例：

```js
zgEngine.on("onRemoteAudioSpectrumUpdate",({audioSpectrums})=>{
  console.log(`onRemoteAudioSpectrumUpdate: ${audioSpectrums}`)
})
```

<a id="onLocalDeviceExceptionOccurred"></a> 

#### [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-local-device-exception-occurred)

使用示例：

```js
zgEngine.on("onLocalDeviceExceptionOccurred",({exceptionType,deviceType,deviceID})=>{
  console.log(`onLocalDeviceExceptionOccurred: ${exceptionType},${deviceType},${deviceID}`)
})
```

<a id="onRemoteCameraStateUpdate"></a> 

#### [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-camera-state-update)

使用示例：

```js
zgEngine.on("onRemoteCameraStateUpdate",({streamID,state})=>{
  console.log(`onRemoteCameraStateUpdate: ${streamID},${state}`)
})
```

<a id="onRemoteMicStateUpdate"></a> 

#### [onRemoteMicStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-mic-state-update)

使用示例：

```js
zgEngine.on("onRemoteMicStateUpdate",({streamID,state})=>{
  console.log(`onRemoteMicStateUpdate: ${streamID},${state}`)
})
```

<a id="onRemoteSpeakerStateUpdate"></a> 

#### [onRemoteSpeakerStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-remote-speaker-state-update)

使用示例：

```js
zgEngine.on("onRemoteSpeakerStateUpdate",({streamID,state})=>{
  console.log(`onRemoteSpeakerStateUpdate: ${streamID},${state}`)
})
```

<a id="onAudioVADStateUpdate"></a> 

#### [onAudioVADStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-audio-vad-state-update)

使用示例：

```js
zgEngine.on("onAudioVADStateUpdate",({type,state})=>{
  console.log(`onAudioVADStateUpdate: ${type},${state}`)
})
```

<a id="onIMRecvBroadcastMessage"></a> 

#### [onIMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-im-recv-broadcast-message)

使用示例：

```js
zgEngine.on("onIMRecvBroadcastMessage",({roomID,messageList})=>{
  console.log(`onIMRecvBroadcastMessage: ${roomID},${messageList}`)
})
```

<a id="onIMRecvBarrageMessage"></a> 

#### [onIMRecvBarrageMessage](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-im-recv-barrage-message)

使用示例：

```js
zgEngine.on("onIMRecvBarrageMessage",({roomID,messageList})=>{
  console.log(`onIMRecvBarrageMessage: ${roomID},${messageList}`)
})
```

<a id="onIMRecvCustomCommand"></a> 

#### [onIMRecvCustomCommand](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-im-recv-custom-command)

使用示例：

```js
zgEngine.on("onIMRecvCustomCommand",({roomID,fromUser,command})=>{
  console.log(`onIMRecvCustomCommand: ${roomID},${fromUser},${command}`)
})
```

<a id="onCapturedDataRecordStateUpdate"></a> 

#### [onCapturedDataRecordStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-captured-data-record-state-update)

使用示例：

```js
zgEngine.on("onCapturedDataRecordStateUpdate",({state,errorCode,config,channel})=>{
  console.log(`onCapturedDataRecordStateUpdate: ${state},${errorCode},${config},${channel}`)
})
```

<a id="onCapturedDataRecordProgressUpdate"></a> 

#### [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-captured-data-record-progress-update)

使用示例：

```js
zgEngine.on("onCapturedDataRecordProgressUpdate",({progress,config,channel})=>{
  console.log(`onCapturedDataRecordProgressUpdate: ${progress},${config},${channel}`)
})
```

<a id="onNetworkModeChanged"></a> 

#### [onNetworkModeChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-network-mode-changed)

使用示例：

```js
zgEngine.on("onNetworkModeChanged",({mode})=>{
  console.log(`onNetworkModeChanged: ${mode}`)
})
```

<a id="onNetworkSpeedTestError"></a> 

#### [onNetworkSpeedTestError](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-network-speed-test-error)

使用示例：

```js
zgEngine.on("onNetworkSpeedTestError",({errorCode,type})=>{
  console.log(`onNetworkSpeedTestError: ${errorCode},${type}`)
})
```

<a id="onNetworkSpeedTestQualityUpdate"></a> 

#### [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-network-speed-test-quality-update)

使用示例：

```js
zgEngine.on("onNetworkSpeedTestQualityUpdate",({quality,type})=>{
  console.log(`onNetworkSpeedTestQualityUpdate: ${quality},${type}`)
})
```

<a id="onDownloadProgressUpdate"></a> 

#### [onDownloadProgressUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-download-progress-update)

使用示例：

```js
zgEngine.on("onDownloadProgressUpdate",({resourceID,progressRate})=>{
  console.log(`onDownloadProgressUpdate: ${resourceID},${progressRate}`)
})
```

<a id="onCurrentPitchValueUpdate"></a> 

#### [onCurrentPitchValueUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-current-pitch-value-update)

使用示例：

```js
zgEngine.on("onCurrentPitchValueUpdate",({resourceID,currentDuration,pitchValue})=>{
  console.log(`onCurrentPitchValueUpdate: ${resourceID},${currentDuration},${pitchValue}`)
})
```


### ZegoExpressMediaPlayer
<a id="onMediaPlayerStateUpdate"></a> 

#### [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-state-update)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerStateUpdate",({state,errorCode})=>{
  console.log(`onMediaPlayerStateUpdate: ${state},${errorCode}`)
})
```

<a id="onMediaPlayerNetworkEvent"></a> 

#### [onMediaPlayerNetworkEvent](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-network-event)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerNetworkEvent",({networkEvent})=>{
  console.log(`onMediaPlayerNetworkEvent: ${networkEvent}`)
})
```

<a id="onMediaPlayerPlayingProgress"></a> 

#### [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-playing-progress)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerPlayingProgress",({millisecond})=>{
  console.log(`onMediaPlayerPlayingProgress: ${millisecond}`)
})
```

<a id="onMediaPlayerRenderingProgress"></a> 

#### [onMediaPlayerRenderingProgress](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-rendering-progress)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerRenderingProgress",({millisecond})=>{
  console.log(`onMediaPlayerRenderingProgress: ${millisecond}`)
})
```

<a id="onMediaPlayerVideoSizeChanged"></a> 

#### [onMediaPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-video-size-changed)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerVideoSizeChanged",({width,height})=>{
  console.log(`onMediaPlayerVideoSizeChanged: ${width},${height}`)
})
```

<a id="onMediaPlayerLoadResource"></a> 

#### [onMediaPlayerLoadResource](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-load-resource)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerLoadResource",({errorCode,seq})=>{
  console.log(`onMediaPlayerLoadResource: ${errorCode},${seq}`)
})
```

<a id="onMediaPlayerVideoData"></a> 

#### [onMediaPlayerVideoData](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-video-data)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerVideoData",({videoParam})=>{
  console.log(`onMediaPlayerVideoData: ${videoParam}`)
})
```

<a id="onMediaPlayerRecvSEI"></a> 

#### [onMediaPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-recv-sei)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerRecvSEI",({data})=>{
  console.log(`onMediaPlayerRecvSEI: ${data}`)
})
```

<a id="onMediaPlayerSoundLevelUpdate"></a> 

#### [onMediaPlayerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-sound-level-update)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerSoundLevelUpdate",({soundLevel})=>{
  console.log(`onMediaPlayerSoundLevelUpdate: ${soundLevel}`)
})
```

<a id="onMediaPlayerFrequencySpectrumUpdate"></a> 

#### [onMediaPlayerFrequencySpectrumUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-frequency-spectrum-update)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerFrequencySpectrumUpdate",({spectrumList})=>{
  console.log(`onMediaPlayerFrequencySpectrumUpdate: ${spectrumList}`)
})
```

<a id="onMediaPlayerFirstFrameEvent"></a> 

#### [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-first-frame-event)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerFirstFrameEvent",({event})=>{
  console.log(`onMediaPlayerFirstFrameEvent: ${event}`)
})
```

<a id="onMediaPlayerLocalCache"></a> 

#### [onMediaPlayerLocalCache](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-local-cache)

使用示例：

```js
zgMediaPlayer.on("onMediaPlayerLocalCache",({errorCode,resource,cachedFile})=>{
  console.log(`onMediaPlayerLocalCache: ${errorCode},${resource},${cachedFile}`)
})
```

### ZegoExpressAudioEffectPlayer

<a id="onAudioEffectPlayStateUpdate"></a> 

#### [onAudioEffectPlayStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoAudioEffectPlayer#on-audio-effect-play-state-update)

使用示例：

```js
zgAudioEffectPlayer.on("onAudioEffectPlayStateUpdate",({audioEffectID,state,errorCode})=>{
  console.log(`onAudioEffectPlayStateUpdate: ${audioEffectID},${state},${errorCode}`)
})
```

### ZegoExpressScreenCaptureSource

<a id="onExceptionOccurred"></a> 

#### [onExceptionOccurred](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoScreenCaptureSource#on-exception-occurred)

使用示例：

```js
zgScreenCaptureSource.on("onExceptionOccurred",({exceptionType})=>{
  console.log(`onExceptionOccurred: ${exceptionType}`)
})
```

<a id="onWindowStateChanged"></a> 

#### onWindowStateChanged

<Note title="说明">


  - 支持版本：3.4.0 及以上。
  - 注意事项：调用接口 [on] 设置后该回调才生效,需要取消回调请参考[取消回调](https://doc-zh.zego.im/article/21397#取消回调)
  - 使用限制：只适用于 Windows/macOS


</Note>





- 使用示例：

    ```js
    zgScreenCaptureSource.on("onWindowStateChanged",({source,windowState,windowRect})=>{
      console.log(`onWindowStateChanged: ${source},${windowState},${windowRect}`)
    })
    ```

- 回调触发时机： 采集目标窗口状态发生改变。

- 参数信息：


| 参数 | 类型 | 描述 |
| ---- | ---- | ---- |
| source | [ZegoAudioSourceType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~enum~ZegoAudioSourceType) |  回调的屏幕采集源实例。|
| windowState | **ZegoScreenCaptureWindowState** | 采集的窗口状态 |
| windowRect | [ZegoRect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoRect) | 采集的窗口矩形 |

<Note title="说明">


**ZegoScreenCaptureWindowState**  屏幕采集源窗口状态

属性：

- ZegoScreenCaptureWindowStateOnScreen:
  > ZegoScreenCaptureWindowStateOnScreen = (0)  
  > 窗口处于当前屏幕，坐标区域更改。

- ZegoScreenCaptureWindowStateOffScreen:
  > ZegoScreenCaptureWindowStateOffScreen = (1)  
  > 窗口离开当前屏幕，暂停采集。

- ZegoScreenCaptureWindowStateDestroy:
  > ZegoScreenCaptureWindowStateDestroy = (2)  
  > 窗口被销毁。


</Note>



<a id="onRectChanged"></a> 

#### onRectChanged

<Note title="说明">



  - 支持版本：3.7.0 及以上。
  - 注意事项：调用接口 [on] 设置后该回调才生效,需要取消回调请参考[取消回调](https://doc-zh.zego.im/article/21397#取消回调)
  - 使用限制：只适用于 Windows/macOS


</Note>



- 使用示例：

    ```js
    zgScreenCaptureSource.on("onRectChanged",({source,captureRect})=>{
      console.log(`onRectChanged: ${source},${captureRect}`)
    })
    ```

- 回调触发时机： 采集区域发生改变。

- 参数信息：

| 参数 | 类型 | 描述 |
| ---- | ---- | ---- |
| source | [ZegoAudioSourceType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~enum~ZegoAudioSourceType) |  回调的屏幕采集源实例。|
| captureRect | [ZegoRect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoRect) | 采集的区域矩形 |



## 取消回调


取消注册的回调，可以通过 `off`和 `removeAllListeners` 方法取消注册的回调。

| 方法 | 参数 | 描述 |
| ---- | ---- | ---- |
| off | eventName,listener | 取消指定事件的注册的回调 |
| removeAllListeners | eventName | 取消指定事件所有注册的回调 |

<Warning title="注意">


on方法同一事件可以注册多个回调，当使用 on 注册 匿名函数回调时，只能使用removeAllListeners方法取消所有回调。

</Warning>




**取消回调示例**

以下使用zgEngine的onDebugError事件为例，

使用`off`方法取消`"onDebugError"`注册的`Listener`回调。
```js
const Listener = ({errorCode,funcName,info})=>{
  console.log(`onDebugError: ${errorCode},${funcName},${info}`)
}

zgEngine.on("onDebugError",Listener)

zgEngine.off("onDebugError",Listener)
```

使用`removeAllListeners`方法取消`"onDebugError"`所有注册的回调。


```js
zgEngine.removeAllListeners("onDebugError")
```

<Content />

