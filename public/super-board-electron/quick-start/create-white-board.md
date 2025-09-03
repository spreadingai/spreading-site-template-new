# 创建超级白板
- - -

<Note title="说明">

本文档适用于开发以下平台的应用：Windows、macOS。
</Note>

## 概念解释

- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard）的 SDK。
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。

    <Note title="说明">

    超级白板 SDK 的压缩包中已经包含 ZegoExpress-Video SDK，无需单独下载。
    </Note>

- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardView#switch-super-board-sub-view) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" /></Frame>

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。

## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：

- Electron 7.0.0 ～ 23.0.0 版本。
- 操作系统 Windows 7 以上 / macOS 10.13 及以上系统。
- 已安装 <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">Node.js</a>，推荐使用其官网首页展示的长期支持版。
    <Note title="说明">

    下载 Node.js 后，如需了解如何安装，请参考 <a href="https://www.runoob.com/nodejs/nodejs-install-setup.html" target="_blank" rel="noopener noreferrer">Node.js 安装配置</a>。
    </Note>
- 设备已经连接到 Internet。

## （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
请参考 [Electron 文档 - 快速启动指南](https://github.com/electron/electron-quick-start) 创建一个 Electron 项目。
</Accordion>

<a id="minimal_sample"></a>

## 最简代码

ZEGO 提供了一个创建超级白板的最简示例代码，可作为开发中的参考。

运行本最简代码，您需要：
1. 在 Electron 项目中创建一个 index.html 文件和 package.json 文件，并将以下代码拷贝到对应文件中。

  <Accordion title="创建超级白板 - index.html" defaultOpen="false">
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <title>SuperBoard Demo</title>
        <script>
        // electron 平台兼容需要
        if (typeof module === "object") {
            window.jQuery = window.$ = module.exports;
        }
        </script>
        <style>
        // 白板挂载容器
        #main-whiteboard {
            width: 500px;
            height: 500px;
            border: 1px solid #ccc;
        }
        </style>
    </head>

    <body>
        <div>是否登录：<span id="login_state">未登录</span></div>
        <div>
        <button onclick="createWhiteboardView()">创建纯白板</button>
        <button onclick="createFileView()">创建文件白板</button>
        <button onclick="destroySuperBoardSubView()">销毁白板</button>
        </div>
        <!-- Whiteboard Drawing Area -->
        <div id="main-whiteboard"></div>
    </body>
    <script>
        // 传入 App 所需信息
        var zegoConfig = {
            appID: YOUR APPID, // 在 ZEGO 控制台（https://console.zego.im/）创建项目后即可获得。
                               // 此 AppID 需要开通文件共享权限，开通步骤请参考控制台文档 [服务配置 - 文件共享](https://doc-zh.zego.im/article/14338)，或联系 ZEGO 技术支持开通。
            appSign: "YOUR APPSIGN", // 与 AppID 搭配的 AppSign
            userID: "test", // 最大长度为 64 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
            userName: "YOUR USERNAME", // 最大长度不超过 256 字节的 utf8 编码字符串。请勿在此字段填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
            roomID: "YOUR ROOMID", // 最大长度为 128 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
            sdkPath: {
                // 所需 SDK 在项目的路径
                express:
                "./node_modules/zego-superboard-electron/zego-express-engine-electron/ZegoExpressEngine.js",
                superboard: "./node_modules/zego-superboard-electron/index.js",
            },
            logDirs: {
                win32: "c:/zegowblog/",
                darwin: process.env.HOME + "/zegowblog/",
            },
        };

        var logDir = zegoConfig.logDirs[require("os").platform()];
        var parentDomID = "main-whiteboard";

        // 引入相关 SDK
        // 引入 ZEGO Express SDK
        var ZegoExpressEngine = window.require(zegoConfig.sdkPath.express);
        // 引入 超级白板 SDK
        var ZegoSuperBoard = window.require(zegoConfig.sdkPath.superboard);

        var zegoSuperBoardManager;
        var zegoSuperBoard;
        var isLogin = false;
        var seq = 1;

        // 初始化 ZEGO Express SDK
        ZegoExpressEngine.createEngine({
            appID: zegoConfig.appID,
            appSign: zegoConfig.appSign,
            scenario: 0,
        });

        // 获取超级白板实例
        zegoSuperBoardManager = new ZegoSuperBoard();
        zegoSuperBoard = zegoSuperBoardManager.getInstance();

        // 初始化超级白板 SDK
        zegoSuperBoard.init({
            parentDomID,
            userID: zegoConfig.userID,
            appID: zegoConfig.appID,
            appSign: getAppSignArray(zegoConfig.appSign),
            dataFolder: logDir,
            cacheFolder: logDir,
            logFolder: logDir,
        });

        // 监听 ZEGO Express SDK 的房间状态回调
        // 只有在用户登录 Express 房间成功后，才能够调用超级白板 API
        ZegoExpressEngine.on("onRoomStateUpdate", async (res) => {
            if (res.state === 2 && res.errorCode == 0) {
                isLogin = true;
                document.getElementById("login_state").innerText = "已登录";
                // 多数用于后进房/刷新后，同步渲染当前房间正在使用的白板场景
                attachCurrentView()
            } else {
                isLogin = false;
            }
        });

        // 登录 Express 房间
        ZegoExpressEngine.loginRoom(
            zegoConfig.roomID,
            {
                userID: zegoConfig.userID,
                userName: zegoConfig.userName,
            },
            {
                maxMemberCount: 10,
                isUserStatusNotify: true,
            }
        );

        //转换 AppSign 格式为数组
        function getAppSignArray(str) {
            var arr = [];
            for (var i = 0; i < str.length; ) {
                arr.push(`0x${str[i]}${str[i + 1]}`);
                i += 2;
            }
        return arr;
        }

        // 创建纯白板
        async function createWhiteboardView() {
        if (!isLogin) {
            alert("房间未登录");
        }

        const model = await zegoSuperBoard.createWhiteboardView({
            name: zegoConfig.userName + " whiteboard " + seq++, // 白板名称
            perPageWidth: 1600, // 白板宽度
            perPageHeight: 900, // 白板高度
            pageCount: 5, // 白板页数
        });
        }

        // 创建文件白板
        async function createFileView() {
            if (!isLogin) {
                alert("房间未登录");
            }

            const model = await zegoSuperBoard.createFileView({
                // 创建文件白板前，需要通过 [uploadFile] 获取 fileID，此处为了演示，提供了一个可用的 fileID
                fileID: "8uY9pK9UfbE6WQjf",
             });
        }

        async function destroySuperBoardSubView() {
            var superBoardView = zegoSuperBoard.getSuperBoardView();
            if (superBoardView) {
                 // 获取当前白板的 uniqueID
                 current = superBoardView.getCurrentSuperBoardSubView();
                 // 销毁白板
                 await zegoSuperBoard.destroySuperBoardSubView(
                      current.getModel().uniqueID
                 );
            }
        }
       async function attachCurrentView() {
          // 获取 SuperBoardSubViewList
          const superBoardSubViewList = await zegoSuperBoard.querySuperBoardSubViewList();

          // 列表数量小于1，代表当前房间无白板
          if(superBoardSubViewList.length < 1) return;

          // 获取 SuperBoardView
          const superBoardView = zegoSuperBoard.getSuperBoardView();

          // 获取当前 SuperBoardSubView
          const zegoSuperBoardSubView = superBoardView.getCurrentSuperBoardSubView();

          // 获取 SuperBoardSubView 对应 model
          const model = zegoSuperBoardSubView.getModel();

          // 获取当前需要挂载白板的 uniqueID
          const uniqueID = model.uniqueID;

          // 判断文件类型，如果是 Excel 白板，需要先获取到 sheetIndex
          let sheetIndex;
          const fileType = model.fileType;
          if (fileType === 4) {
              // Excel 白板
              const sheetName = zegoSuperBoardSubView.getCurrentSheetName();
              // 获取当前 Excel 对应的 Sheet 列表
              const zegoExcelSheetNameList = zegoSuperBoardSubView.getExcelSheetNameList();
              // 通过 sheetName 从 zegoExcelSheetNameList 中获取到对应的 sheetIndex
              sheetIndex = zegoExcelSheetNameList.findIndex(function (element, index) {
                  return element === sheetName;
               });
            }

           // 挂载当前白板
            const result = await superBoardView.switchSuperBoardSubView(uniqueID, sheetIndex);
            }
    </script>
    </html>
    ```

  </Accordion>

  <Accordion title="安装依赖 - package.json" defaultOpen="false">
  ```json
    {
        "name": "zego-superboard-electron",
        "version": "1.0.0",
        "description": "A minimal Electron application",
        "main": "./main.js", // 本文件在创建 Electron 项目后自动生成
        "author": "zego frontend",
        "scripts": {
            "start": "electron ."
        },
        "dependencies": {
            "electron-localstorage": "^1.0.5",
            "zego-superboard-electron": "^2.0.0"
        },
        "devDependencies": {
            "electron": "13.6.9",
            "electron-builder": "23.0.0"
        },
        "electronDownload": {
            "mirror": "https://npm.taobao.org/mirrors/electron/"
        }
    }
    ```

  </Accordion>

2. 在终端进入您的项目，输入以下指令，安装依赖。

    ```bash
    npm i
    ```
3. 输入以下指令，运行代码。

    ```bash
    npm run start
    ```

## 集成 SDK

### 1 安装 SDK

在项目中使用以下 npm 命令，安装 SDK 包。

``` bash
npm i zego-superboard-electron
```

<Note title="说明">

- 如果在 macOS 系统中执行 npm 命令失败，提示 “permission denied”，请在 npm 命令前加上 `sudo` 重新执行即可。
- 如果您的项目为全新项目，没有配置过 package.json，可参考本文档 [最简代码](#最简代码) 相关内容进行配置。
</Note>

### 2 配置基本信息

实现超级白板之前，您需要引入 ZEGO Express SDK 和超级白板 SDK，传入已开通文件共享服务的 AppID 和 AppSign，用户 ID 和用户名称，以及房间 ID；

```js
var zegoConfig = {
    appID: YOUR APPID, // 在 ZEGO 控制台（https://console.zego.im/）创建项目后即可获得。
    // 此 AppID 需要开通文件共享权限，开通步骤请参考控制台文档 [服务配置 - 文件共享](https://doc-zh.zego.im/article/14338)，或联系 ZEGO 技术支持开通。
    appSign: "YOUR APPSIGN", // 与 AppID 搭配的 AppSign
    userID: "test", // 最大长度为 64 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
    userName: "YOUR USERNAME", // 最大长度不超过 256 字节的 utf8 编码字符串。请勿在此字段填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
    roomID: "YOUR ROOMID", // 最大长度为 128 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
    sdkPath: {
        // 所需 SDK 在项目的路径
        express:
        "./node_modules/zego-superboard-electron/zego-express-engine-electron/ZegoExpressEngine.js",
        superboard: "./node_modules/zego-superboard-electron/index.js",
    },
    logDirs: {
      win32: "c:/zegowblog/",
      darwin: process.env.HOME + "/zegowblog/",
    },
};

