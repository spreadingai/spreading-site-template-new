# 数美内容审核

- - -

## 概述

您可以在控制台自行创建数美审核账号，开通数美内容审核服务，识别各类场景中敏感、色情、未成年违规、暴恐、广告、Logo 水印等风险内容。

## 开通流程

### 1 创建数美审核账号

1. 您可以从 2 个入口进入数美账号创建页面。

    <table>

    <tbody><tr>
    <th>云市场入口</th>
    <th>控制台入口</th>
    </tr>
    <tr>
    <td><ol><li>在 <a href="https://www.zego.im/cloudmarket" target="_blank">ZEGO 云市场</a> 单击选择一项数美审核产品，进入详情页。<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/cloud_market.jpeg" /></Frame></li><li>在详情页上选择“前往开通配置”按钮，进入数美账号创建页面。<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/cloud_market_entry.jpeg" /></Frame></li></ol></td>
    <td><ol><li>在 <a href="https://console.zego.im/ProjectManage" target="_blank">ZEGO 控制台 &gt; 项目管理</a> 中选择希望配置数美审核的项目，进入“项目配置”页面。<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/details.jpeg" /></Frame></li><li>在“项目配置” &gt; “服务配置”中选择“实时音视频”或“即时通讯”，点击“数美内容审核”的“开通服务”按钮，进入数美账号创建页面。<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/service.jpeg" /></Frame></li></ol></td>
    </tr>
    </tbody></table>

2. 进入数美账号创建页面后，提交表单信息，创建数美账号。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/info.jpeg" /></Frame>

    创建表单所需字段说明如下表所示：

    <table>

    <tbody><tr>
    <th>字段</th>
    <th>描述</th>
    <th>用途</th>
    </tr>
    <tr>
    <td>公司全称</td>
    <td>默认取 <a href="/console/verified/introduction" target="_blank">实名认证</a> 主体名称，支持编辑。</td>
    <td>-</td>
    </tr>
    <tr>
    <td>账号邮箱</td>
    <td>默认取 ZEGO 控制台账号绑定邮箱。支持编辑，编辑后需验证码校验。</td>
    <td>用于登录数美运营后台和判断客户是否重复。</td>
    </tr>
    <tr>
    <td>邮箱验证码</td>
    <td>编辑“账号邮箱”后，邮箱收到的验证码。</td>
    <td>用于验证邮箱是否正确。</td>
    </tr>
    <tr>
    <td>所在行业</td>
    <td>选项为“社交交友”、“在线教育”、“电商平台”、“游戏”，默认为“社交交友”。</td>
    <td>用于数美配置默认审核策略。</td>
    </tr>
    <tr>
    <td>业务区域</td>
    <td>选项为“国内”、“海外”。</td>
    <td>用于将新建数美账号关联到您的 ZEGO 国内/海外主账号下，无关计费。</td>
    </tr>
    </tbody></table>


### 2 开通 RTC/ZIM 内容审核服务，配置审核策略

1. 进入内容审核服务开通页面。

    根据您是否为创建数美账号后开通服务，您将从不同入口进入数美内容审核服务开通页面。

    - 当您为首次开通数美账号时，您在“创建数美账号”页面“确认开通”后，即可进入服务开通页面。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/step_1.jpeg" /></Frame>
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/shumei_01.jpeg" /></Frame>
    - 当您已经拥有数美账号时，您需要在 <a href="https://console.zego.im/ProjectManage" target="_blank">ZEGO 控制台 &gt; 项目管理</a> 中选择希望配置数美审核的项目，进入“项目配置”页面。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/details.jpeg" /></Frame>
      在“项目配置“ &gt; "服务配置" 中选择“实时音视频”或“即时通讯”，点击“数美内容审核”的“开通服务”按钮，进入数美内容审核配置窗口。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/service.jpeg" /></Frame>
      适用于“实时音视频”和“即时通讯”的数美内容审核配置窗口有所差异：
        <table>

      <tbody><tr>
      <th>适用于实时音视频</th>
      <th>适用于即时通讯</th>
      </tr>
      <tr>
      <td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/shumei_tanchaung01.jpeg" /></Frame></td>
      <td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/ZIM.jpeg" /></Frame></td>
      </tr>
      </tbody></table>

