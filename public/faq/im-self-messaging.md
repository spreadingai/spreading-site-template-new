<Title>支持发送消息给自己吗？</Title>


- - -

目前不支持通过 `sendMessage` 接口，向自己发送消息（即 toConversationID = 自己的 ID）。如果尝试向自己发送消息，会返回错误 `6000001`，并提示传入参数错误。

ZIM SDK 将在之后的版本中规划、解除此限制。