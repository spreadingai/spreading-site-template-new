# 使用 Token 鉴权

---

## 功能简介

鉴权是指验证用户是否拥有访问系统的权限，来避免因权限控制缺失或操作不当引发的安全风险问题，ZEGO 通过 Token（包括基础鉴权 Token 和权限认证 Token） 对用户进行鉴权。

基础鉴权 Token 指的是开发者在登录房间前必须通过 [setCustomToken](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setCustomToken-java.lang.String-) 接口将 Token 传给 SDK，来验证用户的合法性。

权限认证 Token 指的是为了进一步提高安全性开放了房间 ID 权限位，可以验证登录房间的 ID。


## 前提条件

- 基础鉴权 Token 默认开通，权限认证 Token（即房间 ID 权限位）请联系 ZEGO 技术支持开通。
- 已在项目中集成 ZEGO 本地服务端录制 SDK，请参考 [快速开始 - 集成](/local-recording-linux-java/integration/sdk-integration)。

## 实现流程

使用 Token 鉴权时，需要开发者先生成 Token，ZEGO 服务端对带着 Token 的用户进行校验。

以使用 Token 判断用户是否能登录房间为例介绍使用流程，如下图：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/token_uml_liveroom.png" />
</Frame>

1. 开发者客户端发起申请 Token 的请求。
2. 在开发者的服务端上生成 Token，并返回给开发者客户端。
3. 开发者客户端携带申请到的 Token 和 roomID 信息，通过 [setCustomToken](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setCustomToken-java.lang.String-) 接口传入 SDK。
4. ZEGO SDK 会自动将 Token 发送到 ZEGO 服务端进行校验。
5. ZEGO 服务端会将校验结果返回给 ZEGO SDK。
6. ZEGO SDK 再将校验的结果直接返回给开发者客户端，没有权限的客户端将登录失败。

## 使用步骤

本节将详细介绍开发者如何生成 Token 和如何使用 Token。

###  获取 AppID 和 ServerSecret

生成 Token 需要开发者项目的唯一标识 AppID 和密钥 ServerSecret，请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的 “项目信息”获取。


###  生成 Token

#### 服务端生成 Token（推荐）

开发者获得项目的 AppID 和 ServerSecret 信息后，根据实际业务需求，即可在自己的服务端生成 Token。开发者客户端向开发者服务端发送申请 Token 请求，由开发者服务端生成 Token 后返回给到对应客户端。

ZEGO 在 GitHub/Gitee 提供了一个开源的 zego_server_assistant 插件，支持使用 Go、C++、Java、Objective-C、Python、PHP、.NET、Node.js 语言，在开发者的服务端或客户端部署生成 Token。

zego_server_assistant 插件中提供了生成基础鉴权 Token 和生成权限认证 Token 的示例代码，两者的适用场景如下，开发者可按需选择：
- 基础鉴权 Token：用于业务的简单权限验证的场景，此时 “payload” 字段可传空。
- 权限认证 Token：为了进一步提高安全性，开放房间 ID 权限位，可以验证登录房间的 ID，此时 “payload” 字段需要按照规则生成，可参考下表的“权限认证 Token”示例代码。

<Warning title="注意">

- 为保证安全性，强烈推荐您使用服务端生成 Token，否则会存在 ServerSecret 被窃取的风险。
- 请使用 zego_server_assistant 中的 “token04” 来生成 Token。
</Warning>

zego_server_assistant 插件中用于服务端生成 Token 的各语言参考信息如下：

