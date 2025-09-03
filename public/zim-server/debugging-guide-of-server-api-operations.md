# 服务端 API 调测指南

- - -

在本文中我们为您介绍如何使用 Postman 调测服务端 API。

Postman 是一款 API 调测工具，可在让开发者在图形化界面中方便、直观地调测服务端 API。

为便于开发者调测 ZIM 的服务端 API，我们提供了对应的 Postman Collection，预先定义好了每个接口的请求参数，开发者导入后仅需修改参数取值即可调测。


## 前提条件

- 已经下载并安装了 [Postman](https://www.postman.com/downloads/)。
- 已经下载并解压了 [ZIM 服务端 API 的 Collection](https://artifact-sdk.zego.im/zim/postman/ZIM_postman_collection.zip)。
- 已经登录 [ZEGO 控制台](https://console.zego.im) 获取了调用接口所必须的 AppId 和 ServerSecret 等信息。

<Warning title="注意"> 

- Postman 在不同平台的客户端界面会略有差异，本文以 macOS 平台上的 Postman 为例进行介绍。
- 本文提供的 Collection 仅供调测使用，并未包含所有服务端 API。
</Warning>


## 导入并配置 Collection 

1. 单击 "Import"，将解压 Collection 获取到的两个 json 文件一起导入进 Postman。
    ![/Pics/ZIM/postman/postman_import.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_import.png)

2. 在 Postman 右上角，将环境设置为 "ZIM"。
    ![/Pics/ZIM/postman/postman_env.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_env.png)

3. 在左侧选择 “Environments”，选择 “ZIM” 环境，将 [1 前提条件](#1-前提条件) 中获取的 AppID 和 ServerSecret 设置到对应环境变量的 “CURRENT VALUE” 中，修改完成后，点击 “Save” 保存。
    ![/Pics/ZIM/postman/postman_setenv.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_setenv.png)


## 调测接口

在本节中，我们以几个接口为例介绍如何使用 Postman 调测服务端 API。

<Note title="说明">

以下过程中，修改参数值时，部分参数的 “VALUE” 中的双括号 “\{\{xxxx}}”，表示参数值为环境变量，无需手动修改。
</Note>

### 查询用户在线状态

此 API 用于查询用户的在线状态。

1. 在 Collections 中选择 “QueryUserOnlineState”，根据 [服务端 API - 查询用户在线状态](/zim-server/user/query-users-online-status) 修改 Param 中参数的取值。
    ![/Pics/ZIM/postman/postman_QueryUserOnlineState.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_QueryUserOnlineState.png)

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。
    ![/Pics/ZIM/postman/postman_QueryUserOnlineState_response.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_QueryUserOnlineState_response.png)


### 发送房间消息

此 API 用于向房间内发送消息。

1. 在 Collections 中选择 “SendRoomMessage”，根据 [服务端 API - 发送房间消息](/zim-server/room/obtain-information-about-users-in-a-room) 修改 Param 中参数的取值。
    ![/Pics/ZIM/postman/postman_SendRoomMessage.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_SendRoomMessage.png)

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。
    ![/Pics/ZIM/postman/postman_SendRoomMessage_response.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_SendRoomMessage_response.png)


### 移除房间成员

此 API 用于将房间内的某个用户移除出去。

1. 在 Collections 中选择 “KickoutRoomUser”，根据 [服务端 API - 移除房间成员](/zim-server/room/remove-user-from-the-room) 修改 Param 中参数的取值。
    ![/Pics/ZIM/postman/postman_KickoutUser.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_KickoutUser.png)

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。
    ![/Pics/ZIM/postman/postman_KickoutUser_response.png](https://doc-media.zego.im/sdk-doc/Pics/ZIM/postman/postman_KickoutUser_response.png)
