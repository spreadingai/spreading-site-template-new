# 回调生成房间用户列表解决方案

- - -

## 操作场景

开发者短时间内频繁登录、退出房间，ZEGO 提供的 [登录房间回调](https://doc-zh.zego.im/article/19670) 和 [退出房间回调](https://doc-zh.zego.im/article/19672) 不保证结果的时序与开发者执行的时序一致。

当开发者需要依赖 [登录房间回调](https://doc-zh.zego.im/article/19670) 和 [退出房间回调](https://doc-zh.zego.im/article/19672) 维护本地房间用户列表时，回调时序与执行时序不一致，可能会导致部分业务出错。

比如，用户的行为顺序为：

1. 用户 u1 登录房间 r1，触发登录房间回调 c1；
2. 用户 u2 登录房间 r1，触发登录房间回调 c2；
3. 用户 u1 退出房间 r1，触发退出房间回调 c3；
4. 用户 u1 再次登录房间 r1，触发登录房间回调 c4。

经过回调服务，到达开发者服务器的顺序有可能变为：

1. 用户 u1 登录时的登录房间回调 c1；
2. 用户 u1 再次登录时的登录房间回调 c4；
3. 用户 u2 登录时的登录房间回调 c2；
4. 用户 u1 退出时的退出房间回调 c3。

开发者根据回调的顺序更新本地房间用户列表信息，用户 u1 会被删除，实际上用户 u1 依旧在房间 r1 中。

## 操作步骤

为了解决上述回调乱序导致的问题，ZEGO 推荐开发者结合 [回调生成房间列表解决方案](https://doc-zh.zego.im/article/19668)，并参考以下方案，维护本地房间用户列表。

<Warning title="注意">


本方案基于回调不丢失的情况解决乱序的问题。如果回调丢失，则无法解决。

</Warning>



### 关注回调关键参数

关注 [登录房间回调](https://doc-zh.zego.im/article/19670) 和 [退出房间回调](https://doc-zh.zego.im/article/19672) 的关键参数。

| 参数 |	描述 |
| -- | -- |
| event | <p>事件名称：</p><ul><li>登录房间：[room_login](https://doc-zh.zego.im/article/19670)</li><li>退出房间：[room_logout](https://doc-zh.zego.im/article/19672)</li></ul> |
| room_id | 房间 ID。 |
| room_seq | <p>房间生命周期唯一标识，在该房间的整个生命周期中保持不变。</p><p>该参数与 <a href="https://doc-zh.zego.im/article/19664">房间创建回调</a>、<a href="https://doc-zh.zego.im/article/19666">房间关闭回调</a> 中的参数 room_session_id 一致。</p> |
| user_account | 用户账号 ID。 |
| session_id | 用户会话 ID。 |
| login_time | 用户登录房间时间戳，单位：毫秒。 [登录房间回调](https://doc-zh.zego.im/article/19670) 存在该参数。 |
| logout_time | 用户退出房间时间戳，单位：毫秒。 [退出房间回调](https://doc-zh.zego.im/article/19672) 存在该参数。 |

### 维护本地房间用户列表

根据 user_account，session_id，login_time 和对应房间的 room_id，维护本地房间用户列表。

本地房间用户列表的数据结构如下：

```php
{
    RoomInfo: {//参考《回调生成房间列表解决方案》
        RoomID: room_id,
        RoomSessionId: room_session_id,
        RoomCreateTime:room_create_time,
        ...//其它业务需要保存的数据
    },
    UserList:[
        {
            UserId:user_account_1,
            UserSessionId:session_id_1,
            UserLoginTime:login_time_1,
            ...//其它业务需要保存的数据
        },{
            UserId:user_account_2,
            UserSessionId:session_id_2,
            UserLoginTime:login_time_2,
            ...//其它业务需要保存的数据
        }
    ]
}
```

### 处理判断逻辑

收到 [登录房间回调](https://doc-zh.zego.im/article/19670) 和 [退出房间回调](https://doc-zh.zego.im/article/19672) 后，更新本地房间列表。

下文图片中的字段说明如下：

| 字段前缀 | 含义 |
| -- | -- |
| zego.* | ZEGO 回调中的参数。 |
| local.* | 开发者本地维护的参数。 |

- 房间创建回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_room_login.png" /></Frame>


- 房间关闭回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_room_logout.png" /></Frame>
