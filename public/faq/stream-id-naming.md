<Title>如何定义 streamID 比较合适？</Title>



---

接入音视频 SDK 时，开发者在定义 streamID 时，需要遵循如下约束条件：   

- 长度不超过 256 的字符串。   
- 不可以包含 URL 关键字，否则推拉流失败。
- 仅支持数字、英文字符和 "-"、"_"。

开发者可以使用 userID、或 “roomID 与 userID 组合” 的形式，来定义 streamID。   

为避免出现异常情况，推荐开发者使用 “roomID 与 userID 组合” 的形式来定义 streamID，以保证流在不同房间的唯一性。