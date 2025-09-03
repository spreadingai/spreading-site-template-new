# 消息组件


IMKit 的消息组件提供了消息列表和消息传输功能。

<Note title="说明">如果您不需要会话列表，可以直接使用消息组件。</Note>

- 消息列表：允许您查看聊天的消息历史记录。
- 消息传输：允许您发送或接收一对一消息和群组消息。
<ZIMKitMessageInfo />

<Frame width="200" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/zimkit_android/zimkit_android_message_en_new.gif" />
</Frame>

## 将消息组件集成到您的项目中

### 前提条件

将 IMKit SDK 集成到您的项目中（需要完成初始化和登录）。更多信息，请参考[快速开始](/in-app-chat-kit-android/quick-start)。
<ZIMKItComponentPrefixInfoNew/>

### 显示消息组件

IMKit 允许您将消息组件集成到您的 Activity 中，可以作为 Activity 或 Fragment。

<Warning title="注意">
- 对于 Activity 模式，标题栏和右上角的重定向到群组管理页面的按钮是根据类型包含的。对于 Fragment 模式，只包含与消息相关的内容。
- 要重定向到群组管理页面，需要引入ZIMKitGroup模块。否则，会报错因为找不到相应的 Activity 。如果群组功能可用，但不需要重定向到群组管理页面，则需要修改源代码以隐藏右上角的按钮。
</Warning>

#### 直接重定向到 Activity

```java MyZIMKitActivity.java

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import im.zego.zimkitcommon.enums.ZIMKitConversationType;
import im.zego.zimkitcommon.ZIMKitRouter;

public class MyZIMKitActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public void buttonClick() {
        String id = ; // 用户ID或群组ID或会话ID。
        ZIMKitConversationType type = ; // ZIMKitConversationType.ZIMKitConversationTypeGroup 或 ZIMKitConversationType.ZIMKitConversationTypePeer
        toMessageActivity(id,type);
    }
    
    private void toMessageActivity(String id,ZIMKitConversationType type){
        // 您可以通过 Kit 层的路由器将页面重定向到相应的页面。
        ZIMKitRouter.toMessageActivity(this, id, type);
    }
}
```

#### 将消息页面集成到您的 Activity 中作为一个 Fragment

您可以通过两种方式将消息组件添加到 activity 的视图层次结构中：一种是在 activity 的布局文件中定义 fragment，另一种是在 activity 的布局文件中定义一个 fragment 容器，然后在 activity 中以编程方式添加 fragment。 


<Tabs>
<Tab title="以编程方式添加 Fragment">

`MyZIMKitMessageActivity`的布局在`activity_message.xml`中指定：

<CodeGroup>

```java MyZIMKitMessageActivity.java {16-18,30-33}

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentTransaction;

import im.zego.zimkitcommon.enums.ZIMKitConversationType;
import im.zego.zimkitcommon.ZIMKitConstant;
import im.zego.zimkitmessages.fragment.ZIMKitMessageFragment;

public class MyZIMKitMessageActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String id = ; // 用户ID或群组ID或会话ID。
        ZIMKitConversationType type = ; // ZIMKitConversationType.ZIMKitConversationTypeGroup or ZIMKitConversationType.ZIMKitConversationTypePeer
        showMessageFragment(id, type);
    }

    private void showMessageFragment(String id,ZIMKitConversationType type) {
        Bundle data = new Bundle();
        if (type == ZIMKitConversationType.ZIMKitConversationTypeGroup) { // 对于一个群聊，请输入 TYPE_GROUP_MESSAGE 类型。
            data.putString(ZIMKitConstant.MessagePageConstant.KEY_TYPE, ZIMKitConstant.MessagePageConstant.TYPE_GROUP_MESSAGE);
        } else if (type == ZIMKitConversationType.ZIMKitConversationTypePeer) { // 对于一对一的聊天，请输入 TYPE_SINGLE_MESSAGE 类型。
            data.putString(ZIMKitConstant.MessagePageConstant.KEY_TYPE, ZIMKitConstant.MessagePageConstant.TYPE_SINGLE_MESSAGE);
        }
        // 对于群聊，ID 是群组的 ID。对于一对一聊天，ID 是用户的 ID。
        data.putString(ZIMKitConstant.MessagePageConstant.KEY_ID, id);
        ZIMKitMessageFragment fragment = new ZIMKitMessageFragment();
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        fragment.setArguments(data); //  该捆绑包必须包含类型和ID参数。
        transaction.replace(R.id.fra_message, fragment); // R.id.fra_message 是在 XML 文件中定义的 FrameLayout 的 ID。
        transaction.commit();
    }
}
```

