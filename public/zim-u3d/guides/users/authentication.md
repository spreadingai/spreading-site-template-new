export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const onTokenWillExpireMap = {
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-token-will-expire" target="_blank">onTokenWillExpire</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-token-will-expire" target="_blank">tokenWillExpire</a>,
  'MacOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-token-will-expire" target="_blank">tokenWillExpire</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onTokenWillExpire.html" target="_blank">onTokenWillExpire</a>
}

export const renewTokenMap = {
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#renew-token" target="_blank">renewToken</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#renew-token" target="_blank">renewToken</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/renewToken.html" target="_blank">onTokenWillExpire</a>
}

export const onConnectionStateChangedMap = {
  'Android': <a href="@onConnectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html" target='_blank'>onConnectionStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>onConnectionStateChanged</a>,
  'MacOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>onConnectionStateChanged</a>,
}

# 使用 Token 鉴权


## 1 功能简介

使用 Token 鉴权，指用户进行登录时，ZIM 的业务服务端会根据用户登录时携带的 Token 参数，判断用户是否有权限进行登录，避免因权限控制缺失或操作不当引发的风险问题。


## 2 实现原理

用户登录 ZIM 的服务端之前，开发者服务端应先生成 Token，ZIM 服务端会对带着 Token 的用户进行校验，根据 Token 参数判断用户是否为合法登录的用户。

登录时 Token 校验的流程如下图：

![/Pics/ZIM/Authenticate_users_with_tokens.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/Authenticate_users_with_tokens.png)

1. 客户端发起申请 Token 的请求。
2. 在开发者的服务端上生成 Token，并返回给客户端。
3. 客户端携带申请到的 Token 和 userID 信息，登录 ZIM SDK。
4. ZIM SDK 会自动将 Token 发送到 ZIM 服务端进行校验。
5. ZIM 服务端会将校验的结果返回给 ZIM SDK。
6. ZIM SDK 再将校验的结果直接返回给客户端，没有权限客户端登录将失败。



## 3 使用步骤

以下将介绍开发者的服务端如何生成 Token、如何使用 SDK 设置 Token、以及 Token 过期时的处理方式。

### 3.1 生成 Token

<Warning title="注意">

Token 有效时长不能超过 24 天，为保证安全性，ZEGO 强烈建议开发者在自己的服务端生成 Token。 
</Warning>

#### 1. 获取 AppID 和 ServerSecret。

