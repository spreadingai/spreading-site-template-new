# iOS

---

<Note title="提示">



- 本组件适合之前没有接入过 ZIM 的项目，实现低代码接入 ZIM 的聊天能力。
- 对于已经接入过 ZIM 其他能力的项目，可以考虑移除控件代码中的 GICIMSDKManager 类，在 GICIMService 中改为调用项目已有的 ZIM 接口封装类
</Note>


## 功能简介

实时消息互动组件支持多人实时通讯，本文将介绍如何在项目中集成并使用实时消息互动组件。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoCall/call/GoCall_Chat.png" /></Frame>

## 前提条件

在集成实时消息互动组件之前，请确保：

- 已参考 [跑通示例源码](/video-call/run-example-code/ios) 获取 GoCall 完整源码；
- 已在 ZEGO 控制台 创建项目，获取到了项目 appID 和 appSign；
- 已在 ZEGO 控制台 自助开通即时通讯服务（详情请参考 [项目管理 - 即时通讯](/console/service-configuration/im/activate-service)），若无法开通服务，请联系 ZEGO 技术支持。

## 组件接入

### 集成 ZIM SDK

1. 请参考 [即时通讯 - 下载 SDK](/zim-ios/client-sdks/sdk-downloads)，下载最新版本的 SDK。

2. 将 SDK 包解压至您的项目目录下。

3. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZIM.xcframework”，将 “Embed” 设置为 “Embed & Sign”。
![/Pics/ZIM/iOS/embed_and_Sign.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/embed_and_Sign.png)

### 引入组件

解压源码压缩包，拷贝 GoIMChat 到和您的项目根目录同级的文件夹下。
```
# 拷贝 GoIMChat 到和您的项目根目录同级的文件夹下
# podFile 中方引入
pod 'GoIMChat', :path => '../GoIMChat/'
```

### 初始化组件配置参数

```objc
// 从控制台获取 appID
[GICIMChatDependency shared].appID = appID;
// 从控制台获取 appSign
[GICIMChatDependency shared].appSign = appSign;

[GICIMChatDependency shared].userName = userName;
[GICIMChatDependency shared].userID = userID;
```

### 创建 IM service

```objc
[[GICIMService shared] createIM];
```

### 登录 IM service

```objc
[[GICIMService shared] loginIMWithComplete:^(NSError *error) {
    if(error){
    }
}];
```

### 加入 IM 房间

```objc
// RoomID 和 RoomName 由开发者自定义，建议与 Express SDK 使用的相关的值保持一致
[[GICIMService shared] enterRoomWithRoomID:@"房间id" roomName:@"房间名称" complete:^(NSError *error) {
}];
```

### 添加 IM 消息 View

以下示例代码为将 IM 消息 View 添加到屏幕左下角：

```objc
GICChatView * view = [[GICChatView alloc]init];
[self.view addSubview:view];
[view mas_makeConstraints:^(MASConstraintMaker *make) {
    make.left.mas_equalTo(self.view.mas_left).offset(0);
    make.right.mas_equalTo(self.view.mas_right).offset(0);
    make.bottom.mas_equalTo(self.view.mas_bottom).offset(-79);
    make.height.mas_equalTo(180);
}];
```

### 退出 IM 房间

```objc
[[GICIMService shared] logoutIMRoom];
```
