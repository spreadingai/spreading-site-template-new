#!/usr/bin/env node

/**
 * llms.txt 和 llms.json 生成脚本
 *
 * 功能：
 * 1. 读取 docuo.config.json 和 sidebars.json（支持通过环境变量 NEXT_PUBLIC_CONFIG_FILE 指定配置文件）
 * 2. 按照 5 级标题结构组织内容：
 *    - H1: ZEGO Docs
 *    - H2: category[0]（如"产品"）
 *    - H3: category[1]（如"互动核心产品"）
 *    - H4: instanceGroups.name（如"实时音视频"）
 *    - H5: platform（如"iOS: Objective-C"）
 * 3. 为每个文档生成 Markdown 链接（不包含描述，避免 Agent 只读描述而不访问链接）
 * 4. 输出两种格式：
 *    - public/llms.txt: 符合 llms.txt 规范的文本格式
 *    - public/llms.json: 结构化的 JSON 格式，便于服务端解析
 */

const fs = require('fs');
const path = require('path');

class LLMSTxtGenerator {
  constructor() {
    this.ENTITY_ROOT_DIRECTORY = 'docs';
    this.SEQUENCE_PREFIX_REGEX = /^(\d+)-/;
    this.OUTPUT_TXT_FILE = 'public/llms.txt';
    this.OUTPUT_JSON_FILE = 'public/llms.json';
  }

  /**
   * 主入口：生成 llms.txt 和 llms.json 并写入文件
   */
  generate() {
    console.log('🚀 开始生成 llms.txt 和 llms.json...\n');

    try {
      const docuoConfig = this.getDocuoConfig();
      const siteUrl = this.getSiteUrl(docuoConfig);

      // 生成 TXT 格式
      let txtContent = this.generateHeader(docuoConfig);
      txtContent += this.generateContent(docuoConfig, siteUrl);
      this.writeToFile(this.OUTPUT_TXT_FILE, txtContent);

      // 生成 JSON 格式
      const jsonData = this.generateJSON(docuoConfig, siteUrl);
      this.writeToFile(this.OUTPUT_JSON_FILE, JSON.stringify(jsonData, null, 2));

      console.log('✅ llms.txt 生成完成！');
      console.log(`📄 文件路径: ${this.OUTPUT_TXT_FILE}`);
      console.log('✅ llms.json 生成完成！');
      console.log(`📄 文件路径: ${this.OUTPUT_JSON_FILE}\n`);

      return txtContent;
    } catch (error) {
      console.error('❌ 生成过程中发生错误:', error);
      throw error;
    }
  }

