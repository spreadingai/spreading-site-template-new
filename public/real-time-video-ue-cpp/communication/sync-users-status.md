# 多人状态实时同步

- - -

## 功能简介


ZEGO Express SDK 从 3.0.0 版本起，新增多人状态实时同步功能，提供有序、高频、低延时、大规模的状态同步服务，帮助开发者快速实现虚拟玩法中玩家的位置、动作、形象等实时信息同步能力，同时单场景中支持 1 万个用户同时在线。

在大型虚拟世界中，用户一般不需要感知较远的场景或远端用户，ZEGO 提供 AOI（Area Of Interest）能力，用于减免获取用户可见范围外的信息，极大减少客户流量成本、用户端流量及性能消耗。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/state_sync_aoi.jpg" />
</Frame>

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

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~ZegoExpressSDK#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。引擎当前只支持同时创建一个实例，超出后将返回 null。

```cpp
ZegoEngineProfile profile;
/** 请通过官网注册获取，格式为 123456789 */
profile.appID = appID;
/** 64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123" */
profile.appSign = appSign;
/** 通用场景接入 */
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
/** 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调 */
engine_ = ZegoExpressSDK::createEngine(profile, nullptr);
```

### 2 创建范围场景模块

调用 [createRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#create-range-scene) 接口创建范围场景实例，当前只支持同时创建一个实例，超出后将返回 null。

```cpp
/** 创建范围场景 */
range_scene_ = engine_->createRangeScene();
```

### 3 监听范围场景事件回调

根据需要调用 [IZegoRangeScene.setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#set-event-handler)
接口设置范围场景事件回调，用于监听范围场景状态、登录状态、进出 AOI 通知等。调用 [IZegoRangeSceneItem.setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#set-event-handler) 接口设置范围场景物品管理类事件回调，用于监听物品进入离开 AOI 范围、物品绑定状态变更、物品状态和命令更新事件。

```cpp
/** 设置范围场景事件回调 */
range_scene_->setEventHandler(rangeSceneCallbackCenter);
range_scene_->getRangeSceneItem()->setEventHandler(rangeSceneCallbackCenter);
```

### 4 登录场景

调用 [loginScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#login-scene) 接口，传入场景参数：sceneID、user、position、broadcastMode，即可登录场景。

<Warning title="注意">


- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录场景失败。
</Warning>

```cpp
/** 登录场景参数 */
ZegoSceneParam param;
/** 创建用户 */
ZegoUser user = ZegoUser(user_id, user_name);
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position;
memset(&position, 0, sizeof(ZegoPosition));
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = user_coordinate_[i];
    position.motionOrientation.axisForward[i] = user_orientation_forward_[i];
    position.motionOrientation.axisRight[i] = user_orientation_right_[i];
    position.motionOrientation.axisUp[i] = user_orientation_up_[i];
    position.cameraOrientation.axisForward[i] = user_orientation_forward_[i];
    position.cameraOrientation.axisRight[i] = user_orientation_right_[i];
    position.cameraOrientation.axisUp[i] = user_orientation_up_[i];
}
/** 设置场景 ID */
param.sceneID = scene_id;
/** (可选)配置模版 ID */
param.templateID = template_id;
param.user = user;
param.position = position;
/** 设置用户登录场景的广播模式 */
param.broadcastMode = ZegoBroadcastModeAll::ZEGO_BROADCAST_MODE_ALL;
range_scene_->loginScene(param, [](int errorCode, const ZegoSceneConfig &config) {
});
```

<Warning title="注意">


如果您需要自定义模板，详情请参考 [服务端 API - 场景模版配置](/real-time-video-server/api-reference/scene/set-scene-template)。
</Warning>

### 5 同步状态

通过 [updateUserStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#update-user-status)、[updateUserCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#update-user-command) 接口更新用户状态及用户命令。通过 [onUserStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneEventHandler#on-user-status-update)、[onUserCommandUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneEventHandler#on-user-command-update) 回调接收 AOI 范围内的远端用户位置、命令等状态信息。

<Note title="说明">


- 用户状态（status，S）是全量更新，用户命令是增量更新（command，C），用户状态可以由前一个用户状态经过一系列用户命令计算得出。
- 用户更新状态的模型应是 Si->Ci->Ci+1->Ci+2->...Ci+j->S(i+1)->C(i+1)+1->C(i+1)+2->...C(i+1)+k->S(i+2)->C(i+2)->...
- 状态同步服务将保证 Si、Si+1 两个全量状态（status）之间的增量更新（command）有序到达。
</Note>

```cpp
/** 设置用户的场景坐标、运动朝向、摄像机朝向 */
ZegoPosition position;
memset(&position, 0, sizeof(ZegoPosition));
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = user_coordinate_[i];
    position.motionOrientation.axisForward[i] = user_orientation_forward_[i];
    position.motionOrientation.axisRight[i] = user_orientation_right_[i];
    position.motionOrientation.axisUp[i] = user_orientation_up_[i];
    position.cameraOrientation.axisForward[i] = user_orientation_forward_[i];
    position.cameraOrientation.axisRight[i] = user_orientation_right_[i];
    position.cameraOrientation.axisUp[i] = user_orientation_up_[i];
}
/** 更新用户状态 */
int status_res = range_scene_->updateUserStatus(position, channel, status, status.length());
/** 更新用户命令 */
int command_res = range_scene_->updateUserCommand(position, channel, command, command.length());
```

### 6（可选）获取场景内用户数、获取 AOI 范围内用户列表

<Accordion title="获取场景内用户数、获取 AOI 范围内用户列表" defaultOpen="false">
可以根据需要调用 [getUserCount](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#get-user-count)、[getUserListInView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#get-user-list-in-view) 接口获取场景内用户数、AOI 范围内用户列表。

```cpp
/** 获取场景内用户数 */
range_scene_->getUserCount([](int errorCode, unsigned int count) {
});

/** 获取 AOI 范围内用户列表 */
range_scene_->getUserListInView([](int errorCode, const std::vector<std::string> &userList) {
});
```
</Accordion>

### 7（可选）物品状态与竞争锁

<Accordion title="物品状态与竞争锁" defaultOpen="false">
通过物品状态同步可以实现虚拟场景中物品移动及放置玩法，如放置系统、踢球等。通过物品锁可以实现物品抢夺玩法，如捡装备、抢椅子等，可根据需求进行设置。

1. 创建物品

根据需要调用 [createItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#create-item) 接口在场景内创建物品。

```cpp
/** 创建物品参数 */
ZegoItemParam param;
/** 设置物品的场景坐标、运动朝向 */
ZegoPosition position;
memset(&position, 0, sizeof(ZegoPosition));
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = user_coordinate_[i];
    position.motionOrientation.axisForward[i] = item_orientation_forward_[i];
    position.motionOrientation.axisRight[i] = item_orientation_right_[i];
    position.motionOrientation.axisUp[i] = item_orientation_up_[i];
}
/** 设置物品 ID */
param.itemID = item_id;
/** 设置物品最大绑定人数上限 */
param.capacity = capacity;
param.position = position;
/** 设置创建物品模式 */
param.createMode = ZegoCreateItemMode::ZEGO_CREATE_ITEM_MODE_NO_BIND;
range_scene_->getRangeSceneItem()->createItem(param, [](int errorCode, long long itemID) {
});
```

2. 绑定物品

如果需要对物品进行操作（即更新物品状态命令），首先需要调用 [bindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#bind-item) 绑定物品。

```cpp
range_scene_->getRangeSceneItem()->bindItem(item_id, [](int errorCode, long long itemID) {
});
```

3. 同步物品状态

通过 [updateItemStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#update-item-status)、[updateItemCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#update-item-command) 接口更新物品状态及物品命令。通过 [onItemStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItemEventHandler#on-item-status-update)、[onItemCommandUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItemEventHandler#on-item-command-update) 回调接收 AOI 范围内的远端物品位置、命令等状态信息。

<Note title="说明">


- 在更新物品状态和命令前，需要先绑定物品。
- 物品状态（status，S）是全量更新，物品命令是增量更新（command，C），物品状态可以由前一个物品状态经过一系列物品命令计算得出。
- 物品更新状态的模型应是 Si->Ci->Ci+1->Ci+2->...Ci+j->S(i+1)->C(i+1)+1->C(i+1)+2->...C(i+1)+k->S(i+2)->C(i+2)->...
- 状态同步服务将保证 Si、Si+1 两个全量状态（status）之间的增量更新（command）有序到达。
</Note>

```cpp
/** 设置物品的场景坐标、运动朝向 */
ZegoPosition position;
memset(&position, 0, sizeof(ZegoPosition));
for (int i = 0; i < 3; ++i) {
    position.coordinate[i] = user_coordinate_[i];
    position.motionOrientation.axisForward[i] = item_orientation_forward_[i];
    position.motionOrientation.axisRight[i] = item_orientation_right_[i];
    position.motionOrientation.axisUp[i] = item_orientation_up_[i];
}
/** 更新物品状态 */
range_scene_->getRangeSceneItem()->updateItemStatus(item_id, position, channel, status, status.length(),[](int errorCode, long long itemID) {
});

/** 更新物品命令 */
range_scene_->getRangeSceneItem()->updateItemCommand(item_id, position, channel, command, command.length(),[](int errorCode, long long itemID) {
});
```

4. 解绑物品

如果无需对物品进行操作（即更新物品状态命令），可以调用 [unbindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#unbind-item) 解绑物品。

```cpp
range_scene_->getRangeSceneItem()->unbindItem(item_id, [](int errorCode, long long itemID) {
});
```

5. 销毁物品

根据需要调用 [destroyItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeSceneItem#destroy-item) 销毁场景内的物品。

```cpp
range_scene_->getRangeSceneItem()->destroyItem(item_id, [](int errorCode, long long itemID) {
});
```
</Accordion>

### 8 退出场景

调用 [logoutScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoRangeScene#logout-scene) 接口退出场景。

```cpp
/** 退出场景 */
range_scene_->logoutScene([](int errorCode) {
});
```

### 9 销毁范围场景模块

当不再使用范围场景模块时，可以调用 [destroyRangeScene](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#destroy-range-scene) 接口销毁范围场景模块。

```cpp
engine_->destroyRangeScene(range_scene_);
range_scene_ = nullptr;
```

### 10 销毁引擎

当不再使用 ZEGO Express SDK 时，可以调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~ZegoExpressSDK#destroy-engine) 销毁引擎。

```cpp
ZegoExpressSDK::destroyEngine(engine_);
engine_ = nullptr;
```

<Content />