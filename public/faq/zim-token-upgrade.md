<Title>ZIM 如何从 AppSign 鉴权升级为 Token 鉴权？</Title>




- - -


## 文档导读

为了提高项目的安全性，对于使用 AppSign 鉴权的开发者，可以使用 Token 鉴权、且鉴权通过后才能使用相关服务（如果您不需要，可继续使用 AppSign 鉴权方式），您可以参考本文档了解实现流程。

<Warning title="注意">


- 各平台 SDK 对 “AppSign 鉴权” 的支持情况：
    - Web 和小程序：不支持（包含各框架 SDK 开发的 Web 端应用也不支持）。
    - 剩余平台：支持，但 iOS、Android、macOS、Windows、uni-app、React Native 等平台的 ZIM SDK 版本需为 **2.3.0 或以上**。
- **所有**平台的的 SDK，均支持 “Token 鉴权”。

</Warning>




## 方案说明

ZIM SDK 提供了如下 “Token 鉴权” 的接入方案：


<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/quick_start_Structure.png" /></Frame></Frame>


在此方案中，您需要通过您自己的业务系统实现以下业务逻辑：

- 搭建客户端的用户管理逻辑，并下发用户 ID 用于客户端登录。
- 鉴权 Token，建议由您的业务后台自行实现，保证鉴权数据安全。


## 鉴权方式

<table>
  
  <tbody><tr>
    <th>鉴权方式</th>
    <th>功能描述</th>
    <th>安全级别</th>
  </tr>
  <tr>
    <td>AppSign 鉴权</td>
    <td>在创建 ZIM 实例时传入 AppSign，鉴权通过后即可使用 ZIM 功能。<br />请在登录 ZIM 时，给 Token 传入空字符串或不传。</td>
    <td>安全级别很低。<br />原因为：如果 AppSign 被泄漏，攻击者会盗用您的云服务流量，并且 AppSign 没有过期机制，建议您尽快升级为 Token 鉴权。</td>
  </tr>
  <tr>
    <td>Token 鉴权<b>（推荐）</b></td>
    <td>Token 鉴权是在登录 ZIM 时必须传入 Token，鉴权通过后即可使用实时音视频功能。 <br />请在创建 ZIM 实例时，给 AppSign 传入空字符串或不传。<br /></td>
    <td>安全级别高。<br />原因为：通过开发者自建服务端下发 Token，并且在客户端上进行认证，且下发的 Token 具有时效性。因此，我们推荐您使用 Token 鉴权。</td>
  </tr>
</tbody></table>

<Warning title="注意">


当您同时传入了 AppSign 和 Token 时（不建议同时传入），将先校验 AppSign，若 AppSign 校验通过，则不再校验 Token；如果 AppSign 校验不通过，则再校验 Token。

</Warning>





## 升级指导

### 服务开通

- `2.3.3 及以上` 版本的 SDK，支持鉴权方式的自主切换，无需联系 ZEGO 技术支持处理。
- 以下版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理。
    - iOS/Android/macOS/Window：`2.3.0 ~ 2.3.1` 版本。
    - uni-app/React Native/Flutter：`2.3.0` 版本。
- `2.3.0 以下` 版本的 SDK，默认为 “Token 鉴权”，不支持 “AppSign 鉴权”，无需另行开通。

### 生成 Token

开发者客户端向开发者服务端发送请求申请 Token，由开发者服务端生成 Token 后返回给到对应客户端。

