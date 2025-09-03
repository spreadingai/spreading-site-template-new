# 功能介绍

- - -

借助房间总览，您可迅速查看房间生命周期与在房用户质量，通过线上概览筛选问题房间，使用通话诊断、用户分析、流列表等功能模块定位质量问题，剖析房间推拉流潜在异常 。

## 功能概述

房间总览包括以下 2 个子页面，分别承载不同功能：

| 子页面       | 功能                                                                                     |
|--------------|------------------------------------------------------------------------------------------|
| 检索页       | 检索页可展示房间关键指标，帮助用户快速了解房间在房人数、卡顿率等基本信息；支持按多种条件筛选房间，便于定位关注的房间，进一步调查房间质量详情。 |
| 房间详情页   | 展示房间生命周期的关键指标变化趋势，提供通话诊断、用户分析、流列表工具，帮助开发者全面掌握房间的运行状况，快速定位音视频卡顿等质量问题，以便针对性优化，提升用户体验。 |

## 访问步骤

1. 登录 [ZEGO 控制台](https://console.zego.im/)，从左侧导航栏进入星图；
2. 在导航栏点击“房间总览”，即可访问“检索页”。

## 检索页

### 页面示例

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/86664d3174.png" />
</Frame>

### 功能介绍

1. 选择 AppID（必需），输入房间 ID、用户 ID 或流 ID（可选），选择需要查询的时间范围，点击查询，即可获取该时间范围内的房间记录列表（即检索结果）。
2. 支持多个筛选条件组合查询，或者缩小查询的时间范围，都可以更精准地搜索房间记录信息。

    <Frame width="auto" height="auto">
      <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/f5878045fb.png"/>
    </Frame>
3. 点击右侧高级按钮，可配置高级筛选条件，更方便地找到关注的房间。

    <Frame width="auto" height="auto">
      <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/4287fd3f26.png" />
    </Frame>

4. 房间记录列表展示的字段包括：房间ID、峰值在房人数、当前在房人数、音频卡顿率、视频卡顿率、房间起止时间、操作；支持对峰值在房人数、当前在房人数、音频卡顿率、视频卡顿率字段排序，默认按峰值在房人数排序。

    <Frame width="auto" height="auto">
      <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/3ab2b82535.png" />
    </Frame>

5. 选择目标房间，点击“查看房间总览”，即可进入房间详情页。

## 房间详情页

### 页面示例

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/132117b237.png" />
</Frame>

### 功能介绍

#### 查看房间基础信息

房间详情页最上方为房间基础信息模块，展示包括房间持续时间、当前在房人数、峰值在房人数、累计在房人数、累计推流人数、音/视频卡顿率等基础指标，帮助用户快速了解房间规模、在房用户体验。 

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/bc434adc62.png" />
</Frame>

<Note title="说明">如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/room-overview/data-explanation)。</Note>

#### 查看房间体验趋势

房间基础信息下方为房间体验趋势模块，展示在设定时间范围内房间的在房人数、推流并发、音频卡顿率和视频卡顿率的动态变化趋势。通过直观的图表，用户能够清晰地观察到各指标随时间的波动情况，便于分析房间运行过程中的规律和异常点。

<Note title="说明">如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/room-overview/data-explanation)。</Note>

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/6cfba2364d.png" />
</Frame>

- 在房人数图表呈现了房间生命周期时间内的在房人数、音频卡顿人数、视频卡顿人数的变化趋势和关联关系，便于您确认是否存在大规模严重卡顿问题，点击悬浮窗“查看此刻音/视频卡顿用户”可快速跳转用户分析模块，用于进一步了解出现卡顿的用户信息，便于分析房间内音视频质量状况 。

    <Frame width="auto" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/132e0bb695.png"/>
    </Frame>

- 推流并发图表呈现了房间生命周期内的推流数变化趋势，便于您判断是否由于推/拉流路数导致用户体验问题，点击悬浮窗“查看此刻推流列表”可快速跳转流列表模块，查看更多相关流信息。 

    <Frame width="auto" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/9e9a862aed.png"/>
    </Frame>

- 音/视频卡顿率图表呈现了房间内所有用户的拉流卡顿均值，图表支持“曲线”和“分布”两种展示形式，点击分布图悬浮窗“查看区间卡顿用户”，可快速跳转用户分析模块。

    <Frame width="auto" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d7cff2272d.png"/>
    </Frame>

#### 通话诊断

通话诊断模块包含卡顿分布和异常主播两大功能，帮助您快速发现关注的大规模卡顿和主播异常：

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d66eb25153.png" />
</Frame>

- 卡顿分布

    监测并展示房间内音视频卡顿的时间和来源信息。可以精准定位超过 10% 用户出现音/视频卡顿的具体时间点或时间段，还能指出音/视频卡顿较高的国家地区、拉流源、系统平台等，助力开发者快速掌握卡顿分布状况，为排查和解决卡顿问题提供方向。
- 异常主播

    智能识别房间内存在异常情况的主播。列出异常主播的用户 ID、推流时长以及具体的异常现象，如异常退出房间等。
    
    点击 “查看用户详情” 按钮即可跳转星图用户监测详情页，方便您进一步了解异常主播的详细情况，从而及时处理主播异常问题，保障房间内音视频服务的正常运行 。

#### 用户分析

用户分析模块中，用户列表和分布统计功能为开发者提供了全面且细致的用户数据洞察能力，具体如下：
- 用户列表  
    - 用户列表以表格形式呈现在房拉流用户的信息概览，包括用户 ID、在房时间、音频卡顿率、视频卡顿率、拉流源、用户地区、网络类型、平台版本。通过这些数据，开发者可以快速了解单个用户在房间内的音视频体验状况、用户基本信息等。
        <Frame width="auto" height="auto"><img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/fe9226d9a5.png" /></Frame>
    - 由于部分场景下房间内拉流用户较多，故用户列表一次最多返回 200 条数据，您可通过用户 ID 查询及用户列表表头的筛选、排序功能，找到关注的数据，如下图筛选地区为菲律宾，并按照音频卡顿率由高到低排序。
        <Frame width="auto" height="auto">
          <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/b9498fd179.png" />
        </Frame>
    - 点击 “查看用户详情”，跳转星图用户监测详情页，获取该用户质量明细信息，便于针对性地分析个体用户问题。
- 分布统计  

    分布统计功能对全量用户量、卡顿数据从不同维度进行拆解，为您呈现多面的分析视角，便于分析房间整体通信情况，从而有针对性地优化不同维度下的服务质量，提升用户体验。

    <Frame width="auto" height="auto">
      <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/652e0af12f.png" />
    </Frame>

#### 流列表

流列表模块以流维度汇总了房间内的每条音视频流的用户体验和用量情况，可以帮准您快速确认用户卡顿是否由推流方或中间链路造成。

点击 “查看用户详情”，跳转星图通话洞察推流详情页，获取该流的质量明细信息，便于针对性地分析流维度问题。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/321bc7c463.png"/>
</Frame>