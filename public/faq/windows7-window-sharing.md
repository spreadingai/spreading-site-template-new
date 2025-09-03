<Title>如何处理 Windows 7 窗口共享异常？</Title>



- - -

## 问题描述

1. 在 Windows 7 版本上共享文件资源管理器窗口时，远端用户看到的共享窗口的搜索框颜色可能异常（黑色）。

2. 在 Windows 7 版本上共享谷歌浏览器窗口时，远端用户可能完全看不到共享窗口。

3. 在 Windows 7 以上版本（Windows 8、Windows 8.1、Windows 10）上，开启屏幕 DPI（Dots Per Inch，每英寸点数）缩放或者共享时修改屏幕分辨率，远端用户看到的共享窗口不完整或者有黑边。


## 问题原因

Windows 的窗口类型多，简单的通过 GDI（Graphics Device Interface，图形设备接口）方式拷贝窗口位图无法满足各种场景下的共享窗口的要求。

## 解决方案

[ZegoScreenCapture-Windows SDK](https://doc-zh.zego.im/article/3167) 通过组合各种采集方式来满足大部分场景，在窗口采集时提供了多种模式选择。

```cpp
enum ZegoScreenCaptureWindowMode
	{
		kZegoScreenCaptureWindowModeWindow = 1,			///< 截取窗口整体画面
		kZegoScreenCaptureWindowModeClient = 2,			///< 截取窗口客户区
		kZegoScreenCaptureWindowModeRgn1 = 3,			///< 截取窗口对应屏幕区域	(窗口被覆盖后继续捕获对应区域)
		kZegoScreenCaptureWindowModeRgn2 = 4,			///< 截取窗口对应屏幕区域	(窗口被覆盖后继续捕获，覆盖区域涂黑)
		kZegoScreenCaptureWindowModeRgn3 = 5,			///< 截取窗口对应屏幕区域	(窗口被覆盖后继续捕获，过滤上层覆盖的窗口，win8 及以后系统生效)
	};

/// \brief 在采集目标为单个窗口的模式下,设置目标采集模式,比如是全部窗口内容还是窗口客户区内容(macOS没有实现)
/// \param mode 窗口采集模式,默认采集整个窗口
/// \return 设置成功返回非0值,否则返回0
/// \note 在zego_screencapture_set_target_window后调用本接口进行设置,kZegoScreenCaptureWindowModelClient仅支持有限窗口
/// \see zego_screencapture_set_target_window
/// \see ZegoScreenCaptureWindowMode
SCREENCAPTURE_API int zego_screencapture_set_target_window_mode(enum ZegoScreenCaptureWindowMode mode);
```

### 各模式差别

- “kZegoScreenCaptureWindowModeWindow” 和 “kZegoScreenCaptureWindowModeClient” 模式是通过 GDI 采集窗口的位图。

- “kZegoScreenCaptureWindowModeRgn1”、“kZegoScreenCaptureWindowModeRgn2” 和 “kZegoScreenCaptureWindowModeRgn3” 模式是通过 GDI 采集窗口在屏幕中的位图，相当于采集屏幕位图，然后把窗口图像提取出来。三者的区别是在共享窗口被覆盖时的处理方式不同：
    - kZegoScreenCaptureWindowModeRgn1：窗口被覆盖后继续捕获对应区域。
    - kZegoScreenCaptureWindowModeRgn2：窗口被覆盖后继续捕获，覆盖区域涂黑。
    - kZegoScreenCaptureWindowModeRgn3：窗口被覆盖后继续捕获，过滤上层覆盖的窗口，win8 及以上版本系统生效。


### 场景推荐

用户在共享窗口时主要有如下两种场景：

- 场景一

固定采集某个窗口，例如需要指定共享某个 APP 窗口时，优先使用 “kZegoScreenCaptureWindowModeWindow” 模式。当共享窗口出现 “问题描述” 中的现象时，则可以根据产品需求切换到其他模式进行尝试。

```cpp
zego_screencapture_set_target_window_mode（kZegoScreenCaptureWindowModeWindow）；
```

- 场景二

采集的窗口不确定，或者运行的系统版本也不确定，建议使用 “kZegoScreenCaptureWindowModeRgn3” 模式。此模式由于是相当于采集的屏幕的图像，所以跟被采集窗口的特性无关，能兼容所有类型的窗口。在处理窗口被覆盖或者移出屏幕外面的场景时，也可以根据需求选择 “kZegoScreenCaptureWindowModeRgn1” 或 “kZegoScreenCaptureWindowModeRgn2” 模式。

```cpp
zego_screencapture_set_target_window_mode（kZegoScreenCaptureWindowModeClient）；
```
