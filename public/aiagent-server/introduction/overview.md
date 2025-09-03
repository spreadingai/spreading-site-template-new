# 概述

--- 

<Note title="说明">
实时互动 AI Agent 全新升级并发布 2.0，ZEGO 基于全新为 AI 智能体实时互动打造的新一代实时互动 AI：
- 全面升级端到端的 AI 语音处理能力，实现 >95% 的识别准确率及打断准确率，尤其优化双讲、BGM 等场景；
- 全面优化互动架构，支持多用户与多 AI 互动场景；
- 全面提升接入体验及可用性。  

详情请查看 [发布日志](/aiagent-server/introduction/release-notes)。
</Note>

## 产品简介

[ZEGO 实时互动 AI Agent](https://www.zego.im/product/ai-agent)（下文简称"互动AI"或"AI Agent"），通过接入SDK及服务端 API，即可**快速实现**用户与 AI（智能体）进行**超低延迟的 IM 图文聊天**、**语音通话**、**数字人语音通话**等互动能力，从而满足 AI 陪伴、AI 客服、AI 数字人直播等场景。
ZEGO AI Agent 支持自定义设置人设、音色、形象等，支持多家大语言模型（LLM）、文本转换语音服务（TTS），且并支持长期记忆、外挂知识库、模型精调，从而实现更完美的智能体。

## 产品优势

<Video src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/4ad06a985a.mp4" />

### 可多模态互动的智能体
- **人设个性化**：可定义 AI 的性格、人设，通过 Prompt 最佳实践，结合 RAG、LoRA 等方式，更好匹配角色，满足专属需求。
- **丰富音色 & 声音克隆**：适用于情感陪伴、客服、电商等各场景共超百种的超拟人音色，且可音色克隆。
- **多模态互动**：IM 图文消息、实时语音通话、视频通话等。
- **扩展精品照片数字人**：低至 200ms，1 张照片即可赋予 AI 可实时互动形象，唇形准确、面部逼真。

### 实时语音通话能力
- **低至 1s 的延迟回复**。全程流式处理，基于自研 MSDN（实时有序数据网络）全球网络节点就近接入，实现全球低至 1s 的延迟。
- **仅 500ms 的自然语音打断**。人声检测迅速且精准判断，平滑打断不突兀，连续打断无串音。
- **说话状态精确判断**。不影响回复延迟情况下，拒绝一句话被错误断成多句，AI 回复更精准。

### 专为智能体打造的AI音频处理能力。
- **AI 降噪（AI ANS）**。消除环境噪声、音乐声、远处环境人声等，支持在办公室、居家、车中等各种环境下互动。
- **AI 人声检测（AI VAD）**。精确识别有效人声，过滤"嗯"、"喔"等等轻声回应及咳嗽、类人声等噪音。
- **AI 回声消除（AI AEC）**。精准消除被麦克风回采的 AI 声音、背景音乐等，拒绝 AI 讲话打断 AI，提高打断 AI 时的语音准确性。同时结合音量闪避、播放音量自适应等功能。

### 个性化接入
- **便捷接入**：不到10行代码，即可将智能体加入IM、实时语音通话、数字人实时通话中。
- **大语言模型及文本转语音等插件灵活选择**：火山方舟（豆包）、MiniMax、火山引擎、阿里云、阶跃星辰等国内外多厂商支持，且可支持开源模型。
- **高可用低成本服务**：针对语音识别（ASR）、大语言模型（LLM）、文本转语音（TTS） 的调用充分优化，有效利用并发资源及用量，降低整体链路成本。

## 产品功能

<table>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
<tbody><tr>
<th>功能模块</th>
<th>功能</th>
<th>功能说明</th>
</tr>
<tr>
<td rowspan="7">与智能体实现语音通话</td>
<td>[创建、更改、删除、查询智能体](/aiagent-server/quick-start)</td>
<td>创建智能体，包括调整智能体虚拟用户的基本信息描述，包括人设（系统提示词）、音色等，以及智能体使用的大语言模型（LLM）、文本转语音（TTS）等参数。</td>
</tr>
<tr>
<td>[单人发起智能体语音通话](/aiagent-server/quick-start)</td>
<td>通过创建智能体，实现最低至 1s 延迟的与AI进行实时语音通话。</td>
</tr>
<tr>
<td>多人与智能体互动（内测）</td>
<td>通过创建群智能体实例，实现多人与单智能体互动的能力。<Note title="说明">功能内测中，详情请联系 ZEGO 商务。</Note></td>
</tr>
<tr>
<td>单人与多智能体互动（内测）</td>
<td>通过创建智能体，并按照配置音色映射规则，实现单用户与多智能体互动。<Note title="说明">功能内测中，详情请联系 ZEGO 商务。</Note></td>
</tr>
<tr>
<td>专为 AI 互动的AI音频处理能力</td>
<td>自动过滤对话过程中用户侧产生的嘈杂音，并消除远场人声，实现更精准的语音打断效果、更准确的 ASR 语音识别效果。</td>
</tr>
<tr>
<td>自然语音打断</td>
<td>在实时语音通话过程中，智能体智能识别用户的对话打断意图，并停止智能体的输出。</td>
</tr>
<tr>
<td>实时播报</td>
<td>智能体和用户的对话信息将会被实时转换成文字，并由客户端展示。</td>
</tr>
<tr>
<td rowspan="10">基础能力</td>
<td>[大语言模型（LLM）管理](/aiagent-server/guides/configuring-llm)</td>
<td>调整智能体所应用大语言模型（LLM）。<ul><li>商用 LLM：OpenAI、MiniMax、通义千问、火山方舟（豆包）、阶跃星辰、文心一言。</li><li>兼容 [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat) 的开源 LLM。</li></ul></td>
</tr>
<tr>
<td>文本转语音（TTS）管理</td>
<td>支持各类文本转语音TTS及相关能力：<ul><li>支持的服务提供商：火山引擎（单向流式 &amp; 双向流式）、阿里云（CosyVoice）、MiniMax；</li><li>针对厂商的各类模型、公共音色、音色克隆，且支持语速、语调等调节。</li></ul></td>
</tr>
<tr>
<td>数字人管理</td>
<td>基于 ZEGO 数字人，将数字人形象结合到 RTC 实时视频互动中。其中精品照片数字人，仅需一张照片或图片，即可获得1080P的数字人，并可在语音通话时赋予 AI 形象。</td>
</tr>
<tr>
<td>增删改智能体实例</td>
<td>创建或删除某一个AI Agent 的实例，从而开启一次与智能体的语音、数字人互动。</td>
</tr>
<tr>
<td>[获取智能体状态](/aiagent-server/guides/get-ai-agent-status)</td>
<td>接收相应的服务端回调来获取智能体开始说话、结束说话状态；同时可通过查询智能体状态API，获取包括空闲中、聆听中、思考中、讲话中等状态。</td>
</tr>
<tr>
<td>[记忆（上下文）来源](/aiagent-server/advanced/ai-short-term-memory#设置初始记忆)</td>
<td>智能体的记忆（上下文），可通过外置传入记忆，也可通过绑定即时通讯（ZIM）的历史记录传入。</td>
</tr>
<tr>
<td>[记忆（上下文）更新](/aiagent-server/advanced/ai-short-term-memory#重置智能体实例上下文列表)</td>
<td>在本次智能体实例生命周期中，记录每次对话的内容，并作为后续上下文消息作为智能体记忆。记忆可被清除，重新开启对话。</td>
</tr>
<tr>
<td>[记忆（上下文）归档](/aiagent-server/advanced/ai-short-term-memory#语音通话结束后归档记忆)</td>
<td>将用户与智能体的对话转化为文本信息并存储</td>
</tr>
<tr>
<td>[语音识别热词](/aiagent-server/guides/configuring-asr-hot-word)</td>
<td>针对角色名称等专用词汇，可以通过设置临时热词，提高语音识别的准确率。</td>
</tr>
<tr>
<td>[主动调用 LLM](/aiagent-server/guides/proactive-invocation-of-llm-and-tts)</td>
<td>模拟用户提问，自定义发送消息给 LLM，LLM 响应后通过 TTS 向用户发送语音。可用于实现基于上下文的欢迎语等场景。</td>
</tr>
<tr>
<td>[主动调用 TTS](/aiagent-server/guides/proactive-invocation-of-llm-and-tts)</td>
<td>可随时调用 TTS，实现 AI 的主动播报，从而满足 AI 欢迎语、提醒用户等场景。且支持配置是否加入历史记录和上下文</td>
</tr>
<tr>
<td rowspan="3">进阶能力</td>
<td>[智能体打断模式控制](/aiagent-server/guides/interrupt-agent-speech)</td>
<td>智能体说话被打断的形式可包含多种，且可多选：<ul><li>自然语音打断。当智能体接受到语音，即用户说话时，打断智能体说话。</li><li>手动打断。通过服务端 API 控制打断，从而实现用户通过按钮，或业务侧管理打断。</li></ul></td>
</tr>
<tr>
<td>过滤 LLM 输出、TTS 输入</td>
<td>基于一定规则进行过滤，例如中英文括号、emoji表情等，更可控的 AI 行为。</td>
</tr>
<tr>
<td>[语音识别断句优化](/aiagent-server/advanced/speech-segmentation-control)</td>
<td>支持人声检测的断句阈值设置、停顿时长设置，从而实现延迟和语音断句之间的平衡。</td>
</tr>
<tr>
<td rowspan="6">最佳实践</td>
<td>[角色扮演提示词](/aiagent-server/best-practices/role-playing-system-prompt)</td>
<td>将智能体使用于角色扮演时，系统提示词（system prompt）如何撰写，可以更好的展现效果。</td>
</tr>
<tr>
<td>结合 RAG 更好的输出</td>
<td>支持您针对 AI 外挂知识库，从而实现更多基础话术、公司信息等内容。</td>
</tr>
<tr>
<td>[实现与 AI 进行 IM 聊天并发起语音通话](/aiagent-server/best-practices/interact-with-the-in-app-chat)</td>
<td>基于ZIM，实现与AI的文本消息互动，并能够共享记忆发起语音通话。</td>
</tr>
<tr>
<td>记忆模块</td>
<td>针对持续时间跨度较长，且需要AI记忆用户的更多基本信息（例如年龄、出生地、偏好）等，进行定期总结和沉淀，实现更智能的AI交互。</td>
</tr>
<tr>
<td>LoRA、SFT 模型微调</td>
<td>对 AI 的人设诉求非常高时，可以针对 LLM 进行精调。例如克隆主播代替真人的场景。</td>
</tr>
<tr>
<td>[克隆音色并应用在 AI 语音对话中](/aiagent-server/best-practices/clone-voice)</td>
<td>将克隆的音色，适用于语音通话过程中，实现与特定音色的智能体通话。</td>
</tr>
</tbody></table>
<Content />