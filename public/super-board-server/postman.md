# 调测指南

- - -

在本文中我们为您介绍如何使用 Postman 调测服务端 API。

Postman 是一款 API 调测工具，可在让开发者在图形化界面中方便、直观地调测服务端 API。

为便于开发者调测超级白板的服务端 API，我们提供了对应的 Postman Collection，预先定义好了每个接口的请求参数，开发者导入后仅需修改参数取值即可调测。

##  前提条件

- 已经下载并安装了 [Postman](https://www.postman.com/downloads/)。
- 已经下载并解压了 [超级白板服务端 API 的 Collection](https://artifact-sdk.zego.im/SuperBoardSDK/Resources/superboard_postman_collection.zip)。
- 已经登录 <a target="_blank" href="https://console.zego.im/">ZEGO 控制台</a> 获取了调用接口所必须的 AppId 和 ServerSecret 等信息。

<Warning title="注意">

- Postman 在不同平台的客户端界面会略有差异，本文以 macOS 平台上的 Postman 为例进行介绍。
- 本文提供的 Collection 仅供调测使用，并未包含所有服务端 API。
</Warning>

##  导入并配置 Collection

1. 单击 "Import"，将解压 collection 获取的两个文件一起导入。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/import.png" /></Frame>

2. 将环境设置为 "superboard"。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/set_env.png" /></Frame>

3. 打开 “superboard” 环境，将 [前提条件](#1-前提条件) 中获取的 AppId 和 ServerSecret 设置到对应环境变量的 “CURRENT VALUE” 中，然后保存。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/set_env_value.png" /></Frame>

<Note title="说明">

如果您的 AppId 为测试环境（详见 <a target="_blank" href="/super-board-server/accessing-server-apis.mdx21-公共请求参数">调用方式</a> 中的 “2 公共参数” 中的 IsTest 的参数说明），还需要将环境变量中 “istest” 的值（上图中最后一个参数）修改为 “true”。

</Note>


##  调测接口

在本章中，我们以 4 个接口为例介绍如何使用 Postman 调测服务端 API。
<Note title="说明">

ZEGO 提供的 collection 通过环境变量和前置脚本实现了公共参数的自动填写，前置脚本可在下图位置查看，开发者开发服务端时可用于参考。

</Note>

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/pre_script.png" /></Frame>

### 请求文件转码

此 API 用于创建文件转码任务，转码任务结束后 ZEGO 会通过 [文件转码状态回调](/super-board-server/file-callback) 通知开发者转码结果，开发者也可随时通过 [查询文件转码状态](/super-board-server/query-status) 主动查询转码任务的状态。

1. 在 Collections 中选择 “StartTranscode”，根据 [请求文件转码](/super-board-server/cvt-doc) 中的参数说明修改 Body 中参数的取值。双大括号包裹的参数值为环境变量，无需手动修改。

<Note title="说明">

FileHash 除接口文档中描述获取的方法外，也可通过操作系统自带的命令手动获取：<br />打开命令行（终端），进入文件所在目录，执行下述命令(“文件名” 替换为实际要获取哈希值的文件名）。
- Macos：`md5 文件名`。
- Windows：`certutil -hashfile 文件名 MD5`。
- Linux：`md5sum 文件名`。

</Note>

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/StartTranscode.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。请注意保存响应中返回的 TaskId，后续调用其他接口需要用到该参数。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/StartTranscodeRsp.png" />
</Frame>


### 查询文件转码状态

此 API 用于查询文件转码任务的状态，转码成功后会返回转码后文件的 FileId，用于转码后文件的共享与管理。

1. 在 Collections 中选择 “DescribeTranscodeStatus”，在 Body 中填写创建转码任务时返回的 TaskId。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/DescribeTranscodeStatus.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。若响应中的 Status 为 16，表示转码成功，此时响应中还会返回 FileId，请注意保存。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/DescribeTranscodeStatusRsp.png" />
</Frame>


### 删除文件

此 API 用于删除文件，删除后的文件 FileId 会失效。

1. 在 Collections 中选择 “DeleteFile”，在 Body 中填写文件转码成功后返回的 FileId。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/DeleteFile.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/DeleteFileRsp.png" />
</Frame>


### 设置房间权限

此 API 用于设置房间的默认白板权限。在调用此接口前，开发者需要先登录房间。

<Note title="说明">

开发者可参考 [跑通示例源码](https://doc-zh.zego.im/article/11315) 运行 Demo 登录房间，也可参考 [快速开始](https://doc-zh.zego.im/article/11319) 开发自己的应用登录房间。

</Note>

1. 在 Collections 中选择 “SetWhiteboardRoomAuth”，修改 Params 中 RoomId 的值为客户端登录房间时使用的房间 ID。ModuleAuth[] 和 GraphicAuth[] 为权限枚举参数，可携带一个或多个，含义请参考 [设置房间权限](/super-board-server/set-white-board-room-auth) 中的参数说明。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/SetWhiteboardRoomAuth.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/postman/SetWhiteboardRoomAuthRsp.png" />
</Frame>
