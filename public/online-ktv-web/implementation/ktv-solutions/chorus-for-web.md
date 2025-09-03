# 合唱方案

- - -

KTV 实时合唱方案是 ZEGO 首创的 K 歌方案，有别于市面上的串行 KTV 方案，让线下 K 歌房在线上完美呈现。麦上用户可以实时参与合唱，观众也可以中途加入合唱。接下来，让我们看看如何基于 ZEGO 实时合唱方案打造线上 K 歌房。

## 方案架构

K 歌房是基于语聊房衍生发展的玩法。换而言之，K 歌离不开连麦。实时方案中推拉流架构如下：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/overview_2.png" />
</Frame>

方案中角色分为：**合唱者** 和 **观众**。

**合唱者**
1. 点播歌曲的合唱者，需要多推一路伴奏流。
2. 合唱者推一路人声流，拉麦上合唱用户的人声流，拉流调整 jitterbuffer。
3. 所有合唱者需要设置人声流、伴奏流，进行混流对齐。
4. 在推流后，点播歌曲的合唱者发起混流对齐任务。
5. 开唱后，媒体播放器播放本地音乐，合唱者通过播放进度回调同步歌词。
6. 点播歌曲的合唱者需要通过 SEI 发送歌曲进度，以便观众端同步歌词。

**观众**
1. 拉混流收听合唱。
2. 解析混流中 SEI 的歌曲进度信息，用于同步歌词。
3. 上麦后，停止拉混流，拉麦上人声流，调整 jitterbuffer。

实时方案中只有合唱用户会在本地播放伴奏。麦上用户会因为端到端传输延迟，导致收听延迟。

实时方案中需要在开唱后实时同步伴奏进度，避免因伴奏误差而增加端到端延迟。同步伴奏需要基于 NTP 时间，ZEGO Express SDK 内部带有 NTP 时间接口。不同设备的本地时钟并不一致，存在一定误差，因此需要引入 NTP 时间。同时，中途加入合唱的用户也需要同步伴奏进度，只有同步进度后，才能合唱。另外，本方案还提供了进度保障机制，以保证伴奏进度是同步的。

<Note title="说明">

- 如果没有观众，点歌用户可以不发起混流，也不需要多推一路伴奏流。
- 端到端延迟受网络影响比较大，网络越差延迟越高，麦上合唱体验就越差，但是观众收听不受影响。
- 正版曲库不属于本方案的一部分，如果开发者有自己的版权音乐也可使用实时方案。
- 为了保证伴奏同步、中途加入合唱和伴奏进度保障这三个功能的效果，以及方便开发者集成，合唱示例 Demo 将这三个功能封装成对应的接口，开发者可以直接参考集成。
</Note>

## 方案实现

实时方案主要有几个环节：推拉流配置、混流对齐配置、伴奏同步、中途加入合唱，以及伴奏进度保障。结合实际的K歌业务、上面环节以及时序进度，本方案将实现流程分为合唱准备和合唱开始阶段。按照合唱准备和合唱开始阶段，下文将具体描述如何基于 ZEGO Express SDK 打造实时 K 歌房。

合唱准备阶段，开发者需要完成 4 项配置：推拉流配置、混流对齐配置、下载伴奏、伴奏同步。

### ​ 推拉流配置

先登录房间，再推拉流。

#### 登录房间

```javaScript
const userID = 'userID-xxx'; // 用户 ID
const token = getToken(userID); // 获取 Token，业务侧自行实现获取用户 Token 接口。
const roomID = 'roomID-xxx'; // 房间 ID
await zg.loginRoom(roomID, token, { userID }, { userUpdate: true });
```

登录房间成功会触发回调 [roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-update)，推流必须在登录房间成功后进行。

#### 推流配置

当 `state =='CONNECTED' && errorCode == 0` 时，登录房间成功：

1. 点歌的合唱者调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建推流对象。

2. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，开始推流。**点歌的合唱者需要开启 SEI，用于同步歌词进度，其他合唱者不需要开启。**

