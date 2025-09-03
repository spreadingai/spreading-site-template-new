<Title>Web 平台登录房间时提示报错：“cmd=login, err_code=1011, err_message=token format error”？</Title>



- - -


登录房间时 “token” 参数传入的格式错误导致该报错，“token” 为字符串类型，需要将 json 格式经过 base64 加密后再传入 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口中，具体实现请参考 [快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#登录房间) 的 “登录房间”。
