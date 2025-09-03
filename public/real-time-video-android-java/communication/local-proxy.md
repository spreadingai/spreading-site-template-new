
# 本地代理

### 功能简介

本地代理（原“客户端代理”）指开发者可以设置 socks5 代理服务器作为 SDK 数据的中转站，启用本地代理后，SDK 所有网络数据的收发，都会经过所设置的 socks5 代理服务器。

### 使用场景

当开发者的本地网络使用 socks5 代理服务器访问外网时，将无法通过直连的方式访问 ZEGO 服务，那么此时可以使用本地代理功能来访问 ZEGO 服务。

### 架构说明

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/iOS_Client_Framework.png" />
</Frame>

### 使用流程

<Steps>
<Step title="配置代理服务器">
请确保您的代理服务器和代理，支持标准 socks5 协议代理服务器。
<Warning title="注意">若无法支持标准 socks5 协议代理服务器，请联系 ZEGO 技术支持进行配置。</Warning>
socks5 代理服务器推荐使用 3proxy 及 Dante（ubuntu）。

- Dante 安装配置，请参考 [Dante 安装配置教程](http://wiki.kartbuilding.net/Dante_Socks_Server)。
- 3proxy 安装配置，请参考 [3proxy 安装配置教程](https://3proxy.org/doc/howtoe.html)。
```shell title="3proxy 示例配置"
#!/usr/local/bin/3proxy
#3proxy 内部超时时间
timeouts 1 5 30 60 180 1800 15 60 
#新增用户名和密码
users hyz:CL:12345678 hyz1:CL:123456789 

#log 保存地址
log /root/3proxy/3proxy.log D 
#log 保存格式
logformat "- +_L%t.%.  %N.%p %E %U %C:%c %R:%r %O %I %h %T" 
#轮换的 log 数量
rotate 30 

#代理服务器的地址
internal 192.168.200.55 

#开启鉴权
auth strong 
flush
#允许访问的用户名
allow hyz,hyz1 
#指定 socks 5 的端口
socks -p1080 

#socks5 支持的最大连接数 
#ZEGO 配置需要根据客户端数量和推拉流数量计算，1 个客户端 1 路推流加 1 路拉流至少需要 3+1+1=5 条连接 
#例如：10 个客户端，每个客户端有 10 个推流和 10 个拉流，那么总共至少需要 10*(3+10*1+10*1)=230 条连接，建议适当增加冗余，将 maxconn 配置为 300
**maxconn** **300** 
```

</Step>
<Step title="配置客户端">
客户端需配置的代理信息如下：


:::if{props.platform="undefined|android"}

```java
//方式一
ZegoProxyInfo proxy = new ZegoProxyInfo();
//支持设置域名或者 ip 地址
//proxy.hostName = "xxxxxxxxxxx.zego.im"; 
proxy.ip = "192.168.1.1";
proxy.port = 1080;

//如有代理验证，需要填 username、password，没有则可不填
 proxy.userName = "admin";
 proxy.password = "bigsecret";

//支持同时设置多个，当一个代理不可用时，会自动切换到下一个
ArrayList<ZegoProxyInfo> list = new ArrayList<~>();
list.add(proxy);
ZegoExpressEngine.setLocalProxyConfig(list, true);

//方式二
/*
 * 通过设置 advancedConfig 来配置 socks5 代理信息。(需要在创建引擎前设置)
 * key 为 "socks5_proxy"
 * value 为以下格式:
 * 字段解释：
 * socks5:1             // 设置是否开启 socks5, 0 为关闭，1 为开启
 * ip:192.168.100.1     // 设置代理 IP 地址，此处该填真实的 IP 地址
 * port：1080           // 设置代理端口号，此处该填真实的端口号
 * username:admin       // 设置代理安全校验用户名，如无安全校验，可不设置该字段
 * password:123456      // 设置代理安全校验密码，如无安全校验，可不设置该字段

 * 字段与字段间使用 '&' 连起来
 * 参考值："socks5:1&ip:192.168.100.1&port:1080&username:admin&password:123456"
 */

ZegoEngineConfig engineConfig = new ZegoEngineConfig();
HashMap<String, String> advanceConfig = new HashMap<>();
String proxy = String.format("socks5:1&ip:%s&port:%s&username:%s&password:%s",
                        "192.168.100.1", "1080", "admin", "123456");
advanceConfig.put("socks5_proxy", proxy);
engineConfig.advancedConfig = advanceConfig;
ZegoExpressEngine.setEngineConfig(engineConfig);
```
:::
:::if{props.platform="iOS"}
```swift
// 方式一
 ZegoProxyInfo* proxy = [ZegoProxyInfo alloc];
//支持设置域名或者 ip 地址
 proxy.ip = @"192.168.1.1"; 
//proxy.hostName = @"xxxxxxxxxxxxx.zego.im";
 proxy.port = 10826;  
//如有代理验证，需要填 username、password，没有则可不填
 proxy.userName = @"admin";
 proxy.password = @"bigsecret";

//支持同时设置多个，当一个代理不可用时，会自动切换到下一个
 NSArray<ZegoProxyInfo *> *inputArray = @[proxy];   
 [ZegoExpressEngine setLocalProxyConfig:inputArray enable:TRUE];

// 方式二
/*
 * 通过设置 advancedConfig 来配置 socks5 代理信息。(需要在创建引擎前设置)
 * key 为 "socks5_proxy"
 * value 为以下格式:
 * 字段解释：
 * socks5:1             // 设置是否开启 socks5, 0 为关闭，1 为开启
 * ip:192.168.100.1     // 设置代理 IP 地址，此处该填真实的 IP 地址
 * port：1080           // 设置代理端口号，此处该填真实的端口号
 * username:admin       // 设置代理安全校验用户名，如无安全校验，可不设置该字段
 * password:123456      // 设置代理安全校验密码，如无安全校验，可不设置该字段

 * 字段与字段间使用 '&' 连起来
 * 参考值："socks5:1&ip:192.168.100.1&port:1080&username:admin&password:123456"
 */
ZegoEngineConfig *config = [[ZegoEngineConfig alloc] init];
NSString *socks5 = [NSString stringWithFormat:@"socks5:1&ip:%@&port:%@&username:%@&password:%@",
@"192.168.100.1", @"1080", @"admin", @"password"];
config.advancedConfig = @{@"socks5_proxy": socks5};
[ZegoExpressEngine setEngineConfig:config];
```
:::

</Step>
</Steps>

### 常见问题

#### 1. 如何查看本地代理是否生效？

**设置 socks5 代理不生效要如何解决？**

- 检查 socks5_proxy 的配置信息字段，例如，socks5:1 是否开启；IP、Port 是否为有效值；如果代理配置了安全校验，需验证 username 与 password 是否设置正确。
- 需确保在创建引擎前设置 socks5 代理，不支持中途修改。