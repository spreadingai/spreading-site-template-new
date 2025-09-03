# 串行方案

---

合唱各方串行加入，主唱推出一条流，包含了伴奏和人声，副唱跟着主唱的伴奏进行合唱，观众再拉由副唱发出的混流。

## 方案架构

串行方案的数据流示例如下：

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/Applications-Ktv/zego_ktv_arch_data_flow_hechang.png" />
</Frame>

串行KTV方案中按照角色划分有主唱、副唱、观众。

**主唱**

1. 登录 KTV 房间，同房间的用户可以互动
2. 播放伴奏音乐 MV，并随着音乐唱歌
3. 把伴奏音乐和自己的歌声混合，注入歌词信息后，将自己的视频画面一并从主路通道推出
4. 拉副唱的主路通道视频流，静音播放观看副唱画面
5. 拉副唱辅路通道清唱音频流，和副唱合唱

**副唱（互动观众）**

1. 登录 KTV 房间
2. 拉主唱主路通道音视频流，观看主唱画面、听主唱声音，提取歌词信息
3. 把主唱的音频混入自己的推流中，注入歌词信息后，与自己的视频画面一起从主路通道推出
4. 把自己的清唱音频流从辅路通道推出

**普通观众**

1. 登录 KTV 房间
2. 拉副唱的主路通道音视频流，观看副唱画面、听合唱的效果并提取歌词信息
3. 拉主唱的主路通道音视频流，静音播放，观看主唱视频画面

## 方案实现

串行方案主要有五个环节：K歌场景音频配置、推拉流配置、下载伴奏、媒体播放器混音，以及歌词同步等。结合实际的K歌业务、上面环节以及时序进度，本方案将实现流程分为合唱准备和合唱开始阶段。按照合唱准备和合唱开始阶段，下文将具体描述如何基于 ZEGO SDK 打造串行K歌房。

### 合唱准备

合唱准备阶段，开发者需要完成四项配置：K歌场景音频配置、推拉流配置、下载伴奏，以及媒体播放器混音。

#### K歌场景音频配置

##### 音频配置

音频编码格式需要设置为 Low3，人声流为双声道，码率为128k。

```java
ZegoAudioConfig audioConfig = new ZegoAudioConfig(ZegoAudioConfigPreset.HIGH_QUALITY);
audioConfig.codecID = ZegoAudioCodecID.LOW3;
audioConfig.channel = ZegoAudioChannel.STEREO;
mSDKEngine.setAudioConfig(audioConfig, ZegoPublishChannel.MAIN);
```

##### 音频前处理

设备外放时，可以开启 AEC(回声消除)和 ANS(噪声抑制)；带耳机时，可以考虑关闭 AEC 和 ANS。AEC 和 ANS 会对音质有一点损伤和延迟。外放时，如果发现有噪音和回声，可以考虑默认打开 AEC 和 ANS。

```objc
mSDKEngine.enableAEC(true);  //是否开启回声消除；true 表示开启；false 表示关闭
mSDKEngine.enableAGC(false);  //是否开启自动增益控制；true 表示开启；false 表示关闭
mSDKEngine.enableANS(true);  //是否开启噪声抑制；true 表示开启噪声抑制；false 表示关闭噪声抑制
mSDKEngine.setAECMode(ZegoAECMode.MEDIUM); //设置回声消除模式
mSDKEngine.setANSMode(ZegoANSMode.MEDIUM); //设置音频噪声抑制模式
mSDKEngine.enableHeadphoneMonitor(false);  //开启耳返， false: 关闭耳返
```

另外为了K歌效果好，可以考虑添加混响。混流为枚举值。详情见 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-reverb-preset)。

```java
mSDKEngine.setReverbPreset(ZegoReverbPreset.RECORDING_STUDIO); 
```

#### 推拉流配置

主唱和副唱连麦，只推一路流。

```java
mSDKEngine.startPublishingStream(getMainStreamId(),ZegoPublishChannel.MAIN);
```

#### 下载伴奏

串行方案要求本地播放伴奏，所以需要将伴奏下载到本地。
合唱示例 demo 会将下载好的歌曲信息通过房间附加消息通知给其他用户，合唱用户需要下载资源参与合唱，观众需要下载歌词用于同步展示。

```java
public void selectSong(View view) {
    if (CheckDoubleClick.isFastDoubleClick()) {
        return;
    }

    songListDialog = new SongListDialog(songId -> {
       switchMusicPlayerMenu(songId);
       // 设置房间附加消息
       ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(songId);
       RoomMusicInfo roomMusicInfo = new RoomMusicInfo();
       roomMusicInfo.setSongID(song.getSongID());
       roomMusicInfo.setSongName(song.getSongName());
       roomMusicInfo.setSingerName(song.getSingerName());
       roomMusicInfo.setAlbumImg(song.getAlbumImageUri());
       roomMusicInfo.setKrcToken(song.getKrcToken());
       ZGRealTimeKtvManager.getInstance().setRoomExtraMusic(roomMusicInfo);

       songListDialog.dismiss();
    });
    ......
}
```

