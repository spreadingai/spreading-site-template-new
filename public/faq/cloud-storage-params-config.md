<Title>StorageParams 中的各个云存储相关的参数如何填写？</Title>



---

开发者调用 [开始录制](/cloud-recording-server/start) 接口时可以携带 StorageParams 参数用于指定录制任务的存储配置，此时开发者需要通过 Vendor 参数指定云存储服务提供商，并提供该服务对应的存储信息，具体填写方法如下：

## 亚马逊 S3

Vendor 为 1 时，表示将录制文件存储至亚马逊 S3，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [AWS 服务终端节点](https://docs.aws.amazon.comhttps://doc-zh.zego.im/zh_cn/general/latest/gr/rande.html#s3_region)，根据您在亚马逊 S3 开通服务的区域，填写对应的 “代码” 字段，例如 “cn-north-1”。
- Bucket：存储桶的名称。您可参考 [创建您的第一个 S3 存储桶](https://docs.aws.amazon.comhttps://doc-zh.zego.im/zh_cn/AmazonS3/latest/userguide/creating-bucket.html) 创建新的 S3 存储桶。
- AccessKeyId：云存储的 access key ID。
- AccessKeySecret：云存储的 secret access key。

请参考 [了解并获取您的 AWS 凭证](https://docs.aws.amazon.comhttps://doc-zh.zego.im/zh_cn/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) 获取您的 access key ID 和 secret access key。

## 阿里云 OSS

Vendor 为 2 时，表示将录制文件存储至阿里云 OSS，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [访问域名和数据中心](https://help.aliyun.com/document_detail/31837.html)，根据您在阿里云 OSS 开通服务的区域，填写对应的 “Region ID” 字段，例如 “oss-cn-hangzhou”。
- Bucket：存储 Bucket 的名称。您可参考 [创建存储空间](https://help.aliyun.com/document_detail/31885.htm) 创建新的存储 Bucket。
- AccessKeyId：云存储的 AccessKey ID。
- AccessKeySecret：云存储的 AccessKey Secret。

建议提供具有 OSS 写权限的 RAM 用户 AccessKey，您可参考 [RAM 用户概览](https://help.aliyun.com/document_detail/122148.html) 创建并获取对应的 AccessKey ID 和 AccessKey Secret。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/aliyun1.png" /></Frame></Frame>


## 腾讯云 COS

Vendor 为 3 时，表示将录制文件存储至腾讯云 COS，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [地域和访问域名](https://cloud.tencent.com/document/product/436/6224)，根据您在腾讯云 COS 开通服务的区域，填写对应的 “地域简称” 字段，例如 “ap-beijing”。
- Bucket：存储桶名称，格式为 `<BucketName-APPID>`，例如 "mybucket123-1250000000"。您可参考 [创建存储桶](https://cloud.tencent.com/document/product/436/14106) 创建新的存储桶。
- AccessKeyId：云存储的 SecretId。
- AccessKeySecret：云存储的 SecretKey。

建议提供具有 COS 写权限的子用户 SecretId 和 SecretKey，您可参考 [访问管理用户指南](https://cloud.tencent.com/document/product/598/17848) 创建并获取对应的 SecretId 和 SecretKey。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/tc1.png" /></Frame></Frame>


## 七牛云 Kodo

Vendor 为 4 时，表示将录制文件存储至七牛云 Kodo，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [存储区域](https://developer.qiniu.com/kodo/1671/region-endpoint-fq)，根据您在七牛云 Kodo 开通服务的区域，填写对应的 “区域 Region ID” 字段，例如 “z0”。
- Bucket：存储空间名称。您可参考 [快速入门文档](https://developer.qiniu.com/kodo/1233/console-quickstart) 创建新的存储空间。
- AccessKeyId：云存储的 AK。
- AccessKeySecret：云存储的 SK。

请登录七牛云，在账号信息下找到 “密钥管理”，获取 AK 和 SK。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/qn1.png" /></Frame></Frame>


## 阿里云 Vod

Vendor 为 5 时，表示将录制文件存储至阿里云 Vod，此时需要填写AlibabaCloudVodParams，成员如下：

- Region：云存储指定的地区信息，请参考 [点播中心和访问域名](https://help.aliyun.com/document_detail/98194.html)，根据您在阿里云 Vod 开通服务的区域，填写对应的 “存储区域标识” 字段，例如 “cn-shanghai”。
- AccessKeyId：云存储的 AccessKey ID。
- AccessKeySecret：云存储的 AccessKey Secret。

建议提供具有 Vod 上传权限的 RAM 用户 AccessKey，您可参考 [RAM用户概览](https://help.aliyun.com/document_detail/122148.html) 创建并获取对应的 AccessKey ID 和 AccessKey Secret。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/aliyun1.png" /></Frame></Frame>

- Title：上传时指定的视频标题，用户自定义。
- StorageLocation：存储地址，请参考 [存储管理](https://help.aliyun.com/document_detail/86097.htm) 获取。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/alivod.png" /></Frame></Frame>


## 腾讯云 Vod

Vendor 为 6 时，表示将录制文件存储至腾讯云 Vod，此时需要填写TencentCloudVodParams，成员如下：

- SecretId：云存储的 SecretId。
- SecretKey：云存储的 SecretKey。

建议提供具有 Vod 写权限的子用户 SecretId 和 SecretKey，您可参考 [访问管理用户指南](https://cloud.tencent.com/document/product/598/17848) 创建并获取对应的 SecretId 和 SecretKey。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/tc1.png" /></Frame></Frame>

- Region：云存储指定的地区信息，请参考 [媒体上传综述](https://cloud.tencent.com/document/product/266/9760#.E5.AD.98.E5.82.A8.E5.9C.B0.E5.9F.9F) 中的 “存储地域” 章节，根据您在腾讯云 Vod 开通的存储地域，填写对应的 “地域英文简称”字段，例如： “ap-beijing”。
- SubAppId：子应用 AppId，请参考 [子应用体系](https://cloud.tencent.com/document/product/266/14574)，若未开通子应用功能可不填。

## 华为云 OBS

Vendor 为 7 时，表示将录制文件存储至华为云 OBS，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [地区和终端节点](https://developer.huaweicloud.com/endpoint?OBS)，根据您在华为云 OBS 开通服务的区域，填写对应的 “区域” 字段，例如 “cn-north-4”。
- Bucket：桶名称。您可参考 [创建桶](https://support.huaweicloud.com/ugobs-obs/obs_41_0009.html) 创建新的存储桶。
- AccessKeyId：云存储的 AK。
- AccessKeySecret：云存储的 SK。

请参考 [获取访问密钥（AK/SK）](https://support.huaweicloud.com/qs-obs/obs_qs_0005.html) 获取您的 AK 和 SK。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/hw1.png" /></Frame></Frame>

## 谷歌云 Cloud Storage

Vendor 为 8 时，表示将录制文件存储至谷歌云 Cloud Storage，此时需要填写的信息如下：

- Bucket：桶名称。您可参考 [创建存储桶](https://cloud.google.com/storage/docs/creating-buckets?hl=zh-cn) 创建新的存储桶。
- AccessKeyId：云存储的 HMAC 访问密钥。
- AccessKeySecret：云存储的 HMAC 密钥。

请参考 [管理服务账号的 HMAC 密钥](https://cloud.google.com/storage/docs/authentication/managing-hmackeys?hl=zh-cn) 创建并获取您的密钥。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/google.jpeg" /></Frame></Frame>

## 移动云 EOS

Vendor 为 9 时，表示将录制文件存储至移动云 EOS，此时需要填写的信息如下：

- Region：云存储指定的地区信息，请参考 [地域和访问域名](https://ecloud.10086.cn/op-help-center/doc/article/48082)，根据您在移动云 EOS 开通服务的区域，填写对应的 “Region” 字段，例如 “eos-shanghai-1”。
- Bucket：存储 Bucket 的名称。您可参考 [创建存储桶](https://ecloud.10086.cn/op-help-center/doc/article/42933) 创建新的存储 Bucket。
- AccessKeyId：云存储的 Access Key。
- AccessKeySecret：云存储的 Secret Key。

请参考参考 [创建认证信息](https://ecloud.10086.cn/op-help-center/doc/article/24501) 创建并获取对应的 Access Key 和 Secret Key。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/eos.jpeg" /></Frame></Frame>

