<Title>推流时，调用 “enableTrafficControl” 方法开启流控后，网络质量比较差时，为什么仅主路流会触发流控策略？</Title>



--- 

目前 Android、iOS、macOS 和 Windows 平台 SDK 的 [enableTrafficControl](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#enable-traffic-control) 方法中没有 “channel” 参数，默认只对主流生效。当存在同时推两路流的情况时，辅流无法使用流控。
