<Title>在房间里时，按Home键回到桌面后，点击应用图标回到应用，为什么没有回到房间？</Title>


---

这个问题是因为按Home键回到桌面后房间界面会被最小化，而回到应用时未调用 RoomKit SDK 的 [displayRoomView](https://doc-zh.zego.im/article/api?doc=RoomKit_API~java_android~class~ZegoInRoomService#display-room-view) 接口展示房间界面，所以用户看不到房间界面。<br />
要解决这个问题，需要在调用加入房间的Activity 的 onResume 里加上下面的代码，在回到应用时展示房间界面。
```java
    override fun onResume() {
        super.onResume()
        val inRoomService = ZegoRoomKit.getInRoomService()
        if (inRoomService.currentRoomInfo != null && !inRoomService.isMinimized) {
            // 从桌面点图标回来需要进行如下处理，才能保证展示房间内的View
            // 这里DemoMainActivity需要改成实际客户的Activity名称
            ZegoRoomKit.getInRoomService().displayRoomView(this@DemoMainActivity) 
        }
    }

```