# 评分功能

---

评分功能属于在线K歌房可选部分，业务侧根据需要，可以考虑集成。通过打分，评分功能可以增加用户互动，增加趣味性。

评分功能属于正版曲库模块，无法单独使用。评分功能由版权方提供，依赖于逐字歌词，没有逐字歌词的歌曲无法评分。


<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/online_ktv_score.png" />
</Frame>

1. 客户端调用“点歌”接口通知业务后台，业务后台将歌曲信息添加到已点列表。
2. 客户端调用 ZEGO SDK 下载歌曲资源。
3. 下载完成后，客户端使用媒体播放器播放歌曲，并推流出去。
4. 通过 SDK 设置打分难度级别，开始打分。
5. 用户每唱完一句，都可以获得一次评分；最后通过 SDK 接口获得总分。

客户端、ZEGO SDK 功能职责如下：

- 客户端：

    调用点歌接口，获取歌曲信息，包括歌曲名、歌曲时长、resourceID 等。

- ZEGO SDK：

    - 提供下载歌曲资源的功能。
    - 提供设置打分级别、评分、获取总分的功能。

<br/>

针对评分功能，如果您想要了解 SDK 接口逻辑，请参考 [ZEGO 内容中心 - 进阶功能](/online-ktv-flutter/zego-content-center/advanced-features) 中的 “获取演唱分数”。

<Content />