```xml activity_message.xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:id="@+id/fra_message"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
</CodeGroup>
</Tab>
<Tab title="通过 XML 添加 Fragment">

```xml {7}
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/frag_conversation_list"
        android:name="im.zego.zimkitconversation.ui.ZIMKitMessageFragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
</Tab>
</Tabs>


## 定制功能

如果默认的与消息相关的特性和行为不能完全满足您的需求，您可以通过我们在本节中提到的配置进行灵活的定制。

<Accordion title="自定义标题栏" defaultOpen="false">

要在标题栏上自定义按钮，您可以实现`registerMessageListListener`。

例如，当您想在消息列表的右上方添加一个“开始通话”按钮时。要了解更多详细信息，请参阅<a href="/in-app-chat-kit-android/advanced-features/use-in-conjunction-with-call-kit">与 Call Kit 一起使用</a>。

```java MyZIMKitMessageActivity.java {1,3,11-20}
ZIMKit.registerMessageListListener(new ZIMKitMessagesListListener() {
    @Override
    public ZIMKitHeaderBar getMessageListHeaderBar(ZIMKitMessageFragment fragment) {
        // 通过 fragment.getConversationID() 获取对话 ID
        // 通过 fragment.getConversationName() 获取对话名称
        // 通过 fragment.getConversationType() 获取对话类型。ZIMConversationType.PEER：一对一聊天，ZIMConversationType.GROUP：群聊
        if (fragment != null) {
            // 为一对一聊天添加自定义标题栏。
            if (fragment.getConversationType() == ZIMConversationType.PEER) {
               // 自定义标题栏的左侧视图。如果未添加，则显示默认视图。
                CustomLeftView customLeftView = new CustomLeftView();
               // 自定义标题栏的中心视图。如果未添加，则显示默认视图。
                CustomTitleView customTitleView = new CustomTitleView();
               // 正确的自定义标题栏视图。如果未添加，则显示默认视图。
                CustomRighteView customRighteView = new CustomRighteView();
                ZIMKitHeaderBar headerBar = new ZIMKitHeaderBar();
                headerBar.setLeftView(customLeftView);
                headerBar.setTitleView(customTitleView);
                headerBar.setRightView(customRighteView);
                return headerBar;
            }
        }
        return null;
    }
});
```

</Accordion>

<Accordion title="修改消息操作菜单" defaultOpen="false">

长按一条消息后，界面会显示一个消息操作菜单，提供复制、回复、转发消息以及其他操作的选项。如需修改此菜单，可以使用`ZIMKitConfig.messageConfig`。该配置允许自定义不同消息类型（文本、图片、视频、文件、语音和组合消息）的操作菜单。

<Frame width="200" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/5abadcbf1b.jpeg" alt="MessageActionMenu.jpeg"/>
</Frame>


| 可用操作类型    | 文字消息 | 图片消息 |  视频消息 | 文件消息 | 语音消息 | 组合消息 |
| ------------------ | ------  | -------- | -------- | --------| ------ | ------- |
| COPY（复制）               | ✔️     | ✖ | ✖ | ✖ | ✖ | ✖ |
| REPLY（回复）              | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| FORWARD（转发）            | ✔️     | ✔️     | ✔️     | ✔️     | ✖ | ✔️     |
| MULTIPLE_CHOICE（多选）     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| DELETE（删除）             | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| REVOKE（撤回）             | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |
| SPEAKER（使用扬声器播放） | ✖   | ✖    | ✖   | ✖   | ✔️     | ✖     |
| REACTION（表态）    | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     | ✔️     |

以下是参考代码：

