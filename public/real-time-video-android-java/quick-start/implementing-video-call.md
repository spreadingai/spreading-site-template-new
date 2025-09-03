# 实现视频通话

---



## 功能简介

本文将介绍如何快速实现一个简单的实时音视频通话。

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 流：指一组按指定编码格式封装，不断发送中的音视频数据。一个用户可以同时推多条流（例如一条推摄像头数据，一条推屏幕共享数据）也可以同时拉多条流。每条流都由一个流 ID（streamID）标识。
- 推流：把封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。
    3. 每个房间由一个 ApplD 内唯一的 roomlD 标识。所有使用同一个 roomID 登录房间的用户即属于同房间。



更多相关概念请参考 [术语说明](/glossary/term-explanation)。

## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">

SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

## 示例代码
我们提供了一个实现视频通话基本流程的示例代码，可作为开发中的参考。
<Accordion title="xml 界面代码" defaultOpen="false">
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/coordinatorLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <TextureView
        android:id="@+id/preview"
        android:layout_width="wrap_content"
        android:layout_height="731dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/startButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="开始通话"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/appBarLayout" />

    <Button
        android:id="@+id/stopButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="停止通话"
        app:iconTint="#E65A5A"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/startButton" />

    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/appBarLayout"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="?attr/colorPrimary" />

    </com.google.android.material.appbar.AppBarLayout>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:srcCompat="@android:drawable/ic_dialog_email" />

    <TextureView
        android:id="@+id/remoteUserView"
        android:layout_width="150dp"
        android:layout_height="220dp"
        android:layout_marginTop="30dp"
        android:layout_marginEnd="30dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/appBarLayout" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
</Accordion>

