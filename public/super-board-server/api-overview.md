
# API 概览

- - -

超级白板服务端提供以下相关 API 接口。您可参考 [调测指南](/super-board-server/postman) 使用 Postman 快速调试下列接口。

<Warning title="注意">

1. 本文档 API 接口均为最新服务端 API v2 接口，后续相关功能的新增都会在此更新。为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新 API v2 接口。 
2. 文件转码旧版 API 仅供 **2021-09-10** 前接入的旧用户维护使用。旧版接口文档请参考 [旧版服务端 API](https://doc-zh.zego.im/article/11997)。

</Warning>

### 文件转码相关接口


|接口名称|接口功能|
|-|-|
|[请求文件转码](/super-board-server/cvt-doc)|通过本接口创建文件转码任务。|
|[查询文件转码状态](/super-board-server/query-status)|通过本接口查询文件转码任务状态。|
|[取消文件转码](/super-board-server/cancel-cvt)|通过本接口取消未开始的文件转码任务。|
|[删除文件](/super-board-server/del-file)|通过本接口将“转码后文件”或者“源文件以及转码后文件”从 ZEGO 云存储删除。|
|[文件转码状态回调](/super-board-server/file-callback)|通过本接口获取文件转码状态的事件回调。|

### 白板权限相关接口

|接口名称|接口功能|
|-|-|
|[设置房间权限](/super-board-server/set-white-board-room-auth)|调用本接口用来设置房间的默认白板权限。|
|[设置用户权限](/super-board-server/set-white-board-user-auth)|调用本接口设置用户的白板权限。|
|[查询房间权限](/super-board-server/get-white-board-room-auth)|调用本接口获取房间的默认白板权限。|
|[查询用户权限](/super-board-server/get-white-board-user-auth)|调用本接口用来获取用户的白板权限。|
