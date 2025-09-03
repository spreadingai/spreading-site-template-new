| 参数     | 类型   | 是否必选 | 描述                                                                 |
|----------|--------|----------|----------------------------------------------------------------------|
| Role     | String | 是       | 消息发送者角色。取值如下：<ul><li>`user`：用户。</li><li>`assistant`：智能体</li></ul> |
| Content  | String | 是       | 发送的内容。                                                        |
# AI短期记忆（智能体上下文）管理

在创建智能体实例并实现角色扮演等对话时，智能体能够记住最近一段时间互动聊天的具体内容（通常被称为短期记忆），其实现的原理为 LLM （大语言模型）的上下文。
在语音对话的过程中，其记忆有以下阶段：
- 初始记忆：在创建实例时，是否需要聊天记录。
  - 可关联 [ZIM](https://doc-zh.zego.im/zim-android/introduction/overview) 的会话历史记录，作为初始记忆；
  - 可自定义外部上下文，作为初始记忆。若置空，则不携带任何记忆。
- 语音通话过程中记忆：语音通话过程中产生的对话历史，会缓存在 AI Agent 服务端。
  - 若希望获取实时的记忆，可参考[获取智能体实例上下文列表](#获取智能体实例上下文列表)章节。
  - 若希望清空当前记忆，可参考[重置智能体实例上下文列表](#重置智能体实例上下文列表)章节。
- 语音通话结束，记忆归档
  - 可归档在 ZIM 中。可参考[语音通话结束后归档记忆](#语音通话结束后归档记忆)章节。

<Warning title="注意">

- **上下文长度限制：** 通常 LLM 有最大长度限制，超出这个限制则会报错。例如“doubao-1.5-pro-32k”，其上下文长度为 32k token 长度。

- **上下文长度与推理耗时：** 通常上下文越长，则 LLM 输出的速度越慢。

- **上下文长度与价格：** 通常 LLM 等计费根据上下文的长度进行输入计费，长度越长，价格越高。
</Warning>

## 使用步骤

### 设置初始记忆

在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时可设置智能体实例的初始记忆（即智能体初始上下文）。记忆来源可分为“ZIM 的会话历史记录”和“自定义外部上下文”，
可通过创建智能体实例接口的 [MessageHistory](/aiagent-server/api-reference/agent-instance-management/create-agent-instance#messagehistory) 参数控制。相关参数详细结构如下：

<Tabs>
<Tab title="MessageHistory">

| 参数          | 类型      | 是否必选 | 描述                                                                                     |
|---------------|-----------|----------|------------------------------------------------------------------------------------------|
| SyncMode      | Number       | 否       | 消息同步模式：<ul><li>0：从 ZIM 同步。<Note title="说明"><ul><li>使用此模式前，请确认您的项目已开通 ZIM 服务。</li><li>若该 UserID 未通过 ZIM 客户端登录服务或未在 ZIM 服务端完成注册，实时互动 AI Agent 后台将自动为其执行 ZIM 服务注册流程。</li><li>建议您提前注册该用户，以便完善用户信息设置并提升智能体实例的创建效率。</li></ul></Note></li><li>1：通过下列 `Messages` 参数同步。</li></ul> |
| Messages      | Array of Object  | 否       | 消息列表。                                                                                        |
| WindowSize    | Number       | 否       | 每次调用 LLM 服务时，以最近多少条历史消息作为上下文。默认 20 条，最大 100 条。取值范围为 [0, 100]。                                                    |
| ZIM    | Object    | 否  | ZIM 相关信息。<Note title="说明">仅当 `SyncMode` 为 0 时有效。</Note> |

</Tab>
<Tab title="MessageHistory.Messages">

<MessagesStructure/>

</Tab>
<Tab title="MessageHistory.ZIM">

| 参数     | 类型   | 是否必选 | 描述                                                                 |
|----------|--------|----------|----------------------------------------------------------------------|
| RobotId    | String | 否  | 即调用 ZIM [注册机器人](https://doc-zh.zego.im/zim-server/bot/register-bots#请求参数)接口对应的`UserInfo.UserId`。用于加载用户与该 ZIM 机器人的聊天上下文，并将对话过程中产生的消息同步至 ZIM。如果此参数为空，实时互动 AI Agent 后台将随机生成。 |
| LoadMessageCount | Number | 否  | 创建智能体实例时，从 ZIM 服务获取多少条消息作为上下文。默认为 `WindowSize` 的值（取值上限）。 |

</Tab>
</Tabs>

#### 从 ZIM 的会话历史记录加载初始记忆

1. 确保APP已开通 [ZIM](https://doc-zh.zego.im/zim-android/introduction/overview) 服务
2. 在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时，将设置 `SyncMode` 为 0 ，并且填写对应的 `ZIM` 参数。示例如下：

<Note title="说明">`ZIM.RobotId`即调用 ZIM [注册机器人](https://doc-zh.zego.im/zim-server/bot/register-bots#请求参数)接口对应的`UserInfo.UserId`。</Note>

```json
 "MessageHistory": {
    "SyncMode": 0,
    "ZIM": {
        "RobotId": "@RBT#123",
        "LoadMessageCount": 10
    }
 }
```

#### 从自定义外部上下文加载初始记忆

1. 业务需要自己存储上下文信息。
2. 在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时，将设置 `SyncMode` 为 1 ，并且填写对应的 `Messages` 参数。示例如下：

```json
 "MessageHistory":{
    "SyncMode": 1,
    "Messages": [
        {
            "Role": "user",
            "Content": "你叫什么名字？"
        },
        {
            "Role": "assistant",
            "Content": "我叫豆包呀。"
        },
        {
            "Role": "user",
            "Content": "给我讲故事。"
        },
        {
            "Role": "assistant",
            "Content": "好呀，我给你讲一个《三只小猪》的故事吧。"
        }
    ]
}
```

### 管理语音通话过程中的记忆

管理语音通话过程中的记忆即管理智能体实例上下文。可以获取上下文列表也可以清空上下文。

#### 获取智能体实例上下文列表

调用获取智能体实例上下文列表接口（[GetAgentInstanceMsgList](/aiagent-server/api-reference/agent-instance-control/get-agent-instance-msg-list)），传入创建智能体实例接口返回的 `AgentInstanceId` ，服务端将返回该实例的上下文列表，消息按照聊天的时间升序返回，示例如下：

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "2537521374375652066",
    "Data": {
        "Total": 4,
        "MessageList": [
            {
                "Role": "user",
                "Content": "你叫什么名字？"
            },
            {
                "Role": "assistant",
                "Content": "我叫豆包呀。"
            },
            {
                "Role": "user",
                "Content": "给我讲故事。"
            },
            {
                "Role": "assistant",
                "Content": "好呀，我给你讲一个《三只小猪》的故事吧。"
            }
        ]
    }
}
```

#### 重置智能体实例上下文列表

调用重置智能体实例上下文列表接口（[ResetAgentInstanceMsgList](/aiagent-server/api-reference/agent-instance-control/reset-agent-instance-msg-list)），传入创建智能体实例接口返回的 `AgentInstanceId`，服务端将重置当前实例的上下文列表。

### 语音通话结束后归档记忆

您只需要在创建智能体实例时，将 `SyncMode` 设置为 `0` 且 `ZIM.RobotId` 为一个有效的 ZIM 机器人 ID，那么语音通话对话记录将存储到 ZIM 服务。这些已储存的历史聊天消息，可以用于后续对话的初始记忆。可参考[从 ZIM 的会话历史记录加载初始记忆](#从-zim-的会话历史记录加载初始记忆)章节。您也可以按业务需求用其他方式自行维护历史记忆归档。

设置示例如下：
```json
 "MessageHistory": {
    "SyncMode": 0,
    "ZIM": {
        "RobotId": "@RBT#123"
    }
}
```