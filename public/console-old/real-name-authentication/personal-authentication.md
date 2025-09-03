# 个人认证

- - -

## 完善个人信息

1. 登录 [ZEGO 控制台](https://console.zego.im) 后，单击右上角的“立即认证”，若您未完善个人信息，则需要先完善信息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0001.png" /></Frame>

2. 单击“前去完善”，进入个人中心填写相关信息。

<Warning title="注意">


“姓名”为必填项，且会默认用该人的身份信息进行个人实名认证，请务必填写本人真实姓名。通过认证后，姓名不支持修改。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0002.png" /></Frame>

3. 信息完善后，再次单击右上角的“立即认证”即可进入个人认证流程。

## 个人认证流程

### 用户授权

个人认证前，需要您授权认证服务，并同意采集必要信息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0003.png" /></Frame>

### 选择认证方式

ZEGO 支持三种认证方式，具体如下：

|认证方式|所需材料|认证流程|
|-|-|-|
|人脸识别（推荐）|本人姓名、本人身份号、移动端设备。|通过腾讯云或者支付宝人脸识别。|
|银行卡认证|本人姓名、本人身份证号、本人银行卡号、本人手机号。|验证银行卡绑定手机号。|
|手机认证|本人姓名、本人手机号。|验证本人实名认证手机号。|

#### 方式一：人脸识别（推荐）

1. 填写本人身份证号。

<Warning title="注意">


不支持在认证流程中修改“姓名”，若需要更改，请在“控制台-个人信息”中操作。 

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0004.png" /></Frame>

2. 完善信息后，单击“获取二维码”，支持通过支付宝或腾讯云进行人脸识别，用支付宝 App 或微信 App 扫码二维码，进入人脸识别流程。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0005.png" /></Frame>

3. 根据支付宝或腾讯云的动作提示，完成人脸识别即可认证成功。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0006.png" /></Frame>

#### 方式二：银行卡认证

1. 填写本人身份证号、银行卡号（仅限银联卡）、银行预留手机号。系统会查询银联系统预留信息，对姓名、证件号、银行卡号、银行预留手机号进行核验比对。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0008.png" /></Frame>

2. 信息确认无误后单击“确认提交”，并回填短信验证码，单击“立即确认”则实名认证完成。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0009.png" /></Frame>

#### 方式三：手机认证（仅限大陆人士）

1. 填写本人身份证号和运营商预留手机号。系统会查询运营商查询中心，对姓名、身份证、运营商预留手机号进行核验比对。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0010.png" /></Frame>

2. 信息确认无误后单击“确认提交”，并回填短信验证码，单击“立即确认”则实名认证完成。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0011.png" /></Frame>
