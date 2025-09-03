# 地区质量（高级）

- - -

ZEGO 在星图的地区质量（高级）功能中，提供了全球各地区的用户分布、质量趋势、质量明细以及地区间音视频服务质量详情，帮助您了解地区全景和明细，洞察地区特性，定位地区问题，做出针对性决策。

<Warning title="注意">

地区质量（高级）功能，仅在开通星图付费套餐包（`专业版` 或 `旗舰版`）后才能使用，`免费版` 仅能使用基础功能，详情请参考 [计费说明](/analytics-dashboard/introduction/pricing)。
</Warning>


## 页面示例

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3.png" /></Frame>


## 功能介绍

您可以在页面上方选择 AppID、区域范围、日期，查询指定条件下的地区质量情况。

### 用户分布

该模块展示了各区域的用户数量分布情况，按用户数大小着色，用户数量越多，颜色越深；用户数量最多的区域高亮显示（默认为黄色）。

鼠标悬停在想要查看的国家区域上，即可查看该区域的各项质量指标。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_1.png" /></Frame>

您可以通过该模块，对全球范围内的用户分布情况一目了然，随时掌握各区域的质量情况，从而了解哪些地区的用户量较大、哪些地区的质量较差，针对不同地区的特性调整运营策略。

### 质量趋势

“用户分布”模块的右侧显示了各地区音视频质量的一些指标趋势。**默认展示卡顿率及其变化趋势，按照地区用户数从多到少进行排序。**

在趋势缩略图旁边，展示了趋势变化的数值：

- 数值为绿色时，表示趋势变好；数值越大，表明趋势变好的幅度越大。
- 数值为红色时，表示趋势变差；数值越大，表明趋势变差的幅度越大。

您可以从颜色和数值大小等信息，快速了解指标变化趋势，帮助您制定相关决策。

如果需要了解各地区其它质量指标的排名时，可以按需选择不同的指标；同时也可以按地区用户数、指标值、或指标变化趋势值进行排序，以筛选出需要关注的地区。

- 当您在左侧地图上点击某个区域时，此处可快速定位到对应地区，并展示对应指标和排名。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_2.png" /></Frame>

- 如果您想查看其它指标，可以在中间一列的下拉列表中，选择其它指标，进行快速切换。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_3.png" /></Frame>

- 点击“趋势缩略图”，可放大查看该地区在过去一段时间内的质量变化趋势。在弹出的对话框中，您也可以切换查看其它指标，或者重新选择日期范围。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_4.png" /></Frame>

- 点击右上角的 “齿轮” 图标，可以新建个人视图。新视图保存后，您可以随时切换到自定义的视图中，快速跟踪您所关注的目的地区和指标情况。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_5.png" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_6.png" /></Frame>

### 地区质量明细

当您在上方的地图上选定某个地区后，下方会显示已选地区的地区质量明细，包括用户规模、用户体验、房间服务、推流服务、以及拉流服务等方面的情况，帮助您快速了解地区详情。

- 如果您需要查看不同拉流源的情况，可点击右上角的下拉列表进行切换。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_7.png" /></Frame>

- 同时，您也可以点击每个小模块右上角的蓝色图标，展开查看各个指标的详细趋势。查看时，可以切换不同指标或日期、选取不同拉流源进行对比分析。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_8.png" /></Frame>


### 地区间质量详情

在此模块中，您可以从 `拉流` 或 `推流` 视角来查看已选地区的情况，且支持按照国家/地区、不同的拉流源等条件筛选查看。

- 选择 `拉流` 时，将展示已选地区**从其它不同地区拉流**的质量指标。
- 选择 `推流` 时，将展示已选地区**向其它不同地区推流**的质量指标。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_9.png" /></Frame>

您可以点击右侧 “操作” 下的蓝色图标，查看指定的推拉流地区在一段时间内的质量趋势。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Prism/Operation_Dashboard_intro_3_10.png" /></Frame>