<Accordion title="实现视频通话代码" defaultOpen="false">
```java
package com.zego.express.demo.helloworld;

import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.view.View;

import android.widget.Toast;

import org.json.JSONObject;

import java.util.ArrayList;

import im.zego.zegoexpress.ZegoExpressEngine;
import im.zego.zegoexpress.callback.IZegoDestroyCompletionCallback;
import im.zego.zegoexpress.callback.IZegoEventHandler;
import im.zego.zegoexpress.constants.ZegoPlayerState;
import im.zego.zegoexpress.constants.ZegoPublisherState;
import im.zego.zegoexpress.constants.ZegoRoomStateChangedReason;
import im.zego.zegoexpress.constants.ZegoScenario;
import im.zego.zegoexpress.constants.ZegoStreamQualityLevel;
import im.zego.zegoexpress.constants.ZegoUpdateType;
import im.zego.zegoexpress.entity.ZegoCanvas;
import im.zego.zegoexpress.entity.ZegoEngineProfile;
import im.zego.zegoexpress.entity.ZegoRoomConfig;
import im.zego.zegoexpress.entity.ZegoStream;
import im.zego.zegoexpress.entity.ZegoUser;

public class MainActivity extends AppCompatActivity {

    ZegoExpressEngine engine;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 在通话前需请求相应摄像头、录音权限
        requestPermission();

        // 开始通话按钮
        findViewById(R.id.startButton).setOnClickListener(new View.OnClickListener() {
            // 点击开始通话
            @Override
            public void onClick(View view) {
                // 创建Express SDK 实例
                createEngine();
                // 监听常用事件
                setEventHandler();
                // 登录房间
                loginRoom();
                // 开始预览及推流
                startPublish();
            }
        });

        // 停止通话按钮
        findViewById(R.id.stopButton).setOnClickListener(new View.OnClickListener() {
            // 点击停止通话
            @Override
            public void onClick(View view) {
                engine.logoutRoom();
                ZegoExpressEngine.destroyEngine(new IZegoDestroyCompletionCallback() {
                    @Override
                    public void onDestroyCompletion() {
                        //销毁成功
                    }
                });

            }
        });
    }

    //请求摄像头、录音权限
    private void requestPermission() {
        String[] permissionNeeded = {
                "android.permission.CAMERA",
                "android.permission.RECORD_AUDIO"};
        if (ContextCompat.checkSelfPermission(getApplicationContext(), "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(getApplicationContext(), "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(permissionNeeded, 101);
        }
    }

    // 创建 ZegoExpress 实例，监听常用事件
    void createEngine() {
        // 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
        // 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
        ZegoEngineProfile profile = new ZegoEngineProfile();
        profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
        profile.appSign = ; //请通过官网注册获取，格式为："0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
        profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入
        profile.application = getApplication();
        engine = ZegoExpressEngine.createEngine(profile, null);
    }

    //登录房间
    void loginRoom() {
        // ZegoUser 的构造方法 public ZegoUser(String userID) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null” 否则会导致登录房间失败。
        ZegoUser user = new ZegoUser("user2");

        ZegoRoomConfig roomConfig = new ZegoRoomConfig();
        //如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
        //roomConfig.token = ;
        // 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
        roomConfig.isUserStatusNotify = true;

        // roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话
        String roomID = "room1";

        // 登录房间
        engine.loginRoom(roomID, user, roomConfig, (int error, JSONObject extendedData)->{
            // 登录房间结果，如果仅关注登录结果，关注此回调即可
            if (error == 0) {
                // 登录成功
                Toast.makeText(this, "登录成功", Toast.LENGTH_LONG).show();
            } else {
                // 登录失败，请参考 errorCode 说明 /real-time-video-android-java/client-sdk/error-code
                Toast.makeText(this, "登录失败，请参考 errorCode 说明 /real-time-video-android-java/client-sdk/error-code", Toast.LENGTH_LONG).show();
            }
        });
    }

    //预览并推流
    void startPublish() {
        // 设置本地预览视图并启动预览，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
        ZegoCanvas previewCanvas = new ZegoCanvas(findViewById(R.id.preview));;
        engine.startPreview(previewCanvas);

        // 开始推流
        // 用户调用 loginRoom 之后再调用此接口进行推流
        // 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
        engine.startPublishingStream("stream2");
    }

    void setEventHandler() {
        engine.setEventHandler(new IZegoEventHandler() {

            @Override
            // 房间内其他用户推流/停止推流时，我们会在这里收到相应用户的音视频流增减的通知
            public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
                super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
                //当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream 接口拉取播放该音视频流
                if (updateType == ZegoUpdateType.ADD) {
                    // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
                    ZegoStream stream = streamList.get(0);
                    String playStreamID = stream.streamID;
                    // 如下 remoteUserView 为 UI 界面上的 TextureView.这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
                    ZegoCanvas playCanvas = new ZegoCanvas(findViewById(R.id.remoteUserView));
                    engine.startPlayingStream(playStreamID, playCanvas);
                }
            }

            //同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 ZegoUpdateType 为 ZegoUpdateType.ADD 时，表示有用户进入了房间；ZegoUpdateType 为 ZegoUpdateType.DELETE 时，表示有用户退出了房间。
            // 只有在登录房间 loginRoom 时传的配置 ZegoRoomConfig 中的 isUserStatusNotify 参数为 true 时，用户才能收到房间内其他用户的回调。
            // 房间人数大于 500 人的情况下 onRoomUserUpdate 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。
            @Override
            public void onRoomUserUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoUser> userList) {
                super.onRoomUserUpdate(roomID, updateType, userList);
                // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
                if (updateType == ZegoUpdateType.ADD) {
                    for (ZegoUser user : userList) {
                        String text = user.userID + "进入了房间";
                        Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                    }
                } else if (updateType == ZegoUpdateType.DELETE) {
                    for (ZegoUser user : userList) {
                        String text = user.userID + "退出了房间";
                        Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                    }
                }
            }

            // 房间连接状态改变
            @Override
            public void onRoomStateChanged(String roomID, ZegoRoomStateChangedReason reason, int i, JSONObject jsonObject) {
                super.onRoomStateChanged(roomID, reason, i, jsonObject);
                if(reason == ZegoRoomStateChangedReason.LOGINING) {
                    // 正在登录房间。当调用 [loginRoom] 登录房间或 [switchRoom] 切换到目标房间时，进入该状态，表示正在请求连接服务器。通常通过该状态进行应用界面的展示。
                } else if(reason == ZegoRoomStateChangedReason.LOGINED) {
                    //登录房间成功。当登录房间或切换房间成功后，进入该状态，表示登录房间已经成功，用户可以正常收到房间内的其他用户和所有流信息增删的回调通知。
                    //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
                } else if(reason == ZegoRoomStateChangedReason.LOGIN_FAILED) {
                    //登录房间失败。当登录房间或切换房间失败后，进入该状态，表示登录房间或切换房间已经失败，例如 AppID 或 Token 不正确等。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECTING) {
                    //房间连接临时中断。如果因为网络质量不佳产生的中断，SDK 会进行内部重试。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECTED) {
                    //房间重新连接成功。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连成功后进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECT_FAILED) {
                    //房间重新连接失败。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连失败后进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.KICK_OUT) {
                    //被服务器踢出房间。例如有相同用户名在其他地方登录房间导致本端被踢出房间，会进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.LOGOUT) {
                    //登出房间成功。没有登录房间前默认为该状态，当调用 [logoutRoom] 登出房间成功或 [switchRoom] 内部登出当前房间成功后，进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.LOGOUT_FAILED) {
                    //登出房间失败。当调用 [logoutRoom] 登出房间失败或 [switchRoom] 内部登出当前房间失败后，进入该状态。
                }
            }

            //用户推送音视频流的状态通知
            //用户推送音视频流的状态发生变更时，会收到该回调。如果网络中断导致推流异常，SDK 在重试推流的同时也会通知状态变化。
            @Override
            public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData) {
                super.onPublisherStateUpdate(streamID, state, errorCode, extendedData);
                if (errorCode != 0) {
                    //推流状态出错
                }
                if (state == ZegoPublisherState.PUBLISHING) {
                    //正在推流中
                } else if (state == ZegoPublisherState.NO_PUBLISH){
                    //未推流
                } else if (state == ZegoPublisherState.PUBLISH_REQUESTING){
                    //正在请求推流中
                }
            }
            //用户拉取音视频流的状态通知
            //用户拉取音视频流的状态发生变更时，会收到该回调。如果网络中断导致拉流异常，SDK 会自动进行重试。
            @Override
            public void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, JSONObject extendedData) {
                super.onPlayerStateUpdate(streamID, state, errorCode, extendedData);
                if (errorCode != 0) {
                    //拉流状态出错
                }
                if (state == ZegoPlayerState.PLAYING) {
                    //正在拉流中
                } else if (state == ZegoPlayerState.NO_PLAY){
                    //未拉流
                } else if (state == ZegoPlayerState.PLAY_REQUESTING){
                    //正在请求拉流中
                }
            }

            @Override
            public void onNetworkQuality(String userID, ZegoStreamQualityLevel zegoStreamQualityLevel, ZegoStreamQualityLevel zegoStreamQualityLevel1) {
                super.onNetworkQuality(userID, zegoStreamQualityLevel, zegoStreamQualityLevel1);
                if (userID == null) {
                    // 代表本地用户（我）的网络质量
                    //("我的上行网络质量是 %lu", (unsigned long)upstreamQuality);
                    //("我的下行网络质量是 %lu", (unsigned long)downstreamQuality);
                } else {
                    //代表房间内其他用户的网络质量
                    //("用户 %s 的上行网络质量是 %lu", userID, (unsigned long)upstreamQuality);
                    //("用户 %s 的下行网络质量是 %lu", userID, (unsigned long)downstreamQuality);
                }

                /*
                ZegoStreamQualityLevel.EXCELLENT, 网络质量极好
                ZegoStreamQualityLevel.GOOD, 网络质量好
                ZegoStreamQualityLevel.MEDIUM, 网络质量正常
                ZegoStreamQualityLevel.BAD, 网络质量差
                ZegoStreamQualityLevel.DIE, 网络异常
                ZegoStreamQualityLevel.UNKNOWN, 网络质量未知
                */
            }
        });
    }
}

```
</Accordion>

