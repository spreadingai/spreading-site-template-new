<Title>Express 如何设置和获取 SDK 的日志、堆栈信息？</Title>



- - -



## Native 平台

Native 平台主要指 Android、iOS、macOS 和 Windows 平台。

### 设置日志属性

默认情况下，SDK 会生成两种类型的日志文件：
- 以 “zegoavlog” 开头的 TXT 日志文件，单个日志文件默认大小上限为 5MB (5 * 1024 * 1024 Bytes)。
- 以 `zegoavlog{序号}-{时间戳}` 命名的 zip 压缩文件。文件解压缩后，得到以 `zegoavlog{序号}-{时间戳}` 命名的 TXT 日志文件。`zegoavlog{序号}` 可能有所不同，但 `{时间戳}` 是相同的。

    例如 zegoavlog3-16901111.zip 解压缩后得到 zegoavlog2-16901111.txt 日志文件。



各平台默认的存储路径为：

- Android：“/storage/Android/data/[应用包名]/files”
- iOS：“~/Library/Caches/ZegoLogs”
- macOS：
    - 沙箱：“~/Library/Containers/[应用包名 Bundle ID]/Data/Library/Caches/ZegoLogs”
    - 非沙箱：“~/Library/Caches/ZegoLogs”
- Windows：“C:\用户\当前用户名\AppData\\[应用包名]\ZEGO.SDK\ZegoLogs”
- Linux：没有默认的存储路径，开发者需要主动调用 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~ZegoExpressSDK#set-log-config) 接口，自定义 SDK 日志文件的大小和路径。例如：“~/zegolog”


开发者也可以设置 ZegoLogConfig 属性，包括日志的存储路径 “logPath” 和日志文件大小上限 “logSize”，调用 setLogConfig 接口自定义 SDK 的日志属性。

<Note title="说明">


必须在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 之前，调用 setLogConfig 接口设置日志的属性才生效，若在 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 之后设置，则在 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 后的下一次 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 时生效。

</Note>




#### Android

以设置日志存储路径为 “/data/user/0/包名/files”，单个日志文件大小上限为 5MB 为例：

```java
ZegoLogConfig logConfig;
// 设置日志存储路径
logConfig.logPath = getApplicationContext().getFilesDir().getAbsolutePath();
// 设置单个日志文件大小上限
logConfig.logSize = 5242880L;
ZegoExpressEngine.setLogConfig(logConfig);
```

API 参考：[ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-log-config)、[setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-log-config)


#### iOS/macOS

