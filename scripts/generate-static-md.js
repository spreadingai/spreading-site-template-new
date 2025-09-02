#!/usr/bin/env node

/**
 * 静态MD文件生成脚本
 * 
 * 功能：
 * 1. 使用现有的allSlugs数据生成静态MD文件
 * 2. 移除frontmatter
 * 3. 解析和内联import语句
 * 4. 转换相对链接路径
 * 5. 生成层级目录结构到public/目录
 */

const fs = require('fs');
const path = require('path');

// 由于TypeScript模块导入的复杂性，我们将直接实现核心逻辑
// 而不是依赖现有的TypeScript模块

class StaticMDGenerator {
  constructor() {
    this.outputDir = 'public';
    this.generatedCount = 0;
    this.errorCount = 0;
    this.processedImports = new Set(); // 防止循环import
    this.ENTITY_ROOT_DIRECTORY = 'docs';
    this.SEQUENCE_PREFIX_REGEX = /^(\d+)-/;
    this.logsDir = 'logs';
    this.successfulFiles = []; // 记录成功生成的文件
    this.failedFiles = []; // 记录失败的文件和错误信息
    this.startTime = null;
  }

  /**
   * 主入口：生成所有静态MD文件
   */
  async generateAll() {
    this.startTime = new Date();
    console.log('🚀 开始生成静态MD文件...\n');

    try {
      // 获取所有slugs
      const allSlugs = this.getAllSlugs();
      console.log(`📊 找到 ${allSlugs.length} 个路由\n`);

      // 清理输出目录
      if (process.argv.includes('--clean')) {
        this.cleanOutputDirectory();
      }

      // 生成每个文件
      for (const slugData of allSlugs) {
        await this.generateSingleFile(slugData);
      }

      console.log('\n✅ 生成完成！');
      console.log(`📈 成功生成: ${this.generatedCount} 个文件`);
      console.log(`❌ 生成失败: ${this.errorCount} 个文件`);

      // 生成日志文件
      await this.generateLogFiles();

    } catch (error) {
      console.error('❌ 生成过程中发生错误:', error);
      // 即使出错也尝试生成日志
      try {
        await this.generateLogFiles();
      } catch (logError) {
        console.error('❌ 生成日志文件失败:', logError);
      }
      process.exit(1);
    }
  }

  /**
   * 获取所有slugs数据
   */
  getAllSlugs() {
    try {
      // 优先从缓存文件读取
      const slugsFilePath = path.join(this.ENTITY_ROOT_DIRECTORY, 'middleware', 'all-slugs.json');

      if (fs.existsSync(slugsFilePath)) {
        const allSlugs = JSON.parse(fs.readFileSync(slugsFilePath, 'utf8'));
        if (allSlugs && allSlugs.length > 0) {
          return allSlugs;
        }
      }

      // 如果缓存不存在，重新生成
      console.log('📝 缓存不存在，重新生成allSlugs...');
      return this.generateAllSlugs();
    } catch (error) {
      console.error('❌ 获取allSlugs失败:', error);
      throw error;
    }
  }

  /**
   * 生成所有slugs
   */
  generateAllSlugs() {
    const docuoConfig = this.getDocuoConfig();
    const instances = docuoConfig.instances.filter(instance =>
      !instance.path.match(/^https?:/i)
    );

    let allSlugs = [];

    for (const instance of instances) {
      const slugs = this.generateSlugsForInstance(instance);
      allSlugs = allSlugs.concat(slugs);
    }

    // 保存到缓存文件
    this.saveAllSlugs(allSlugs);

    return allSlugs;
  }