<a id="process"></a>

## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" />
</Frame>

<a id="initialization"> </a>

### 初始化

**1. 创建界面**

根据场景需要，为你的项目创建视频通话的用户界面。我们推荐你在项目中添加如下元素：

- 本地视频窗口
- 远端视频窗口
- 结束通话按钮

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call.png" />
</Frame>


**2. 准备基础工作，导入 ZEGO Express SDK 的相关类和常量**

<Accordion title="示例代码" defaultOpen="false">
```java
import im.zego.zegoexpress.ZegoExpressEngine;
import im.zego.zegoexpress.callback.IZegoDestroyCompletionCallback;
import im.zego.zegoexpress.callback.IZegoEventHandler;
import im.zego.zegoexpress.constants.ZegoPlayerState;
import im.zego.zegoexpress.constants.ZegoPublisherState;
import im.zego.zegoexpress.constants.ZegoRoomStateChangedReason;
import im.zego.zegoexpress.constants.ZegoScenario;
import im.zego.zegoexpress.constants.ZegoStreamQualityLevel;
import im.zego.zegoexpress.constants.ZegoUpdateType;
import im.zego.zegoexpress.entity.ZegoCanvas;
import im.zego.zegoexpress.entity.ZegoEngineProfile;
import im.zego.zegoexpress.entity.ZegoRoomConfig;
import im.zego.zegoexpress.entity.ZegoStream;
import im.zego.zegoexpress.entity.ZegoUser;
```

