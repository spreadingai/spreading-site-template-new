<Title>Web 平台上，RoomKit 大班课，作为学生加入时看不到教师的画面如何处理？</Title>


---

这个问题可能是由于 RoomKit 使用的 CDN 未配置 CNAME 或 HTTPS 证书导致的，排查方法如下：

1. 遇到问题可以先打开浏览器的控制台（以 Chrome 浏览器为例：按下键盘的“F12”或鼠标右键，菜单弹窗中选择“检查”）> 选择“console”，查看是否有报错。
2. 如果控制台有报错“net::ERR_NAME_NOT_RESOLVED”，请参考 [配置域名 CNAME](/console/configure-cname) 检查是否配置了域名 CNAME。
3. 如果控制台有报错“net::ERR_CERT_COMMON_NAME_INVALID”, 请联系 ZEGO 技术支持确认 CDN 地址是否有配置 HTTPS 证书，如果没有配置，需要从域名厂商处（阿里云/腾讯云等）购买或下载免费的证书（Nginx 版），并将证书发给技术支持，让技术支持进行证书配置。
