# 多人状态实时同步

- - -

## 功能简介


多人状态实时同步功能提供有序、高频、低延时、大规模的状态同步服务，帮助开发者快速实现虚拟玩法中玩家的位置、动作、形象等实时信息同步能力，同时单场景中支持 1 万个用户同时在线。

在大型虚拟世界中，用户一般不需要感知较远的场景或远端用户，ZEGO 提供 AOI（Area Of Interest）能力，用于减免获取用户可见范围外的信息，极大减少客户流量成本、用户端流量及性能消耗。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/state_sync_aoi.jpg" />
</Frame>

<Warning title="注意">

本功能不支持在 WebGL 环境中运行使用。
</Warning>

### 概念解释

- 场景：用户需要先登录场景，进入同一个场景的用户才可以进行状态信息的同步。
- AOI（Area of interest）范围：用户感兴趣区域的正方形大小，在虚拟场景中一般为用户的可见范围，该范围实时跟随用户的位置，仅会同步 AOI 范围内远端的用户信息。


### 应用场景

- 虚拟办公、虚拟会展、虚拟社交、虚拟 KTV 等元宇宙场景。
- 需要超高频、低延时、大规模同步信息或控制指令的通用场景。

## 前提条件

<Warning title="注意">


使用该服务会产生相应的费用，请联系 ZEGO 商务人员了解具体的费用情况。


</Warning>



在实现状态同步前，请确保：
- 已联系 ZEGO 技术支持进行特殊编包并开通状态同步服务。
- 已在项目中集成 ZEGO Express SDK。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。


## 实现流程

### 1 创建引擎

调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。

```csharp
/** 定义 SDK 引擎对象 */
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
/** 请通过官网注册获取，格式为 123456789 */
profile.appID = appID;
/** 64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123" */
profile.appSign = appSign;
/** 通用场景接入 */
profile.scenario = ZegoScenario.Default;
/** 创建引擎 */
engine = ZegoExpressEngine.CreateEngine(profile);
```

### 2 创建范围场景模块

调用 [CreateRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-range-scene) 接口创建范围场景实例，当前只支持同时创建一个实例，超出后将返回 null。

```csharp
/** 定义范围场景对象 */
ZegoRangeScene rangeScene;

/** 创建范围场景 */
rangeScene = engine.CreateRangeScene();
```

### 3 监听范围场景事件回调

根据需要设置范围场景事件委托，用于监听范围场景状态、登录状态、进出 AOI 通知等。通过设置范围场景物品管理类事件委托，用于监听物品进入离开 AOI 范围、物品绑定状态变更、物品状态和命令更新事件。

```csharp
/** 范围场景事件回调 */
public void OnSceneStateUpdate(ZegoRangeScene rangeScene, ZegoSceneState state, int errorCode) {

}

public void OnEnterView(ZegoRangeScene rangeScene, ZegoUser user, ZegoPosition position) {

}

public void OnLeaveView(ZegoRangeScene rangeScene, string userID) {

}

public void OnUserStatusUpdate(ZegoRangeScene rangeScene, string userID, ZegoPosition position, uint channel, byte[] status) {

}

public void OnUserCommandUpdate(ZegoRangeScene rangeScene, string userID, ZegoPosition position, uint channel, byte[] command) {

}

public void OnCustomCommandUpdate(ZegoRangeScene rangeScene, byte[] command) {

}

/** 范围场景流管理事件回调 */
public void OnUserStreamStateUpdate(ZegoRangeScene rangeScene, string userID, string streamID, ZegoStreamState state) {

}

public void OnUserMicUpdate(ZegoRangeScene rangeScene, string userID, ZegoDeviceState state) {

}

public void OnUserCameraUpdate(ZegoRangeScene rangeScene, string userID, ZegoDeviceState state) {

}

public void OnUserSpeakerUpdate(ZegoRangeScene rangeScene, string userID, ZegoDeviceState state) {

}

// 设置委托
rangeScene.onSceneStateUpdate = OnSceneStateUpdate;
rangeScene.onEnterView = OnEnterView;
rangeScene.onLeaveView = OnLeaveView;
rangeScene.onUserStatusUpdate = OnUserStatusUpdate;
rangeScene.onUserCommandUpdate = OnUserCommandUpdate;
rangeScene.onCustomCommandUpdate=OnCustomCommandUpdate;
rangeScene.GetRangeSceneStream().onUserStreamStateUpdate = OnUserStreamStateUpdate;
rangeScene.GetRangeSceneStream().onUserMicUpdate = OnUserMicUpdate;
rangeScene.GetRangeSceneStream().onUserCameraUpdate = OnUserCameraUpdate;
rangeScene.GetRangeSceneStream().onUserSpeakerUpdate = OnUserSpeakerUpdate;
```

### 4 登录场景

