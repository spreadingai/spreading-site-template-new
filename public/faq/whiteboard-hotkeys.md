<Title>互动白板 SDK 是否支持快捷键操作？</Title>



- - -

## 问题描述

互动白板 SDK 是否支持使用快捷键进行创建、删除图元，滚动、翻页白板等操作？


## 解决方案

支持。开发者可在业务层自行监听快捷键，并在相应回调中调用互动白板 SDK 相关接口执行相应的操作即可。

比如 Web 平台开发者想要实现按下键盘 Delete 键时删除当前选中图元，可参考以下代码实现：

```javascript
// 监听 keydown 事件
window.addEventListener('keydown', function (event) {
   const e = event || window.event || arguments.callee.caller.arguments[0];
   if (!e) return;
   switch (e.keyCode) {
       case 46: // 监听 Delete 按键，批量删除选中图元
           // 调用白板批量删除选中图元接口，其中 zegoWhiteboardView 为目标白板
           zegoWhiteboardView.deleteSelectedGraphics();
           break;
       default:
           break;
   }
});
```
