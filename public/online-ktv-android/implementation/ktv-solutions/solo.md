# 独唱方案

---
  
## 简介

独唱是指麦上用户独自完成演唱的 KTV 场景。搭建一个完整的独唱场景需要点歌、推拉流以及歌词同步等基础能力。

## 前提条件

在实现独唱之前，请确保：

- 已在项目中集成 ZEGO Express SDK（含版权音乐功能），详情请参考 [下载](/online-ktv-android/downloads)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

<Note title="说明">
SDK 支持 Token 鉴权。若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=ios)。
</Note>

## 角色说明

独唱场景中存在两种角色：`演唱者` 和 `观众`。

- 演唱者：
    - 演唱者推一路人声流，并开启混音，混入媒体播放器的声音。
    - 开唱后，媒体播放器播放本地音乐，演唱者通过播放进度回调发送 SEI 同步歌词给观众端。
- 观众：
    - 拉流收听歌声。
    - 解析流中 SEI 的歌曲进度信息，用于同步歌词。

## 场景实现

### 演唱者端

#### 点歌

具体实现方法请参考 [点歌 - 实现流程](/online-ktv-android/implementation/song-selection) 中的步骤 “ 初始化 SDK” 到 “ 获取歌曲资源”。

#### 获取歌词

通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口请求歌曲资源，再从返回的歌曲信息中获取 krcToken，向 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 传入 krcToken，获取逐字歌词。

```java
/** 歌曲的 songID */
String songID = "";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ; 
// 一次性获取逐行歌词
copyrightedMusic.getLrcLyric(songID, vendorID, new IZegoCopyrightedMusicGetLrcLyricCallback() {
    @Override
    public void onGetLrcLyricCallback(int errorCode, String lyrics) {
        // 成功获取歌词
    }  
});

/** 点歌时获取的 krcToken */
String krcToken = "";

// 一次性获取逐字歌词
copyrightedMusic.getKrcLyricByToken(krcToken, new IZegoCopyrightedMusicGetKrcLyricByTokenCallback() {
    @Override
    public void onGetKrcLyricByTokenCallback(int errorCode, String lyrics) {
            // 成功获取歌词
    }
});
```

<Warning title="注意">
歌词控件相关内容请参考 [歌词组件](/online-ktv-android/zego-content-center/lyrics-display-component)。
</Warning>


#### 将当前播放的歌曲音频流推送到远端

演唱者调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-publishing-stream) 开始推流，随后调用 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#enable-aux) 接口开启混流，将播放歌曲的音频流推送到远端，以供观众收听。

<Note title="说明">
实现基本的音频通话功能，将音频流推送到远端，可参考 [实时语音 - 快速开始 - 实现流程](/real-time-voice-android/quick-start/implementing-voice-call#使用步骤)。
</Note>

```java
ZegoUser user = new ZegoUser("userID");
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
roomConfig.isUserStatusNotify = true;

// 登录房间，user 信息需要与初始化版权音乐对象时传入的一致
// 如果此前已经登录过房间，此步骤应省略。
engine.loginRoom("room1", user, roomConfig);

// 将音视频流推送到远端
engine.startPublishingStream("streamID");
```
```java
/** 开启混音推流 */
mediaPlayer.enableAux(true);

/** 调整推流的音量 */
int changeVolume = 100;
mediaPlayer.setPublishVolume(volume);
```

#### 向观众端发送播放进度

演唱者通过在媒体播放器的进度回调中，调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-sei) 发送 SEI，向观众端同步歌曲的当前播放进度，详细内容请参考 [实时音视频 - 进阶功能 - 媒体补充增强信息](/real-time-video-android-java/communication/sei)。

```java
@Override
public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
    /** 推流演唱者端添加 SEI，为观众同步音乐播放进度*/
    if(mHostID == Long.parseLong(mUserInfo.userID)) {
        try {
            JSONObject localMusicProcessStatusJsonObject = new JSONObject();
            localMusicProcessStatusJsonObject.put(Constants.KEY_PROCESS_IN_MS, millisecond);
            localMusicProcessStatusJsonObject.put(Constants.KEY_Total_IN_MS, mTotalDuration);
        }
        mSDKEngine.sendSEI(localMusicProcessStatusJsonObject.toString().getBytes());
    } catch (JSONException e) {

    }
}
```
### 观众端

#### 拉流收听

观众只要通过拉流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 就可以听到歌曲的声音，不需要再去做点歌、下载、播放等的一系列操作。

```java
/** 观众端拉流ID需要与演唱者推流ID(startPublishingStream)一致 */
engine.startPlayingStream("streamID");
```

#### 观众端歌词同步

1. 获取歌词并设置

    观众端将从演唱者端获取的 krcToken 传入 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-krc-lyric-by-token)，获取逐字歌词。

    示例代码请参考本文的 [获取歌词](#获取歌词)。

    观众端也可以通过 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-shared-resource) 接口，传入演唱者端通过 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#send-extended-request) 接口请求资源时获取到的 songID（请参考 [点歌](#点歌)），获取对应的歌词信息，详情请参考 [进阶功能 - 分享歌曲](/online-ktv-android/zego-content-center/advanced-features#分享歌曲)。


2. 同步演唱者进度信息

    观众通过 [onPlayerRecvSEI](http://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-recv-sei) 回调收到 SEI 信息，获取进度信息，用于歌词同步。

    ```java
    public void onPlayerRecvSEI(String streamID, byte[] data) {
        // 这里拿到的 data 为演唱者发送调用 [sendSEI] 接口发送的 SEI 消息
        HostSEIInfo hostSEIInfo = APIBase.getGson().fromJson(new String(data), HostSEIInfo.class);
        if (mEventCallbackList != null) {
            // 处理来自演唱者端的进度信息
            mEventCallbackList.onPlayerRecvSEI(hostSEIInfo);
        }
    }
    ```

## 调用时序

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/solo_new.png" /></Frame>
