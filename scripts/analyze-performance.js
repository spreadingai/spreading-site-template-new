#!/usr/bin/env node

/**
 * 性能分析脚本
 * 用于分析项目的编译性能和模块依赖
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 开始性能分析...\n');

// 分析package.json中的依赖
function analyzeDependencies() {
  console.log('📦 分析依赖包...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const deps = Object.keys(packageJson.dependencies || {});
  const devDeps = Object.keys(packageJson.devDependencies || {});
  
  console.log(`   生产依赖: ${deps.length} 个`);
  console.log(`   开发依赖: ${devDeps.length} 个`);
  
  // 找出可能的重型依赖
  const heavyDeps = deps.filter(dep => 
    dep.includes('ant') || 
    dep.includes('react') || 
    dep.includes('mdx') || 
    dep.includes('markdown') ||
    dep.includes('docusaurus')
  );
  
  console.log(`   重型依赖: ${heavyDeps.length} 个`);
  heavyDeps.forEach(dep => console.log(`     - ${dep}`));
  console.log('');
}

// 分析docs文件夹
function analyzeDocsFolder() {
  console.log('📁 分析docs文件夹...');
  
  if (!fs.existsSync('docs')) {
    console.log('   docs文件夹不存在');
    return;
  }
  
  let fileCount = 0;
  let totalSize = 0;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else {
        fileCount++;
        totalSize += stat.size;
      }
    });
  }
  
  walkDir('docs');
  
  console.log(`   文件数量: ${fileCount} 个`);
  console.log(`   总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('');
}

// 分析.next缓存
function analyzeNextCache() {
  console.log('🗂️  分析Next.js缓存...');
  
  const nextDir = '.next';
  if (!fs.existsSync(nextDir)) {
    console.log('   .next文件夹不存在');
    return;
  }
  
  const cacheDir = path.join(nextDir, 'cache');
  if (fs.existsSync(cacheDir)) {
    let cacheSize = 0;
    function getCacheSize(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          getCacheSize(filePath);
        } else {
          cacheSize += stat.size;
        }
      });
    }
    getCacheSize(cacheDir);
    console.log(`   缓存大小: ${(cacheSize / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log('');
}

// 提供优化建议
function provideOptimizationTips() {
  console.log('💡 优化建议:');
  console.log('   1. 使用 npm run dev:fast 进行快速开发');
  console.log('   2. 定期清理 .next/cache 缓存');
  console.log('   3. 考虑使用动态导入减少初始包大小');
  console.log('   4. 检查是否有不必要的依赖包');
  console.log('   5. 使用 ANALYZE=true npm run build 分析包大小');
  console.log('');
}

// 执行分析
analyzeDependencies();
analyzeDocsFolder();
analyzeNextCache();
provideOptimizationTips();

console.log('✅ 性能分析完成！');