3. 推流成功后，需要 [setStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-stream-alignment-property) 执行混流 NTP 时间对齐。

```javaScript
let localStream = null; // 本地视频流

async function startPublish(streamID, stream) {
    const roomID = 'roomID-xxx';
  
    const res = await zg.startPublishingStream(streamID, stream, {
        roomID,
        isSEIStart: true, // 点歌合唱者设置 true，其他合唱者设置为 false
        SEIType: 1,
        forceSynchronousNetworkTime: 1,
        videoCodec: "H264",
    }); 
}

zg.on('roomStateUpdate', aysnc (roomID, state, errorCode, extendedData) => {
    if (state === 'CONNECTED' && errorCode == 0) {
        if ('合唱者') { // 伪代码
            localStream = await zg. createZegoStream({
              camera: {
                video: false,
                audio: {
                    ANS: true,
                    AGC: true,
                    AEC: false, // 戴耳机，关闭回声消除，音质保真
                },
              },
              audioBitrate: 128,
            });
            startPublish('streamId-xx', localStream);
        } 
    }
});

zg.on('publisherStateUpdate', async({ streamID, state }) => {
    // 主唱+伴奏音流 和 合唱流 开启精准对齐
    if (state === 'PUBLISHING') {
        const result = await zg.zegoWebRTC.setStreamAlignmentProperty(localStream, 1);
    }
});
```

#### 拉流配置

为了降低延迟，麦上的合唱用户需要保持拉流配置 jitterBuffer 为默认值；而观众注重的是流畅度，可以适当提高 jitterBuffer（playoutDelayHint，单位：秒）。

- 合唱用户：0.03 （默认）。
- 观众：0.5 ～ 3。

观众在登录房间后直接拉混流，并设置 jitterbuffer。

每当房间内有用户开始推流或者停止推流时，房间内的其他用户都会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 流变更通知，麦上用户需要在 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 中处理拉流事件。

```javaScript
const roomID = ''; // 房间 ID，命名业务侧自定义
const streamIDList = []; // 合唱者流 ID 列表 + 音乐伴奏流
const mixStreamID = 'roomID-xxx'; // 混流 ID，命名业务侧自定义

const playingStream = async (remoteStreamID) => {
    const playOption = {
        resourceMode: 0,
        isSEIStart: true, // 接收 SEI，若不开启 SEI，非点唱歌者（包括听众）无法获取歌曲进度
        streamType: 0,
    };

    // 设置延迟缓冲时间，由听众不需要跟合唱者保持，适当延迟缓冲时间，使得网络质量较差听众听歌更加流畅
    if ('听众' && remoteStreamID == '混流ID') {
        playOption.playoutDelayHint = 0.5;
        const playStream = await zg.startPlayingStream(remoteStreamID, playOption);
        // 拿到 playStream 后，自行放置 audio 标签播放
    } else if ('合唱者' && remoteStreamID != '混流ID' && remoteStreamID ！= '音乐伴奏流ID') {
        try {
            const playStream = await zg.startPlayingStream(remoteStreamID, playOption);
            // 拿到 playStream 后，自行放置 audio 标签播放

            // 若为点歌者合唱者还需要将其他合唱者的流混到一个流上
            if ("点歌合唱者") {
                // 开启混流
                const res = await zg.startMixerTask({
                    taskID: `mix_${roomID}`,
                    inputList: [ ...streamIDList, '点歌合唱者流ID', '音乐伴奏流'].map((streamID) => {
                        return {
                            streamID,
                            contentType: 'AUDIO'
                        }
                    }),
                    streamAlignmentMode: 1, // 混流接口增加参数设置混流对齐模式 streamAlignmentMode，告知混流服务做 NTP 对齐处理。
                    outputList: [{
                        target: mixStreamID,
                    }]
                });
                if (res.errorCode !== 0) {
                    alert('混流失败')
                }
            }
        } catch (err) {
            console.error("startPlayingStream err", err);
        }
    } 
}

const stopingStream = async (remoteStreamID) => {
    // 删除播放流 ID 为 remoteStreamI D的 dom 节点
    await zg.stopPlayingStream(remoteStreamID);
}

zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
    if (updateType === "ADD") {
        for (const stream of streamList) {
            const remoteStreamID = stream.streamID;
            if (remoteStreamID !== mixStreamID && remoteStreamID !=='音乐伴奏流') {
                streamIDList.push(remoteStreamID);
            }
            // 保存下 remoteStreamID，便于点歌者混流
            playingStream(remoteStreamID);
        }
    } else if (updateType === "DELETE") {
        for (const stream of streamList) {
            const remoteStreamID = stream.streamID;
            if (streamIDList.indexOf(remoteStreamID) > -1) {
                // 从streamIDList中删除remoteStreamID
            }
            await stopingStream(remoteStreamID);
        }
    }
});
```

