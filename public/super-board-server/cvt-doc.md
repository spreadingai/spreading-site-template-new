
|状态码|描述|
|-----|----|
|1|未上传。|
|2|已上传。|
|4|排队中。|
|8|转码中。|
|16|转码成功。|
|32|转码失败。|
|64|转码任务已取消。|
|128|受密码保护的文档。|
|256|文件内容过大，例如文档页数过多。|
|512|Excel 文件标签数过多。|
|1024|文件内容为空。例如：PPT 内无幻灯片。|
|2048|转码服务器打开文件失败。|
|4096|不支持的目标文件类型。|
|8192|源文件为只读文件。|
|16384|<p>转码服务器下载源文件失败。 可能的原因如下：</p><ul><li>无法从请求参数中的源文件 URL 下载文件。</li><li>请求参数中的文件哈希值不是 32 位的 MD5 哈希值。</li><li>请求参数中的文件哈希值和根据文件计算的哈希值不匹配。</li></ul> |
|32768|检测到源文件中包含了转码工具无法处理的元素，如墨迹涂鸦等，请去掉这些元素后再进行转码。|
|32769|检测到 Word、Excel 和 PowerPoint 文件格式不合法，请确保源文件可以使用 Office 打开再进行转码。|
|32770|要转码的文件存在安全隐患，无法正常打开转码。请确保使用 Office 打开文件时不会提示编辑此文件可能会损害您的计算机|
|32771|动态 PPT 转码结束后，检测到有图片、音视频文件未正常导出，转码服务器将重试转码。|
|32772|文件大小过大，无法转码，请确保文件大小在限制的范围之内。|
|32773|打开文件时弹需要修复文件提示框（文件损坏）。|
|32774|EOF 错误（文件内容不完整）。|
<Warning title="注意">

