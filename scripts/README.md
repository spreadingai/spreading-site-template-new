# 静态MD文件生成脚本

本目录包含用于从动态MDX路由生成静态MD文件的脚本。

## 📋 功能概述

### 核心功能
- **自动发现路由**: 使用现有的`allSlugs`数据或重新生成所有可能的路由
- **Frontmatter移除**: 清理YAML frontmatter块
- **Import解析和内联**: 处理MDX文件中的import语句并内联内容
- **链接路径转换**: 转换相对链接为正确的路由格式
- **层级目录生成**: 在`public/`目录下生成匹配slug层级的目录结构

### 处理规则

#### 1. Slug-to-File解析
- **Slug结构**: `[routeBasePath, ...pathSegments]`
- **Example**: slug `[zim-android, introduction, basic-concepts]` maps to URL `zim-android/introduction/basic-concepts`
- **解析过程**:
  - 第一个元素 (`zim-android`) = `routeBasePath` in `docuo.config.json` instances
  - 遍历instances查找匹配的 `routeBasePath`
  - 剩余元素 (`introduction/basic-concepts`) = `id` in the corresponding instance's `sidebars.json`
  - **智能文件查找**:
    1. **直接匹配**: 尝试直接路径匹配
    2. **智能Fallback转换**: 如果直接匹配失败，生成多种命名变体：
       - **部分转换**: `multi-device-login` → `Multi-device login` (部分连字符转空格)
       - **完全转换**: `multi-device-login` → `Multi Device Login` (全部转换)
       - **首字母大写**: `introduction` → `Introduction`
       - **混合变体**: 支持各种大小写和连字符/空格的组合
       - **数字前缀处理**: 自动处理文件和文件夹的数字前缀
       - **优先级排序**: 按常见程度排序，优先尝试更可能的变体
    3. **递归搜索**: 在目录树中递归查找匹配文件

**实际映射示例**:
```
示例1: slug: zim-android/introduction/basic-concepts
↓
routeBasePath: "zim-android"
instance.path: "core_products/zim/zh/docs_zim_android_zh"
mdxFileID: "introduction/basic-concepts"
↓
直接匹配: docs/.../introduction/basic-concepts.mdx (失败)
↓
Fallback转换: docs/.../Introduction/Basic concepts.mdx (成功)

示例2: slug: zim-android/guides/users/multi-device-login
↓
直接匹配: docs/.../guides/users/multi-device-login.mdx (失败)
↓
Fallback转换: docs/.../Guides/Users/Multi-device login.mdx (成功)
注意: 部分转换，不是 "Multi Device Login"

示例3: slug: zim-android/offline-push-notifications/best-practices/notify-with-photo-attachment
↓
直接匹配: docs/.../offline-push-notifications/best-practices/notify-with-photo-attachment.mdx (失败)
↓
多级文件夹Fallback转换:
  offline-push-notifications → Offline Push Notifications
  best-practices → Best Practices
  notify-with-photo-attachment → Notify With Photo Attachment
↓
最终路径: docs/.../Offline Push Notifications/Best Practices/Notify With Photo Attachment.mdx (成功)

示例4: slug: callkit-web/quick-start/using-wordpress
↓
直接匹配: docs/.../quick-start/using-wordpress.mdx (失败)
↓
数字前缀处理:
  quick-start → 02-Quick start (文件夹数字前缀)
  using-wordpress → 03-Using WordPress.mdx (文件数字前缀)
↓
最终路径: docs/.../02-Quick start/03-Using WordPress.mdx (成功)
```

#### 2. Frontmatter移除
- 移除文档顶部的YAML frontmatter（`---` 分隔符之间的内容）
- 保留文档的其他所有内容

#### 3. Import解析
- **相对路径**: 相对于当前文件解析
- **绝对路径**: 相对于`docs/`根目录解析
- **排除代码块**: 忽略代码块中的import语句
- **递归处理**: 处理导入文件中的嵌套import
- **循环检测**: 防止无限递归

#### 4. 链接转换
对相对链接应用4步转换：
1. **移除文件扩展名**: 去掉`.mdx`/`.md`，保留锚点
2. **移除数字前缀**: 去掉排序前缀如`01-`、`02-`
3. **解析绝对路径**: 转换为基于instance路径的绝对路径
4. **标准化格式**: URL编码空格→连字符，大写→小写

**跳过处理的链接**:
- 绝对URL (`http://`, `https://`)
- 根相对路径 (以`/`开头)
- 其他协议链接

