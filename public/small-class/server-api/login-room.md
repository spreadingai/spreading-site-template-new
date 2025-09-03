# 登录在线课堂示例 demo 教室
---
## 描述

登录在线课堂示例 demo 教室，获取用户角色、用户 ID、用户昵称及教室 ID。


调用频率限制：10 次/秒


## 接口原型

* 请求方法：`POST`
* 请求地址：`/edu_room/login_room`
* 传输协议：`application/json`



## 请求参数

| 参数      | 类型   | 是否必选 | 示例      | 描述                      |
| --------- | ------ | -------- | --------- | ------------------------- |
| room_id   | String | 是       | "123456"  | 教室房间 ID，只能包含数字，最长 9 个字符。                |
| uid       | Int64  | 是       | 171171717 | 用户 ID。                    |
| nick_name | String | 是       | "Shawn"   | 用户昵称，最长 15 个字符或汉字。                  |
| role      | Int32  | 是       | 1         | 用户角色，取值如下：<ul><li>1：老师</li><li>2：学生</li></ul>|



## 请求示例

```json
{
  "room_id":"123456",
  "uid":171171717,
  "nick_name":"shawn",
  "role":1
}
```



## 响应参数

| 参数                 | 类型   | 示例          | 描述                                          |
| -------------------- | ------ | ------------- | --------------------------------------------- |
| room_id              | String | "123456"      | 教室房间 ID。                                    |
| max_join_live_num    | Int32  | 4             | 同时连麦人数上限。                              |
| default_camera_state | Int32  | 2             | 用户默认的摄像头状态，如果用户当前摄像头状态与此状态不一致，需调用 [set_user_info](/small-class/server-api/set-user-info) 修改。 取值如下：<ul><li>1：关闭</li><li>2：打开</li></ul>            |
| default_mic_state    | Int32  | 2             | 用户默认的麦克风状态，如果用户当前麦克风状态与此状态不一致，需调用 [set_user_info](/small-class/server-api/set-user-info) 修改。取值如下： <ul><li>1：关闭</li><li>2：打开</li></ul>             |
| allow_turn_on_camera | Int32  | 2             | 是否允许学生自行打开摄像头，取值如下：<ul><li>1：不允许</li><li>2：允许</li></ul> |
| allow_turn_on_mic    | Int32  | 2             | 是否允许学生自行打开麦克风，取值如下：<ul><li>1：不允许</li><li>2：允许</li></ul> |
| uid                  | Int64  | 171171717     | 用户 ID。                                       |
| nick_name            | String | "Shawn"       | 用户昵称。                                      |
| role                 | Int32  | 1             | 用户角色，取值如下：<ul><li>1：老师</li><li>2：学生</li></ul>                     |
| camera               | Int32  | 1             | 用户摄像头状态，取值如下： <ul><li>1：关闭</li><li>2：打开</li></ul>               |
| mic                  | Int32  | 1             | 用户麦克风状态，取值如下： <ul><li>1：关闭</li><li>2：打开</li></ul>               |
| can_share            | Int32  | 2             | 用户共享权限状态，取值如下： <ul><li>1：关闭</li><li>2：打开</li></ul>             |
| login_time           | Int64  | 1600920322511 | 用户登录教室时间，为 Unix 时间戳，单位：毫秒。                          |



## 响应示例

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



## 返回码

| 返回码 | 描述                   |
| ------ | ---------------------- |
| 10001  | 课堂已有老师，不能以老师角色加入。 |
| 10002  | 课堂人数已满，无法加入。 |
