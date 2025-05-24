# 重定向功能使用说明

## 概述

本项目已实现基于 `docuo.config.json` 文件的重定向功能，支持站内 URL 重定向。

## 配置方式

在 `docs/docuo.config.json` 文件中添加 `redirects` 字段：

```json
{
  "redirects": [
    {
      "source": "/aiagent-android-zh/:path*",
      "destination": "/aiagent-android/:path*"
    },
    {
      "source": "/old-docs/:path*", 
      "destination": "/new-docs/:path*"
    },
    {
      "source": "/legacy-api",
      "destination": "/api/v2"
    },
    {
      "source": "/temp-redirect",
      "destination": "/new-location",
      "permanent": false
    }
  ]
}
```

## 配置说明

### 基本字段

- `source`: 源路径，支持路径参数（如 `:path*`）
- `destination`: 目标路径，支持路径参数
- `permanent`: 可选，重定向类型
  - 不设置或 `true`: 永久重定向（308 状态码）**（默认）**
  - `false`: 临时重定向（307 状态码）

### 路径参数

- `:path*`: 匹配任意路径段
- `:slug`: 匹配单个路径段

### 示例

1. **简单重定向**
   ```json
   {
     "source": "/old-page",
     "destination": "/new-page"
   }
   ```

2. **带路径参数的重定向**
   ```json
   {
     "source": "/aiagent-android-zh/:path*",
     "destination": "/aiagent-android/:path*"
   }
   ```
   - `/aiagent-android-zh/quick-start` → `/aiagent-android/quick-start`
   - `/aiagent-android-zh/api/overview` → `/aiagent-android/api/overview`

3. **临时重定向**
   ```json
   {
     "source": "/maintenance",
     "destination": "/under-construction",
     "permanent": false
   }
   ```

## 实现原理

1. 重定向配置在 Next.js 的 `redirects()` 函数中处理
2. 系统会自动读取 `docs/docuo.config.json` 中的 `redirects` 字段
3. 默认为永久重定向（308 状态码），除非明确设置 `permanent: false`
4. 支持 Next.js 的所有重定向功能，包括路径参数

## 注意事项

1. 重定向是在服务器端处理的，对 SEO 友好
2. 永久重定向会被浏览器和搜索引擎缓存
3. 路径参数必须在 source 和 destination 中保持一致
4. 重定向优先级高于页面路由

## 错误处理

如果访问已被重定向的路径时出现错误，系统会：
1. 在控制台输出警告信息
2. 自动回退到默认实例处理
3. 避免应用崩溃

这样确保了即使配置了重定向，原始路径的静态生成过程也不会失败。
