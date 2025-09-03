# Google 推送集成指南

[Google FCM](https://firebase.google.com) (Firebase Cloud Messaging) 是一种跨平台消息传递解决方案，支持海外用户推送离线消息，可供开发者可靠地传递消息。
  
开发者使用 ZIM 提供的“离线推送”功能之前，请参考本文，接入 Google FCM 厂商的离线推送通道。  

## 在 Firebase 上添加并注册 Web App

<Steps>
<Step title="登录 Firebase">
前往 [Firebase](https://console.firebase.google.com/)，登录自己的 [Google 账号](https://support.google.com/accounts/answer/27441?hl=zh-Hans&ref_topic=3382296)。
</Step>
<Step title="添加项目">
登录成功后，在页面中，选择 “Add project”，输入项目名称及相关信息。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/add_project.png" />
</Frame>
</Step>
<Step title="创建 Web 应用">
添加项目完成后，点击，进入项目详情。
 <Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/project_info.png" />
</Frame>
然后，点击下方显示的按钮创建一个Web应用程序。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/create_app.png" />
</Frame>
填写 Web 应用的相关信息，然后点击 “Register app”。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/add_app_info.png" />
</Frame>
</Step>
<Step title="获取 Firebase service account credential">
注册完成后，点击 “Service accounts > Generate new private key” 生成 JSON 配置文件。**集成 SDK 时，需要将此文件提交给 ZEGO 技术支持。**
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/download_google_json.png" />
</Frame>
</Step>
</Steps>


   
## 配置离线推送证书

<Steps>
<Step title="生成 Web Push certificates">
在 Firebase 控制台，选择 “Cloud Messaging”，生成 Web Push certificates。请复制图中框选的 “key pair“ 用于下文配置 `vapidKey`。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/firebase_push_certificates.png" />
</Frame>
</Step>
<Step title="拷贝 firebaseConfig 变量信息">

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/firebase_config.png" />
</Frame>
</Step>
</Steps>


在完成上述步骤后，你可以继续完成[实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)步骤。

<Content />