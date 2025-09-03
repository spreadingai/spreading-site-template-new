# 企业认证

---

## 完善企业信息

若您注册时选择“个人开发者”，则：

1. 在“账号信息 > 个人信息”中单击“升级为企业”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0022.png" /></Frame>

2. 进入完善企业信息界面，完善后，单击“保存”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0020.png" /></Frame>

若您注册时选择“企业开发者”，则：

1. 在“账号信息 > 企业信息”中直接完善企业信息即可。完善后，单击“保存”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0023.png" /></Frame>

2. 单击右上角的“立即认证”即可进入企业认证流程。

## 企业认证流程

### 用户授权

认证前，需要您授权认证服务，并同意采集必要信息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0003.png" /></Frame>

### 办理人实名认证/意愿认证

为了保障企业实名流程的办理人身份真实性：

- 若办理人未进行个人实名认证，则需要先完成 [个人实名认证](/console-old/verified/personal-authentication-old) 后，才能进行企业认证。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0024.png" /></Frame>

- 若办理人已经完成个人实名认证，则无需重复认证，只需要进行意愿认证，支持短信认证和人脸识别两种方式。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0026.png" /></Frame>

### 选择认证方式进行认证

ZEGO 支持四种企业认证方式，推荐使用对公打款认证方式。四种认证方式具体如下：


| 企业认证方式 | 所需材料 | 认证流程 | 认证时间 |
| ---- | ---- | ---- | ---- |
| 对公打款认证 | 公司对公银行账号 | 验证打款金额或对公户转款指定金额。 | 预计 30 min |
| 法定代表人认证 | 企业法人本人操作 | 支持腾讯云、支付宝人脸识别。 | 立刻认证 |
| 企业支付宝认证 | 由企业支付宝授权认证 | 企业支付宝授权、登录支付宝认证。 | 预计 5 min |
| 授权书认证 | 法人手机验证码与签署授权书 | 法人通过短信链接签署授权书。 |预计 10 min |


#### 方式一：对公打款认证（推荐）

1. 认证方式选择“对公打款认证”，填写企业名称、统一社会信用代码或工商注册号、法定代表人名称、法定代表人证件类型、法定代表人证件号。

<Note title="说明">


企业名称和统一社会信用代码/工商注册号不支持在认证流程中修改，若需要修改，请关闭认证弹窗后，在“账号信息 > 企业信息”中修改。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0027.png" /></Frame>

2. 填写完成后，单击“确认”。

3. 进行对公打款认证，支持公司入账和公司出账两种方法。

- **公司入账**

平台方（e 签宝）会向您的公司打款 0～1 元之间的随机金额，成功打款后，您可以跟公司财务核实是否到账，并将打款金额进行回填，即可完成企业实名认证。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0028.png" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0029.png" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0030.png" /></Frame>

- **公司出账**

您也可以选择向平台方打款固定金额（1分钱），需要用本企业对公账户汇款，平台方确认收到企业账户汇款金额后，企业实名认证完成。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0031.png" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0032.png" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0033.png" /></Frame>

#### 方式二：法定代表人认证

1. 认证方式选择“法定代表人认证”，填写企业名称、统一社会信用代码或工商注册号、法定代表人名称、法定代表人身份证号。

<Note title="说明">


企业名称和统一社会信用代码/工商注册号不支持在认证流程中修改，若需要修改，请关闭认证弹窗，然后在“账号信息 > 企业信息”中修改。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0034.png" /></Frame>

2. 填写完成后，单击“确认”即可进入校验。如果判断为非法定代表人本人，系统会提示建议选择其他方式。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0038.png" /></Frame>

#### 方式三：授权书认证

授权书认证方式指的经办人在做企业实名时，法定代表人对授权书（授权书根据模板系统自动生成，并带有必要信息）进行签署确认，即可完成企业实名。

1. 认证方式选择“法定代表人授权书认证”，填写企业名称、统一社会信用代码或工商注册号、法定代表人名称、法定代表人证件类型、法定代表人证件号。

<Note title="说明">


企业名称和统一社会信用代码/工商注册号不支持在认证流程中修改，若需要修改，请关闭认证弹窗后，在“账号信息 > 企业信息”中修改。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/040.png" /></Frame>

2. 填写完成后，单击“确认”。

3. 签署链接会以短信形式发送到法定代表人预留手机号中，法定代表人需要完成个人实名并做意愿认证后，签署授权方可生效。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0039.png" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0040.png" /></Frame>

#### 方式四：企业支付宝认证

若您公司已开通企业支付宝，则可通过该方式进行认证。

1. 认证方式选择“企业支付宝认证”，填写企业名称、统一社会信用代码或工商注册号。

<Note title="说明">


企业名称和统一社会信用代码/工商注册号不支持在认证流程中修改，若需要修改，请关闭认证弹窗，然后在“账号信息 > 企业信息”中修改。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0041.png" /></Frame>

2. 填写完成后，单击“确认”。

3. 使用支付宝扫描二维码，并确保登录企业支付宝账号。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0042.png" /></Frame>

4. 在支付宝中完成授权认证。

在支付宝小程序中，需确认授权认证的企业与待实名企业名称保持一致，确认无误后，单击“授权认证”，即可完成企业实名认证。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0043.png" /></Frame>
