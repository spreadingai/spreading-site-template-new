# 性能数据

- - - 

本篇报告介绍 ZEGO 实时⾳视频产品及服务在**弱网环境下的通话质量**情况和不同推拉流场景**硬件资源占用**表现，围绕开发者最关⼼的实时性、流畅性、稳定性以及 CPU、内存、耗电、发热等指标提供 ZEGO 音视频 SDK 在实际业务场景中的数据表现，并进⾏客观分析总结。

## 弱网环境下通话质量分析

### 测试环境及配置

<table>
  
  <tbody><tr>
    <td rowspan="2">设备信息</td>
    <td>iOS</td>
    <td><ul>
<li>iOS 设备 1：A13 + 6 核</li>
<li>iOS 设备 2：A11 + 6 核</li>
</ul></td>
  </tr>
  <tr>
    <td>Android</td>
    <td><ul>
<li>Android 设备 1：骁龙 835 + 8 核</li>
<li>Android 设备 2：海思 659 + 8 核</li>
</ul></td>
  </tr>
  <tr>
    <td>参数配置（编码）</td>
    <td colspan="2"><ul>
<li>分辨率：640 × 360</li>
<li>码率：600 kbps</li>
<li>帧率：15 fps</li>
</ul></td>
  </tr>
  <tr>
    <td>网络策略</td>
    <td colspan="2">开启自适应码率、自适应帧率</td>
  </tr>
</tbody></table>


### 测试场景

<table>
  
  <tbody><tr>
    <td>无损网络环境</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td rowspan="2">上行弱网环境</td>
    <td>上行丢包</td>
    <td>30%、50%、70%</td>
  </tr>
  <tr>
    <td>上行抖动</td>
    <td>200ms、400ms、1000ms</td>
  </tr>
  <tr>
    <td rowspan="2">下行弱网环境</td>
    <td>下行丢包</td>
    <td>30%、50%、70%</td>
  </tr>
  <tr>
    <td>下行抖动</td>
    <td>200ms、400ms、1000ms</td>
  </tr>
</tbody></table>


### 数据说明

此测试对音视频质量影响核心因素为网络变化，设备型号、设备搭载的操作系统影响因素较小可忽略不计，以下数据以 iOS 设备 2（A11 + 6核）的测试结果为例。

- 端到端时延（ms）：发送端到接收端的时延，**端到端时延数值越⼩，实时性越好**。
- 视频帧率（fps）：接收端的渲染帧率，**帧率越⾼，视频流畅性越好**。
- 进房成功率（%）：进房成功的次数占⽐，即为进房成功率。
- 拉流成功率（%）：拉流成功的次数占⽐，即为拉流成功率。**进房成功率和拉流成功率越⾼，表明 ZEGO ⾳视频服务稳定性越好**。

### 测试结果

#### 正常网络场景

<table>
  
  <tbody><tr>
    <th>网络状况</th>
    <th>进房成功率</th>
    <th>拉流成功率</th>
    <th>帧率（fps）</th>
    <th>端到端延时（ms）</th>
  </tr>
  <tr>
    <td>正常网络</td>
    <td>100%</td>
    <td>100%</td>
    <td>15</td>
    <td>238</td>
  </tr>
</tbody></table>


#### 网络丢包场景

1. 房间登录和拉流成功率的表现情况

<table>
  
  <tbody><tr>
    <th>上/下行丢包</th>
    <th>进房成功率</th>
    <th>拉流成功率</th>
  </tr>
  <tr>
    <td>上行丢包 30%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>上行丢包 50%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>上行丢包 70%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行丢包 30%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行丢包 50%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行丢包 70%</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
</tbody></table>





2. 视频帧率的表现情况

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/丢包帧率1.png" /></Frame>

3. 端到端时延的表现情况

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/丢包时延1.png" /></Frame>


#### 网络抖动场景

1. 房间登录和拉流成功率的表现情况

