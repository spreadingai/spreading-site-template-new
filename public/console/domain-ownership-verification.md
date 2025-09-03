# 域名归属权校验

- - -

在您开通 CDN 过程中，为了确保域名只被真正的拥有者添加，域名首次接入时，需要进行域名归属权认证。

## 注意事项
请前往域名解析服务商处配置 TXT 记录，具体操作请咨询域名解析服务提供商。
不同的 DNS 服务商，TXT 生效的时间略有不同，一般会在5-10分钟生效，具体可以咨询域名解析服务提供商。

## 配置步骤
本文以在[腾讯云](/console/domain-ownership-verification#腾讯云配置方法)、[阿里云](/console/domain-ownership-verification#阿里云配置方法)、[百度云](/console/domain-ownership-verification#百度云配置方法)配置 TXT 记录为例。操作步骤仅供参考，如与实际配置不符，请以各 DNS 服务商的信息为准。

### 腾讯云配置方法
若 DNS 服务商为腾讯云，可根据如下步骤添加 TXT 记录：
1. 登录 [腾讯云域名服务控制台](https://console.cloud.tencent.com/cns)。
2. 选择需要添加 TXT 记录的域名，单击 “解析”。
3. 进入指定域名的域名解析页，单击 “添加记录”。
4. 在该新增列填写域名 TXT 记录，具体填写内容如下所示：
<table>

<tbody><tr>
<th>参数名</th>
<th>配置</th>
</tr>
<tr>
<td>主机记录</td>
<td>填入：cssauth。</td>
</tr>
<tr>
<td>记录类型</td>
<td>TXT。</td>
</tr>
<tr>
<td>记录值</td>
<td>需指向的域名，填写 ZEGO 控制台所提供的域名对应的 TXT 值。</td>
</tr>
</tbody></table>

5. 单击“保存”，配置 TXT 完毕，预计需要5分钟生效。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Tencent_Domain_Deployment.png" /></Frame>

### 阿里云配置方法
若 DNS 服务商为阿里云，可根据如下步骤添加 TXT 记录：
1. 登录 [阿里云域名服务控制台](https://dns.console.aliyun.com)。
2. 选择需要添加 TXT 记录的域名，单击 “解析设置”。
3. 进入指定域名的域名解析页，单击 “添加记录”。
4. 在该新增列填写域名 TXT 记录，具体填写内容如下所示：
<table>

<tbody><tr>
<th>参数名</th>
<th>配置</th>
</tr>
<tr>
<td>主机记录</td>
<td>填入：cssauth。</td>
</tr>
<tr>
<td>记录类型</td>
<td>TXT。</td>
</tr>
<tr>
<td>记录值</td>
<td>需指向的域名，填写 ZEGO 控制台所提供的域名对应的 TXT 值。</td>
</tr>
</tbody></table>

5. 单击“保存”，配置 TXT 完毕，预计需要10分钟生效。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Aliyun_Domain_Name_Deployment.png" /></Frame>

### 百度云配置方法
若 DNS 服务商为百度云，可根据如下步骤添加 TXT 记录：
1. 登录 [百度智能云域名服务控制台](https://console.bce.baidu.com/dns/#/dns/manage/list)。
2. 选择需要添加 TXT 记录的域名，单击 “添加解析”。
3. 进入指定域名的域名解析页，单击 “添加记录”。
4. 在该新增列填写域名 TXT 记录，具体填写内容如下所示：
<table>

<tbody><tr>
<th>参数名</th>
<th>配置</th>
</tr>
<tr>
<td>主机记录</td>
<td>填入：cssauth。</td>
</tr>
<tr>
<td>记录类型</td>
<td>TXT。</td>
</tr>
<tr>
<td>记录值</td>
<td>需指向的域名，填写 ZEGO 控制台所提供的域名对应的 TXT 值。</td>
</tr>
</tbody></table>

5. 单击“保存”，配置 TXT 完毕，预计需要10分钟生效。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Baidu_Domain_Name_Deployment.png" /></Frame>