  /**
   * 写入文件
   */
  writeToFile(filePath, content) {
    // 确保 public 目录存在
    const publicDir = path.dirname(filePath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * 生成 llms.txt 头部
   */
  generateHeader(docuoConfig) {
    const title = docuoConfig.title || 'ZEGO Docs';
    const description = docuoConfig.description || 'ZEGO 开发者文档，提供实时音视频、即时通讯等产品的完整技术文档和 API 参考。';

    return `# ${title}\n\n> ${description}\n\n`;
  }

  /**
   * 生成主要内容
   */
  generateContent(docuoConfig, siteUrl) {
    let content = '';
    const instanceGroups = docuoConfig.themeConfig?.instanceGroups || [];

    // 按照 category 第一级分组
    const groupedByCategory1 = this.groupByCategory1(instanceGroups);

    for (const [category1, groups] of Object.entries(groupedByCategory1)) {
      // 二级标题：category 第一级
      content += `## ${category1}\n\n`;

      // 按照 category 第二级分组
      const groupedByCategory2 = this.groupByCategory2(groups);

      for (const [category2, groupList] of Object.entries(groupedByCategory2)) {
        // 三级标题：category 第二级
        content += `### ${category2}\n\n`;

        // 遍历每个 instanceGroup
        for (const group of groupList) {
          // 四级标题：产品名称（instanceGroups.name）
          const productName = group.name || group.id;
          content += `#### ${productName}\n\n`;

          // 五级标题：platform
          for (const instance of group.instances || []) {
            const platform = instance.platform || instance.id;
            content += `##### ${platform}\n\n`;

            // 生成该 instance 的所有文档链接
            const links = this.generateLinksForInstance(instance, siteUrl, docuoConfig);
            content += links + '\n';
          }
        }
      }
    }

    return content;
  }

  /**
   * 生成 JSON 格式数据
   */
  generateJSON(docuoConfig, siteUrl) {
    const title = docuoConfig.title || 'ZEGO Docs';
    const description = docuoConfig.description || 'ZEGO 开发者文档，提供实时音视频、即时通讯等产品的完整技术文档和 API 参考。';
    const instanceGroups = docuoConfig.themeConfig?.instanceGroups || [];

    const jsonData = {
      title,
      description,
      categories: []
    };

    // 按照 category 第一级分组
    const groupedByCategory1 = this.groupByCategory1(instanceGroups);

    for (const [category1, groups] of Object.entries(groupedByCategory1)) {
      const category1Data = {
        name: category1,
        subcategories: []
      };

      // 按照 category 第二级分组
      const groupedByCategory2 = this.groupByCategory2(groups);

      for (const [category2, groupList] of Object.entries(groupedByCategory2)) {
        const category2Data = {
          name: category2,
          products: []
        };

        // 遍历每个 instanceGroup（产品）
        for (const group of groupList) {
          const productName = group.name || group.id;
          const productData = {
            name: productName,
            platforms: []
          };

          // 遍历每个 instance（platform）
          for (const instance of group.instances || []) {
            const platform = instance.platform || instance.id;
            const platformData = {
              name: platform,
              links: []
            };

            // 生成该 instance 的所有文档链接
            const links = this.generateLinksForInstanceJSON(instance, siteUrl, docuoConfig);
            platformData.links = links;

            productData.platforms.push(platformData);
          }

          category2Data.products.push(productData);
        }

        category1Data.subcategories.push(category2Data);
      }

      jsonData.categories.push(category1Data);
    }

    return jsonData;
  }

  /**
   * 按 category 第一级分组
   */
  groupByCategory1(instanceGroups) {
    const grouped = {};
    for (const group of instanceGroups) {
      const category1 = group.category?.[0] || '其他';
      if (!grouped[category1]) {
        grouped[category1] = [];
      }
      grouped[category1].push(group);
    }
    return grouped;
  }

  /**
   * 按 category 第二级分组
   */
  groupByCategory2(groups) {
    const grouped = {};
    for (const group of groups) {
      const category2 = group.category?.[1] || '其他';
      if (!grouped[category2]) {
        grouped[category2] = [];
      }
      grouped[category2].push(group);
    }
    return grouped;
  }

  /**
   * 为单个 instance 生成所有文档链接
   */
  generateLinksForInstance(instance, siteUrl, docuoConfig) {
    const instanceConfig = docuoConfig.instances?.find(i => i.id === instance.id);
    if (!instanceConfig) {
      return '';
    }

    const sidebars = this.readSidebars(instanceConfig.path);
    if (!sidebars) {
      return '';
    }

    const routeBasePath = instanceConfig.routeBasePath || '';
    let links = [];

    // 遍历所有 sidebar
    for (const sidebarKey in sidebars) {
      const sidebarItems = sidebars[sidebarKey];
      this.traverseSidebarItems(sidebarItems, [], routeBasePath, siteUrl, links);
    }

    return links.join('\n');
  }

  /**
   * 为单个 instance 生成所有文档链接（JSON 格式）
   */
  generateLinksForInstanceJSON(instance, siteUrl, docuoConfig) {
    const instanceConfig = docuoConfig.instances?.find(i => i.id === instance.id);
    if (!instanceConfig) {
      return [];
    }

    const sidebars = this.readSidebars(instanceConfig.path);
    if (!sidebars) {
      return [];
    }

    const routeBasePath = instanceConfig.routeBasePath || '';
    let links = [];

    // 遍历所有 sidebar
    for (const sidebarKey in sidebars) {
      const sidebarItems = sidebars[sidebarKey];
      this.traverseSidebarItemsJSON(sidebarItems, [], routeBasePath, siteUrl, links);
    }

    return links;
  }

  /**
   * 递归遍历 sidebar 项目（JSON 格式）
   */
  traverseSidebarItemsJSON(items, labelPath, routeBasePath, siteUrl, result) {
    if (!Array.isArray(items)) {
      return;
    }

    for (const item of items) {
      const currentLabelPath = [...labelPath];

      if (item.label) {
        currentLabelPath.push(item.label);
      }

      // 如果是 category，递归处理子项
      if (item.type === 'category' && item.items) {
        this.traverseSidebarItemsJSON(item.items, currentLabelPath, routeBasePath, siteUrl, result);
      }

      // 如果是 doc，生成链接对象
      if (item.type === 'doc' && item.id) {
        const linkObj = this.generateDocLinkJSON(item, currentLabelPath, routeBasePath, siteUrl);
        if (linkObj) {
          result.push(linkObj);
        }
      }
    }
  }

  /**
   * 生成单个文档的链接对象（JSON 格式）
   */
  generateDocLinkJSON(item, labelPath, routeBasePath, siteUrl) {
    // 构建链接文本（完整层级 + label）
    const title = labelPath.join(' > ');

    // 构建 URL
    const urlPath = routeBasePath ? `${routeBasePath}/${item.id}` : item.id;
    const url = `${siteUrl}/${urlPath}.md`;

    return {
      title,
      url
    };
  }

  /**
   * 递归遍历 sidebar 项目
   */
  traverseSidebarItems(items, labelPath, routeBasePath, siteUrl, result) {
    if (!Array.isArray(items)) {
      return;
    }

    for (const item of items) {
      const currentLabelPath = [...labelPath];

      if (item.label) {
        currentLabelPath.push(item.label);
      }

      // 如果是 category，递归处理子项
      if (item.type === 'category' && item.items) {
        this.traverseSidebarItems(item.items, currentLabelPath, routeBasePath, siteUrl, result);
      }

      // 如果是 doc，生成链接
      if (item.type === 'doc' && item.id) {
        const link = this.generateDocLink(item, currentLabelPath, routeBasePath, siteUrl);
        if (link) {
          result.push(link);
        }
      }
    }
  }

  /**
   * 生成单个文档的 Markdown 链接
   * 注意：不再添加描述，避免 Agent 只读描述而不访问链接
   */
  generateDocLink(item, labelPath, routeBasePath, siteUrl) {
    // 构建链接文本（完整层级 + label）
    const linkText = labelPath.join(' > ');

    // 构建 URL
    const urlPath = routeBasePath ? `${routeBasePath}/${item.id}` : item.id;
    const url = `${siteUrl}/${urlPath}.md`;

    // 生成 Markdown 链接（不再添加描述）
    return `- [${linkText}](${url})`;
  }


  /**
   * 读取 sidebars.json
   */
  readSidebars(instancePath) {
    const sidebarPath = path.join(this.ENTITY_ROOT_DIRECTORY, instancePath, 'sidebars.json');

    if (!fs.existsSync(sidebarPath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(sidebarPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`读取 sidebars.json 失败: ${sidebarPath}`, error.message);
      return null;
    }
  }

  /**
   * 读取 docuo.config.json
   * 参考 sitemap 的逻辑，支持通过环境变量指定配置文件
   */
  getDocuoConfig() {
    let docuoConfig = {};

    try {
      const configPath = path.resolve(
        process.env.NEXT_PUBLIC_CONFIG_FILE
          ? `./docs/${process.env.NEXT_PUBLIC_CONFIG_FILE}`
          : './docs/docuo.config.json'
      );

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        docuoConfig = JSON.parse(configContent);
      } else {
        console.warn(`配置文件不存在: ${configPath}`);
      }
    } catch (error) {
      console.warn('Failed to read docuo.config.json:', error.message);
    }

    return docuoConfig;
  }

  /**
   * 获取站点 URL
   */
  getSiteUrl(docuoConfig) {
    // 优先使用 sitemap 配置中的 siteUrl
    const sitemapUrl = docuoConfig.sitemap?.siteUrl;
    if (sitemapUrl) {
      return sitemapUrl.replace(/\/$/, ''); // 移除末尾斜杠
    }

    // 使用环境变量
    if (process.env.SITE_URL) {
      return process.env.SITE_URL.replace(/\/$/, '');
    }

    // 默认值
    return 'https://doc-zh.zego.im';
  }
}

module.exports = LLMSTxtGenerator;

// 如果直接运行此脚本
if (require.main === module) {
  const generator = new LLMSTxtGenerator();
  const content = generator.generate();
  console.log(content);
}