  /**
   * 读取docuo配置
   */
  getDocuoConfig() {
    const configPath = path.join(this.ENTITY_ROOT_DIRECTORY, 'docuo.config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  /**
   * 为单个instance生成slugs
   */
  generateSlugsForInstance(instance) {
    const sidebars = this.readSidebars(instance.path);
    if (!sidebars) {
      return [];
    }

    const slugs = [];
    const routeBasePath = instance.routeBasePath || '';

    // 遍历所有sidebar
    for (const sidebarKey in sidebars) {
      const sidebarItems = sidebars[sidebarKey];
      this.traverseSidebarItems(sidebarItems, instance.id, '', sidebarKey, [routeBasePath].filter(Boolean), slugs);
    }

    return slugs;
  }

  /**
   * 读取sidebars配置
   */
  readSidebars(instancePath) {
    const sidebarsPath = path.join(this.ENTITY_ROOT_DIRECTORY, instancePath, 'sidebars.json');

    if (!fs.existsSync(sidebarsPath)) {
      console.warn(`sidebars.json不存在: ${sidebarsPath}`);
      return null;
    }

    try {
      const sidebars = JSON.parse(fs.readFileSync(sidebarsPath, 'utf8'));

      // 如果是数组格式，转换为对象格式
      if (Array.isArray(sidebars)) {
        return { mySidebar: sidebars };
      }

      return sidebars;
    } catch (error) {
      console.error(`解析sidebars.json失败: ${sidebarsPath}`, error);
      return null;
    }
  }

  /**
   * 遍历sidebar项目
   */
  traverseSidebarItems(items, instanceID, slugVersion, sidebarId, preSlug, result) {
    if (!Array.isArray(items)) {
      return;
    }

    for (const item of items) {
      if (item.items) {
        // 递归处理子项目
        this.traverseSidebarItems(item.items, instanceID, slugVersion, sidebarId, preSlug, result);
      }

      if (item.type === 'doc' && item.id) {
        const itemSlug = item.id.split('/');
        const slug = [...preSlug, ...itemSlug];

        result.push({
          params: {
            instanceID,
            slugVersion,
            sidebarId,
            slug
          }
        });
      }
    }
  }

  /**
   * 保存allSlugs到缓存文件
   */
  saveAllSlugs(allSlugs) {
    const middlewareDir = path.join(this.ENTITY_ROOT_DIRECTORY, 'middleware');
    const slugsFilePath = path.join(middlewareDir, 'all-slugs.json');

    if (!fs.existsSync(middlewareDir)) {
      fs.mkdirSync(middlewareDir, { recursive: true });
    }

    fs.writeFileSync(slugsFilePath, JSON.stringify(allSlugs, null, 2), 'utf8');
  }

  /**
   * 清理输出目录
   */
  cleanOutputDirectory() {
    console.log('🧹 清理输出目录...');
    if (fs.existsSync(this.outputDir)) {
      // 只删除MD文件，保留其他文件
      this.removeMarkdownFiles(this.outputDir);
    }
  }

  /**
   * 递归删除MD文件
   */
  removeMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.removeMarkdownFiles(filePath);
        // 如果目录为空，删除目录
        try {
          fs.rmdirSync(filePath);
        } catch (e) {
          // 目录不为空，忽略错误
        }
      } else if (file.endsWith('.md')) {
        fs.unlinkSync(filePath);
      }
    }
  }

  /**
   * 生成单个静态文件
   */
  async generateSingleFile(slugData) {
    const slug = slugData.params.slug;
    const slugPath = slug.join('/');

    try {
      console.log(`📝 处理: ${slugPath}`);

      // 获取原始MDX内容
      const rawContent = await this.getRawMDXContent(slug);
      if (!rawContent) {
        const errorMsg = '无法获取内容';
        const errorDetails = this.getDetailedErrorInfo(slug);
        console.log(`   ⚠️  跳过: ${errorMsg}`);
        this.failedFiles.push({
          slug: slugPath,
          error: errorMsg,
          timestamp: new Date().toISOString(),
          details: errorDetails
        });
        this.errorCount++;
        return;
      }

      // 处理内容
      const processedContent = await this.processContent(rawContent, slug);

      // 创建输出路径
      const outputPath = this.createOutputPath(slug);

      // 写入文件
      fs.writeFileSync(outputPath, processedContent, 'utf8');

      const relativePath = path.relative(process.cwd(), outputPath);
      console.log(`   ✅ 生成: ${relativePath}`);

      // 记录成功文件
      this.successfulFiles.push({
        path: relativePath,
        slug: slugPath,
        timestamp: new Date().toISOString(),
        sourceFile: rawContent.filePath,
        instanceID: slug[0],
        contentSize: processedContent.length,
        originalSize: rawContent.content.length
      });
      this.generatedCount++;

    } catch (error) {
      console.error(`   ❌ 生成失败 (${slugPath}):`, error.message);

      const errorDetails = this.getDetailedErrorInfo(slug, error);

      // 记录失败文件
      this.failedFiles.push({
        slug: slugPath,
        error: error.message,
        timestamp: new Date().toISOString(),
        details: errorDetails,
        errorType: error.name || 'UnknownError',
        stack: error.stack ? error.stack.split('\n')[0] : 'No stack trace'
      });
      this.errorCount++;
    }
  }

  /**
   * 获取原始MDX内容
   */
  async getRawMDXContent(slug) {
    try {
      const docuoConfig = this.getDocuoConfig();
      const { mdxFileID, instanceID, docVersion } = this.getExtractInfoFromSlug(slug, docuoConfig.instances);

      const instance = docuoConfig.instances.find(inst => inst.id === instanceID);
      if (!instance) {
        return null;
      }

      // 构建文件路径
      let rootUrl = path.join(this.ENTITY_ROOT_DIRECTORY, instance.path);
      if (docVersion) {
        rootUrl = path.join(this.ENTITY_ROOT_DIRECTORY, instance.path, 'versioned_docs', `version-${docVersion}`);
      }

      const actualMdxFilePath = this.getActualMdxFilePath(rootUrl, mdxFileID);
      if (!actualMdxFilePath || !fs.existsSync(actualMdxFilePath)) {
        return null;
      }

      return {
        content: fs.readFileSync(actualMdxFilePath, 'utf8'),
        filePath: actualMdxFilePath,
        rootUrl: rootUrl
      };

    } catch (error) {
      console.warn(`获取原始内容失败 (${slug.join('/')}):`, error.message);
      return null;
    }
  }

  /**
   * 查找实际的MDX文件路径
   */
  getActualMdxFilePath(rootPath, mdxFileID) {
    if (!fs.existsSync(rootPath)) {
      return null;
    }

    // 1. 直接路径匹配
    const directPaths = [
      path.join(rootPath, mdxFileID + '.mdx'),
      path.join(rootPath, mdxFileID + '.md')
    ];

    for (const searchPath of directPaths) {
      if (fs.existsSync(searchPath)) {
        return searchPath;
      }
    }

    // 2. 考虑数字前缀的查找
    const numericPrefixResult = this.findFileWithNumericPrefix(rootPath, mdxFileID + '.mdx') ||
                               this.findFileWithNumericPrefix(rootPath, mdxFileID + '.md');
    if (numericPrefixResult) {
      return numericPrefixResult;
    }

    // 3. Fallback转换：连字符转空格，首字母大写
    const fallbackPaths = this.generateFallbackPaths(rootPath, mdxFileID);
    for (const searchPath of fallbackPaths) {
      if (fs.existsSync(searchPath)) {
        return searchPath;
      }
    }

    // 4. Fallback转换 + 数字前缀处理
    for (const fallbackPath of fallbackPaths) {
      const relativeFallbackPath = path.relative(rootPath, fallbackPath);
      const numericPrefixFallbackResult = this.findFileWithNumericPrefix(rootPath, relativeFallbackPath);
      if (numericPrefixFallbackResult) {
        return numericPrefixFallbackResult;
      }
    }

    // 5. 递归搜索
    return this.recursiveSearchMdxFile(rootPath, mdxFileID, 1);
  }

  /**
   * 生成fallback路径变体
   * 注意：这里处理的是完整的路径，包括所有文件夹和文件名
   */
  generateFallbackPaths(rootPath, mdxFileID) {
    const fallbackPaths = [];
    const parts = mdxFileID.split('/');

    // 为每个部分（包括文件夹和文件名）生成所有可能的变体
    const partVariants = parts.map(part => this.generatePartVariants(part));

    // 生成所有可能的组合
    const combinations = this.generateCombinations(partVariants);

    // 为每种组合生成路径
    for (const combination of combinations) {
      const transformedPath = combination.join('/');
      if (transformedPath !== mdxFileID) { // 避免重复原始路径
        fallbackPaths.push(
          path.join(rootPath, transformedPath + '.mdx'),
          path.join(rootPath, transformedPath + '.md')
        );
      }
    }

    return fallbackPaths;
  }

  /**
   * 为单个部分生成所有可能的变体
   */
  generatePartVariants(part) {
    const variants = new Set();

    // 原始形式
    variants.add(part);

    // 首字母大写
    variants.add(part.charAt(0).toUpperCase() + part.slice(1));

    // 连字符转空格
    const withSpaces = part.replace(/-/g, ' ');
    variants.add(withSpaces);

    // 连字符转空格 + 首字母大写
    variants.add(withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1));

    // 连字符转空格 + 每个单词首字母大写
    const titleCase = withSpaces.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    variants.add(titleCase);

    // 部分连字符转空格的变体
    if (part.includes('-')) {
      const hyphenPositions = [];
      for (let i = 0; i < part.length; i++) {
        if (part[i] === '-') {
          hyphenPositions.push(i);
        }
      }

      // 生成部分转换的变体（只转换部分连字符）
      for (let mask = 1; mask < (1 << hyphenPositions.length); mask++) {
        let variant = part;
        for (let i = 0; i < hyphenPositions.length; i++) {
          if (mask & (1 << i)) {
            // 将这个连字符转换为空格
            variant = variant.substring(0, hyphenPositions[i]) + ' ' + variant.substring(hyphenPositions[i] + 1);
            // 更新后续位置
            for (let j = i + 1; j < hyphenPositions.length; j++) {
              if (hyphenPositions[j] > hyphenPositions[i]) {
                // 位置不变，因为字符数没变
              }
            }
          }
        }
        variants.add(variant);

        // 加上首字母大写的版本
        variants.add(variant.charAt(0).toUpperCase() + variant.slice(1));
      }
    }

    return Array.from(variants);
  }

  /**
   * 生成所有可能的组合（限制数量避免过多）
   */
  generateCombinations(partVariants) {
    const allCombinations = [];
    const maxTotalCombinations = 1000; // 临时增加以生成更多组合

    // 使用递归生成所有组合
    const generate = (index, current) => {
      if (allCombinations.length >= maxTotalCombinations) return;

      if (index === partVariants.length) {
        allCombinations.push([...current]);
        return;
      }

      // 为当前部分尝试每个变体
      for (const variant of partVariants[index]) {
        if (allCombinations.length >= maxTotalCombinations) break;
        current.push(variant);
        generate(index + 1, current);
        current.pop();
      }
    };

    generate(0, []);

    // 按照优先级排序
    allCombinations.sort((a, b) => {
      const scoreA = this.getVariantScore(a);
      const scoreB = this.getVariantScore(b);
      return scoreB - scoreA;
    });

    // 返回前100个最高分的组合
    return allCombinations.slice(0, 100);
  }

  /**
   * 计算变体的优先级分数
   */
  getVariantScore(combination) {
    let score = 0;
    for (const part of combination) {
      // 首字母大写加分
      if (part.charAt(0) === part.charAt(0).toUpperCase()) {
        score += 20;
      }

      // 包含空格加分（更常见的文件夹命名）
      if (part.includes(' ')) {
        score += 15;

        // 每个单词首字母大写额外加分
        const words = part.split(' ');
        const allWordsCapitalized = words.every(word =>
          word.length > 0 && word.charAt(0) === word.charAt(0).toUpperCase()
        );
        if (allWordsCapitalized) {
          score += 10;
        }
      }

      // 连字符转空格的变体加分
      if (part.includes(' ') && !part.includes('-')) {
        score += 8;
      }

      // 简单变体（无特殊字符）加分
      if (!part.includes('-') && !part.includes(' ')) {
        score += 3;
      }

      // 部分转换（既有空格又有连字符）的变体
      if (part.includes(' ') && part.includes('-')) {
        score += 12;
      }
    }
    return score;
  }

  /**
   * 递归搜索MDX文件（考虑数字前缀）
   */
  recursiveSearchMdxFile(rootPath, mdxFileID, depth) {
    if (depth > 5) return null; // 限制搜索深度

    try {
      const files = fs.readdirSync(rootPath);

      for (const file of files) {
        const filePath = path.join(rootPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && (file.endsWith('.mdx') || file.endsWith('.md'))) {
          // 检查文件是否匹配
          if (this.isFileMatch(filePath, rootPath, mdxFileID)) {
            return filePath;
          }
        } else if (stat.isDirectory() && depth < 5) {
          const result = this.recursiveSearchMdxFile(filePath, mdxFileID, depth + 1);
          if (result) return result;
        }
      }
    } catch (error) {
      // 忽略权限错误等
    }

    return null;
  }

  /**
   * 检查文件是否匹配（考虑数字前缀）
   */
  isFileMatch(filePath, rootPath, mdxFileID) {
    let relativePath = path.relative(rootPath, filePath);
    relativePath = this.removeMdxSuffix(relativePath);
    relativePath = this.ignoreNumberPrefix(relativePath);

    const normalizedRelativePath = this.convertDocID(relativePath);
    const normalizedMdxFileID = this.convertDocID(mdxFileID);

    return normalizedRelativePath === normalizedMdxFileID;
  }

  /**
   * 增强的文件查找，考虑数字前缀
   */
  findFileWithNumericPrefix(rootPath, targetPath) {
    if (!fs.existsSync(rootPath)) {
      return null;
    }

    // 移除文件扩展名
    const targetPathWithoutExt = targetPath.replace(/\.(mdx?|md)$/, '');
    const pathParts = targetPathWithoutExt.split('/');
    let currentPath = rootPath;

    // 逐级查找，每级都考虑数字前缀
    for (let i = 0; i < pathParts.length; i++) {
      const targetPart = pathParts[i];
      const isLastPart = i === pathParts.length - 1;

      try {
        const items = fs.readdirSync(currentPath);
        let found = false;

        for (const item of items) {
          const itemPath = path.join(currentPath, item);
          const stat = fs.statSync(itemPath);

          // 移除数字前缀后比较
          const cleanItem = this.removeNumericPrefix(item);

          if (isLastPart) {
            // 最后一部分，检查文件
            if (stat.isFile() && (item.endsWith('.mdx') || item.endsWith('.md'))) {
              const cleanItemWithoutExt = this.removeMdxSuffix(cleanItem);
              if (this.normalizeForComparison(cleanItemWithoutExt) === this.normalizeForComparison(targetPart)) {
                return itemPath;
              }
            }
          } else {
            // 中间部分，检查文件夹
            if (stat.isDirectory()) {
              if (this.normalizeForComparison(cleanItem) === this.normalizeForComparison(targetPart)) {
                currentPath = itemPath;
                found = true;
                break;
              }
            }
          }
        }

        if (!found && !isLastPart) {
          return null; // 中间路径未找到
        }

        // 如果是最后一部分但没找到，返回null
        if (isLastPart && !found) {
          return null;
        }

      } catch (error) {
        return null;
      }
    }

    // 如果走到这里说明所有中间路径都找到了，但最后一部分没有返回
    return null;
  }

  /**
   * 移除数字前缀
   */
  removeNumericPrefix(str) {
    return str.replace(this.SEQUENCE_PREFIX_REGEX, '');
  }

  /**
   * 标准化用于比较
   */
  normalizeForComparison(str) {
    return str.toLowerCase().replace(/[-\s]+/g, '-');
  }

  /**
   * 移除MDX后缀
   */
  removeMdxSuffix(str) {
    const suffixIndex = str.lastIndexOf('.');
    if (suffixIndex !== -1) {
      const suffix = str.slice(suffixIndex + 1);
      if (suffix.toLowerCase() === 'mdx' || suffix.toLowerCase() === 'md') {
        return str.slice(0, suffixIndex);
      }
    }
    return str;
  }

  /**
   * 忽略数字前缀
   */
  ignoreNumberPrefix(str) {
    const arr = str.split('/');
    if (arr.length === 1) {
      return str.replace(this.SEQUENCE_PREFIX_REGEX, '');
    } else {
      return arr.map(item => item.replace(this.SEQUENCE_PREFIX_REGEX, '')).join('/');
    }
  }

  /**
   * 转换文档ID
   */
  convertDocID(str) {
    if (process.platform.includes('win')) {
      str = str.replace(/\\/g, '/');
    }
    const result = [];
    const temp = str.split('/');
    temp.forEach(pathPart => {
      result.push(pathPart.toLowerCase().replace(/\s+/g, '-'));
    });
    return result.join('/');
  }

  /**
   * 从slug提取信息
   */
  getExtractInfoFromSlug(slug, instances) {
    // 第一个元素是routeBasePath
    const routeBasePath = slug[0] || '';

    // 查找匹配的instance
    const instance = instances.find(inst => inst.routeBasePath === routeBasePath);

    if (!instance) {
      throw new Error(`找不到匹配的instance: ${routeBasePath}`);
    }

    // 剩余部分是mdxFileID
    const mdxFileID = slug.slice(1).join('/');

    return {
      instanceID: instance.id,
      mdxFileID: mdxFileID,
      routeBasePath: routeBasePath,
      docVersion: null,
      slugVersion: ''
    };
  }

  /**
   * 获取详细的错误信息用于日志
   */
  getDetailedErrorInfo(slug, error = null) {
    const details = {
      step: 'unknown',
      routeBasePath: slug[0] || 'undefined',
      mdxFileID: slug.slice(1).join('/') || 'undefined',
      instanceFound: false,
      instanceID: 'unknown',
      instancePath: 'unknown',
      rootPathExists: false,
      searchedPaths: [],
      fallbackAttempted: false
    };

    try {
      const docuoConfig = this.getDocuoConfig();
      const routeBasePath = slug[0] || '';

      // 检查instance查找
      const instance = docuoConfig.instances.find(inst => inst.routeBasePath === routeBasePath);
      if (!instance) {
        details.step = 'instance_lookup_failed';
        details.availableRoutePaths = docuoConfig.instances.map(inst => inst.routeBasePath).slice(0, 10);
        return details;
      }

      details.instanceFound = true;
      details.instanceID = instance.id;
      details.instancePath = instance.path;
      details.step = 'instance_found';

      // 检查根路径
      const rootPath = path.join(this.ENTITY_ROOT_DIRECTORY, instance.path);
      details.rootPathExists = fs.existsSync(rootPath);

      if (!details.rootPathExists) {
        details.step = 'root_path_not_exists';
        return details;
      }

      // 检查文件查找
      const mdxFileID = slug.slice(1).join('/');
      details.step = 'file_search_failed';

      // 记录尝试的路径
      const directPaths = [
        path.join(rootPath, mdxFileID + '.mdx'),
        path.join(rootPath, mdxFileID + '.md')
      ];

      details.searchedPaths = directPaths.map(p => ({
        path: path.relative(process.cwd(), p),
        exists: fs.existsSync(p)
      }));

      // 检查fallback路径
      const fallbackPaths = this.generateFallbackPaths(rootPath, mdxFileID);
      details.fallbackAttempted = true;
      details.fallbackPaths = fallbackPaths.slice(0, 5).map(p => ({
        path: path.relative(process.cwd(), p),
        exists: fs.existsSync(p)
      }));

      // 如果是其他错误
      if (error) {
        details.step = 'processing_error';
        details.processingError = error.message;
      }

    } catch (detailError) {
      details.step = 'detail_analysis_failed';
      details.detailError = detailError.message;
    }

    return details;
  }

  /**
   * 处理内容：移除frontmatter、处理import、转换链接
   */
  async processContent(rawData, slug) {
    let content = rawData.content;
    const filePath = rawData.filePath;
    const rootUrl = rawData.rootUrl;

    // 1. 移除frontmatter
    content = this.removeFrontmatter(content);

    // 2. 处理import语句
    content = await this.processImports(content, filePath);

    // 3. 转换相对链接
    content = this.transformRelativeLinks(content, filePath, rootUrl, slug);

    return content;
  }

  /**
   * 移除YAML frontmatter
   */
  removeFrontmatter(content) {
    // 匹配文档开头的 --- 到 --- 之间的内容
    return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/m, '');
  }

  /**
   * 创建输出路径
   */
  createOutputPath(slug) {
    const outputPath = path.join(this.outputDir, ...slug) + '.md';
    const outputDir = path.dirname(outputPath);

    // 确保目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    return outputPath;
  }

  /**
   * 处理import语句并内联内容
   */
  async processImports(content, currentFilePath) {
    // 匹配import语句，但排除代码块中的import
    const importRegex = /^import\s+.*?from\s+['"]([^'"]+)['"];?\s*$/gm;
    const codeBlockRegex = /```[\s\S]*?```/g;

    // 先找出所有代码块的位置
    const codeBlocks = [];
    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      codeBlocks.push({
        start: match.index,
        end: match.index + match[0].length
      });
    }

    // 检查import是否在代码块中
    const isInCodeBlock = (index) => {
      return codeBlocks.some(block => index >= block.start && index <= block.end);
    };

    let processedContent = content;
    const imports = [];

    // 收集所有有效的import语句
    while ((match = importRegex.exec(content)) !== null) {
      if (!isInCodeBlock(match.index)) {
        imports.push({
          fullMatch: match[0],
          importPath: match[1],
          index: match.index
        });
      }
    }

    // 按索引倒序处理，避免索引偏移问题
    imports.reverse();

    for (const importInfo of imports) {
      try {
        const resolvedPath = this.resolveImportPath(importInfo.importPath, currentFilePath);

        if (fs.existsSync(resolvedPath) && !this.processedImports.has(resolvedPath)) {
          this.processedImports.add(resolvedPath);

          const importedContent = fs.readFileSync(resolvedPath, 'utf8');
          const cleanImportedContent = this.removeFrontmatter(importedContent);

          // 递归处理导入文件中的import
          const processedImportContent = await this.processImports(cleanImportedContent, resolvedPath);

          // 替换import语句为实际内容
          processedContent = processedContent.replace(importInfo.fullMatch, processedImportContent);

          this.processedImports.delete(resolvedPath);
        } else {
          // 如果文件不存在或已处理过，移除import语句
          processedContent = processedContent.replace(importInfo.fullMatch, '');
        }
      } catch (error) {
        console.warn(`处理import失败: ${importInfo.importPath}`, error.message);
        // 移除无法处理的import语句
        processedContent = processedContent.replace(importInfo.fullMatch, '');
      }
    }

    return processedContent;
  }

  /**
   * 解析import路径
   */
  resolveImportPath(importPath, currentFilePath) {
    if (importPath.startsWith('/')) {
      // 绝对路径：相对于docs目录
      return path.join('docs', importPath.substring(1));
    } else {
      // 相对路径：相对于当前文件
      return path.resolve(path.dirname(currentFilePath), importPath);
    }
  }

  /**
   * 转换相对链接路径
   */
  transformRelativeLinks(content, filePath, rootUrl, slug) {
    // 处理各种链接格式
    const linkPatterns = [
      // Markdown链接: [text](url)
      {
        regex: /\[([^\]]+)\]\(([^)]+)\)/g,
        replacer: (match, text, url) => {
          const transformedUrl = this.transformSingleLink(url, filePath, rootUrl, slug);
          return `[${text}](${transformedUrl})`;
        }
      },
      // HTML a标签: <a href="url">
      {
        regex: /<a([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*?)>/g,
        replacer: (match, before, url, after) => {
          const transformedUrl = this.transformSingleLink(url, filePath, rootUrl, slug);
          return `<a${before}href="${transformedUrl}"${after}>`;
        }
      },
      // Button组件: <Button href="url">
      {
        regex: /<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*?)>/g,
        replacer: (match, tagName, before, url, after) => {
          const transformedUrl = this.transformSingleLink(url, filePath, rootUrl, slug);
          return `<${tagName} ${before}href="${transformedUrl}"${after}>`;
        }
      }
    ];

    let processedContent = content;

    for (const pattern of linkPatterns) {
      processedContent = processedContent.replace(pattern.regex, pattern.replacer);
    }

    return processedContent;
  }

  /**
   * 转换单个链接
   */
  transformSingleLink(url, filePath, rootUrl, slug) {
    // 跳过处理的链接类型
    if (this.shouldSkipLink(url)) {
      return url;
    }

    try {
      // 4步转换过程

      // 1. 移除文件扩展名，保留锚点
      const { cleanUrl, anchor } = this.removeFileExtension(url);

      // 2. 移除数字前缀
      const withoutPrefix = this.removeNumericPrefixes(cleanUrl);

      // 3. 解析为绝对路径
      const absolutePath = this.resolveToAbsolutePath(withoutPrefix, filePath, rootUrl);

      // 4. 标准化格式
      const normalizedPath = this.normalizePathFormat(absolutePath);

      return normalizedPath + (anchor ? `#${anchor}` : '');

    } catch (error) {
      console.warn(`链接转换失败: ${url}`, error.message);
      return url;
    }
  }

  /**
   * 检查是否应该跳过链接处理
   */
  shouldSkipLink(url) {
    return (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('/') ||
      url.startsWith('#') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:') ||
      url.includes('://')
    );
  }

  /**
   * 移除文件扩展名，保留锚点
   */
  removeFileExtension(url) {
    const hashIndex = url.indexOf('#');
    let cleanUrl = url;
    let anchor = '';

    if (hashIndex !== -1) {
      cleanUrl = url.substring(0, hashIndex);
      anchor = url.substring(hashIndex + 1);
    }

    // 移除.mdx或.md扩展名
    cleanUrl = cleanUrl.replace(/\.(mdx?|md)$/, '');

    return { cleanUrl, anchor };
  }

  /**
   * 移除数字前缀
   */
  removeNumericPrefixes(url) {
    return url.replace(/\/\d+-/g, '/').replace(/^\d+-/, '');
  }

  /**
   * 解析为绝对路径
   */
  resolveToAbsolutePath(url, filePath, rootUrl) {
    if (url.startsWith('/')) {
      return url;
    }

    // 相对路径解析
    const currentDir = path.dirname(filePath);
    const resolvedPath = path.resolve(currentDir, url);
    const relativePath = path.relative(path.resolve(rootUrl), resolvedPath);

    return '/' + relativePath.replace(/\\/g, '/');
  }

  /**
   * 标准化路径格式
   */
  normalizePathFormat(pathStr) {
    return pathStr
      .replace(/%20/g, '-')  // URL编码的空格转连字符
      .toLowerCase()         // 转小写
      .replace(/\s+/g, '-')  // 空格转连字符
      .replace(/-+/g, '-')   // 多个连字符合并为一个
      .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
  }

  /**
   * 生成日志文件
   */
  async generateLogFiles() {
    const endTime = new Date();
    const duration = endTime - this.startTime;

    console.log('\n📝 生成日志文件...');

    // 确保logs目录存在
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    // 生成成功文件日志
    await this.generateSuccessfulFilesLog(endTime, duration);

    // 生成失败文件日志
    await this.generateFailedFilesLog(endTime, duration);

    console.log(`   ✅ 日志已保存到 ${this.logsDir}/ 目录`);
  }

  /**
   * 生成成功文件列表日志
   */
  async generateSuccessfulFilesLog(endTime, duration) {
    const logPath = path.join(this.logsDir, 'successful-files.txt');

    let content = '';
    content += '# 静态MD文件生成 - 成功文件列表\n';
    content += '# =====================================\n\n';
    content += `生成时间: ${endTime.toISOString()}\n`;
    content += `开始时间: ${this.startTime.toISOString()}\n`;
    content += `耗时: ${Math.round(duration / 1000)}秒\n`;
    content += `成功文件数: ${this.successfulFiles.length}\n`;
    content += `失败文件数: ${this.failedFiles.length}\n`;
    content += `总文件数: ${this.successfulFiles.length + this.failedFiles.length}\n\n`;
    content += '# 成功生成的文件列表:\n';
    content += '# 格式: [时间戳] 输出文件路径 (slug路径)\n';
    content += '#        源文件: 原始MDX文件路径\n';
    content += '#        实例: instanceID\n';
    content += '#        大小: 原始大小 → 处理后大小\n\n';

    if (this.successfulFiles.length === 0) {
      content += '# 没有成功生成的文件\n';
    } else {
      for (const file of this.successfulFiles) {
        content += `[${file.timestamp}] ${file.path} (${file.slug})\n`;
        if (file.sourceFile) {
          content += `        源文件: ${path.relative(process.cwd(), file.sourceFile)}\n`;
        }
        if (file.instanceID) {
          content += `        实例: ${file.instanceID}\n`;
        }
        if (file.originalSize && file.contentSize) {
          content += `        大小: ${file.originalSize} → ${file.contentSize} 字符\n`;
        }
        content += '\n';
      }
    }

    fs.writeFileSync(logPath, content, 'utf8');
  }

  /**
   * 生成失败文件列表日志
   */
  async generateFailedFilesLog(endTime, duration) {
    const logPath = path.join(this.logsDir, 'failed-files.txt');

    let content = '';
    content += '# 静态MD文件生成 - 失败文件列表\n';
    content += '# =====================================\n\n';
    content += `生成时间: ${endTime.toISOString()}\n`;
    content += `开始时间: ${this.startTime.toISOString()}\n`;
    content += `耗时: ${Math.round(duration / 1000)}秒\n`;
    content += `成功文件数: ${this.successfulFiles.length}\n`;
    content += `失败文件数: ${this.failedFiles.length}\n`;
    content += `总文件数: ${this.successfulFiles.length + this.failedFiles.length}\n\n`;
    content += '# 生成失败的文件列表:\n';
    content += '# 格式: [时间戳] slug路径 - 错误类型: 错误原因\n';
    content += '#        失败步骤: 具体失败的处理步骤\n';
    content += '#        详细信息: 调试信息\n\n';

    if (this.failedFiles.length === 0) {
      content += '# 没有生成失败的文件\n';
    } else {
      for (const file of this.failedFiles) {
        const errorType = file.errorType || 'UnknownError';
        content += `[${file.timestamp}] ${file.slug} - ${errorType}: ${file.error}\n`;

        if (file.details) {
          const details = file.details;
          content += `        失败步骤: ${this.getStepDescription(details.step)}\n`;

          if (details.step === 'instance_lookup_failed') {
            content += `        路由路径: ${details.routeBasePath}\n`;
            if (details.availableRoutePaths) {
              content += `        可用路径: ${details.availableRoutePaths.join(', ')}\n`;
            }
          } else if (details.step === 'root_path_not_exists') {
            content += `        实例ID: ${details.instanceID}\n`;
            content += `        实例路径: ${details.instancePath}\n`;
            content += `        根路径不存在: docs/${details.instancePath}\n`;
          } else if (details.step === 'file_search_failed') {
            content += `        实例ID: ${details.instanceID}\n`;
            content += `        MDX文件ID: ${details.mdxFileID}\n`;
            content += `        尝试的直接路径:\n`;
            if (details.searchedPaths) {
              details.searchedPaths.forEach(p => {
                content += `          ${p.exists ? '✓' : '✗'} ${p.path}\n`;
              });
            }
            if (details.fallbackAttempted && details.fallbackPaths) {
              content += `        尝试的Fallback路径:\n`;
              details.fallbackPaths.forEach(p => {
                content += `          ${p.exists ? '✓' : '✗'} ${p.path}\n`;
              });
            }
          } else if (details.step === 'processing_error') {
            content += `        实例ID: ${details.instanceID}\n`;
            content += `        处理错误: ${details.processingError}\n`;
          }
        }

        if (file.stack) {
          content += `        错误位置: ${file.stack}\n`;
        }

        content += '\n';
      }
    }

    fs.writeFileSync(logPath, content, 'utf8');
  }

  /**
   * 获取步骤描述
   */
  getStepDescription(step) {
    const descriptions = {
      'instance_lookup_failed': 'Instance查找失败 - 找不到匹配的routeBasePath',
      'root_path_not_exists': '根路径不存在 - Instance路径在文件系统中不存在',
      'file_search_failed': '文件查找失败 - 直接匹配和Fallback转换都未找到文件',
      'processing_error': '内容处理错误 - 文件读取或内容转换过程中出错',
      'detail_analysis_failed': '详细分析失败 - 无法获取错误详情',
      'unknown': '未知错误'
    };

    return descriptions[step] || `未知步骤: ${step}`;
  }
}

// 主执行逻辑
if (require.main === module) {
  const generator = new StaticMDGenerator();
  generator.generateAll().catch(error => {
    console.error('脚本执行失败:', error);
    process.exit(1);
  });
}

module.exports = StaticMDGenerator;
