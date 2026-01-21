/**
 * trans-api-short-link 主入口
 * 处理 API 文档内部短链接
 */

import fs from 'fs';
import path from 'path';
import {
  HeadingData,
  MethodAttrData,
  UrlMap,
  ParsedShortLink,
  InstanceWithClientApi,
  ProcessedInstanceData,
  ParentType,
  PARENT_TYPES,
} from './types';
import { generateSlug } from './slug';
import { parseHeadingData, parseMethodAttrData } from './parser';

/**
 * API 短链接转换控制器
 */
export class ApiShortLinkTransController {
  private docsRoot: string;
  private instanceDataMap: Map<string, ProcessedInstanceData> = new Map();

  constructor(docsRoot: string) {
    this.docsRoot = docsRoot;
  }

  /**
   * 初始化：加载配置并构建数据
   */
  async init(configPath: string): Promise<void> {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const instances = this.extractInstancesWithClientApi(config);

    for (const instance of instances) {
      const data = this.buildInstanceData(instance);
      this.instanceDataMap.set(instance.id, data);
    }
  }

  /**
   * 从配置中提取含 clientApiPath 的 instances
   */
  private extractInstancesWithClientApi(config: any): InstanceWithClientApi[] {
    const instances: InstanceWithClientApi[] = [];

    for (const inst of config.instances || []) {
      if (inst.clientApiPath) {
        instances.push({
          id: inst.id,
          path: inst.path,
          routeBasePath: inst.routeBasePath || '',
          clientApiPath: inst.clientApiPath,
        });
      }
    }

    return instances;
  }

  /**
   * 构建单个 instance 的数据
   */
  private buildInstanceData(instance: InstanceWithClientApi): ProcessedInstanceData {
    const clientApiDir = path.join(this.docsRoot, instance.path, instance.clientApiPath);
    const urlMap = this.buildUrlMap(instance);
    const headingData = parseHeadingData(clientApiDir);
    const methodAttrData = parseMethodAttrData(clientApiDir);

    return { instance, urlMap, headingData, methodAttrData };
  }