实现此功能也可以使用其他方式，只需通知到位即可。收到歌曲信息后，参与合唱的用户开始下载歌曲。如何搜索歌词、展示歌单、下载歌曲和下载歌词，请参考 [ZEGO 内容中心 - 点歌](/online-ktv-android/zego-content-center/sing-songs)。

```java
public void setRoomExtraMusic(RoomMusicInfo roomMusicInfo) {
    mSDKEngine.setRoomExtraInfo(mRoomID, "RoomMusicInfo", APIBase.getGson().toJson(roomMusicInfo), null);
    FileDownloadManager.getInstance().downloadFile(roomMusicInfo.getSongID(), roomMusicInfo);
}
```

#### 媒体播放器混音

主唱的伴奏需要混到人声流里推出去，这里需要配置媒体播放器的混音接口。

```java
mediaPlayer.enableAux(true);
```

### 合唱开始

此时已经是播放音乐开始合唱了，合唱的过程中需要支持歌词同步的功能。

#### 歌词同步

##### 主唱歌词同步

主唱通过媒体播放器的回调中的进度同步歌词即可，同时需要将歌词进度通过 SEI 发送出去。

```java
public void onPlaybackProgressUpdate(ZegoMediaPlayer mediaPlayer, long progress) {
    mPlayerCurrentTimeMillis = System.currentTimeMillis();
    mPlayerCurrentProgress = progress;
    if (ZGRealTimeKtvManager.getInstance().isAnchor()) {
          long curtime = ZGRealTimeKtvManager.getInstance().getNetworkTime();
          HostSEIInfo hostSEIInfo = new HostSEIInfo();
          ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(currentPlaySongId);
          hostSEIInfo.setkTotalKey(song.getDuration());
          hostSEIInfo.setkState(0);
          // hostSEIInfo.setkRole();
          hostSEIInfo.setkProgressKey(progress);
          hostSEIInfo.setkPointTimeKey(curtime);
          hostSEIInfo.setkResourceID(song.getResourceID());
          ZGRealTimeKtvManager.getInstance().sendSEI(APIBase.getGson().toJson(hostSEIInfo).getBytes());
     }
}
```

##### 副唱歌词同步

副唱端通过解析主唱端的 SEI 中的伴奏进度进行同步歌词，同时需要将进度再次发送出去。

```java
public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
     L.i("PlayerManager", "onPlaybackProgressUpdate:progress:" + millisecond);
     ZGKTVCopyrightedSong song = getSongByResourceID(mResourceID);
     if (song != null && song.getCallback() != null) {
         song.getCallback().onPlaybackProgressUpdate(millisecond);
    }
     if (mIZGKTVPlayerUpdateListener != null) {
          mIZGKTVPlayerUpdateListener.onPlaybackProgressUpdate(mediaPlayer, millisecond);
     }
}

public void onPlaybackProgressUpdate(ZegoMediaPlayer mediaPlayer, long progress) {
       ......
       if (ZGRealTimeKtvManager.getInstance().isAnchor()) {
       ......
       updateMusicPlayerMenu();
   }
}

private void updateMusicPlayerMenu() {
    // 计算出当前播放器进度 （当前进度 = 当前时间 - 播放器回调时的时间 + 播放器进度）
    long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
    L.i(TAG, "onPlaybackProgressUpdate:" + customProgress);
    currentProgress = customProgress;
    List<ZGKTVCopyrightedSong> orderList = KTVRoomOrderSongManager.getInstance().getOrderList();
    if (orderList == null || orderList.isEmpty()) {
       return;
 }
    String songId = orderList.get(orderList.size() - 1).getSongID();
    if (songId == null || songId.isEmpty()) {
        return;
    }
    mZegoLyricView.setCurrentTimeMillis(customProgress);
    progressInterval++;
    if (progressInterval >= 2) {
        ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(songId);
        long duration = 0;
        if (song != null) {
            duration = song.getDuration();
        }
        if (duration == 0) {
            duration = ZGKTVPlayerManager.getInstance().getTotalDuration();
        }
        mMusicPlayerMenu.updateTime(customProgress, duration);
        mZegoNetworkTime = ZGRealTimeKtvManager.getInstance().getNetworkTime();
        mPlayProgress = customProgress;
        progressInterval = 0;
        mMusicPlayerMenu.getPitchView().setCurrentSongProgress(customProgress, mCurrentPitch);
    }
}
```

##### 观众端歌词同步

通过解析副唱流中的 SEI，观众端获取播放点歌用户的播放进度，以此同步歌词进度。

```java
public void onPlayerRecvSEI(String streamId, HostSEIInfo info) {
    if (!ZGRealTimeKtvManager.getInstance().isAnchor()) {
        // 观众同步歌词
        mZegoLyricView.setCurrentTimeMillis(info.getkProgressKey());
        mMusicPlayerMenu.updateTime(info.getkProgressKey(), info.getkTotalKey());
    }
}
```
