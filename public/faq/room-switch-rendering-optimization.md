<Title>在需频繁切换房间的场景，拉流端画面渲染的速度比较慢，如何进行优化？</Title>



- - -

1. 客户业务侧自行管理流 ID，登录房间同时进行拉流操作（顺序上应该先调用 “LoginRoom”，再直接调用 “startPlayingStream”）。
2. 调用 “switchRoom” 切换房间（首次登录时调用 “loginRoom”，之后退出再登录可以直接使用 “switchRoom”）。