1. 本 API 为最新服务端 API v2 接口，支持全球就近接入、统一的鉴权方式、统一的参数风格和公共错误码。后续相关功能的新增都会在此更新。
2. 旧版 API 接口仅供 **2021-09-10** 前接入的旧用户维护使用。旧版接口文档请参考 [旧版服务端 API](https://doc-zh.zego.im/article/11997)。

</Warning>
# 请求文件转码

- - -

<FileServerWarning />


##  描述

通过本接口创建文件转码任务。

如果希望对已经转码过的文件进行重新转码，请设置 IsRestartTranscode 为 1，否则系统会默认不重新转码，直接返回转码成功。

##  接口原型

- 请求方法：POST
- 请求地址：`https://docs-api.zego.im/?Action=StartTranscode`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

##  请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis) 中的 ”公共请求参数“。

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>FileHash</td>
<td>String</td>
<td>是</td>
<td>源文件哈希，要求为 32 位的 MD5 哈希值。计算方法请参考 <a href="#文件哈希计算示例">文件哈希计算示例</a>。</td>
</tr>
<tr>
<td>FileName</td>
<td>String</td>
<td>是</td>
<td>源文件名称。</td>
</tr>
<tr>
<td>FileType</td>
<td>Int64</td>
<td>是</td>
<td>源文件类型参数，可设置为 1、2、4、8、16、32，各参数值说明如下：<ul><li>1：ppt/pptx（静态文件，目标文件类型对应 256；动态文件，目标文件类型对应 512）</li><li>2：doc/docx（目标文件类型对应 256）</li><li>4：xls/xlsx（目标文件类型对应 256）</li><li>8：PDF（目标文件类型对应 256）</li><li>16：jpg/jpeg/png/bmp（目标文件类型对应 16）</li><li>32：txt（目标文件类型对应 256）</li></ul></td>
</tr>
<tr>
<td>DestinationFileType</td>
<td>Int64</td>
<td>是</td>
<td>目标文件类型参数，可设置为 16、256、512，各参数值说明如下：<ul><li>16：jpg/jpeg/png/bmp</li><li>256：向量和图片</li><li>512：动态 PPT</li></ul></td>
</tr>
<tr>
<td>FileSize</td>
<td>Int64</td>
<td>是</td>
<td>源文件大小，单位为字节。计算方法请参考 <a href="#文件大小计算示例">文件大小计算示例</a>。</td>
</tr>
<tr>
<td>SourceFileUrl</td>
<td>String</td>
<td>是</td>
<td>源文件下载链接。<Note title="Note">出于安全考虑，建议使用带鉴权信息的下载 URL，并保证调用接口时 URL 有效期剩余半个小时以上。</Note></td>
</tr>
<tr>
<td>IsRestartTranscode</td>
<td>Int64</td>
<td>否</td>
<td>是否重新转码。<ul><li>0：否，默认值</li><li>1：是</li></ul>注意：首次转码不能填写1，否则报错。</td>
</tr>
<tr>
<td>ThumbnailDefinition</td>
<td>Int64</td>
<td>否</td>
<td>缩略图清晰度类型参数，可设置为 1、2、3，默认值是 1。如果不传递该参数，则使用默认清晰度：普通。各参数值说明如下：<ul><li>1：普通</li><li>2：标清 </li><li>3：高清</li></ul> <Note title="Note">缩略图清晰度仅在转码前设置有效，作用于转码过程。如果需要改变转码后清晰度，请指定 IsRestartTranscode 为 1 后重新发起转码请求。</Note></td>
</tr>
<tr>
<td>EnableVectorImage</td>
<td>Int</td>
<td>否</td>
<td>输出文件是否转换为 svg 格式。<ul><li>1：关闭</li><li>2：开启，默认值。</li></ul></td>
</tr>
</tbody></table>

##  请求示例

- 请求 URL  
```
https://docs-api.zego.im/?Action=StartTranscode
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&IsTest=false
```
- 请求消息体 
```json
{
    "FileHash": "8cb1bccbdf2e655a3b45f4b126ef8392",
    "FileName": "demo.pptx",
    "FileType": 1,
    "DestinationFileType": 256,
    "FileSize": 1024,
    "SourceFileUrl": "url",
    "ThumbnailDefinition": 1,
    "IsRestartTranscode": 1,
    "EnableVectorImage": 2
}
```

##  响应参数

<table>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>Code</td>
    <td>Int64</td>
    <td>错误码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>错误描述。</td>
  </tr>
    <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应对象。</td>
  </tr>
  <tr>
    <td>└FileHash</td>
    <td>String</td>
    <td>源文件哈希。</td>
  </tr>
  <tr>
    <td>└FileType</td>
    <td>Int64</td>
    <td>源文件类型参数，可设置为 1、2、4、8、16、32，各参数值说明如下：<ul><li>1：ppt/pptx（静态文件，目标文件类型对应 256；动态文件，目标文件类型对应 512）</li><li>2：doc/docx（目标文件类型对应 256）</li><li>4：xls/xlsx（目标文件类型对应 256）</li><li>8：PDF（目标文件类型对应 256）</li><li>16：jpg/jpeg/png/bmp（目标文件类型对应 16）</li><li>32：txt（目标文件类型对应 256）</li></ul> </td>
  </tr>
  <tr>
    <td>└DestinationFileType</td>
    <td>Int64</td>
    <td>目标文件类型参数，可设置为 16、256、512，各参数值说明如下：<ul><li>16：jpg/jpeg/png/bmp</li><li>256：向量和图片</li><li>512：动态 PPT</li></ul>  </td>
  </tr>
  <tr>
    <td>└FileName</td>
    <td>String</td>
    <td>源文件名称。</td>
  </tr>
  <tr>
    <td>└FileSize</td>
    <td>Int64</td>
    <td>源文件大小，单位为字节。</td>
  </tr>
  <tr>
    <td>└Status</td>
    <td>Int64</td>
    <td> 文件转码状态，详情请参考下文中 <a href="#status-字段取值说明如下">Status</a> 字段说明表。</td>
  </tr>
  <tr>
    <td>└TaskId</td>
    <td>String</td>
    <td>文件转码任务 ID。</td>
  </tr>
</tbody></table>

### Status 字段取值说明如下

<Status />

##  响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "FileHash": "abc",
        "FileName": "demo.pptx",
        "FileType": 1,
        "DestinationFileType": 256,
        "FileSize": 1024,
        "Status": 8,
        "TaskId": "task"
    }
}
```

##  返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。

<table>
  <tbody><tr>
    <th>返回码</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>60015</td>
    <td>不支持的源文件类型。</td>
  </tr>
  <tr>
    <td>60016</td>
    <td>文件大小超过最大限制，默认限制：100 MB。</td>
  </tr>
  <tr>
    <td>60017</td>
    <td>Excel文件超过最大限制，默认限制：10 MB。</td>
  </tr>
  <tr>
    <td>60021</td>
    <td>源文件类型和目标文件类型不匹配。</td>
  </tr>
</tbody></table>


##  文件哈希值和大小计算示例

###  文件哈希计算示例

文件哈希是对文件的内容进行计算得到的一个哈希值字符串，作用是用来对文件内容进行校验，服务器对收到的文件计算文件哈希值，然后和客户传递的文件哈希值进行比较，确保文件内容没有被篡改。

<CodeGroup>

```go title="Go 文件哈希计算示例"
import (
	"crypto/md5"
	"fmt"
	"io"
	"os"
)

// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
func main() {
	fileName := "/local/usr/test.go"
	str := GetFileMD5FromFile(fileName)
	fmt.Println(str)
}

func GetFileMD5FromFile(localFile string) (fileHash string) {
	fd, e := os.Open(localFile)
	if e != nil {
		return
	}
	defer fd.Close()
	fileHash = GetFileMD5(fd)
	return
}

func GetFileMD5(f io.Reader) string {
	h := md5.New()
	if _, err := io.Copy(h, f); err != nil {
		fmt.Println("%v", err)
	}
	return fmt.Sprintf("%x", h.Sum(nil))
}
```

```python title="Python 文件哈希计算示例"
import hashlib

# filename 文件路径+文件名 etc: /usr/local/aaa.sh
def md5(filename):
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()
```

```java title="Java 文件哈希计算示例"

import java.io.File;
import java.io.FileInputStream;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
public static String getFileMD5(File filename) {
    if (!filename.isFile()) {
        return null;
    }
    MessageDigest digest = null;
    FileInputStream in = null;
    byte buffer[] = new byte[1024];
    int len;
    try {
        digest = MessageDigest.getInstance("MD5");
        in = new FileInputStream(filename);
        while ((len = in.read(buffer, 0, 1024)) != -1) {
            digest.update(buffer, 0, len);
        }
        in.close();
    } catch (Exception e) {
        e.printStackTrace();
        return null;
    }
    return toHex(digest.digest());
}

private static final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();
public static String toHex(byte[] data) {
    char[] chars = new char[data.length * 2];
    for (int i = 0; i < data.length; i++) {
        chars[i * 2] = HEX_DIGITS[(data[i] >> 4) & 0xf];
        chars[i * 2 + 1] = HEX_DIGITS[data[i] & 0xf];
    }
    return new String(chars);
}
```
```php title="PHP 文件哈希计算示例"
// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
$file = 'fileName';
echo 'MD5 file hash of ' . $file . ': ' . md5_file($file);
```

```js title="Node.js 文件哈希计算示例"
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
function test() {
    const stream = fs.createReadStream(path.join('fileName'));
    const hash = crypto.createHash('md5');
    stream.on('data', chunk => {
        hash.update(chunk, 'utf8');
    });
    stream.on('end', () => {
        const md5 = hash.digest('hex');
        console.log(md5);
    });
}
```


</CodeGroup>

### 文件大小计算示例


<CodeGroup>

```go title="Go 文件大小计算示例"
// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
package main

import (
	"fmt"
	"os"
)

func main() {
	fileName := "/local/usr/test.go"
	fileSize := GetFileSize(fileName)
	fmt.Println(fileSize)
}

func GetFileSize(fileName string) int64 {
	fi, err := os.Stat(fileName)
	if err != nil {
		return 0
	}
	return fi.Size()
}
```


```python title="Python 文件大小计算示例"
# fileName 文件路径+文件名 etc: /usr/local/aaa.sh
import os
fsize = os.path.getsize(filename)
print(fileSize)
```

```java title="Java 文件大小计算示例"
// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
public static long getFileSIze(String filename) {
    File file = new File(filename);
    if (!file.exists() || !file.isFile()) {
        System.out.println("file not exist");
        return -1;
    }
    return file.length();
}
```

```php title="PHP 文件大小计算示例"
// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
$filename = 'somefile.txt';
echo $filename . ': ' . filesize($filename) . ' bytes';
```

```js title="Node.js 文件大小计算示例"
const fs = require("fs");

// fileName 文件路径+文件名 etc: /usr/local/aaa.sh
function getFileSize() {
    const fsStat = fs.statSync(fileName）;
    console.log(fsStat.size)
}
```

</CodeGroup>