2. 配置服务项

    按需选择审核项目，点击“确认开通”即可。

    <a id="RTC_Config"></a>
    - 实时音视频
       适用于实时音视频的内容审核配置项包含：
      <table class="collapsible-table" >

      <tbody><tr data-row-level="1">
      <th>配置项</th>
      <th>是否必选</th>
      <th>说明</th>
      </tr>
      <tr data-row-level="3">
      <td>审核方式</td>
      <td>是</td>
      <td>ZEGO 支持服务端API发起审核的方式。相关实现方式请参考数美内容审核的 [使用说明](/shumei-moderation/implementation)。该服务默认开通，不支持关闭。</td>
      </tr>
      </tbody></table>
    <a id="ZIM"></a>
    - 即时通讯
      适用于即时通讯的内容审核配置项包含：
      <table>

      <tbody><tr>
      <th>配置项</th>
      <th>是否必选</th>
      <th>说明</th>
      </tr>
      <tr>
      <td>审核水平</td>
      <td>是</td>
      <td>审核水平影响 ZIM 在收到“不确定”的审核结果时，是否继续发送消息。包含以下选项（单选）：<ul><li>弱审核：审核结果为“不确定”时，ZIM 将依旧发送此条消息。</li><li>强审核：审核结果为“不确定”时，ZIM 将停止发送此条消息。</li></ul></td>
      </tr>
      <tr>
      <td>审核语言</td>
      <td>是</td>
      <td>支持对以下语言进行审核（单选）：<ul><li>中文。</li><li>英文。</li><li>阿拉伯语。</li><li>自定义识别语言：自动识别语言，并进行审核。目前支持自动识别以下语言：<ul><li>中文。</li><li>英文。</li><li>阿拉伯文。</li><li>印地语。</li><li>西班牙语。</li><li>法语。</li><li>俄罗斯语。</li><li>葡萄牙语。</li><li>印尼语。</li><li>德语。</li><li>日语。</li><li>土耳其语。</li><li>越南语。</li><li>意大利语。</li><li>泰语。</li><li>菲律宾语。</li><li>韩语。</li><li>马来语。</li></ul></li></ul></td>
      </tr>
      <tr>
      <td>文本审核</td>
      <td>是</td>
      <td>您可以在此处选择文本审核的策略，与下行“文本审核检测风险类型”相关。策略包含如下：<ul><li>默认策略：选择此项后，“文本审核检测风险类型”自动勾选“默认”，且不能选择其他类型。</li><li>自定义策略：选择此项后，可自行选择“文本审核检测风险类型”。</li></ul></td>
      </tr>
      <tr>
      <td>文本审核检测风险类型</td>
      <td>是</td>
      <td>支持以下类型：<ul><li>默认：审核内容是否涉政、暴恐、违禁、色情、辱骂、广告、隐私或违反广告法。</li><li>网络诈骗。</li><li>高价值用户防挖。</li></ul></td>
      </tr>
      <tr>
      <td>图片审核</td>
      <td>是</td>
      <td>目前固定为“默认策略”，即对涉政、暴恐、违禁、色情、辱骂、广告、隐私、广告法、二维码等内容进行审核，并进行人脸对比和识别图片中文字内容。</td>
      </tr>
      </tbody></table>

### 3 服务开通成功，查看指定项目审核服务详情

完成配置后，前往项目的“服务配置”页面。您可以选择“实时音视频”或“即时通讯”，即可查看对应服务所关联的“数美内容审核”配置详情，也可以修改审核配置。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/select.jpeg" /></Frame>

- 实时音视频
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/Moderation1.jpeg" /></Frame>
- 即时通讯
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/check_ZIM.jpeg" /></Frame>

### 4 查看总体服务信息和数美账号信息

前往“云市场>已开通产品”，点击“数美内容审核”，进入详情页。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/nextdata.jpeg" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/nextdata_details.jpeg" /></Frame>

<table>

<tbody><tr>
<th>模块</th>
<th>字段</th>
<th>描述</th>
</tr>
<tr>
<td rowspan="4">服务信息</td>
<td>服务状态</td>
<td>展示数美服务是否可用，分为“已开通”和“已关闭”。</td>
</tr>
<tr>
<td>试用期</td>
<td>展示免费测试期周期以及剩余天数，数美规则为自账号开通当天算起7个自然日。</td>
</tr>
<tr>
<td>正式期</td>
<td>购买数美审核套餐包后则新增该字段，展示套餐包总额度和剩余可用点数。</td>
</tr>
<tr>
<td>已开通审核服务的 appID</td>
<td>使用了数美内容审核的项目。</td>
</tr>
<tr>
<td rowspan="4">账号和应用信息</td>
<td>数美运营后台账号</td>
<td>展示开通数美账号的邮箱。</td>
</tr>
<tr>
<td>数美运营后台默认密码</td>
<td>开通数美账号时，控制台生成的初始默认密码，可用于登录数美运营后台。</td>
</tr>
<tr>
<td>数美运营后台</td>
<td>数美运营后台官网地址。</td>
</tr>
<tr>
<td>access_Key</td>
<td>数美鉴权密钥，适用于直接调用数美接口场景。</td>
</tr>
</tbody></table>

## 配置音频/视频流审核回调地址

开通适用于“实时音视频”的“数美内容审核”服务后，如果您需要收到相关审核结果，请遵循以下步骤：
1. 前往项目的“项目配置 > 服务配置 > 实时音视频”页面。
2. 在“数美内容审核”中找到回调设置区域，点击“编辑”，进入“编辑数美内容审核”窗口。
3. 输入回调接收地址，点击“确定编辑”即可。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/Moderation2.jpeg" /></Frame>

## 用量统计和查询

ZEGO 控制台提供了两种维度查看数美审核服务用量，分别为计费项维度和审核标签维度。计费项维度适用于计费和对账；审核标签维度适用于分析违规内容。

### 计费项维度

当您已购买数美审核服务，且有正式期用量，您可以在“用量统计”中找到“数美审核”，点击即可查看正式期用量情况。

<Note title="说明">


此处无法查看试用期用量情况。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/describe_1.jpeg" /></Frame>

### 审核标签维度

前往“云市场>已开通产品”，点击“数美内容审核”，进入详情页，点击“原始数据统计”页签。则可按审核类型查看用量情况。

<Note title="说明">


此处可以查看试用期用量情况。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/describe_2.jpeg" /></Frame>

ZEGO 控制台只支持基本查询和统计，如需更多维度统计和分析，请导出文件自行处理。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/cloud_market/describe_3.jpeg" /></Frame>
