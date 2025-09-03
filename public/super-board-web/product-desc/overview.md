# 概述

---

## 产品简介

即构超级白板（ZegoSuperBoard），基于 ZEGO 亿级海量用户的实时信令网络，提供完整的多人实时白板互动协同服务，包括：白板涂鸦、实时轨迹同步、文档共享、文件转码、白板录制与回放、白板与实时音视频同步等多种能力，具备灵活易用、扩展性强、抽象程度高的特点，适用于在线教育、协作办公、游戏娱乐、金融面签等场景。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/board1.jpg" /></Frame>

ZEGO 超级白板 SDK 提供了以下核心功能：

| 核心功能 | 描述  |
|-------- |-------|
| 互动白板 | 提供丰富的白板工具，支持房间多人实时互动。|
| 文件静态转码 | 支持将 PPT、PPTX、Doc、PDF、XLSX 等格式文件转换为图片，转换后无动画效果。文件制作规范请参考 [文件规范](/super-board-web/product-desc/use-restrictions/filerule)。|
| 文件动态转码 | 支持将 PPT、PPTX 格式文件转换为 HTML5 页面，保留源文件中的动画效果。文件制作规范请参考 [文件规范](/super-board-web/product-desc/use-restrictions/filerule)。|
| 文件共享 | 支持在白板上多端实时同步共享文档内容。|

<Note title="说明">

ZEGO 超级白板服务与旧版产品的关系请参考 [超级白板和互动白板和文件共享是什么关系？](https://doc-zh.zego.im/faq/superboard_whiteboard_docs?product=WhiteboardView&platform=all)。
</Note>

## 产品优势

### 全平台覆盖，集成简单

全面覆盖主流平台、主流框架，支持 iOS、Android、Windows、macOS、Web 等平台，简单快速完成接入，可与 ZEGO Express SDK、ZIM SDK 等产品自由组合搭配，灵活易用，满足不同场景的需求。

### 功能齐备，符合多场景需求

提供完备的多人实时协作白板服务，支持丰富的白板标注工具、文件转码、文件共享、白板录制与回放、白板与实时音视频同步等多种能力，比面授板书更灵活，互动效率更高。

### 多种格式文件转码

支持静态转码、动态转码，可将 PPT、Doc、PDF 等常见格式的文件转换成 HTML5 页面或图片，完整保留文件中的动画效果，确保信息传递的准确性，实现文件无损还原，超低门槛点播。

### 音画同步

支持白板和音视频实时同步，用户绘制过程与本人音视频流实时同步，主讲人边画边讲、文件翻页的同时，参会人能实时同步主讲人的白板文件内容、音视频画面，避免画面声音不匹配的情况。

### 超低延时

ZEGO 自研引擎和算法，优化信令服务，节约带宽资源，白板操作延迟低至 100 ms，弱网环境下依旧能够保持流畅体验，打造真正无感知的超强互动体验。

## 功能简介

### 基础工具

| 功能名称 | 描述  |
|-------- |---------|
| 画笔 | 支持多种颜色、不同粗细的涂鸦绘制。 |
| 指针工具 | 支持选中单个/多个图元，进行移动、删除等操作。 |
| 点击工具 | 支持点击动态 PPT 的触发器后触发动画。 |
| 拖拽工具 | 支持拖拽画布。 |
| 文本工具 | 支持输入文本，设置文本字体大小和格式。 |
| 直线 | 支持绘画直线。 |
| 基础图形 | 支持绘画空心矩形、空心椭圆等基本图形。 |
| 自定义图形 | 支持自定义图形教具。 |
| 激光笔 | 支持使用激光笔示意，移动端浏览器（Web）暂不支持。 |
| 橡皮擦 | 支持按图元擦除。 |
| 清空 | 一键清空白板所有图元。 |
| 撤销、重做 | 支持撤销/恢复上一次操作。 |


### 高级功能

| 功能名称 | 描述  |
|-------- |-------|
| 白板笔锋 | 支持画笔绘制时展示笔锋效果。|
| 自定义画笔光标 | 支持白板画笔光标样式自定义。|
| 白板背景图 | 支持设置白板背景图。 |
| 插入图片元素 | 支持在白板上添加图片，可以对图片移动或缩放。|
| 文件共享 | <p>支持上传以下文件格式，文件转码后在白板上同步共享文档内容：</p><ul><li>H5 文件</li><li>动态演示文件：PPTX，PPT</li><li>静态演示文件：PPTX，PPT</li><li>文字文件：Doc，Docx</li><li>表格文件：XLS，XLSX</li><li>图片文件：JPG，JPEG，PNG，BMP</li><li>PDF 文件</li><li>TXT 文件</li></ul> |
| 翻页，滚动 | 支持上一页、下一页，和滚动浏览。 |
| 缩放操作 | 支持本地缩放、同步缩放操作，缩放比例 100% ～ 300%。 |
| 动效上下步 | 支持动效上一步、下一步。 |
| 文件缩略图 | 支持显示 PPT，PDF 文件的缩略图。 |
| 实时轨迹同步 | 支持将正在绘制的笔迹实时同步到远端。 |
| 权限控制 API | <p>支持白板和图元操作权限的设置：</p><ul><li>白板：滚动和缩放操作。</li><li>图元：创建、编辑、移动、删除和清空等操作。</li></ul>|
| 白板自适应 | 支持白板自适应父容器尺寸。|
| 录制回放 | 支持对白板画布操作内容录制与回放。|
| 图元操作与实时音视频同步 | 保持白板操作与音视频同步。 |
| 白板信息 | 白板 ID、白板类型、白板页码、内容宽高、共享鉴权信息等。 |
| 文件信息 | 文件 ID、文件类型、文件页码、内容宽高、共享鉴权信息等。 |



## 平台支持

ZEGO 超级白板 SDK 支持 iOS、Android、Web 等主流平台，并支持平台间互通，具体的兼容性要求见下表。

| 平台         | SDK   | 体验 App | 示例源码 | 兼容性 |
| ------------ | ----- | -------- | -------- | ------ |
| [iOS](https://doc-zh.zego.im/super-board-ios/product-desc/overview)          | 支持  | 支持     | 支持     | iOS 11.0 或以上版本。 |
| [Android](https://doc-zh.zego.im/super-board-android/product-desc/overview)      | 支持  | 支持     | 支持     | Android 5.0 或以上版本。 |
| [Web](https://doc-zh.zego.im/super-board-web/product-desc/overview)          | 支持  | 支持     | 支持     | 请参考 [SDK 支持的浏览器版本](/super-board-web/quick-start/create-white-board#准备环境)。 |
| [Flutter](https://doc-zh.zego.im/super-board-flutter/product-desc/overview)      | 支持  | 不支持   | 支持     | <ul><li>Flutter 版本需介乎 1.10.0 与 3.13.7 之间（包括这两个版本）。</li><li>iOS 11.0 或以上版本。</li><li>Android 5.0 或以上版本。</li><li>不支持在 Android 8.0 设备上加载动态 PPT 文件。</li></ul> |
| [Electron](https://doc-zh.zego.im/super-board-electron/product-desc/overview)     | 支持  | 支持     | 支持     | <ul><li>Electron 7.0.0 ～ 23.0.0 版本</li><li>Windows 7 或以上</li><li>macOS 10.13 及以上系统。</li></ul> |
| [React Native](https://doc-zh.zego.im/super-board-rn/product-desc/overview) | 支持  | 不支持   | 支持     | <ul><li>React Native 0.60.0 或以上版本</li><li>iOS 11.0 或以上版本</li><li>Android 5.0 或以上版本</li></ul> |

<Content />