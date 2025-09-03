

## 跑通示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/miniprogram/ZIMExampleJavaScript.zip" target="_blank">点击获得完整代码。</Card>


<Note title="说明">

该下载地址中，含有`微信原生小程序`和`uni-app 框架`两种示例源码，请您注意区分使用。
</Note>

### 概览

本文介绍使用 [微信原生小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) 和 [uni-app 框架](https://uniapp.dcloud.io/)，如何快速跑通示例源码，体验即时通讯服务。

### 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- [HBuilder X 3.0.5](https://www.dcloud.io/hbuilderx.html) 或以上版本（**使用`uni-app 框架`开发时需要**）。
- 电脑设备安装了 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)。
- 设备已连接到网络。
- 微信小程序基础库版本及微信版本，请参考 [平台兼容](/zim-miniprogram/introduction/overview#平台兼容)。

<Warning title="注意">

如果使用真机预览，请依次点击小程序菜单栏 > 开发调试 > 打开调试，重启小程序来跳过域名校验。
</Warning>

### 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID 和 ServerSecret。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。

- 请在 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN) 上进行 [服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)。选择“小程序后台 > 开发 > 开发设置 > 服务器域名”菜单，按照协议分类，将以下`域名`地址填写到指定的 “request 合法域名” 或 “socket 合法域名” 或 “uploadFile 合法域名” 或 “downloadFile 合法域名” 中。

    <Note title="说明">

    若开发者需要在其他平台（如百度、支付宝或字节跳动）运行示例源码或开发上述平台的小程序，请在对应平台配置服务器域名。
    </Note>

<table>
  <tbody>
      <tr>
          <th>小程序服务器配置分类</th>
          <th>域名</th>
          <th>适用SDK版本</th>
          <th>描述</th>
      </tr>
      <tr>
          <td rowspan="20">socket 合法域名</td>
          <td><code>wss://webzim-sh2.zego.im</code></td>
          <td rowspan="2">1.2.0 ~ 2.1.5</td>
          <td rowspan="13">接入域名：ZEGO 服务器的 WebSocket 通信地址。</td>
      </tr>
      <tr>
          <td><code>wss://webzim-sh2-bak.zego.im</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.zego.im</code></td>
          <td>2.2.0 ~ 2.12.0</td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.coolbcloud.com</code></td>
          <td rowspan="10">2.13.0 及以上</td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-wss.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://accesshub-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://webzim-report.zego.im</code></td>
          <td>1.2.0 ~ 2.11.0</td>
          <td rowspan="7">数据上报：分析 SDK 数据。</td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.zego.im</code></td>
          <td rowspan="6">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>wss://weblogger-wss.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td rowspan="19">request 合法域名</td>
          <td><code>https://cloud-setting-api.zego.im</code></td>
          <td rowspan="2">1.2.0 ~ 2.1.5</td>
          <td rowspan="2">云控配置：动态修改 SDK 能力。</td>
      </tr>
      <tr>
          <td><code>https://cloud-setting-api.zegocloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://webzim-detaillog.zego.im</code></td>
          <td>1.2.0 ~ 2.11.0</td>
          <td rowspan="7">日志上报：排查故障，定位问题。</td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.zego.im</code></td>
          <td rowspan="6">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://zego-zim-smsh.oss-cn-shanghai.aliyuncs.com</code></td>
          <td rowspan="3">2.2.0 ~ 2.11.0</td>
          <td rowspan="10">文件媒体消息：文件媒体消息的 URL。</td>
      </tr>
      <tr>
          <td><code>https://zego-zim-zimsh.oss-cn-shanghai.aliyuncs.com</code></td>
      </tr>
      <tr>
          <td><code>https://zimfile-sh2.zego.im</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.zego.im</code></td>
          <td rowspan="7">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://zego-zim-smsh.oss-accelerate.aliyuncs.com</code></td>
      </tr>
      <tr>
          <td rowspan="16">uploadFile 合法域名</td>
          <td><code>https://webzim-detaillog.zego.im</code></td>
          <td>1.2.0 ~ 2.11.0</td>
          <td rowspan="7">日志上报：排查故障，定位问题。</td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.zego.im</code></td>
          <td rowspan="6">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://detaillog-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://zego-zim-smsh.oss-cn-shanghai.aliyuncs.com</code></td>
          <td rowspan="3">2.2.0 ~ 2.11.0</td>
          <td rowspan="9">文件媒体消息：文件媒体消息的 URL。</td>
      </tr>
      <tr>
          <td><code>https://zego-zim-zimsh.oss-cn-shanghai.aliyuncs.com</code></td>
      </tr>
      <tr>
          <td><code>https://zimfile-sh2.zego.im</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.zego.im</code></td>
          <td rowspan="6">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td rowspan="10">downloadFile 合法域名</td>
          <td><code>https://zego-zim-smsh.oss-cn-shanghai.aliyuncs.com</code></td>
          <td rowspan="3">2.2.0 ~ 2.11.0</td>
          <td rowspan="10">文件媒体消息：文件媒体消息的 URL。</td>
      </tr>
      <tr>
          <td><code>https://zego-zim-zimsh.oss-cn-shanghai.aliyuncs.com</code></td>
      </tr>
      <tr>
          <td><code>https://zimfile-sh2.zego.im</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.zego.im</code></td>
          <td rowspan="7">2.12.0 及以上</td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolbcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolccloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolgcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolhcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://access-zfpxy-global.coolzcloud.com</code></td>
      </tr>
      <tr>
          <td><code>https://zego-zim-smsh.oss-accelerate.aliyuncs.com</code></td>
      </tr>
  </tbody>
