<Title>如何暂停/恢复接收房间内的流？</Title>



---


互动直播 UIKit（Live Streaming Kit） 允许暂停/恢复接收房间内的流。该操作不会影响其他用户，只在本地生效。

以 **“当应用切到后台时暂停接收房间内的流，返回前台时恢复”** 为例，示例代码如下：

```java
//添加了ZegoUIKitPrebuiltLiveStreamingFragment的Activity。
public class LiveActivity extends AppCompatActivity {
    ...
     @Override
    protected void onStart() {
        super.onStart();
        ZegoLiveStreamingManager.getInstance().unMuteAllAudioVideo();
    }

    @Override
    protected void onStop() {
        super.onStop();
        ZegoLiveStreamingManager.getInstance().muteAllAudioVideo();
    }

```