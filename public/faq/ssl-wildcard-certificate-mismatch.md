<Title>使用泛域名申请了 SSL 证书，为什么在控制台上传证书时，提示当前上传的证书与域名不匹配？</Title>




- - -

如果您在 [ZEGO 控制台](https://console.zego.im/) 上传 SSL 证书时，提示当前上传的证书和域名不匹配，请检查是否符合如下规则：

- 一般带 1 个通配符 `*`，且以 `*.` 开头。例如，*.example.com、 *.test.example.com 等。
- 仅支持同级匹配，不可跨级匹配。例如：绑定 *.example.com 通配符域名的数字证书，支持 p1.example.com，但不支持 p1.p2.example.com。



