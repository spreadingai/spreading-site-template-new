# 使用 Postman 调试

- - -

本文中将介绍如何使用 Postman 调试服务端 API。

Postman 是一款 API 调试工具，可在让开发者在图形化界面中方便、直观地调试服务端 API。

为便于开发者调试云通讯产品的服务端 API，ZEGO 提供了对应的 Postman Collection，预先定义好了每个接口的请求参数，开发者导入后仅需修改参数取值即可调试。

## 前提条件

- 已经下载并安装了 [Postman](https://www.postman.com/downloads/)。
- 已经下载并解压了 [云通讯产品服务端 API 的 Collection](https://artifact-sdk.zego.im/media/files/RTC_postman_collection.zip)。
- 已经登录 <a target="_blank" href="https://console.zego.im/">ZEGO 控制台</a> 获取了调用接口所必须的 AppId 和 ServerSecret 等信息。

<Warning title="注意">


- Postman 在不同平台的客户端界面会略有差异，本文以 macOS 平台上的 Postman 为例进行介绍。
- 本文提供的 Collection 仅供调测使用，并未包含所有服务端 API。

</Warning>



## 导入并配置 Collection

1. 单击 "Import"，将解压 collection 获取的两个文件一起导入。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/import.png" /></Frame>

2. 将环境设置为 "RTC"。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/set_env.png" /></Frame>

3. 打开 “RTC” 环境，将 [前提条件](https://doc-zh.zego.im/article/19704#1) 中获取的 AppId 和 ServerSecret 设置到对应环境变量的 “CURRENT VALUE” 中，然后保存。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/set_env_value.png" /></Frame>

<Note title="说明">


如果 AppId 为测试环境（详见 <a target="_blank" href="/live-streaming-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），还需要将环境变量中 “IsTest” 的值（上图中最后一个参数）修改为 “true”。


</Note>




## 调试接口

本章中以 3 个接口为例介绍如何使用 Postman 调试服务端 API。

<Note title="说明">


ZEGO 提供的 collection 通过环境变量和前置脚本实现了公共参数的自动填写，前置脚本可在下图位置查看，开发者开发服务端时可用于参考。


</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/pre_script.png" /></Frame>

### 推送广播消息

此 API 用于在房间内推送广播消息。在调用此接口前，开发者需要先登录房间。

<Note title="说明">


开发者可参考 [跑通示例源码](/real-time-video-android-java/client-sdk/download-demo) 运行 Demo 登录房间，也可参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk) 开发自己的应用登录房间。


</Note>



1. 在 Collections 中选择 “ SendBroadcastMessage”，根据 [推送广播消息](https://doc-zh.zego.im/article/19461) 中的参数说明修改 Param 中参数的取值。双大括号包裹的参数值为环境变量，无需手动修改。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/send_broadcast_message.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/send_broadcast_message_rsp.png" /></Frame>



### 踢出房间用户

此 API 用于踢出房间内的指定用户，该用户当前的推流和拉流会全部停止。在调用此接口前，开发者需要先登录房间。

<Note title="说明">


开发者可参考 [跑通示例源码](/real-time-video-android-java/client-sdk/download-demo) 运行 Demo 登录房间，也可参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk) 开发自己的应用登录房间。


</Note>



1. 在 Collections 中选择 “KickoutUser”，根据 [踢出房间用户](https://doc-zh.zego.im/article/19569) 中的参数说明修改 Param 中参数的取值。UserId[] 为踢出房间的用户 ID，可携带一个或多个，最大支持 5 个用户 ID，具体含义请参考参数说明。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/kickout_user.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/kickout_user_rsp.png" /></Frame>



### 开始混流

此 API 用于开始混流/更新混流任务。

<Warning title="注意">


首次使用本接口之前，需要联系 ZEGO 技术支持开通。

</Warning>




1. 在 Collections 中选择 “StartMix”，根据 [开始混流](https://doc-zh.zego.im/article/19595) 中的参数说明修改 Body 中参数的取值。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/start_mix.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/postman/start_mix_rsp.png" /></Frame>