调用 [LoginScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#login-scene) 接口，传入场景参数：sceneID、user、position、broadcastMode，即可登录场景。

<Warning title="注意">


- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录场景失败。
- 请勿在 [LoginScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#login-scene) 接口的回调 [OnLoginSceneCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoRangeSceneEventHandler#on-login-scene-callback) 中调用 SDK 接口，否则会出错崩溃（可以切线程调用）。

</Warning>



```csharp
/** 登录场景参数 */
ZegoSceneParam param = new ZegoSceneParam();
/** 创建用户 */
ZegoUser user = new ZegoUser(userID);
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position = new ZegoPosition()
position.coordinate.z = self_pos[0];
position.coordinate.x = self_pos[1];
position.coordinate.y = self_pos[2];
position.motionOrientation.axisForward.z = axis_forward[0];
position.motionOrientation.axisForward.x = axis_forward[1];
position.motionOrientation.axisForward.y = axis_forward[2];
position.motionOrientation.axisRight.z = axis_right[0];
position.motionOrientation.axisRight.x = axis_right[1];
position.motionOrientation.axisRight.y = axis_right[2];
position.motionOrientation.axisUp.z = axis_top[0];
position.motionOrientation.axisUp.x = axis_top[1];
position.motionOrientation.axisUp.y = axis_top[2];
position.cameraOrientation.axisForward = axisForward;
position.cameraOrientation.axisRight = axisRight;
position.cameraOrientation.axisUp = axisUp;
/** 设置场景 ID */
param.sceneID = sceneID;
/** (可选)配置模版 ID */
param.templateID = template_id;
param.user = user;
param.position = position;
/** 设置用户登录场景的广播模式 */
param.broadcastMode = ZegoBroadcastMode.All;
rangeScene.LoginScene(sceneParam, (int errorCode, ZegoSceneConfig config) => {

});
```

<Warning title="注意">


如果您需要自定义模板，详情请参考 [服务端 API - 场景模版配置](/real-time-video-server/api-reference/scene/set-scene-template)。

</Warning>



### 5 同步状态

通过 [UpdateUserStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#update-user-status)、[UpdateUserCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#update-user-command) 接口更新用户状态及用户命令。通过 [OnUserStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoRangeSceneEventHandler#on-user-status-update)、[OnUserCommandUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoRangeSceneEventHandler#on-user-command-update) 回调接收 AOI 范围内的远端用户位置、命令等状态信息。

<Note title="说明">


- 用户状态（status，S）是全量更新，用户命令是增量更新（command，C），用户状态可以由前一个用户状态经过一系列用户命令计算得出。
- 用户更新状态的模型应是 Si->Ci->Ci+1->Ci+2->...Ci+j->S(i+1)->C(i+1)+1->C(i+1)+2->...C(i+1)+k->S(i+2)->C(i+2)->...
- 状态同步服务将保证 Si、Si+1 两个全量状态（status）之间的增量更新（command）有序到达。


</Note>



```csharp
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position = new ZegoPosition();
position.coordinate.z = self_pos[0];
position.coordinate.x = self_pos[1];
position.coordinate.y = self_pos[2];
position.motionOrientation.axisForward.z = axis_forward[0];
position.motionOrientation.axisForward.x = axis_forward[1];
position.motionOrientation.axisForward.y = axis_forward[2];
position.motionOrientation.axisRight.z = axis_right[0];
position.motionOrientation.axisRight.x = axis_right[1];
position.motionOrientation.axisRight.y = axis_right[2];
position.motionOrientation.axisUp.z = axis_top[0];
position.motionOrientation.axisUp.x = axis_top[1];
position.motionOrientation.axisUp.y = axis_top[2];
position.cameraOrientation.axisForward = axisForward;
position.cameraOrientation.axisRight = axisRight;
position.cameraOrientation.axisUp = axisUp;

/** 更新用户状态 */
byte[] status = new byte[10];
int errorCode = rangeScene.UpdateUserStatus(position, 0, status);

/** 更新用户命令 */
byte[] command = new byte[10];
int errorCode = rangeScene.UpdateUserCommand(position, 0, command);
```

### 6（可选）获取场景内用户数、获取 AOI 范围内用户列表

<Accordion title="获取场景内用户数、获取 AOI 范围内用户列表" defaultOpen="false">
可以根据需要调用 [GetUserCount](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#get-user-count)、[GetUserListInView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#get-user-list-in-view) 接口获取场景内用户数、AOI 范围内用户列表。

```csharp
/** 获取场景内用户数 */
rangeScene.GetUserCount((int errorCode, uint count) =>{

});

/** 获取 AOI 范围内用户列表 */
rangeScene.GetUserListInView((int errorCode, List<string> userList) =>{

});
```
</Accordion>

### 7 退出场景

调用 [LogoutScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#logout-scene) 接口退出场景。

```csharp
/** 退出场景 */
rangeScene.LogoutScene((int errorCode) => {

});
```

### 8 销毁范围场景模块

当不再使用范围场景模块时，可以调用 [DestroyRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-range-scene) 接口销毁范围场景模块。

```csharp
engine.DestroyRangeScene(rangeScene);
```

### 9 销毁引擎

当不再使用 ZEGO Express SDK 时，可以调用 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 销毁引擎。

```csharp
ZegoExpressEngine.DestroyEngine();
```
