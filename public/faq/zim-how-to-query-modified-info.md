<Title>用户通过 ZIM SDK 接口，修改自己的名称、头像、个人信息扩展字段后，如何查询修改后的信息？</Title>



- - - 

用户可以通过 [queryUsersInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-users-info) 接口，查询指定用户的全量信息，包括用户名称、用户扩展字段。

**用户头像 URL、用户扩展字段信息，仅支持在该接口中获取。**