var logDir = zegoConfig.logDirs[require("os").platform()];
var parentDomID = "main-whiteboard";
// 引入相关 SDK
// 音视频功能
var ZegoExpressEngine = window.require(zegoConfig.sdkPath.express);
// 超级白板功能
var ZegoSuperBoard = window.require(zegoConfig.sdkPath.superboard);
```

## 实现超级白板

### 1 初始化 SDK

实现超级白板，需要先初始化两个 SDK，即 ZEGO Express SDK 和超级白板 SDK。

#### 初始化 ZEGO Express SDK

调用 ZEGO Express SDK 接口 [createEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#create-engine) 初始化 SDK。

```javascript
// 初始化 ZegoExpress-Video SDK
ZegoExpressEngine.createEngine({
    appID: zegoConfig.appID,
    appSign: zegoConfig.appSign,
    scenario: 0,
});
```

#### 初始化 ZegoSuperBoard SDK

1. 在 html 文件定义一个挂载白板的容器。

    ```html
    <!-- 需要挂载的父容器 -->
    <div id="parentDomID" style="width:500px;height:500px"></div>
    ```

    <Warning title="注意">

    需要挂载的父容器的宽高物理像素必须大于 0，否则渲染白板会失败。
    </Warning>

2. 使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager) 的 [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#get-instance) 方法获取 ZegoSuperBoard 实例。

    ```javascript
    // 获取超级白板实例
    zegoSuperBoardManager = new ZegoSuperBoard();
    zegoSuperBoard = zegoSuperBoardManager.getInstance();
    ```

3. 使用 ZegoSuperBoard 实例的 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#init) 方法初始化 ZegoSuperBoard SDK。

    ```javascript
    // 初始化超级白板 SDK
    zegoSuperBoard.init({
        parentDomID,
        userID: zegoConfig.userID,
        appID: zegoConfig.appID,
        appSign: getAppSignArray(zegoConfig.appSign),
        dataFolder: logDir,
        cacheFolder: logDir,
        logFolder: logDir,
    });
    ```

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。

<Warning title="注意">

SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。

</Warning>

[on](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#on): 注册回调事件，通过 event 指定监听事件名。

```javascript
// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
// 监听错误回调，SDK 内部错误均通过此回调抛出，除了直接在接口中直接返回的错误外
    zegoSuperBoard.on('error', function(errorData) {
        // 错误码，错误提示语
        console.log(errorData.code, errorData.message)
    });

    // 监听白板翻页、滚动
    zegoSuperBoard.on('superBoardSubViewScrollChanged', function(uniqueID, page, step) {

    });
    // 监听远端白板缩放
    zegoSuperBoard.on('superBoardSubViewScaleChanged', function(uniqueID, scale) {

    });

    // 监听远端新增白板
    zegoSuperBoard.on('remoteSuperBoardSubViewAdded', function(uniqueID) {

    });

    // 监听远端销毁白板
    zegoSuperBoard.on('remoteSuperBoardSubViewRemoved', function(uniqueID) {

    });

    // 监听远端切换白板
    zegoSuperBoard.on('remoteSuperBoardSubViewSwitched', function(uniqueID) {

    });

    // 监听远端切换 Excel Sheet
    zegoSuperBoard.on('remoteSuperBoardSubViewExcelSwitched', function(uniqueID, sheetIndex) {

    });

    // 监听远端白板权限变更
    zegoSuperBoard.on('remoteSuperBoardAuthChanged', function(data) {
    });

    // 监听远端白板图元权限变更
    zegoSuperBoard.on('remoteSuperBoardGraphicAuthChanged', function(data) {

    });
