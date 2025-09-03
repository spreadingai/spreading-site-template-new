# 业务介绍

下图为 KTV 解决方案的业务架构图：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/ktv_core_features.jpg" />
</Frame>

## K 歌管理

K 歌系统主要包含功能：人声和伴奏切换、开始/停止/切歌、伴奏和人声音量调节、美声混响、K 歌玩法、歌词同步。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/Sing.png" /></Frame>

点歌用户可以随时切换人声和伴奏，如果觉得不会唱，可以切歌。歌唱途中，点歌用户可以将伴奏和人声音量调整到合适的范围，也可以选择喜欢的混响音效，设置完成后即可随着音乐开唱。如果用户不熟悉歌词，还可以参照着已同步的歌词进行演唱。

ZEGO 目前支持实现 3 种唱歌玩法，分别为独唱、合唱以及抢唱：

### 独唱

独唱方案，用户上麦后自由点歌后进行排麦演唱。演唱者进行歌曲演唱时，将麦克风人声和媒体播放器声音进行混流，观众在台下接收音频流。

### 合唱

歌曲合唱有两种形式：实时合唱和串行合唱。

#### 实时方案

在歌房中，麦上用户本地同时播放伴奏，同时开唱。其他用户可以中途加入合唱。低延迟实时合唱体验，真正实时合唱。服务器对人声和伴奏精准对齐，保证观众收听体验。

#### 串行方案

合唱各方串行加入，主唱推出一条流，包含了伴奏和人声，副唱跟着主唱的伴奏进行合唱，观众再拉由副唱发出的混流。

### 抢唱

抢唱，是一种兼具“唱歌+社交+游戏竞技”属性的K歌玩法，在一轮抢唱游戏中，会播放若干首歌曲的高潮片段供玩家抢麦，玩家获得麦权可开始演唱歌曲。

## 内容中心

ZEGO 版权内容中心提供了在线 K 歌场景所需歌曲内容，包含点歌管理、音乐榜单、歌曲资源、歌曲标签等。内容由音乐合作的版权方提供，如需进一步了解版权内容中心，请联系 ZEGO 商务人员咨询。

#### 点歌管理

点歌管理主要包含功能：歌单展示、搜索歌曲、点歌和排麦、已点列表。

用户上麦后可以点歌，观众不能点歌。麦上用户可以直接搜索歌曲或者根据各种类型的榜单去找歌曲然后点歌，业务后台会维护一个已点列表并自动排麦。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/Choose_Song.png" /></Frame>

可以参考 [点歌管理](/online-ktv-u3d/implementation/song-selection) 实现排麦和已点列表功能。

#### 正版曲库

ZEGO 正版曲库支持歌单展示、搜索歌曲、点歌，逐字歌词下载等。更多具体的内容查看 [ZEGO 内容中心 - 点歌](/online-ktv-u3d/zego-content-center/sing-songs)。


## 歌曲组件

ZEGO 歌曲组件，包含评分组件、歌词组件、播放组件、曲库组件等。其中，评分组件支持“音高线展示”和“歌唱评分”等功能。

独唱用户有时需要打分系统评价本次唱歌，以便改进唱功。另外参与互动的合唱用户需要打分来增加互动。

更多具体的内容查看 [评分功能](/online-ktv-u3d/implementation/vocal-scoring)。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/Rate.png" /></Frame>


## 房间管理

房间管理主要包含功能：房间列表、创建房间、加入房间、销毁房间。

用户可以创建房间，或者从房间列表中选择感兴趣的房间加入。当房内没用户时，房间可以自动销毁。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/Room_list.jpg" /></Frame>

## 麦位管理

麦位管理主要包含功能：上/下麦、换麦、锁麦位、邀请上麦、麦位禁言等。

用户进入房间后，如果想和麦上用户互动就需要上麦。歌房内的麦位一般都是有序且有限的。有空麦位才能上麦，为了参与互动可以抢麦位。房主有权利锁住麦位，邀请用户上麦，对麦上用户禁言等。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/Mic_Management.png" /></Frame>

<Content />