<Title>当 Windows 端的白板遮挡住用户的模态对话框后，用户的程序无法点击时该如何处理？</Title>



- - -

### 问题描述

Windows 端的白板遮挡住用户的模态对话框后，用户无法点击程序。

### 问题原因

白板窗口没有与用户程序共用消息循环，当用户程序弹出模态对话框后白板依然可以点击，再点击白板窗口时会覆盖掉模态对话框，导致用户程序无法点击。

### 解决方案

在弹模态框前调用 `zego_whiteboard_show_view(viewID,false)` 隐藏白板 view，在关闭模态框后调用 `zego_whiteboard_show_view(viewID,true)` 显示白板 view，这样在模态框弹出期间，白板被隐藏，就不会覆盖模态框了。参考如下 MFC 代码：

```cpp
//隐藏白板view
zego_whiteboard_show_view(viewID,false);
//弹出模态框
AfxMessageBox(L"");
//显示白板view
zego_whiteboard_show_view(viewID,true);
```