<table>
<tbody><tr>
<th rowSpan="2">语言</th>
<th rowSpan="2">支持版本</th>
<th rowSpan="2">关键函数</th>
<th rowSpan="2">代码库地址</th>
<th colSpan="2">示例代码地址</th>
</tr>
<tr>
<th>基础鉴权 Token</th>
<th>权限认证 Token</th>
</tr>
<tr>
<td>Go</td>
<td>Go 1.14.15 或以上版本</td>
<td>GenerateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/go/src/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/go/src/token04">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/go/sample/token04/sample-base.go">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/go/sample/token04/sample-base.go">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/go/sample/token04/sample-for-rtcroom.go">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/go/sample/token04/sample-for-rtcroom.go">Gitee</a></li></ul></td>
</tr>
<tr>
<td>C++</td>
<td>C++ 11 或以上版本</td>
<td>GenerateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/c%2B%2B/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/c++/token04">Gitee</a></li></ul></td>
<td colSpan="2"><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/c%2B%2B/token04/sample/demo/main.cc">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/c%2B%2B/token04/sample/demo/main.cc">Gitee</a></li></ul></td>
</tr>
<tr>
<td>Java</td>
<td>Java 1.8 或以上版本</td>
<td>generateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/java/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/java/token04">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/java/token04/src/im/zego/serverassistant/sample/Token04SampleBase.java">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/java/token04/src/im/zego/serverassistant/sample/Token04SampleBase.java">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/java/token04/src/im/zego/serverassistant/sample/Token04SampleForRtcRoom.java">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/java/token04/src/im/zego/serverassistant/sample/Token04SampleForRtcRoom.java">Gitee</a></li></ul></td>
</tr>
<tr>
<td>Python</td>
<td>Python 3.6.8 或以上版本</td>
<td>generate_token04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/python/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/python/token04">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/python/token04/test/base_sample.py">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/python/token04/test/base_sample.py">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/python/token04/test/rtcroom_sample.py">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/python/token04/test/rtcroom_sample.py">Gitee</a></li></ul></td>
</tr>
<tr>
<td>PHP</td>
<td>PHP 5.6 或以上版本</td>
<td>generateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/php/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/php/token04">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant_php/blob/main/test/test.php">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/php/token04/test/test.php">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant_php/blob/main/test/testForRtcRoom.php">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/php/token04/test/testForRtcRoom.php">Gitee</a></li></ul></td>
</tr>
<tr>
<td>.NET</td>
<td>.NET Framework 3.5 或以上版本</td>
<td>GenerateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/.net/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/.net/token04">Gitee</a></li></ul></td>
<td colSpan="2"><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/feature/token04/token/.net/token04/demo/WindowsFormsApp1/Form1.cs">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/feature/token04/token/.net/token04/demo/WindowsFormsApp1/Form1.cs">Gitee</a></li></ul></td>
</tr>
<tr>
<td>Node.js</td>
<td>Node.js 8 或以上版本</td>
<td>generateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/nodejs/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/nodejs/token04">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/nodejs/token04/sample/sample-base.js">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/nodejs/token04/sample/sample-base.js">Gitee</a></li></ul></td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/nodejs/token04/sample/sample-rtc-room.js">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/nodejs/token04/sample/sample-rtc-room.js">Gitee</a></li></ul></td>
</tr>
</tbody></table>

以 Go 语言为例，开发者可参考以下步骤使用 zego_server_assistant 生成 Token：

1. 使用命令 `go get github.com/zegoim/zego_server_assistant` 获取依赖包。
2. 在您的代码中，通过 `import "github.com/zegoim/zego_server_assistant/token/go/src/token04"` 引入插件。
3. 调用插件提供的 GenerateToken04 方法生成 Token。

可通过如下三种方式生成 Token。

- **方式 1：基础鉴权 Token**

  生成基础鉴权 Token 示例代码如下：

```go
package main

import (
    "fmt"
    "github.com/zegoim/zego_server_assistant/token/go/src/token04"
)

/*
基础鉴权token生成示例代码
*/

func main() {
    var appId uint32 = 1                               // Zego派发的数字ID, 各个开发者的唯一标识
    userId := "demo"                                   // 用户 ID
    serverSecret := "fa94dd0f974cf2e293728a1234567890" // 在获取 token 时进行 AES 加密的密钥
    var effectiveTimeInSeconds int64 = 3600            // token 的有效时长，单位：秒
    var payload string = ""                            // token业务认证扩展，基础鉴权token此处填空

    //生成token
    token, err := token04.GenerateToken04(appId, userId, serverSecret, effectiveTimeInSeconds, payload)
    if err != nil {
	fmt.Println(err)
	return
    }
    fmt.Println(token)
}
```

- **方式 2：权限认证 Token**
  
  生成权限认证 Token 的示例代码如下：

<Warning title="注意">


生成权限认证 Token 时必须传入 “RoomId”。
</Warning>