```

### 3 登录房间

初始化 ZegoExpress-Video SDK 和 ZegoSuperBoard SDK 成功之后，调用 ZEGO Express SDK 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口，登录 Express 房间，推荐在初始化成功之后调用。

```javascript
ZegoExpressEngine.loginRoom(
    zegoConfig.roomID,
    {
        userID: zegoConfig.userID,
        userName: zegoConfig.userName,
    },
    {
        maxMemberCount: 10,
        isUserStatusNotify: true,
    }
);
```


### 4 创建白板

登录房间成功（通过 Express 回调接口 [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#on-room-state-update) 知道房间状态为连接成功）后，即可创建白板。

<a id="fileWhiteboard"></a>
超级白板 SDK 支持创建纯白板和文件白板。

- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制，调用 [createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#create-whiteboard-view) 接口即可创建。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求，调用 [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#create-file-view) 接口即可创建。

    <Warning title="注意">

    1. 创建白板完成后，超级白板 SDK 会返回 [ZegoSuperBoardSubViewModel](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoSuperBoardSubViewModel)，请保存其中的 [uniqueID](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoSuperBoardSubViewModel#unique-id)，以便后续用于白板切换或销毁白板。
    2. 创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-electron/basic-func/file-manage) 进行上传。
    </Warning>

<CodeGroup>
 ```typescript title="创建纯白板"
  // 上一步的登录房间成功后才可创建白板
  const model = zegoSuperBoard.createWhiteboardView({
      name: zegoConfig.userName + " whiteboard ",
      perPageWidth: 1600,
      perPageHeight: 900,
      pageCount: 5,
  });
  ```

  ```typescript title="创建文件白板"
  // 上一步的登录房间成功，返回 true 后才可创建白板
  const model = await zegoSuperBoard.createFileView({
      fileID // 文件的 fileID，在上传文件成功后返回的唯一文件标识
  });
  ```
</CodeGroup>

<Warning title="注意">

- 一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
- 请通过 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 获取房间内当前的白板数量。
</Warning>

### 5 挂载当前白板

如果用户进房时，房间已经存在白板，请主动调用 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 接口通知 ZegoSuperBoard SDK 当前白板容器已经存在，并通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardView#switch-super-board-sub-view) 接口挂载当前白板到父容器（parentDomID）上，以便展示白板。

```typescript
// 获取 SuperBoardSubViewList
const superBoardSubViewList = await zegoSuperBoard.querySuperBoardSubViewList();

