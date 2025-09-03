

# API 概览

- - -

版权音乐服务端提供以下相关 API 接口，可参考 [调用方式](/online-ktv-server/accessing-server-apis) 调用以下接口。

<Warning title="注意">

请注意，不同版权方（即 VendorID 取值不同，默认为 0）所支持的服务端接口也不同，详细信息请联系 ZEGO 商务人员咨询。

</Warning>


## 标签接口

通过标签，开发者可以获得对应的歌曲，一首歌曲可以同时拥有多个标签。标签的作用类似于歌单，但是它的更新频率比歌单高。基于以下接口，开发者可以实现标签功能，但目前不支持开发者自定义标签（如修改某首歌的标签）。

|接口名称|接口功能| 支持的 VendorID 取值 |
|-|-| -|
|[DescribeTags](/online-ktv-server/describe-tags)|通过获取标签列表，可以知道歌曲资源的标签列表、标签分组名称、标签 ID、标签名称等信息。| 0、1、2、4 |
|[DescribeTagSongs](/online-ktv-server/describe-tag-songs)|通过 [DescribeTags](/online-ktv-server/describe-tags) 接口拿到的标签 ID 获取对应的歌曲 ID、歌曲名、歌曲专辑、以及版权相关信息等。| 0、1、2、4 |

## 搜索接口

开发者可以通过以下接口实现歌曲搜索的功能。

|接口名称|接口功能|支持的 VendorID 取值 |
|-|-| -|
|[QueryTips](/online-ktv-server/query-tips)|通过输入相应关键词，根据关键词联想给出包含该关键词的相关歌曲搜索提示。| 0、1、2 |
|[QuerySong](/online-ktv-server/query-song)|通过输入关键词，搜索指定版权方的歌曲资源，可获取包含歌曲信息、歌手信息、歌曲所属专辑 信息、版权信息。| 0、1、2、4 |
|[QuerySongPlus](/online-ktv-server/query-song-plus)|通过输入关键词搜索歌曲，同时在多家版权方曲库中搜索查询，支持对搜索结果筛选、排序等。搜索结果包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息、以及是否有伴奏等。| 0、1、2、4 |

## 榜单接口

基于不同维度，版权音乐后台通过对应榜单列出时下最热歌曲。榜单 ID 是固定的字符串。目前支持四种不同类型的榜单。

|接口名称|接口功能|支持的 VendorID 取值 |
|-|-| -|
|[DescribeTopSongs](/online-ktv-server/describe-top-songs)|通过榜单 ID 获取榜单歌曲，包含歌曲信息、歌手信息、歌曲所属专辑信息、版权信息。| 0、1、2 |

## 查询接口

开发者可以通过以下查询接口实现批量查询歌曲信息和版权信息。

|接口名称|接口功能|支持的 VendorID 取值 |
|-|-| -|
|[QuerySongsInfo](/online-ktv-server/query-songs-info)|通过歌曲 ID 列表批量查询歌曲信息，可获取包含歌曲信息、歌手信息、歌曲所属专辑信息、歌曲时长、以及是否有伴奏等。| 0、1、2、4 |
|[QuerySongsCopyright](/online-ktv-server/query-songs-copyright)|通过歌曲 ID 列表批量查询歌曲的版权信息，包含词曲伴奏版权、录音版权、及歌曲渠道。| 0、1 |

## 歌曲资源接口

通过以下接口，开发者可以根据歌曲 ID 获取不同类型的相关资源，包括歌词、伴奏高潮片段、节拍数等资源。

|接口名称|接口功能|支持的 VendorID 取值 |
|-|-| -|
|[DescribeSongLyric](/online-ktv-server/describe-song-lyric)|通过歌曲 ID 获取歌曲的整首歌词。| 0、1、2、4 |
|[DescribeKrcSegment](/online-ktv-server/describe-krc-segment)|通过歌曲 ID 获取歌词分片。 当多人合唱一首歌曲时，通过获取歌词分片，将歌词加上分片标签后，每个人可以选择不同的歌词片段进行演唱。| 0、1 |
|[DescribeAccompanyClipInfo](/online-ktv-server/describe-accompany-clip-info)|通过歌曲 ID 获取伴奏高潮时间点，可以标示出一首伴奏中高潮片段的时间节点。| 0、1、2、4 |
|[DescribeAccompanyClipStatus](/online-ktv-server/describe-accompany-clip-status)| 通过歌曲 ID 获取伴奏高潮片段状态，可以知道该伴奏是否具有高潮片段的资源。| 0、1、2 |
|[DescribeSongExtra](/online-ktv-server/describe-song-extra)|通过歌曲 ID 获取歌曲附加信息，可以知道该歌曲的节拍数、节拍类型、以及所属流派信息。| 0、1 |