  /**
   * 将路径转换为标准 ID 格式（全小写，空格转连字符）
   */
  private normalizePathToId(pathStr: string): string {
    return pathStr
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  /**
   * 构建 URL 映射
   */
  private buildUrlMap(instance: InstanceWithClientApi): UrlMap {
    // 将 clientApiPath 转换为标准 ID 格式
    const normalizedClientApiPath = this.normalizePathToId(instance.clientApiPath);
    const baseUrl = `/${instance.routeBasePath}/${normalizedClientApiPath}`.replace(/\/+/g, '/');
    const urlMap: UrlMap = {
      class: `${baseUrl}/class`,
      interface: `${baseUrl}/interface`,
      enum: `${baseUrl}/enum`,
      protocol: `${baseUrl}/protocol`,
      struct: `${baseUrl}/struct`,
    };
    return urlMap;
  }

  /**
   * 解析短链接
   */
  parseShortLink(shortLink: string): ParsedShortLink {
    // 类/枚举短链接：以 - 开头，如 @-ZegoEngine 或 @-ZegoEngine-class
    if (shortLink.startsWith('-')) {
      return this.parseHeadingShortLink(shortLink.slice(1));
    }
    // 方法/属性短链接
    return this.parseMethodShortLink(shortLink);
  }

  /**
   * 解析标题类短链接（类/枚举）
   */
  private parseHeadingShortLink(raw: string): ParsedShortLink {
    let specifiedType: ParentType | undefined;
    let anchorText = raw;

    // 检查是否有类型后缀
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

  /**
   * 解析方法类短链接
   */
  private parseMethodShortLink(raw: string): ParsedShortLink {
    // 处理重载后缀：__1 → -1
    const normalizedRaw = raw.replace(/__(\d+)$/, '-$1');
    return {
      type: 'method',
      raw,
      anchor: generateSlug(normalizedRaw),
    };
  }

  /**
   * 替换文件中的短链接
   */
  replaceShortLinksInFile(filePath: string, instanceId: string): string {
    const data = this.instanceDataMap.get(instanceId);
    if (!data) return fs.readFileSync(filePath, 'utf-8');

    let content = fs.readFileSync(filePath, 'utf-8');
    // 匹配 [text](@shortLink) 格式
    const shortLinkRegex = /(\[.*?\])\(@([^)]+)\)/g;

    content = content.replace(shortLinkRegex, (match, linkText, shortLink) => {
      const fullUrl = this.resolveShortLink(shortLink, data);
      if (fullUrl) {
        return `${linkText}(${fullUrl})`;
      }
      return match; // 未匹配到则保持原样
    });

    return content;
  }

  /**
   * 解析短链接为完整 URL
   */
  private resolveShortLink(shortLink: string, data: ProcessedInstanceData): string | null {
    const parsed = this.parseShortLink(shortLink);
    const { urlMap, headingData, methodAttrData } = data;

    if (parsed.type === 'heading') {
      return this.resolveHeadingLink(parsed, urlMap, headingData);
    }
    return this.resolveMethodLink(parsed, urlMap, methodAttrData);
  }

  /**
   * 解析标题类短链接
   */
  private resolveHeadingLink(
    parsed: ParsedShortLink,
    urlMap: UrlMap,
    headingData: HeadingData
  ): string | null {
    const { anchor, specifiedType } = parsed;

    // 如果指定了类型，优先在该类型中查找
    if (specifiedType && headingData[specifiedType].includes(anchor)) {
      return `${urlMap[specifiedType]}#${anchor}`;
    }

    // 按优先级遍历所有类型查找
    for (const type of PARENT_TYPES) {
      if (headingData[type].includes(anchor)) {
        return `${urlMap[type]}#${anchor}`;
      }
    }

    return null;
  }

  /**
   * 解析方法类短链接
   */
  private resolveMethodLink(
    parsed: ParsedShortLink,
    urlMap: UrlMap,
    methodAttrData: MethodAttrData
  ): string | null {
    const { anchor } = parsed;

    // 按优先级遍历所有类型查找
    for (const type of PARENT_TYPES) {
      if (methodAttrData[type].includes(anchor)) {
        return `${urlMap[type]}#${anchor}`;
      }
    }

    return null;
  }

  /**
   * 处理指定 instance 下所有文件的短链接
   */
  async processInstance(instanceId: string): Promise<{ processed: number; replaced: number }> {
    const data = this.instanceDataMap.get(instanceId);
    if (!data) {
      return { processed: 0, replaced: 0 };
    }

    const instanceDir = path.join(this.docsRoot, data.instance.path);
    const files = this.collectMdxFiles(instanceDir);
    let processed = 0;
    let replaced = 0;

    for (const filePath of files) {
      const originalContent = fs.readFileSync(filePath, 'utf-8');
      const newContent = this.replaceShortLinksInFile(filePath, instanceId);

      if (originalContent !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        replaced++;
      }
      processed++;
    }

    return { processed, replaced };
  }

  /**
   * 收集目录下所有 .md 和 .mdx 文件
   */
  private collectMdxFiles(dir: string): string[] {
    const files: string[] = [];

    const walk = (currentDir: string) => {
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
   * 处理所有配置了 clientApiPath 的 instances
   */
  async processAll(): Promise<Map<string, { processed: number; replaced: number }>> {
    const results = new Map<string, { processed: number; replaced: number }>();

    for (const instanceId of Array.from(this.instanceDataMap.keys())) {
      const result = await this.processInstance(instanceId);
      results.set(instanceId, result);
    }

    return results;
  }

  /**
   * 获取已加载的 instance IDs
   */
  getInstanceIds(): string[] {
    return Array.from(this.instanceDataMap.keys());
  }

  /**
   * 检查指定 instance 是否已加载数据
   */
  hasInstanceData(instanceId: string): boolean {
    return this.instanceDataMap.has(instanceId);
  }

  /**
   * 运行时替换短链接（处理编译后的 MDX 代码）
   * 不修改源文件，仅处理内存中的内容
   * @param instanceId 当前页面所属的 instance ID
   * @param content MDX 原始内容
   * @param codeStr 编译后的 MDX 代码字符串
   * @returns 处理后的内容
   */
  replaceShortLinksAtRuntime(
    instanceId: string,
    content: string,
    codeStr?: string
  ): { content: string; codeStr?: string } {
    const data = this.instanceDataMap.get(instanceId);
    if (!data) {
      return { content, codeStr };
    }

    // ===== 处理 content（MDX 原始内容）=====
    // 匹配 markdown 格式: [text](@shortLink) 或 [text](docuo-link@shortLink)
    const mdShortLinkRegex = /(\[.*?\])\((docuo-link)?@([^)]+)\)/g;
    content = content.replace(mdShortLinkRegex, (match, linkText, _prefix, shortLink) => {
      const fullUrl = this.resolveShortLink(shortLink, data);
      if (fullUrl) {
        return `${linkText}(${fullUrl})`;
      }
      return match; // 未匹配到则保持原样，让 trans-short-link 处理
    });

    // 匹配 HTML a 标签: <a href="@shortLink"> 或 <a href="docuo-link@shortLink">
    const aHrefRegex = /(<a[^>]*href=")(docuo-link)?@([^"]+)"/gi;
    content = content.replace(aHrefRegex, (match, prefix, _docuoLink, shortLink) => {
      const fullUrl = this.resolveShortLink(shortLink, data);
      if (fullUrl) {
        return `${prefix}${fullUrl}"`;
      }
      return match;
    });

    // ===== 处理 codeStr（编译后的 MDX 代码）=====
    if (codeStr) {
      // 格式1: href:"@shortLink" 或 href:"docuo-link@shortLink"
      // 例如: ...("a",{href:"@createEngine",children:"xxx"})...
      const codeHrefRegex = /(href:")(docuo-link)?@([^"]+)"/gi;
      codeStr = codeStr.replace(codeHrefRegex, ($, $1, _$2, $3) => {
        const fullUrl = this.resolveShortLink($3, data);
        if (fullUrl) {
          return `${$1}${fullUrl}"`;
        }
        return $;
      });

      // 格式2: 条件表达式中的短链接
      // 例如: href:t.a?"docuo-link@aaa":"docuo-link@bbb"
      const codeConditionalRegex = /(["'])docuo-link@([^"']+)\1/gi;
      codeStr = codeStr.replace(codeConditionalRegex, ($, quote, shortLink) => {
        const fullUrl = this.resolveShortLink(shortLink, data);
        if (fullUrl) {
          return `${quote}${fullUrl}${quote}`;
        }
        return $;
      });

      // 格式3: 通用匹配 - 处理其他可能的格式
      // 例如: ..."@shortLink"... 在字符串中
      const codeGeneralRegex = /(")(docuo-link)?@([a-zA-Z0-9_-]+)"/gi;
      codeStr = codeStr.replace(codeGeneralRegex, ($, quote, _docuoLink, shortLink) => {
        const fullUrl = this.resolveShortLink(shortLink, data);
        if (fullUrl) {
          return `${quote}${fullUrl}"`;
        }
        return $;
      });
    }

    return { content, codeStr };
  }
}

