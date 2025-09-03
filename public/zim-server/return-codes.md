
# 全局返回码

- - -

## 公共返回码

<table>
<tbody><tr>
<th>返回码</th>
<th>描述</th>
<th>可能原因</th>
<th>处理建议</th>
</tr>
<tr>
<td>0</td>
<td>请求成功。</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>1</td>
<td>请求失败。</td>
<td>服务器繁忙。</td>
<td>请稍后重试。</td>
</tr>
<tr>
<td>2</td>
<td>输入参数错误。</td>
<td>输入参数错误。</td>
<td>请输入正确的参数。</td>
</tr>
<tr>
<td>3</td>
<td>认证失败。</td>
<td>认证失败。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>7</td>
<td>每秒请求数超过系统设定值。</td>
<td>服务请求过载。</td>
<td>请稍后重试。</td>
</tr>
<tr>
<td>50014</td>
<td>登录失败。</td>
<td>UserName 超出限制。</td>
<td>请确认 UserName 长度，最大 256 字节的字符串。</td>
</tr>
<tr>
<td>51102</td>
<td>用户不存在。</td>
<td>用户没有登录 ZIM。</td>
<td>用户需要登录 ZIM。</td>
</tr>
<tr>
<td>105001</td>
<td>请求失败。</td>
<td>请求 DB 时失败。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>100000000</td>
<td>请求 URL 头部中的 Host 错误。</td>
<td>URL 地址中的 Host 错误。</td>
<td>请确认请求 URL 是否正确。</td>
</tr>
<tr>
<td>100000001</td>
<td>AppId 字段格式错误。</td>
<td>AppId 字段格式错误。</td>
<td>请确认 AppId 是否输入正确。</td>
</tr>
<tr>
<td>100000002</td>
<td>Timestamp 字段为空。</td>
<td>时间戳为空。</td>
<td>请填写时间戳 Timestamp。</td>
</tr>
<tr>
<td>100000003</td>
<td>Timestamp 字段格式错误。</td>
<td>时间戳格式错误。</td>
<td>请检查时间戳的格式是否正确。</td>
</tr>
<tr>
<td>100000004</td>
<td>签名过期。</td>
<td>签名过期。</td>
<td>请重试。</td>
</tr>
<tr>
<td>100000005</td>
<td>签名错误。</td>
<td>签名过期。</td>
<td>请重试。</td>
</tr>
<tr>
<td>100000006</td>
<td>Action 为空。</td>
<td>Action 为空。</td>
<td>请确认请求 URL 是否正确。</td>
</tr>
<tr>
<td>100000007</td>
<td>不支持的 Action。</td>
<td>Action 错误。</td>
<td>请确认请求 URL 是否正确。</td>
</tr>
<tr>
<td>100000008</td>
<td>SignatureNonce 字段为空。</td>
<td>SignatureNonce 字段为空。</td>
<td>请重试。</td>
</tr>
<tr>
<td>100000009</td>
<td>Signature 字段为空。</td>
<td>Signature 字段为空。</td>
<td>请重试。</td>
</tr>
<tr>
<td>100000010</td>
<td>获取 ServerSecret 失败。</td>
<td>内部错误。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>100000011</td>
<td>获取 App 配置失败。</td>
<td>内部错误。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>100000012</td>
<td>读取 HTTP 包体失败。</td>
<td>内部错误。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>100000013</td>
<td>SignatureVersion 字段为空。</td>
<td>SignatureVersion 字段为空。</td>
<td>请重试。</td>
</tr>
<tr>
<td>100000014</td>
<td>不支持的 SignatureVersion。</td>
<td>不支持的 SignatureVersion。</td>
<td>请确认 SignatureVersion 是否正确。</td>
</tr>
<tr>
<td>100000015</td>
<td>网关内部错误。</td>
<td>内部错误。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>100000016</td>
<td>App 未配置正式环境。</td>
<td>App 未配置正式环境。</td>
<td>请确认 AppId 是否配置了正式环境的权限。</td>
</tr>
<tr>
<td>100000017</td>
<td>App 未开通该服务。</td>
<td>App 未开通该服务。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
</tbody>
</table>



## 业务返回码

