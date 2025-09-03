<Title>如何解决 macOS 权限问题？</Title>


---

### 如何检查电脑是否开启应用的截取屏幕权限和辅助功能？

请打开 macOS 电脑的“系统偏好设置”，找到“安全性与隐私”选项，切换到“隐私”选项卡，确认以下权限是否开启：
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ScreenSharing/CommonProblems/screenSharing_Problems_macOS_2.png" /></Frame></Frame>
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ScreenSharing/CommonProblems/screenSharing_Problems_macOS_1.png" /></Frame></Frame> 

### 为什么打开了权限，还是无法截取图片或者报错？

在 macOS 电脑的“设置”中看到的状态，并不是应用真实的状态，建议**使用代码判断权限是否开启**（请参考下文的“如何判断系统权限？”）。

如果已经开启权限，请先关闭后，再次打开重试。



### 如何跳转到系统设置权限弹窗？

请参考此网址设置 “系统相关 URL”：[MacOS System Preference Links](https://www.mbsplugins.net/archive/2020-04-05/MacOS_System_Preference_Links/monkeybreadsoftware_blog_archive)。

### 如何判断系统权限？

- 辅助功能权限

    可以通过调用以下 SDK 的内部接口确认权限。
 
    ```objc    
    SCREENCAPTURE_API bool zego_windowthumbnail_window_checkStatus(ZegoWindowHandle handle);
    ```
- 屏幕录制权限

    macOS 10.15 版本后的系统以后需要开启此权限。SDK 对此权限功能没有封装，需要用户自行实现。 请参考以下代码：

    ```objc
    bool ZegoSDKEngineMacUtils::checkScreenCapturePermission()
    {	
        if (QSysInfo::macVersion() < 14)	
        {		
            return true;	
        }	
        if (@available(macOS 10.15, *)) 
        {		
            CFArrayRef windowList = CGWindowListCopyWindowInfo(kCGWindowListOptionOnScreenOnly, kCGNullWindowID);		
            NSUInteger numberOfWindows = CFArrayGetCount(windowList);		
            NSUInteger numberOfWindowsWithInfoGet = 0;		
            for (int idx = 0; idx < numberOfWindows; idx++) 
            {			
                NSDictionary *windowInfo = (NSDictionary *)CFArrayGetValueAtIndex(windowList, idx);			
                NSString *windowName = windowInfo[(id)kCGWindowName];			
                NSNumber* sharingType = windowInfo[(id)kCGWindowSharingState];			
                if (windowName || kCGWindowSharingNone != sharingType.intValue) 
                {				
                    numberOfWindowsWithInfoGet++;			
                } else {				
                    NSNumber* pid = windowInfo[(id)kCGWindowOwnerPID];				
                    NSString* appName = windowInfo[(id)kCGWindowOwnerName];				
                    // NSLog(@"windowInfo get Fail pid:%lu appName:%@", pid.integerValue, appName);			
                }		
            }		
            CFRelease(windowList);		
            if (numberOfWindows == numberOfWindowsWithInfoGet) {			
                return true;		
            } else {			
                return false;		
            }	
        }	
        return true;
    }
    ```