## 🚀 使用方法

### 安装依赖
```bash
npm install
```

### 运行脚本

#### 基本生成
```bash
npm run generate-static-md
```

#### 清理后生成
```bash
npm run generate-static-md:clean
```

#### 测试功能
```bash
node scripts/test-static-md.js
```

### 命令行选项
- `--clean`: 生成前清理现有的MD文件

## 📁 输出结构

生成的文件将保存在`public/`目录下，遵循slug的层级结构：

```
public/
├── real-time-video-ios-oc/
│   ├── introduction/
│   │   ├── overview.md
│   │   └── entry.md
│   └── quick-start/
│       └── integrating-sdk.md
├── zim-android/
│   └── offline-push-notifications/
│       └── integrate-vivo.md
└── ...
```

## 🔧 脚本文件说明

### `generate-static-md.js`
主要的生成脚本，包含完整的处理逻辑：
- 读取docuo配置和sidebars
- 生成或读取allSlugs数据
- 处理每个MDX文件
- 应用所有转换规则
- 生成静态MD文件

### `test-static-md.js`
测试脚本，用于验证基本功能：
- 测试配置文件读取
- 测试slug生成
- 测试文件查找
- 测试内容处理

## 📊 处理统计和日志

### 控制台输出
脚本运行时会显示处理进度和统计信息：
- 总路由数量
- 成功生成的文件数
- 失败的文件数
- 详细的错误信息

### 自动日志生成
每次运行完成后，脚本会自动生成两个日志文件，根据配置文件自动添加语言前缀：

#### 日志文件命名规则
- **默认配置** (`docuo.config.json`): `successful-files.txt`, `failed-files.txt`
- **英文配置** (`docuo.config.en.json`): `en-successful-files.txt`, `en-failed-files.txt`
- **中文配置** (`docuo.config.zh.json`): `zh-successful-files.txt`, `zh-failed-files.txt`
- **自定义配置**: 自动从文件名提取语言标识，如 `docuo.config.fr.json` → `fr-*.txt`

#### 1. 成功文件列表 (`logs/[prefix-]successful-files.txt`)
记录所有成功生成的MD文件，包含详细的处理信息：
```
# 静态MD文件生成 - 成功文件列表
# =====================================

生成时间: 2025-09-02T06:23:14.843Z
开始时间: 2025-09-02T06:23:14.817Z
耗时: 30秒
成功文件数: 1250
失败文件数: 5
总文件数: 1255

# 成功生成的文件列表:
# 格式: [时间戳] 输出文件路径 (slug路径)
#        源文件: 原始MDX文件路径
#        实例: instanceID
#        大小: 原始大小 → 处理后大小

[2025-09-02T06:23:14.830Z] public/zim-android/introduction/basic-concepts.md (zim-android/introduction/basic-concepts)
        源文件: docs/core_products/zim/zh/docs_zim_android_zh/Introduction/Basic concepts.mdx
        实例: zim-android
        大小: 2945 → 3405 字符

[2025-09-02T06:23:15.125Z] public/real-time-video-ios-oc/introduction/overview.md (real-time-video-ios-oc/introduction/overview)
        源文件: docs/core_products/real-time-voice-video/zh/ios-oc/introduction/overview.mdx
        实例: real-time-video-ios-oc
        大小: 1850 → 2100 字符
...
```

#### 2. 失败文件列表 (`logs/[prefix-]failed-files.txt`)
记录所有生成失败的slug和详细的错误分析：
```
# 静态MD文件生成 - 失败文件列表
# =====================================

生成时间: 2025-09-02T06:23:14.843Z
开始时间: 2025-09-02T06:23:14.817Z
耗时: 30秒
成功文件数: 1250
失败文件数: 5
总文件数: 1255

# 生成失败的文件列表:
# 格式: [时间戳] slug路径 - 错误类型: 错误原因
#        失败步骤: 具体失败的处理步骤
#        详细信息: 调试信息

[2025-09-02T06:23:14.834Z] non-existent-product/some-path/some-file - UnknownError: 无法获取内容
        失败步骤: Instance查找失败 - 找不到匹配的routeBasePath
        路由路径: non-existent-product
        可用路径: real-time-video-ios-oc, zim-android, aiagent-server, ...

[2025-09-02T06:23:14.843Z] zim-android/non-existent-folder/non-existent-file - UnknownError: 无法获取内容
        失败步骤: 文件查找失败 - 直接匹配和Fallback转换都未找到文件
        实例ID: zim_android_zh
        MDX文件ID: non-existent-folder/non-existent-file
        尝试的直接路径:
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/non-existent-folder/non-existent-file.mdx
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/non-existent-folder/non-existent-file.md
        尝试的Fallback路径:
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/Non existent folder/Non existent file.mdx
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/Non existent folder/Non existent file.md
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/Non-existent-folder/Non-existent-file.mdx
          ✗ docs/core_products/zim/zh/docs_zim_android_zh/Non-existent-folder/Non-existent-file.md
...
```