// 获取 SuperBoardView
const superBoardView = zegoSuperBoard.getSuperBoardView();

// 获取当前 SuperBoardSubView
const zegoSuperBoardSubView = superBoardView.getCurrentSuperBoardSubView()

// 获取 SuperBoardSubView 对应 model
const model = zegoSuperBoardSubView.getModel();

// 获取当前需要挂载白板的 uniqueID
const uniqueID = model.uniqueID;

// 判断文件类型，如果是 Excel 白板，需要先获取到 sheetIndex
let sheetIndex;
const fileType = model.fileType;
if (fileType === 4) {
    // Excel 白板
    const sheetName = zegoSuperBoardSubView.getCurrentSheetName();
    // 获取当前 Excel 对应的 Sheet 列表
    const zegoExcelSheetNameList = zegoSuperBoardSubView.getExcelSheetNameList();
    // 通过 sheetName 从 zegoExcelSheetNameList 中获取到对应的 sheetIndex
    sheetIndex = zegoExcelSheetNameList.findIndex(function(element, index) {
        return element === sheetName;
    });
}

// 挂载当前白板
const result = await superBoardView.switchSuperBoardSubView(uniqueID, sheetIndex);
```

### 6 销毁白板

如需销毁某个白板，调用 [destroySuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#destroy-super-board-sub-view) 接口，传入该白板的 [uniqueID](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoSuperBoardSubViewModel#unique-id)，即可销毁。

```typescript
// 销毁后 SDK 内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个
const result = await zegoSuperBoard.destroySuperBoardSubView(uniqueID)
```

### 7 离开房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine) 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 接口退出房间。

```js
ZegoExpressEngine.logoutRoom(roomID);
```

### 8 反初始化 SDK

#### 反初始化 ZegoSuperBoard SDK

调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager) 的 [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#un-init)，反初始化 ZegoSuperBoard SDK。

```js
zegoSuperBoard.unInit();
```

#### 反初始化 ZEGO Express Video SDK

如果无需再使用 ZEGO Express Video SDK 的能力，即可调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine) 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```js
ZegoExpressEngine.destroyEngine(null);
```

## 测试你的 App

运行上述项目的多个实例，登录同一房间 ID。用鼠标在任一窗口的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个窗口的 ZegoSuperBoardView 上。

## 了解更多

到此为止，您已成功构建一个简单的超级白板应用。接下来，您可通过以下文档，进一步体验超级白板功能：

- [白板绘制](/super-board-electron/basic-func/sketch)
- [白板翻页](/super-board-electron/basic-func/scale-and-flip)
- [白板缩放](/super-board-electron/basic-func/withe-board-scale)
- [白板切换](/super-board-electron/basic-func/switch)
- [获取白板列表](/super-board-electron/basic-func/white-board-list)
- [共享文件管理](/super-board-electron/basic-func/file-manage)