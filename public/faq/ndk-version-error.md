<Title>编译 Roomkit 源码时，遇到 "No version of NDK..." 错误如何处理?</Title>


---

编译Roomkit源码时，如果遇到 "No version of NDK matched the requested version" 错误，需要找到项目根目录下的 local.properties 文件，在文件内容末尾增加一行：
```java
ndk.dir = ndk_path
```
ndk_path 需要替换为电脑里安装的 ndk 的路径，例如 “/Users/yourname/Library/Android/sdk/ndk/21.1.6352462”。

<Note title="说明">


如果不清楚ndk安装在哪里，可以参考 local.properties 文件中 sdk.dir 的设置，通常会安装在 sdk.dir 设置目录下的ndk子目录。


</Note>




