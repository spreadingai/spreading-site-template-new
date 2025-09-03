<Title>为什么应用在后台时，不支持打开摄像头？</Title>


---
<Warning title="注意">


Apple 公司通过限制后台摄像头访问，以保护用户隐私和管理设备资源，任何应用程序都无法获得后台访问摄像头的权限。当应用进入后台时，iOS 会自动吊销摄像头访问权限，以防止意外或恶意的数据收集。

</Warning>



Apple 公司对用户隐私的郑重承诺，意味着没有任何形式的应用程序，可以授予后台摄像头访问权限。当应用程序在后台运行时，iOS 会暂停或停止摄像头访问。当应用程序在后台时，开发者须暂停与摄像头相关功能，并在前台恢复它们。

<Warning title="注意">


绕过这些保护措施，可能导致您的应用程序被拒绝或从 App Store 中移除。 

</Warning>



Apple 公司的后台执行指南中，约定了 iOS 应用在后台的行为，但由于隐私问题，并未包括后台摄像头访问相关内容，详情请参考 [BackgroundExecution](https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background)。

请确保您的应用程序尊重用户隐私，并遵循 Apple 公司的所有指南和政策。
