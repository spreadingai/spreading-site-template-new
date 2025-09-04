# 📋 NPM脚本使用指南

## 🎯 概述

本项目现在支持通过npm脚本来运行静态MD生成器，提供了多种配置方式以满足不同的使用场景。

## 🚀 可用的npm脚本

### 基本用法

| 脚本名称 | 命令 | 说明 |
|---------|------|------|
| `generate-static-md` | `npm run generate-static-md` | 默认配置（自动检测语言环境） |
| `generate-static-md:clean` | `npm run generate-static-md:clean` | 清理输出目录后重新生成 |

### 指定语言环境

| 脚本名称 | 命令 | 说明 |
|---------|------|------|
| `generate-static-md:zh` | `npm run generate-static-md:zh` | 中文配置（--locale zh） |
| `generate-static-md:en` | `npm run generate-static-md:en` | 英文配置（--locale en） |
| `generate-static-md:zh-clean` | `npm run generate-static-md:zh-clean` | 中文配置 + 清理 |
| `generate-static-md:en-clean` | `npm run generate-static-md:en-clean` | 英文配置 + 清理 |

### 直接指定配置文件

| 脚本名称 | 命令 | 说明 |
|---------|------|------|
| `generate-static-md:config-zh` | `npm run generate-static-md:config-zh` | 直接指定中文配置文件 |
| `generate-static-md:config-en` | `npm run generate-static-md:config-en` | 直接指定英文配置文件 |
| `generate-static-md:config-base` | `npm run generate-static-md:config-base` | 基础配置文件 |

## 📊 配置文件信息

| 配置文件 | 实例数量 | 用途 |
|---------|---------|------|
| `docuo.config.zh.json` | 179个实例 | 中文文档配置 |
| `docuo.config.en.json` | 107个实例 | 英文文档配置 |
| `docuo.config.json` | 基础配置 | 基础配置文件 |

## 🎯 推荐使用场景

### 日常开发
```bash
# 最常用：使用默认中文配置
npm run generate-static-md

# 清理后重新生成
npm run generate-static-md:clean
```

### 英文文档生成
```bash
# 生成英文文档
npm run generate-static-md:en

# 英文文档 + 清理
npm run generate-static-md:en-clean
```

### 特定配置文件
```bash
# 直接指定配置文件（推荐用于CI/CD）
npm run generate-static-md:config-en
npm run generate-static-md:config-zh
```

## ✅ 核心优势

### 🔧 **独立配置系统**
- ✅ 完全独立于Next.js环境
- ✅ 简洁的配置检测机制
- ✅ 命令行参数优先
- ✅ 向后兼容性

### 🎯 **灵活的配置方式**
1. **命令行参数**（优先级最高）
2. **默认配置**

### 🚀 **用户友好**
- ✅ 一键测试不同配置
- ✅ 便于开发和调试
- ✅ 支持CI/CD集成
- ✅ 覆盖所有配置方式

### 📈 **完整功能**
- ✅ 短链接处理（100%处理率）
- ✅ 详细的日志记录
- ✅ 错误处理和降级机制
- ✅ 模块化架构

## 🔍 配置检测机制

脚本会按以下优先级检测配置：

1. **命令行参数** `--config` 或 `--locale`
2. **默认配置** `docuo.config.zh.json`

## 📋 日志文件

生成过程中会创建以下日志文件：

```
scripts/logs/
├── zh-short-link-processed-files.txt  # 成功处理的短链接文件
├── zh-short-link-failed-files.txt     # 短链接处理失败的文件
├── zh-successful-files.txt            # 成功生成的文件
└── zh-failed-files.txt                # 生成失败的文件
```

## 🎉 总结

现在你可以通过简单的npm命令来运行静态MD生成器，无需记住复杂的命令行参数。所有配置都已经预设好，只需要选择适合你场景的npm脚本即可！

**最常用的命令**：
- 中文文档：`npm run generate-static-md`
- 英文文档：`npm run generate-static-md:en`
- 清理重新生成：`npm run generate-static-md:clean`

🎯 **独立配置系统让脚本完全独立运行，不再依赖Next.js环境！**