#### 多推一路伴奏

点歌的合唱者需要多推一路流。ZEGO SDK 中没有现成接口标识点歌用户，需要业务侧自行标识。

在推人声流的时候，根据角色顺带推伴奏流即可。

```javaScript
zg.on('roomStateUpdate', async (roomID, state) => {
    if (state === 'CONNECTED') {
        if ('点歌者') {
            const songPlayer = document.querySelector('audio'); // 背景音乐播放器
            let musicStream = await zg.createZegoStream({ custom: {
                audio: songPlayer
            } });
            // 混音流 
            await startPublish('音频ID', musicStream);
            // 如果音频未混流，需要自行执行混流
        }
    }
});
```

### 混流对齐配置

点歌用户会发起混流对齐任务，ZEGO 服务器会将麦上用户的人声流和自己的伴奏流对齐后混成一路流，观众拉混流收听即可。发起混流任务的时机为点歌用户推流之后。混流对齐可以节省费用。

混流对齐需要设置流对齐模式和设置混流任务的对齐模式。每当有用户下麦或者上麦，点歌用户需要更新混流任务，主要是修改需要混的流的数量。

另外，为了保证每次合唱时观众端的收听体验（即人声和伴奏是对齐的），需要在每次开唱前重推伴奏流，再次更新混流任务。

#### 设置推流对齐模式

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口时，将 [ZegoWebPublishOption](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption) 中 forceSynchronousNetworkTime 设置为 1，开始推流。

```javaScript
let localStream = null; // 本地视频流

const res = await zg.startPublishingStream(streamID, localStream, {
    roomID,
    isSEIStart: true, // 点歌合唱者设置 true，其他合唱者设置为 false
    SEIType: 1,
    forceSynchronousNetworkTime: 1, // 推流对齐参数
    videoCodec: "H264",
}); 
```

#### 混流任务设置对齐模式

点歌用户需要发起混流任务，人声和伴奏流都需要设置对齐。

在收到 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update) 流状态更新回调后，调用 [setStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-stream-alignment-property) 接口，开启混流精准对齐。

```javaScript
const roomID = ''; // 房间 ID，命名业务侧自定义
const streamIDList = []; // 合唱者流 ID 列表 + 音乐伴奏流
const mixStreamID = 'roomID-xxx'; // 混流 ID，命名业务侧自定义

zg.on('publisherStateUpdate', async({ streamID, state }) => {
    // 主唱+伴奏音流 和 合唱流 开启精准对齐
    if (state === 'PUBLISHING') {
        const result = await zg.zegoWebRTC.setStreamAlignmentProperty(localStream, 1);
        if ("点歌合唱者") {
            // 开启混流
            const res = await zg.startMixerTask({
                taskID: `mix_${roomID}`,
                inputList: [ ...streamIDList, '点歌合唱者流ID', '音乐伴奏流'].map((streamID) => {
                    return {
                        streamID,
                        contentType: 'AUDIO'
                    }
                }),
                streamAlignmentMode: 1, // 混流接口增加参数设置混流对齐模式 streamAlignmentMode，告知混流服务做 NTP 对齐处理。
                outputList: [{
                    target: mixStreamID,
                }]
            });
            if (res.errorCode !== 0) {
                alert('混流失败')
            }
        }
    }
});
```

