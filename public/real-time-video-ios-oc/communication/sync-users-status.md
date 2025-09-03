# 多人状态实时同步

- - -

## 功能简介


ZEGO Express SDK 从 3.0.0 版本起，新增多人状态实时同步功能，提供有序、高频、低延时、大规模的状态同步服务，帮助开发者快速实现虚拟玩法中玩家的位置、动作、形象等实时信息同步能力，同时单场景中支持 1 万个用户同时在线。

在大型虚拟世界中，用户一般不需要感知较远的场景或远端用户，ZEGO 提供 AOI（Area Of Interest）能力，用于减免获取用户可见范围外的信息，极大减少客户流量成本、用户端流量及性能消耗。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/state_sync_aoi.jpg" /></Frame>

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

调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。

```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
/** 请通过官网注册获取，格式为 123456789 */
profile.appID = appID;
/** 64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123" */
profile.appSign = appSign;
/** 通用场景接入 */
profile.scenario = ZegoScenarioDefault;
/** 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调 */
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

### 2 创建范围场景模块

调用 [createRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-range-scene) 接口创建范围场景实例，当前只支持同时创建一个实例，超出后将返回 null。

```objc
/** 定义范围场景对象 */
ZegoRangeScene *rangeScene;

/** 创建范围场景 */
rangeScene = [[ZegoExpressEngine sharedEngine] createRangeScene];
```

### 3 监听范围场景事件回调

根据需要调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#set-event-handler)接口设置范围场景事件回调，用于监听范围场景状态、登录状态、进出 AOI 通知等。调用 [ZegoRangeSceneItem.setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#set-event-handler) 口设置范围场景物品管理类事件回调，用于监听物品进入或离开 AOI 范围、物品绑定状态变更、物品状态和命令更新事件。

```objc
/** 设置范围场景事件回调 */
[rangeScene setEventHandler:self];
[[rangeScene getRangeSceneItem] setEventHandler:self];
```

### 4 登录场景

调用 [loginScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#login-scene-callback) 接口，传入场景参数：sceneID、user、position、broadcastMode，即可登录场景。

<Warning title="注意">


- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录场景失败。
</Warning>

```objc
/** 登录场景参数 */
ZegoSceneParam *param = [[ZegoSceneParam alloc] init];
/** 创建用户 */
ZegoUser *user = [[ZegoUser alloc] initWithUserID:userID userName:userName];
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition *position = [[ZegoPosition alloc] init];
ZegoPositionOrientation *motionOrientation = [[ZegoPositionOrientation alloc] init];
ZegoPositionOrientation *cameraOrientation = [[ZegoPositionOrientation alloc] init];
motionOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
motionOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
motionOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
cameraOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
cameraOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
cameraOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
position.coordinate = [NSArray arrayWithObjects:coordinate[0], coordinate[1], coordinate[2], nil];
position.motionOrientation = motionOrientation;
position.cameraOrientation = cameraOrientation;
/** 设置场景 ID */
param.sceneID = sceneID;
/** (可选)配置模版 ID */
param.templateID = templateID;
param.user = user;
param.position = position;
/** 设置用户登录场景的广播模式 */
param.broadcastMode = ZegoBroadcastModeAll;
[rangeScene loginScene:param callback:^(int errorCode, ZegoSceneConfig * _Nonnull config) {}];
```

<Warning title="注意">


如果您需要自定义模板，详情请参考 [服务端 API - 场景模版配置](/real-time-video-server/api-reference/scene/set-scene-template)。
</Warning>


### 5 同步状态

通过 [updateUserStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#update-user-status-channel-status)、[updateUserCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#update-user-command-channel-command) 接口更新用户状态及用户命令。通过 [userStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneEventHandler#range-scene-user-status-update-position-channel-status)、[userCommandUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneEventHandler#range-scene-user-command-update-position-channel-command) 回调接收 AOI 范围内的远端用户位置、命令等状态信息。

<Note title="说明">


- 用户状态（status，S）是全量更新，用户命令是增量更新（command，C），用户状态可以由前一个用户状态经过一系列用户命令计算得出。
- 用户更新状态的模型应是 Si->Ci->Ci+1->Ci+2->...Ci+j->S(i+1)->C(i+1)+1->C(i+1)+2->...C(i+1)+k->S(i+2)->C(i+2)->...
- 状态同步服务将保证 Si、Si+1 两个全量状态（status）之间的增量更新（command）有序到达。
</Note>

```objc
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition *position = [[ZegoPosition alloc] init];
ZegoPositionOrientation *motionOrientation = [[ZegoPositionOrientation alloc] init];
ZegoPositionOrientation *cameraOrientation = [[ZegoPositionOrientation alloc] init];
motionOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
motionOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
motionOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
cameraOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
cameraOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
cameraOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
position.coordinate = [NSArray arrayWithObjects:coordinate[0], coordinate[1], coordinate[2], nil];
position.motionOrientation = motionOrientation;
position.cameraOrientation = cameraOrientation;
/** 更新用户状态 */
NSData *status = [NSData data];
[rangeScene updateUserStatus:position channel:0 status:status];

/** 更新用户命令 */
NSData *command = [NSData data];
[rangeScene updateUserCommand:position channel:0 command:command];
```

### 6（可选）获取场景内用户数、获取 AOI 范围内用户列表

<Accordion title="获取场景内用户数、获取 AOI 范围内用户列表" defaultOpen="false">
可以根据需要调用 [getUserCount](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#get-user-count)、[getUserListInView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#get-user-list-in-view) 接口获取场景内用户数、AOI 范围内用户列表。

```objc
/** 获取场景内用户数 */
[rangeScene getUserCount:^(int errorCode, unsigned int count) {}];

