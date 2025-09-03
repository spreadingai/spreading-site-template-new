# 用户监测

- - -
用户监测帮助您从用户视角回溯分析用户生命周期内的音视频体验。可查看用户的房间足迹，一览用户推拉流和行为事件信息，评估用户体验，定位分析音视频质量问题及其根因，最终帮助您解决问题，提升用户体验。

## 功能概述

用户监测包括以下 2 个子页面，分别承载不同功能：

|子页面|功能|
|--|--|
|检索页|<ul><li>通过用户 ID 检索，您可以获取此用户在查询时间内登录的所有房间列表。</li><li>通过房间 ID 检索，您可以获取此房间在查询时间内的所有登录用户列表。</li></ul>|
|用户详情页|<ul><li>了解用户在特定房间生命周期内的在线状态、用户行为以及异常情况，建立用户行为画像。</li><li>一览用户推拉流，了解用户推拉流先手顺序以及各条流时间长短，查看推拉流质量，定位用用户体验较差的流。</li><li>查看推拉流质量数据，分析用户音视频体验异常原因，解决问题，提升用户体验。</li></ul>|


## 访问步骤
1. 登录 [ZEGO 控制台](https://console.zego.im)，从左侧导航栏进入星图；
2. 在导航栏点击“用户监测”，即可访问 [检索页](#检索页)；
3. 在检索结果中点击“查看用户质量”，进入 [用户详情页](#用户详情页) 查看用户质量。

## 检索页

### 页面示例
1. 通过 用户ID 检索

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/jiansuo_yonghuID.png" /></Frame></Frame>

2. 通过 房间ID 检索

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/jiansuo_fangjianID.png" /></Frame></Frame>

### 功能介绍
1. 查看用户房间足迹

    在检索页输入用户 ID，调整时间范围，点击查询，您可以一览用户在指定时间范围内进入的所有房间，查看房间 ID 、房间起止时间以及用户在推拉流时使用的平台信息。

    <Note title="说明">

    房间起止时间，是指用户登录和登出此房间的时刻。若用户存在多次登录登出情况，取用户首次登录房间和最后一次登出房间的时间作为房间起止时间。
    </Note>

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/yonghuIDjiansuoshili.png" /></Frame></Frame>

2. 查看指定房间生命周期内的所有用户

    在检索页输入房间 ID，调整时间范围，点击查询，您可以查看房间生命周期内的所有用户，了解进入房间的用户体量、用户登录及登出房间时间，以及用户在房间内推拉流所使用的平台。

    星图会主动识别房间内发生异常的用户，您可以通过“筛选异常用户”获取异常用户列表，通过“查看用户质量”进一步查看异常问题及根因，解决用户异常。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/fangjianIDjiansuohshili.png" /></Frame></Frame>

## 用户详情页

### 页面示例

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghuxiangqingye.png" /></Frame></Frame>

### 功能介绍

**查看用户在房间内的在线状态**

在时间轴区域里，第一条轴表示用户在房间内的在线状态，您可以借此查看用户在线时段（天蓝色）以及退出房间时段（灰色），清晰直观了解用户在房间中是否存在多次进出的情况，了解用户在线持续状态。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/fangjianshijianzhou.png" /></Frame></Frame>

**查看用户在此房间内的推拉流记录，并快速判断是否存在音视频卡顿**

在时间轴区域，从第二条轴（深蓝色）开始，展示用户在此时间内的所有推拉流记录（按流开始时刻正序排列）。您可以由此了解每条流的开始、结束时刻、推/拉流的时长，以及同一条流用户是否存在多次推/拉流的情况。

星图为您标记出拉流过程中的卡顿时段（浅红色），从而帮助您快速定位影响用户体验的流，您可以进一步查看流质量数据，分析影响体验的问题根因。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/liushijianzhou.png" /></Frame></Frame>

**查看用户生命周期内的用户行为，还原用户互动场景，分析用户音视频体验**

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/yonghuxingwei.png" /></Frame></Frame>

时间轴区域的第一条轴还会显示用户行为（黄色标识），以便您了解用户在不同时刻的操作行为，分析判断音视频质量问题是否与用户行为有关。下表列举部分典型行为事件：

|行为事件|事件描述|
|-|-|
|打开/关闭麦克风|推流用户打开或关闭麦克风可能会导致拉流端用户听不到声音。|
|打开/关闭摄像头|推流用户打开或关闭摄像头可能会导致拉流端用户看不到画面。|
|打开/关闭扬声器|拉流用户打开或关闭扬声器可能会导致听不到声音。|
|切换 APP 至前后台|用户切换前后台可能导致推/拉流中断。|
|切换网络类型|切换网络类型可能导致网络质量变化。|

**低门槛、高效、快速定位异常，分析异常根因，解决异常**

星图会主动识别用户生命周期内的异常事件，并根据严重程度将事件区分为“异常”和“提醒”，帮助您快速定位异常，了解异常详情及原因，解决异常。

您可以通过以下任一方式查看异常事件：
- 在“用户诊断”模块中点击各个分类下的“异常”、“提醒”事件，查看事件详情；
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/zizhuzhenduan.png" /></Frame>
- 在时间轴区域，将鼠标悬停在各时间轴上的红色时段，了解当前时刻对应的异常事件信息。
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/yichangshijian.png" /></Frame>


**查看流质量数据，分析定位影响音视频质量原因**

在时间轴区域，选择你想要查看的流，点击对应的流时间轴，即可以在下方区域查看此条流的详细质量数据，包括：
- 用户基本信息
- 码率
- 帧率
- 丢包率
- 延迟
- CPU 使用率
- 内存使用量
- 分辨率
- 麦克风输入音量（推流端数据）
- 扬声器输出音量（拉流端数据）
- 用户音频体验（拉流端数据）

您可以前往 [数据说明](/analytics-dashboard/guides/communication-insights/data-explanation) 查看各个指标的详细介绍。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghujiance/liuzhiliangtubiao.png" /></Frame>

**查看推/拉流配置信息**

查看用户在推拉流时候的配置信息，帮助您分析判断推/拉流配置设置是否正常，通话过程中配置项对应配置值是否发生变化，从而判断音视频质量变化是否和配置有关。

配置信息按照推/拉流的周期展示，若用户推拉流多次，则会展示多条记录。

<Note title="说明">

当前仅支持查看 Native、Web 平台的配置信息。
</Note>

<Frame width="512" height="auto"><img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/b319f9874d.png" /></Frame>

**查看流影响规模**

查看推流质量数据，可以查看累计拉流用户数（区分 RTC 或 CDN）来评估此条流影响的规模。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Scale.png" /></Frame>

**跟踪拉流用户**

跟踪推流对应的拉流用户，并分析拉流用户质量，可以点击“查看拉流汇总”，前往推流质量页了解相关数据。有关该页面的介绍，详情请参考 [通话洞察](/analytics-dashboard/guides/communication-insights/function-introduction#推流质量页)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Stream_playing.png" /></Frame>

**查看通话互动质量**

查看通话互动质量，详细了解通话用户间的互动详情，可点击“查看端到端质量”，前往端到端质量页了解相关数据。有关该页面的介绍，详情请参考 [通话洞察](/analytics-dashboard/guides/communication-insights/function-introduction#端到端详情页)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/End2End.png" /></Frame>
