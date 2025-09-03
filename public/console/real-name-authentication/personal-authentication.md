# 个人认证

- - -

本文主要介绍如何进行个人认证，包括 [进入实名认证界面](#进入实名认证界面)  以及 [个人认证流程](#个人认证流程)。

## 进入实名认证界面

登录 [ZEGO 控制台](https://console.zego.im) 后，进入“账号信息-实名认证”界面，在“个人实名认证”模块点击“立即认证”进入认证流程。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/102.png" /></Frame>

## 个人认证流程

### 1 用户授权

个人认证前，需要您授权认证服务，并同意采集必要信息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0003.png" /></Frame>

### 2 选择认证方式

ZEGO 支持三种认证方式，具体如下：

| 认证方式 | 所需材料（本人） | 认证流程 |
| - | - | - |
| 人脸识别（推荐） | 姓名、身份证号、移动端设备。 | 通过腾讯云或者支付宝人脸识别。 |
| 银行卡认证 | 姓名、身份证号、银行卡号、手机号。 | 验证银行卡绑定手机号。 |
| 手机认证 | 姓名、手机号。 | 验证本人实名认证手机号。 |

#### 方式一：人脸识别（推荐）

1. 输入本人姓名和身份证号。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0004.png" /></Frame>

2. 单击“获取二维码”，选择支付宝或腾讯云作为人脸识别的方式，用支付宝 App 或微信 App 扫描二维码，进入人脸识别流程。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0005.png" /></Frame>

3. 根据支付宝或腾讯云的动作提示，完成人脸识别即可认证成功。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0006.png" /></Frame>

#### 方式二：银行卡认证

1. 填写本人身份证号、银行卡号（仅限银联卡）、银行预留手机号。系统会查询银联系统预留信息，对姓名、证件号、银行卡号、银行预留手机号进行核验比对。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0008.png" /></Frame>

2. 信息确认无误后单击“确认提交”，并输入短信验证码，单击“立即确认”则实名认证完成。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0009.png" /></Frame>

#### 方式三：手机认证（仅限大陆人士）

1. 填写本人身份证号和手机号。系统会查询运营商查询中心，对姓名、身份证、手机号进行核验比对。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0010.png" /></Frame>

2. 信息确认无误后单击“确认提交”，并输入短信验证码，单击“立即确认”则实名认证完成。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/console/0011.png" /></Frame>
