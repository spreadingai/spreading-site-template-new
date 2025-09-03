# 智能体应用克隆音色

在与智能体进行实时语音互动对话时，可以将智能体的音色切换为期望的音色，例如某个用户的声音。只需录制秒级别的目标人物声音，即可即时完成对人物音色、说话风格、口音和声学环境音的复刻。

音色克隆属于增值能力，计费方式请参考：[TTS 定价](/aiagent-server/introduction/pricing#tts文本转语音) 说明。

<Note title="说明">目前支持火山引擎、MiniMax、阿里等多家厂商的声音复刻及文本转语音能力。</Note>

## 前提条件

- 已经参考[快速开始](/aiagent-server/quick-start)接入 AI Agent 服务。
- 请联系技术支持开通TTS（文字转语音/语音合成/声音克隆）服务（需要选定所需厂商），并获取相关子账号或API鉴权信息等。

## 使用步骤

<Steps>
<Step title="按各厂商指引克隆音色">
<Tabs>
<Tab title="MiniMax">
1. 联系 ZEGO 技术支持获取的子帐号、group_ip、api_key 。
2. 克隆音色
    - 方式1：参考[MiniMax文档中心-快速复刻（Voice Cloning）](https://platform.minimaxi.com/document/Voice%20Cloning?key=66719032a427f0c8a570165b#GuPbbFheke90twNM9xfS1Akp)完成音色克隆。
    - 方式2：在 MiniMaxAPI 调试台页面完成声音克隆
        <Frame width="auto" height="auto" caption="">
        <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/ac1402eb31.png" alt="minimax-api-voice-clone.png"/>
        </Frame>
3. 克隆完成后，请保管好 voice_id 。
</Tab>
<Tab title="火山引擎">
1. 联系 ZEGO 技术支持，购买声音复刻服务并获得音色ID。
1. 使用 ZEGO 技术支持提供的火山引擎 appid、token 调用 [声音复刻API-2.0](https://www.volcengine.com/docs/6561/1305191) 完成音色克隆。
2. 克隆完成后，请保管好 speaker_id 和声音复刻的集群（cluster）。
</Tab>
</Tabs>
</Step>
<Step title="在语音对话中使用克隆的音色">
在注册Agent智能体（[RegisterAgent](/aiagent-server/api-reference/agent-configuration-management/register-agent)）或创建智能体实例（[CreateAgentInstance](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)）时，设置 TTS 结构体中填写Params字段，该字段将透传给第三方 TTS 的接口，其中就包括音色信息：

- MiniMax：填写 voice_id
- 火山引擎：填写 speaker_id

<CodeGroup>
```json MiniMax {6,7,11}
// Minimax，voice_id 填写为使用克隆的音色
"TTS": {
    "Vendor": "MiniMax",
    "Params": {
        "app": {
            "group_id": "your_group_id",
            "api_key":  "your_api_key"
        },
        "model": "speech-02-turbo-preview",
        "voice_setting": {
            "voice_id": "clone_voice_id"
        }
    }
}
```

```json title="火山引擎 - 单向流式TTS" {9-11,14}
// 1. cluster
//          volcano_mega： 声音复刻大模型 1.0
//          volcano_icl：  声音复刻大模型 2.0
// 2. voice_type 填写为使用克隆的speaker_id
"TTS": {
    "Vendor": "ByteDance",
    "Params": {
        "app": {
            "appid": "your_appid",
            "token": "your_token",
            "cluster": "volcano_icl"
        },
        "audio": {
            "voice_type": "clone_speaker_id",
        }
    }
}
```
```json title="火山引擎 - 双向流式TTS" {9-11,14}
// 1. resource_id：根据控制台查看开通的版本选择
//       volc.megatts.default（小时版）
//       volc.megatts.concurr（并发版）
// 2. speaker 填写为使用克隆的speaker_id
"TTS": {
    "Vendor": "ByteDanceFlowing",
    "Params": {
        "app": {
            "appid": "your appid",
            "token": "your token",
            "resource_id": "volc.megatts.default"
        },
        "req_params": {
            "speaker": "clone_speaker_id" //音色id
        }
    }
}
```
</CodeGroup>
</Step>
</Steps>