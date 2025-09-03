# web

---


## 功能简介

实时消息互动组件支持多人实时通讯，本文将介绍如何在项目中集成并使用实时消息互动组件。

<Note title="提示">

- 本组件在 vue3 框架下开发
- 想要实现实时消息互动的更多功能，请参考 [即时通讯](/zim-web/introduction/overview)。
</Note>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoCall/call/GoCall_Chat_web.png" /></Frame>

## 前提条件

在集成实时消息互动组件之前，请确保：

- 已参考 [跑通示例源码](/video-call/run-example-code/web) 获取 GoCall 完整源码；
- 已在 ZEGO 控制台 创建项目，并获取了项目的 appID 和 appSign；
- 已在 ZEGO 控制台 自助开通即时通讯服务（详情请参考 [项目管理 - 即时通讯](/console/service-configuration/im/activate-service)），若无法开通服务，请联系 ZEGO 技术支持。

## 组件接入

### 引入资源

安装 zego-zim-web 依赖包。

```javascript
npm i zego-zim-web --save
npm i axios --save // 若已安装，请忽略
```

### 获取 chatbox 组件

下载并解压 [web 端 GoCall 代码压缩包](https://codestore.zego.im/project/14)，找到 chatBox.zip 压缩文件夹并解压到您的项目文件夹下。


### 配置 appID 和 appSign

在 chatBox 文件夹中找到 user.ts，并填写您的 appID 和 appSign。

```javascript

export const SDKConfig = {
  // 从 ZEGO 控制台获取项目的 appID 和 appSign
  appID: 0,
  appSign: "",
};

```

### 引入 vue 组件

在 chatBox 文件夹中找到 chatBox.vue 组件，引入您的项目中。

```javascript

import chatBox from "@/components/chatBox/chatBox.vue";

// 注意：chatBox.vue 在 vue3 框架下开发
// 在您想要使用实时消息互动功能的 vue 组件下的 components 引入 chatBox.vue 组件
components: {
    chatBox,
}
```

在 template 模板中添加 chatbox 组件。

```html
// 在 template 模板中添加 chatbox 组件
<template>
    <div>
        <chat-box />
    </div>
</template>
```

### 登录 ZIM 并进入房间

```javascript

import { zimLogin, roomID } from "./chaBox/zegoZimSDK"
import { myUser } from "./chaBox/user"


zimLogin(myUser.userID, myUser.userName as string, roomID)

```