### 下载伴奏

实时方案要求本地播放伴奏，所以需要将伴奏下载到本地。

合唱示例 Demo 会将下载好的歌曲信息通过房间附加消息通知给其他用户，合唱用户需要下载资源参与合唱，观众需要下载歌词用于同步展示。

```javaScript
let cm = null;
aysnc function getZCM() {
    if (!cm) {
        cm = zg.createCopyrightedMusic();
        await cm.initCopyrightedMusic({ user: { userID } });
    } 
    return cm;
}

const searchSong = async (keyword) => {
    const zcm = await getZCM();
    const vendorID = 2; // 0 默认音集协，1 音速达，2 音集协
    try {
        const data = await zcm.sendExtendedRequest('/search/song', {
            keyword,
            page: 1,
            filter: [1],
            vendor_id: vendorID
        });
        if (data.errorCode === 0 && data.result.code === 0) {
            let songID = null;
            data.result.data.songs.forEach((song) => {
                if (song.song_name === '目标歌曲') {
                    songID = song.song_id;
                }
            });
            const res = await zcm.requestResource({ songID, vendorID }, 1);
            if (res.errorCode === 0 && res.resource.code === 0) {
                const { errorCode, urls } = await zcm.download(res.resource.data.resources[0].resource_id);
                if (errorCode === 0) {
                    // 将 url[0] 或者 url[1] 塞进 audio 标签中，播放
                    const songPlayer = document.querySelector('audio'); // 背景音乐播放器
                    songPlayer.src = url[0];
                } else {
                    // 上报错误至后台，下架该歌曲
                }
            } else {
                alert("异常出错， 拉取歌曲失败");
            }
        }
    } catch (error) {
        alert("参数格式错误");
    }
}
```

实现此功能也可以使用其他方式，只需通知到位即可。收到歌曲信息后，参与合唱的用户开始下载歌曲。如何搜索歌词、展示歌单、下载歌曲和下载歌词，请参考 [ZEGO 内容中心 - 点歌](/online-ktv-web/zego-content-center/sing-songs)。

### 伴奏同步

完成伴奏同步后，就开始播放音乐进行合唱。

伴奏同步的做法为：点歌用户约定在未来某个时间点（如延迟 N 秒后）开始播放伴奏，然后合唱。各端的时间都以 NTP 时间为准，NTP 时间会在 ZEGO SDK 初始化后开始同步。

具体流程如下：
1. 某个合唱者发起合唱，先获取 NTP 时间 “T”，设置播放伴奏时间为 “T0（ms） = T + delay”。delay 可以是 3 秒，10 秒。
2. 将播放伴奏时间 “T0” 通过更新流附加消息接口/后台接口等发送出去。
3. 本地设置定时器等时间点到 “T0” 时刻就播放伴奏。
4. 其他合唱用户接收到发起合唱通知后执行“步骤 3”。

流程图：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/Implementation/real_time_KTV_Chorus_Synchronization_Implementation.png" />
</Frame>

在合唱示例 Demo 中，点歌用户约定好时间后，通过流附加消息通知其他合唱用户一起同步伴奏。

#### 发起合唱的用户

```javaScript
const songPlayer = document.querySelector('audio');
const interval = () => {
    // 定时获取歌词进度并同步给其他合唱者和听众
    window.clearTimeout(window.timer);

    window.timer = setTimeout(() => {
        if ('正在推流中' && '点歌合唱者' && '音乐正在播放') {
            const currentTime = (songPlayer.currentTime * 1000).toFixed(0);
            const timestamp = zg.getNetworkTimeInfo().timestamp; //  NTP 时间戳
            const info = {
                kPointTimeKey: timestamp,
                kResourceID: '正在播放的音乐标识',
                kProgressKey: currentTime,
            };

            zg.sendSEI(
                '点歌合唱者流ID',
                new TextEncoder().encode(JSON.stringify(info))
            );
        }
        interval();
    }, 100);
}

interval();
```

#### 参与合唱的用户和观众

