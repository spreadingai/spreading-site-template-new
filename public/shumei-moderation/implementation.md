# 使用说明

- - -

本文介绍如何通过 ZEGO 云市场开通、使用数美内容审核服务，快速打造安全合规的实时互动应用。

<Warning title="注意">


如果您使用的是即时通讯（ZIM）服务，请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation) 开通权限、完成相关配置，无需其他操作。

</Warning>



## 开通权限

1. 在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的账号，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
2. 参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。
3. 服务开通后，您将获得使用以下 6 类服务的审核授权。如果以下内容无法满足您业务的需求，请联系 ZEGO 商务人员沟通。

<table>
  
<tbody><tr>
<th>审核类型</th>
<th>对应业务内容</th>
<th>常见风险</th>
</tr>
<tr>
<td>音频流识别</td>
<td><ul><li>语聊房麦上内容</li><li>直播间语音内容</li></ul></td>
<td><ul><li>色情</li><li>辱骂</li></ul></td>
</tr>
<tr>
<td>视频流识别</td>
<td><ul><li>直播间主播视频画面</li><li>视频聊天画面</li></ul></td>
<td><ul><li>色情</li><li>广告</li></ul></td>
</tr>
<tr>
<td>文本识别</td>
<td><ul><li>用户昵称</li><li>评论区文本</li><li>直播弹幕</li></ul></td>
<td><ul><li>辱骂</li><li>色情</li><li>涉政</li><li>广告引流</li></ul></td>
</tr>
<tr>
<td>图片识别</td>
<td><ul><li>用户头像</li><li>评论区图片</li></ul></td>
<td><ul><li>色情</li><li>广告</li></ul></td>
</tr>
<tr>
<td>音频文件识别</td>
<td><ul><li>群聊语音消息</li><li>论坛语音回复</li><li>个人主页语音介绍</li></ul></td>
<td><ul><li>辱骂</li><li>色情</li></ul></td>
</tr>
<tr>
<td>视频文件识别</td>
<td>评论区视频</td>
<td><ul><li>色情</li><li>广告引流</li></ul></td>
</tr>
</tbody></table>


## 使用步骤

### 前提条件

在开始测试或使用数美内容审核服务之前，请确保：

