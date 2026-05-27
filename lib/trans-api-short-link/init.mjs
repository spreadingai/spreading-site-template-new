#!/usr/bin/env node

/**
 * trans-api-short-link 初始化脚本
 * 在构建前处理所有含 clientApiPath 的 instance 的 API 短链接
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const DOCS_ROOT = path.resolve(__dirname, '../../docs');
const PARENT_TYPES = ['class', 'interface', 'enum', 'protocol', 'struct'];

/**
 * 生成锚点 slug（与 ParamField.tsx 完全一致）
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/**
 * 从 ParamField 属性中提取所有可能的锚点
 */
function extractAnchorsFromParamField(attrs) {
  const { name, parent_name, parent_type, anchor_suffix = '' } = attrs;
  const anchors = [];

  const anchorBaseName = anchor_suffix ? `${name}${anchor_suffix}` : name;
  const primaryAnchorId = generateSlug(anchorBaseName);
  anchors.push(primaryAnchorId);

  // 生成带 parent_name 的锚点（包括 enum 类型）
  // 短链接可能是 @methodName-ClassName 或 @EnumValue-EnumName 格式
  if (parent_type && parent_name) {
    anchors.push(generateSlug(`${anchorBaseName}-${parent_name}`));
    // 非 enum 类型还生成带 parent_type 的锚点
    if (parent_type !== 'enum') {
      anchors.push(generateSlug(`${anchorBaseName}-${parent_name}-${parent_type}`));
    }
  }

  if (name.includes(':')) {
    const firstSegment = name.split(':')[0];
    if (firstSegment && firstSegment !== name) {
      const colonAnchorId = generateSlug(firstSegment);
      if (colonAnchorId !== primaryAnchorId && !anchors.includes(colonAnchorId)) {
        anchors.push(colonAnchorId);
      }
      // Also add firstSegment-parent_name and firstSegment-parent_name-parent_type
      if (parent_type && parent_name) {
        const colonWithParentAnchorId = generateSlug(`${firstSegment}-${parent_name}`);
        if (!anchors.includes(colonWithParentAnchorId)) {
          anchors.push(colonWithParentAnchorId);
        }
        if (parent_type !== 'enum') {
          const colonWithParentTypeAnchorId = generateSlug(`${firstSegment}-${parent_name}-${parent_type}`);
          if (!anchors.includes(colonWithParentTypeAnchorId)) {
            anchors.push(colonWithParentTypeAnchorId);
          }
        }
      }
    }
  }

  return anchors;
}

/**
 * 从 MDX 内容中提取标题锚点
 */
function extractHeadingsFromContent(content) {
  const headingRegex = /^#{2,6}\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const headingText = match[1].trim();
    const slug = generateSlug(headingText);
    if (slug && !headings.includes(slug)) {
      headings.push(slug);
    }
  }

  return headings;
}

/**
 * 从 MDX 内容中提取 ParamField 属性
 */