</table>


### 示例源码目录结构

- 下列结构为 `微信原生小程序` 开发的的源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径，请参考 [运行微信原生小程序示例源码](#运行微信原生小程序示例源码)。

    ```bash
    ├── README.md
    ├── miniprogram
    │   ├── app.ts
    │   ├── behavior
    │   ├── components
    │   ├── custom-tab-bar
    │   ├── pages
    │   ├── service
    │   │   └── ZIMService.ts
    │   └── utils
    │       └── util.ts
    ├── package.json
    ├── project.config.json
    ├── tsconfig.json
    └── typings
    ```

- 下列结构为 `uni-app 框架` 开发的源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径，请参考 [使用 uni-app 框架示例源码运行到微信小程序平台](#使用-uni-app-框架示例源码运行到微信小程序平台)。

    ```bash
    ├── App.vue
    ├── assets
    │   ├── js
    │   │   ├── zego-zim-miniprogram
    │   │   ├── zego-zim-web
    │   │   ├── utils.js
    ├── components
    ├── index.html
    ├── main.js
    ├── manifest.json
    ├── pages
    │   ├── action
    │   │   ├── createC2C.vue
    │   │   ├── createGroup.vue
    │   │   ├── createRoom.vue
    │   │   ├── joinGroup.vue
    │   │   └── joinRoom.vue
    │   ├── chat
    │   ├── group
    │   ├── home
    │   └── login
    ├── pages.json
    ├── static
    ├── store
    ├── uni.scss
    ```

### 运行微信原生小程序示例源码

1. 打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)，导入源码项目。

2. 打开 “miniprogram/utils” 文件夹下的 “util.ts” 文件，并使用本文 [前提条件](#前提条件) 已获取的 AppID 和 ServerSecret 正确填写，并保存。

    ```typescript
    export const appConfig = {
        appID: 0, // 填写申请的 AppID
        serverSecret: '', // 填写申请的 ServerSecret
    }; 
    ```

3. 保存成功后，打开终端，执行 `npm i` 命令，安装 npm 依赖包。

4. 点击微信开发者工具的工具栏，选择 “构建 npm”，等待编译完成即可运行。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/wx_npmbuild.png" /></Frame>

### 使用 uni-app 框架示例源码运行到微信小程序平台

1. 打开微信开发者工具，选择 “设置 > 安全设置”，打开服务端口。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/safe_setting.png" /></Frame>

2. 打开 HBuilderX，选择 “文件 > 导入 > 从本地目录导入”，导入示例源码文件。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/import_uni_project.png" /></Frame>

3. 打开 “assets/js” 文件夹下的 “config.js” 文件，并使用本文 [前提条件](#前提条件) 已获取的 AppID 和 ServerSecret 正确填写，并保存。

    ```typescript
    export const appConfig = {
        appID: 0, // 填写申请的 AppID
        serverSecret: '', // 填写申请的 ServerSecret
    }; 
    ```

4. 点击 HBuilderX 工具栏，选择 “运行 > 运行到小程序模拟器 > 运行设置”，填入“微信开发者工具路径”，并保存。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/run_config.png" /></Frame>

5. 点击 HBuilderX 工具栏，选择 “运行 > 运行到小程序模拟器 > 运行时是否压缩代码”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/pack_code.png" /></Frame>

6. 点击 HBuilderX 工具栏，选择 “运行 > 运行到小程序模拟器 > 微信开发者工具”，等待编译完成即可。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/run_uniapp.png" /></Frame>

### 使用 uni-app 框架示例源码运行到 ZIM SDK 支持的其他小程序平台（百度、支付宝、字节跳动）

下载对应平台的小程序开发者工具后，参考本文 [使用 uni-app 框架示例源码运行到微信小程序平台](#使用-uni-app-框架示例源码运行到微信小程序平台) 运行即可。

## 常见问题

请参考 [uni-app 常见问题](https://uniapp.dcloud.net.cn/faq.html#app%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)。