以设置日志存储路径为 “[[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ZegoLogs"]”，单个日志文件大小上限为 5MB 为例：

```objc
// 设置日志存储路径
NSString *appLogPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ZegoLogs"];
ZegoLogConfig *logConfig = [[ZegoLogConfig alloc] init];
logConfig.logPath = appLogPath;
// 设置单个日志文件大小上限
logConfig.logSize = 5 * 1024 * 1024;
[ZegoExpressEngine setLogConfig:logConfig];
```

API 参考：
- iOS：[ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-log-config)、[setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-log-config)
- macOS：[ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-log-config)、[setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine#set-log-config)


#### Windows/Linux

以设置日志存储路径为 “/Users/zego/Log/log.txt”，单个日志文件大小上限为 5MB 为例：

```cpp
ZegoLogConfig logConfig;
// 设置日志存储路径
logConfig.logPath = "/Users/zego/Log/log.txt";
// 设置单个日志文件大小上限
logConfig.logSize = 5242880L;
ZegoExpressSDK::setLogConfig(logConfig);
```

API 参考：[ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~struct~zego-express-zego-log-config)、[setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#set-log-config)


### 获取日志信息

Android、iOS、macOS、Windows、Linux 平台根据以下方式，可获取 SDK 的日志信息。

<Note title="说明">



以下获取日志的路径皆以 SDK 的默认路径为例，如果开发者自定义了日志文件的存储路径，请到对应的路径下获取。

</Note>






- Android

    “/storage/Android/data/[应用包名]/files” 路径下，以 “zegoavlog” 开头的 TXT 文件为日志信息。

- iOS/iPadOS

    1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode_device_window_menu.png" /></Frame></Frame>

    2. 在左侧选择指定设备，然后在 “INSTALLED APPS” 中找到需要取日志的 App， 单击下方齿轮图标，选择 “Download Container...” 并保存。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/xcode-device-window.png" /></Frame>

    3. 打开“访达”找到保存的 “.xcappdata” 文件，右键选择 “显示包内容”， 选择 “AppData/Library/Caches/ZegoLogs” 目录，以 “zegoavlog” 开头的 TXT 文件为日志信息。


- macOS

    - 沙箱：“~/Library/Containers/[应用包名 Bundle ID]/Data/Library/Caches/ZegoLogs” 路径下，以 “zegoavlog” 开头的 TXT 文件为日志信息。

    - 非沙箱：“~/Library/Caches/ZegoLogs” 路径下，以 “zegoavlog” 开头的 TXT 文件为日志信息。

- Windows

    日志文件夹的命名为：“程序的进程名字” + “ZEGO.SDK”。 在 “我的电脑” 路径下直接输入 “%APPDATA%” 并回车，即可定位到日志文件夹存放目录。以 “zegoavlog” 开头的 TXT 文件为日志信息。

- Linux

    在日志文件夹中以 “zegoavlog” 开头的 TXT 文件为日志信息。 

    Linux 平台没有默认的存储路径，开发者请根据在 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~ZegoExpressSDK#set-log-config) 接口中自定义的 SDK 日志文件的路径进行查找。


### 获取堆栈信息

发生崩溃时，SDK 会产生崩溃的堆栈信息，Android、iOS、macOS、Windows、Linux 平台根据以下方式，可获取 SDK 的堆栈信息。

- Android

    - 实时分析日志

    `adb logcat | ndk-stack -sym [目标 abi (armeabi/armeabi-v7a/arm64-v8a) 的 so 动态库所在的目录]`

    例如：

    `adb logcat | ndk-stack -sym /path/to/your/project/armeabi-v7a`

    - 先获取日志再分析 (用 `adb logcat` 保存日志文件，再通过 `ndk-stack` 命令分析)

    `adb logcat > xx.log`

    `ndk-stack -sym [目标 abi 的 so 动态库所在的目录] -dump [日志文件]`

    例如：

    `adb logcat > crash.log`

    `ndk-stack -sym /path/to/your/project/armeabi-v7a -dump crash.log`

- iOS/iPadOS

<Warning title="注意">


    如果第一种方法无法获取到堆栈信息，可以使用第二种方法获取。  
    
</Warning>



    有两种获取方式：
    - 第一种 Xcode 获取方式：
      1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
      2. 在左侧选择指定设备，然后单击 “View Device Logs”，找到 Process 对应的应用包名，并且 Type 为 Crash 的对应时间的日志，右键单击此条日志并选择 “Export Log”，保存的 “.crash” 文件为堆栈信息。
    - 第二种 Xcode 获取方式：
      1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
      2. 在左侧选择指定设备，然后单击 “Open Recent Logs”，找到对应时间的”.ips“文件为堆栈信息。

- macOS

    “~/Library/Logs/DiagnosticReports” 路径下，以 “.crash” 结尾的文件为堆栈信息。

- Windows
    
    1. 找到注册表路径：
    ```cpp
    HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\WindowsError Reporting\LocalDumps
    ```
    
    2. 在右侧窗口，新建字符串值 DumpCount、DumpFolder、DumpType 并修改其值，如下所示：
    DumpType的值：
    0 = Create a custom dump
    1 = Mini dump
    2 = Full dump

    <Frame width="512" height="auto" caption=""><img src="https://storage.zego.im/sdk-doc/Pics/FAQ/expressSDKlogwindows.png" /></Frame>
    
    3. 系统在程序崩溃时，会在上面设置的 DumpFolder 目录下，生成对应程序的 Dump 文件为堆栈信息。

- Linux
    
    1. 打开 core 开关
        - 命令行方式
        ```cpp
        # 命令行输入下面的命令
        ulimit -c unlimited
        ```
        - 修改配置文件方式
        ```cpp
        vim /etc/security/limits.conf
        # 在打开的文件里面去除包含 soft core 0 一行前面的注释，并将 0 改为 unlimited
        ```
    2. 修改 core 产生路径和命名规则
    
    默认情况下，若按照上面任意 1 种方式打开 core 开关后，当程序崩溃时，会在启动程序时的目录下，生成文件名为 core 的堆栈信息文件，新生成的 core 会覆盖已存在的 core。 
    通过修改 `/proc/sys/kernel/core_pattern` 可以控制 core 文件保存的位置和文件格式
    ```c
    # 例如：将所有的 core 文件生成到 /corefile 目录下，文件名的格式为 core-命令名-pid-时间戳。
    echo "/corefile/core-%e-%p-%t" > /proc/sys/kernel/core_pattern
    ```







## Web 平台

Web 平台默认开启日志上报功能。

<Note title="说明">



ZEGO 推荐开发者使用默认日志配置信息，如有特殊需求，可参考以下说明设置日志输出等级。

</Note>





### 设置日志输出等级

调用 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-log-config) 接口，通过 [ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLogConfig) 对象中的 “logLevel” 属性设置本地控制台打印的日志级别。

<table>
  
  <tbody><tr>
    <th>属性</th>
    <th>含义</th>
    <th>日志级别</th>
  </tr>
  <tr>
    <td>logLevel</td>
    <td>本地控制台日志级别</td>
    <td><ul><li>debug</li><li>info</li><li>warn</li><li>error</li><li>report</li><li>disable</li></ul>以上级别从上至下依次递增，等级越高打印日志越少。</td>
  </tr>
</tbody></table>


```javascript
const config = {
    logLevel: 'debug',
};
zg.setLogConfig(config);
```



## 其他平台

使用 Futter、Electron、uni-app、Uniy3D、React Native 等跨平台框架时，可参考上文 [Native 平台](#native-平台) 设置和获取日志的方式。

<Note title="说明">


uni-app、React Native 不支持设置路径仅可从默认路径获取日志。

</Note>