```java
ZIMKitConfig config = ZIMKitConfig();

// 文本消息
config.messageConfig.textMessageConfig.operations = new ArrayList<>(
   Arrays.asList(  ZIMKitMessageOperationName.COPY,               // 复制
    ZIMKitMessageOperationName.REPLY,              // 回复
    ZIMKitMessageOperationName.FORWARD,            // 转发
    ZIMKitMessageOperationName.MULTIPLE_CHOICE,     // 多选 
    ZIMKitMessageOperationName.DELETE,             // 删除
    ZIMKitMessageOperationName.REVOKE,             // 撤回
    ZIMKitMessageOperationName.REACTION            // 表态
    ) );
] 

// 图片消息 
config.messageConfig.imageMessageConfig.operations = new ArrayList<>(
    Arrays.asList( ZIMKitMessageOperationName.REPLY, 
    ZIMKitMessageOperationName.FORWARD, 
    ZIMKitMessageOperationName.MULTIPLE_CHOICE, 
    ZIMKitMessageOperationName.DELETE, 
    ZIMKitMessageOperationName.REVOKE,
    ZIMKitMessageOperationName.REACTION
    ) );
]

// 视频消息 
config.messageConfig.videoMessageConfig.operations = new ArrayList<>(
    Arrays.asList( ZIMKitMessageOperationName.REPLY, 
    ZIMKitMessageOperationName.FORWARD, 
    ZIMKitMessageOperationName.MULTIPLE_CHOICE, 
    ZIMKitMessageOperationName.DELETE, 
    ZIMKitMessageOperationName.REVOKE,
    ZIMKitMessageOperationName.REACTION
    ) );

// 文件消息 
config.messageConfig.fileMessageConfig.operations = new ArrayList<>(
    Arrays.asList( ZIMKitMessageOperationName.REPLY, 
    ZIMKitMessageOperationName.FORWARD, 
    ZIMKitMessageOperationName.MULTIPLE_CHOICE, 
    ZIMKitMessageOperationName.DELETE, 
    ZIMKitMessageOperationName.REVOKE,
    ZIMKitMessageOperationName.REACTION
    ) );

// 语音消息 
config.messageConfig.audioMessageConfig.operations = new ArrayList<>(
    Arrays.asList( ZIMKitMessageOperationName.SPEAKER,  // 使用扬声器进行播放
    ZIMKitMessageOperationName.FORWARD, 
    ZIMKitMessageOperationName.MULTIPLE_CHOICE, 
    ZIMKitMessageOperationName.DELETE, 
    ZIMKitMessageOperationName.REVOKE,
    ZIMKitMessageOperationName.REACTION
    ) );

// 合并转发消息
config.messageConfig.combineMessageConfig.operations = new ArrayList<>(
    Arrays.asList( ZIMKitMessageOperationName.REPLY, 
    ZIMKitMessageOperationName.FORWARD, 
    ZIMKitMessageOperationName.MULTIPLE_CHOICE, 
    ZIMKitMessageOperationName.DELETE, 
    ZIMKitMessageOperationName.REVOKE,
    ZIMKitMessageOperationName.REACTION
    ) );
```

</Accordion>

<Accordion title="自定义底部工具栏按钮" defaultOpen="false">

要自定义底部工具栏上的按钮，您可以使用 `ZIMKitConfig.inputConfig.smallButtons` 和
`ZIMKitConfig.inputConfig.expandButtons` 进行配置：

- `smallButtons`: 配置输入框快捷按钮，目前默认显示语音输入、表情、相册图片以及扩展按钮。
- `expandButtons`: 配置输入框扩展按钮，目前默认显示发送拍照，以及发送文件按钮。

以下是参考代码：

```java
// smallButtons 底部工具栏输入框快捷按钮新增发送文件按钮
config.inputConfig.smallButtons.add(ZIMKitInputButtonName.FILE)   

// expandButtons 底部工具栏输入框扩展按钮新增发送图片按钮
config.bottomConfig.expandButtons.add(ZIMKitInputButtonName.PICTURE)  
```

</Accordion>

<Accordion title="修改输入框提示文本" defaultOpen="false">

如需修改底部输入框的默认提示文字，您可以使用 `ZIMKitConfig.inputConfig.inputHint` 进行配置：

以下是参考代码:
```java
ZIMKitConfig config = ZIMKitConfig()
config.inputConfig.inputHint = "input hint", 
```
</Accordion>

<Accordion title="自定义表情面板" defaultOpen="false">

IMKit 提供一系列默认表情用于在会话中发送表情，以及对消息进行表态。如果您不满意默认提供的表情，您可以通过 `ZIMKitConfig.inputConfig.emojis` 传入所有您需要的表情。

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
```java
ZIMKitConfig config = ZIMKitConfig()
ZIMKitConfig.inputConfig.emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂"]
```
</Accordion>

## API


<Accordion title="ZIMKitMessagesListListener" defaultOpen="false">
```java 定义
public interface ZIMKitMessagesListListener {
    ZIMKitHeaderBar getMessageListHeaderBar(ZIMKitMessageFragment fragment);
}
```
</Accordion>
