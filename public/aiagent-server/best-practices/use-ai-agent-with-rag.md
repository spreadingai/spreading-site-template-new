# 结合 RAG 使用 AI Agent

## 背景

在大语言模型（LLM）各场景应用实际落地时，依靠单一 LLM 输入输出往往达不到预期效果，经常会遇到 AI 出错、乱答等准确性问题，甚至对业务产生危害。

使用“外挂知识库”的方式可以有效优化这些 LLM 面临的问题。而 RAG（Retrieval-Augmented Generation，检索增强生成）技术就是其中一种。

本文将介绍如何结合 RAG 使用 AI Agent，为 AI Agent 的外挂知识库提供支持。

## 方案

实现方案如下图所示：
1. 用户说话通过 ZEGO Express SDK 将语音流推到 ZEGO 实时音视频云
2. AI Agent 后台收到语音流后，将语音流转换为文本后按 OpenAI 规范向您自定义的 LLM 服务发起 ChatCompletion 请求
3. 您自定义的 LLM 服务在收到请求后进行 RAG 检索，将检索到的片段结合用户最新问题作为输入调用 LLM 生成流式响应
4. AI Agent 后台将 LLM 的流式响应转换为语音流，通过实时音视频云推流到客户端，客户就听到 AI Agent 的回答了

<Frame width="512" height="auto" caption="">
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/eb103c003d.png" alt="how-to-use-ai-agent-with-rag.png"/>
</Frame>

<Note title="说明">
- 图中“意图识别”和“问题增强”步骤不是必要的，但是为了提高 AI Agent 的回答准确性，建议您实现这两个步骤。
- 图中我们可以看到与“RAG 查询”步骤并列的还有“联网搜索”等步骤，这些步骤是可选的，您可以根据您的业务需求仿照 RAG 查询流程实现。
- 图中 LLM_A、LLM_B、LLM_C 旨在说明您在各个节点可以根据性能及成本考虑使用不同的 LLM 厂商模型，当然您也可以使用同一个 LLM 厂商模型。
</Note>

## 示例代码
以下是接入实时互动 AI Agent API 的业务后台示例代码，您可以参考示例代码来实现自己的业务逻辑。

<CardGroup cols={2}>
<Card title="业务后台示例代码（含 RAG 查询实现）"  href="https://github.com/ZEGOCLOUD/ai_agent_quick_start_server/tree/rag" target="_blank">
<Warning title="注意">请使用 rag 分支代码</Warning>
包含最基本的获取 ZEGO Token、注册智能体、创建智能体实例、删除智能体实例等能力。
</Card>
</CardGroup>

以下是客户端示例代码，您可以参考示例代码来实现自己的业务逻辑。
<CardGroup cols={2}>
<Card title="Android 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/master/android" target="_blank">
包含最基本的登录、推流、拉流、退出房间等能力。
</Card>
<Card title="iOS 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/master/ios" target="_blank">
包含最基本的登录、推流、拉流、退出房间等能力。
</Card>
<Card title="Web 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/master/web" target="_blank">
包含最基本的登录、推流、拉流、退出房间等能力。
</Card>
<Card title="Flutter 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/master/flutter" target="_blank">
包含最基本的登录、推流、拉流、退出房间等能力。
</Card>
</CardGroup>

以下视频演示了如何跑通服务端和客户端（iOS）示例代码并跟智能体进行语音互动。
<Warning title="注意">
- 服务端必须部署到可以访问的公网环境，不要使用 localhost 或者局域网地址。
- 部署时环境变量必须使用 rag 分支的环境变量。
</Warning>
<Video src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/aaaa65c2d4.mp4" />


## 实现服务端功能

<Steps titleSite="h3">
<Step title="实现 RAG 查询" titleSize="h3">


