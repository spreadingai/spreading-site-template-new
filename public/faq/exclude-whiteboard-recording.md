<Title>录制过程中，房间内的白板不需要录制了，要如何操作？</Title>


---

仅混流录制自定义布局可实现：
在不需要录白板的时间点调用 UpdateLayout 接口，将 MixInputList 参数的所有 ViewType 均设置为 1 即可。