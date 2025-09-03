- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码
---

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/windows/ZIMDemo.zip" target="_blank">点击获得完整代码。</Card>
## 1 概览

本文介绍如何快速跑通示例源码，体验即时通讯服务。

## 2 准备环境

请确保开发环境满足以下技术要求：

* Windows: Windows 7 或以上版本。
* macOS: macOS 11.0 或以上版本。
* 安装了 Qt 5.12.12 版本：[下载地址](https://download.qt.io/archive/qt/5.12/5.12.12/)，首次使用 Qt 的开发者可阅读其 [官方教程](https://doc.qt.io/qt-5/gettingstarted.html)。


## 3 前提条件


<Content />
<Content1 />

## 4 示例源码目录结构

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
ZIMDemo	
|   .clang-format
|   chinese.ts
|   emojipopupwindow.cpp
|   emojipopupwindow.h
|   emojiprovider.cpp
|   emojiprovider.h
|   emojitablemodel.cpp
|   emojitablemodel.h
|   emojitextedit.cpp
|   emojitextedit.h
|   emojitextobject.cpp
|   emojitextobject.h
|   english.ts
|   main.cpp
|   Makefile
|   res.qrc
|   zimmainview.cpp
|   zimmainview.h
|   zimmainview.ui
|   ZIMQTDemo.pro
|   zim_audio_player.cpp
|   zim_audio_player.h
|   zim_chat_message_item.cpp
|   zim_chat_message_item.h
|   zim_clicked_label.cpp
|   zim_clicked_label.h
|   zim_conversation_item_data.h
|   zim_conversation_item_delegate.cpp
|   zim_conversation_item_delegate.h
|   zim_conversation_view.cpp
|   zim_conversation_view.h
|   zim_conversation_view.ui
|   zim_create_c2c_widget.cpp
|   zim_create_c2c_widget.h
|   zim_create_c2c_widget.ui
|   zim_create_group_widget.cpp
|   zim_create_group_widget.h
|   zim_create_group_widget.ui
|   zim_create_room_widget.cpp
|   zim_create_room_widget.h
|   zim_create_room_widget.ui
|   zim_demo_inner_defines.cpp
|   zim_demo_inner_defines.h
|   zim_demo_log.h
|   zim_demo_log_h.cpp
|   zim_download_url_thread.cpp
|   zim_download_url_thread.h
|   zim_enter_room_widget.cpp
|   zim_enter_room_widget.h
|   zim_enter_room_widget.ui
|   zim_event_handler.cpp
|   zim_event_handler.h
|   zim_group_info_widget.cpp
|   zim_group_info_widget.h
|   zim_group_info_widget.ui
|   zim_group_member_info_widget.cpp
|   zim_group_member_info_widget.h
|   zim_group_member_info_widget.ui
|   zim_http.cpp
|   zim_http.h
|   zim_invite_member_widget.cpp
|   zim_invite_member_widget.h
|   zim_invite_member_widget.ui
|   zim_join_group_widget.cpp
|   zim_join_group_widget.h
|   zim_join_group_widget.ui
|   zim_join_room_widget.cpp
|   zim_join_room_widget.h
|   zim_join_room_widget.ui
|   zim_member_item.cpp
|   zim_member_item.h
|   zim_member_item.ui
|   zim_others_inforamtion.cpp
|   zim_others_inforamtion.h
|   zim_others_inforamtion.ui
|   zim_room_info_widget.cpp
|   zim_room_info_widget.h
|   zim_room_info_widget.ui
|   zim_settings_view.cpp
|   zim_settings_view.h
|   zim_settings_view.ui
|   zim_sigslot.h
|   zim_title_view.cpp
|   zim_title_view.h
|   zim_update_token_widget.cpp
|   zim_update_token_widget.h
|   zim_update_token_widget.ui
|   zim_user_information.cpp
|   zim_user_information.h
|   zim_user_information.ui
|   zim_user_item.cpp
|   zim_user_item.h
|   zim_user_item.ui
|   zim_video_player_widget.cpp
|   zim_video_player_widget.h
|   zim_video_player_widget.ui
+---data
+---rapidjson
\---sdk
```

## 5 运行示例源码

1. 请参考 [下载 SDK](/zim-win/client-sdks/sdk-downloads)，下载最新版本的 SDK 包，解压后，将文件拷贝到示例源码的 “./sdk/zim” 目录下，替换掉旧的 SDK 包。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/sava_sdk.png" />
</Frame>

2. 使用 IDE 打开项目。
    
    示例源码中自带了 .pro 工程文件，开发者可以使用 Qt 打开。步骤如下示例：

  1. 在开发电脑中找到 Qt 软件，并打开。

      <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Windows/qt_icon.png" />
      </Frame>

    2. 选择 Projects，点击右侧的 Open。

      <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Windows/qt_open.png" />
      </Frame>

    3. 在解压后的示例源码文件夹中，选择 “ZIMQTDemo” 下的 “ZIMQTDemo.pro” 文件，打开工程。

<Frame width="512" height="auto" caption="">
<img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Windows/qt_path_icon.png" />
</Frame>

3. 点击左侧 Dubug，选择 MSVC2017 组件，再点击 Debug 选项，编译并运行项目。

    **Windows 系统选用 MSVC2017 组件；macOS 系统使用默认的 Clang 即可。**

    <Warning title="注意">

    如果您在 Windows 环境下使用 MSVC 编译，需要将 Qt 的 “qt\Tools\QtCreator\bin\libssl-1_1-x64.dll” 文件、以及 "qt\Tools\QtCreator\bin\libcrypto-1_1-x64.dll" 文件，复制到 "Qt\Qt5.12.4\5.12.4\msvc2017_64\bin" 路径下，才能使用 OpenSSL 服务下载图片消息。  
    </Warning>

    <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Windows/qt_debug_icon.png" />
    </Frame>


4. 代码运行起来后，在弹出的 ZIM 对话框中，填写您的 userID（必填）、userName。
    
    首次登录时，点击 settings，在弹出的对话框中，使用本文 [3 前提条件](#3-前提条件) 已获取的 AppID 和 AppSign 正确填写，点击 update，再点击 loginZIM，登录 ZIM。

    <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Windows/login.png" />
    </Frame>

    **若您的项目已切换为 “Token 鉴权”，请在 settings 中切换为 “Token 鉴权”（默认为 AppSign 鉴权），并在 [ZEGO 控制台](https://console.zego.im) 上，申请临时 Token 用于调试。**
