# 功能介绍

- - -

通过通话洞察，您可以从流的维度监测和诊断音视频质量，定位音视频问题并进行根因分析，从而解决问题并最终提升用户体验。

<Note title="说明">

为了更好地使用星图，建议您使用 Express SDK 3.0 或以上版本，以便进一步提升数据上报的可靠性。
</Note>

## 功能概述

通话洞察包括以下 3 个子页面，分别承载不同功能：

<table>
<tbody><tr>
<th>子页面</th>
<th>功能</th>
</tr>
<tr>
<td>检索页</td>
<td>推拉流列表概览，帮助您定位目标，从而进一步调查质量详情。</td>
</tr>
<tr>
<td>推流质量页</td>
<td>推流质量及拉流用户概览，帮助您评估问题的影响范围以及规模，对问题定性。 </td>
</tr>
<tr>
<td>端到端详情页</td>
<td>呈现端到端质量，深入调查通话质量，还原用户互动情景，定位分析问题，最终解决问题以提升用户体验。</td>
</tr>
</tbody></table>

## 访问步骤
1. 登录 [ZEGO 控制台](https://console.zego.im)，从左侧导航栏进入星图；
2. 在导航栏点击“通话洞察”，即可访问“检索页”。

## 检索页

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Chat_Quality_Monitoring_Search.png" /></Frame>

### 功能介绍
1. 选择 AppID（必需），输入房间 ID、用户 ID 或流 ID（可选），选择需要查询的时间范围，点击查询，即可获取该时间范围内的流记录列表（即检索结果）。   

    增加多个筛选条件组合查询，或者缩小查询的时间范围，都可以更精准地搜索流记录信息。
    
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Chat_Quality_Monitoring_Search_Filters.png" /></Frame>

2. 流记录列表展示的字段包括：房间ID、推流用户ID、流ID、起止时间、操作。

    <Warning title="注意">

    若用户在推流过程中产生了多次推流记录，则起止时间表示第一次推流的开始时间和最后一次推流的结束时间，您可以点击该时间范围旁的图标查看每次推流的时间等信息。   
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Stream_Publishing_Time_Details.png" /></Frame>
    </Warning>

3. 若通过用户 ID 检索，搜索结果会分为两个页签，分别展示该用户的推流记录和拉流记录，您可按 tab 键切换页签。   

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Search_User_Result.png" /></Frame>

4. 选择目标流，点击“查看推流质量"可进入 [推流质量页](#推流质量页)；点击“查看端到端质量"，将会展示此条推流对应的所有拉流用户，选择您想要查看的用户，进入[端到端详情页](#端到端详情页)；若用户较多，您也可以输入用户ID搜索。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Stream_Playing_User_List.png" /></Frame>

## 推流质量页

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Chat_Quality_Stream_Publishing_Quality.png" /></Frame>

### 功能介绍

#### 查看推流基本信息

- 在推流质量页上方，您可以查看推流的基本信息，包括用户 ID、SDK 版本、用户设备的系统和机型、用户所在的地区、用户使用运营商和网络信息。

    当地区、网络等基本信息发生变化，会出现标识。将鼠标悬浮于此标识，即可查看完整的信息，以网络变化截图为例：   
        
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Network_Change.png" /></Frame>


- 您还可以查看推流的发送码率、发送帧率、发送丢包率，以及发送延迟。如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/communication-insights/16610)。   

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Basic_Publish_Quality.png" /></Frame>

#### 一览拉流用户列表

在推流质量页下方，您可以一览此条推流对应的所有拉流用户，并查看拉流时的质量情况（包含视频接收码率、音频接收码率、卡顿率）。如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/communication-insights/data-explanation)。 

若列表用户较多，需要定位某个具体的拉流用户，可以通过输入用户 ID 检索定位此用户。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Chat_Quality_Stream_Publishing_USer_Search.png" /></Frame>

#### 分析推流质量

在查看推流基本信息的时候，您可以参考以下方法分析推流质量：

- 发送码率和发送帧率图表的曲线波动越小，在 Y 轴对应的数值越接近目标设置值，则表示该用户推流越平稳，越符合您的设置目标。
- 发送丢包率和发送延迟图表，表示用户推流过程中的网络状况。曲线波动越小表示网络越稳定，Y 轴对应的值越趋近于 0，则网络质量越好。

例如，下图曲线发生了波动（红色框内的时间段），根据丢包和延迟的图表数据可以判断得出在这个时间段网络发生波动，导致推流的码率和帧率产生了变化，可能会导致画面出现卡顿、模糊等情况。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Chat_Quality_Stream_Publishing_Quality_Analysis.png" /></Frame>

#### 查看拉流用户体验

在查看拉流用户列表的时候，您可以参考以下方法分析拉流用户的体验：

- 通过接收码率的波动趋势，可以判断拉流用户的体验情况。码率曲线越平滑，波动越小，说明用户拉流时接收的数据越稳定，用户的体验越稳定；
- 卡顿率数据反映了用户是否产生了卡顿。如下图所示，红色范围表示用户拉流时产生卡顿的时间段；

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Freeze.png" /></Frame>

