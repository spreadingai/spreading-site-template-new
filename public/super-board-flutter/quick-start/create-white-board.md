# 创建超级白板
- - -

<Note title="说明">

- 本文档适用于开发以下平台的应用：iOS、Android。
- 超级白板 SDK 不支持在 Android 8.0 设备上加载动态 PPT 文件。
</Note>

## 概念解释

- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard）的 SDK。
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。
- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/switchSuperBoardSubView.html) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" /></Frame>

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 文件共享功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考控制台文档 [服务配置 - 文件共享](https://doc-zh.zego.im/article/14338)），或联系 ZEGO 技术支持开通。

## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：

- [Flutter](https://flutter.dev/docs/get-started/install) 版本需介乎 1.10.0 与 3.13.7 之间（包括这两个版本）。
- 根据项目的运行设备，相关技术要求如下：

<Tabs>
<Tab title=" Android">
  - Android 5.0 或以上版本且支持音视频的 Android 设备。
  - Android Studio 3.0 或以上版本。
  - Android SDK 29、Android SDK Build-Tools 29.0.2、Android SDK Platform-Tools 29.x.x 或以上版本
  - Android 设备已经连接到 Internet。
</Tab>
<Tab title="iOS">
  - Xcode 12 或以上版本
  - iOS 9.0 或以上版本，且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
  - iOS 设备已经连接到 Internet。
  - 确保已经安装 CocoaPods。安装 CocoaPods 的方法以及常见问题可参考 [CocoaPods 常见问题](https://doc-zh.zego.im/article/13860)。
</Tab>
</Tabs>

---

请配置开发环境如下：

- Android Studio：“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，并在插件中配置已经下载好的 Flutter 的 SDK 路径。
- Visual Studio Code: 在应用商店中搜索 “Flutter” 扩展并下载。
以上任一开发环境配置好 Flutter 环境后，在终端执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项。


## （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
请参考 [Flutter 文档 - Get Started](https://flutter.dev/docs/get-started/test-drive#create-app) 创建一个 Flutter 项目。
</Accordion>

## 集成 SDK

<a id="minimal_sample"></a>

1. 在 Flutter 项目中，打开“pubspec.yaml” 文件，以“pub”形式添加“zego_superboard”和“zego_express_engine”依赖。

    ```yaml
    ...
    dependencies:
        zego_superboard: 2.5.0+7 # 此处版本号仅为示例，如需了解其他可集成版本，请查看 zego_superboard 的 version 信息（https://pub.dev/packages/zego_superboard/versions）
        zego_express_engine: 3.10.3-whiteboard
    ...
    ```

2. 添加完成并保存文件后，在终端执行 `flutter pub get`。
3. 引入头文件

    在您的项目中，引入 zego_superboard SDK 和 zego_express_engine SDK 头文件。

    ```dart
    import 'package:zego_superboard/zego_superboard.dart';
    import 'package:zego_express_engine/zego_express_engine.dart';
    ```
4. 配置项目

<Tabs>
<Tab title="Android">
1. 导入 Android SDK 库
    从 [跑通示例源码](/super-board-flutter/quick-start/run-demo) 获取并解压示例源码，得到 “superboard_view_flutter” 文件夹。
    打开“superboard_view_flutter” 文件夹，访问 “/android/libs” 文件夹，将文件夹中的所有 .aar 文件拷贝至 “您的项目/android/app/libs” 文件夹。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/getAndroidSDK.png" /></Frame>
2. 设置权限
    添加权限声明，打开 "/android/app/src/main/AndroidManifest.xml" 文件，添加如下内容：

  ```xml
  <!-- SDK 必须使用的权限 -->
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  ```

  如图所示：

  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/userPermissions.jpeg" /></Frame>

  权限说明如下：

  |     权限     |     必要性               | 权限说明             | 需要理由                                                     |
  | :------- | ---------------------- | -------------------- | ------------------------------------------------------------ |
  | INTERNET |       必要权限         | 访问网络权限         | SDK 基本功能都需在联网的情况下才可以使用。                      |
  | ACCESS_WIFI_STATE |   必要权限    | 获取当前 WIFI 状态权限 | SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。 |
  | ACCESS_NETWORK_STATE |  必要权限  | 获取当前网络状态权限 | SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。 |
  | WRITE_EXTERNAL_STORAGE | 必要权限 | 内置 SD 卡写权限        | 若需要使用媒体播放器或音效播放器加载 Android 外部存储内的媒体资源文件，则需要申请此权限，否则 SDK 无法加载资源。                   |
  | READ_EXTERNAL_STORAGE |  必要权限 | 内置 SD 卡读权限        | SDK 会将日志和相关配置文件保存在内置 SD 卡内。                   |

3. 添加 SDK 引用
    打开 “您的项目/android/app/build.gradle” 文件，添加以下依赖项。
    ```kotlin
    dependencies {
        implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
        testImplementation 'org.jetbrains.kotlin:kotlin-test'
        testImplementation 'org.mockito:mockito-core:5.0.0'
        implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
    }
    ```
4. 修改 minSdkVersion
    打开 “您的项目/android/app/build.gradle” 文件，将 minSdkVersion 修改为 21。
    ```kotlin
    defaultConfig {
        minSdkVersion 21
    }
    ```

</Tab>
<Tab title="iOS">
使用 Xcode 打开 "您的项目/iOS/Runner.xcworkspace"，在界面单击点开 "Podfile"，输入以下代码：
```objc
install! 'cocoapods', :disable_input_output_paths => true
// 您可以在此处修改 iOS 的版本。
// 注意：iOS 版本不得低于 11.0。
platform :ios, '11.0'
use_frameworks!  #please use this way to import library
inhibit_all_warnings!
```
</Tab>
</Tabs>


## 实现超级白板

### 最简代码

ZEGO 提供了一个创建超级白板的最简示例代码，可作为开发中的参考。

运行本最简代码，您需要：

1. 创建一个“zego_superboard_page.dart”文件，并将以下代码拷贝到对应文件中。

    ```dart
    import 'package:flutter/foundation.dart';
    import 'package:flutter/material.dart';
    import 'package:zego_superboard/zego_superboard.dart';
    import 'package:zego_superboard/zego_superboard_defines.dart';
    import 'package:zego_express_engine/zego_express_engine.dart';
    import 'package:zego_superboard/zego_superboard_event_handler.dart';

    class ZegoSuperboardPage extends StatefulWidget {
      const ZegoSuperboardPage({super.key});

      @override
      State<ZegoSuperboardPage> createState() => _ZegoSuperboardPageState();
    }

    class _ZegoSuperboardPageState extends State<ZegoSuperboardPage> {
      Widget? _previewViewWidget;
      late int currentViewID = -1;
      String userID = DateTime.now().millisecondsSinceEpoch.toString();
      String userName = "zego";
      String roomID = "567";
      int kAppID = ;  // 您的 AppID
      String kAppSign = "";  // 您的 AppSign

      ZegoSuperBoardManagerCreateResult? result;
      @override
      void initState() {
        super.initState();
        _initExpressSDK();
        _registerEventHandler();
      }

      /// 初始化RTC
      void _initExpressSDK() async {
        ZegoEngineProfile profile = ZegoEngineProfile(kAppID, ZegoScenario.Default,
            enablePlatformView: false, appSign: kAppSign);
        await ZegoExpressEngine.createEngineWithProfile(profile);
        _initSuperBoardSDK();
      }

      /// 初始化超级白板
      void _initSuperBoardSDK() async {
        ZegoSuperBoardInitConfig boardInitConfig =
            ZegoSuperBoardInitConfig(kAppID, kAppSign, userID: userID);
        //开启文件alpha环境
        ZegoSuperBoardManager.instance
            .setCustomizedConfig(key: 'set_alpha_env', value: 'true');
        ZegoSuperBoardError boardError =
            await ZegoSuperBoardManager.instance.initWithConfig(boardInitConfig);
        _createCanvasView();
        if (boardError.errorCode == 0) {
          print('超级白板初始化成功');
        } else {
          print('超级白板初始化失败');
        }
      }

      void _createCanvasView() async {
        await ZegoSuperBoardManager.instance.createCanvasView((viewID) {
          currentViewID = viewID;
        }).then((widget) {
          setState(() {
            _previewViewWidget = widget;
          });
        });
      }

      /// 注册监听
      void _registerEventHandler() {
        ZegoSuperBoardEventHandler.onError = ((errorCodde) {});

        ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewAdded =
            ((subViewModel) {
          if (kDebugMode) {
            print('[Flutter][onRemoteSuperBoardSubViewAdded]:$subViewModel');
          }
        });

        ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewRemoved =
            ((subViewModel) async {
          if (kDebugMode) {
            print('[Flutter][onRemoteSuperBoardSubViewRemoved]:$subViewModel');
          }
        });

        ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewSwitched = ((uniqueID) {
          if (kDebugMode) {
            print('[Flutter][onRemoteSuperBoardSubViewSwitched]:$uniqueID');
          }
        });

        ZegoSuperBoardEventHandler.onRemoteSuperBoardAuthChanged = ((authInfo) {
          if (kDebugMode) {
            print('[Flutter][onRemoteSuperBoardAuthChanged]:$authInfo');
          }
        });

        ZegoSuperBoardEventHandler.onRemoteSuperBoardGraphicAuthChanged =
            ((authInfo) {
          if (kDebugMode) {
            print('[Flutter][onRemoteSuperBoardGraphicAuthChanged]:$authInfo');
          }
        });

        ZegoSuperBoardEventHandler.onSuperBoardSubViewScrollChanged =
            ((uniqueID, page, pageCount) {
          if (kDebugMode) {
            print(
                '[Flutter][onRemoteSuperBoardGraphicAuthChanged] uniqueID:$uniqueID, uniqueID:$page');
          }
        });
        ZegoSuperBoardEventHandler.onSuperBoardSubViewSizeChanged =
            ((uniqueID, size) {
          if (kDebugMode) {
            print(
                '[Flutter][onSuperBoardSubViewSizeChanged] uniqueID:$uniqueID, size:$size');
          }
        });

        ZegoSuperBoardEventHandler.onStepChange = (() async {
          if (kDebugMode) {
            print('[Flutter][onStepChange]');
          }
        });

        ZegoSuperBoardEventHandler.uploadFile = ((info) async {
          if (kDebugMode) {
            print('[Flutter][uploadFile] info:$info');
          }
          if (info['state'] == ZegoSuperBoardUploadFileState.upload.value) {
            if (kDebugMode) {
              print(
                  '[Flutter][uploadFile] upload_percent:${info['upload_percent']}');
            }
          } else {
            Map? infoMap = info['infoMap'] as Map;
          }
        });

        ZegoSuperBoardEventHandler.uploadH5File = ((info) async {
          if (kDebugMode) {
            print('[Flutter][uploadH5File] info:$info');
          }
          if (info['state'] == ZegoSuperBoardUploadFileState.upload.value) {
            if (kDebugMode) {
              print(
                  '[Flutter][uploadH5File] upload_percent:${info['upload_percent']}');
            }
          } else {
            Map? infoMap = info['infoMap'] as Map;
          }
        });

        ZegoSuperBoardEventHandler.cacheFile = ((info) {
          if (kDebugMode) {
            print('[Flutter][cacheFile] info:$info');
          }
          if (info['state'] == ZegoSuperBoardCacheFileState.caching.value) {}
        });
      }

      @override
      Widget build(BuildContext context) {
        return SafeArea(
            child: Container(
                color: Colors.white,
                child: Column(
                  children: [
                    Container(
                      color: Colors.grey.withOpacity(0.1),
                      width: double.infinity,
                      height: 248,
                      child: _previewViewWidget ?? Container(),
                    ),
                    const SizedBox(height: 10),
                    Expanded(
                      child: Column(
                        children: [
                          TextButton(
                              onPressed: _loginRoom,
                              child: const Text(
                                '登录房间',
                                style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold),
                              )),
                          TextButton(
                              onPressed: _createWhiteboardView,
                              child: const Text(
                                '创建纯白板',
                                style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold),
                              )),
                          TextButton(
                              onPressed: _createFileView,
                              child: const Text(
                                '创建文件白板',
                                style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold),
                              )),
                          TextButton(
                            onPressed: _destroySuperBoardSubView,
                            child: const Text(
                              '销毁当前超级白板',
                              style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                )));
      }

      /// 登录房间
      void _loginRoom() async {
        ZegoUser user = ZegoUser(userID, userName);
        ZegoRoomConfig config = ZegoRoomConfig.defaultConfig();
        config.isUserStatusNotify = true;
        ZegoRoomLoginResult result = await ZegoExpressEngine.instance
            .loginRoom(roomID, user, config: config);
        if (kDebugMode) {
          print(
              '[Flutter][loginRoom] result: $result  errorCode: ${result.errorCode}');
        }
      }

      /// 创建纯白板
      void _createWhiteboardView() async {
        ZegoCreateWhiteboardConfig whiteboardConfig = ZegoCreateWhiteboardConfig(
            '创建纯白板',
            perPageWidth: 16,
            perPageHeight: 9,
            pageCount: 5);

        result = await ZegoSuperBoardManager.instance
            .createWhiteboardView(config: whiteboardConfig);
        if (kDebugMode) {
          print(
              '[Flutter][createWhiteboardView] result: $result  errorCode: ${result!.boardError.errorCode}');
        }
      }

      /// 创建文件白板
      void _createFileView() async {
        // 创建文件白板前，需要通过 [uploadFile] 获取 fileID，此处为了演示，提供了一个可用的 fileID
        ZegoCreateFileConfig fileConfig = ZegoCreateFileConfig('Cz7ArXgd8lVTtqTp');
        ZegoSuperBoardManagerCreateResult result =
            await ZegoSuperBoardManager.instance.createFileView(fileConfig);
        if (kDebugMode) {
          print(
              '[Flutter][createFileView] result: $result  errorCode: ${result.boardError.errorCode}');
        }
      }

      /// 销毁白板
      void _destroySuperBoardSubView() async {
        if (result != null) {
          ZegoSuperBoardManager.instance
              .destroySuperBoardSubView(result!.model.uniqueID);
        }
      }
    }
    ```

2. 在“main.dart”文件引入创建好的路由`ZegoSuperboardPage`。

    ```dart
    ...
    Widget build(BuildContext context) {
        return MaterialApp(
          home: Scaffold(
            appBar: AppBar(
              title: const Text('Superboard view flutter app'),
            ),
          body: const ZegoSuperboardPage(),
          ),
        );
      }
    ...
    ```

### 1 初始化 SDK

#### 初始化 ZEGO Express SDK

调用 ZEGO Express SDK 的 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

```dart
int appID = ;  // 您的 appid
String appSign = '';  // 您的 appSign
ZegoScenario scenario = ZegoScenario.Default;
ZegoEngineProfile profile = ZegoEngineProfile(appID, scenario, enablePlatformView: false, appSign: appSign);
await ZegoExpressEngine.createEngineWithProfile(profile);
```

#### 初始化 ZegoSuperBoard SDK

调用[initWithConfig](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/initWithConfig.html) 方法初始化 ZegoSuperBoard SDK。

如果返回值 为 0，代表初始化成功，可进行更多操作。errorCode 可参考 [常见错误码](/super-board-flutter/error-code)。

```dart
/**
* appID：ZEGO 为开发者签发的应用 ID，请从 ZEGO 控制台 https://console.zego.im 申请。
* appSign: ZEGO 为开发者签发的应用 appSign，请从 ZEGO 控制台 https://console. zego.im 申请
*/
//创建一个初始化配置类
String userID = 'userid';
ZegoSuperBoardInitConfig boardInitConfig = ZegoSuperBoardInitConfig(appID, appSign, userID: userID);
ZegoSuperBoardError boardError = await ZegoSuperBoardManager.instance.initWithConfig(boardInitConfig);
```

<Note title="说明">

需要确保 ZEGO Express SDK 和 ZegoSuperBoard SDK 均初始化成功，才能成功调用其他接口。
</Note>

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。
SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
- [onError](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onError.html)：SDK 抛出的错误码。errorCode 可参考 [常见错误码](/super-board-flutter/error-code)。
- [onRemoteSuperBoardSubViewAdded](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onRemoteSuperBoardSubViewAdded.html)：远端新增文件白板通知。
- [onRemoteSuperBoardSubViewRemoved](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onRemoteSuperBoardSubViewRemoved.html)：远端销毁文件白板通知。
- [onRemoteSuperBoardSubViewSwitched](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onRemoteSuperBoardSubViewSwitched.html)：远端切换白板文件通知。

```dart
ZegoSuperBoardEventHandler.onError = ((errorCodde) {});
ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewAdded = ((subViewModel) {
    if (kDebugMode) {
        print('[Flutter][onRemoteSuperBoardSubViewAdded]:$subViewModel');
    }
});
ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewRemoved = ((subViewModel) {
    if (kDebugMode) {
        print('[Flutter][onRemoteSuperBoardSubViewRemoved]:$subViewModel');
    }
});
ZegoSuperBoardEventHandler.onRemoteSuperBoardSubViewSwitched = ((uniqueID) {
    if (kDebugMode) {
        print('[Flutter][onRemoteSuperBoardSubViewSwitched]:$uniqueID');
    }
});
ZegoSuperBoardEventHandler.onRemoteSuperBoardAuthChanged = ((authInfo) {
    if (kDebugMode) {
        print('[Flutter][onRemoteSuperBoardAuthChanged]:$authInfo');
    }
});
ZegoSuperBoardEventHandler.onRemoteSuperBoardGraphicAuthChanged = ((authInfo) {
    if (kDebugMode) {
        print('[Flutter][onRemoteSuperBoardGraphicAuthChanged]:$authInfo');
    }
});
ZegoSuperBoardEventHandler.onSuperBoardSubViewScrollChanged = ((uniqueID, page, pageCount) {
    if (kDebugMode) {
        print(
            '[Flutter][onRemoteSuperBoardGraphicAuthChanged] uniqueID:$uniqueID, uniqueID:$page');
    }
});
ZegoSuperBoardEventHandler.onSuperBoardSubViewSizeChanged = ((uniqueID, size) {
    if (kDebugMode) {
        print(
            '[Flutter][onSuperBoardSubViewSizeChanged] uniqueID:$uniqueID, size:$size');
    }
});
```

###  3 登录房间
调用 [ZegoExpressEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine-class.html) 的 [loginRoom|_blank](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间。
-  需保证 “roomID” 信息的全局唯一。
-  “userID” 与 “userName” 不能为 “nil” 否则会导致登录房间失败。
-  ZegoUser 的构造方法 [ZegoUser](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoUser/ZegoUser.html) 会将 userName 设为与传的参数 userID 一样。
- 每个 “userID” 必须唯一，建议设置成一个有意义的值，开发者可将 “userID” 与自己业务账号系统进行关联。
错误码详情请参考 [登录房间错误码 ](https://doc-zh.zego.im/article/5641)。
```dart
void loginRoom() {
// roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登陆同一个房间才能进行通话
String roomID = "room1";
// 创建用户对象，ZegoUser 的构造方法 userWithUserID 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “nil”，否则会导致登录房间失败。
// userID 由您本地生成,需保证 “userID” 全局唯一。
ZegoUser user = ZegoUser('user1', 'userName');
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig config = ZegoRoomConfig.defaultConfig();
config.isUserStatusNotify = true;
// 登录房间
ZegoExpressEngine.instance
.loginRoom(roomID, user, config: config)
.then((result) => {});
}
```

### 4 添加白板视图

确保 ZegoSuperBoard SDK 初始化成功且登录房间之后，才能调用 [createCanvasView](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/createCanvasView.html) 接口，获取业务场景 Widget，用来将白板视图（ZegoSuperBoardView）直接添加到您的业务场景视图中。示例代码如下：


```dart
// 将此 Widget 加入到页面的渲染树中以显示白板画面
//
_containerWidget = await ZegoSuperBoardManager.instance.createCanvasView((viewID){

});
```

### 5 创建白板

创建白板前需要保证登录成功，建议可在登录成功的回调中调用创建纯白板或文件白板的接口。

```dart
// 创建白板前需要保证登录成功，即房间回调状态为 ZegoRoomState.Connected
ZegoExpressEngine.onRoomStateUpdate = (String roomID, ZegoRoomState state,
int errorCode, Map<String, dynamic> extendedData) {
    if (state == ZegoRoomState.Connected && errorCode == 0) {
        // 表示登录成功，需要在登录成功后才可以创建白板
    }
};
```

超级白板支持创建纯白板和文件白板。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。
    创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-flutter/basic-func/file-manage) 进行上传。

一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
如需获取房间内当前的白板数量，请调用 [querySuperBoardSubViewList](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/querySuperBoardSubViewList.html)。

<div class="multiple-select-codes">
    <div class="code-tabs hide-scrollbar">
      <div class="scroll-box">
        <span class="tab-item">
          <span>创建纯白板</span>
        </span>
        <span class="tab-item">
          <span>创建文件白板</span>
        </span>
      </div>
    </div>

  <div class="code-list">

  ```dart
  // 创建白板需要构造
  ZegoCreateWhiteboardConfig whiteboardConfig = ZegoCreateWhiteboardConfig(
      '一个测试白板',
      perPageWidth: 16,
      perPageHeight: 9,
      pageCount: ZogoManager.instance.pageCount);
  ZegoSuperBoardManagerCreateResult? result = await ZegoSuperBoardManager.instance.createWhiteboardView(config: whiteboardConfig);
  ```

   ```dart
  // 创建文件需要构造 ZegoCreateFileConfig 配置类
  ZegoCreateFileConfig fileConfig = ZegoCreateFileConfig(currentfileID);
  ZegoSuperBoardManagerCreateResult result = await ZegoSuperBoardManager.instance.createFileView(fileConfig);
  if (kDebugMode) {
      print('[Flutter][createFileView] result:$result');
  }
  ```
  </div>
</div>

### 6 销毁白板

如需销毁某个白板，调用 [destroySuperBoardSubView](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/destroySuperBoardSubView.html) 接口，传入该白板的 uniqueID，即可销毁。

```dart
//销毁后SDK内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个
await ZegoSuperBoardManager.instance.destroySuperBoardSubView('uniqueID');
```

## 测试你的 App

使用多台设备运行上述项目，登录同一房间 ID。用手指在任一设备的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个设备 ZegoSuperBoardView 上。

## 了解更多

到此为止，您已成功构建一个简单的超级白板应用。接下来，您可通过以下文档，进一步体验超级白板功能：

- [白板绘制](/super-board-flutter/basic-func/sketch)
- [白板翻页](/super-board-flutter/basic-func/scale-and-flip)
- [白板缩放](/super-board-flutter/basic-func/withe-board-scale)
- [白板切换](/super-board-flutter/basic-func/switch)
- [获取白板列表](/super-board-flutter/basic-func/white-board-list)
- [共享文件管理](/super-board-flutter/basic-func/file-manage)
