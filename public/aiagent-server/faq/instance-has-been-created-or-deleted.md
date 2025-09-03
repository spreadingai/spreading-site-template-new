# 如何判断智能体实例已创建或已删除?

当智能体实例创建成功，且已进入 RTC 房间和推流后，会回调 AgentInstanceCreated 事件。

当智能体实例删除成功，会回调 AgentInstanceDeleted 事件。

<Note title="注意">如果在智能体实例创建成功之前就尝试说话与智能体进行对话，智能体不会有任何响应。</Note>

您可以通过监听这两个事件了解到智能体实例的创建和删除状态。详情请参考[获取智能体状态及延迟数据](/aiagent-server/guides/get-ai-agent-status#监听智能体相关事件)。