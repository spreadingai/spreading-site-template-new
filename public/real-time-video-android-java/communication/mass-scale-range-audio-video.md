# 万人范围音视频

- - -


## 功能简介

ZEGO Express SDK 从 3.0.0 版本起，新增万人范围音视频功能，支持超大规模的范围音视频互动场景。云端服务基于用户位置动态选路，保持虚拟场景沉浸式互动体验的同时大量减少客户音视频成本。
此能力依赖多人状态实时同步服务，根据云端用户位置自动拉取收听范围内的远端音视频并提供空间音效，用户默认拉取距离最近的 12 路（可配置）音视频。单场景内支持 1 万个用户同时开启麦克风及摄像头。

大型虚拟世界中，用户一般不需要感知距离较远的远端用户，ZEGO 提供 AOI（Area Of Interest）能力，减免用户可见范围外的远端音视频信息，减少不必要的用户端流量及性能消耗。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/express_AOI.png" /></Frame>

### 概念解释

- 场景：用户需要先登录场景，进入同一个场景的用户，才可以进行范围音视频通话以及使用多人状态实时同步服务。
- 收听范围：本端用户音视频的接收范围，本端用户自动拉取收听范围内远端用户的音视频。
- AOI（Area of interest） 范围：用户感兴趣区域（正方形），在虚拟场景中一般为用户的可视范围，该范围实时跟随用户的位置，仅接收 AOI 范围内远端用户的音视频信息、网络状态、设备状态等。

### 应用场景

虚拟办公、虚拟会展、开放虚拟世界等虚拟场景。



## 前提条件

<Warning title="注意">


使用该服务会产生相应的费用，请联系 ZEGO 商务人员了解具体的费用情况。
</Warning>

在实现实时范围音视频前，请确保：
- 已联系 ZEGO 技术支持进行特殊编包，并开通万人范围音视频服务。
- 已在项目中集成 ZEGO Express SDK。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。


## 实现流程

下图为 API 接口调用时序图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/rangeScene.png" /></Frame>

下文详细介绍各 API 接口的对应实现步骤。

### 1 创建引擎

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。

```java
/** 定义 SDK 引擎对象 */
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
/** 请通过官网注册获取，格式为 123456789L */
profile.appID = appID;
/** 64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123" */
profile.appSign = appSign;
/** 通用场景接入 */
profile.scenario = ZegoScenario.DEFAULT;
/** 设置app的application 对象 */
profile.application = getApplication();
/** 创建引擎 */
engine = ZegoExpressEngine.createEngine(profile, null);
```


### 2 创建范围场景模块

调用 [createRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-range-scene) 接口创建范围场景实例，当前只支持同时创建一个实例，超出后将返回 null。

```java
/** 定义范围场景对象 */
ZegoRangeScene rangeScene;

/** 创建范围场景 */
rangeScene = engine.createRangeScene();
```

### 3 监听范围场景事件回调