中途加入合唱的用户，需要加入者先获取当前播放歌曲的信息，下载对应的歌曲到本地，然后解析 SEI 信息进行伴奏同步。

具体流程如下：

1. 点歌用户会在本端的播放进度回调中，通过 SEI 发送当前伴奏的播放进度 p（ms）和进度回调的 NTP 时间 t0（ms）。
2. 中途上麦后接收到房主的进度 p 和进度回调时间 t0，获取当前 NTP 时间 t1（ms）。
3. 计算需要跳转（seek）的伴奏播放进度：p0 = t1 - t0 + p。
4. 先加载伴奏，完成后再跳转 seek 到 p0 位置。如果当前房主在暂停伴奏，seek 后需要 暂停（pause）。

麦上合唱用户的进度，以点歌用户的伴奏进度为准，通过 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 监听点歌用户 SEI 中的同步伴奏信息，调节本端的伴奏进度。由于插拔耳机会导致本地伴奏进度滞后，可以以此来保证进度一致。

具体的流程如下：

1. 麦上合唱者在播放进度回调时通过 SEI 发送当前播放进度 p 和进度回调的 NTP 时间 t，同时保存进度 p' 和 NTP 时间 t'。
2. 其他合唱者接收到其他人的进度 p 和进度回调时间 t。
3. 计算进度差：md（ms） = t' - t - (p'- p)（其中 p 和 p' 不相等，需要抹去进度差）。
md > 0：本端伴奏慢
md = 0：同步
md < 0：本端伴奏快
4. 当 md > 100 毫秒时，需要 seek 的播放进度为 p = p' + md，然后同步伴奏进度。
5. 不断重复以上流程。

```javaScript
const songPlayer = document.querySelector('audio');
zg.off("playerRecvSEI");
zg.on("playerRecvSEI", (streamID, uintArray) => {
    // 接收到的 SEI 内容的前 4 bytes 代表发送的 SEI 类型， 将其转换为 number，
    // 1004 代表 payload type = 5， 1005 代表 payload type = 243
    let mediaSideInfoType = 0;
    let offset = 0;
    mediaSideInfoType = uintArray[offset++] << 24;
    mediaSideInfoType |= uintArray[offset++] << 16;
    mediaSideInfoType |= uintArray[offset++] << 8;
    mediaSideInfoType |= uintArray[offset++];

    const content = uintArray.slice(4, uintArray.length);
    const info =  JSON.parse(new TextDecoder().decode(content));

    if (info.kResourceID === '正在播放音乐标识') {
        let currentProcess = +info.kProgressKey;

        if ('合唱者') {
            const t = zg.getNetworkTimeInfo().timestamp;
            currentProcess += (t - info.kPointTimeKey);
            if ('未播放歌曲') {
                // 下载歌曲并播放，业务自行执行
                // 设置歌词
            }
        } else  {
            // 听众，设置歌词
        }

        if (songPlayer && Math.abs(songPlayer.currentTime - currentProcess/1000) > 0.1) {
            // 差距大 0.1s 则调整
            songPlayer.currentTime = currentProcess/1000;
        }

        // 同步歌曲进度

    } else {
        console.warn('歌曲资源没下载，resourceID不匹配');
    }
});
```

此时已经是播放音乐开始合唱了，合唱的过程中需要支持中途加入合唱、伴奏进度保障和​观众歌词同步的功能。这些功能的实现都需要点歌用户将伴奏进度和同步伴奏进度的信息通过 SEI 发送出去。

### ​ 歌词同步

通过媒体播放器的进度回调进行同步即可，歌词控件请参考 [下载](/online-ktv-web/downloads) 页面获取。

- 点歌合唱者通过定时获取 \<audio> 标签的进度，设置自己的歌曲进度；其他合唱者则通过 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 监听点歌合唱者的 SEI，获取的歌词进度。

- 观众端通过 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 监听解析混流中的 SEI，获取播放点歌用户的播放进度，以此同步歌词进度。

```javaScript
// player 歌词播放器，currentProcess 歌词进度
player.setCurrentTimeMillis(currentProcess);
```
