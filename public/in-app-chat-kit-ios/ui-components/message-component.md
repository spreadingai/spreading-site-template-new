# 消息组件


IMKit 的消息组件提供了消息列表和消息传输功能。

<Note title="说明">如果您不需要会话列表，可以直接使用消息组件。</Note>

- 消息列表：允许您查看聊天的消息历史记录。
- 消息传输：允许您发送或接收一对一消息和群组消息。
<ZIMKitMessageInfo />

<Frame width="200" height="auto" caption="">
    <img src="https://media-resource.spreading.io/docuo/workspace735/535aa5d0e4329361d2ee094d9a68f56d/f41ce531dd.gif" alt="3544adb1-a925-42f2-a7a0-ea5740ee78cc.gif"/>
</Frame>

## 将消息组件集成到您的项目中

### 前提条件

将 IMKit SDK 集成到您的项目中（需要完成初始化和登录）。更多信息，请参考[快速开始](/in-app-chat-kit-ios/quick-start)。
<ZIMKItComponentPrefixInfoNew/>

### 显示消息组件

```swift ViewController.swift {1,2,12-17}
import UIKit
import ZIMKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    /// 在登录成功后调用以下方法来显示消息组件。
    func showMessageListVC() {
        let conversationID = "xxx"  // 会话ID。对于一对一聊天，它指的是对方的用户ID。对于群聊，它指的是群组ID。
        let type: ConversationType = .peer // 会话类型（一对一聊天或群聊）。
        let messageVC = ZIMKitMessagesListVC(conversationID: conversationID, type: type)
        navigationController?.pushViewController(messageVC, animated: true)
    }
}
```


## 定制功能

如果默认的与消息相关的特性和行为不能完全满足您的需求，您可以通过我们在本节中提到的配置进行灵活的定制。

<Accordion title="音视频通话" defaultOpen="false">

例如，当您想在底部工具栏音视频通话按钮时。要了解更多详细信息，请参阅<a href="/in-app-chat-kit-ios/advanced-features/use-in-conjunction-with-call-kit">与 音视频通话 UIKit 一起使用</a>。

```swift ViewController.swift {48,49}
import UIKit
import ZIMKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // 初始化ZIMKit 
        let config = ZIMKitConfig()
        let call:ZegoUIKitPrebuiltCallInvitationConfig = ZegoUIKitPrebuiltCallInvitationConfig(notifyWhenAppRunningInBackgroundOrQuit: true, isSandboxEnvironment: true, certificateIndex: .firstCertificate)
        let callConfig: ZegoCallPluginConfig = ZegoCallPluginConfig(invitationConfig: call, resourceID: "zegouikit_call")

        config.callPluginConfig = callConfig
        config.bottomConfig.expandButtons.append(.voiceCall)
        config.bottomConfig.expandButtons.append(.videoCall)
        ZIMKit.initWith(appID: KeyCenter.appID(), appSign: KeyCenter.appSign(), config: config)


        // 在加载视图后进行其他额外的设置。
        let messageVC = ZIMKitMessagesListVC(conversationID: "conversationID", type: .peer)
        
        // 如果您集成了ZIMKitConversationListVC，可以设置并监听delegate以接收与消息相关的通知。
        let conversationVC = ZIMKitConversationListVC()
        conversationVC.delegate = self
    }
}
```

</Accordion>

<Accordion title="自定义底部工具栏按钮" defaultOpen="false">

要自定义底部工具栏上的按钮，您可以使用 `smallButtons` 和 `expandButtons` 进行配置：

以下是参考代码：

```swift
// smallButtons 底部工具栏按钮配置
config.bottomConfig.smallButtons.append(.takePhoto)   
// smallButtons 默认是包括 .expand 的，如果修改了 smallButtons，同时也想要展示 expandButtons 的配置UI，请确认 smallButtons 中包含 .expand 
// config.bottomConfig.smallButtons.append(.expand)
config.bottomConfig.expandButtons.append(.voiceCall)  
```

</Accordion>

<Accordion title="修改消息操作菜单" defaultOpen="false">

长按一条消息后，界面会显示一个消息操作菜单，提供复制、回复、转发消息以及其他操作的选项。如需修改此菜单，可以使用`ZIMKitMessageConfig`。该配置允许自定义不同消息类型（文本、图片、视频、文件、语音和组合消息）的操作菜单。

<Frame width="200" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/5abadcbf1b.jpeg" alt="MessageActionMenu.jpeg"/>
</Frame>


| 可用操作类型    | 文字消息 | 图片消息 |  视频消息 | 文件消息 | 语音消息 | 组合消息 |
| ------------------ | ------  | -------- | -------- | --------| ------ | ------- |
| copy（复制）               | ✔️     | ✖ | ✖ | ✖ | ✖ | ✖ |
| reply（回复）              | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| forward（转发）            | ✔️     | ✔️     | ✔️     | ✔️     | ✖ | ✔️     |
| multipleChoice（多选）     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| delete（删除）             | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| revoke（撤回）             | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| speaker（使用扬声器播放） | ✖   | ✖    | ✖   | ✖   | ✔️     | ✖     |
| reaction（表态）    | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |

以下是参考代码：

