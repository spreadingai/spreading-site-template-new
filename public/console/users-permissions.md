# 用户与权限
- - -

## 功能简介

你在即构注册了开发者账号，该账号的身份是主账号。你可以通过控制台的“用户与权限”功能，为你的项目成员创建拥有特定权限的子账号，协助你管理项目。

|  账号类型   |  定义  |  权限范围  |
|  ----  | ----  |  ----  |
|  主账号  |  已注册即构账号即主账号  |  拥有所有项目，可以访问任意项目  |
|  子账号  |  由主账号创建，完全归属于主账号  |  只能访问权限范围内主账号下的项目  |

## 功能入口

登录主账号，点击右上角的 `设置（图标）`，在出现的下拉菜单中点击 `用户与权限` 进入功能页面。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/permissions_entrance.png" /></Frame>


## 添加用户

1. 点击 `用户列表` 右上角的 `添加用户` 按钮。

2. 设置子账号用户的姓名、邮箱信息，点击 `添加` 按钮，即构将通过该邮箱发送初始账号、密码。

<Warning title="注意">


    邮箱作为用户登录账号，必须唯一，已在即构注册过的账号不可再次添加。
    
</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/add_user.png" /></Frame>

3. 子账号用户将会收到账号注册邀请的邮件，使用邮件中的初始账号、密码可登录 ZEGO 控制台。   
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/invite_email.png" /></Frame>

## 管理用户

添加成功的子账号会在 `用户列表` 页面展示，主账号可编辑子账号的姓名、重置子账号的密码、删除子账号。

### 编辑用户信息

选择需要编辑信息的子账号，点击 `编辑` 按钮，可修改该子账号的姓名。    

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/edit_user.png" /></Frame>

### 重置用户密码

选择需要重置密码的子账号，点击 `重置密码` 按钮，可重置该子账号的密码，子账号用户将会收到账号密码重置的邮件。 
  
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/reset_password.png" /></Frame>

### 删除用户

选择要删除的子账号，点击 `删除` 按钮，可删除该子账号。   

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/delete_user.png" /></Frame>

## 配置权限

主账号可以给子账号配置项目权限、操作权限，协助主账号管理项目。

选择要配置的子账号，点击 `权限配置` 按钮，进入权限配置功能页面。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/set_permission.png" /></Frame>

### 配置项目权限

主账号通过配置子账号的项目权限，设置子账号可访问的项目。   

1. 点击 `项目权限` 模块右上角的 `添加项目` 按钮，勾选项目，新增子账号可访问的项目；取消勾选项目，删除子账号可访问的项目。      
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/add_project_permission.png" /></Frame>
   
2. 子账号可访问的所有项目展示在 `项目权限` 模块，点击项目右侧的 `X` 按钮，可删除该项目。   
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/delete_project_permission.png" /></Frame>
   
3. 点击底部的 `保存修改` 按钮，可保存此次对子账号的权限配置。
   
4. 如果需要放弃此次对子账号权限的配置，可点击底部的 `取消` 按钮，回到 `用户列表` 页面。   
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/save_project_permission.png" /></Frame>

<Warning title="注意">


对子账号权限进行的所有配置，一定要进行 `保存修改` 的操作才能生效。

</Warning>



### 配置操作权限

主账号通过配置子账号的操作权限，设置子账号可访问、操作的功能模块。

|  模块   | 功能  |  操作权限  |
|  ----  | ----  |  ----  |
| 项目管理    | <ul><li>创建项目：创建新的项目</li><li>查看：项目的基本信息，如 AppID、AppSign，环境配置，密钥等</li><li>编辑：项目编辑，服务配置，回调配置</li></ul>  |  创建项目、查看、编辑  |
| 用量统计 | 计费用量查看 | 查看 |
| 费用中心 | 在线充值、账户余额查看 | 查看 |
| 合同管理 | 签署、查看和下载电子合同 | 查看 | 
| 套餐包管理 | 套餐包状态查询 | 查看 |
| 开发辅助 | <ul><li>Token 生成和校验</li><li>ZIM 离线推送调试</li><li>快速跑通 Demo</li></ul> | 查看 |
| 通知管理 | 账号通知规则配置 | 查看 |
| 云市场 | 浏览云市场产品、查看已开通产品 | 查看 |
| 星图 | 音视频通话质量跟踪，故障定位，用户体验追溯 | 查看 |
   
1. 对各个功能模块的操作权限展示在 `操作权限` 模块，勾选操作权限，新增子账号可访问的功能模块；取消勾选操作权限，删除子账号可访问的功能模块。   
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/Permissions/action_permission.png" /></Frame>
   
2. 点击底部的 `保存修改` 按钮，可保存此次对子账号的权限配置。
   
3. 如果需要放弃此次对子账号权限的配置，可点击底部的 `取消` 按钮，回到 `用户列表` 页面。

<Warning title="注意">


1. 如果给子账号配置了项目管理的编辑权限，该子账号不仅可以编辑可访问的项目，还可以新建项目，并自动获得该项目的相关操作权限。   
2. 对子账号权限进行的所有配置，一定要进行 `保存修改` 的操作才能生效。

</Warning>



## 其它说明

### 项目数量限额

1 个主账号最多可申请 10 个子账号，若需申请更多子账号，请联系即构的技术支持调整上限额度。
