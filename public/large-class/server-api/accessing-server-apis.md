# 在线课堂示例 demo 后台服务说明
---

##  概览

ZEGO 为开发者提供在线课堂示例 demo 服务源代码，开发者可以直接部署也能够根据自己的需求定制开发。现已支持教室，教师，学生状态管理以及状态变更的通知。

<Warning title="注意">

ZEGO 不提供在线课堂示例 demo 后台运营服务，开放在线课堂示例 demo 服务源代码，开发者需要自已下载源码搭建后台系统。  
</Warning>


具体功能包括：

- 登录教室，会自动创建教室。
- 教室内成员变更通知。
- 中途离开教室。
- 结束教学，销毁教室。
- 共享状态控制。

可以通过修改 `app.conf` 配置文件，来配置每个教室可以容纳的人数以及同时连麦的人数。

通过直接部署后台服务，并配合 Express SDK、ZegoWhiteBoardView SDK、ZegoDocsView SDK 快速搭建在线互动教学场景。



##  服务简介

在线课堂示例 demo 服务是采用 Go 语言，基于开源的 HTTP 框架 [beego](https://github.com/astaxie/beego) 开发出来的一款后端服务应用。目前版本仅依赖 `redis` 来存储数据，支持水平扩展，开发者可以根据需要进行扩容。


<Warning title="注意">
* 目前所有接口都没有做鉴权，建议开发者自己增加鉴权模块。  
* 房间 ID 由用户输入，不存在的房间会自动创建，存在的房间逻辑允许即可直接进入。  
* 用户 ID 由客户端生成，由客户端保证唯一性，必须保证同一个教室内用户 ID 不发生冲突。  
</Warning>


##  服务部署

1. 部署 redis，在线课堂示例 demo 的教室、教师、学生的状态会存储于 redis。

2. 修改 `app.conf` 配置文件中如下配置项，配置好 redis，以及 AppId、AppSecret。

<Note title="说明">

请到 [ZEGO 控制台](https://console-express.zego.im/account/login) 注册账号并申请 AppID 与 ServerSecret，申请流程请参考 [项目管理](https://doc-zh.zego.im/zh/1265.html)。  
</Note>

```
RedisAddr = "192.168.100.62:6379" # redis host
RedisPassword = ""	# redis password
RedisIndex = 8			# redis数据库

[SmallClass] # 小班课appid相关配置
AppId = 1234567890
AppSecret = "eb2280544902dc1b7ab1fde3985bd083" # 从 zego 控制台获取的 ServerSecret

[LargeClass] # 大班课appid相关配置
AppId = 1234567890
AppSecret = "eb2280544902dc1b7ab1fde3985bd083" # 从 zego 控制台获取的 ServerSecret
```

3. 进入源码目录，启动对应系统的可执行文件。

```
cd edu_room
./edu_room_linux # linux系统
./edu_room_mac # mac os
edu_room.exe # win
```
或者安装 Go 开发环境，然后执行如下命令：

```go
cd edu_room;go run main.go
```



## 快速入门

### 登录教室

调用 [login_room](/large-class/server-api/login-room) 接口登录教室，会自动初始化教室，如果输入了相同的 `room_id` 则会进入同一教室。客户端需保证 `uid` 唯一性，相同的 `uid` 后端会认为是同一个用户。


```json
{
  "uid":171171717,
  "room_id":"123456",
  "nick_name":"Shawn",
  "role":2,
  "room_type":2
}
```


登录房间成功后返回教室的默认状态和配置项，以及用户的状态信息，客户端需要根据这些信息初始化房间和用户状态。


```json
{
  "ret": {
    "code": 0,
    "message": "succeed"
  },
  "data": {
    "max_join_live_num": 4,
    "room_id": "123456",
    "default_camera_state": 2,
    "default_mic_state": 2,
    "allow_turn_on_camera": 2,
    "allow_turn_on_mic": 2,
    "uid": 171171717,
    "nick_name": "Shawn",
    "role": 1,
    "login_time": 1600920322511,
    "camera": 1,
    "mic": 1,
    "can_share": 2
  }
}
```


### 上课中相关操作

上课过程中，教师和学生通过以下接口实现管理设备状态、中途离开教室、结束教学等功能。

#### 修改设备状态

调用 [set_user_info](/large-class/server-api/set-user-info) 接口可以修改自己的设备、共享状态，教师也可以通过此接口修改学生的设备、共享状态。

```json
{
  "uid":171171717,
  "room_id":"123456",
  "room_type": 2,
  "target_uid":171171717,
  "mic":2,
  "camera":2,
  "can_share":2
}
```


#### 离开教室

调用 [leave_room](/large-class/server-api/leave-room) 接口可以离开教室，用户状态信息会被删除，当所有人都离开教室一段时间后，教室会自动销毁。


```json
{
  "uid":171171717,
  "room_id":"123456",
  "room_type": 2
}
```

#### 结束教学

调用 [end_teaching](/large-class/server-api/end-teaching) 接口可以结束教学，将教室内所有用户踢出教室，然后立即销毁教室。

```json
{
  "uid":171171717,
  "room_id":"123456",
  "room_type": 2
}
```