- 数据的连续性可以帮助我们判断用户的拉流周期，数据间的间隔表示用户停止拉流。如下图示例，用户的此次音频拉流分为两段；

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Continuity.png" /></Frame>

- 你可以通过选择下拉列中的 RTC 或 CDN 信息，仅查看用户拉流时候所使用的某类服务的数据。如下图示例，该用户拉流过程中使用了 RTC 和 CDN 两类服务。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Stream_Playing_Sources.png" /></Frame>

- 推流质量页各项数据的定义及释义，请参考 [数据说明](/analytics-dashboard/guides/communication-insights/data-explanation)。

##### 拉流用户高级筛选

若您已开通星图专业版或旗舰版套餐包，便可使用专属的**拉流用户高级筛选**功能。可以通过设置筛选条件，快速从大量拉流用户中找到符合条件的问题用户。

<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/def818c27a.png" />
</Frame>

#### 评估问题影响规模

您可以判断问题是仅属于某个拉流用户的个体问题，还是此条流所有用户的群体问题，判断步骤如下：

1. 查看是否所有拉流用户图表数据在相同的时间出现了相似的波动，且在同时刻，推流用户也发生了类似波动。

    以下图为例：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Same_Problem.png" /></Frame>    

    可以看出拉流用户在相同的时间段曲线波动相似，且推流用户也具有相似的波动，则可以判断是因为推流用户的质量波动导致所有拉流用户在同一时刻产生了体验问题。

2. 若在推流列表中，仅有某一个用户发生了卡顿，其余用户图表展示正常，则可以判断卡顿体验问题为该用户的特例问题，如下图所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Individual_Problem.png" /></Frame>    

3. 若判断结论是因为推流用户导致，可以通过查看“拉流用户并发”看此条流的并发峰值人数和累计用户数，从而评估影响范围。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Concurrency.png" /></Frame>    

#### 评估问题影响规模——应用拉流高级分析

若您已开通星图专业版或旗舰版套餐包，便可使用专属的**拉流高级分析**功能。该功能能够助您直观判断问题的性质，即究竟是某个拉流用户的个体问题，还是涉及所有拉流用户的群体问题。具体可从以下几个方面入手：

##### 1 整体卡顿情况分析

在用户体验模块中，通过音视频卡顿率和卡顿人数图表，您可以了解所有拉流用户的平均卡顿情况以及卡顿人数。若在某个问题时间点，整体拉流卡顿率明显升高，或者卡顿人数显著增多，这很可能意味着是所有拉流用户共同面临的群体问题，而这种情况下，推流侧出现异常的可能性较大。

<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/0615dd9451.png" />
</Frame>

##### 2 查看用户卡顿分布

将音视频卡顿率图表切换至卡顿分布模式，即可呈现处于不同卡顿区间的用户分布情况。点击“查看区间卡顿用户”按钮，能够快速筛选出指定用户群，以便进行更深入的异常分析。

<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/afa4891125.png" />
</Frame>

##### 3 卡顿用户快速筛选

在音视频卡顿人数图表中，点击 “查看此刻音/视频卡顿用户” 按钮，同样可以快速筛选出指定用户，进而开展异常分析工作。

<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/e2f4341493.png" />
</Frame>

##### 4 多维度下钻分析

在分布统计模块，您可以按照拉流源和 SDK 版本维度进一步下钻分析平均卡顿情况。通过这种方式，能够快速判断卡顿现象是否由拉流源或 SDK 版本等因素导致。点击右侧按钮，还能快速筛选指定用户，对异常情况进行分析。

<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/5119bb3ac3.png" />
</Frame>

#### 进一步调查互动质量

如果您想要进一步查看推流用户和拉流用户之间详细的互动质量和用户体验，可以选择访问 [端到端详情页](#端到端详情页)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/More_Interaction_Info.png" /></Frame>    

## 端到端详情页

### 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/End_to_End_Info_Overview.png" /></Frame>    

### 功能介绍

通过端到端详情页，您可以调查、监测全链路通话质量，还原用户情景。

#### 快速了解通话互动的基本情况

- 查看当前流的状态，状态包括：进行中、已结束。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Stream_Status.png" /></Frame>    

- 根据“切换”按钮是否可以点击，判断两端用户之间是否有连麦行为。若推流端和拉流端有连麦行为，则”切换“按钮为可点击状态，您可以点击切换查看本端用户拉取对端用户所推的流时的质量详情；

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Toggle_Button.png" /></Frame>    

- 如果你想要查看此条推流对应的其他拉流用户质量，可通过拉流用户旁边的标签展开拉流列表，选择更换。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/More_Stream_Playing_Users.png" /></Frame>    

- 通过“通话卡顿率”、“首帧耗时”、“音频体验”三个指标快速了解拉流用户基本体验，评估此次通话质量。如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/communication-insights/data-explanation)；

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Index.png" /></Frame>    

