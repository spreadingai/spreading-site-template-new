<Title>如何调节摄像头的焦距（变焦功能）？</Title>





ZEGO 提供摄像头变焦功能，通过 SDK 设置摄像头的变焦倍数，可实现拍摄时放大远方物体的效果。

### 使用步骤

#### 获取摄像头最大变焦倍数

调用 `getCameraMaxZoomFactor` 接口获取摄像头的最大变焦倍数，接口仅在成功启动摄像头后生效。推荐在收到 `onPublisherCapturedVideoFirstFrame` 回调后调用。


- iOS

```objc
- (void)onPublisherCapturedVideoFirstFrame:(ZegoPublishChannel)channel {
    self.maxZoomFactor = [[ZegoExpressEngine sharedEngine] getCameraMaxZoomFactor];
}
```

- Android

```java
ZegoExpressEngine.getEngine().setEventHandler(new IZegoEventHandler() {
    @Override
    public void onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel) {
    	float maxZoomFactor=ZegoExpressEngine.getEngine().getCameraMaxZoomFactor();
    }
});
``` 

- uni-app

```javascript
this.engine.on("publisherCapturedVideoFirstFrame", (channel) => {
    let maxZoomFactor = this.engine.getCameraMaxZoomFactor();
});
``` 

#### 设置摄像头变焦倍数

调用 `setCameraZoomFactor` 接口设置摄像头的变焦倍数，最小值为 “1.0”，最大值可从 `getCameraMaxZoomFactor` 接口获取。

<Warning title="注意">


摄像头重新启动时，比如切换前后摄像头、禁用摄像头后重启摄像头、设置镜像等，变焦倍数会恢复初始值。

</Warning>



- iOS

```objc
[[ZegoExpressEngine sharedEngine] setCameraZoomFactor:self.maxZoomFactor];
```

- Android

```java
ZegoExpressEngine.getEngine().setCameraZoomFactor(maxZoomFactor);
```

- uni-app

```javascript
this.engine.setCameraZoomFactor(maxZoomFactor);
```
