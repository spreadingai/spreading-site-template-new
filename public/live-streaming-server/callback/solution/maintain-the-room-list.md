# 回调生成房间列表解决方案

- - -

## 操作场景

开发者短时间内频繁创建、关闭房间，ZEGO 提供的 [房间创建回调](https://doc-zh.zego.im/article/19664) 和 [房间关闭回调](https://doc-zh.zego.im/article/19666) 不保证结果的时序与开发者执行的时序一致。

当开发者需要依赖 [房间创建回调](https://doc-zh.zego.im/article/19664) 和 [房间关闭回调](https://doc-zh.zego.im/article/19666) 维护本地房间列表时，回调时序与执行时序不一致，可能会导致部分业务出错。

比如，开发者对房间的操作顺序为：

1. 用户 u1 登录，房间 r1 创建，触发房间创建回调 c1；
2. 用户 u1 退出，房间 r1 关闭，触发房间关闭回调 c2；
3. 用户 u1 登录，房间 r1 再次创建，触发房间创建回调 c3。

经过回调服务，到达开发者服务器的顺序有可能变为：

1. 房间 r1 创建回调 c3；
2. 房间 r1 创建回调 c1；
3. 房间 r1 关闭回调 c2。

开发者根据回调的顺序更新本地房间信息，房间 r1 会被删除，实际上用户 u1 依旧在第二次创建的房间 r1 中。

## 操作步骤

为了解决上述回调乱序导致的问题，ZEGO 推荐开发者使用以下方案维护本地房间列表。

<Warning title="注意">


本方案基于回调不丢失的情况解决乱序的问题。如果回调丢失，则无法解决。

</Warning>




### 关注回调关键参数

关注 [房间创建回调](https://doc-zh.zego.im/article/19664) 和 [房间关闭回调](https://doc-zh.zego.im/article/19666) 的关键参数。

| 参数 |	描述 |
| -- | -- |
| event | <p>事件名称：</p><ul><li>房间创建：[room_create](https://doc-zh.zego.im/article/19664)</li><li>房间关闭：[room_close](https://doc-zh.zego.im/article/19666)</li></ul> |
| room_id | 房间 ID。 |
| room_session_id | <p>房间生命周期唯一标识，在该房间的整个生命周期中保持不变。</p><p>该参数与 <a href="https://doc-zh.zego.im/article/19670">登录房间回调</a>、<a href="https://doc-zh.zego.im/article/19672">退出房间回调</a> 中的参数 room_seq 一致。</p>|
| room_create_time | 房间创建时间，单位：毫秒。[房间创建回调](https://doc-zh.zego.im/article/19664) 存在该参数。 |
| room_close_time | 房间关闭时间，单位：毫秒。[房间关闭回调](https://doc-zh.zego.im/article/19666) 存在该参数。 |

### 维护本地房间列表

根据 room_id、room_session_id、room_create_time，维护本地房间列表。

本地房间列表的数据结构如下：

```php
{
    RoomInfo: {
        RoomID: room_id,
        RoomSessionId: room_session_id,
        RoomCreateTime:room_create_time,
        ... // 其它业务需要保存的数据
    },
    UserList:... // 请参考《回调生成房间用户列表解决方案》
}
```

### 处理判断逻辑

收到 [房间创建回调](https://doc-zh.zego.im/article/19664) 和 [房间关闭回调](https://doc-zh.zego.im/article/19666) 后，更新本地房间列表。

下文图片中的字段说明如下：

| 字段前缀 | 含义 |
| -- | -- |
| zego.* | ZEGO 回调中的参数。 |
| local.* | 开发者本地维护的参数。 |

- 房间创建回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_room_create.png" /></Frame>


- 房间关闭回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_room_close.png" /></Frame>
