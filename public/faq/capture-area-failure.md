<Title>为什么区域采集设置失效？</Title>


---

“zego_screencapture_set_target_window_rect” 接口必须要在 “zego_screencapture_set_target_screen” 接口之前调用。

<Warning title="注意">


以下方法请配对使用：
- 如果用户仅需要采集桌面屏幕、不过滤窗口，仅采集屏幕区域，建议使用：“zego_screencapture_set_target_screen” 和 “zego_screencapture_set_target_rect”。
- 如果用户需要采集窗口、窗口区域、过滤窗口，采集屏幕并需要过滤窗口，建议使用：“zego_screencapture_set_target_window” 和 “zego_screencapture_set_target_window_rect”。

</Warning>

 