```java
ZegoExpressEngine engine;
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // 在通话前需请求相应摄像头、录音权限
    requestPermission();

    // 开始通话按钮
    findViewById(R.id.startButton).setOnClickListener(new View.OnClickListener() {
        // 点击开始通话
        @Override
        public void onClick(View view) {
            // 创建Express SDK 实例
            createEngine();
            // 监听常用事件
            setEventHandler();
            // 登录房间
            loginRoom();
            // 开始预览及推流
            startPublish();
        }
    });

    // 停止通话按钮
    findViewById(R.id.stopButton).setOnClickListener(new View.OnClickListener() {
        // 点击停止通话
        @Override
        public void onClick(View view) {
            engine.logoutRoom();
            ZegoExpressEngine.destroyEngine(new IZegoDestroyCompletionCallback() {
                @Override
                public void onDestroyCompletion() {
                    //销毁成功
                }
            });

        }
    });
}

//请求摄像头、录音权限
private void requestPermission() {
    String[] permissionNeeded = {
            "android.permission.CAMERA",
            "android.permission.RECORD_AUDIO"};
    if (ContextCompat.checkSelfPermission(getApplicationContext(), "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(getApplicationContext(), "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
        //101 为requestCode，可以是任何大于 0 的数字，会透传到权限请求结果回调 onRequestPermissionsResult
        requestPermissions(permissionNeeded, 101);
    }
}
```
</Accordion>

<h1 id="CreateEngine"> </h1>

**3. 创建引擎**

调用 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。

根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16313) 文档，把选择好的场景枚举传入参数 "scenario"。


<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

```java
// 创建 ZegoExpress 实例，监听常用事件
void createEngine() {
    ZegoEngineProfile profile = new ZegoEngineProfile();
    profile.appID = appID;  // 请通过官网注册获取，格式为：1234567890L
    profile.appSign = appSign; //请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
    profile.scenario = ZegoScenario.BROADCAST;  // 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
    profile.application = getApplication();
    engine = ZegoExpressEngine.createEngine(profile, null);
}
```

