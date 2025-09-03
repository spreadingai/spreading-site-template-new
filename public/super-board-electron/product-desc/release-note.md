# 发布日志
---

## 2.3.2 版本

发布日期： 2025-05-09

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 添加内部渲染耗时日志 | 支持渲染白板时统计渲染耗时并记录与上报日志。 | - |


## 2.3.1 版本

发布日期： 2024-12-30

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化文件渲染速度 | 提高静态文件（包括PPT、DOC、TXT、PDF等格式）的渲染速度。| - |


## 2.3.0 版本

发布日期：2024-11-20

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增工具 | [ZegoSuperBoardTool](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~enum~ZegoSuperBoardTool) 新增箭头工具类型 [Arrow](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~enum~ZegoSuperBoardTool#arrow)，可用于绘制箭头。 | [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#set-tool-type)|


## 2.2.0 版本

发布日期：2024-11-06

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化使用手写板进行涂鸦的效果| 优化使用手写板进行涂鸦容易出现断触的场景 | - |

**问题修复**

- 修复了改变容器大小后激光笔出现偏移的问题
- 修复了 Windows 系统中图片文件名显示异常的问题


## 2.1.1 版本

发布日期： 2023-10-16
**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 增加 Manager 类上全部 API 接口的校验 | 在 API 接口调用时，增加参数的强校验逻辑，传入错误参数时会提示具体错误信息，保证接口调用传参的正确性。| - |


## 2.0.0 版本

发布日期： 2023-09-26

**新增功能**

首次发布。超级白板包括白板涂鸦、实时轨迹同步、文档共享、文件转码、白板录制与回放、白板与实时音视频同步等多种能力。