ZEGO 在 GitHub/Gitee 提供了一个开源的 [zego_server_assistant](https://gitee.com/zegodev_admin/zego_server_assistant/tree/release/github/token) 插件，支持使用 Go、C++、Java、Python、PHP、.NET、Node.js 语言，在开发者的服务端或客户端部署生成 Token（不推荐客户端生成）。

生成 Token 的详细介绍请参考如下文档：

<table>
  
<tbody><tr>
<th>产品</th>
<th>参考文档</th>
</tr>
<tr>
<td>即时通讯</td>
<td><ul><li><a target="_blank" href="/zim-ios/guides/users/authentication#31-生成-token">iOS</a></li><li><a target="_blank" href="/zim-android/guides/users/authentication#31-生成-token">Android</a></li><li><a target="_blank" href="/zim-macos/guides/users/authentication#31-生成-token">macOS</a></li><li><a target="_blank" href="/zim-win/guides/users/authentication#31-生成-token">Windows</a></li><li><a target="_blank" href="/zim-uniapp/guides/users/authentication#31-生成-token">uni-app</a></li><li><a target="_blank" href="/zim-rn/guides/users/authentication#31-生成-token">React Native</a></li><li><a target="_blank" href="/zim-flutter/guides/users/authentication#31-生成-token">Flutter</a></li></ul></td>
</tr>
</tbody></table>



### 使用 Token


本章主要介绍您升级 SDK 后如何使用 Token 功能。

<table id="token_table">
  
<tbody><tr>
<th>产品</th>
<th>平台</th>
</tr>
<tr>
<td>即时通讯</td>
<td><ul><li><a href="#zim_ios">iOS</a></li><li><a href="#zim_android">Android</a></li><li><a href="#zim_ios">macOS</a></li><li><a href="#zim_windows">Windows</a></li><li><a href="#zim_uni">uni-app</a></li><li><a href="#zim_react">React Native</a></li><li><a href="#zim_flutter">Flutter</a></li></ul></td>
</tr>

</tbody></table>


各平台的实现流程如下：

<b id="zim_ios">iOS/macOS</b>

1. 已下载并集成最新版本的 [SDK](/zim-ios/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-ios/send-and-receive-messages#2-集成-sdk)。
2. 调用 [createWithAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#create-with-app-config) 接口创建 ZIM 实例时，[ZIMAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~class~ZIMAppConfig) 中的 “AppSign” 传空或者不传。

    ```objc
    // 创建 ZIM 对象，传入 appID、appSign
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
    // (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 ~ 2.3.1 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理
    ZIMAppConfig *appConfig = [[ZIMAppConfig alloc] init];
    appConfig.appID = (unsigned int)appID;     //替换为您申请到的 AppID
    appConfig.appSign = @"appSign";     //AppSign 传空或者不传
    self.zim = [ZIM createWithAppConfig: appConfig];
    ```

3. 调用 [loginWithUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#login-with-user-info-token-callback) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```objc
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    ZIMUserInfo *userInfo = [[ZIMUserInfo alloc]init];
    userInfo.userID = @"zegoUser1"; //填入NSString类型的值
    userInfo.userName = @"zegotest";//填入NSString类型的值

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
    [zim loginWithUserInfo:userInfo token:token callback:^(ZIMError * _Nonnull errorInfo) {
        //这里填写登录的回调
    }];
    ```

4. 在收到的 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#renew-token-callback) 接口更新 Token 并传入 SDK 即可。

    ```objc
    - (void)zim:(ZIM *)zim tokenWillExpire:(unsigned int)second {
        NSString *token = [MyToken getToken]; // 重新请求开发者服务端获取 Token
        [self.zim renewToken:token callback:^(ZIMError * _Nonnull errorInfo) {
            // 开发者可根据 ZIMErrorCode 来判断更新 Token 是否成功。
            ......
        }];
    }
    ```



<b id="zim_android">Android</b>

1. 已下载并集成最新版本的 [SDK](/zim-android/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-android/send-and-receive-messages#2-集成-sdk)。
2. 调用 [create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create) 接口创建 ZIM 实例时，[ZIMAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMAppConfig) 中的 “AppSign” 传空或者不传。

    ```java
    // 创建 ZIM 对象，传入 appID、appSign 与 Android 中的 Application
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
    // (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 ~ 2.3.1 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理
    ZIMAppConfig appConfig = new ZIMAppConfig();
    appConfig.appID = 12345;  //替换为您申请到的 AppID
    appConfig.appSign = "appSign";   //AppSign 传空或者不传
    zim = ZIM.create(appConfig, application);
    ```

3. 调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```java
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    ZIMUserInfo zimUserInfo = new ZIMUserInfo();
    zimUserInfo.userID = userID;
    zimUserInfo.userName = userName;

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
    zim.login(zimUserInfo, token, new ZIMLoggedInCallback() {
        @Override
        public void onLoggedIn(ZIMError error) {
            // 开发者可根据 ZIMError 来判断是否登录成功。          
        }
    });
    ```

4. 在收到的 [onTokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#renew-token) 接口更新 Token 并传入 SDK 即可。

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




<b id="zim_windows">Windows</b>

1. 已下载并集成最新版本的 [SDK](/zim-win/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-win/send-and-receive-messages#2-集成-sdk)。
2. 调用 [create](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#create) 接口创建 ZIM 实例时，[ZIMAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMAppConfig) 中的 “AppSign” 传空或者不传。

    ```cpp
    // 创建 ZIM 对象，传入 appID、appSign，目前仅建议一个客户端创建一个zim实例
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
    // (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 ~ 2.3.1 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理
    zim::ZIMAppConfig app_config;
    app_config.appID = 12345;     //替换为您申请到的 AppID
    app_config.appSign = "appSign";   //AppSign 传空或者不传
    zim_ = zim::ZIM::create(app_config);
    ```

3. 调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#login) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```cpp
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    zim::ZIMUserInfo user_info;
    user_info.userID = user_id;
    user_info.userName = user_name;

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
    zim_->login(user_info, token, [=](/faq/zim::zimerror-errorinfo){
        // 这里可以获取登录结果返回值，并根据错误码执行用户代码
    });
    ```

4. 在收到的 [onTokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#renew-token) 接口更新 Token 并传入 SDK 即可。

    ```cpp
    void onTokenWillExpire(ZIM * zim, unsigned int second) override {
        std::string token = getToken(); // 重新请求开发者服务端获取 Token
        zim->renewToken(token, [=](/faq/const-std::string-&token,-zim::zimerror-errorinfo) {
            // 开发者可根据 errorInfo 中的 code 来判断更新 Token 是否成功
            ......
        });
    }
    ```





<b id="zim_uni">uni-app</b>

1. 已下载并集成最新版本的 [SDK](/zim-uniapp/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-uniapp/send-and-receive-messages#2-集成-sdk)。
2. 调用 [create](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#create) 接口创建 ZIM 实例时，[ZIMAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMAppConfig) 中的 “AppSign” 传空或者不传。

    ```javascript
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
    // (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理

    // 静态同步方法，创建 zim 实例，传入 AppID 和 AppSign
    // create 方法仅第一次调用时会创建 ZIM 实例，后续调用会返回 null。
    ZIM.create({ appID: 0, appSign: '' });
    // 通过 getInstance 获取单实例，避免热更新导致 create 多次创建返回 null。
    var zim = ZIM.getInstance();
    ```

3. 调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#login) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```javascript
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    var userInfo = { userID: 'xxxx', userName: 'xxxx' };

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
    var token = '';
    zim.login(userInfo, token)
        .then(function () {
            // 登录成功
        })
        .catch(function (err) {
            // 登录失败
        });
    ```

4. 在收到的 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#renew-token) 接口更新 Token 并传入 SDK 即可。

    ```javascript
    // 注册监听“令牌即将过期”的回调
    zim.on('tokenWillExpire', function(zim, second) {
        var token = ''; // 重新请求开发者服务端获取 Token
        zim.renewToken(token)    
            .then(function({ token }) {
                // 更新成功
            })
            .catch(function(err) {
                // 更新失败
            });
    })
    ```


<b id="zim_react">React Native</b>

1. 已下载并集成最新版本的 [SDK](/zim-rn/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-rn/send-and-receive-messages#2-集成-sdk)。
2. 调用 [create](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#create) 接口创建 ZIM 实例时，[ZIMAppConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMAppConfig) 中的 “AppSign” 传空或者不传。

    ```javascript
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
    // (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理

    // 静态同步方法，创建 zim 实例，传入 AppID 和 AppSign
    // create 方法仅第一次调用时会创建 ZIM 实例，后续调用会返回 null。
    ZIM.create({ appID: 0, appSign: '' });
    // 通过 getInstance 获取单实例，避免热更新导致 create 多次创建返回 null。
    var zim = ZIM.getInstance();
    ```

3. 调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#login) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```javascript
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    var userInfo = { userID: 'xxxx', userName: 'xxxx' };

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
    var token = '';
    zim.login(userInfo, token)
        .then(function () {
            // 登录成功
        })
        .catch(function (err) {
            // 登录失败
        });
    ```

4. 在收到的 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#token-will-expire) 回调后，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#renew-token) 接口更新 Token 并传入 SDK 即可。

    ```javascript
    // 注册监听“令牌即将过期”的回调
    zim.on('tokenWillExpire', function(zim, second) {
        var token = ''; // 重新请求开发者服务端获取 Token
        zim.renewToken(token)    
            .then(function({ token }) {
                // 更新成功
            })
            .catch(function(err) {
                // 更新失败
            });
    })
    ```


<b id="zim_flutter">Flutter</b>

1. 已下载并集成最新版本的 [SDK](/zim-flutter/client-sdks/sdk-downloads)，详情请参考 [集成 SDK](/zim-flutter/send-and-receive-messages#2-集成-sdk)。
2. 调用 [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) 接口创建 ZIM 实例时，[ZIMAppConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMAppConfig-class.html) 中的 “AppSign” 传空或者不传。

    ```dart
    // 创建 
    // 通过插件创建 ZIM 单实例，传入 APPID、AppSign
    // 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式，请联系 ZEGO 技术支持切换配置
    ZIMAppConfig appConfig = ZIMAppConfig();
    appConfig.appID = appID;
    appConfig.appSign = appSign;  //AppSign 传空或者不传

    ZIM.create(appConfig);
    ```

3. 调用 [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) 接口登录 ZIM 时，需要填入开发者服务器生成的 Token。

    ```dart
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 64 字节的字符串，无特殊字符限制。
    ZIMUserInfo userInfo = ZIMUserInfo();
    userInfo.userID = "userID"; //填入 string 类型的值
    userInfo.userName = "userName";//填入 string 类型的值

    // 登录时：
    // 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]

    ZIM
    .getInstance()
    !.login(userInfo, "token")
    .then((value) {
        //登录成功触发此处
    })
    .catchError((onError) {
        switch (onError.runtimeType) {
            // 登录失败触发此处
            case PlatformException:
                log(onError.code); //登录失败错误码
                log(onError.message!);//登录失败错误信息
                break;
            default:
        }
    });
    ```

4. 在收到的 [onTokenWillExpire](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onTokenWillExpire.html) 回调后，调用 [renewToken](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/renewToken.html) 接口更新 Token 并传入 SDK 即可。

    ```dart
    ZIMEventHandler.onTokenWillExpire = (zim, second) {
        ZIM.getInstance().renewToken('new token');
    };
    ```