**4. 设置回调**

您可以通过实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 接口中的特定方法（或者通过匿名内部类），以监听并处理所关注的事件回调。然后将接口实现类（或者匿名内部类）的对象作为`eventHandler`参数传递给 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 方法或者传递给 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-event-handler) 注册回调。

<Warning title="注意">


建议在创建引擎时或创建引擎后就立即注册回调，避免延后注册错过事件通知。
</Warning>

<Accordion title="常用通知回调" defaultOpen="false">
```java
void setEventHandler() {
        engine.setEventHandler(new IZegoEventHandler() {
            @Override
            // 房间内其他用户推流/停止推流时，我们会在这里收到相应用户的音视频流增减的通知
            public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
                super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
                //当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream 接口拉取播放该音视频流
                if (updateType == ZegoUpdateType.ADD) {
                    // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
                    ZegoStream stream = streamList.get(0);
                    String playStreamID = stream.streamID;
                    // 如下 remoteUserView 为 UI 界面上的 TextureView.这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
                    ZegoCanvas playCanvas = new ZegoCanvas(findViewById(R.id.remoteUserView));
                    engine.startPlayingStream(playStreamID, playCanvas);
                }
            }

            //同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 ZegoUpdateType 为 ZegoUpdateType.ADD 时，表示有用户进入了房间；ZegoUpdateType 为 ZegoUpdateType.DELETE 时，表示有用户退出了房间。
            // 只有在登录房间 loginRoom 时传的配置 ZegoRoomConfig 中的 isUserStatusNotify 参数为 true 时，用户才能收到房间内其他用户的回调。
            // 房间人数大于 500 人的情况下 onRoomUserUpdate 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。
            @Override
            public void onRoomUserUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoUser> userList) {
                super.onRoomUserUpdate(roomID, updateType, userList);
                // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
                if (updateType == ZegoUpdateType.ADD) {
                    for (ZegoUser user : userList) {
                        String text = user.userID + "进入了房间";
                        Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                    }
                } else if (updateType == ZegoUpdateType.DELETE) {
                    for (ZegoUser user : userList) {
                        String text = user.userID + "退出了房间";
                        Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();
                    }
                }
            }

            // 房间连接状态改变
            @Override
            public void onRoomStateChanged(String roomID, ZegoRoomStateChangedReason reason, int i, JSONObject jsonObject) {
                super.onRoomStateChanged(roomID, reason, i, jsonObject);
                if(reason == ZegoRoomStateChangedReason.LOGINING) {
                    // 正在登录房间。当调用 [loginRoom] 登录房间或 [switchRoom] 切换到目标房间时，进入该状态，表示正在请求连接服务器。通常通过该状态进行应用界面的展示。
                } else if(reason == ZegoRoomStateChangedReason.LOGINED) {
                    //登录房间成功。当登录房间或切换房间成功后，进入该状态，表示登录房间已经成功，用户可以正常收到房间内的其他用户和所有流信息增删的回调通知。
                    //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
                } else if(reason == ZegoRoomStateChangedReason.LOGIN_FAILED) {
                    //登录房间失败。当登录房间或切换房间失败后，进入该状态，表示登录房间或切换房间已经失败，例如 AppID 或 Token 不正确等。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECTING) {
                    //房间连接临时中断。如果因为网络质量不佳产生的中断，SDK 会进行内部重试。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECTED) {
                    //房间重新连接成功。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连成功后进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.RECONNECT_FAILED) {
                    //房间重新连接失败。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连失败后进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.KICK_OUT) {
                    //被服务器踢出房间。例如有相同用户名在其他地方登录房间导致本端被踢出房间，会进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.LOGOUT) {
                    //登出房间成功。没有登录房间前默认为该状态，当调用 [logoutRoom] 登出房间成功或 [switchRoom] 内部登出当前房间成功后，进入该状态。
                } else if(reason == ZegoRoomStateChangedReason.LOGOUT_FAILED) {
                    //登出房间失败。当调用 [logoutRoom] 登出房间失败或 [switchRoom] 内部登出当前房间失败后，进入该状态。
                }
            }

            //用户推送音视频流的状态通知
            //用户推送音视频流的状态发生变更时，会收到该回调。如果网络中断导致推流异常，SDK 在重试推流的同时也会通知状态变化。
            @Override
            public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData) {
                super.onPublisherStateUpdate(streamID, state, errorCode, extendedData);
                if (errorCode != 0) {
                    //推流状态出错
                }
                if (state == ZegoPublisherState.PUBLISHING) {
                    //正在推流中
                } else if (state == ZegoPublisherState.NO_PUBLISH){
                    //未推流
                } else if (state == ZegoPublisherState.PUBLISH_REQUESTING){
                    //正在请求推流中
                }
            }
            //用户拉取音视频流的状态通知
            //用户拉取音视频流的状态发生变更时，会收到该回调。如果网络中断导致拉流异常，SDK 会自动进行重试。
            @Override
            public void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, JSONObject extendedData) {
                super.onPlayerStateUpdate(streamID, state, errorCode, extendedData);
                if (errorCode != 0) {
                    //拉流状态出错
                }
                if (state == ZegoPlayerState.PLAYING) {
                    //正在拉流中
                } else if (state == ZegoPlayerState.NO_PLAY){
                    //未拉流
                } else if (state == ZegoPlayerState.PLAY_REQUESTING){
                    //正在请求拉流中
                }
            }

            @Override
            public void onNetworkQuality(String userID, ZegoStreamQualityLevel zegoStreamQualityLevel, ZegoStreamQualityLevel zegoStreamQualityLevel1) {
                super.onNetworkQuality(userID, zegoStreamQualityLevel, zegoStreamQualityLevel1);
                if (userID == null) {
                    // 代表本地用户（我）的网络质量
                    //("我的上行网络质量是 %lu", (unsigned long)upstreamQuality);
                    //("我的下行网络质量是 %lu", (unsigned long)downstreamQuality);
                } else {
                    //代表房间内其他用户的网络质量
                    //("用户 %s 的上行网络质量是 %lu", userID, (unsigned long)upstreamQuality);
                    //("用户 %s 的下行网络质量是 %lu", userID, (unsigned long)downstreamQuality);
                }

                /*
                ZegoStreamQualityLevel.EXCELLENT, 网络质量极好
                ZegoStreamQualityLevel.GOOD, 网络质量好
                ZegoStreamQualityLevel.MEDIUM, 网络质量正常
                ZegoStreamQualityLevel.BAD, 网络质量差
                ZegoStreamQualityLevel.DIE, 网络异常
                ZegoStreamQualityLevel.UNKNOWN, 网络质量未知
                */
            }
        });
}
```