/** 获取 AOI 范围内用户列表 */
[rangeScene getUserListInView:^(int errorCode, NSArray<NSString *> * _Nonnull userList) {}];
```
</Accordion>

### 7（可选）物品状态与竞争锁

<Accordion title="物品状态与竞争锁" defaultOpen="false">
通过物品状态同步可以实现虚拟场景中物品移动及放置玩法，如放置系统、踢球等。通过物品锁可以实现物品抢夺玩法，如捡装备、抢椅子等，可根据需求进行设置。

1. 创建物品

根据需要调用 [createItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#create-item-callback) 接口在场景内创建物品。

```objc
/** 创建物品参数 */
ZegoItemParam *param = [[ZegoItemParam alloc] init];
/** 设置物品的场景坐标、运动朝向 */
ZegoPosition *position = [[ZegoPosition alloc] init];
ZegoPositionOrientation *motionOrientation = [[ZegoPositionOrientation alloc] init];
motionOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
motionOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
motionOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
position.coordinate = [NSArray arrayWithObjects:coordinate[0], coordinate[1], coordinate[2], nil];
position.motionOrientation = motionOrientation;
/** 设置物品 ID */
param.itemID = itemID;
/** 设置物品最大绑定人数上限 */
param.capacity = capacity;
param.position = position;
/** 设置创建物品模式 */
param.createMode = ZegoCreateItemModeNoBind;
[[rangeScene getRangeSceneItem] createItem:param callback:^(int errorCode, long long itemID) {}];
```

2. 绑定物品

如果需要对物品进行操作（即更新物品状态命令），首先需要调用 [bindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#bind-item-callback) 绑定物品。

```objc
[[rangeScene getRangeSceneItem] bindItem:itemID callback:^(int errorCode, long long itemID) {}];
```

3. 同步物品状态

通过 [updateItemStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#update-item-status-position-channel-status-callback)、[updateItemCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#update-item-command-position-channel-command-callback) 接口更新物品状态及物品命令。通过 [itemStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItemEventHandler#range-scene-item-status-update-position-channel-status)、[itemCommandUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItemEventHandler#range-scene-item-command-update-position-channel-command) 回调接收 AOI 范围内的远端物品位置、命令等状态信息。

<Note title="说明">


- 在更新物品状态和命令前，需要先绑定物品。
- 物品状态（status，S）是全量更新，物品命令是增量更新（command，C），物品状态可以由前一个物品状态经过一系列物品命令计算得出。
- 物品更新状态的模型应是 Si->Ci->Ci+1->Ci+2->...Ci+j->S(i+1)->C(i+1)+1->C(i+1)+2->...C(i+1)+k->S(i+2)->C(i+2)->...
- 状态同步服务将保证 Si、Si+1 两个全量状态（status）之间的增量更新（command）有序到达。
</Note>

```objc
/** 设置物品的场景坐标、运动朝向 */
ZegoPosition *position = [[ZegoPosition alloc] init];
ZegoPositionOrientation *motionOrientation = [[ZegoPositionOrientation alloc] init];
motionOrientation.axisForward = [NSArray arrayWithObjects:rotateMatrixForward[0], rotateMatrixForward[1], rotateMatrixForward[2], nil];
motionOrientation.axisRight = [NSArray arrayWithObjects:rotateMatrixRight[0], rotateMatrixRight[1], rotateMatrixRight[2], nil];
motionOrientation.axisUp = [NSArray arrayWithObjects:rotateMatrixUp[0], rotateMatrixUp[1], rotateMatrixUp[2], nil];
position.coordinate = [NSArray arrayWithObjects:coordinate[0], coordinate[1], coordinate[2], nil];
position.motionOrientation = motionOrientation;
/** 更新物品状态 */
NSData *status = [NSData data];
[[rangeScene getRangeSceneItem] updateItemStatus:itemID position:position channel:0 status:status callback:^(int errorCode, long long itemID) {}];

/** 更新物品命令 */
NSData *command = [NSData data];
[[rangeScene getRangeSceneItem] updateItemCommand:itemID position:position channel:0 command:command callback:^(int errorCode, long long itemID) {}];
```

4. 解绑物品

如果无需对物品进行操作（即更新物品状态命令），可以调用 [unbindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#unbind-item-callback) 解绑物品。

```objc
[[rangeScene getRangeSceneItem] unbindItem:itemID callback:^(int errorCode, long long itemID) {}];
```

5. 销毁物品

根据需要调用 [destroyItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeSceneItem#destroy-item-callback) 销毁场景内的物品。

```objc
[[rangeScene getRangeSceneItem] destroyItem:itemID callback:^(int errorCode, long long itemID) {}];
```
</Accordion>


### 8 退出场景

调用 [logoutScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoRangeScene#logout-scene) 接口退出场景。

```objc
/** 退出场景 */
[rangeScene logoutScene:^(int errorCode) {}];
```

### 9 销毁范围场景模块

当不再使用范围场景模块时，可以调用 [destroyRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#destroy-range-scene) 接口销毁范围场景模块。

```objc
[[ZegoExpressEngine sharedEngine] destroyRangeScene:rangeScene];
```

### 10 销毁引擎

当不再使用 ZEGO Express SDK 时，可以调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#destroy-engine) 销毁引擎。

```objc
[ZegoExpressEngine destroyEngine:nil];
```