### 日志文件特点
- **自动创建**: 每次运行时自动创建`logs/`目录
- **覆盖更新**: 每次运行时覆盖之前的日志文件
- **详细信息**: 包含时间戳、耗时、统计信息
- **易于分析**: 纯文本格式，便于查看和分析
- **成功文件详情**: 包含源文件路径、实例信息、文件大小变化
- **失败原因分析**: 详细的错误步骤分析和调试信息
- **路径追踪**: 显示所有尝试的文件路径和存在性检查
- **Fallback记录**: 记录智能文件查找的所有尝试

## ⚠️ 注意事项

### 性能考虑
- 大型项目可能需要较长时间处理
- 建议在CI/CD流程中运行
- 可以通过`--clean`选项控制是否清理现有文件

### 错误处理
- 脚本会跳过无法处理的文件并记录错误
- 检查控制台输出了解具体的错误信息
- 常见问题：文件路径不存在、权限问题、循环import

### 文件路径映射
脚本基于以下映射规则工作：
- **Slug结构**: `[routeBasePath, ...pathSegments]`
- **Instance配置**: `docuo.config.json`中的instances
- **Sidebar配置**: 各instance目录下的`sidebars.json`
- **文件查找**: 支持`.mdx`和`.md`文件，包括index文件

## 🐛 故障排除

### 常见问题

1. **找不到配置文件**
   - 确保`docs/docuo.config.json`存在
   - 检查文件格式是否正确

2. **无法找到MDX文件**
   - 检查sidebars.json中的id路径是否正确
   - 确认文件确实存在于指定位置

3. **Import处理失败**
   - 检查import路径是否正确
   - 确认被导入的文件存在

4. **链接转换异常**
   - 检查相对路径是否正确
   - 确认目标文件存在

### 调试技巧
- 使用测试脚本验证基本功能
- 检查控制台输出的详细错误信息
- 手动验证配置文件和文件路径
- **查看日志文件**: 检查`logs/failed-files.txt`了解具体失败原因
- **分析成功率**: 通过`logs/successful-files.txt`统计成功生成的文件
- **时间戳追踪**: 利用日志中的时间戳定位问题发生的时间点

## 📁 目录结构

```
scripts/
├── README.md                    # 本文档
├── analyze-performance.js       # 性能分析脚本
├── generate-static-md.js        # 主要的静态MD生成脚本
├── logs/                        # 日志文件目录
│   ├── zh-successful-files.txt  # 成功处理的文件日志
│   ├── zh-failed-files.txt      # 失败文件日志
│   ├── zh-short-link-processed-files.txt  # 短链接处理日志
│   └── zh-short-link-failed-files.txt     # 短链接处理错误日志
└── trans-short-link/            # 短链接处理模块
    ├── index.js                 # 主要的短链接控制器
    ├── init.js                  # 数据初始化控制器
    ├── assets/                  # 静态资源和工具类
    ├── components/              # 组件工具函数
    └── utils/                   # 通用工具函数
```

### 短链接处理模块 (trans-short-link/)

完整的JavaScript版本短链接处理模块，功能包括：
- **API短链接解析** (@符号): 解析API文档链接
- **文档短链接解析** (!符号): 解析文档内部链接
- **实时数据获取**: 从外部API获取最新数据
- **多语言支持**: 支持中文(zh)和英文(en)
- **完整日志记录**: 详细的处理日志和错误追踪

### 日志系统

所有日志统一存放在 `scripts/logs/` 目录：
- **静态MD生成日志**: `zh-successful-files.txt`, `zh-failed-files.txt`
- **短链接处理日志**: `zh-short-link-processed-files.txt`, `zh-short-link-failed-files.txt`

## 📈 扩展和定制

脚本设计为模块化，可以根据需要扩展：
- 添加新的链接处理规则
- 自定义内容转换逻辑
- 集成到构建流程中
- 添加更多的输出格式支持
