<Title>为什么启动录制后，录制任务成功，但是录制结果的视频中没有显示白板？</Title>



---

通过 [StartRecord](/cloud-recording-server/start) 录制的视频没有显示白板，可能有以下几种原因：

- 如果 `MixMode` 参数设置为 “1（自定义布局）”，且所有窗口的 `ViewType` 都设置成了 “1（音视频）”，此时不显示白板，按照音视频流推流的顺序，仅显示音视频流。
- 该房间 RoomId 内没有使用过白板。
- 将 `HasWhiteboard` 参数设置成了 “false（不录制白板）”。
- 没有传入 `WhiteboardId`。