<Title>屏幕共享时，鼠标为什么会有重影（有两个光标显示）?</Title>


---

此问题的可能原因是，当用户使用 Qt 设置鼠标时，由于 Qt 是通过 “framebuffer” 进行绘制的，所以 Qt 的鼠标会被采集到。

用户可以通过调用 “zego_screencapture_set_cursor_visible(false)” 接口关闭掉 SDK  内部的鼠标绘制，在进入屏幕共享时，重新设置一下 Qt 的鼠标。