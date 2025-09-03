<Title>浏览器窗口全屏时如何让白板正常显示?</Title>


---

## 问题描述
在浏览器窗口切换至全屏显示时，如果在切换之后对白板不做处理，会出现白板显示内容异常的情况。要想正常显示白板就需要全屏显示后做些处理。

## 解决方案
在白板切换至全屏时，配合 requestFullScreen API + "fullscreenchange" 事件监听，在白板全屏切换的监听回调里调用 ZegoSuperBoardSubView 的 [reloadView|\_blank](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoSuperBoardSubView&jumpType=route#reload-view) 接口可重新加载白板，以适应当前白板容器大小。

```js
document.addEventListener('fullscreenchange', function(e) {
// zegoSuperBoardSubView 为当前展示的白板
    zegoSuperBoardSubView.reloadView();
});
```

<Warning title="注意">


requestFullScreen 各浏览器实现存在较大差异，部分移动端浏览器也不支持，如需在移动端浏览器实现全屏效果请确保能正确切换至全屏，并在白板挂载节点尺寸改变完成之后调用 reloadView 接口。


</Warning>





