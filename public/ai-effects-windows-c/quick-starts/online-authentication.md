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

export const newCreateMap = {
    'default': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objectivec_ios~class~ZegoEffects#create-appid-app-sign-callback-1" target='_blank'>create</a>,
    'macOS': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#create-appid-app-sign-2" target='_blank'>create</a>,
    'macOS-c': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego-effects-create" target='_blank'>zego_effects_create</a>,
    'Android': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-1" target='_blank'>create</a>,
    'Windows': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego-effects-create" target='_blank'>zego_effects_create</a>,
}
export const createMap = {
    'default': <a href="@create" target='_blank'>create</a>,
    'Windows': <a href="@zego_effects_create" target='_blank'>zego_effects_create</a>,
}
export const flowchart1Map = {
    'default,Android,mac': <img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/getAuthorizedMessage_iOS_Android.png" />,
    'Windows': <img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Qt/getAuthorizedMessage_Windows.png" />,
}
export const flowchart2Map = {
    'default,Android,mac': <img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/getAuthorizedMessage_iOS_Android_cgi.png" />,
    'Windows': <img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Qt/getAuthorizedMessage_iOS_Android_cgi_win.png" />,
}
export const getAuthInfoMap = {
    'default': <a href="@getAuthInfo" target='_blank'>getAuthInfo</a>,
    'Windows': <a href="@zego_effects_get_auth_info" target='_blank'>zego_effects_get_auth_info</a>,
}
export const setResourcesMap = {
    'default': <a href="@setResources" target='_blank'>setResources</a>,
    'Windows': <a href="@zego_effects_set_resources" target='_blank'>zego_effects_set_resources</a>,
}

# 在线鉴权

- - -

<Warning title="注意">
- 仅 2.1.0 版本以下 SDK 支持使用本文档进行在线鉴权。
- 2.1.0 及以上版本，可直接调用 {getPlatformData2(props,newCreateMap)} 接口创建 Effects 对象时，使用 AppID 及 AppSign 鉴权，且无需关心鉴权逻辑，已在 SDK 内部实现。
</Warning>


## 概览

本文将介绍如何获取鉴权文件、以及在线鉴权的实现方案。

### 鉴权文件

鉴权文件是软件使用权的凭证，包含以下特征：

- 授权的时间
- 授权的平台
- 授权的 SDK 版本号
- 授权的功能特性


### 在线鉴权

在线鉴权，是指用户的客户端访问 ZegoEffects 服务端，申请鉴权文件，进行网络验证的方式。从客户的角度来看可以通过在线鉴权快速，安全的通过网络验证，相比离线鉴权更可控更高效。

在线鉴权只是获取鉴权文件 License，只有通过 SDK 鉴权校验的客户端，才可以使用 ZegoEffects SDK 和 AI 功能。

<Warning title="注意">

ZEGO 建议您在业务层上，定时拉取、更新在线鉴权的 License 数据，避免出现本地缓存 License 数据过期、导致校验不通过的问题。
</Warning>

## 鉴权实现原理

在线鉴权有两种方式，开发者可以通过自己的客户端，或自己的业务服务端访问 ZegoEffects 服务端，进行鉴权。

以下将介绍“向 ZegoEffects 服务端请求鉴权文件”的两种方式：`通过客户端发送请求`和`通过开发者服务端发送请求`，对比如下：

