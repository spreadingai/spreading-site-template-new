# 快速开始

- - -

本文将介绍如何使用实时音视频产品（ ZEGO Express SDK ）实现基本的直播功能。

## 前提条件

在开始接入前，请确保开发环境满足以下要求：
- Android Studio 2020.3.1 或更高版本。
- Android SDK 包需为：Android SDK 25，Android SDK Build-Tools 25.0.2，Android SDK Platform-Tools 25.x.x 或更高版本。
- Android 4.4 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
- 在 [管理控制台](https://console.zego.im/ProjectManage) 中注册并创建项目，同时开通 “ZEGO CDN” 服务。
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/zegocloud/console/console_cdn_zh.png" /></Frame>

## 创建 Android 项目

如果已经存在项目，请跳过此步骤。

<Accordion title="创建新项目" defaultOpen="false">
1. 打开 Android Studio，选择 “File > New > New Project”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project.png" /></Frame>

2. 填写应用名称和项目位置。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project_finish.png" /></Frame>

3. 面板中的其他所有项目可以保留默认设置，单击 “Next”，然后单击 “Finish”。
</Accordion>

## 导入 SDK


<Note title="说明">


当前 SDK 支持的 Android 架构包括：armeabi-v7a、arm64-v8a、x86、x86_64。
</Note>


选择以下任一方法将 Express Video SDK 集成到您的项目中。

<Accordion title="方法 1：自动集成 SDK（推荐）" defaultOpen="false">
1. 如果您的 Android Gradle 插件是 v7.1.0 或更高版本：进入项目的根目录，打开 `settings.gradle` 文件，并在 `dependencyResolutionManagement` 中添加以下内容：

    ```groovy
    ...
    dependencyResolutionManagement {
        repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
        repositories {
            maven { url 'https://maven.zego.im'  }
            google()
            mavenCentral()
        }
    }
    ```

    <Warning title="注意">
    如果您在 `settings.gradle` 中找不到上述字段，可能是因为您的 Android Gradle 插件版本低于 v7.1.0。

    有关更多详细信息，请参考 [Android Gradle 插件发布说明 v7.1.0](https://developer.android.com/build/releases/past-releases/agp-7-1-0-release-notes#settings-gradle)。
    </Warning>

    若您的 Android Gradle Plugin 版本低于 v7.1.0，请按照如下方式操作：
    进入项目的根目录，打开 `build.gradle` 文件，并在 `allprojects` 中添加以下内容：

    ```groovy
    ...
    allprojects {
        repositories {
            maven { url 'https://maven.zego.im'  }
            google()
            mavenCentral()
        }
    }
    ```

2. 进入 `app` 目录，打开 `build.gradle` 文件，并在 `dependencies` 中添加以下内容。
    <Note title="说明">
    “x.y.z” 是 SDK 版本号，要获取最新版本号，请参考 [实时音视频发布日志](/real-time-video-ios-oc/live-streaming/cdn-stream-publishing-authentication)
    </Note>

    ```groovy
    ...
    dependencies {
        ...
        implementation 'im.zego:express-video:x.y.z'
    }
    ```
</Accordion>

<Accordion title="方法 2：手动将 SDK 添加到项目" defaultOpen="false">
1. 下载最新版本的 SDK，请参考 [下载文档|_blank](https://doc-zh.zego.im/article/2969)。
2. 将 SDK 包中的文件解压到您的项目目录中，例如 `app/libs`。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_jar.png" /></Frame>

3. 导入 SDK，打开 `app/build.gradle` 文件，并添加以下内容：

    1. 在 `defaultConfig` 节点内，添加 `ndk` 节点，以指定支持的架构。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_ndk_node.png" /></Frame>

        ```groovy
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
        }
        ```

    2. 在 `android` 节点内，添加 `sourceSets` 节点，以指定包含 SDK 文件的目录。

        <Note title="说明">
        目录 **libs** 仅作为示例说明，您可以根据实际情况填写。
        </Note>

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_sourceSets_node.png" /></Frame>

        ```groovy
        sourceSets {
            main {
                jniLibs.srcDirs = ['libs']
            }
        }
        ```

    3. 在 `dependencies` 节点中，添加以下代码。

        ```groovy
        dependencies {
            implementation fileTree(dir: 'libs', include: ['*.jar'])
            ......
        }
        ```
</Accordion>


## 添加设备权限

根据实际应用需要，设置应用所需权限。

打开 `app/src/main/AndroidManifest.xml` 文件，并添加以下代码：

```xml
<!-- SDK 所需的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- 应用所需的权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<uses-feature
    android:glEsVersion="0x00020000"
    android:required="true" />

<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```

<Warning title="注意">


- 由于 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
- 关于 BLUETOOTH 权限：仅 Android 6.0 以下版本需要声明，Android 6.0 及以上版本无需声明。
</Warning>


```java
String[] permissionNeeded = {
    "android.permission.CAMERA",
    "android.permission.RECORD_AUDIO"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
        requestPermissions(permissionNeeded, 101);
    }
}
```

## 防止类名混淆

为了防止 ZEGO SDK 公共类名被混淆，您可以在 `proguard-rules.pro` 文件中添加以下代码。

```txt
-keep class **.zego.**{*;}
```

## 实现直播功能

### 示例代码

当您开发应用程序时，可下载 [示例代码](https://github.com/ZEGOCLOUD/zegocloud_sdk_demo_android/tree/master/live_streaming/quick_start) 进行参考。

### 创建用户界面

根据场景需要，为您的项目创建视频通话的用户界面。我们推荐你在项目中添加如下元素：

- 主播摄像头视图
- 结束通话按钮

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/zegocloud/live/quickstart/live_page.jpg" /></Frame>


```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".LivePageActivity">


    <TextureView
        android:id="@+id/hostView"
        android:layout_width="wrap_content"
        android:layout_height="731dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />


    <Button
        android:id="@+id/leaveButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="50dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        android:text="leave room" />


</androidx.constraintlayout.widget.ConstraintLayout>
```

### 实现直播逻辑


#### 技术原理

下图显示了用户A播放用户B发布的流的基本过程：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

为了更好的理解相关功能，您可以参考 [术语表](https://doc-zh.zego.im/article/5390) 理解关键概念。

#### 创建和销毁 ZegoExpressEngine 实例

调用 [createEngine|_blank](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#create-engine) 方法初始化 Express Video SDK，并配置以下内容：
- `profile`: ZegoEngineProfile 对象，用于配置 AppID 和 AppSign，并根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/20758) 文档，把选择好的场景枚举传入参数 "scenario"。
- `eventHandler`: 事件通知回调，用于监听核心事件回调，例如房间连接状态变化更新、房间内参与者登录或退出更新等。您可以通过调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#set-event-handler) 方法来设置事件处理器对象。

如需销毁 SDK 并释放其占用的资源，请调用 [destroyEngine|_blank](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#destroy-engine) 方法。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

```java
void createEngine() {
    ZegoEngineProfile profile = new ZegoEngineProfile();

    // 从 ZEGO 控制台获取您的 AppID 和 AppSign
    //[项目管理 > AppID] : https://console.zego.im/ProjectManage
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = ZegoScenario.BROADCAST; // 通用场景。
    profile.application = getApplication();
    ZegoExpressEngine.createEngine(profile, null);
}

// 销毁引擎
private void destroyEngine() {
    ZegoExpressEngine.destroyEngine(null);
}
```


#### 设置事件处理器

实现 `ZegoEventHandler` 事件处理器以监听事件回调，例如房间内流的添加或删除更新、房间内其他用户登录或退出更新、房间连接状态变化更新等。

- [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~java_android~class~IZegoEventHandler#on-room-stream-update): 房间内流的状态更新回调。当新的流推到房间或房间内现有流停止时，SDK 通过此回调发出事件通知。您可以在此回调中，调用 `startPlayingStream()` 和 `stopPlayingStream()` 方法。
- [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~java_android~class~IZegoEventHandler#on-room-state-update): 当前房间连接状态的更新回调。当前房间连接状态发生变化时（例如，当前用户从房间断开连接或登录认证失败），SDK 通过此回调发出事件通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~java_android~class~IZegoEventHandler#on-room-user-update): 房间内其他用户状态的更新回调。当其他用户登录或退出房间时，SDK 通过此回调发出事件通知。

```java
import java.util.ArrayList;

void startListenEvent() {
    ZegoExpressEngine.getEngine().setEventHandler(new IZegoEventHandler() {
        @Override
        // 房间内流的状态更新回调。
        public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList,
                JSONObject extendedData) {
            super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
            // 当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream
            // 接口拉取播放该音视频流
            if (updateType == ZegoUpdateType.ADD) {
                // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
                ZegoStream stream = streamList.get(0);
                String playStreamID = stream.streamID;
                // 如下 remoteUserView 为 UI 界面上的
                // TextureView.这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList
                // ，拉取每一条音视频流
                ZegoCanvas playCanvas = new ZegoCanvas(findViewById(R.id.remoteUserView));
                engine.startPlayingStream(playStreamID, playCanvas);
            } else {
                engine.stopPlayingStream(streamList.get(0).streamID);
            }
        }

        @Override
        // 房间内其他用户状态的更新回调。
        // 用户只能在登录房间时，将 ZegoRoomConfig 的 isUserStatusNotify 属性设置为 `true` 才能接收到
        // `onRoomUserUpdate` 回调。
        public void onRoomUserUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoUser> userList) {
            super.onRoomUserUpdate(roomID, updateType, userList);
            // 您可以根据用户的登录和退出状态，在回调中实现服务逻辑。
            if (updateType == ZegoUpdateType.ADD) {
                for (ZegoUser user : userList) {
                    String text = user.userID + " 登录了房间。";
                    Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                }
            } else if (updateType == ZegoUpdateType.DELETE) {
                for (ZegoUser user : userList) {
                    String text = user.userID + " 从房间退出。";
                    Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                }
            }
        }

        @Override
        // 当前用户房间连接状态的更新回调。
        public void onRoomStateChanged(String roomID, ZegoRoomStateChangedReason reason, int i, JSONObject jsonObject) {
            super.onRoomStateChanged(roomID, reason, i, jsonObject);
            if (reason == ZegoRoomStateChangedReason.LOGINING) {
                // 正在登录房间。当调用 `loginRoom` 登录房间或调用 `switchRoom` 切换房间时，房间进入此状态，表示它正在请求连接到服务器。在应用
                // UI 上，显示登录房间的状态。
            } else if (reason == ZegoRoomStateChangedReason.LOGINED) {
                // 登录房间成功。当用户成功登录房间或切换房间时，房间进入此状态。
                // 在这种情况下，用户可以接收到房间内其他用户及其流的添加或删除通知。只有在用户成功登录房间或切换房间后，才能正确调用
                // `startPublishingStream` 和 `startPlayingStream` 来推拉流。
            } else if (reason == ZegoRoomStateChangedReason.LOGIN_FAILED) {
                // 登录房间失败。当用户因 AppID 或 Token 错误等原因登录房间或切换房间失败时，房间进入此状态。
                Toast.makeText(getApplicationContext(), "ZegoRoomStateChangedReason.LOGIN_FAILED", Toast.LENGTH_LONG)
                        .show();
            } else if (reason == ZegoRoomStateChangedReason.RECONNECTING) {
                // 房间连接暂时中断。如果由于网络质量差导致的中断，SDK 将内部重试。
            } else if (reason == ZegoRoomStateChangedReason.RECONNECTED) {
                // 房间重连成功。如果由于网络质量差导致的中断，SDK 将内部重试。如果重连成功，房间进入此状态。
            } else if (reason == ZegoRoomStateChangedReason.RECONNECT_FAILED) {
                // 房间重连失败。如果由于网络质量差导致的中断，SDK 将内部重试。如果重连失败，房间进入此状态。
                Toast.makeText(getApplicationContext(), "ZegoRoomStateChangedReason.RECONNECT_FAILED",
                        Toast.LENGTH_LONG).show();
            } else if (reason == ZegoRoomStateChangedReason.KICK_OUT) {
                // 服务器强制用户从房间退出。如果已登录房间 A 的用户尝试登录房间 B，服务器将强制用户从房间 A 退出，房间 A 进入此状态。
                Toast.makeText(getApplicationContext(), "ZegoRoomStateChangedReason.KICK_OUT", Toast.LENGTH_LONG)
                        .show();
            } else if (reason == ZegoRoomStateChangedReason.LOGOUT) {
                // 成功从房间退出。这是房间在登录之前的默认状态。如果用户通过调用 `logoutRoom` 或 `switchRoom` 成功从房间退出，房间进入此状态。
            } else if (reason == ZegoRoomStateChangedReason.LOGOUT_FAILED) {
                // 从房间退出失败。如果用户通过调用 `logoutRoom` 或 `switchRoom` 从房间退出失败，房间进入此状态。
            }
        }

        // 音视频推流状态通知。
        @Override
        public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode,
                JSONObject extendedData) {
            super.onPublisherStateUpdate(streamID, state, errorCode, extendedData);
            if (errorCode != 0) {
                // 推流异常。
            }
            if (state == ZegoPublisherState.PUBLISHING) {
                // 正在推流。
            } else if (state == ZegoPublisherState.NO_PUBLISH) {
                // 未推流。
                Toast.makeText(getApplicationContext(), "ZegoPublisherState.NO_PUBLISH", Toast.LENGTH_LONG).show();
            } else if (state == ZegoPublisherState.PUBLISH_REQUESTING) {
                // 请求推流。
            }
        }

        // 音视频拉流状态通知。
        // 当用户拉流的状态发生变化时，将接收到此回调。
        // 如果由于网络中断等原因在拉流过程中发生异常，SDK 将自动重试拉流。
        @Override
        public void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode,
                JSONObject extendedData) {
            super.onPlayerStateUpdate(streamID, state, errorCode, extendedData);
            if (errorCode != 0) {
                // 拉流异常。
                Toast.makeText(getApplicationContext(),
                        "onPlayerStateUpdate, state:" + state + "errorCode:" + errorCode, Toast.LENGTH_LONG).show();
            }
            if (state == ZegoPlayerState.PLAYING) {
                // 正在拉流。
            } else if (state == ZegoPlayerState.NO_PLAY) {
                // 未拉流。
                Toast.makeText(getApplicationContext(), "ZegoPlayerState.NO_PLAY", Toast.LENGTH_LONG).show();
            } else if (state == ZegoPlayerState.PLAY_REQUESTING) {
                // 请求拉流。
            }
        }
    });
}

void stopListenEvent() {
    ZegoExpressEngine.getEngine().setEventHandler(null);
}
```


#### 登录或退出房间

- 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 登录房间。
- 调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 退出房间。

```java
void loginRoom() {
    ZegoUser user = new ZegoUser(userID, userName);
    ZegoRoomConfig roomConfig = new ZegoRoomConfig();
    // 只有当传递的 `ZegoRoomConfig` 中 `isUserStatusNotify` 参数设置为
    // `true` 时，才能接收到 `onRoomUserUpdate` 回调。
    roomConfig.isUserStatusNotify = true;
    ZegoExpressEngine.getEngine().loginRoom(roomID, user, roomConfig, (int error, JSONObject extendedData) -> {
        // 房间登录结果。如果您只需要检查登录结果，使用此回调即可。
        if (error == 0) {
            // 登录成功。
            // 开始预览和推流。
            Toast.makeText(this, "登录成功。", Toast.LENGTH_LONG).show();

            if(isHost){
                startPreview();
                startPublish();
            }
        } else {
            // 登录失败。详细信息，请参考 [错误码](/real-time-video-android-java/client-sdk/error-code)。
            Toast.makeText(this, "登录失败。错误 = " + error, Toast.LENGTH_LONG).show();
        }
    });
}

void logoutRoom() {
    ZegoExpressEngine.getEngine().logoutRoom();
}
```



#### 开始或停止本地视频预览

- 调用 [startPreview](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#start-preview) 方法，开始本地视频预览并进行渲染。
- 调用 [stopPreview](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~objective-c_ios~class~ZegoExpressEngine#stop-preview) 方法，停止渲染及预览。

```java
void startPreview(){
    ZegoCanvas previewCanvas = new ZegoCanvas(findViewById(R.id.preview));
    ZegoExpressEngine.getEngine().startPreview(previewCanvas);
}
void stopPreview(){
    ZegoExpressEngine.getEngine().stopPreview();
}
```

#### 开始或停止推流


- 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#start-publishing-stream) 方法，向远端用户推送本地音视频流。
- 调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#stop-publishing-stream) 方法，停止推流。

```java
void startPublish() {
    // 调用 `loginRoom` 方法后，调用此方法推流。
    // StreamID 在房间内必须唯一。
    ZegoCanvas previewCanvas = new ZegoCanvas(findViewById(R.id.preview));
    ZegoExpressEngine.getEngine().startPreview(previewCanvas);
    String streamID = roomID + "_" + userID + "_call";
    ZegoExpressEngine.getEngine().startPublishingStream(streamID);
}


void stopPublish() {
    ZegoExpressEngine.getEngine().stopPublishingStream();
}
```


#### 开始或停止拉流

- 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 方法，开始拉流。
- 调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 方法，停止拉流。

```java
void startPlayStream(String streamID) {
    findViewById(R.id.hostView).setVisibility(View.VISIBLE);
    ZegoCanvas playCanvas = new ZegoCanvas(findViewById(R.id.hostView));
    ZegoPlayerConfig config = new ZegoPlayerConfig();
    config.resourceMode = ZegoStreamResourceMode.DEFAULT; // 直播
    ZegoExpressEngine.getEngine().startPlayingStream(streamID, playCanvas, config);
}

void stopPlayStream(String streamID) {
    ZegoExpressEngine.getEngine().stopPlayingStream(streamID);
    findViewById(R.id.hostView).setVisibility(View.GONE);
}
```

### 启动或停止您的应用程序


- 当您的应用程序启动时，您需要调用示例 Demo 中封装的 `createEngine` 方法来初始化 SDK。
- 当您的应用程序即将退出时，您可以调用示例 Demo 中封装的 `destroyEngine` 释放 SDK 资源。

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    createEngine();
    initViews();
}

@Override
protected void onDestroy() {
    super.onDestroy();
    destroyEngine();
}
```

## 运行和测试

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



## 资源

更多详细的演示源代码，请查看 [此处](https://github.com/ZEGOCLOUD/zegocloud_sdk_demo_android/tree/master/live_streaming/quick_start)。
