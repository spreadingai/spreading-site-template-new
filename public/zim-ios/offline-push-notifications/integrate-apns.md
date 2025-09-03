# Apple 推送集成指南

## 概述

iOS 离线推送，需要通过 Apple APNs 来实现。

开发者使用 ZIM 提供的“离线推送”功能之前，请参考下文，在 [Apple 开发者网站](https://developer.apple.com/) 申请证书。


## 使用步骤

1. 登录 [Apple 开发者网站](https://developer.apple.com/)，选择上方导航栏中的 “Account”。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/create_apns_account.png" />
</Frame>

2. 在开发者账户页面左侧，选择 “Certificates, IDs & Profiles”。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/certificates_ids.png" />
</Frame>

3. 点击 “Identifiers” 后面的 “+”，填写 App ID 的 NAME 和 Bundle ID。

    <Note title="说明">
    - 若 App ID 已经存在，请跳过此步。
    - Bundle ID 不可使用通配符。
    </Note>

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/apns_apply_3.png" />
</Frame>

4. 勾选 Push Notification。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/select_push_notification.png" />
</Frame>


5. 在 [Apple 开发者网站](https://developer.apple.com/) 中，申请 “.p12” 证书鉴权。

    在 “Certificates, IDs & Profiles” 中，点击 “Certificates” 后面的 “+”。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/apns_apply_2.png" />
</Frame>
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/create_new_certificates_EN.png" />
</Frame>

    选择 APNs 证书，这里选择“生产环境”（SandBox & Production），并选择该证书准备绑定的 AppID，点击 “Continue”。
    
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/apns_apply_4.png" />
</Frame>

    这里需要选择 CSR 文件（CSR 文件的获取方式，请参考第 6 ～ 7 步），上传该文件，点击 “Continue”。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/upload_csr_file.png" />
</Frame>

6. 打开系统自带的钥匙串访问。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/open_keychain_access.png" />
</Frame>

7. 选择 “钥匙串访问 > 证书助理 > 从证书颁发机构请求证书”，填写 “用户电子邮件地址” 和 “常用名称”，勾选“存储到磁盘”，点击“继续”，将得到后缀名为 “.certSigningRequest” 的文件（即 CSR 文件）。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/request_certificate.png" />
</Frame>
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/apns_apply_1.png" />
</Frame>

8. 将刚才得到的 “.certSigningRequest” 的文件，在第 5 步中上传，上传并点击 “Continue” 后，进去下载页面，点击 “Download” 下载下来，得到是一个后缀名为 “.cer” 的文件；双击该证书文件，系统会把文件安装到钥匙串访问中，在如图所示位置（左侧边栏选择登录，顶部边栏选中证书），找到该证书，并导出 “.p12” 后缀的文件。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/export_certificate.png" />
</Frame>

9. 开启离线推送通知

    开发者需要在 Xcode 中，开启 Push Notification（离线推送通知，只能在真机设备上运行），发送给注册的 iOS 设备。

    在 TARGETS 下选择目标，然后选择 “Signing & Capabilities > Capabilities > Push Notification”，即可开启离线推送通知。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/offline_push_enable_pushNotification.png" />
</Frame>


10. 自助配置 ZIM 离线推送证书

以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
