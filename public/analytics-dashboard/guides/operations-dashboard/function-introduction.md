# 功能介绍

- - -

运营大盘为您提供用户质量和用量等信息，帮助您监测、跟踪业务服务质量和规模的变化。

- 运营大盘数据更新机制为 T+1，若您需要查看实时数据，请参考 [实时监控](/analytics-dashboard/guides/real-time-monitoring)。
- 各项数据指标的含义，请参考 [数据说明](/analytics-dashboard/guides/operations-dashboard/data-explanation)。
- CDN 分析相关功能当前处于 Beta 阶段，仅供参考。

## 访问步骤

<Note title="说明">

主账号默认开通“运营大盘”功能，子账号需由主账号配置后，才能使用该功能。
</Note>

1. 登录 [ZEGO 控制台](https://console.zego.im/)，点击左侧导航栏“星图”。
2. 进入星图后，点击左侧导航栏 “运营大盘”，展开其子选项，如下：
    - [质量趋势](#质量趋势)
    - [地区质量](#地区质量) 或 [地区质量（高级）](/analytics-dashboard/guides/operations-dashboard/regional-quality(pro).mdx)
    - [运营规模](#运营规模)
    - [群体画像](#群体画像)
3. 选择任意选项，进入页面。例如选择“质量趋势”，选择 AppID 和想要查询的时间范围，点击“查询”，即可查看相关数据。


## 质量趋势

质量趋势页面，帮助您从大盘视角跟踪、查看业务表现，实现以下功能：

- 在“用户体验”模块中，评估用户体验的基本情况，查看不同时间段内的数据变化（流畅度、进房耗时等），分析音视频体验的变化趋势。
- 在“服务可用性”模块中，查看 ZEGO 房间服务和流媒体服务状态，评估服务可用性，分析现网是否出现服务异常的情况。

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_1.png" /></Frame>

### 功能介绍

**用户体验**

“用户体验”模块提供了“流畅度”、“进房耗时”和“用户音频体验”等相关数据，帮助您了解用户音视频体验的基本情况。

1. 流畅度支持平台、音视频类型、拉流源三个维度的数据筛选，您可以查看不同条件下对应的流畅度数据。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/liuchangdushaixuan.png" /></Frame>

2. 您可以根据需求将流畅度切换为卡顿率进行查看。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/qiehuankadun.png" /></Frame>

3. 所有图表支持“曲线”和“分布”两种展示形式。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/qiehuanfenbutu.png" /></Frame>

4. 流畅度、首帧耗时、用户音频体验三个图表支持对比分析，您可以设置不同的条件对比查看数据。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/duibifenxi.png" /></Frame>

**服务可用性**

“服务可用性”模块提供了“推流成功率”、“拉流成功率”等多项数据，帮助您了解现网服务状态和异常情况。

1. 推流成功率支持筛选查看不同推流目标对应的数值。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/tuiliumubiao.png" /></Frame>

2. 拉流成功率支持筛选查看不同拉流源对应的数值。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/laliuyuan2.png" /></Frame>


## 地区质量

在“地区质量”页面，您可以查看不同地区的音视频质量，查看某地区的质量变化趋势，帮助您监测、分析各个地区的运营质量；同时支持查看某个地区的端到端拉流详情，了解该地区的拉流分布状况。

<Warning title="注意">

地区质量监控功能分基础和高级两种，**免费版用户仅支持使用基础功能，专业版和旗舰版用户支持使用高级功能。**

本文仅介绍基础功能，如果您想了解高级功能，请参考 [地区质量（高级）](/analytics-dashboard/guides/operations-dashboard/regional-quality(pro).mdx) 。
</Warning>


### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/diquwangluo.png" /></Frame>

### 功能介绍

1. 支持筛选查看不同拉流源对应的质量数据。拉流源包括 RTC、CDN、L3 和 CDN Plus。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/laliuyuan.png" /></Frame>

2. 地区分为“中国-大陆”和“全球”，“中国-大陆”可查看国内的各个省份，“全球”可具体到各个国家。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/shaixuandiqu.png" /></Frame>

3. 当您选择地区为“全球”后，根据您的业务运营覆盖范围，您可以自定义列表展示的地区。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/zidingyi.png" /></Frame>

4. 点击“查看地区明细”，您可以查看该地区所有拉流的端到端质量数据，了解该地区的拉流来源以及音视频质量。下图为点击“查看地区明细”后，展示的某地区端到端拉流数据。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/duandaoduan.png" /></Frame>

5. 点击“查看趋势”，您还可以查看该地区在最近一段时间内的质量变化。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/chakanqushi.png" /></Frame>

## 运营规模

“运营规模” 页面，为您提供每日房间、用户、推拉流数量，帮助您实时监测、跟踪业务规模的变化。

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_2.png" /></Frame>

### 功能介绍

**用户与房间**

在“用户”、“房间”两个模块，您可以查看用户和房间的每日日活数和并发数，用于分析用户规模的变化。“用户日活”图表支持按照“全部用户”、“推流用户”、“拉流用户”三个不同的维度查看每日数据。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghurihuoshujuleixing.png" /></Frame>

**推拉流**

在“推拉流”模块，您可以查看每日的推拉流累计数和并发数，查看推流分辨率、视频编码格式以及拉流源的分布详情，以便了解每日推拉流的基本规模和分布。

1. 在“推流数”图表，您可以在“筛选”下拉框选择“推流目标”，查看用户推向不同目标服务对应的推流数；选择“地区”，您可查看不同地区的推流数。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/tuiliumubiao2.png" /></Frame>

2. 在“拉流数”图表，您可以在“筛选”下拉框选择“拉流源“，查看用户从不同服务拉流对应的拉流数；选择“地区”，您可查看不同地区的拉流数。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/laliuyuan3.png" /></Frame>

## 群体画像

“群体画像” 页面，您可以根据用户使用的平台、SDK 版本以及所在地区统计用户分布情况，描绘用户的基本画像。

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/quntihuaxiang.png" /></Frame>

### 功能介绍

1. “平台-SDK版本分布”模块中，支持切换单列、双列的内容展现形式。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/danlieshuanglie.png" /></Frame>

2. “地区用户分布” 模块中，支持查看目标地区在某段时间内的变化趋势和峰值占比。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/yonghuzhanbiqushi.png" /></Frame>
