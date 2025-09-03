<Title>如何解决 macOS 窗口相关问题?</Title>


---

### 为什么获取不到窗口列表？

请检查 SDK 是否正常初始化。如果初始化异常，请重试。

### 如何检测窗口 ID 是否正确？

请参考以下代码进行确认。

```objc
//检测是否可以采集画面（没有开启辅助功能权限可以采集数据，但是窗口状态回调可能异常） 
bool isValid = zego_windowthumbnail_window_checkStatus(windowID);
```

### 为什么过滤窗口会失效？

SDK 在进行屏幕共享时，接口调用步骤如下：
1. 枚举屏幕：zego_screencapture_enum_screen_list()。
2. 设置过滤窗口：zego_screencapture_set_excluded_windows。
3. 设置分享主屏幕：zego_screencapture_set_target_screen()。
4. 设置采集区域：zego_screencapture_set_target_rect()。
5. 开始屏幕共享：zego_screencapture_start_capture()。

<br/>

如果过滤窗口失效，请按照如下步骤确认：

1. 首先请确认第 2 步的调用顺序在最前面。
2. 其次如果是自己的应用的窗口，可以通过设置窗口的 “sharingType”为 “NSWindowSharingNone”，Qt 示例代码如下：

    ```objc
    void ZegoMacUtils::setSharingTypeNone(QWidget* widget){    
        if(widget != nullptr)    
        {        
            NSView* view = (NSView*)widget->winId();        
            NSWindow* wnd = [view window];            
            wnd.sharingType = NSWindowSharingNone;    
        }
    }

3. 检查传入的窗口 ID 是否正确。开发者可以通过以下方法获取窗口 ID，与自己传入的 ID 进行对比。

    ```objc
    uint32_t windowListLen = 0;    
    const struct ZegoScreenCaptureWindowItem * windowList = zego_screencapture_enum_window_list(1,&windowListLen);    
    for (int i = 0; i < windowListLen; i++)    
    {        
        // NSLog(@"[***] windowID: %d title: %s", windowList[i].handle, windowList[i].title);//        
        struct ZegoScreenCaptureWindowItem info = windowList[i];        
        ZegoWindowItem *windowItem = [[ZegoWindowItem alloc] init];        
        windowItem.windowID = (CGWindowID)windowList[i].handle;        
        windowItem.title = [NSString stringWithUTF8String:(windowList[i].title)];                
        [self.m_windowList addObject:windowItem];    
    }    
    zego_screencapture_free_window_list(windowList);
    ```

    Qt 下获取窗口 ID 的方法，请参考如下代码：
    ```objc
    quint32 ZegoMacUtils::getNSWindowId(QWidget* widget){    
        NSView* view = (NSView*)widget->winId();    
        NSWindow* wnd = [view window];        
        return (CGWindowID)[wnd windowNumber];
    } 
    ```