</Accordion>


<a id="createroom"></a>

### 登录房间

你可以调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```java
//登录房间
void loginRoom() {
    // ZegoUser 的构造方法 public ZegoUser(String userID) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 不能为 “null” 否则会导致登录房间失败。
    ZegoUser user = new ZegoUser("user2");

    ZegoRoomConfig roomConfig = new ZegoRoomConfig();
    //如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
    //roomConfig.token = ;
    // 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
    roomConfig.isUserStatusNotify = true;

    // roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话
    String roomID = "room1";

    // 登录房间
    engine.loginRoom(roomID, user, roomConfig, (int error, JSONObject extendedData)->{
        // 登录房间结果，如果仅关注登录结果，关注此回调即可
        if (error == 0) {
            // 登录成功
            Toast.makeText(this, "登录成功", Toast.LENGTH_LONG).show();
        } else {
            // 登录失败，请参考 errorCode 说明 /real-time-video-android-java/client-sdk/error-code
            Toast.makeText(this, "登录失败，请参考 errorCode 说明 /real-time-video-android-java/client-sdk/error-code", Toast.LENGTH_LONG).show();
        }
    });
}
```



#### 登录状态（房间连接状态）回调

调用登录房间接口之后，您可通过监听 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-changed) 回调实时监控自己在本房间内的连接状态。

