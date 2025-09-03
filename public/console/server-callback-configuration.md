# 服务端回调配置

- - -

当您需要获知一些状态和事件时，可以参考本文档配置回调。


1. 在“概览”>“我的项目”中，单击一个项目右侧的“查看”按钮，进入“项目配置”页面。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/781.png" /></Frame>

2. 在“项目配置”页面选择“服务端回调配置”，单击一个事件右侧的“编辑”编辑按钮，会弹出“编辑回调地址”窗口。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/server_callback_config.png" /></Frame>

3. 在窗口中输入对应回调地址，完成后单击“确定”。
- 流事件：当 App 开始或停止推流时，ZEGO 后台服务会将相关流事件通知给您，用于维护直播房间列表，详情请参考 [流创建回调](https://doc-zh.zego.im/article/9175) 和 [流关闭回调](https://doc-zh.zego.im/article/9174)。
- 房间登录/退出回调：当需要了解目前房间内的人数时，可以通过回调分析用户登录/退出房间的情况，详情请参考 [登录房间回调](https://doc-zh.zego.im/article/13766) 和 [退出房间回调](https://doc-zh.zego.im/article/13767)。
- 房间创建/关闭回调：当开发者需要了解某个房间创建或关闭的相关信息时，可以通过本回调获取，详情请参考 [房间创建回调](https://doc-zh.zego.im/article/16827) 和 [房间关闭回调](https://doc-zh.zego.im/article/16829)。
- 录制文件回调：当开发者有直播的回看功能的需求时，在开启后台录制的功能后，APP 在 CDN 上有流被录制完成时，将会以 POST 的形式对回调地址进行请求，详情请参考 [录制文件生成回调](https://doc-zh.zego.im/article/9178)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/callback_url_setting.png" /></Frame>
