# 展示用户和智能体状态

在与智能体进行实时语音通话时，可能需要在客户端界面上实时展示智能体实例说话和用户说话的状态变化以提升用户体验。您可以通过监听服务端回调的相应事件来获取这些状态。

状态消息包括以下类型：

- 智能体实例说话状态事件： 开始说话，说话结束。
- 用户说话状态事件：开始说话，说话结束。

## 快速实现

### 监听服务端回调

请参考 [接收回调](/aiagent-server/callbacks/receiving-callback) 文档开发好用于接收 AI Agent 事件通知的回调，并提供地址联系 ZEGO 技术支持进行配置。
<Note title="说明">

要接收用户和智能体状态的回调结果，请在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时，配置相应的 [CallbackConfig.UserSpeakAction](/aiagent-server/api-reference/agent-instance-management/create-agent-instance#callbackconfig) 和 [CallbackConfig.AgentSpeakAction](/aiagent-server/api-reference/agent-instance-management/create-agent-instance#callbackconfig) 参数为 `1`。

</Note>

回调内容示例如下：

<CodeGroup>
```json title="智能体说话状态回调" {5,7}
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "Data": {
        "Action": "SPEAK_BEGIN",// SPEAK_BEGIN: 开始说话 SPEAK_END: 说话结束
    },
    "Event": "AgentSpeakAction",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000,
    "AgentUserId": "123456789",
    "RoomId": "123456789",
    "Sequence": 123456789,
}
```
```json title="用户说话状态回调" {5,7}
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "Data": {
        "Action": "SPEAK_BEGIN",// SPEAK_BEGIN: 开始说话 SPEAK_END: 说话结束
    },
    "Event": "UserSpeakAction",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000,
    "AgentUserId": "123456789",
    "RoomId": "123456789",
    "Sequence": 123456789,
}
```
</CodeGroup>

### 如何通知客户端并展示状态

当您通过服务端回调接收到智能体实例或用户的说话状态事件后，您可以将这些状态信息通知到客户端，以便客户端可以实时展示状态变化。以下是两种常用的通知方式：

#### 使用自有信令通道

如果您的应用已经有自己的信令通道，如 WebSocket 或即时通讯系统，您可以：

- 在服务端接收到状态事件回调后，通过您的信令通道将状态信息转发给相关客户端。
- 与客户端约定好消息格式，客户端根据接收到的状态信息更新 UI 界面（如显示说话指示器、动画等）。

这种方式的优点是可以完全控制消息格式和传输逻辑，适合已有成熟信令系统的应用。

#### 借用 ZEGO RTC 房间消息通道，发送自定义消息

如果您没有自己的业务信令通道，可以借用 ZEGO RTC 提供的房间消息功能：

- 在服务端接收到状态事件回调后，调用 ZEGO RTC Server API 发送自定义消息
- 与客户端约定好消息格式，客户端通过 ZEGO RTC SDK 监听自定义消息，接收状态变化通知更新 UI 界面（如显示说话指示器、动画等）

这种方式的优点是无需额外搭建信令系统，可以直接利用 ZEGO 提供的基础设施。但是这种方式的缺点是房间消息不保证完全可靠，且有发送频率限制，不适用于对消息可靠性要求较高的场景。


实现示例如下：
<Tabs>
<Tab title="服务端">

以下是服务端接收到智能体和用户说话状态事件后，通过 ZEGO Server API [发送自定义消息](https://doc-zh.zego.im/article/19553)的示例代码：


```javascript {27-30,47-72}
export class AgentCallbackController {
    // 向 RTC 房间发送自定义消息
    private async handleSendCustomCommand(
        commonArgs: any,
        roomId: string,
        agentUserId: string,
        data: any,
    ) {
        try {
            // 构建查询参数，ToUserId[] 以数组形式多次出现
            const params: Record<string, any> = {
                Action: 'SendCustomCommand',
                RoomId: roomId,
                FromUserId: agentUserId,
                MessageContent: JSON.stringify(data),
                ...commonArgs
            };
            // 拼接 ToUserId[]
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => searchParams.append(key, v));
                } else {
                    searchParams.append(key, value);
                }
            });
            // 拼接完整 URL
            const url = `https://rtc-api.zego.im/?${searchParams.toString()}`;
            // 直接发起 GET 请求发送自定义消息
            const res = await rtcRequest<any>({ method: 'GET', url });

            if (res.Code !== 0) logger.error(`sendCustomCommand errorCode: ${res.Code}, errorMessage: ${res.Message}`);
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            logger.error('[AgentCallbackController] handleSendCustomCommand error:' + errMsg);
        }
    }
    // 接收智能体及用户说话状态变化回调
    callbackHandler = async (req: Request, res: Response) => {
        const RequestId = req.headers.RequestId as string;
        const payload = req.body as AIAgentCallbackPayload;
        const { AppId, AgentInstanceId, RoomId, AgentUserId, Event, Data } = payload;

        // commonArgs的生成请参考 https://doc-zh.zego.im/article/19456#3
        const commonArgs = genCommonArgs(AppId, globalConfig.appEnvSecretMap[AppId]);

        switch (Event) {
            case AgentEvent.AgentSpeakAction: {
                const { Sequence, Action } = Data as AgentSpeakActionPayload;
                const command = {
                    eventType: 'AgentSpeakAction',
                    data: {
                        sequence: Sequence,
                        action: Action,
                    },
                };
                await this.handleSendCustomCommand(commonArgs, RoomId, AgentInstanceId, command);
                break;
            }
            case AgentEvent.UserSpeakAction: {
                const { UserId, Sequence, Action } = Data as UserSpeakActionPayload;
                const command = {
                    eventType: 'UserSpeakAction',
                    data: {
                        userId: UserId,
                        sequence: Sequence,
                        action: Action,
                    },
                };
                await this.handleSendCustomCommand(commonArgs, RoomId, AgentInstanceId, command);
                break;
            }
            // ... 其他事件处理
        }
    };
}
```

</Tab>
<Tab title="客户端">

客户端各端接收消息示例代码如下：

<CodeGroup>
```javascript title="Web"
// 3. 客户端通过ZEGO RTC SDK监听自定义消息
    zg.on("IMRecvCustomCommand", (roomID: string, fromUser: ZegoUser, command: string) => {
      try {
        const message = JSON.parse(command);
        switch (message.eventType) {
          case "AgentSpeakAction":
            // 处理智能体说话状态事件
            // 更新UI
            break;
          case "UserSpeakAction":
            // 处理用户说话状态事件
            // 更新UI
            break;
        }
      } catch (error) {
        console.error("解析消息失败:", error);
      }
    });