```go
package main

import (
    "encoding/json"
    "fmt"
    "github.com/zegoim/zego_server_assistant/token/go/src/token04"
)

/*
权限认证token生成示例代码
*/

//token业务扩展：权限认证属性
type RtcRoomPayLoad struct {
    RoomId       string      `json:"room_id"`        //房间 id（必填）；用于对接口的房间 id 进行强验证
    Privilege    map[int]int `json:"privilege"`      //权限位开关列表；用于对接口的操作权限进行强验证
    StreamIdList []string    `json:"stream_id_list"` //流列表；用于对接口的流 id 进行强验证；允许为空，如果为空，则不对流 id 验证
}

func main() {
    var appId uint32 = 1                               // Zego派发的数字ID, 各个开发者的唯一标识
    roomId := "demo"                                   // 房间 ID
    userId := "demo"                                   // 用户 ID
    serverSecret := "fa94dd0f974cf2e293728a526b028271" // 在获取 token 时进行 AES 加密的密钥
    var effectiveTimeInSeconds int64 = 3600            // token 的有效时长，单位：秒

    //请参考 github.com/zegoim/zego_server_assistant/token/go/src/token04/token04.go 定义
    ////权限位定义
    //const (
    //	PrivilegeKeyLogin   = 1 // 登录权限位认证
    //	PrivilegeKeyPublish = 2 // 推流权限位认证
    //)

    ////权限开关定义
    //const (
    //	PrivilegeEnable     = 1 // 有权限
    //	PrivilegeDisable    = 0 // 无权限
    //)

    //业务权限认证配置，可以配置多个权限位
    privilege := make(map[int]int)
    privilege[token04.PrivilegeKeyLogin] = token04.PrivilegeEnable    // 有房间登录权限
    privilege[token04.PrivilegeKeyPublish] = token04.PrivilegeDisable // 无推流权限

    //token业务扩展配置
    payloadData := &RtcRoomPayLoad{
	RoomId:       roomId,
	Privilege:    privilege,
	StreamIdList: nil,
	}

    payload, err := json.Marshal(payloadData)
    if err != nil {
	fmt.Println(err)
	return
    }

    //生成token
    token, err := token04.GenerateToken04(appId, userId, serverSecret, effectiveTimeInSeconds, string(payload))
    if err != nil {
	fmt.Println(err)
	return
}
    fmt.Println(token)
}

```



<Warning title="注意">运行生成 Token 的 Java 源码时，如果出现 “java.security.InvalidKeyException:illegal Key Size” 异常提示，请参考 [相关常见问题文档](https://doc-zh.zego.im/faq/java_illegal_key_size_solution?product=ExpressVideo&platform=all) 解决。</Warning>


- **方式 3: 控制台获取 Token**

  Token 临时获取方式：为方便开发者调试，[ZEGO 控制台](https://console.zego.im/) 提供生成临时 Token 的功能，开发者可直接获取临时 Token 来使用，详情请参考 [控制台 - 开发辅助](https://doc-zh.zego.im/article/16309)。但是在开发者自己的线上环境中，一定要通过自己的服务端生成 Token。

#### 客户端生成 Token（不推荐）

若您在开发过程中还无法通过服务端下发 Token 时，可以先使用客户端代码生成 Token，待服务端开发完后，再完成对接。


<Warning title="注意">

- App 上线时，切勿在客户端生成 Token，否则您的 ServerSecret 将暴露在风险中。
- 为保证安全性，强烈推荐您使用服务端生成 Token，否则会存在 ServerSecret 被窃取的风险。
</Warning>


zego_server_assistant 插件中用于客户端生成 Token 的各语言参考信息如下：

<table>
  <tbody><tr>
    <th>语言</th>
    <th>支持版本</th>
    <th>关键函数</th>
    <th>具体地址</th>
  </tr>
  <tr>
    <td>C++</td>
    <td>C++ 11 或以上版本</td>
    <td>GenerateToken04</td>
    <td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/c%2B%2B/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/c++/token04">Gitee</a></li></ul></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>Java 1.8 或以上版本</td>
    <td>generateToken04</td>
    <td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/java/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/java/token04">Gitee</a></li></ul></td>
  </tr>
  <tr>
    <td>Objective-C</td>
    <td>-</td>
    <td>GenerateToken04</td>
    <td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/oc/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/oc/token04">Gitee</a></li></ul></td>
  </tr>
</tbody></table>


###  设置 Token 

:::if{props.platform=undefined}
用户携带获取到的 Token 信息，在登录房间之前通过 [setCustomToken](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a68bdea0d66d62c8bf4d671284707b3ae) 接口将 Token 传入给 SDK。

```cpp
LIVEROOM::SetCustomToken("Token"); // 将 Token 替换为获取到的 Token 信息
```

:::

:::if{props.platform=java}
用户携带获取到的 Token 信息，在登录房间之前通过 [setCustomToken](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setCustomToken-java.lang.String-) 接口将 Token 传入给 SDK。

```java
public void setCustomToken(String thirdPartyToken); // 将 Token 替换为获取到的 Token 信息
```
:::
<Content platform="java" />