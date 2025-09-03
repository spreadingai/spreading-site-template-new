<Title>如何获取日志文件？</Title>



---

你可以通过以下目录获取三种不同的日志：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/zegocloud/call/logs.png" /></Frame></Frame>

* Express SDK 日志：

    默认情况下，Express SDK 会生成两种类型的日志文件：

    * 以 "zegoavlog" 开头的 TXT 日志文件，默认每个日志文件的最大大小为 5MB（5 * 1024 * 1024 字节）。
    * 名为 `zegoavlog{序列号}-{时间戳}` 的 ZIP 压缩文件。解压缩该文件后，您将得到一个名为 `zegoavlog{序列号}-{时间戳}` 的 TXT 日志文件。`{序列号}` 可能会有所不同，但 `{时间戳}` 是相同的。例如，解压缩 zegoavlog3-16901111.zip 将得到 zegoavlog2-16901111.txt 日志文件。

    默认存储路径为："/storage/Android/data/[应用程序包名]/files"

* ZIM SDK 日志：
    默认存储路径为：“/storage/Android/data/[应用程序包名]/files/ZIMLogs” 


* UIKit 日志：
    默认存储路径为：“/storage/Android/data/[应用程序包名]/files/uikit_log"

请将所有这些文件发送给 ZEGO 技术支持，以帮助您解决问题。
