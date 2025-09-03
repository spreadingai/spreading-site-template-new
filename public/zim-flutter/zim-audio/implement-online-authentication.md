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

export const initMap = {
  'Android': <a href="@init" target='_blank'>init</a>,
  'iOS': <a href="@initWithLicense" target='_blank'>initWithLicense</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/init.html" target='_blank'>init</a>,
}

# 在线鉴权

- - -

ZIM 语音组件的部分进阶功能需要鉴权文件 License 才能使用。ZEGO 建议您使用在线鉴权的方式实现获取和验证 License。

在线鉴权，是指通过开发者服务端访问 ZIM 服务端，申请鉴权文件，进行网络验证的方式。

在线鉴权只是获取鉴权文件 License，只有通过 SDK 鉴权校验的客户端，才可以使用 ZIMAudio SDK 的进阶功能功能。

<Warning title="注意">

ZEGO 建议您在业务层上，定时拉取、更新在线鉴权的 License 数据，避免出现本地缓存 License 数据过期、导致校验不通过的问题。
</Warning>

## 鉴权实现原理

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/onlien_auth.png" /></Frame>

1. 开发者服务端通过公共网关接口 URL，直接向 ZIM 服务端发送请求。ZIM 服务端返回鉴权文件 License 到开发者服务端。
2. 开发者服务端下发 License 文件到客户端。<strong>（由开发者自行实现此业务功能）</strong>
3. 客户端传入获取到的 License 文件，初始化 ZIMAudio SDK。
4. 启用 ZIMAudio 进阶功能，开始语音处理。

## 前提条件

开始实现鉴权之前，请在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZEGO 服务所需的 AppID 和 ServerSecret，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

## 实现流程

### 1 向 ZEGO 服务端请求鉴权文件

开发者服务端通过公共网关接口，构造消息体，直接发送请求到 ZEGO 服务端，申请鉴权文件。消息体结构请参考服务端 API - 获取鉴权信息文档的 [接口原型](/zim-server/zim-audio/obtain-a-license#接口原型)、[请求参数](/zim-server/zim-audio/obtain-a-license#请求参数) 和 [请求示例](/zim-server/zim-audio/obtain-a-license#请求示例)。

### 2 ZEGO 服务端返回鉴权文件 License

ZEGO 服务端返回的消息请参考服务端 API - 获取鉴权信息文档的 [响应参数](/zim-server/zim-audio/obtain-a-license#响应参数) 和 [响应示例](/zim-server/zim-audio/obtain-a-license#响应参数)。

### 3 传入鉴权文件创建对象

将获取的鉴权文件设置到 SDK 中，以激活相关功能模块。

开发者需要从返回字段 “Data” 的 “License” 字段中获取鉴权文件内容，然后调用 {getPlatformData(props,initMap)} 接口时传入鉴权文件，初始化 ZIMAudio SDK，

:::if{props.platform=undefined}

```java
// 传入鉴权文件，初始化 ZIMAudio SDK
String license = "";
ZIMAudio.getInstance().init(application, license);
```
:::
:::if{props.platform="Flutter"}
```dart
// 传入鉴权文件，初始化 ZIMAudio SDK
String license = '';
ZIMAudio.getInstance().init(license);
```
:::
:::if{props.platform="iOS"}
```objc
// 传入鉴权文件，初始化 ZIMAudio SDK
[[ZIMAudio sharedInstance] initWithLicense:@""];
```
:::
:::if{props.platform="RN"}
```typescript
// 传入鉴权文件，初始化 ZIMAudio SDK
const license = '';
ZIMAudio.getInstance().init(license);
```
:::

<Content platform="Flutter"/>