您可以根据需要调用 [ZegoRangeSceneStream.setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeSceneStream#set-event-handler) 接口分别设置范围场景、范围场景流管理事件回调，用于监听范围场景、范围场景流管理事件回调。

```java
/** 设置范围场景事件回调 */
rangeScene.setEventHandler(new IZegoRangeSceneEventHandler() {
    @Override
    public void onSceneStateUpdate(ZegoRangeScene rangeScene, ZegoSceneState state, int errorCode) {
        super.onSceneStateUpdate(rangeScene, state, errorCode);
    }

    @Override
    public void onEnterView(ZegoRangeScene rangeScene, ZegoUser user, ZegoPosition position) {
        super.onEnterView(rangeScene, user, position);
    }

    @Override
    public void onLeaveView(ZegoRangeScene rangeScene, String userID) {
        super.onLeaveView(rangeScene, userID);
    }

    // 无需关注
    @Override
    public void onUserStatusUpdate(ZegoRangeScene rangeScene, String userID, ZegoPosition position, int channel, byte[] status) {
        super.onUserStatusUpdate(rangeScene, userID, position, channel, status);
    }

    // 无需关注
    @Override
    public void onUserCommandUpdate(ZegoRangeScene rangeScene, String userID, ZegoPosition position, int channel, byte[] command) {
        super.onUserCommandUpdate(rangeScene, userID, position, channel, command);
    }

    // 无需关注
    @Override
    public void onCustomCommandUpdate(ZegoRangeScene rangeScene, byte[] command) {
        super.onCustomCommandUpdate(rangeScene, command);
    }
});

/** 范围场景流管理事件回调 */
rangeScene.getRangeSceneStream().setEventHandler(new IZegoRangeSceneStreamEventHandler() {
    @Override
    public void onUserStreamStateUpdate(ZegoRangeScene rangeScene, String userID, String streamID, ZegoStreamState state) {
        super.onUserStreamStateUpdate(rangeScene, userID, streamID, state);
    }

    @Override
    public void onUserMicUpdate(ZegoRangeScene rangeScene, String userID, ZegoDeviceState state) {
        super.onUserMicUpdate(rangeScene, userID, state);
    }

    @Override
    public void onUserCameraUpdate(ZegoRangeScene rangeScene, String userID, ZegoDeviceState state) {
        super.onUserCameraUpdate(rangeScene, userID, state);
    }

    @Override
    public void onUserSpeakerUpdate(ZegoRangeScene rangeScene, String userID, ZegoDeviceState state) {
        super.onUserSpeakerUpdate(rangeScene, userID, state);
    }
});
```

### 4 设置范围场景流管理参数

您可以根据需要调用 [setReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeSceneStream#set-receive-range) 以及 [enableRangeSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeSceneStream#enable-range-spatializer) 接口设置范围场景参数，控制当前用户音视频的接收范围、设置 3D 音效距离的衰减范围区间 [min, max]、是否开启 3D 音效。

<Warning title="注意">


当前用户实际拉流范围受“音视频的接收范围”和“AOI 范围”影响，当远端用户在当前用户的“AOI 范围”内时，假设二者“绝对距离”为 r，“音视频的接受范围”为 R，即当 r < R 时，ZEGO Express SDK 将会主动拉取远端用户的音视频流。
</Warning>

```java
/** 设置拉流最大接收范围 */
int errorCode = rangeScene.getRangeSceneStream().setReceiveRange(reciveRange);

/** （可选）进一步设置 3D 音效的衰减范围区间 [min, max] */
/** 距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音 */
ZegoReceiveRangeParam param = new ZegoReceiveRangeParam();
param.min = reciveRangeMin;
param.max = reciveRangeMax;
int errorCode = rangeScene.getRangeSceneStream().setReceiveRange(param);

/** 开启 3D 音效 */
int error = rangeScene.getRangeSceneStream().enableRangeSpatializer(enable);
```

### 5 登录场景

调用 [loginScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeScene#login-scene) 接口，传入场景参数：`sceneID`、`user`、`position`、`broadcastMode`，即可登录场景。

<Warning title="注意">


- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录场景失败。
</Warning>

```java
/** 登录场景参数 */
ZegoSceneParam param = new ZegoSceneParam();
/** 创建用户 */
ZegoUser user = new ZegoUser(userID, userName);
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position = new ZegoPosition()
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = coordinate[i];
    position.motionOrientation.axisForward[i] = rotateMatrixFront[i];
    position.motionOrientation.axisRight[i] = rotateMatrixRight[i];
    position.motionOrientation.axisUp[i] = rotateMatrixUp[i];
    position.cameraOrientation.axisForward[i] = rotateMatrixFront[i];
    position.cameraOrientation.axisRight[i] = rotateMatrixRight[i];
    position.cameraOrientation.axisUp[i] = rotateMatrixUp[i];
}
/** 设置场景 ID */
param.sceneID = sceneID;
/** (可选)配置模版 ID，若不需要自定义模版，即使用默认的场景配置，无需传此参数*/
param.templateID = templateID;
param.user = user;
param.position = position;
/** 设置用户登录场景的广播模式 */
param.broadcastMode = ZegoBroadcastMode.ALL;
rangeScene.loginScene(param, new IZegoRangeSceneLoginSceneCallback() {
    @Override
    public void onLoginSceneCallback(int errorCode, ZegoSceneConfig config) {
    }
});
```

<Warning title="注意">



如果您需要自定义模板，详情请参考 [服务端 API - 场景模版配置](/real-time-video-server/api-reference/scene/set-scene-template)。
</Warning>

### 6 推流到场景

调用 [startPublishingStreamInScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-publishing-stream-in-scene) 接口，在场景内推流，如果当前用户在场景内其他用户的音视频的接受范围内，其他用户可以接收当前用户的音视频流。
```java
/** 创建推流到场景配置 */
ZegoScenePublisherConfig scenePublisherConfig = new ZegoScenePublisherConfig();
/** 推流到 rangeScene 登录的场景 */
scenePublisherConfig.rangeSceneHandle = rangeScene.getRangeSceneHandle();
engine.startPublishingStreamInScene(streamID, ZegoPublishChannel.MAIN, scenePublisherConfig);
```

### 7 更新用户位置

调用 [updateUserPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeScene#update-user-position) 接口，更新当前用户的位置。

```java
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position = new ZegoPosition()
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = coordinate[i];
    position.motionOrientation.axisForward[i] = rotateMatrixFront[i];
    position.motionOrientation.axisRight[i] = rotateMatrixRight[i];
    position.motionOrientation.axisUp[i] = rotateMatrixUp[i];
    position.cameraOrientation.axisForward[i] = rotateMatrixFront[i];
    position.cameraOrientation.axisRight[i] = rotateMatrixRight[i];
    position.cameraOrientation.axisUp[i] = rotateMatrixUp[i];
}
/** 更新用户位置 */
int errorCode = rangeScene.updateUserPosition(position);
```

### 8 退出场景

调用 [logoutScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRangeScene#logout-scene) 接口退出场景。

```java
/** 退出场景 */
rangeScene.logoutScene(new IZegoRangeSceneLogoutSceneCallback() {
    @Override
    public void onLogoutSceneCallback(int errorCode) {
    }
});
```

### 9 销毁范围场景模块

当不再使用范围场景模块时，可以调用 [destroyRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-range-scene) 接口销毁范围语音模块。

```java
engine.destroyRangeScene(rangeScene);
```

### 10 销毁引擎

当不再使用 ZEGO Express SDK 时，可以调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 销毁引擎。

```java
ZegoExpressEngine.destroyEngine(null);
```
