# ZPNs

- - -

本文介绍 ZPNs React Native 框架 SDK 版本升级时的一些说明和注意事项。


## 2.6.0 升级指南

ZPNs 2.6.0 分离了 CallKit，使其成为单独的插件。如果您的项目使用了旧版本 ZPNs，在升级后，需要额外集成 zego-callkit-react-native 插件，实现兼容。

1. 导入 zego-callkit-react-native 插件
 
    开发者可以使用 npm 获取 SDK。

    进入您的项目的根目录，执行以下命令安装依赖。

    <Note title="说明">

    npm 下载包支持 typescript 语言（推荐）。
    </Note>

   <CodeGroup>
   ```bash npm
   npm i  zego-callkit-react-native
   ```

   ```bash yarn
   yarn add  zego-callkit-react-native
   ```
   </CodeGroup> 

2. 删除失效的 Callkit 依赖，然后依赖新的头文件来兼容升级。

    ```typescript
    import CallKit from 'zego-callkit-react-native';
    ```