<table>
<tbody><tr>
<th>返回码</th>
<th>描述</th>
<th>可能原因</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000001</td>
<td>业务类通用错误。</td>
<td>服务端出错。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>输入的参数缺失或不合法。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660000003</td>
<td>逻辑处理错误。</td>
<td>服务端处理异常。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000011</td>
<td>用户个数超过限制。</td>
<td>输入的用户列表过大。</td>
<td>请检查输入的用户列表。</td>
</tr>
<tr>
<td>660200001</td>
<td>不存在的用户 ID，或者用户已经登出。</td>
<td>不存在的用户 ID，或者用户已经登出。</td>
<td>请确认用户 ID 是否存在或用户是否已登出 ZIM 服务。</td>
</tr>
<tr>
<td>660000012</td>
<td>UserID 长度超过限制。</td>
<td>UserID 最大长度为 32 字节。</td>
<td>请确认 UserID 的长度。</td>
</tr>
<tr>
<td>660000022</td>
<td colspan="2">未找到消息，可能是消息已经被删除或者消息不存在。</td>
<td>请检查消息是否被删除，以及 MsgSeq 是否正确。</td>
</tr>
<tr>
<td>660000023</td>
<td colspan="2">消息已被撤回。</td>
<td>
请确认消息是否已被撤回。
- 如经确认，消息已被撤回，则无需处理。
- 如经确认，消息未被撤回，请联系 ZEGO 技术支持排查问题。
</td>
</tr>
<tr>
<td>660000024</td>
<td colspan="2">已超过撤回时间。</td>
<td>如需撤回更长时间内的消息，请联系 ZEGO 技术支持进行配置。</td>
</tr>
<tr>
<td>660000025</td>
<td>调用服务端接口发送信令消息时，`MessageBody` 中 `IsBase64` 传入 1 后，发送经 base64 编码的信令消息失败。</td>
<td>`Message` 内容没有经过 base64 编码。</td>
<td>
请确认：
- `IsBase64` 是否需要为 1，即是否需要发送二进制类型信令消息。
- `Message` 内容是否经 base64 编码。
</td>
</tr>
<tr>
<td>660000026</td>
<td colspan="2">待撤回消息与 FromUserId 不匹配。</td>
<td>请检查 FromUserId 字段是否正确。</td>
</tr>
<tr>
<td>660000027</td>
<td colspan="2">未启用保存房间消息配置，无法撤回消息。</td>
<td>请开通 ZIM 旗舰版服务。</td>
</tr>
<tr>
<td>660000028</td>
<td colspan="2">该功能不支持 ZIM 免费版用户。</td>
<td>请联系 ZEGO 技术支持升级套餐。</td>
</tr>
<tr>
<td>660300001</td>
<td>房间不存在。</td>
<td>输入的 RoomId 不存在或房间已被销毁。</td>
<td>请确认输入的 RoomId 是否正确或房间是否已被销毁。</td>
</tr>
<tr>
<td>660300002</td>
<td>用户不在此房间内。</td>
<td>输入的 UserId 不存在或不在此房间内。</td>
<td>请确认输入的 UserId 是否正确。</td>
</tr>
<tr>
<td>660300005</td>
<td colspan="2">调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试，或参考相关文档了解调用频率。</td>
</tr>
<tr>
<td>660300006</td>
<td colspan="2">调用接口的频率超出了群/房间限制。</td>
<td>请稍后再试，或参考相关文档了解调用频率。</td>
</tr>
<tr>
<td>660300007</td>
<td>获取房间失败。</td>
<td>内部错误。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660300008</td>
<td>获取房间用户列表失败。</td>
<td>房间人数为空，一般是处于房间延迟销毁期间。</td>
<td>无需操作。</td>
</tr>
<tr>
<td>660300012</td>
<td>用户不在指定房间内。</td>
<td>用户不在指定房间内。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660300014</td>
<td>房间已存在。</td>
<td></td>
<td>检查房间是否已经创建。</td>
</tr>
<tr>
<td>660300015</td>
<td>房间数超出上限。</td>
<td></td>
<td>检查房间数是否超出上限，或者联系技术支持扩容。</td>
</tr>
<tr>
<td>660400001</td>
<td>消息大小超出限制。</td>
<td>输入的消息过大。</td>
<td>请检查输入的消息大小。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>操作者用户未登录过 SDK。</td>
<td>请让操作者先注册 ZIM 服务。</td>
</tr>
<tr>
<td>660500003</td>
<td>调用 SendMessageToAllUsers 接口的频率超出限制。</td>
<td>调用接口频率超出限制。</td>
<td>默认 1 次/秒，每 24 小时内仅限 100 次，请稍后再试。</td>
</tr>
<tr>
<td>660500004</td>
<td>文本审核请求出错。</td>
<td>文本审核请求出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660500005</td>
<td>发送的文本消息没有通过审核。</td>
<td>发送的文本消息没有通过审核。</td>
<td>请勿发送该消息。</td>
</tr>
<tr>
<td>660500006</td>
<td>图片审核请求出错。</td>
<td>图片审核请求出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660500007</td>
<td>发送的图片消息没有通过审核。</td>
<td>发送的图片消息没有通过审核。</td>
<td>请勿发送该消息。</td>
</tr>
<tr>
<td>660500009</td>
<td>您的业务后台判断此消息应当“静默发送”。</td>
<td>收到“消息发送前回调”后，您的业务后台返回了 `2`，此消息被静默发送。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660500010</td>
<td>您的业务后台判断此消息应当“不发送”。</td>
<td>收到“消息发送前回调”后，您的业务后台返回了 `3`，此消息被拒绝发送。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660600001</td>
<td>群组不存在。</td>
<td>输入的 GroupId 不存在。</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600003</td>
<td>查询群成员列表出错。</td>
<td>服务端处理异常。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600004</td>
<td>调用 QueryGroupMemberList 接口的频率超出限制。</td>
<td>调用接口频率超出限制。</td>
<td>调用频率为 20 次/秒，请勿超出限制。</td>
</tr>
<tr>
<td>660600005</td>
<td>调用 KickoutGroupUser 接口的频率超出限制。</td>
<td>调用接口频率超出限制。</td>
<td>调用频率为 20 次/秒，请勿超出限制。</td>
</tr>
<tr>
<td>660600006</td>
<td>查询群列表数据出错。</td>
<td>服务端处理异常。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600007</td>
<td>调用 QueryAppGroupList 接口的频率超出限制。</td>
<td>调用接口频率超出限制。</td>
<td>调用频率为 1 次/秒，请稍后重试。</td>
</tr>
<tr>
<td>660600008</td>
<td>需要被移除的用户不在群内。</td>
<td>用户已退出群组。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败。</td>
<td>该群组可能不存在。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600010</td>
<td>调用 CreateGroup 接口的频率超出限制请求。</td>
<td>发起请求频率上限为 20 次/秒。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660600011</td>
<td>群已经存在。</td>
<td>使用了现有群的 GroupID。</td>
<td>请使用其他 GroupID。</td>
</tr>
<tr>
<td>660600012</td>
<td>群数量超过限制。</td>
<td>创建的群数量达到了套餐上线。</td>
<td>请升级套餐。</td>
</tr>
<tr>
<td>660600013</td>
<td>群主不存在。</td>
<td>群主的用户 ID 出错。</td>
<td>请检查群主的用户 ID 是否正确。</td>
</tr>
<tr>
<td>660600014</td>
<td>修改群主的群列表出错。</td>
<td>修改群主的群列表出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600015</td>
<td>ZIM 服务端执行 db 操作出错。</td>
<td>ZIM 服务端执行 db 操作出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600016</td>
<td>群成员数量超过限制。</td>
<td>创建群组时最多一次性添加 100 名用户。</td>
<td>请减少群成员数量。</td>
</tr>
<tr>
<td>660600017</td>
<td>创建群时用户进群失败。</td>
<td>创建群时用户进群失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600019</td>
<td>属性数量超过限制。</td>
<td>群属性数量默认上限为 10 个。</td>
<td>请减少群属性。</td>
</tr>
<tr>
<td>660600020</td>
<td>属性的 Key 或 Value 长度错误。</td>
<td>Key 的长度上限为 16 字节，Value 的长度上限为 1024 字节。</td>
<td>请检查相关参数的长度。</td>
</tr>
<tr>
<td>660600021</td>
<td>发送消息参数错误。</td>
<td>发送消息参数错误。</td>
<td>请检查参数。</td>
</tr>
<tr>
<td>660600022</td>
<td>发送多媒体消息，获取重定向地址失败。</td>
<td>发送多媒体消息，获取重定向地址失败。</td>
<td>请联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>660600023</td>
<td>消息长度超过限制。</td>
<td>消息长度超过限制。</td>
<td>请缩小消息长度。</td>
</tr>
<tr>
<td>660600024</td>
<td colspan="2">用户不在群内。</td>
<td>请检查用户或添加用户为群成员。</td>
</tr>
<tr>
<td>660600029</td>
<td colspan="2">Role 不能设置为 1。</td>
<td>请修改 Role。</td>
</tr>
<tr>
<td>660600030</td>
<td colspan="2">FromUserId 不能和 ToUserId相等。</td>
<td>请修改 ToUserId。</td>
</tr>
<tr>
<td>660600032</td>
<td colspan="2">FromUserId 没权限。</td>
<td>FromUserId 需为群主或管理员。</td>
</tr>
<tr>
<td>660600033</td>
<td colspan="2">对全部指定用户的操作均失败。</td>
<td>请检查 UserIds。</td>
</tr>
<tr>
<td>660700001</td>
<td>调用 UserRegister 接口的频率超出限制请求。</td>
<td>发起请求频率上限为 20 次/秒。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660700002</td>
<td>用户已存在。</td>
<td>发送请求的 UserID 已存在。</td>
<td>请避免重复注册相同的 UserID。</td>
</tr>
<tr>
<td>660700006</td>
<td>UserName 长度超过限制。</td>
<td>UserName 长度最大为 256 字节。</td>
<td>请确认 UserName 的长度。</td>
</tr>
<tr>
<td>660700007</td>
<td>UserAvatar 地址长度超过限制。</td>
<td>UserAvatar 地址长度最大为 500 字节。</td>
<td>请确认 UserAvatar 的长度。</td>
</tr>
<tr>
<td>660700008</td>
<td>获取用户信息出错。</td>
<td>用户 ID 错误。</td>
<td>请检查用户 ID 是否正确。</td>
</tr>
<tr>
<td>660700012</td>
<td colspan="2">用户不存在。</td>
<td>请先注册用户。</td>
</tr>
<tr>
<td>660700013</td>
<td colspan="2">查询用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660700015</td>
<td colspan="2">用户未注册。</td>
<td>请先注册用户。</td>
</tr>
<tr>
<td>660700016</td>
<td colspan="2">同步用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660700017</td>
<td colspan="2">更新用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660800001</td>
<td colspan="2">置顶单聊会话时，操作目标会话 <code>ConvID</code> 对应的用户未注册。</td>
<td>请确认该 <code>ConvId</code> 对应的用户是否已注册：
<ul><li>确认已注册，请联系 ZEGO 技术支持排查。</li>
<li>确认未注册，请注册此用户。</li></ul></td>
</tr>
<tr>
<td>660800002</td>
<td colspan="2">清除某个会话的未读消息数时，该会话不存在，或者该会话不适用此接口（不属于最新的 1000 个会话）。</td>
<td>请确认会话 ID 是否正确。</td>
</tr>
<tr>
<td>660800019</td>
<td colspan="2">单次批量操作超过上限。</td>
<td>减少单次批量操作数量。</td>
</tr>
<tr>
<td>660800020</td>
<td colspan="2">不能将 <code>FromUserId</code> 添加为好友，即 <code>FriendInfos</code> 中的 <code>UserId</code> 不能与 <code>FromUserId</code> 相同。</td>
<td>请修改 <code>FriendInfos</code> 中与 <code>FromUserId</code> 相同的 <code>UserId</code>。</td>
</tr>
<tr>
<td>660800021</td>
<td colspan="2"><code>FriendAlias</code> 或 <code>Wording</code> 超过长度上限。</td>
<td>请缩减相关字段的内容长度。</td>
</tr>
<tr>
<td>660800022</td>
<td colspan="2">参数中的用户 ID 相关参数重复。</td>
<td>请删除或修改重复参数。</td>
</tr>
<tr>
<td>660800023</td>
<td colspan="2"><code>Attributes</code> 的 <code>Key</code> 取值不属于 k0 ~ k4。</td>
<td>请修改 <code>Key</code> 的值。</td>
</tr>
<tr>
<td>660800024</td>
<td colspan="2"><code>Attributes</code> 的所有 <code>Key</code>、<code>Value</code> 总长度超过长度上限。</td>
<td>请缩减相关字段的内容长度。</td>
</tr>
<tr>
<td>660800025</td>
<td colspan="2">所有好友均未注册过，接口调用失败。</td>
<td>请先注册目标用户。</td>
</tr>
<tr>
<td>660800026</td>
<td colspan="2">好友属性参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660800027</td>
<td colspan="2">目标用户已经是好友，无需重复添加。</td>
<td>无需操作。</td>
</tr>
<tr>
<td>660800028</td>
<td colspan="2"><code>FromUserId</code> 的好友数量到达上限。</td>
<td>无法添加更多好友。</td>
</tr>
<tr>
<td>660800030</td>
<td colspan="2">用户的免打扰列表超过长度限制，默认 500。</td>
<td>请缩短列表，或联系技术支持提高上限，最大可为 1000。</td>
</tr>
<tr>
<td>660800032</td>
<td colspan="2"><code>Attributes</code> 有重复的 <code>Key</code>。</td>
<td>请修改 <code>Key</code>。</td>
</tr>
<tr>
<td>660800033</td>
<td colspan="2"><code>UserIds</code> 中的字符串不能与 <code>FromUserId</code> 相同</td>
<td>请修改 <code>UserIds</code> 中与 <code>FromUserId</code> 相同的字符串。</td>
</tr>
<tr>
<td>660800034</td>
<td colspan="2">目标用户不是 <code>FromUserId</code> 的好友。</td>
<td>如需修改对此用户的备注，请先添加此用户为好友。</td>
</tr>
<tr>
<td>660800037</td>
<td colspan="2">用户已被拉黑，无需重复操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800038</td>
<td colspan="2">不能拉黑 <code>FromUserId</code> 或将 <code>FromUserId</code> 移除黑名单。</td>
<td>请修改 UserIds。</td>
</tr>
<tr>
<td>660800039</td>
<td colspan="2">传入的用户列表超过限制。</td>
<td>请缩短传入的用户列表。</td>
</tr>
<tr>
<td>660800040</td>
<td colspan="2"><code>FromUserId</code> 的黑名单已达上限，无法拉黑更多用户。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800041</td>
<td colspan="2">拉黑全部指定用户失败。</td>
<td>请参考响应参数 <code>ErrList</code> 的 <code>SubCode</code> 处理.</td>
</tr>
<tr>
<td>660800042</td>
<td colspan="2">全部指定用户移出黑名单失败。</td>
<td>请参考响应参数 <code>ErrList</code> 的 <code>SubCode</code> 处理.</td>
</tr>
<tr>
<td>660800043</td>
<td colspan="2">此用户已被移出黑名单。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800044</td>
<td colspan="2">此用户不在黑名单。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800045</td>
<td colspan="2">消息发送方已被消息接收方拉黑，导致消息发送失败。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800046</td>
<td colspan="2">传递的时间戳大于当前时间。</td>
<td>可以不填，默认是当前时间。</td>
</tr>
<tr>
<td>660800048</td>
<td colspan="2">置顶列表长度超过限制（100，不可配置）。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800051</td>
<td colspan="2">会话已为免打扰，无法再次设置为免打扰。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800052</td>
<td colspan="2">会话已被取消免打扰，无法再次取消。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800053</td>
<td colspan="2">查询会话列表失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660900003</td>
<td colspan="2">所有被叫用户需为已注册。</td>
<td>请检查被叫用户的注册状态或稍后再试。</td>
</tr>
<tr>
<td>660900004</td>
<td colspan="2">获取呼叫信息异常。</td>
<td>请检查呼叫是否存在，或者稍后再试。</td>
</tr>
<tr>
<td>660900005</td>
<td colspan="2">呼叫已结束，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660900006</td>
<td colspan="2">呼叫邀请已超时，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660900007</td>
<td colspan="2">被叫用户列表长度超过限制。</td>
<td>请缩短被叫用户列表长度，或联系 ZEGO 技术支持上调上限。</td>
</tr>
<tr>
<td>660900008</td>
<td colspan="2">该呼叫没有邀请操作用户，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>661000001</td>
<td colspan="2">已超过可编辑时间。</td>
<td>如需编辑更早的历史消息，请联系 ZEGO 技术支持配置。</td>
</tr>
<tr>
<td>661000005</td>
<td colspan="2">编辑失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
</tbody>
</table>