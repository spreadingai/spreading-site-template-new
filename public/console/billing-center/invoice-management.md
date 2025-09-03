# 开票管理

- - -

## 功能简介

在购买并消耗 ZEGO 提供的产品和服务后，可在 ZEGO 控制台 的“费用中心”模块开具发票，相关说明如下表所示：

<table>

<tbody><tr>
<th>项目</th>
<th>说明</th>
</tr>
<tr>
<td>
支持场景
</td>
<td>对已消耗的金额开具发票，目前支持2种场景：<ul><li>月账单（已结算）。</li><li>官网购买套餐包（已交易完成）。</li></ul></td>
</tr>
<tr>
<td>
发票类型
</td>
<td>根据合作主体的不同，可开具的发票类型存在差异：<ul><li>即构合作主体：电子普票、纸质普票、纸质专票。</li><li>抖动合作主体：电子普票、纸质专票。</li></ul>
<strong>若开具的纸质发票金额低于100（元），则需由您自行承担邮寄费用。</strong></td>
</tr>
<tr>
<td>耗费时长</td>
<td>通常在收到开票申请后的3个工作日内完成审核和开具。</td>
</tr>
</tbody></table>

## 开票流程

### 申请开票

1. 在“消费记录”页面选择指定消费，点击“申请开票”，在弹窗中填写相关信息；

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_1.jpeg" /></Frame>

    根据您的认证情况，所需信息有所不同。

    <table>

    <tbody><tr>
    <th>认证主体</th>
    <th>截图</th>
    <th>说明</th>
    </tr>
    <tr>
    <td>企业认证主体</td>
    <td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_2.jpeg" /></Frame></td>
    <td><ul><li>抬头类型：默认为“企业”。</li><li>发票类型：支持电子普票、纸质普票、纸质专票。</li><li>发票抬头：默认为认证名称。</li><li>纳税人识别号：默认为认证信息。</li><li>地址：电子/纸质普票选填，纸质专票必填。电话：如需电子/纸质普票，选填；如需纸质专票，必填。</li><li>开户行：如需电子/纸质普票，选填；如需纸质专票，必填。</li><li>银行账号：如需电子/纸质普票，选填；如需纸质专票，必填。</li><li>邮寄信息：若选择纸质票则需要填写。</li></ul></td>
    </tr>
    <tr>
    <td>个人认证主体</td>
    <td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_3.jpeg" /></Frame></td>
    <td><ul><li>抬头类型：默认为“个人”。</li><li>发票类型：支持电子普票、纸质普票。</li><li>发票抬头：默认为认证名称。</li></ul></td>
    </tr>
    </tbody></table>

2. 信息填写后，点击“确认”即申请开票成功，同时消费记录会变成“开票中”，不允许重复开票。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_4.jpeg" /></Frame>

### 查询开票状态

申请开票后，您可以在“开票记录”中查看相关开票状态。开票状态有以下几种：
- 待审核：ZEGO 财务审核中。
- 已撤销：待审核状态时，您可自行撤销，撤销后可重新申请。
- 已驳回：ZEGO 财务审核不通过，页面会展示原因。
- 待开票：ZEGO 财务审核通过，正在开票。
- 已开票：若为电子票，会展示发票号码，点击“详情”新开标签页，即可查看发票。若为纸质票，会展示发票号码、快递单号和快递时间。
- 待作废/待红冲：若已开票，您后续需作废/红冲，可联系商务同学线下处理。
- 已作废/已红冲：在正式作废/红冲后，您即可重新申请开票。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_5.jpeg" /></Frame>

### 查询和下载发票

开票状态为“已开票”后，您可以单击“详情”，即可查询和下载发票。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_6.jpeg" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/receipt_7.jpeg" /></Frame>