要实现 RAG 查询我们有多种方案。以下是一些常见方案：
- [LangChain](https://js.langchain.com/docs/integrations/retrievers/)
- [LlamaIndex](https://www.llamaindex.ai/)
- [LightRAG](https://lightrag.github.io/)
- [RAGFlow](https://ragflow.io/)
- [阿里云百炼](https://www.aliyun.com/product/bailian)

本文以 RAGFlow 和 阿里云百炼为例介绍实现方式。


<Tabs>
<Tab title="阿里云百炼">
- 知识库使用指南请参考 [使用指南](https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.7ba312d5YW74o6&tab=doc#/doc/?type=app&url=2807740)。

<Steps titleSite="p">
<Step title="上传应用数据">
打开阿里云百炼控制台，切换到“应用->应用数据”。在“类目管理”中创建一个类目，然后点击导入数据选择文件上传导入到类目中。
</Step>
<Step title="创建知识库">
打开阿里云百炼控制台，切换到“应用->知识库”。点击“创建知识库”按钮，填写知识库名称后点击“下一步”。在选择数据时，选择上一步导入的文件。
</Step>
<Step title="实现 RAG 查询接口">
请参考 [阿里云百炼 API 指南](https://bailian.console.aliyun.com/?spm=5176.29619931.J_AHgvE-XDhTWrtotIBlDQQ.13.74cd521cb6A3jn&tab=doc#/doc/?type=app&url=2852772) 实现 RAG 查询接口。

<Accordion title="查询接口示例代码" defaultOpen="false">
示例代码环境变量说明：

- ALIBABA_CLOUD_ACCESS_KEY_ID: 参考 [如何创建 ACCESS_KEY 及 ACCESS_KEY_SECRET](https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair?spm=a2c4g.11186623.0.i2)
- ALIBABA_CLOUD_ACCESS_KEY_SECRET: 参考 [如何创建 ACCESS_KEY 及 ACCESS_KEY_SECRET](https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair?spm=a2c4g.11186623.0.i2)
- ALIBABA_CLOUD_SERVICE_ENDPOINT: 使用`bailian.cn-beijing.aliyuncs.com`
- ALIBABA_CLOUD_BAILIAN_WORKSPACE_ID: 参考 [如何获取阿里云百炼业务空间ID](https://bailian.console.aliyun.com/?spm=5176.29619931.J_AHgvE-XDhTWrtotIBlDQQ.13.74cd521cb6A3jn&tab=doc#/doc/?type=model&url=2587495)
- ALIBABA_CLOUD_BAILIAN_KB_INDEX_ID: 阿里云百炼控制台->应用->知识库->鼠标放置在知识库右侧的ID图标上->复制弹出的ID

```js
import * as bailian20231229 from '@alicloud/bailian20231229'
import * as OpenApi from '@alicloud/openapi-client'
import * as Util from '@alicloud/tea-util'

// 创建阿里云客户端的函数
const createClient = () => {
    const config = new OpenApi.Config({
        accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
    })

    config.endpoint = process.env.ALIBABA_CLOUD_SERVICE_ENDPOINT

    return new bailian20231229.default(config)
}

// 添加返回类型定义
interface BailianResponse {
  kbContent: string;
  rawResponse: any; // 保留原始响应，以防其他地方需要使用
}

// 检索函数
export const retrieveFromBailian = async ({ query }: { query: string }): Promise<BailianResponse> => {
    const client = createClient()
    // !mark
    const retrieveRequest = new bailian20231229.RetrieveRequest({
        query,
        enableReranking: false,
        indexId: process.env.ALIBABA_CLOUD_BAILIAN_KB_INDEX_ID,
    })

    const runtime = new Util.RuntimeOptions({})
    const headers = {}

    console.log(">>>>>>>>>>>>>>>>>>> 开始检索：", query, "检索 <<<<<<<<<<<<<<<<");
    const result = await client.retrieveWithOptions(
        process.env.ALIBABA_CLOUD_BAILIAN_WORKSPACE_ID!,
        retrieveRequest,
        headers,
        runtime
    )
    console.log(">>>>>>>>>>>>>>>>>>> 检索结果：", result, "检索结果 <<<<<<<<<<<<<<<<");

    if (!result?.body?.success || !result?.body?.data?.nodes) {
        throw new Error('资料库查询失败');
    }

    // 处理资料库内容
    // !mark(1:4)
    const kbContent = result.body.data.nodes
        .slice(0, Number(process.env.KB_CHUNK_COUNT))
        .map((node: any) => `doc_name: ${node.metadata.doc_name}\ncontent: ${node.text}`)
        .join('\n\n');

    console.log(">>>>>>>>>>>>>>>>>>> 检索结果：", kbContent, "检索结果 <<<<<<<<<<<<<<<<");

    return {
        kbContent,
        rawResponse: result
    };
}
```
</Accordion>
</Step>
</Steps>
</Tab>

<Tab title="RAGFlow">
<Steps titleSite="p">
<Step title="部署 RAGFlow">

请参考 [RAGFlow 部署文档](https://ragflow.io/docs/dev/#start-up-the-server) 部署 RAGFlow。

<Warning title="注意">请不要直接使用 [RAGFlow Demo](https://demo.ragflow.io/) 创建数据库并通过API请求。因为 RAGFlow Demo 的接口已限制访问会导致查询失败。</Warning>
</Step>
<Step title="创建知识库">
请参考 [RAGFlow 创建知识库文档](https://ragflow.io/docs/dev/#create-your-first-knowledge-base) 创建知识库。
</Step>
<Step title="实现 RAG 查询接口">
请参考 [RAGFlow Retrieve chunks](https://ragflow.io/docs/dev/http_api_reference#retrieve-chunks) 接口说明文档实现 RAG 查询接口。
<Accordion title="查询接口示例代码" defaultOpen="false">
示例代码环境变量说明：

- RAGFLOW_KB_DATASET_ID: 点击进入知识库后，URL 后的请求参数id值即为知识库ID。
- RAGFLOW_API_ENDPOINT: 点击右上角切换到系统设置页面->API->API 服务器
- RAGFLOW_API_KEY: 点击右上角切换到系统设置页面->API->点击“API KEY”按钮->创建新密钥

```js
export async function retrieveFromRagflow({
    question,
    dataset_ids = [process.env.RAGFLOW_KB_DATASET_ID!],
    document_ids = [],
    page = 1,
    page_size = 100,
    similarity_threshold = 0.2,
    vector_similarity_weight = 0.3,
    top_k = 1024,
    rerank_id,
    keyword = true,
    highlight = false,
}: RetrieveParams): Promise<RagFlowResponse> {
    // 检查必要的环境变量
    if (!process.env.RAGFLOW_API_KEY || !process.env.RAGFLOW_API_ENDPOINT) {
        throw new Error('缺少必要的RAGFlow配置信息');
    }

    // 检查必要的参数
    if (!dataset_ids?.length && !document_ids?.length) {
        throw new Error('dataset_ids 或 document_ids 至少需要提供一个');
    }

    // 构建请求体
    const requestBody = {
        question,
        dataset_ids,
        document_ids,
        page,
        page_size,
        similarity_threshold,
        vector_similarity_weight,
        top_k,
        rerank_id,
        keyword,
        highlight,
    };

    try {
        // 使用官方文档中的正确端点格式
        // !mark
        const response = await fetch(`${process.env.RAGFLOW_API_ENDPOINT}/api/v1/retrieval`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RAGFLOW_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`RAGFlow API 错误: ${response.status} ${response.statusText}, 详细信息: ${errorData}`);
        }

        const data: RagFlowRetrievalResponse = await response.json();


        // 处理检索结果，将其转换为拼接好的文本
        let kbContent = '';
        // 返回的 chunk 可能会很多，所以需要限制一下返回的 chunk 数量
        let kbCount = 0;

        // !mark(1:6)
        for (const chunk of data.data.chunks) {
            if (kbCount < Number(process.env.KB_CHUNK_COUNT)) {
                kbContent += `doc_name: ${chunk.document_keyword}\ncontent: ${chunk.content}\n\n`;
                kbCount += 1;
            }
        }

        return {
            kbContent,
            rawResponse: data
        };

    } catch (error) {
        console.error('RAGFlow检索失败:', error);
        throw error;
    }
}
```
</Accordion>
</Step>
</Steps>
</Tab>

</Tabs>

</Step>
<Step title="实现自定义 LLM" titleSize="h3">
创建符合 OpenAI API 协议的接口。

<Tabs>
<Tab title="接口关键点说明">
提供一个兼容 [platform.openai.com](https://platform.openai.com/docs/api-reference/chat) 的 `chat/completions` 接口。关键点如下：

- 接口路径：可以被 AI Agent 调用的 Url，例如 `https://your-custom-llm-service/chat/completions`。
- 请求格式：接受兼容 OpenAI 协议的请求头和请求体。
- 响应格式：返回与 OpenAI 协议兼容、且符合 SSE 规范的流式响应数据。


<Accordion title="AI Agent 后台向 chat/completions 接口发起请求的请求体示例" defaultOpen="false">
```json
{
    "model": "your model name", // 对应 LLM.Model 参数
    "temperature": 1, // 对应 LLM.Temperature 参数
    "top_p": 0.7, // 对应 LLM.TopP 参数
    "max_tokens": 16384, // 对应 LLM.Params.max_tokens 参数
    "messages":[
        {
            "role": "system",
            "content": "请根据用户提供的知识库内容用友好的语气回答用户问题，如果用户的问题不在知识库中，请礼貌的告诉用户我们没有相关的知识库内容。" // 对应 LLM.SystemPrompt 参数
        },
        ... // 其他消息
    ],
    ... // 其他参数
    // 如果 LLM.AddAgentInfo 参数为 true，则会包含 agent_info 信息
    "agent_info": {
        "room_id": "所在roomid",
        "agent_instance_id" : "智能体实例 id",
        "agent_user_id" : "智能体的user id",
        "user_id": "用户的user id",
        "round_id": 1, //轮次id
        "time_stamp": 193243200 //毫秒级别时间戳
    }
}
```
</Accordion>

<Accordion title="Chat Completion 流式响应对象块示例" defaultOpen="false">
```json
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"您"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":1,"total_tokens":84}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"好"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":2,"total_tokens":85}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"！"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":3,"total_tokens":86}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"即"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":4,"total_tokens":87}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"构"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":5,"total_tokens":88}}
...
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"更多的"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":147,"total_tokens":230}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"价值"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":148,"total_tokens":231}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":"。"},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":149,"total_tokens":232}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":""},"finish_reason":""}],"usage":{"prompt_tokens":83,"completion_tokens":150,"total_tokens":233}}
data: {"id":"d7ae7c4a-1524-4fe5-9d58-e4d59b89d8f0","object":"chat.completion.chunk","created":1709899323,"model":"step-1-8k","choices":[{"index":0,"delta":{"role":"","content":""},"finish_reason":"stop"}],"usage":{"prompt_tokens":83,"completion_tokens":150,"total_tokens":233}}
data: [DONE]
```
</Accordion>
<Warning title="注意">
自定义 LLM 流式数据格式注意事项如下：
- 每条数据必须以 `data: ` 开头（注意冒号后有空格）。
- 每条数据为单独一行或者行尾有换行符。
- 最后一个有效数据必须包含 `"finish_reason":"stop"`。
- 最后必须发送一条结束数据：`data: [DONE]`。

如果格式不正确可能会导致智能体不输出或者输出不完整。
</Warning>
</Tab>
<Tab title="接口实现流程及示例">
<Steps titleSite="p">
<Step title="解析请求参数">
解析请求参数并获取必要信息。
```js
export async function POST(request: NextRequest) {
    try {
        // !mark
        const requestData: ChatCompletionCreateParams = await request.json();
        console.log("requestData", requestData);
        // 检查必需字段
        if (!requestData.messages || requestData.messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages are required' },
                { status: 400 }
            );
        }
        // 读取最新一条 User Message（最新的在数组最后）
        // AIAgent 在向你的接口发起请求时，会带上 Messages 参数。这个参数也包括 SystemPrompt。
        // !mark
        const latestUserMessage = [...requestData.messages].reverse().find(message => message.role === 'user');

        // ... 其他代码
    } catch (error) {
        // ... 其他代码
    }
}
```
</Step>
<Step title="查询知识库">
根据最新一条 User Message 查询知识库。
```js
let kbContent = "";
// 调用知识库查询接口，获取知识库查询结果
if (process.env.KB_TYPE === "ragflow") {
    console.log("调用 Ragflow 知识库查询接口");
    // !mark
    const ragflowResponse = await retrieveFromRagflow({
        question: latestUserMessage?.content as string,
    });
    kbContent = ragflowResponse.kbContent;
} else if (process.env.KB_TYPE === "bailian") {
    console.log("调用 Bailian 知识库查询接口");
    // !mark
    const bailianResponse = await retrieveFromBailian({ query: latestUserMessage?.content as string });
    kbContent = bailianResponse.kbContent;
}
```
<Note title="小提示">
通常在查询知识库之前会配合意图识别和问题增强提高回答质量。
- 意图识别：识别用户意图，如果不需要查询知识库的则直接回答用户问题，否则继续。比如：用户说“你好”。
- 问题增强：根据历史对话及预设条件，对用户最新的问题进行补充增强。比如：用户问“2024年呢？”，则增强为“2024年公司净利润是多少？”。
</Note>
</Step>
<Step title="将用户最新问题及知识库片段合并后调用 LLM 进行回答">

<Note title="小提示">部分厂商的模型提供上下文硬盘缓存能力，所以计算价格时有缓存的计价会便宜很多。保持 SystemPrompt 不变，只替换 User Message 可有效提升缓存命中概率从而降低成本并且缩短推理时间。</Note>
```js
// !mark(1:4)
requestData.messages[requestData.messages.length - 1] = {
    role: 'user',
    content: `${latestUserMessage?.content}\n以下是知识库查询结果:\n${kbContent}`,
};
// 调用 LLM 进行回答（使用 OpenAI 的 SDK）
// LLM_BASE_URL_REAL 是真实 LLM 服务的 URL
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: process.env.LLM_BASE_URL_REAL
});
// 处理流式响应
const completion = await openai.chat.completions.create({
    model: model,
    stream: true,
    messages: requestData.messages
});
console.log("completion created successfully");
// 创建流式响应
const stream = new TransformStream();
const writer = stream.writable.getWriter();
const encoder = new TextEncoder();
for await (const chunk of completion) {
    // 注意⚠️：AIAgent 要求最后一个有效数据必须包含 "finish_reason":"stop"且最后必须发送一条结束数据：data: [DONE]，如果不发送可能会导致智能体不回答或者回答不完整。
    // 某些模型不会在流式响应中返回 finish_reason，这种情况需要自己根据修改一下chunk内容再传回给 AIAgent。
    const ssePart = `data: ${JSON.stringify(chunk)}\n`;
    // 持续写入流式响应数据，直到流式数据结束
    // !mark
    writer.write(encoder.encode(ssePart));
}
// 发送结束标记
// !mark
writer.write(encoder.encode('data: [DONE]\n\n'));
writer.close();
```
</Step>
</Steps>
<Accordion title="chat/completions 接口的完整示例代码" defaultOpen="false">
<CodeGroup>
```json title="Node.js(Next.js)"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { retrieveFromRagflow } from '@/lib/rag/ragflow';
import OpenAI from 'openai';
import type { ChatCompletionCreateParams } from 'openai/resources/chat';
import { retrieveFromBailian } from '@/lib/rag/bailian';


export async function POST(request: NextRequest) {
    // 认证检查
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const requestData: ChatCompletionCreateParams = await request.json();
        console.log("requestData", requestData);
        console.log("requestData", JSON.stringify(requestData));

        // 读取API密钥，即在使用以下方式请求时带上的 apiKey 的值。AIAgent 服务端也使用以下方式请求。
        // const openai = new OpenAI({
        //     apiKey: "xxx",
        //     baseURL: "xxx"
        // });
        // 您在读取到 apiKey 后，可以做必要的业务校验。它不一定是 LLM 的 apiKey，因为是透传的，所以你可以传任意内容。
        // !mark
        const apiKey = authHeader.split(' ')[1];

        // 检查必需字段
        if (!requestData.messages || requestData.messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages are required' },
                { status: 400 }
            );
        }

        // 检查是否要求流式响应
        if (requestData.stream) {
            // 读取 Model
            // 由于在注册 AIAgent 或者创建 AIAgent 实例时，会传入固定的 Model 所以 这里可以传一个普通给 LLM 的 Model。
            // 同时你也可以通过这个值传递一些额外的业务信息。比如 这个 Model 实际是业务标志，标识是直播/语聊房等等。
            // !mark
            const model = requestData.model;

            // 读取 SystemPrompt
            // 由于在注册 AIAgent 或者创建 AIAgent 实例时，会传入固定的 SystemPrompt 所以 这里可以传一个普通给 LLM 的 SystemPrompt。
            // 同时你也可以通过这个值传递一些额外的业务信息。比如带上用户的信息、等级、偏好等等。然后依此再调用 LLM 时针对性的修改实际给 LLM 的 SystemPrompt。
            // !mark
            const systemMessage = requestData.messages.find(message => message.role === 'system');

            // 读取最新一条 User Message（最新的在数组最后）
            // AIAgent 在向你的接口发起请求时，会带上 Messages 参数。这个参数也包括 SystemPrompt。
            // !mark
            const latestUserMessage = [...requestData.messages].reverse().find(message => message.role === 'user');

            // 读取其他符合 OpenAI 协议的 LLM 参数类似，这里不再赘述。

            // 创建流式响应
            // !mark(1:3)
            const stream = new TransformStream();
            const writer = stream.writable.getWriter();
            const encoder = new TextEncoder();
            try {
                let kbContent = "";
                // 调用知识库查询接口，获取知识库查询结果
                // !mark(1:11)
                if (process.env.KB_TYPE === "ragflow") {
                    console.log("调用 Ragflow 知识库查询接口");
                    const ragflowResponse = await retrieveFromRagflow({
                        question: latestUserMessage?.content as string,
                    });
                    kbContent = ragflowResponse.kbContent;
                } else if (process.env.KB_TYPE === "bailian") {
                    console.log("调用 Bailian 知识库查询接口");
                    const bailianResponse = await retrieveFromBailian({ query: latestUserMessage?.content as string });
                    kbContent = bailianResponse.kbContent;
                }

                // 将用户最新一条 User Message 和知识库查询结果进行合并，在替换 messages 数组最后一个元素，然后调用 LLM 进行回答
                // 小提示🔔：部分厂商的模型是提供上下文硬盘缓存的，所以计算价格时有缓存的计价会便宜很多。保持 SystemPrompt 不变，只替换 User Message 可有效提升缓存命中概率从而降低成本并且缩短推理时间。
                // !mark(1:4)
                requestData.messages[requestData.messages.length - 1] = {
                    role: 'user',
                    content: `${latestUserMessage?.content}\n以下是知识库查询结果:\n${kbContent}`,
                };

                // 调用 LLM 进行回答（使用 OpenAI 的 SDK）
                const openai = new OpenAI({
                    apiKey: apiKey,
                    baseURL: process.env.LLM_BASE_URL_REAL
                });
                // 处理流式响应
                const completion = await openai.chat.completions.create({
                    model: model,
                    stream: true,
                    messages: requestData.messages
                });
                console.log("completion created successfully");
                for await (const chunk of completion) {
                    // 注意⚠️：AIAgent 要求最后一个有效数据必须包含 "finish_reason":"stop"且最后必须发送一条结束数据：data: [DONE]，如果不发送可能会导致智能体不回答或者回答不完整。
                    // 某些模型不会在流式响应中返回 finish_reason，这种情况需要自己根据修改一下chunk内容再传回给 AIAgent。
                    const ssePart = `data: ${JSON.stringify(chunk)}\n`;
                    // 持续写入流式响应数据，直到流式数据结束
                    // !mark
                    writer.write(encoder.encode(ssePart));
                }

            } catch (error) {
                console.error('Stream processing error:', error);
            } finally {
                // 发送结束标记
                // !mark
                writer.write(encoder.encode('data: [DONE]\n\n'));
                writer.close();
                console.log("writer closed");
            }


            return new Response(stream.readable, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        } else {
            // AIAgent 不支持非流式响应，直接返回错误码
            return NextResponse.json(
                { error: 'Streaming is required' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// 添加OPTIONS方法支持CORS预检
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
```

```json filename
secondCodeBlock();
```
</CodeGroup>
</Accordion>
</Tab>

</Tabs>

</Step>
<Step title="注册智能体并使用自定义 LLM" titleSize="h3">

在注册智能体（[RegisterAgent](/aiagent-server/api-reference/agent-configuration-management/register-agent)）时，设置使用自定义 LLM URL，并在 `SystemPrompt` 中要求 LLM 根据知识库内容回答用户问题。

```javascript 注册智能体调用示例
// 请将以下示例中的 LLM 和 TTS 的 ApiKey、appid、token 等鉴权参数换成你实际的鉴权参数。
async registerAgent(agentId: string, agentName: string) {
    // 请求接口：https://aigc-aiagent-api.zegotech.cn?Action=RegisterAgent
    const action = 'RegisterAgent';
    // !mark(4:9)
    const body = {
        AgentId: agentId,
        Name: agentName,
        LLM: {
            Url: "https://your-custom-llm-service/chat/completions",
            ApiKey: "your_api_key",
            Model: "your_model",
            SystemPrompt: "请根据用户提供的知识库内容用友好的语气回答用户问题，如果用户的问题不在知识库中，请礼貌的告诉用户我们没有相关的知识库内容。"
        },
        TTS: {
            Vendor: "ByteDance",
            Params: {
                "app": {
                    "appid": "zego_test",
                    "token": "zego_test",
                    "cluster": "volcano_tts"
                },
                "audio": {
                    "voice_type": "zh_female_wanwanxiaohe_moon_bigtts"
                }
            }
        }
    };
    // sendRequest 方法封装了请求的 URL 和公共参数。详情参考：https://doc-zh.zego.im/aiagent-server/api-reference/accessing-server-apis
    return this.sendRequest<any>(action, body);
}
```

</Step>
<Step title="创建智能体实例" titleSize="h3">

使用已注册的智能体为模板 [创建多个智能体实例](/aiagent-server/best-practices/api-reference/agent-instance-management/create-agent-instance) 加入不同房间与不同用户进行实时互动。创建智能体实例后，智能体实例会自动登录房间并推流，同时也会拉真实用户的流。

创建智能体实例成功后，真实用户在客户端监听流变化事件并拉流就可以与智能体进行实时互动了。

<Warning title="注意">默认情况下一个账号下最多同时存在 10 个智能体实例，超过限制后创建智能体实例会失败，如需调整请联系 ZEGO 商务。</Warning>

以下是调用创建智能体实例接口的示例：

```javascript Server(NodeJS)
async createAgentInstance(agentId: string, userId: string, rtcInfo: RtcInfo, messages?: any[]) {
    // 请求接口：https://aigc-aiagent-api.zegotech.cn?Action=CreateAgentInstance
    const action = 'CreateAgentInstance';
    const body = {
        AgentId: agentId,
        UserId: userId,
        RTC: rtcInfo,
        MessageHistory: {
            SyncMode: 1, // Change to 0 to use history messages from ZIM
            Messages: messages && messages.length > 0 ? messages : [],
            WindowSize: 10
        }
    };
    // sendRequest 方法封装了请求的 URL 和公共参数。详情参考：https://doc-zh.zego.im/aiagent-server/api-reference/accessing-server-apis
    const result = await this.sendRequest<any>(action, body);
    console.log("create agent instance result", result);
    // 在客户端要保存返回的 AgentInstanceId ，用于后续删除智能体实例。
    return result.AgentInstanceId;
}
```

完成这一步骤后，您已经成功创建了一个智能体实例。集成客户端后可与该智能体实例进行语音互动。

</Step>
</Steps>


## 实现客户端功能

请参考以下文档完成客户端的集成开发：

<CardGroup cols={2}>
<Card title="Android" href="/aiagent-android/quick-start" target="_blank">
快速开始
</Card>
<Card title="iOS"  href="/aiagent-ios/quick-start" target="_blank">
快速开始
</Card>
<Card title="Web"  href="/aiagent-web/quick-start" target="_blank">
快速开始
</Card>
<Card title="Flutter"  href="/aiagent-flutter/quick-start" target="_blank">
快速开始
</Card>
</CardGroup>

恭喜您🎉！完成这一步骤后，您已经成功集成客户端 SDK 并可以与智能体实例进行实时语音互动了。您可以用语音问智能体任何问题，智能体都会在**查询知识库**后回答您的问题！
