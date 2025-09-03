# 跑通示例源码

---



<Card title="示例源码" href="https://github.com/zegoim/zego-superboard-electron-sample" target="_blank">
GitHub
</Card>

<Warning title="注意">

- 该示例源码仅供开发者接入时参考，ZEGO 不负责示例源码的后续维护。
- 若开发者计划将该示例源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
</Warning>

## 准备环境
在跑通示例源码前，请确保开发环境满足以下要求：

- Electron 7.0.0 ～ 23.0.0 版本。
- 操作系统 Windows 7 以上 / macOS 10.13 及以上系统。
- 已安装 <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">Node.js</a>，推荐使用其官网首页展示的长期支持版。
    <Note title="说明">

    下载 Node.js 后，如需了解如何安装，请参考 <a href="https://www.runoob.com/nodejs/nodejs-install-setup.html" target="_blank" rel="noopener noreferrer">Node.js 安装配置</a>。
    </Note>
- 设备已经连接到 Internet。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。

## 示例源码项目结构

下面目录结构为示例源码的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
superboard
├─ README.md # 项目 README
├─ fileList.json # ZEGO 预置文件列表
├─ img # 项目用到的图片
│  ├─ custom-icon-active.png
│  ├─ custom-icon.png
│  ├─ login-bg.png
│  └─ logo.png
├─ index.html # 入口文件
├─ js # 项目用到的非第三方 UI 的所有 JavaScript
│  ├─ login # 登录模块，初始化、登录相关功能
│  │  ├─ init.js # 初始化相关功能
│  │  ├─ login.js # 登录相关功能
│  │  └─ utils.js # 登录模块相关更新 DOM 的方法、相关工具方法
│  └─ room # 房间模块，白板相关功能
│     ├─ addImage.js # 添加自定义图形、插入图片
│     ├─ cacheFile.js # 文件预加载
│     ├─ flipToPage.js # 白板翻页
│     ├─ other.js # 清空、撤销、重做、保存快照、清空当前页、清除选中、设置渲染延时
│     ├─ reloadView.js # 重新加载白板 View
│     ├─ setBackgroundImage.js # 设置背景图
│     ├─ setOperationMode.js # 白板操作模式
│     ├─ setOther.js # 笔锋、画笔粗细、画笔颜色、文本大小、文本粗体、文本斜体
│     ├─ setScaleFactor.js # 白板缩放功能
│     ├─ setToolType.js # 设置白板工具
│     ├─ uploadFile.js # 上传静态、动态文件
│     ├─ uploadH5File.js # 上传 H5 功能
│     ├─ utils.js # 房间模块，相关更新 DOM 的方法、相关工具方法
│     └─ whiteboard.js # 创建、销毁、切换、查询白板列表相关功能
├─ lib # 第三方 UI 库所需的 CSS、JavaScript 文件、内置的第三方字体文件
├─ main.css # 项目用到的非第三方 UI 的所有 CSS 样式
├─ key_center.js # 项目用到的账号信息，您需要在此处输入 AppID 和 AppSign
└─ sdk # 项目引用的 ZEGO SDK
   ├─ ZegoSuperBoardWeb-2.0.0.js # ZEGO  超级白板 SDK
   └─ ZegoExpressWebRTC-2.9.1.js # ZEGO 实时音视频 SDK
```

## 运行示例源码

1. 下载并解压示例源码 zip 包，获得示例源码文件夹。

2. 下载的示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，需要修改 “superboard/key_center.js” 文件。请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/electron/Info_required.jpeg" /></Frame>

3. 进入文件夹，打开 Terminal，执行以下任意指令以安装依赖。

<CodeGroup>
```bash title="npm"
npm install
```

```bash title="yarn"
yarn install
```
</CodeGroup>

4.  在 Terminal 中执行以下任意指令以运行示例源码。

<CodeGroup>
```bash title="npm"
npm run start
```

```bash title="yarn"
yarn start
```
</CodeGroup>

5. 运行成功后将会自动弹出登录窗口，请在此窗口输入自定义的 room ID、userName、userID，登录应用，体验超级白板功能。

    <Warning title="注意">

    - room ID：最大长度为 128 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“\<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
    - userName：最大长度不超过 256 字节的 utf8 编码字符串。请勿在此字段填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
    - userID：最大长度为 64 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“\<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
    </Warning>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/electron/login.jpeg" /></Frame>

6. 如需停止体验，请在 Terminal 中执行 `Control/Ctrl+C` 命令停止运行。
