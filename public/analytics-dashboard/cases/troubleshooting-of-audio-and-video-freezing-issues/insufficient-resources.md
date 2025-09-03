# 排查分析卡顿是由拉流端（观众）设备 CPU或内存资源不足导致

- - -

## 概述

卡顿是音视频通话过程中最常见的异常体验之一，主要发生在拉流端（观众）。由于造成卡顿的原因很多，本文介绍如何使用星图分析确定，用户通话过程的卡顿是否由拉流端（观众）设备CPU或内存资源不足导致。
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


### 3 排查确认卡顿是否是由拉流端（观众）设备CPU或内存资源不足导致
确认卡顿属于用户个例问题后，进入端到端页面，分析卡顿是否是由拉流端（观众）设备CPU或内存资源不足导致。分析排查思路如下：

1. 排查拉流端接收码率、帧率是否正常，判断音视频数据传输是否正常。
    - 在卡顿时段内，接收码率、帧率数据发生异常波动，说明接收端接收音视频数据发生异常，需要进一步排查数据传输异常原因，如下图所示：

      <Accordion title="接收端帧率、码率异常示意图" defaultOpen="false">
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/5_zhenmalvyichang.png" /></Frame>
      </Accordion>

    - 在卡顿时段内，接收码率、帧率数据正常，接收数值和发送端数据相近，符合预期，则说明音视频数据传输正常，卡顿大概率是本地渲染异常导致，如下图所示：
        
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/6_zhenmalvzhengchang.png" /></Frame>

2. 确认 SDK 接收音视频码率数据正常，则卡顿大概率是由渲染异常导致。您可以通过以下方式分析确认是否是用户设备在渲染音视频时资源不足导致无法正常渲染音视频，从而造成卡顿。
    
    - 查看设备 `CPU使用率` 在卡顿时间段内的使用情况是否正常。
        - 若用户设备 `CPU使用率` 在卡顿时间段出现高占用（高于 80%），可初步判断渲染异常可能是属于 `CPU使用率` 较高，无法正常渲染音视频导致卡顿，如下图所示：
            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/shebeifuzaiyichang.png" /></Frame>
        - 若用户设备 `CPU使用率` 在卡顿时间段正常，说明渲染异常不是因为 `CPU资源` 不足导致，继续排查可能导致渲染异常的原因。

    - 查看 `设备内存使用量` 在卡顿时间段内的使用情况是否正常。
        - 对比查看 `内存总量` 和当前的 `系统内存使用量`数据。`系统内存使用量` 曲线处于高水位并接近内存总量，说明系统内存资源不足，可能导致音视频渲染异常，产生卡顿情况，如下图所示：

            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/xingtu_anli/kadunpaicha_xiaxingwangluo/neicunshiyongliangyichang.png" /></Frame>

        - 若当前的 `系统内存使用量` 较低，说明内存资源充足，则可基本判断卡顿根因和内存使用情况无关。

### 4 解决方案

通过以上排查步骤，如果您判断卡顿可能是因为设备资源不足导致，可以引导用户通过以下手段解决：
  - 关闭部分不必要的软件，以释放 CPU 资源观察是否能改善卡顿状况。
  - 删除部分不必要的文件，以释放内存资源观察是否能改善卡顿状况。
  - 重启 App 或设备，观察是否能改善卡顿状况。
  - 其他改善设备资源使用情况的方法。