```
```objc title="iOS"
@interface YourClass () <ZegoEventHandler>

@end

@implementation YourClass

- (void)onIMRecvCustomCommand:(NSString *)command
                     fromUser:(ZegoUser *)fromUser
                       roomID:(NSString *)roomID{
    if (command == nil) {
        return;
    }

    NSDictionary* msgDict = [ZegoAIAgentUtil dictFromJson:command];
    if (!msgDict) {
        return;
    }

    NSString *eventType = msgDict[@"eventType"];
    if (eventType) {
        if ([eventType isEqualToString:@"AgentSpeakAction"]) {
            // 处理智能体说话状态事件
            // 更新UI
        } else if ([eventType isEqualToString:@"UserSpeakAction"]) {
            // 处理用户说话状态事件
            // 更新UI
        }
    }
}
@end
```
```java title="Android"
// 客户端通过ZEGO RTC SDK监听自定义消息
ZegoExpressEngine.getEngine().setEventHandler(new IZegoEventHandler() {
    @Override
    public void onIMRecvCustomCommand(String roomID, ZegoUser fromUser, String command) {
        super.onIMRecvCustomCommand(roomID, fromUser, command);
        try {
            // 第一步：将 content 解析为 JSONObject
            JSONObject json = new JSONObject(command);
            if (json.has("eventType")) {
                String eventType = json.getString("eventType");
                if ("AgentSpeakAction".equals(eventType)) {
                    // 处理智能体说话状态事件
                    // 更新UI
                } else if ("UserSpeakAction".equals(eventType)) {
                    // 处理用户说话状态事件
                    // 更新UI
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
});
```
</CodeGroup>

</Tab>
</Tabs>