- 已开通 `数美内容审核` 权限，或账号处于测试周期内。
- 已在 [ZEGO 云市场](https://www.zego.im/cloudmarket) 购买套餐包，或已与 ZEGO 商务人员签署合同，采用后付费的计费方式。

### 审核方式选择与实现

不同的审核内容支持的集成方式有所区别，开发者请根据自己的业务需要，选择合适的实现方式。

<table>
  
<tbody><tr>
<th>审核方式</th>
<th>使用方式</th>
<th>参考文档</th>
</tr>
<tr>
<td>智能音频流</td>
<td>向 ZEGO 服务端发起请求进行审核。</td>
<td><ul><li><a href="#serverAPI">向 ZEGO 服务端发起请求进行审核</a></li><li><a href="https://doc-zh.zego.im/article/18720" target="blank">开始音频流审核</a></li></ul></td>
</tr>
<tr>
<td>智能视频流</td>
<td>向 ZEGO 服务端发起请求进行审核。</td>
<td><ul><li><a href="#serverAPI">向 ZEGO 服务端发起请求进行审核</a></li><li><a href="https://doc-zh.zego.im/article/18724" target="blank">开始视频流审核</a></li></ul></td>
</tr>
<tr>
<td>智能文本</td>
<td rowspan="4">直接请求数美服务端 API 进行审核，请查看 <a href="#other">必读信息</a>。</td>
<td><a href="https://help.ishumei.com/docs/tj/text/versionV4/sync/developDoc/">数美智能文本识别产品 API 文档</a></td>
</tr>
<tr>
<td>智能图片</td>
<td><a href="https://help.ishumei.com/docs/tj/image/newest/developDoc/">数美智能图片识别产品 API 文档</a></td>
</tr>
<tr>
<td>智能音频文件</td>
<td><a href="https://help.ishumei.com/docs/tj/audio/versionV4/sync/developDoc/">数美智能音频文件识别产品 API 文档</a></td>
</tr>
<tr>
<td>智能视频文件</td>
<td><a href="https://help.ishumei.com/docs/tj/video/newest/developDoc/">数美智能视频文件识别产品 API 文档</a></td>
</tr>
</tbody></table>

其中，音频流、视频流都支持通过 `服务端 API` 实现内容审核，具体实现方式如下：

<table>
  
<tbody><tr>
<th>接入方式</th>
<th>向 ZEGO 服务端发起请求进行审核</th>
</tr>
<tr>
<th>概述</th>
<td>ZEGO 封装了 “数美智能音/视频流识别” 的服务端 API，开发者可以直接向 ZEGO 服务端发起审核请求，接入方式更简单。</td>
</tr>
<tr>
<th>核心步骤</th>
<td><ol><li>在 <a href="https://console.zego.im" target="blank">ZEGO 控制台</a> 注册账号，开通审核服务权限。</li><li>在 <a href="https://console.zego.im" target="blank">ZEGO 控制台</a> 配置回调地址。</li><li>通过指定 URL，向 ZEGO 服务端发起审核请求。</li><li>根据回调地址中的审核结果，处理业务逻辑。</li></ol></td>
</tr>
<tr>
<th>优点</th>
<td><ul><li>接入更方便。ZEGO 内部封装了鉴权相关的逻辑，您无需额外处理。</li><li>接口参数更简洁。摒弃不常用的参数、不会用到的参数，降低配置的复杂度。</li></ul></td>
</tr>
<tr>
<th>缺点</th>
<td>由于 ZEGO 本质上是封装的数美服务端 API，需要数美先行支持，ZEGO 再进行封装，所以接口和功能的更新频率相较于数美稍慢。</td>
</tr>
</tbody></table>

下文对各种审核实现方式进行详细介绍，请您根据自己的业务需要，选择合适的实现方式。

<p id="serverAPI"></p>

<Accordion title="向 ZEGO 服务端发起请求进行审核" defaultOpen="false">
在开始调用服务端 API 接口之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppId 和 ServerSecret，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已准备好自己的客户端，搭建相关的业务场景。
- 已经在 [ZEGO 控制台](https://console.zego.im) 配置了接收审核结果的回调地址。

#### 1. 配置公共请求参数

开发者调用每个 ZEGO 服务端 API 前，需要先配置 API 的公共请求参数。

公共请求参数，是指每个接口都需要使用到的请求参数，包含了 AppId、Signature（指 2 生成的签名信息）、SignatureNonce（随机字符串）、Timestamp（时间戳）等参数，请根据实际情况修改。公共参数的具体介绍，请参考 [调用方式](/shumei-moderation/server-apis/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

```html
https://rtc-api.zego.im/?Action=StartCensorAudio
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=Pc5WB8gokVn0xfeu%2FZV%2BiNM1dgI%3D
&SignatureVersion=2.0
&IsTest=false
```

开发者可以在 [服务端 API 校验](https://doc-zh.zego.im/server-link-checker) 页面中，输入 URL 地址，验证签名信息、公共参数、以及 URL 格式是否合法。

#### 2. 配置 API 相关业务参数

配置完公共参数后，再去配置 API 相关的业务参数，设定所需的目标操作。 

业务参数的具体介绍，请参考：

- 开始音频流审核：[StartCensorAudio](/shumei-moderation/server-apis/start-censor-audio#请求参数) 中的 “请求参数”。
- 开始视频流审核：[StartCensorVideo](/shumei-moderation/server-apis/start-censor-video#请求参数) 中的 “请求参数”。

#### 3. 开发者的服务端发起请求

以上配置完成后，开发者的服务端可以通过 URL 地址，向 ZEGO 服务端发送请求。

请求示例如下：

<CodeGroup>
```html title="音频流审核"
  https://rtc-api.zego.im/?Action=StartCensorAudio
  &RoomId=RoomAudio
  &StreamId=StreamId_1635941431395593000
  &AudioType[]=1
  &ReturnAllText=1
  &ReturnPreText=1
  &ReturnPreAudio=1
  &ReturnFinishInfo=1
  &<公共请求参数>
  ```
  
  ```html title="视频流审核"
  https://rtc-api.zego.im/?Action=StartCensorVideo
  &RoomId=RoomVideo
  &StreamId=StreamId_1635941431395593000
  &ImageType[]=1
  &ImageType[]=2
  &AudioType[]=1
  &ReturnAllImage=1
  &ReturnAllText=1
  &ReturnFinishInfo=1
  &DetectFrequency=1
  &DetectStep=5
  &<公共请求参数>
  ```
</CodeGroup>

#### 4. ZEGO 服务端响应请求，并通过回调地址返回审核结果

ZEGO 服务端接收到开发者的请求信息后，返回响应的信息。

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"xxxxx",
    "Data":{
                "TaskId":"xxxxx"
           }
}
```

返回信息字段中，如果 Code 为 “0” 表示请求成功；如果不为 “0” 则表示请求失败，请参考 [全局返回码](https://doc-zh.zego.im/article/18685) 处理。

通过您在 [ZEGO 控制台](https://console.zego.im) 配置的回调地址，获取详细的审核结果，回调结果说明请参考：

- [音频流审核回调](/shumei-moderation/callback/audio) 
- [视频流审核回调](/shumei-moderation/callback/video)

音/视频流审核仅支持异步返回审核结果。开发者可以根据回调结果，进行业务侧的风控处理，比如对违规用户进行断流、禁言、封号等。
</Accordion>

<p id="sdkAPI"></p>



<p id="other"></p>

<Accordion title="请求数美服务端 API 进行审核（必读信息）" defaultOpen="false">
`音频流识别` 和 `视频流识别` 之外的 4 类内容，ZEGO 没有封装对应的接口和使用方案，需要您参考数美的文档，自行发起服务端请求，并通过返回值或回调结果，进行业务侧逻辑处理。

在您自行接入数美审核服务前，请确保：

- 已参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。
- 已联系 ZEGO 商务人员，加入了您、数美、ZEGO 三方对接群。
- 请确保已知悉如下信息：

<table>
  
<tbody><tr>
<th>关键字段</th>
<th>说明</th>
</tr>
<tr>
<td>accessKey</td>
<td>数美服务端 API 接口认证密钥，开发者向数美服务端发送请求时必传。</td>
</tr>
<tr>
<td>appId</td>
<td>应用标识（请与 ZEGO 项目分配的 AppID 区分开），开发者向数美服务端发送请求时必传。</td>
</tr>
<tr>
<td>eventId</td>
<td>审核策略的管理维度，后续策略的调整将以 eventId 为最小调节粒度，开发者向数美服务端发送请求时必传。<b>该字段在三方对接沟通后，由数美技术支持直接提供。建议您在业务侧对数据的类型和来源进行分类，映射为 eventId 字段。</b></td>
</tr>
</tbody></table>
</Accordion>
