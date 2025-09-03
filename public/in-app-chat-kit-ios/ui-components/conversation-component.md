# 会话组件

IMKit的对话组件提供了聊天列表和聊天功能。

<Note title="说明">会话组件已经集成了消息组件。如果你不需要会话列表，可以直接使用消息组件。</Note>

- 聊天列表：允许您查看聊天列表的数据，并支持根据聊天消息自动更新聊天列表。
- 聊天：创建一对一聊天和群聊。











<ZIMKitChatInfo />

<Frame width="200" height="auto" caption="">
    <img src="https://media-resource.spreading.io/docuo/workspace735/535aa5d0e4329361d2ee094d9a68f56d/15ff969bd0.gif" alt="e3c88ee3-0684-4664-ab61-2aed9f0dfe06.gif"/>
</Frame>

## 将会话组件集成到您的项目中

### 前提条件

将 IMKit SDK 集成到您的项目中（需要完成初始化和登录）。更多信息，请参考[快速开始](/in-app-chat-kit-ios/quick-start)。
<ZIMKItComponentPrefixInfoNew/>

### 显示会话组件

```swift ViewController.swift {1,2,13-16}
import UIKit
import ZIMKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    // 在成功登录后，您可以在任何需要的地方调用此方法。
    func showConversationListVC(_ sender: Any) {
        let conversationVC = ZIMKitConversationListVC()
        let nav = UINavigationController(rootViewController: conversationVC)
        nav.modalPresentationStyle = .fullScreen
        self.present(nav, animated: true)
    }
}
```

## 定制功能

如果默认的与会话相关的功能和行为不能完全满足您的需求，您可以通过我们在本节中提到的配置进行灵活的定制。

<Accordion title="自定义点击事件" defaultOpen="false">

要自定义点击事件逻辑，您可以通过实现`ZIMKitConversationListVCDelegate`来监听`Conversation`的回调点击。

```swift ViewController.swift {22-24}
import UIKit
import ZIMKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // 在加载视图后进行其他额外的设置。

        let conversationVC = ZIMKitConversationListVC()
        conversationVC.delegate = self
    }
}

extension ViewController: ZIMKitConversationListVCDelegate {
    
    /// 当点击对话时的回调函数。
    /// - 参数：
    ///   - conversationListVC：ZIMKitConversationListVC
    ///   - conversation：对话模型
    ///   - defaultAction：默认情况下，点击将跳转到消息页面。
    func conversationList(_ conversationListVC: ZIMKitConversationListVC, didSelectWith conversation: ZIMKitConversation, defaultAction: () -> ()) {
        // 您可以在这里添加事件处理逻辑。
        defaultAction()
    }
}
```

</Accordion>

## API


<Accordion title="ZIMKitConversationListVCDelegate" defaultOpen="false">
```swift 定义
@objc public protocol ZIMKitConversationListVCDelegate: AnyObject {
    @objc optional
    func conversationList(_ conversationListVC: ZIMKitConversationListVC,
                          didSelectWith conversation: ZIMKitConversation,
                          defaultAction: ()-> ())
}
```
</Accordion>