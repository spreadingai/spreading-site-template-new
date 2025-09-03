# CDN

- - -

<Warning title="注意">


- 若您已有 CDN，则无需重复开通 ZEGO CDN 服务，只需联系 ZEGO 技术支持配置自定义转推功能后，调用 [addPublishCdnUrl ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#add-publish-cdn-url) 接口传入完整的 CDN 地址即可，详情请参考 [使用 CDN 直播](/real-time-video-android-java/live-broadcast-capability/relay-to-cdn)。
- 若您没有 CDN，则可以参考本文档开通 ZEGO CDN。

</Warning>




## 功能介绍

ZEGO 支持推流到 CDN（Content Delivery Network，内容分发网络），可实现以下场景：
- CDN 推拉流：将音视频流从 ZEGO 音视频云推送到 ZEGO 自有 CDN 或第三方 CDN，观众再通过 CDN 进行拉流，适用于大规模直播或观看等场景，详情请参考 [使用 CDN 直播](/real-time-video-android-java/live-broadcast-capability/relay-to-cdn)。
- CDN 录制：将音视频流推送到 CDN，由 CDN 厂商实现录制并输出录制文件，该文件可以通过录制文件回调地址获取，常用于直播回放等场景。
- CDN 截图：将音视频流推送到 CDN，按照设置的频次（比如 10s 截一次）截图并输出截图文件，该文件可以通过截图文件地址获取，常用于鉴黄等场景。

## 计费说明

CDN 服务会产生相关的耗量和费用，详情请参考 [CDN 直播价格说明](/real-time-video-android-java/over-view/price-overview/cdn-live-price-description)。

## 开通流程

1. 在“我的项目”中，单击某个项目右侧的“查看”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/Create_Project5.png" /></Frame>

2. 进入“项目配置”界面，切换到“ZEGO CDN“，点击”开通服务“。随后，在弹出的“开通CDN服务”窗口中单击“确定开通CDN服务”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10211.png" /></Frame>

3. 按照如下流程开通和配置 ZEGO CDN。
    <Steps>
    <Step title="申请开通 ZEGO CDN">
    填写服务域名和服务地区，确认无误后单击“下一步”。
    - 服务域名：推荐使用二级域名。
    - 服务地区：业务的主要分布地区，分为中国大陆、全球、海外或港澳台。
    <Warning title="注意">
    应监管要求，若服务地区为中国大陆或全球，ZEGO 会进行备案校验，该过程预计需要 **15** 秒，校验无误后可以进入下一步操作。
    </Warning>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10212.png" /></Frame>

    </Step>
    <Step title="配置用途">
    1. 根据您的实际需要选择 CDN 的用途。
        - 默认转推： 开启后，音视频流推向 ZEGO 实时云后，默认转推到 CDN。若关闭，则需要通过旁路转推进行推流。
        - 观众拉流： 开启后，观众可通过流 ID 进行拉流；若关闭，则需要通过 URL 进行拉流。
        - 用于CDN录制：开启后，可以配置录制格式和录制存储时长。
        - 用于CDN截图：开启后，可以配置截图存储时长和截图频率。

    2. 根据您的实际需要选择是否开启推流鉴权。
        鉴权的好处在于可以防止非法用户盗取您的推流 URL 在别处推流，造成流量损失，ZEGO 强烈建议您加上推流防盗链，详情请参考 [CDN 推流鉴权](/real-time-video-android-java/live-broadcast-capability/cdn-stream-publishing-authentication)。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/page.png" /></Frame>
    </Step>
    <Step title="配置域名 CNAME">
    ZEGO 会根据您提供的域名自动生成推拉流域名、点播域名和截图域名，并自动分配 CNAME 域名，该过程需要一定时间，请耐心等待。

    <Warning title="注意">
    - 若 AppID 业务地区为中国大陆，则预计 **10** 分钟内即可返回 CNAME 信息。
    - 若 AppID 业务地区为海外或港澳台，则预计 **1.5** 个工作日内即可返回 CNAME 信息。
    </Warning>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/219.png" /></Frame>
    CNAME 域名本身不能直接访问，在 ZEGO 返回 CNAME 信息后，需要您自行在域名服务提供商处完成 CNAME 配置，详情可参考 [配置域名 CNAME](/console/configure-cname)。
    </Step>
    <Step title="完成域名 CNAME 配置">
    完成域名 CNAME 配置后，单击“我已完成CNAME，点击下发配置”，ZEGO 将会为 AppID 分配资源。预计需要 **1** 个自然日，CDN 才可以完全生效。生效后，ZEGO 会通过站内信通知您。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/CNAME_config.png" /></Frame>
    </Step>
    </Steps>

## 更新流程

### 更换服务域名

若原有的服务域名已经弃用，或者需要更换域名用于生成新的 CDN，则可以参考该流程处理。

1. 单击“服务域名”后面的编辑图标，填写新的服务域名后，单击“确定”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/server_url.png" /></Frame>

2. 根据您提交的新域名和用途配置，ZEGO 会自动生成推拉流域名、点播域名和截图域名，并自动分配 CNAME 域名，该过程需要一定时间，请耐心等待。

<Warning title="注意">


   - 若 AppID 业务地区为中国大陆，则预计 **10** 分钟内即可返回新的 CNAME 信息。
   - 若 AppID 业务地区为海外或港澳台，则预计 **1** 个半工作日内即可返回新的 CNAME 信息。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/CNAME_generation.png" /></Frame>


3. CNAME 域名本身不能直接访问，在 ZEGO 返回新的 CNAME 信息后，需要您自行在域名服务提供商处完成 CNAME 配置，详情可参考 [配置域名 CNAME](/console/configure-cname)。

4. 完成域名 CNAME 配置后，ZEGO 将会为 AppID 分配资源，预计需要 **2** 个自然日，CDN 服务才可以完全生效。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/details.png" /></Frame>

### 开通用途

如果开通 CDN 服务时未选择 CDN 的用途，CDN 服务生效后，则可以参考本流程处理。

1. 开通观众拉流
打开“用于观众拉流”开关，在弹窗中单击“确定开通观众拉流”，预计需要 **10～20** 分钟才生效。

2. 开通默认转推
打开“默认转推”开关，在弹窗中单击“确定开通默认转推”，预计需要几秒钟才生效。

3. 开通 CDN 录制或 CDN 截图
打开“用于CDN录制”或“用于CDN截图”开关，在弹窗中单击“确定”，ZEGO 会自动生成点播域名和截图域名，并自动分配 CNAME 域名，该过程需要一定时间，请耐心等待。

<Warning title="注意">


    - 若 AppID 业务地区为中国大陆，则预计 **10** 分钟内即可返回 CNAME 信息。
    - 若 AppID 业务地区为海外或港澳台，则预计 **1** 个半工作日内即可返回 CNAME 信息。

</Warning>


    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/214.png" /></Frame>

4. 在 ZEGO 返回 CNAME 信息后，CNAME 域名本身不能直接访问，需要您自行在域名服务提供商处完成 CNAME 配置，详情可参考 [配置域名 CNAME](/console/configure-cname)。


### 关闭用途

如果开通 CDN 服务时选择了 CDN 的用途，CDN 服务生效后想要关闭用途，则可以参考此流程处理。
关闭“用于CDN录制”或“用于CDN截图”开关，在弹窗中按需选择保留或清除文件资源后，单击“确定关闭CDN服务”，关闭用途预计 **10** 分钟后才能生效。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/215.png" /></Frame>

### 编辑截图或录制配置信息/服务地区

单击“用于CDN截图”或“用于CDN录制”后面的编辑按钮，在弹窗中确认编辑内容后，单击“确定”。
编辑信息后，完全生效需要一定时间，请耐心等待。

<Warning title="注意">


- 若 AppID 业务地区为“中国大陆”，则该过程预计需要 **10** 分钟。
- 若 AppID 业务地区为“海外或港澳台”，则该过程预计需要 **1** 个半工作日。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/216.png" /></Frame>

## CDN 相关地址

ZEGO 会根据您开通的用途，提供对应的推拉流、点播和截图的完整地址，方便您通过第三方工具或非 ZEGO SDK 进行推拉流时使用。


CDN 相关地址默认为 HTTP 格式，若您出于安全考虑，或者想使用 Web 端进行 CDN 观众拉流，则需要配置 HTTPS，可以在如上界面单击“未配置”打开 HTTPS 配置弹窗：
- 证书名称：自定义，方便您区分多个证书。
- 证书内容：参考 SSL 证书提供的即可。
- 证书密钥：参考 SSL 证书提供的即可。
- 过期时间：在您的证书即将过期的前 **10** 天或过期当天，ZEGO 会发送站内信或通过您所注册的邮箱通知您，方便您及时更新，避免影响正常使用。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/217.png" /></Frame>
