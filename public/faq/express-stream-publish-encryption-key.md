<Title>Express 推流是否支持设置密钥，需要使用对应密钥才能拉流？</Title>



- - -

Express SDK **1.19.0** 及之后的版本，支持该功能。推流端使用 “setPublishStreamEncryptionKey” 设置推流密钥，拉流端需要使用 “setPlayStreamDecryptionKey” 设置对应密钥才能拉流成功。

<Note title="说明">


仅在 ZEGO 连麦低延时服务器支持该功能，不支持 CDN。

</Note>


