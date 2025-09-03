<Title>为什么 iOS 或 Android 设备连接蓝牙设备后不能通过蓝牙设备通话？</Title>



---

## iOS 设备

由于 iOS 的系统限制，iOS 的通话通道上无法使用只支持 Bluetooth A2DP 协议的蓝牙设备进行通话，需要使用支持 Bluetooth SCO 协议的蓝牙设备。


## Android 设备

在 Android 设备上，针对只支持 Bluetooth A2DP 协议的蓝牙设备，ZEGO SDK 只会使用 Bluetooth A2DP 进行声音的播放，声音的采集则是使用手机的内置麦克风。

除了上述的两种情况，您都可以正常使用蓝牙设备进行通话。