| 类别 | 通过客户端发送请求 | 通过开发者服务端发送请求 |
| --- | --- | --- |
| 实现步骤 | <ol><li>客户端访问 ZegoEffects SDK，获取授权信息。</li><li>ZegoEffects SDK 返回授权信息 AuthInfo 到客户端。</li><li>客户端通过 URL 携带 AppID 和 AuthInfo，向 ZegoEffects 服务端发送请求。</li><li>ZegoEffects 服务端返回鉴权文件 License 到客户端。</li><li>导入资源和模型文件。</li><li>客户端传入获取到的 License 文件，创建 Effetcs 对象。</li><li>启用 AI 功能，开始图像处理。</li></ol> | <ol><li>开发者服务端通过公共网关接口 URL，直接向 ZegoEffects 服务端发送请求。</li><li>ZegoEffects 服务端返回鉴权文件 License 到开发者服务端。</li><li>开发者服务端下发 License 文件到客户端。<b>（由开发者自行实现此业务功能）</b></li><li>导入资源和模型文件。</li><li>客户端传入获取到的 License 文件，创建 Effetcs 对象。</li><li>启用 AI 功能，开始图像处理。</li></ol> |
| 流程图 | <Frame width="512" height="auto">{getPlatformData2(props,flowchart1Map)}</Frame> | <Frame width="512" height="auto">{getPlatformData2(props,flowchart2Map)}</Frame> |
| 优势 | <ul><li>简单、容易接入。</li><li>开发者无需搭建自己的业务后台，也无需自行管理鉴权文件。</li></ul> | <ul><li>开发者自行搭建的业务后台，请求网络相对稳定；且由于服务器的位置相对稳定，命中 DNS 缓存的几率也会提高。</li><li>开发者可通过自己的客户端，自行设置鉴权能力，管理鉴权文件，灵活性较高。</li></ul> |

## 前提条件

开始实现鉴权之前，请在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”；并联系 ZEGO 技术支持，开通 ZegoEffects 相关套餐服务权限。

## 实现在线鉴权

### 1. 向 ZegoEffects 服务端请求鉴权文件

以下分别介绍向 ZegoEffects 服务端请求鉴权文件的两种方式（二选一即可）。

<Tabs>
<Tab title="通过客户端发送请求">
1. 客户端向 ZegoEffects SDK 申请授权。

    调用 {getPlatformData2(props,getAuthInfoMap)} 接口，传入申请到的 AppSign，获取授权信息；ZegoEffects SDK 会返回授权信息 AuthInfo 到客户端。

    :::if{props.platform="default|mac"}
    ```objc
    NSString* authInfo = [ZegoEffects getAuthInfo:appSign]; 
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    String encryptInfo = ZegoEffects.getAuthInfo(AppSign,context);
    ```
    :::
    :::if{props.platform="Windows"}
    ```c++
    char* authInfo;
    zego_effects_get_auth_info(&authInfo,appSign);   
    ```

2. 客户端向 ZegoEffects 服务端请求鉴权文件。

    客户端拿到 ZegoEffects SDK 返回的授权信息 AuthInfo 后，构造消息体，发送请求到 ZegoEffects 服务端，申请鉴权文件。消息体结构如下：

    - **URL：** `https://aieffects-api.zego.im?Action=DescribeEffectsLicense`
    - **请求方法：** GET
    - **内容格式：** JSON
    - **参数：**

        | 参数名 | 类型 | 是否必须 | 说明 |  
        | :---- | :---- | :----- | :------ |  
        | AppId | unsigned int | 是 | 鉴权的唯一标识，请联系 ZEGO 商务人员获取。|
        | AuthInfo | string | 是 | 加密数据，由 SDK 产生的设备相关标识，通过 {getPlatformData2(props,getAuthInfoMap)} 接口获得。 |

    - ***消息示例：***

        ```json
        curl -X GET https://aieffects-api.zego.im?Action=DescribeEffectsLicense&AppId=xxxxxxxx&AuthInfo=xxxxxxxx
        ```

</Tab>
<Tab title="通过开发者服务端发送请求">
开发者服务端通过公共网关接口，构造消息体，直接发送请求到 ZegoEffects 服务端，申请鉴权文件。消息体结构如下：

