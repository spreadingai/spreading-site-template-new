# CDN 推流鉴权

- - -

## 推流鉴权简介

为防止攻击者盗取您的推流 URL 地址在别处推流使用、或伪造您的服务器生成推流 URL 地址，从而造成流量损失，您可以通过 [ZEGO 控制台](https://console.zego.im/) 自助配置 `推流鉴权`，当开启鉴权后，需要在推流 URL 地址中拼接相关的鉴权参数，否则无法推流。

<Warning title="注意">


- 您从 [ZEGO 控制台](https://console.zego.im/) 配置 `推流鉴权` 后，请妥善保管 **KEY**，勿轻易泄露，以防被攻击者获取，造成损失。
- 若您是 RTC 转推 CDN、或混流转推 CDN，ZEGO 服务器会自动帮您生成、并拼接 URL 地址的参数，您无需再自行生成；若您是通过第三方平台推流，则需要自行生成和拼接相关参数。
</Warning>


使用时，请您根据自己的 AppID 主营业务地区，参考如下文档进行配置。

- AppID 主营业务地区为 `大陆`，请参考 [腾讯云鉴权说明](https://doc-zh.zego.im/article/15834#2) 或 [华为云鉴权说明](https://doc-zh.zego.im/article/15834#4)。
- AppID 主营业务地区为 `港澳台或海外`，请参考 [网宿云鉴权说明](https://doc-zh.zego.im/article/15834#3)。



## 腾讯云鉴权说明

开启 `推流鉴权` 后，完整的推流地址如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_tencent.png" />
</Frame>

其中，“domain” 和“接入点”，请在 “控制台 > 项目详情 > 服务配置 > CDN 服务 > CDN 相关地址” 获取。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_console.png" />
</Frame>

### 1 生成鉴权密钥

请前往 [ZEGO 控制台](https://console.zego.im/)，在您的 “项目配置 > 服务配置” 中，找到 `鉴权配置`，开启，在弹出的对话框中配置或自动生成推流鉴权 KEY。

其中，主 KEY 为必填、备 KEY 为选填。**我们建议您同时配置主 KEY 和备 KEY，如果主 KEY 泄露，可平滑切换到备 KEY，不影响您的业务使用。**

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_tencent_1.png" />
</Frame>

### 2 生成 txTime

txTime，指该推流 URL 地址的有效期。

例如，当前的时间是 2018-12-29 11:13:45，期望新生成的 URL 是在 3 小时后失效，那么：

1. txTime 就可以设置为 2018-12-29 14:13:45。
2. 再将该时间转换成 Unix 时间戳格式（即 1546064025）。
3. 然后再转换成十六进制，以进一步压缩字符长度，得到 txTime = 5c271099（十六进制）。

### 3 生成 txSecret

txSecret 的生成方法是 `txSecret = MD5(KEY + StreamName + txTime)`。

其中：

- KEY：指您在 [生成鉴权密钥](#1-生成鉴权密钥) 中配置的加密 KEY。
- StreamName：流名称，用户自定义，用于标识直播流。
- txTime：指您在 [生成 txTime](#2-生成-txtime) 中生成的 txTime。
- MD5：标准的 MD5 单向不可逆哈希算法。

### 4 得到 URL 地址

按照以上步骤完成后，最终地址如下（示例地址，该地址仅作为格式参考，请勿直接线上使用）：

```url
rtmp://push-tencent1.zego.im/live/123?txSecret=235cec79bf9483439762ddfd491387e2&txTime=5c271099
```


## 网宿云鉴权说明

开启 `推流鉴权` 后，完整的推流地址如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_ws.png" />
</Frame>

其中，“domain” 和“接入点”，请在 “控制台 > 项目详情 > 服务配置 > CDN 服务 > CDN 相关地址” 获取。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_console.png" />
</Frame>

### 1 生成鉴权密钥

请前往 [ZEGO 控制台](https://console.zego.im/)，在您的 “项目配置 > 服务配置” 中，找到 `鉴权配置`，开启，在弹出的对话框中配置或自动生成推流鉴权 KEY。

其中，主 KEY 为必填、备 KEY 为选填。**我们建议您同时配置主 KEY 和备 KEY，如果主 KEY 泄露，可平滑切换到备 KEY，不影响您的业务使用。**

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_tencent_1.png" />
</Frame>

### 2 生成 wsABStime

wsABStime，指该推流 URL 地址的有效期。

例如，当前的时间是 2018-12-29 11:13:45，期望新生成的 URL 是在 3 小时后失效，那么：

1. wsABStime 就可以设置为 2018-12-29 14:13:45。
2. 再将该时间转换成 Unix 时间戳格式（即 1546064025）。
3. 然后再转换成十六进制，以进一步压缩字符长度，得到 wsABStime = 5C271099（十六进制）。

### 3 生成 wsSecret

wsSecret 的生成方法是 `wsSecret = MD5(wsABStime + StreamName + KEY)`。

其中：

- wsABStime：指您在 [生成 wsABStime](#2-生成-wsabstime) 中生成的 wsABStime，例如 65A006AA。
- StreamName：路径，格式为 “/接入点/streamID”，例如 /live/streamid123。
- KEY：指您在 [生成鉴权密钥](#1-生成鉴权密钥) 中配置的加密 KEY，例如 KEY123。
- MD5：标准的 MD5 单向不可逆哈希算法。

即 wsSecret = MD5(65A006AA/live/streamid123KEY123)

### 4 得到 URL 地址

按照以上步骤完成后，最终地址如下（示例地址，该地址仅作为格式参考，请勿直接线上使用）：

```url
rtmp://push-ws1.zego.im/live/123?wsSecret=235cec79bf9483439762ddfd491387e2&wsABStime=5C271099
```


## 华为云鉴权说明

开启 `推流鉴权` 后，完整的推流地址如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/authentication_huawei.png" />
</Frame>

其中，“domain” 和“接入点”，请在 “控制台 > 项目详情 > 服务配置 > CDN 服务 > CDN 相关地址” 获取。

### 1 获取鉴权密钥

请联系 ZEGO 技术支持，配置华为云 CDN 推流鉴权的相关权限，获取鉴权密钥。

### 2 生成 hwTime

hwTime，指该推流 URL 地址的有效时长。

例如，当前的时间是 2018-12-29 11:13:45，期望新生成的 URL 是在 3 小时后失效，那么：

1. hwTime 就可以设置为 2018-12-29 14:13:45。
2. 再将该时间转换成 Unix 时间戳格式（即 1546064025）。
3. 然后再转换成十六进制，以进一步压缩字符长度，得到 hwTime = 5c271099（十六进制）。

### 3 生成 hwSecret

hwSecret 的生成方法是 `hwSecret = hmac_sha256（KEY, StreamName + hwTime）`。

其中：

- KEY：指您在 [获取鉴权密钥](#1-获取鉴权密钥) 中获取的鉴权密钥。
- StreamName：流名称，用户自定义，用于标识直播流。
- hwTime：指您在 [生成 hwTime](#2-生成-hwtime) 中生成的 hwTime。
- hmac_sha256：HMAC-SHA256 加密算法。

### 4 得到 URL 地址

按照以上步骤完成后，最终地址如下（示例地址，该地址仅作为格式参考，请勿直接线上使用）：

```json
rtmp://push-huawei1.zego.im/live/123?hwSecret=ce201856a0957413319e883c8ccae13602f01d3d91e21daf5161964cf708a6a8&hwTime=5c271099
```

<Content />