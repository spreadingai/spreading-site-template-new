# Android

---

<Note title="提示">



- 本组件适合之前没有接入过 ZIM 的项目，实现低代码接入 ZIM 的聊天能力。
- 对于已经接入过 ZIM 其他能力的项目，可以考虑移除控件代码中的 ZIMSDKManager 类，在 ChatService 中改为调用项目已有的 ZIM 接口封装类
</Note>


## 功能简介

实时消息互动组件支持多人实时通讯，本文将介绍如何在项目中集成并使用实时消息互动组件。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoCall/call/GoCall_Chat.png" /></Frame>

## 前提条件

在集成实时消息互动组件之前，请确保：

- 已参考 [跑通示例源码](#android) 获取 GoCall 完整源码；
- 已在 ZEGO 控制台 创建项目，获取到了项目 appID 和 appSign；
- 已在 ZEGO 控制台 自助开通即时通讯服务（详情请参考 [项目管理 - 即时通讯](/console/service-configuration/im/activate-service)），若无法开通服务，请联系 ZEGO 技术支持。

## 组件接入

### 引入组件

参考如下步骤，在项目中添加 libIMChat 组件：

1. 解压源码压缩包，拷贝 libIMChat 文件夹至项目中。

2. 在项目中引入 libIMChat 组件。

打开项目的 settings.gradle 文件，添加如下代码：

```gradle
include ':libIMChat'
```

3. 在项目中添加 libIMChat 组件的依赖项。打开项目的 app/build.gradle 文件，添加如下代码：

```gradle
dependencies {
    implementation project(':libIMChat')
    ......
}
```

### 初始化语聊功能对象

```java
ChatService chatService = new ChatService();
```

### 登录 ZIM service

```java
// appID 和 appSign 的值请从控制台获取
// userID 和 userName 为开发者自定义的值，建议与 Express SDK 所用 userID 和 userName 保持一致
chatService.loginZIM(application, appID, appSign, userID, userName, callback);
```

### 加入到 IM 房间

```java
// roomID 为开发者自定义的值
// roomName 为开发者自定义的值
chatService.enterZIMRoom(roomID, roomName, new IZIMCommonCallback() {
    @Override
    public void onZIMCallback(int errorCode) {
        // 业务自定义相关逻辑处理
    });
}
```

### 添加 IM 消息View


在业务视图需要的合适地方添加上`IMChatView`组件对象，例如可以在 xml 配置成：

```xml
<im.zego.libimchat.view.IMChatView
    android:id="@+id/im_chat_view"
    android:layout_width="300dp"
    android:layout_height="200dp"
    android:background="#00000000"
    />
```

逻辑代码如下：
```java
// IM 的相关组件
private IMChatView imChatView;

imChatView =findViewById(R.id.im_chat_view);
// 在实际的业务操作中必须对 imChatView 对象初始化操作!!!!
imChatView.initMainIMView(this,chatService));

// setSendMessageCallback 是对信息发送回调处理
imChatView.setSendMessageCallback(getSupportFragmentManager(), new ISendMessageCallback() {
    @Override
    public void onSuccess () {

    }

    @Override
    // 消息发送失败
    public void onFailure () {
        // 开发者根据需求进行自定义处理。
    }
});
```

### 退出IM房间

```java
chatService.logoutZIMRoom(new IZIMCommonCallback() {
    @Override
    public void onZIMCallback(int errorCode) {
            // 开发者可自定义逻辑处理
        }
});
```

### 退出 ZIM service

```java
// 退出ZIM引擎服务
chatService.logoutZIM();
```
