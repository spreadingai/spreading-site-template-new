# 回调生成房间流列表解决方案

- - -

## 操作场景

开发者短时间内频繁推流、停止推流，ZEGO 提供的 [流创建回调](https://doc-zh.zego.im/article/19676) 和 [流关闭回调](https://doc-zh.zego.im/article/19678) 不保证结果的时序与开发者执行的时序一致。

当开发者需要依赖 [流创建回调](https://doc-zh.zego.im/article/19676) 和 [流关闭回调](https://doc-zh.zego.im/article/19678) 维护本地房间流列表时，回调时序与执行时序不一致，可能会导致部分业务出错。

比如，用户的行为顺序为：

1. 用户 u1 登录房间 r1；
2. 用户 u1 推流 s1，触发流创建回调 sc1；
3. 用户 u1 停止推流 s1，触发流关闭回调 sc2；
4. 用户 u1 再次推流 s1，触发流创建回调 sc3。

经过回调服务，到达开发者服务器的顺序有可能变为：

1. 用户 u1 推流 s1 时的流创建回调 sc1；
2. 用户 u1 再次推流 s1 时的流创建回调 sc3；
3. 用户 u1 停止推流 s1 时的流关闭回调 sc2。

开发者根据回调的顺序更新本地房间流列表信息，流 s1 会被删除，实际上流 s1 依旧在房间 r1 中。

## 操作步骤

为了解决上述回调乱序导致的问题，ZEGO 推荐开发者结合 [回调生成房间列表解决方案](https://doc-zh.zego.im/article/19668)，并参考以下方案，维护本地房间用户列表。

<Warning title="注意">


本方案基于回调不丢失的情况解决乱序的问题。如果回调丢失，则无法解决。

</Warning>



### 关注回调关键参数

关注 [流创建回调](https://doc-zh.zego.im/article/19676) 和 [流关闭回调](https://doc-zh.zego.im/article/19678) 的关键参数。

| 参数 |	描述 |
| -- | -- |
| event | <p>事件名称：</p><ul><li>流创建：[stream_create](https://doc-zh.zego.im/article/19676)</li><li>流关闭：[stream_close](https://doc-zh.zego.im/article/19678)</li></ul> |
| room_id | 房间 ID。 |
| room_session_id | <p>房间会话 ID，全局唯一，且一个房间完整生命周期中不变：</p><p>该参数与 <a href="https://doc-zh.zego.im/article/19664">房间创建回调</a>、<a href="https://doc-zh.zego.im/article/19666">房间关闭回调</a> 中的参数 room_session_id 一致。</p> |
| stream_id | 流 ID，对应客户端的 StreamID。 |
| stream_seq | 服务器流列表变更的 seq，每次流变更都会加 1。 |
| create_time_ms | 流创建时间戳，单位：毫秒。 |
| destroy_timemillis | 流关闭时间，单位：毫秒。 [流关闭回调](https://doc-zh.zego.im/article/19678) 存在该参数。 |

### 维护本地房间流列表

根据 stream_id，stream_sid，create_time_ms、stream_seq 和对应房间的 room_id、room_session_id，维护本地房间流列表。

本地房间流列表的数据结构如下：

```php
{
    RoomInfo: {//参考《回调生成房间列表解决方案》
        RoomID: room_id,
        RoomSessionId: room_session_id,
        RoomCreateTime:room_create_time,
        ...//其它业务需要保存的数据
    },
    StreamList:[
        {
            StreamId:stream_id_1,
            StreamSid:session_sid_1,
            StreamCreateTime:create_time_ms_1,
            StreamSeq:stream_seq_1
            ...//其它业务需要保存的数据
        },{
            StreamId:stream_id_2,
            StreamSid:session_sid_2,
            StreamCreateTime:create_time_ms_2,
            StreamSeq:stream_seq_2
            ...//其它业务需要保存的数据
        }
    ]
}
```

### 处理判断逻辑

收到 [流创建回调](https://doc-zh.zego.im/article/19676) 和 [流关闭回调](https://doc-zh.zego.im/article/19678) 后，更新本地房间列表。

下文图片中的字段说明如下：

| 字段前缀 | 含义 |
| -- | -- |
| zego.* | ZEGO 回调中的参数。 |
| local.* | 开发者本地维护的参数。 |

- 流创建回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_stream_create.jpeg" /></Frame>


- 流关闭回调处理流程：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/solution_of_stream_close.jpeg" /></Frame>
