# 实现云端播放器

- - -

## 简介

本文介绍如何基于服务端 API 快速实现并维护一个云端播放器。

<Warning title="注意">

开发者需注意媒体资源的`版权`问题，加密的版权音乐可能会播放失败。
</Warning>

## 前提条件

- 在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 请联系 ZEGO 技术支持，开通云端播放器服务的权限，并配置相关的回调地址，用于接收事件通知。

## 实现流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoCloudPlayer/CloudPlayer_seq.png" /></Frame>

### 1 创建云端播放器

调用 [CreatePlayer](/cloud-player-server/create-player) 接口，设置媒体资源 StreamUrl，指定房间 RoomId，创建一个云端播放器，详情请参考 [创建云端播放器](/cloud-player-server/create-player)。创建成功后，云端播放器会自动加载传入的媒体资源，将其推流到指定房间内进行播放。

<Warning title="注意">

- 同一个 AppID 下，最多允许同时存在 50 个正在运行中（未被销毁）的云端播放器。如果您需要提高上限，请联系 ZEGO 技术支持处理。
- 调用 [CreatePlayer](/cloud-player-server/create-player) 接口时：
    - 如果传入的 RoomId 不存在，将自动创建并登录房间。
    - 如果传入的 StreamId 不存在，将自动创建一条流，推送到指定房间内。如果未传入 StreamId，由 ZEGO 服务器随机分配一个 ID。
</Warning>

创建成功后，ZEGO 服务端会返回播放器的 PlayerId（唯一标识）；同时，播放器会加载媒体资源，并推流到指定 RoomId 的房间内，开始播放。

### 2 更新云端播放器

在房间内播放媒体资源的过程中，开发者可以随时调用 [UpdatePlayer](/cloud-player-server/update-player) 接口，设置 PlayerId（唯一标识）、AudioOptions（音频转码参数配置）、VideoOptions（视频转码参数配置），更新指定的云端播放器，详情请参考 [更新云端播放器](/cloud-player-server/update-player)。

通过 [UpdatePlayer](/cloud-player-server/update-player) 接口，开发者还可以实现暂停播放、进度跳转、更换播放的媒体资源等功能。

### 3 销毁云端播放器

开发者可以根据自己的业务场景，调用 [DeletePlayer](/cloud-player-server/delete-player) 接口，设置 PlayerId（唯一标识），销毁指定的云端播放器，详情请参考 [销毁云端播放器](/cloud-player-server/delete-player)。

接口调用成功后，媒体资源将会自动停止播放，对应的推流会自动终止。

## 常用功能

### 查询云端播放器任务列表

开发者可以通过调用 [DescribePlayers](/cloud-player-server/describe-players) 接口，指定房间 RoomId 查询该房间内的所有云端播放器任务列表及详细信息、或指定 PlayerId 查询该播放器的相关信息，详情请参考 [查询云端播放器任务列表](/cloud-player-server/describe-players)。

### 相关回调及校验说明

云端播放器创建、更新、销毁时，相关状态变化会通过 [前提条件](#前提条件) 中配置的回调地址抛出。开发者可以根据自己的业务场景，选择监听相关的回调事件，详情请参考 [相关回调及校验说明](/cloud-player-server/callback/callback)。
