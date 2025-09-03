<Title>什么是大小流？</Title>



- - - 

我们所说的大小流即分层视频编码，分层视频编码将码流分为基本层（小流）和扩展层（大流），在推流端开启了分层视频编码后，拉流端默认会根据网络情况拉取合适的视频分层，例如网络情况较差时只拉取基本层（小流）。你可以调用 `setPlayStreamVideoType` 设置想拉取的视频分层，目前支持的类型如下：

|枚举值|说明|
|-|-|
|ZegoVideoStreamTypeDefault|根据网络状态自动选择流类型，默认值，ZEGO 会根据情况自动选择拉基本层（小流）还是扩展层（大流）|
|ZegoVideoStreamTypeSmall|基本层，小分辨率类型，即小流|
|ZegoVideoStreamTypeBig|扩展层，大分辨率类型，即大流|

以拉取扩展层（大流）为例：

**iOS** 
```objc
[[ZegoExpressEngine sharedEngine] setPlayStreamVideoType:ZegoVideoStreamTypeBig streamID:self.streamID];
[[ZegoExpressEngine sharedEngine] startPlayingStream:self.streamID canvas:playCanvas];
```


**Android** 
```java
engine.setPlayStreamVideoType(playStreamID,ZegoVideoStreamType.BIG);
engine.startPlayingStream(playStreamID);
```

**C++** 
```cpp
engine->setPlayStreamVideoType(playStreamID,ZEGO_VIDEO_STREAM_TYPE_BIG);
engine->startPlayingStream(playStreamID, &playCanvas);
```