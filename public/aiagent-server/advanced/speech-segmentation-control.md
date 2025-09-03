# 语音识别断句

由于 LLM （大语言模型）并不能支持流式输入，故需要基于 ASR 语音识别的实时结果，来判断用户是否结束说话，并请求LLM开始新一轮问答。而判断用户是否说话结束可由 `VADSilenceSegmentation` 和 `PauseInterval` 两个参数影响。

## 参数说明

影响用户说话结束判断的两个参数在注册/更新智能体、创建/更新智能体实例的 [ASR 参数](/aiagent-server/api-reference/common-parameter-description#asr)中。详细说明如下：
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| VADSilenceSegmentation | Number | 否 | 用于设置用户说话停顿多少毫秒后，不再将两句话视为一句。范围 [200，2000]，默认为 500。 |
| PauseInterval | Number | 否 | 用于设置用户说话停顿多少毫秒内，将两句话视为一句，即 ASR 多句拼接。范围 [200，2000]。仅当此值大于 VADSilenceSegmentation，才会开启 ASR 多句拼接。 |

## 场景举例

<Frame width="auto" height="128" caption="">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/1884db5e78.png" alt="asr_vad_example.png"/>
</Frame>

|配置|问答结果|
|---|---|
|VADSilenceSegmentation = 500ms，<br/>PauseInterval 不填|用户被判断为说了两次话，一共进行2轮问答<br/>**第1轮：**<br/>- user：今天天气真好啊。我想出去玩<br/>- assistant：回答1（被第2轮打断）<br/>上下文：空<br/>**第2轮：**<br/>- user：你呢？<br/>- assistant：回答2<br/>上下文：第一轮问答|
|VADSilenceSegmentation = 500ms，<br/>PauseInterval = 1000ms|用户被判断为说了一次话，一共进行1轮问答<br/>- user：今天天气真好啊。我想出去玩。你呢？<br/>- assistant：回答1<br/>上下文：空|

## 最佳实践配置

<Note title="说明">若您不知道哪一个效果更好，推荐使用场景2配置。</Note>

| 场景 | VADSilenceSegmentation | PauseInterval |
| --- | --- | --- |
| 场景1:用户说话短频快。例如陪伴场景 | 500ms | 不填 |
| 场景2:用户一次内容有长有短，且对延迟敏感。例如客服场景 | 500ms | 1000～1500ms |
| 场景3:用户说话通常较长，延迟不太敏感 | 1000ms | 不填 |