```swift
let config = ZIMKitConfig()

// 文本消息
config.messageConfig.textMessageConfig.operations = [
    .copy,               // 复制
    .reply,              // 回复
    .forward,            // 转发
    .multipleChoice,     // 多选 
    .delete,             // 删除
    .revoke,             // 撤回
    .reaction            // 表态
] 

// 图片消息 
config.messageConfig.imageMessageConfig.operations = [
    .reply, 
    .forward, 
    .multipleChoice, 
    .delete, 
    .reaction, 
    .revoke
]

// 视频消息 
config.messageConfig.videoMessageConfig.operations = [
    .reply, 
    .forward, 
    .multipleChoice, 
    .delete, 
    .reaction, 
    .revoke
]

// 文件消息 
config.messageConfig.fileMessageConfig.operations = [
    .reply, 
    .forward, 
    .multipleChoice, 
    .delete, 
    .reaction, 
    .revoke
]

// 语音消息 
config.messageConfig.audioMessageConfig.operations = [
    .speaker,           // 使用扬声器播放
    .reply, 
    .multipleChoice, 
    .delete, 
    .reaction, 
    .revoke
]

// 合并转发消息
config.messageConfig.combineMessageConfig.operations = [
    .reply, 
    .forward, 
    .multipleChoice, 
    .delete, 
    .reaction, 
    .revoke
]
```

</Accordion>

<Accordion title="修改输入框默认文本" defaultOpen="false">

如需修改底部输入框的默认提示文字，您可以使用 `inputPlaceholder`。

以下是参考代码:
```swift
let config = ZIMKitConfig()
config.inputPlaceholder =  NSAttributedString(string: "请输入", attributes: [NSAttributedString.Key.foregroundColor: UIColor.black, 
                                                                            NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
```
</Accordion>

<Accordion title="自定义会话顶部导航栏" defaultOpen="false">

如需自定义会话页面的顶部导航栏，请先注册代理 `ZIMKitMessagesListVCDelegate`。 
```swift
let vc = ZIMKitConversationListVC()
vc.messageDelegate = self
```

随后，如果您需要修改完整的顶部导航栏，您可以调用 `getMessageListHeaderCustomerview` 方法。

<Frame width="200" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/01bb7b29c3.jpeg" alt="CustomizeTopNav2.jpeg"/>
</Frame>

```swift    
func getMessageListHeaderCustomerview(_ messageListVC: ZIMKitMessagesListVC) -> UIView?
    let view = UIView().withoutAutoresizingMaskConstraints
    let button = UIButton(type: .contactAdd)
    button.frame = CGRect(x: 10, y: 10, width: 30, height: 30)
    button.addTarget(self, action: #selector(customerButtonClick(_:)), for: .touchUpInside)
    view.addSubview(button)
return view
```

如果您仅需要修改顶部导航栏的标题，或是在标题的左侧或右侧添加按钮，您可以调用 `getMessageListHeaderBar` 方法。

<Frame width="200" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/ceba4bad7d.jpeg" alt="CustomizeTopNav1.jpeg"/>
</Frame>

```swift
func getMessageListHeaderBar(_ messageListVC: ZIMKitMessagesListVC) -> ZIMKitHeaderBar? {
    let header = ZIMKitHeaderBar()
    let button1:UIBarButtonItem = UIBarButtonItem(customView:UIButton(type: .detailDisclosure))
    let button2:UIBarButtonItem = UIBarButtonItem(customView:UIButton(type: .contactAdd))
    let button3:UIBarButtonItem = UIBarButtonItem(customView:UIButton(type: .infoDark))
                            
    let button4:UIBarButtonItem = UIBarButtonItem(customView:UIButton(type: .infoLight))
    header.rightItems = [button1,button2]
    header.leftItems = [button3,button4]
    let titleView = UIView()
    titleView.backgroundColor = UIColor.red
    titleView.frame = CGRectMake(0, 0, 100, 40)
    header.titleView = titleView  
    return header
}
```
</Accordion>

<Accordion title="监听会话页面的销毁" defaultOpen="false">
如需监听会话页面销毁，实现您的业务逻辑时，请先注册代理 `ZIMKitMessagesListVCDelegate`。 

```swift
let vc = ZIMKitConversationListVC()
vc.messageDelegate = self
```

随后，通过 `messageListViewWillDisappear` 方法监听会话页面销毁事件，同时执行您的业务逻辑。

```swift
func messageListViewWillDisappear() {
    // Your logic
}
```
</Accordion>

<Accordion title="自定义表情面板" defaultOpen="false">

IMKit 提供一系列默认表情用于在会话中发送表情，以及对消息进行表态。如果您不满意默认提供的表情，您可以通过 `bottomConfig.emojis` 传入所有您需要的表情。

<table>
  <tr>
    <th>发送表情</th>
    <th>消息表态</th>
  </tr>
  <tr>
    <td><img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/06864fe88e.jpeg" alt="Emoji_1.jpeg" width="200"/></td>
    <td><img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/a884ba82f8.jpeg" alt="Emoji_2.jpeg" width="200" /></td>
  </tr>
</table>


以下是参考代码:
```swift
let config = ZIMKitConfig()
config.bottomConfig.emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂"]
```
</Accordion>