前往 [ZEGO 控制台](https://console.zego.im) 创建项目，获取接入 ZIM SDK 服务所需的 AppID 和 ServerSecret。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。


#### 2. 开发者服务端生成 Token。

<Note title="说明">

客户端向开发者服务端发送请求申请 Token，由开发者服务端计算 Token 并返回给对应客户端。
</Note>

为方便开发者使用，ZEGO 在 GitHub/Gitee 提供了一个开源的 zego_server_assistant 插件，支持使用 Go、C++、Java、Python、PHP、.NET、Node.js 等语言，在开发者的服务端部署生成 Token。

<table>

<tbody><tr>
<th>语言</th>
<th>支持版本</th>
<th>关键函数</th>
<th>具体地址</th>
</tr>
<tr>
<td>Go</td>
<td>Go 1.14.15 或以上版本</td>
<td>GenerateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/blob/release/github/token/go/src/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/blob/release/github/token/go/src/token04">Gitee</a></li></ul></td>
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
<td>Python</td>
<td>Python 3.6.8 或以上版本</td>
<td>generate_token04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/python/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/python/token04">Gitee</a></li></ul></td>
</tr>
<tr>
<td>PHP</td>
<td>PHP 7.0 或以上版本</td>
<td>generateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/php/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/php/token04">Gitee</a></li></ul></td>
</tr>
<tr>
<td>.NET</td>
<td>.NET Framework 3.5 或以上版本</td>
<td>GenerateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/.net/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/.net/token04">Gitee</a></li></ul></td>
</tr>
<tr>
<td>Node.js</td>
<td>Node.js 8 或以上版本</td>
<td>generateToken04</td>
<td><ul><li><a target="_blank" href="https://github.com/zegoim/zego_server_assistant/tree/release/github/token/nodejs/token04">GitHub</a></li><li><a target="_blank" href="https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token/nodejs/token04">Gitee</a></li></ul></td>
</tr>
</tbody></table>


以 Go 语言为例，开发者可参考以下步骤使用 zego_server_assistant 生成 Token：


1. 首先将 “go/zegoserverassistant” 目录，拷贝到开发者的服务端项目中。
2. 使用命令 `import zsa "your-project-go-mod-path/zegoserverassistant"` 引入插件，需要将 “your-project-go-mod-path” 替换为开发者自己的项目名称。
3. 调用插件提供的 `GenerateToken04` 方法生成 Token。

```go
var appId uint32 = <Your AppId>   // type: uint32
userId := <Your userID>  // type: string
secret := <ServerSecret>  // type: 32 byte length string
var effectiveTimeInSeconds int64 = <Your token effectiveTime> //type: int64; unit: s

token, err := zsa.GenerateToken04(appId, userId, secret, effectiveTimeInSeconds)
if err != nil {
    fmt.Println(err)
    return
}
fmt.Println(token)
```


### 3.2 设置 Token 

用户在登录时传入权限相关的 Token，设置对应的权限。

:::if{props.platform=undefined}

<CodeGroup>
```java
ZIMLoginConfig config = new ZIMLoginConfig();
config.userName = "YOUR_USER_NAME";
config.token = "xxxx"; // 请求开发者服务端获取

zim.login(userID, config, new ZIMLoggedInCallback() {
    @Override
    public void onLoggedIn(ZIMError error) {
        // 开发者可根据 ZIMError 来判断是否登录成功。
        ......        
    }
 });
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart
try{
    ZIMLoginConfig loginConfig = ZIMLoginConfig();
    // 用户昵称，如果不想修改昵称，请留空
    loginConfig.userName = 'userName';
    // 如果使用 token 作为鉴权方式，请填写此参数，否则不需要填写
    loginConfig.token = '';
    // 本次是否为离线登录，请参考离线登录文档了解详情
    loginConfig.isOfflineLogin = false;
    await ZIM.getInstance()?.login('zego', loginConfig);
    // 登录成功，编写登录成功后的业务逻辑
} on PlatformException catch(onError){
    // 登录失败
    // 登录失败的错误码，请参考集成文档中的错误码表进行处理
    onError.code;
    // 登录失败的错误信息
    onError.message;
}
```
</CodeGroup>
:::

:::if{props.platform="iOS|MacOS"}
<CodeGroup>
```objc
ZIMLoginConfig *config = [[ZIMLoginConfig alloc]init];
config.userName = @"YOUR_USER_NAME";
config.token = @"xxxx"; // 请求开发者服务端获取

[zim loginWithUserID:userID config:config callback:^(ZIMError * _Nonnull errorInfo) {
        // 开发者可根据 `ZIMErrorCode` 判断登录是否成功。
}];
```
</CodeGroup>
:::

:::if{props.platform="U3D"}

<CodeGroup>
```cs
ZIMUserInfo userInfo = new ZIMUserInfo();
userInfo.userID = "userID";
userInfo.userName = "userName";
string token = "xxxxxxx"; // 请求开发者服务端获取 Token。 
zim.Login(userInfo, token, (ZIMError errorInfo) =>
{
    if(errorInfo.code == ZIMErrorCode.Success)
    {
        // 登录成功。
    }
    else 
    {
        // 登录失败。
    }
});
```
</CodeGroup>

:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp
ZIMLoginConfig config;
config.userName = 'YOUR_USER_NAME';
config.token = 'xxxx'; // 请求开发者服务端获取

zim->login(userID, config, [=](/zim-u3d/guides/users/zim::zimerror-errorinfo) {
    // 开发者可根据 ZIMError errorInfo 判断房间登录是否成功。
    ......
});
```
</CodeGroup>
:::

### 3.3 Token 过期时的处理方式

在 Token 过期前 30 秒，SDK 会通过 {getPlatformData(props,onTokenWillExpireMap)} 回调发出通知。若登录成功后 Token 有效期不足 30 秒，则会立即回调。

收到该回调后，开发者需要从自己的服务端获取新的有效 Token，并调用 SDK 提供的 {getPlatformData(props,renewTokenMap)} 接口更新 Token。

<Note title="说明">

当 Token 过期且未得到更新时，用户会掉线，收到 {getPlatformData(props,onConnectionStateChangedMap)} 回调，其中 `event` 为 `TOKEN_EXPIRED`，`state` 为 `DISCONNECTED`。
</Note>


:::if{props.platform=undefined}

<CodeGroup>
```java
@Override
public void onTokenWillExpire(int second){
    String token = getToken(); // 重新请求开发者服务端获取 Token;
    engine.renewToken(token, new ZIMTokenRenewedCallback {
        @Override
        public void onTokenRenewed(String token, ZIMError error) {
            // 开发者可根据 ZIMError 来判断更新 Token 是否成功
        } 
    });
}
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart
ZIMEventHandler.onTokenWillExpire = (zim, second) {
    ZIM.getInstance().renewToken('new token');
};
```
</CodeGroup>
:::

:::if{props.platform="iOS|MacOS"}
<CodeGroup>
```objc
- (void)zim:(ZIM *)zim tokenWillExpire:(unsigned int)second {
    NSString *token = [MyToken getToken]; // 重新请求开发者服务端获取 Token
    [self.zim renewToken:token callback:^(ZIMError * _Nonnull errorInfo) {
         // 开发者可根据 ZIMErrorCode 来判断更新 Token 是否成功。
        ......
    }];
}
```
</CodeGroup>
:::


:::if{props.platform="U3D"}
<CodeGroup>
```cs
// zim 是你创建的实例。
zim.onTokenWillExpire = (ZIM zim, uint second) =>
{
    zim.RenewToken("new token", (string token, ZIMError errorInfo) => 
    {
        // 调用 RenewToken 的回调结果
    });
};
```
</CodeGroup>
:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp
void onTokenWillExpire(ZIM * zim, unsigned int second) override {
    std::string token = getToken(); // 重新请求开发者服务端获取 Token
    zim->renewToken(token, [=](/zim-u3d/guides/users/const-std::string-&token,-zim::zimerror-errorinfo) {
        // 开发者可根据 ZIMError errorInfo 判断房间登录是否成功。
        ......
    });
}
```
</CodeGroup>
:::


<Content platform ='U3D'/>