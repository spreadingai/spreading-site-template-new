# 混流

- - -

## 功能介绍

混流是指把多路音视频流从云端混合成一路流，发起混流成功后，混流接收方只需要拉取一条流就能看到房间内所有成员的画面，听到房间内所有成员的声音，详情请参考 [混流](/real-time-video-ios-oc/live-streaming/stream-mixing)。

## 计费说明

混流服务会按照您实际的混流时长来收取费用，详情请参考 [服务端混流价格说明](/real-time-video-ios-oc/over-view/price-overview/serverside-price)。


## 开通流程

1. 在“我的项目”中，单击某个项目右侧的“查看”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/Create_Project5.png" /></Frame>

2. 进入“项目配置”界面，在该界面的“服务配置”页签中切换到“实时音视频”，选中混流模块，单击“开通服务”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/101910.png" /></Frame>

    在混流配置弹窗中，选择“混流方式”，完成后点击“确定开通混流”，预计 **1～3** 分钟该服务即可生效。

<Warning title="注意">


    混流转推方式的选择：
    - 若您需要转推到 ZEGO CDN，则选择“转推到 ZEGO CDN”，需要先 [开通 ZEGO CDN](/console/service-configuration/activate-cdn-service) 才能开通混流服务。
    - 若您需要转推到自有 CDN，或者其他第三方平台，则选择“转推到第三方平台”。

</Warning>



   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/101911.png" /></Frame>

3. 配置混流开始/混流结束回调。
若您需要得知混流事件，例如混流开始和混流结束，则可以配置回调地址。
当 ZEGO 服务器开始或结束混流任务时，会通过该回调地址将对应时间通知给您，方便维护混流状态，详情请参考 [混流开始回调](https://doc-zh.zego.im/article/9329) 和 [混流结束回调](https://doc-zh.zego.im/article/9182)。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/101912.png" /></Frame>
