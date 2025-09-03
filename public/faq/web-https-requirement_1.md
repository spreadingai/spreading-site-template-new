<Title>在 Web 平台上部署服务器时，必须使用 HTTPS 协议吗？</Title>



- - -


是的。基于浏览器安全策略对隐私性的要求，Web 平台调用摄像头强制要求 “https”，此安全策略是浏览器的要求。

ZEGO SDK 依赖于浏览器提供的 webRTC API，所以只支持 SSL 的 Web 服务器（https）、localhost、127.0.0.1（等同于 https）。