function extractParamFieldsFromContent(content) {
  // 先将换行符替换为空格以支持多行属性
  const normalizedContent = content.replace(/\r?\n/g, ' ');
  // 匹配 <ParamField ... > 或 <ParamField ... />
  // 使用更复杂的正则来处理属性值中包含 > 的情况
  // 匹配引号内的内容（包括>）或非>字符
  const paramFieldRegex = /<ParamField\s+((?:[^>"']|"[^"]*"|'[^']*')*?)(?:\/>|>)/g;
  const results = [];
  let match;

  while ((match = paramFieldRegex.exec(normalizedContent)) !== null) {
    const attrsStr = match[1];
    const attrs = parseJsxAttributes(attrsStr);

    if (attrs.name) {
      results.push({
        name: attrs.name,
        parent_name: attrs.parent_name,
        parent_type: attrs.parent_type,
        anchor_suffix: attrs.anchor_suffix,
      });
    }
  }

  return results;
}

/**
 * 解析 JSX 属性字符串
 */
function parseJsxAttributes(attrsStr) {
  const result = {};
  const attrRegex = /(\w+)=["']([^"']*)["']/g;
  let match;

  while ((match = attrRegex.exec(attrsStr)) !== null) {
    result[match[1]] = match[2];
  }

  return result;
}

/**
 * 创建空数据结构
 */
function createEmptyData() {
  return {
    class: [],
    interface: [],
    enum: [],
    protocol: [],
    struct: [],
  };
}

/**
 * 解析 HeadingData
 */
function parseHeadingData(clientApiDir) {
  const headingData = createEmptyData();

  for (const type of PARENT_TYPES) {
    const mdxPath = path.join(clientApiDir, `${type}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf-8');
      headingData[type] = extractHeadingsFromContent(content);
    }
  }

  return headingData;
}

/**
 * 解析 MethodAttrData
 */
function parseMethodAttrData(clientApiDir) {
  const methodAttrData = createEmptyData();

  for (const type of PARENT_TYPES) {
    const mdxPath = path.join(clientApiDir, `${type}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf-8');
      const paramFields = extractParamFieldsFromContent(content);

      for (const attrs of paramFields) {
        const anchors = extractAnchorsFromParamField(attrs);
        for (const anchor of anchors) {
          if (!methodAttrData[type].includes(anchor)) {
            methodAttrData[type].push(anchor);
          }
        }
      }
    }
  }

  return methodAttrData;
}

/**
 * 将路径转换为标准 ID 格式（全小写，空格转连字符）
 */
function normalizePathToId(pathStr) {
  return pathStr
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * 为指定路径构建 URL 映射
 */
function buildUrlMapForPath(routeBasePath, normalizedClientApiPath) {
  const baseUrl = `/${routeBasePath}/${normalizedClientApiPath}`.replace(/\/+/g, '/');
  return {
    class: `${baseUrl}/class`,
    interface: `${baseUrl}/interface`,
    enum: `${baseUrl}/enum`,
    protocol: `${baseUrl}/protocol`,
    struct: `${baseUrl}/struct`,
  };
}

/**
 * 解析短链接
 */
function parseShortLink(shortLink) {
  // 类/枚举短链接：以 - 开头
  if (shortLink.startsWith('-')) {
    return parseHeadingShortLink(shortLink.slice(1));
  }
  return parseMethodShortLink(shortLink);
}

function parseHeadingShortLink(raw) {
  let specifiedType = undefined;
  let anchorText = raw;

  for (const type of PARENT_TYPES) {
    const suffix = `-${type}`;
    if (raw.toLowerCase().endsWith(suffix)) {
      specifiedType = type;
      anchorText = raw.slice(0, -suffix.length);
      break;
    }
  }

  return {
    type: 'heading',
    raw,
    anchor: generateSlug(anchorText),
    specifiedType,
  };
}

function parseMethodShortLink(raw) {
  // 处理 anchor_suffix 格式：__2 → 2
  const normalizedRaw = raw.replace(/__/g, '');
  return {
    type: 'method',
    raw,
    anchor: generateSlug(normalizedRaw),
  };
}

/**
 * 解析短链接为完整 URL（遍历所有路径，按数组顺序优先）
 */
function resolveShortLink(shortLink, allPathData) {
  const parsed = parseShortLink(shortLink);

  for (const { urlMap, headingData, methodAttrData } of allPathData) {
    if (parsed.type === 'heading') {
      const { anchor, specifiedType } = parsed;
      if (specifiedType && headingData[specifiedType]?.includes(anchor)) {
        return `${urlMap[specifiedType]}#${anchor}`;
      }
      for (const type of PARENT_TYPES) {
        if (headingData[type]?.includes(anchor)) {
          return `${urlMap[type]}#${anchor}`;
        }
      }
    } else {
      const { anchor } = parsed;
      for (const type of PARENT_TYPES) {
        if (methodAttrData[type]?.includes(anchor)) {
          return `${urlMap[type]}#${anchor}`;
        }
      }
    }
  }

  return null;
}

/**
 * 替换文件中的短链接
 */
function replaceShortLinksInContent(content, allPathData) {
  const shortLinkRegex = /(\[.*?\])\(@([^)]+)\)/g;
  let replacedCount = 0;

  const newContent = content.replace(shortLinkRegex, (match, linkText, shortLink) => {
    const fullUrl = resolveShortLink(shortLink, allPathData);
    if (fullUrl) {
      replacedCount++;
      return `${linkText}(${fullUrl})`;
    }
    return match;
  });

  return { content: newContent, replacedCount };
}

/**
 * 收集目录下所有 .md 和 .mdx 文件
 */
function collectMdxFiles(dir) {
  const files = [];

  const walk = (currentDir) => {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  };

  walk(dir);
  return files;
}

/**
 * 处理单个 instance
 */
function processInstance(instance, docsRoot) {
  const pathsArray = Array.isArray(instance.clientApiPath)
    ? instance.clientApiPath
    : [instance.clientApiPath];

  const allPathData = [];
  let validPathCount = 0;

  for (const apiPath of pathsArray) {
    const clientApiDir = path.join(docsRoot, instance.path, apiPath);

    if (!fs.existsSync(clientApiDir)) {
      console.warn(`  ⚠️  clientApiPath 不存在，跳过: ${clientApiDir}`);
      continue;
    }

    validPathCount++;
    const normalizedPath = normalizePathToId(apiPath);
    const urlMap = buildUrlMapForPath(instance.routeBasePath, normalizedPath);
    const headingData = parseHeadingData(clientApiDir);
    const methodAttrData = parseMethodAttrData(clientApiDir);

    allPathData.push({ urlMap, headingData, methodAttrData });
  }

  if (validPathCount === 0) {
    return { processed: 0, replaced: 0 };
  }

  const instanceDir = path.join(docsRoot, instance.path);
  const files = collectMdxFiles(instanceDir);

  let processed = 0;
  let totalReplaced = 0;

  for (const filePath of files) {
    const originalContent = fs.readFileSync(filePath, 'utf-8');
    const { content: newContent, replacedCount } = replaceShortLinksInContent(
      originalContent,
      allPathData
    );

    if (replacedCount > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      totalReplaced += replacedCount;
      console.log(`  ✓ ${path.relative(docsRoot, filePath)} (${replacedCount} 个链接)`);
    }
    processed++;
  }

  return { processed, replaced: totalReplaced };
}

/**
 * 主函数
 */
async function main() {
  console.log('\n🔗 [trans-api-short-link] 开始处理 API 短链接...\n');
  console.time('trans-api-short-link');

  // 获取配置文件路径
  const configFileName = process.env.NEXT_PUBLIC_CONFIG_FILE || 'docuo.config.json';
  const configPath = path.join(DOCS_ROOT, configFileName);

  if (!fs.existsSync(configPath)) {
    console.log(`⚠️  配置文件不存在: ${configPath}`);
    console.timeEnd('trans-api-short-link');
    return;
  }

  console.log(`📄 使用配置文件: ${configFileName}`);

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const instances = (config.instances || []).filter(inst => inst.clientApiPath);

  if (instances.length === 0) {
    console.log('ℹ️  没有找到配置了 clientApiPath 的 instance');
    console.timeEnd('trans-api-short-link');
    return;
  }

  console.log(`📦 找到 ${instances.length} 个配置了 clientApiPath 的 instance\n`);

  let totalProcessed = 0;
  let totalReplaced = 0;

  for (const instance of instances) {
    console.log(`📂 处理 instance: ${instance.id}`);
    const { processed, replaced } = processInstance(instance, DOCS_ROOT);
    totalProcessed += processed;
    totalReplaced += replaced;
    console.log(`   文件: ${processed}, 替换: ${replaced}\n`);
  }

  console.log(`✅ 完成! 共处理 ${totalProcessed} 个文件，替换 ${totalReplaced} 个短链接`);
  console.timeEnd('trans-api-short-link');
  console.log('');
}

// 执行
main().catch(console.error);

