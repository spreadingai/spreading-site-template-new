<Title>macOS Monterey(12.2.1) 及以上版本运行 electron 应用导致摄像头等设备不能使用或者 crash？</Title>



---

这是由于 macOS Monterey(12.2.1) 及以上版本需要主动设置这些设备的权限。请在 electron 主进程代码中添加以下处理：

```js
const {systemPreferences} = require('electron')
async function checkDeviceAccessPrivilege()
{
    const cameraAccessPrivilege = systemPreferences.getMediaAccessStatus('camera');
    console.log(
        `checkDeviceAccessPrivilege before apply cameraAccessPrivilege: ${cameraAccessPrivilege}`
    );
    if (cameraAccessPrivilege !== 'granted') {
        await systemPreferences.askForMediaAccess('camera');
    }
    const micAccessPrivilege = systemPreferences.getMediaAccessStatus('microphone');
    console.log(
        `checkDeviceAccessPrivilege before apply micAccessPrivilege: ${micAccessPrivilege}`
    );
    if (micAccessPrivilege !== 'granted') {
        await systemPreferences.askForMediaAccess('microphone');
    }
    const screenAccessPrivilege = systemPreferences.getMediaAccessStatus('screen');
    console.log(
        `checkDeviceAccessPrivilege before apply screenAccessPrivilege: ${screenAccessPrivilege}`
    );
}

if(process.platform == 'darwin')
{
    checkDeviceAccessPrivilege()
}
```