<Title>Web 平台推流时，如何只提供音频权限？</Title>



- - -

使用接口配置：`zg.createStream({camera:{audio:true,video:false}})`，这样推流只会有音频，且浏览器只会索取麦克风权限。