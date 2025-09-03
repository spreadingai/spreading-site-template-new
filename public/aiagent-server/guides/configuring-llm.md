# 配置大语言模型

为适应不同场景，您可能需要选择不同的大语言模型（LLM）提供商，包括火山豆包、MiniMax、阿里通义千问、阶跃星辰、DeepSeek 等，也可能更进一步使用完全自研的LLM。本文说明常见大语言模型厂商如何配置及相关注意事项。

## LLM 参数说明

使用第三方 LLM 服务或者使用自定义的 LLM 服务时，需要配置 LLM 参数。

| 参数         | 类型   | 是否必填 | 描述                                                                                                                                                                     |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Url          | String | 是       | LLM 回调地址，必须与 OpenAI 协议兼容。                                                                                                                                   |
| ApiKey       | String | 否       | 访问 LLM 提供的各类模型及相关服务的身份验证凭证。                                                                                                                        |
| Model        | String | 是       | 调用的模型。不同的 LLM 服务提供商支持的配置不同，请参考对应文档填入。                                                                                                    |
| SystemPrompt | String | 否       | 系统提示词。可以是角色设定、提示词和回答样例等。                                                                                                                         |
| Temperature  | Float  | 否       | 较高的值将使输出更加随机，而较低的值将使输出更加集中和确定。                                                                                                             |
| TopP         | Float  | 否       | 采样方法，数值越小结果确定性越强；数值越大，结果越随机。                                                                                                                 |
| Params       | Object | 否       | 其他 LLM 参数，例如使用的最大 Token 数限制等。不同的 LLM 供应商支持的配置不同，请参考对应文档按需填入。<Note title="说明">参数名与各厂商 LLM 的参数名保持一致。</Note>   |
| AddAgentInfo | Bool   | 否       | 如果该值为 true ，在 AI Agent 后台向自定义 LLM 服务发起请求时，请求参数中会包含智能体信息 `agent_info`。该值默认为 false。在使用自定义 LLM 时可根据此参数内容做额外的业务逻辑。 |


## 使用第三方 LLM

<Note title="说明">
请先联系 ZEGO 技术支持开通第三方 LLM 服务，获取接入 Url 和 API Key。

第三方 LLM 需要兼容 OpenAI 协议。
</Note>

您可以在注册智能体（[RegisterAgent](/aiagent-server/api-reference/agent-configuration-management/register-agent)）或创建智能体实例（[CreateAgentInstance](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)）时设置 LLM 参数。

以下是常见 LLM 厂商的配置示例：

<Tabs>
<Tab title="火山方舟">
[火山方舟大模型服务平台](https://www.volcengine.com/docs/82379/1298454)模型使用说明文档。
```json
"LLM": {
    "Url": "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    "ApiKey": "zego_test", // your api key (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
    "Model": "doubao-lite-32k-240828",    // 您在火山方舟大模型平台创建的推理接入点
    "SystemPrompt": "你是小智，成年女性，是**即构科技创造的陪伴助手**，上知天文下知地理，聪明睿智、热情友善。\n对话要求：1、按照人设要求与用户对话。\n2、不能超过100字。",
    "Temperature": 1,
    "TopP": 0.7,
    "Params": {
        "max_tokens": 16384
    }
}
```
</Tab>
<Tab title="阿里云百炼">
[通义千问 API 的输入输出参数](https://bailian.console.aliyun.com/?tab=api#/api/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2712576.html)模型使用说明文档。
```json
"LLM": {
    "Url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    "ApiKey": "zego_test", // your api key (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
    "Model": "qwen-plus",
    "SystemPrompt": "你是小智，成年女性，是**即构科技创造的陪伴助手**，上知天文下知地理，聪明睿智、热情友善。\n对话要求：1、按照人设要求与用户对话。\n2、不能超过100字。",
    "Temperature": 1,
    "TopP": 0.7,
    "Params": {
        "max_tokens": 16384
    }
}
```
</Tab>
<Tab title="MiniMax">
[MiniMax](https://platform.minimaxi.com/document/ChatCompletion%20v2?key=66701d281d57f38758d581d0#QklxsNSbaf6kM4j6wjO5eEek)模型使用说明文档。
```json
"LLM": {
    "Url": "https://api.minimax.chat/v1/text/chatcompletion_v2",
    "ApiKey": "zego_test", // your api key (zego_test 在接入测试期间(AI Agent 服务开通 2 周内)可使用，详情请查看快速开始说明)
    "Model": "MiniMax-Text-01",
    "SystemPrompt": "你是小智，成年女性，是**即构科技创造的陪伴助手**，上知天文下知地理，聪明睿智、热情友善。\n对话要求：1、按照人设要求与用户对话。\n2、不能超过100字。",
    "Temperature": 1,
    "TopP": 0.7,
    "Params": {
        "max_tokens": 16384
    }
}
```
</Tab>
</Tabs>

## 使用自定义 LLM

AI Agent 后台使用 OpenAI API 协议调用 LLM 服务。因此，您也可以使用任何兼容 OpenAI 协议的自定义 LLM。这里的自定义 LLM 甚至可以在底层实现的时候调用多个子 LLM 模型或者进行 RAG 搜索、联网搜索后再进行整合输出。

详细使用说明请参考 [结合 RAG 使用 AI Agent](/aiagent-server/best-practices/use-ai-agent-with-rag)。