- **URL：**`https://aieffectscgi-api.zego.im?Action=CgiDescribeEffectsLicense`
- **请求方法：** GET
- **内容格式：** JSON
- **参数：**

    | 参数名 | 类型 | 是否必须 | 说明 |  
    | :---- | :---- | :----- | :------ |  
    | AppId | unsigned int | 是 | 鉴权的唯一标识，请联系 ZEGO 商务人员获取。|
    | Signature | string | 是 |  签名，签名的生成请参考 [服务端 API v2 - 调用方式\|_balnk](/ai-effects-windows-c/quick-starts/8985#5) 中的 “3 签名机制”。 |
    | SignatureNonce | string | 是 |  随机字符串。|
    | SignatureVersion | string | 是 | 签名版本号，默认值为 2.0。 | 
    | Timestamp | string | 是 | Unix 时间戳，单位为秒。最多允许 10 分钟的误差。|

- ***消息示例：***

    ```json
    curl -X GET https://aieffectscgi-api.zego.im?Action=CgiDescribeEffectsLicense&AppId=1&Signature=1302668869d55ab3f6114af4ba6e5580&SignatureNonce=3f15d0b95f6e480b&SignatureVersion=2.0&Timestamp=1635940599
    ```
</Tab>
</Tabs>

### 2. ZegoEffects 服务端返回鉴权文件 License

服务端返回的消息示例如下：

```json
{
    "Code": 0,
    "Message": <message>,
    "Data": {
        "License": <license>
    }
}
```
<Note title="说明">

- 如果请求获取鉴权文件成功，则返回字段 `License` 中携带信息即为鉴权文件的内容。
- 若请求失败，则返回字段 `Code` 会返回错误码，`Message` 为对应的错误信息。
</Note>

根据请求方式的不同，返回字段中的 `Code` 取值也不相同，具体解释如下：

<table>
  <tbody><tr>
    <th>参数名</th>
    <th>类型</th>
    <th colspan="2">说明</th>
  </tr>
  <tr>
    <td>Code</td>
    <td>unsigned int32</td>
    <td><b>通过客户端发送请求</b>时，ZegoEffects 服务端返回的错误码，取值如下：<ul><li>0：成功。</li><li>1：参数有误。</li><li>2：Token 有误。</li><li>3：证书无效，AppId 或者 Bundle ID 不正确。</li><li>4：服务内部问题。</li></ul></td>
    <td><b>通过开发者服务端发送请求</b>时，ZegoEffects 服务端返回的错误码，取值如下：<ul><li>0：成功。</li><li>910001：参数有误。</li><li>910002：证书无效。</li><li>910003：服务内部问题。</li><li>910004：授权信息有误。</li></ul></td>
  </tr>
  <tr>
    <td>Message</td>
    <td>string</td>
    <td>返回的提示信息，和 “Code” 的取值相对应。<ul><li>0：Success</li><li>1：Invalid argument</li><li>2：Invalid token</li><li>3：No valid license</li><li>4：Service unavailable</li></ul></td>
    <td>返回的提示信息，和 “Code” 的取值相对应。<ul><li>0：Success</li><li>910001：Invalid argument</li><li>910002：No valid license</li><li>910003：Service unavailable</li><li>910004：Auth error</li></ul></td>
  </tr>
  <tr>
    <td>Data</td>
    <td>object</td>
    <td colspan="2">“Code” 为 0 时，返回鉴权文件的内容。</td>
  </tr>
</tbody></table>


其中，返回字段 **Data** ：

| 参数名 | 类型 | 说明 |  
| :---- | :---- | :----- |
|License|string| 鉴权文件的内容。 |


### 3. 传入鉴权文件创建对象

将获取的鉴权文件设置到 SDK 中，以激活相关功能模块。

开发者需要从返回字段 “Data” 的 “License” 字段中获取鉴权文件内容，然后调用 {getPlatformData2(props,createMap)} 接口，并将鉴权文件传给 ZegoEffects SDK，创建 Effects 对象。

:::if{props.platform="undefined|mac"}
```objc
// 创建 Effects 对象前，请先调用 setResources 接口导入资源和模型
// 传入鉴权文件，创建 Effects 对象
NSString* license = @"xxxxxxxx";
ZegoEffects* effects = [ZegoEffects create:license];
```
:::
:::if{props.platform="Android"}
```java
// 创建 Effects 对象前，请先调用 setResources 接口导入资源和模型
// 传入鉴权文件，创建 Effects 对象
String license = "xxxxxxx";
ZegoEffects mEffects = ZegoEffects.create(license, applicationContext);
```
:::

<Warning title="注意">
在调用 {getPlatformData2(props,createMap)} 接口创建 Effects 对象之前，需要先调用 [setResources](https://doc-zh.zego.im/) 接口导入资源和模型。
</Warning>

## 相关文档

[客户端在线鉴权，通过 URL 地址访问到 ZegoEffects 服务端时，为什么有时会出现失败？](https://doc-zh.zego.im/faq/unable_Access_Effetcs)

<Content platform="Windows"/>