- 星图会主动识别通话过程中的异常事件，并根据异常事件的严重程度将事件区分为“异常”和“提醒”，直接在【通话诊断】展示诊断结果。您可以点击以查看异常详情及原因，从而低门槛、高效地定位异常。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Diagnosis.png" /></Frame>    

#### 对比查看推流端和拉流端的详情

你可以查看推流端和拉流端的用户基本信息、用户行为和流质量数据。

- 用户基本数据包括：用户 ID、SDK 版本、系统、机型、地区、运营商、网络、推流路径、拉流路径。
    - 推流路径：表示推流从客户端到服务器的路径，如 客户端 → RTC， 表示客户端直接推流到 RTC 服务器；
    - 拉流路径：表示拉流从服务器到客户端的路径，如 CDN → 客户端，表示客户端是从 CDN 节点拉流。
    
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Paths.png" /></Frame>    

    若信息发生了变化，可以点击信息旁边的图标展开查看。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Expand.png" /></Frame>    


- 用户行为：详细展示各个时刻的用户操作，完整还原整个通话互动过程，可帮助排查音视频质量问题是否是由用户行为导致。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/User_Action.png" /></Frame>    

    下表列举部分典型事件：

<table>

<tbody><tr>
<th>分类</th>
<th>事件</th>
<th>事件描述</th>
</tr>
<tr>
<td>房间事件</td>
<td>登录、退出房间</td>
<td>表示用户登录房间和退出房间的时刻，帮助了解用户在房间中的状态。</td>
</tr>
<tr>
<td rowspan="2">流事件</td>
<td>开始、结束推流</td>
<td>表示用户开始和结束推流的时刻，帮助了解推流周期。</td>
</tr>
<tr>
<td>开始、结束拉流</td>
<td>表示用户开始和结束拉流的时刻，帮助了解拉流周期。</td>
</tr>
<tr>
<td rowspan="5">用户行为</td>
<td>打开、关闭麦克风</td>
<td>推流用户打开或关闭麦克风可能会导致拉流端用户听不到声音。</td>
</tr>
<tr>
<td>打开、关闭摄像头</td>
<td>推流用户打开或关闭摄像头可能会导致拉流端用户看不到画面。</td>
</tr>
<tr>
<td>打开、关闭扬声器</td>
<td>拉流用户打开或关闭扬声器可能会导致听不到声音。</td>
</tr>
<tr>
<td>切换App至前后台</td>
<td>用户切换前后台可能导致推流或拉流中断。</td>
</tr>
<tr>
<td>切换网络类型</td>
<td>切换网络类型可能导致网络质量变化。</td>
</tr>
<tr>
<td rowspan="7">异常事件</td>
<td>房间登录请求异常</td>
<td>用户登录房间失败，可以查看异常原因，从而解决问题，例如“请求超时，可能是因为网络较差导致”，可以引导用户切换网络解决此异常。</td>
</tr>
<tr>
<td>房间异常退出</td>
<td>用户异常退出房间，可以查看异常原因，从而解决问题，例如“连接中断，可能是网络断开导致”，可以引导用户重新连接网络解决此异常。</td>
</tr>
<tr>
<td>请求推流异常</td>
<td>用户推流异常导致推流失败，可以查看异常原因，从而解决问题，例如“推流参数设置错误”，可以调整推流参数重新推流解决此异常。</td>
</tr>
<tr>
<td>异常结束推流</td>
<td>用户推流过程中异常断开，可以查看异常原因，从而解决问题，例如“连接中断，可能是网络断开导致”，可以引导用户重新连接网络解决此异常。</td>
</tr>
<tr>
<td>请求拉流异常</td>
<td>用户拉流异常导致拉流失败，可以查看异常原因，从而解决问题，例如“流不存在”，可能是推流端还异常没有成功推流导致，可以引导用户等待推流后再进行拉流解决。</td>
</tr>
<tr>
<td>异常结束拉流</td>
<td>用户拉流过程中异常断开，可以查看异常原因，从而解决问题，例如“连接中断，可能是网络断开导致”，可以引导用户重新连接网络解决此异常。</td>
</tr>
<tr>
<td>设备异常中断等相事件</td>
<td>用户在推拉流过程中设备异常，可以查看异常原因，从而解决问题，例如“设备没有权限“，可以引导用户进行授权解决此异常。</td>
</tr>
</tbody></table>

- 用户配置：查看用户在推拉流时候的配置信息，帮助您分析判断推/拉流配置设置是否正常，通话过程中配置项对应配置值是否发生变化，从而判断音视频质量变化是否和配置有关。

    <Note title="说明">配置信息按照推/拉流的周期展示，若用户推拉流多次，则会展示多条记录。</Note>

    <Frame width="512" height="auto">
      <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d925b4b0c1.png" />
    </Frame>

- 推/拉质量数据，包括码率、帧率、丢包率、延迟、分辨率、音量、CPU 使用率以及内存使用量，帮助您判断评估音视频质量，并对质量问题进行归因。如果您需要进一步了解各项数据的释义，请参考 [数据说明](/analytics-dashboard/guides/communication-insights/16610)。
    
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Quality_of_Publishing_and_Playing.png" /></Frame>
