# 项目信息

- - -

本文主要介绍 [创建项目](/console/create-project) 完成后，项目信息的 [查看流程](/console/guide-doc2#1)，以及项目信息涵盖的内容，包括 [基本信息](/console/guide-doc2#2_1)、[配置信息](/console/guide-doc2#2_2) 和 [辅助工具](/console/guide-doc2#2_3)。

<Warning title="注意">


**2021-11-16** 之后注册的控制台不再区分测试环境和正式环境，此时分配的 “AppID” 只有正式环境。

</Warning>

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/f4d7ee5447.gif" alt="飞书20250806-185602.gif"/>
</Frame>

## 查看流程

1. 在“项目管理”界面单击某个项目右侧的“查看”按钮。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1031.png" /></Frame>

2. 进入“项目配置”界面，在该界面的“项目信息”页签中可以查看该项目的基本信息、配置信息和辅助信息，可用于 SDK 的集成和配置。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1026.png" /></Frame>

## 信息内容

### 基本信息


<table>

<tbody><tr>
<th>字段</th>
<th>描述</th>
</tr>
<tr>
<td>项目名称</td>
<td>该项目的名称。</td>
</tr>
<tr>
<td>业务地区</td>
<td>AppID 的主营业务地区。</td>
</tr>
<tr>
<td>AppID</td>
<td>每个项目的唯一标识。</td>
</tr>
<tr>
<td>创建时间</td>
<td>创建该项目的时间。</td>
</tr>
<tr>
<td>项目阶段</td>
<td>仅用于客户自行区分项目所处阶段，不会影响使用和计费，分为“测试中”和“已上线”，项目创建后也支持修改。</td>
</tr>
</tbody></table>

### 配置信息

<table>

<tbody><tr>
<th>字段</th>
<th>描述</th>
<th>截图</th>
</tr>
<tr>
<td>AppSign</td>
<td>
作为项目的鉴权密钥，用于 SDK。默认不展示，单击右侧小眼睛按钮即可显示详细信息。

<Warning title="注意">


- 由于 AppSign 与项目的安全性相关，请勿向他人泄漏。
- ZEGO 支持使用 Token 鉴权方式，若您想要升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权|_blank](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&amp;platform=ios)。

</Warning>

</td>
<td>
&nbsp;<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1027.png" /></Frame>
</td>
</tr>
<tr>
<td>ServerSecret</td>
<td>用于后台服务请求接口的鉴权校验。默认不展示，单击右侧小眼睛按钮即可显示详细信息。</td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1028.png" /></Frame></td>
</tr>
<tr>
<td>CallbackSecret</td>
<td>用于后台服务回调接口的鉴权校验。默认不展示，单击右侧小眼睛按钮即可显示详细信息。</td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1032.png" /></Frame></td>
</tr>
<tr>
<td>Server 地址</td>
<td>与服务器的 WebSocket 通信地址，在 SDK 中进行配置，该地址适用于 Web 和小程序平台。单击“查看”，在打开的弹窗中即可查看和复制 Server 地址。</td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1029.png" /></Frame></td>
</tr>
<tr>
<td>小程序 LogUrl</td>
<td>小程序 SDK 日志上报路径，用于排查故障定位问题，在 SDK 中进行配置。单击“查看”，在打开的弹窗中即可查看和复制该 LogUrl。</td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1030.png" /></Frame></td>
</tr>
</tbody></table>


### 辅助工具

#### 音视频临时 Token

当您需要使用 Token 来验证用户的合法性但尚未实现使用 Token 鉴权时，为方便体验和测试，您可从控制台获取临时 Token。

##### 使用流程

1. 单击“点击生成”。
2. 在弹出的“生成临时 Token”窗口中输入 “UserId” ，单击“生成”，即可快速生成临时 Token。

<Warning title="注意">


临时 Token 有效期为 24 小时，项目上线前必须生成正式的 Token，详情请参考 [使用 Token 鉴权](/real-time-video-android-java/communication/using-token-authentication)。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/1025.png" /></Frame>
