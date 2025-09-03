
# 跑通示例源码
---

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/web/ZIMExampleJavaScript.zip" target="_blank">点击获得完整代码。</Card>

## 1 概览

本文介绍如何快速跑通示例源码，体验即时通讯服务。

## 2 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- 电脑或手机等设备安装了浏览器。
- 安装 [node.js](https://nodejs.org/en/)，推荐使用 14.18.1 或以上版本。
- 设备已连接到网络。
- 浏览器版本及兼容性，请参考 [平台兼容](/zim-web/introduction/overview#平台兼容)。

## 3 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID 和 ServerSecret。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。

## 4 示例源码目录结构

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
├── README.md                     # 项目运行说明 
├── index.html
├── package.json                    
├── public                        
├── src 
│   ├── App.vue                   # 业务组件    
│   ├── assets                    # 媒体资源   
│   ├── components                # 业务组件目录   
│   ├── components.d.ts            
│   ├── env.d.ts                    
│   ├── main.ts                   # 项目入口文件
│   ├── utils.ts                  # 工具类方法     
│   ├── store                     
│   ├── styles                    # css 文件目录   
├── tsconfig.json                 # ts 配置文件   
├── vite.config.ts                # vite 配置文件    
```

## 5 运行示例源码

1. 打开 “src” 文件夹下的 “utils.ts” 文件，并使用本文 [3 前提条件](#3-前提条件) 已获取的 AppID 和 ServerSecret 正确填写，并保存。

    ```typescript
    const appConfig = {
        appID: 0, // 填写申请的 AppID
        serverSecret: '', // 填写申请的 ServerSecret
    };
    ```

2. 参考 `README.md` 文件，依次运行以下命令来启动项目。

    ```bash
    npm install # 安装依赖包
    npm run dev # 依赖包安装成功后，启动项目
    ```