<a id="publishingStream"></a>

### 预览自己的画面，并推送到 ZEGO 音视频云

**1. （可选）预览自己的画面**

<Note title="说明">


无论是否调用 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-preview) 预览，都可以将自己的音视频流推送到 ZEGO 音视频云。
</Note>

如果希望看到本端的画面，可调用 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-preview) 接口设置预览视图，并启动本地预览。

**2. 将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口后，可以直接调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过监听 [onPublisherStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-publisher-state-update) 回调知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：

同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。

```java
//预览并推流
void startPublish() {
    // 设置本地预览视图并启动预览，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
    ZegoCanvas previewCanvas = new ZegoCanvas(findViewById(R.id.preview));;
    engine.startPreview(previewCanvas);

    // 开始推流
    // 用户调用 loginRoom 之后再调用此接口进行推流
    // 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
    engine.startPublishingStream("stream2");
}
```

<Note title="说明">如果您需要了解 ZEGO Express SDK 的摄像头/视频/麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。</Note>

<a id="PlayingStream"></a>

### 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调中收到音视频流新增的通知，并可以通过 ZegoStream 获取到某条流的 “streamID”。

我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream-1)，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-state-update) 回调知晓是否成功拉取音视频。

```java
// 监听回调
void setEventHandler() {
        engine.setEventHandler(new IZegoEventHandler() {
            @Override
            // 房间内其他用户推流/停止推流时，我们会在这里收到相应用户的音视频流增减的通知
            public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
                super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
                //当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream 接口拉取播放该音视频流
                if (updateType == ZegoUpdateType.ADD) {
                    // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
                    ZegoStream stream = streamList.get(0);
                    String playStreamID = stream.streamID;
                    // 如下 remoteUserView 为 UI 界面上的 TextureView.这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
                    ZegoCanvas playCanvas = new ZegoCanvas(findViewById(R.id.remoteUserView));
                    engine.startPlayingStream(playStreamID, playCanvas);
                }
            }
        });
}
```

#### 注意事项

如果用户在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/4378)。

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



### 停止音视频通话

<a id="stopPublishingStream"></a>

#### 停止推送和拉取音视频流

**1. 停止推流，停止预览**

调用 [stopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```java
// 停止推流
engine.stopPublishingStream();
```

如果启用了本地预览，调用 [stopPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-preview) 接口停止预览。

```java
// 停止本地预览
engine.stopPreview();
```

<a id="stopPlaying"></a>

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">
如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。
</Warning>

```java
// 停止拉流
engine.stopPlayingStream("stream1");
```

<a id="logoutRoom"></a>

#### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 接口退出房间。

```java
// 退出房间
engine.logoutRoom();
```

<a id="destroy"></a>

#### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。

- 如果不需要监听回调，可传入 “null”。

```java
ZegoExpressEngine.destroyEngine(null);
```

## 视频通话 API 调用时序

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml.png" /></Frame>

## 常见问题

<Accordion title="调用 logoutRoom 登出房间时能否直接杀掉进程？" defaultOpen="false">
调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 后直接杀掉进程，有一定概率会导致 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 信令发送出去，建议再调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 并收到回调后再杀进程。
</Accordion>
## 相关文档
- [常见错误码](https://doc-zh.zego.im/article/4378)
- [如何处理房间与用户的相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=all)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=all)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=all)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=all)

- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=all)

- [如何在较差的网络环境中保证音视频流畅（流量控制功能）？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)


- [为什么 Android 9 应用锁屏或切后台后采集音视频无效](https://doc-zh.zego.im/faq/android_background)
