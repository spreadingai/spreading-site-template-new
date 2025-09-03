# 配置语音识别热词

在特定的场景下，通常存在一些专用词汇，例如角色名、用户名、功能名称等，可以通过设置临时热词，提高语音识别的准确率。
语音识别热词能力支持在智能体实例的粒度下设置临时热词，从而实现每次发起语音通话时均可设置专属本次对话的热词。

## 快速开始

您可以在注册智能体（[RegisterAgent](/aiagent-server/api-reference/agent-configuration-management/register-agent)）或创建智能体实例（[CreateAgentInstance](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)）时通过 `ASR` 参数中的 `HotWord` 设置热词表。

### HotWord 使用说明

- 热词使用格式为："热词|权重"。
- 单个热词不超过30个字符（最多10个汉字），权重[1-11]。如："即构科技|5" 或 "ASR|11"。
- 多个热词用英文逗号分隔并组成一个字符串，最多支持128个热词。如："即构科技|10,实时互动|5,ASR|11"。
- 热词不能包含空格。如："即构科技 实时互动|10"

<Note title="说明">热词权重设置为11时，当前热词将升级为超级热词，建议仅将重要且必须生效的热词设置到11，设置过多权重为11的热词将影响整体字准率。</Note>

### 使用示例

以下为设置“即构科技”为热词的示例。

<CodeGroup>
```json 调用RegisterAgent接口设置热词 {28}
{
    "AgentId": "xiaozhi",
    "AgentConfig": {
        "Name": "小智",
        "LLM": {
            "Url": "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
            "ApiKey": "zego_test", // your api key (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
            "Model": "doubao-lite-32k-240828",
            "SystemPrompt": "你是小智，成年女性，是**即构科技创造的陪伴助手**，上知天文下知地理，聪明睿智、热情友善。\n对话要求：1、按照人设要求与用户对话。\n2、不能超过100字。"
        },
        "TTS": {
            "Vendor": "ByteDance",
            "Params": {
                "app": {
                    "appid": "zego_test", // your appid (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
                    "token": "zego_test", // your token (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
                    "cluster": "volcano_tts"
                },
                "audio": {
                    "voice_type": "zh_female_wanwanxiaohe_moon_bigtts" // your voice type
                }
            }
        },
        "ASR": {
            "HotWord": "即构科技|10"
        }
    }
}
```

```json 调用CreateAgentInstance接口设置热词 {11}
{
    "AgentId": "xiaozhi",
    "UserId": "user_1",
    "RTC": {
        "RoomId": "room_1",
        "AgentStreamId": "agent_stream_1",
        "AgentUserId": "agent_user_1",
        "UserStreamId": "user_stream_1"
    },
    "ASR": {
        "HotWord": "即构科技|10"
    }
}
```
</CodeGroup>