# 排查分析卡顿是由拉流端（观众）网络不佳导致

- - -

## 概述

卡顿是音视频通话过程中最常见的异常体验之一，主要发生在拉流端（观众）。由于造成卡顿的原因很多，本文介绍如何使用星图分析确定，用户通话过程的卡顿是否由拉流端下行网络质量不佳导致。

## 排查步骤

<Note title="说明">

排查卡顿原因前，请参考 [通话洞察](/analytics-dashboard/guides/communication-insights/function-introduction) 了解 星图 - 通话洞察 模块的相关功能。
</Note>

### 1 定位目标流

1. 提前获取卡顿通话的相关信息，尽可能包含：拉流用户 ID、流 ID、通话开始时间，以及通话结束时间。

2. 进入通话洞察 - 检索页，定位目标流，选择目标 App，输入提前获取的拉流用户 ID、或者流 ID，以及通话时间，检索获取流列表信息。

    下图以流ID为例，检索结果示例如下：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/2_dingweimubiaoliu.png" /></Frame>


### 2 分析卡顿是否属于用户特例

用户反馈存在卡顿问题后，开发者需要分析该问题是个例问题，还是普遍问题。为确认卡顿是否属于用户个例，开发者可以在推流质量页对比问题用户与其他拉流用户的码率数据：Prism

- 若仅有此用户在该时刻拉流时产生卡顿，其余用户在相同时间没有卡顿，可判断为卡顿为个例问题，如下图所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/4_kadungeli.png" /></Frame>

- 若在相同时刻，所有拉流用户码率图表均出现了卡顿，及接收码率产生了相似波动，且推流用户的发送码率同时也出现了相似波动，则造成卡顿的原因可能是因为推流侧质量波动导致，此刻所有的拉流用户均产生了卡顿，属于普遍问题，需要进一步排查推流端质量波动原因，如下图所示：

  <Accordion title="普遍卡顿问题的码率与卡顿率示意图" defaultOpen="false">
      <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/3_suoyouyonghukadun.png" /></Frame>
  </Accordion>




### 3 排查确认卡顿是否是由拉流用户下行网络抖动导致

确认卡顿属于用户个例问题后，进入端到端页面，分析卡顿是否是由问题用户下行网络异常导致。分析排查思路如下：

1. 排查拉流端接收码率、帧率是否正常，判断音视频数据传输是否正常。

    - 在卡顿时段内，接收码率、帧率数据发生异常波动，说明接收端接收音视频数据发生异常，如下图所示：

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/5_zhenmalvyichang.png" /></Frame>

    - 在卡顿时段内，接收码率、帧率数据未发生异常波动，接收数值和发送端数据相近，符合预期，则说明音视频数据传输正常，卡顿可能是其他原因导致，需要从其他方向排查，如下图所示：

    <Accordion title="拉流端接受码率及帧率正常示意图" defaultOpen="false">
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/6_zhenmalvzhengchang.png" /></Frame>
    </Accordion>

2. 确认接收帧率、码率数据传输异常，排查分析造成异常的原因。

    可能有以下三个原因：

    - 是否由用户的特殊行为导致？

        例如，用户在帧率、码率变化前后关闭/开启网络，导致网络状态发生变化，可通过用户行为轴查看对应时刻是否有特殊的用户行为。

    - 是否因为配置发生了变化导致？

        可通过查看配置表，确认在码率、帧率变化前后是否存在某些配置的变更导致码率、帧率变化。

    - 是否是因为网络异常导致音视频数据传输异常？

        查看端到端延迟、端到端丢包率在码率、帧率变化时段是否产生异常波动，确认数据传输过程中网络是否存在异常。

        1. 端到端延迟和端到端丢包率没有异常波动，延迟数值在某一特定值附近小范围波动，丢包趋近于 0，数据曲线波动趋势较小，图表曲线表现平滑稳定，则基本可以判断网络链路没有异常，如下图所示：

            <Accordion title="网络链路正常示意图" defaultOpen="false">
                <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/8_duandoduanzhengchang.png" /></Frame>
            </Accordion>

        2. 端到端延迟数据出现了突变（例如陡升），曲线有明显的突出区域，同时丢包数据异常增大，图表曲线有明显升降波动，基本可以判断网络链路产生异常，如下图所示：

            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/11_duandaoduanyichang.png" /></Frame>

3. 确认卡顿是由网络异常导致，查看下行延迟和下行丢包，进一步确认网络异常是否发生在观众下行网络。

    - 如果下行延迟数值出现明显波动，下行丢包率数据异常陡升，数据曲线呈明显起伏，可判断用户在卡顿时刻的下行网络异常，如下图所示：
                
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/13_xiaxingyichang.png" /></Frame>

    - 如果下行延迟在某一数值附近小范围波动，曲线没有明显的陡升表现，丢包数据趋近于 0，可判断用户在卡顿时刻的下行网络正常，可能是其余传输阶段的网络异常问题，如下图所示：
        
        <Accordion title="下行网络正常示意图" defaultOpen="false">
            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/10_xaixingzhengchang.png" /></Frame>
        </Accordion>

## 解决方案

通过以上排查步骤，确认卡顿是由观众端下行网络异常导致后，可以引导用户通过以下手段解决：
- 切换质量更佳的网络。
- 移动设备靠近 Wi-Fi 路由器。
- 若用户在户外，可走到更开阔的地域以获取更好的移动网络。
- 其他提升网络质量方法。