<table>
  
  <tbody><tr>
    <th>网络状态</th>
    <th>进房成功率</th>
    <th>拉流成功率</th>
  </tr>
  <tr>
    <td>上行抖动 200ms</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>上行抖动 400ms</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>上行抖动 1000m</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行抖动 200ms</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行抖动 400ms</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
  <tr>
    <td>下行抖动 1000ms</td>
    <td>100%</td>
    <td>100%</td>
  </tr>
</tbody></table>




2. 视频帧率的表现情况

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/抖动帧率1.png" /></Frame>

3. 端到端时延的表现情况
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/抖动时延1.png" /></Frame>

分析总结： 
- ⽆损⽹络场景，ZEGO 各项指标均能达到理想状态，保持超⾼质量通话。
- 进房和拉流成功率，ZEGO 服务即使在 70% 丢包或 1000ms 极端弱⽹环境下，均能保持 100% 成功率，保障⾳视频服务稳定。
- 流畅性表现，50% 丢包或抖动 1000ms 以内，帧率能保持在均值 14 帧以上，保证优质观看体验；70% 丢包极端弱⽹环境，帧率保持在均值 10 帧左右，保持流畅的⾳视频观看。
- 实时性表现，50% 丢包或抖动 400ms 以内，ZEGO ⾳视频服务端到端时延不超过 600ms，提供⾼质量实时观看体验；70% 丢包或抖动 1000ms 极端弱⽹环境下，时延能控制在 1000ms 以内，保持流畅的通话体验。


## 硬件资源占用的表现情况

### 测试环境及配置

<table>
  
  <tbody><tr>
    <td rowspan="2">设备信息</td>
    <td>iOS</td>
    <td><ul>
<li>iOS 设备 1：A13 + 6 核</li>
<li>iOS 设备 2：A8 + 双核</li>
</ul></td>
  </tr>
  <tr>
    <td>Android</td>
    <td><ul>
<li>Android 设备 1：骁龙 835 + 8 核</li>
<li>Android 设备 2：海思 659 + 8 核</li>
</ul></td>
  </tr>
  <tr>
    <td>参数配置（编码）</td>
    <td colspan="2"><ul>
<li>分辨率：320 × 240</li>
<li>码率：100 kbps</li>
<li>帧率：15 fps</li>
</ul></td>
  </tr>
</tbody></table>


### 数据说明

- Android 端没有进行 root，所以会存在有降频的可能性。
- Android 端的系统总 CPU 使用率统计：除了 idle 进程以外的进程，取均值后相加，得出总 CPU 
 使用率数据。
- CPU 使用率、内存使用率均按 100% 计算。

### 测试结果

#### APP CPU 使用率

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/APPCPU使用率1.png" /></Frame>

#### APP 内存使用率

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/APP内存使用率1.png" /></Frame>

#### 系统总 CPU 使用率

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/系统总CPU使用率2.png" /></Frame>

#### 系统总内存使用率

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/系统总内存使用率1.png" /></Frame>

#### 运行 30min 耗电量

机器满电状态下，每个场景运行 30 分钟，耗电量=100%电量-30分钟后电量

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/30min耗电量1.png" /></Frame>

#### 运行 30min 发热增量

未启动 APP 使用测温枪统计当前温度，启动 APP 在每个场景下运行 30 分钟，发热增量=30分钟后的温度-未启动 APP 时温度

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Performance/SDK测试报告图片1103/30min发热增量1.png" /></Frame>

**分析总结：**

- 在硬件较好的设备或拉流并发 32 路以下的使用过程中，ZEGO ⾳视频服务的 CPU 使用率、内存占用率、发热、耗电等各项性能表现较好，占用较少的硬件资源提供高质量的音视频服务。
- 在极端的 32 路、40 路拉流场景中，ZEGO ⾳视频服务对硬件资源的占用也均在合理范围内，保证流畅稳定的音视频服务。


<Note title="说明">


以上内容及数据为 ZEGO 测试团队实际测试结果，但不同开发者在实际使用过程中受环境、设备等因素的影响均会产生不同数据表现，故本报告仅供参考使用，还请知悉。
</Note>

<Content />
