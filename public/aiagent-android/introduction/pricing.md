# 定价

---

## 概述

<table>
  <thead>
    <tr>
      <th>定价组成（服务）</th>
      <th>定价说明</th>
      <th>IM 互动</th>
      <th>实时语音互动</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AI Agent 处理费用</td>
      <td><a href="#ai-agent-处理费用">AI Agent 音频处理费用</a></td>
      <td>❌</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td>RTC 费用</td>
      <td><a href="https://doc-zh.zego.im/article/8666">实时音视频价格说明</a></td>
      <td>❌</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td>IM 费用</td>
      <td><a href="https://doc-zh.zego.im/zim-android/introduction/pricing">ZIM 的计费</a></td>
      <td>✅</td>
      <td>❌</td>
      <td>（仅需接入免费版 ZIM 即可）</td>
    </tr>
    <tr>
      <td>ASR 费用</td>
      <td><a href="#asr语音识别">按使用时长计费</a></td>
      <td>可选</td>
      <td>✅</td>
      <td rowspan="2">若 IM 的语音消息互动，则必选</td>
    </tr>
    <tr>
      <td>TTS 费用</td>
      <td><a href="#tts文本转语音">按万字符数计费</a></td>
      <td>可选</td>
      <td>✅</td>
      <td></td>
    </tr>
  </tbody>
</table>

## 详细服务定价

### AI Agent 处理费用

<Warning title="注意">AI Agent 实例默认为 10 个并发，若希望增加请联系技术支持。</Warning>

在调用 AI Agent 能力创建智能体实例以进行实时语音时，产生的基础平台服务费用，包括产生相应的算力、出口带宽等成本。当智能体的输入和输出仅为语音时，将按照语音规格进行计费。

| 服务细项 | 服务细项类型 | 计费模式 | 档位 | 计费定价 | 备注 |
|---------|------------|---------|------|---------|------|
| AI Agent 音频处理费用 | 基础服务 | **智能体实时语音对话时长（元/千分钟）**<br />从“创建智能体实例”开始计时，到“删除智能体实例”结束计时。 | 不区分 | 9 | - |

### ASR（语音识别）

| 服务细项 | 服务细项类型 | 计费模式 | 档位 | 计费定价 | 备注 |
|---------|------------|---------|------|---------|------|
| ASR | 基础服务 | **使用时长（元/小时）**<br/>调用服务的时长累计，按照小时粒度计算。 | 不区分 | 3 | |


### TTS（文本转语音）

ZEGO AI Agent 支持火山引擎、阿里云和 MiniMax 提供的 TTS 服务。请您自行前往各服务提供商官网购买相关服务。具体计费事宜请见下表：

| 服务提供商 | TTS 服务 | 计费文档 |
|---------|------------|---------|
| 火山引擎 | [大模型语音合成 API](https://www.volcengine.com/docs/6561/1359370) | [火山引擎 TTS 服务计费](https://www.volcengine.com/docs/6561/1359370) 中 “大模型语音合成” 和 “大模型声音复刻” 相关内容。 |
| 阿里云 | [语音合成](https://help.aliyun.com/zh/isi/developer-reference/overview-of-speech-synthesis?spm=a2c4g.11186623.help-menu-30413.d_3_1_0_0.9e5b1f01YvXYPa&scm=20140722.H_84435._.OR_help-T_cn~zh-V_1#section-ljp-l5z-efu) | [大模型服务平台百炼 - 模型列表 - 语音合成（文本转语音）](https://help.aliyun.com/zh/model-studio/models?spm=a2c4g.11186623.help-menu-2400256.d_0_2.e81d4823h6bnsA&scm=20140722.H_2840914._.OR_help-T_cn~zh-V_1#b9e5744149hd6) |
| MiniMax | [语音模型 - T2A v2](https://platform.minimaxi.com/document/T2A%20V2?key=66719005a427f0c8a5701643#YqSh1KAoyms1WH4XJrdeIrrb) | [MiniMax 大模型服务平台计费 - 语音大模型](https://platform.minimaxi.com/document/Price?key=66701c7e1d57f38758d5818c#pwMy9RJb141XwWlsVZQajKnn) 中 “T2A v2” 和 “voice_clone（快速复刻）” 相关内容 。|