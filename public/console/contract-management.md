# 合同管理

- - -

## 概述

- 电子合同，是甲乙双方之间关于甲方购买、使用乙方的 ZEGO 云服务所订立的协议，与纸质合同具有相等法律效应，可直接下载打印使用。

- 通常，一个客户只能存在一份合同。若您已与我司线下签署了纸质合同，则无需再签署电子合同。

- 一旦电子合同签署成功后，不支持再次申请、更改或作废。若您需要修改合同信息，请联系 ZEGO 商务人员。

- 目前，ZEGO 控制台只支持签署标准协议合同。若您有非标需求，请联系 ZEGO 商务人员。

## 签署流程

进入 [ZEGO 控制台 > 合同管理](https://console.zego.im/dashboard)，点击“申请电子合同”，进入合同签署流程。

<Warning title="注意">


若您已与我司线下签署了纸质合同，或者已签署电子合同，则无法再申请新的电子合同。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12301.png" /></Frame>

1. 填写甲方信息

    下表列示有关所需甲方信息的具体说明：

    <table>

    <tbody><tr>
    <th>信息类别</th>
    <th>说明</th>
    </tr>
    <tr>
    <td>签署信息</td>
    <td>包含签署类型和签署主体。<ul><li>签署类型与您的实名认证信息保持一致。若您完成个人实名认证，则签署类型为个人签署，反之亦然。</li><li>签署主体跟实名认证主体必须保持一致。例如，您认证了 A 公司，则只能用以 A 公司名义签署合同。若要以 B 公司名义签署合同，则需先更换实名认证。</li></ul></td>
    </tr>
    <tr>
    <td>甲方信息</td>
    <td>包括联系地址、联系人、联系电话、电子邮件，请填写真实信息。</td>
    </tr>
    <tr>
    <td>账单邮箱</td>
    <td>用于接收每月消费账单等重要通知。</td>
    </tr>
    <tr>
    <td>发票信息</td>
    <td>若签署类型为企业签署，您必须提供发票信息以便后续消费开票；若签署类型为个人签署，则无需提供发票信息。</td>
    </tr>
    </tbody></table>

    以上信息确认无误后，点击“下一步，确认合同内容”，系统会生成一份合同草稿。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12302.png" /></Frame>

2. 确认合同内容

    通过预览合同草稿，您可以在此步骤检查合同内容是否正确。如信息有误，您可返回上一步进行修改。

    <a name="sign"></a>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12303.png" /></Frame>

3. 填写签署方信息

    根据签署者类型，您需要填写不同的签署方信息：

    - 若签署类型为企业签署，您需要需要填写经办人信息，包括姓名、证件号码（推荐使用**身份证**）和手机号码（用于校验身份和接收签署短信）。

    - 若签署类型为个人签署，您只需要填写手机号码（用于身份校验和接收签署短信）。

<Note title="说明">


    不论签署类型如何，都需要手机号码与身份信息相匹配，否则将无法校验成功。

</Note>



    以上信息确认无误后，点击“下一步，在线签署”正式发起签署流程。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12304.png" /></Frame>

<Note title="说明">


    此时，您无法修改合同内容。若您有修改需求，请先在合同管理撤销合同，随后即可申请新合同。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/contract_rescission.png" /></Frame>

</Note>


4. 在线签署

    签署服务由 e 签宝提供支持，因此在第三步后会自动进入e签宝的签署界面，整体流程如下：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12305.png" /></Frame>

    1. 个人登录授权：使用您在 [3. 填写签署方信息](#sign) 填写的手机号码登录；

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12306.png" /></Frame>

    2. （可选）个人实名认证：若您之前已实名认证，则无需这一步；若之前未实名认证，则需要先进行个人认证；

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12307.png" /></Frame>

    3. 进入签署界面，拖动印章到签署区；

        e 签宝会根据您提交的企业信息/个人信息自动生成电子印章，需要您手动拖至签署区，而 ZEGO 的电子签章已自动加盖于合同上。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/123011.png" /></Frame>

    4. 电子章完成后，点击右上角“提交签署”。提交签署之前，您需要先进行企业认证或个人认证，通过后即可签署成功。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/123012.png" /></Frame>

    完成签署后，您可以在 e 签宝或 ZEGO 控制台查看或下载电子合同。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/123015.png" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/123017.png" /></Frame>

    合同签订完成后，不支持自助作废或修改，若需要，请联系 ZEGO 商务人员。

## 常见问题

1. **我可以签署几份合同？**

    通常情况，一个客户主体只能签署一份合同。若您用主体 A 签署合同，后续变更为主体 B（通过实名认证），则可以用主体 B 再签署一份新合同。

2. **如何变更合同条款？**

    ZEGO 控制台仅支持签署标准的电子合同。若您需要变更合同条款，签署非标合同，请联系 ZEGO 商务人员。

3. **如何处理错误的合同信息（比如甲方信息）？**

    若合同未签署完成，您可以撤销合同，重新签署新合同；若合同已签署完成，则不支持修改，请联系 ZEGO 商务人员。
