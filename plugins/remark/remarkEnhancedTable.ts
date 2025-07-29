import { visit } from "unist-util-visit";

/**
 * remark 插件：处理表格增强语法
 * 支持：
 * 1. 列宽控制：标题-30% 或 标题-120px
 * 2. 水平对齐：标题-l（左对齐）、标题-c（居中）、标题-r（右对齐）
 * 3. 单元格合并：
 *    - !mu 或 !m：向上合并（与上一行合并）
 *    - !md：向下合并（与下一行合并）
 *    - !ml：向左合并（与左侧单元格合并）
 *    - !mr：向右合并（与右侧单元格合并）
 * 注意：宽度和对齐可以组合使用，如：标题-30%-c 或 标题-l-120px
 */
export function remarkEnhancedTable() {
  return function transformer(tree: any) {
    visit(tree, 'table', (node: any) => {
      processMarkdownTable(node);
    });
  };
}

function processMarkdownTable(tableNode: any) {
  try {
    if (!tableNode?.children || tableNode.children.length === 0) return;

    // 查找表头行（第一行）
    const headerRow = tableNode.children[0];
    if (!headerRow || headerRow.type !== 'tableRow' || !headerRow.children) return;

    // 提取列宽和对齐信息
    const columnWidths: string[] = [];
    const columnAlignments: string[] = [];
    let hasWidthConfig = false;
    let hasAlignConfig = false;

    headerRow.children.forEach((cell: any, index: number) => {
      if (cell.type === 'tableCell' && cell.children && cell.children[0]) {
        const textNode = cell.children[0];
        if (textNode.type === 'text') {
          const text = textNode.value;
          const result = parseHeaderText(text);

          if (result.width) {
            columnWidths[index] = result.width;
            hasWidthConfig = true;
          }

          if (result.alignment) {
            columnAlignments[index] = result.alignment;
            hasAlignConfig = true;
          }

          // 更新文本，移除宽度和对齐信息
          textNode.value = result.cleanText;
        }
      }
    });

    // 如果有宽度或对齐配置，添加表格属性
    if (hasWidthConfig || hasAlignConfig) {
      addTableAttributes(tableNode, columnWidths, columnAlignments);
    }

    // 先给所有表体单元格添加对齐样式（在合并处理之前）
    if (hasAlignConfig) {
      addAlignmentToAllTableCells(tableNode, columnAlignments);
    }

    // 处理单元格合并
    processAdvancedCellMerging(tableNode);
  } catch (error) {
    // 静默处理错误
  }
}

function parseHeaderText(text: string): { cleanText: string; width?: string; alignment?: string } {
  try {
    let cleanText = text;
    let width: string | undefined;
    let alignment: string | undefined;

    // 匹配宽度：数字开头的模式，如 -30% 或 -120px
    const widthMatch = cleanText.match(/-(\d+(?:\.\d+)?)(px|%)/);
    if (widthMatch) {
      width = widthMatch[1] + widthMatch[2];
      cleanText = cleanText.replace(widthMatch[0], '');
    }

    // 匹配对齐：字母 l、c、r
    const alignMatch = cleanText.match(/-(l|c|r)(?![a-z])/);
    if (alignMatch) {
      const alignChar = alignMatch[1];
      alignment = alignChar === 'l' ? 'left' : alignChar === 'c' ? 'center' : 'right';
      cleanText = cleanText.replace(alignMatch[0], '');
    }

    return {
      cleanText: cleanText.trim(),
      width,
      alignment
    };
  } catch (error) {
    return { cleanText: text };
  }
}

function addTableAttributes(tableNode: any, columnWidths: string[], columnAlignments: string[]) {
  try {
    // 给表格添加样式属性
    if (!tableNode.data) tableNode.data = {};
    if (!tableNode.data.hProperties) tableNode.data.hProperties = {};

    tableNode.data.hProperties.style = 'table-layout: fixed; width: 100%;';

    // 给表头单元格添加宽度和对齐属性
    if (tableNode.children[0] && tableNode.children[0].children) {
      tableNode.children[0].children.forEach((cell: any, index: number) => {
        const width = columnWidths[index];
        const alignment = columnAlignments[index];

        if (width || alignment) {
          if (!cell.data) cell.data = {};
          if (!cell.data.hProperties) cell.data.hProperties = {};

          let style = '';
          if (width) {
            style += `width: ${width};`;
          }
          if (alignment) {
            style += ` text-align: ${alignment};`;
          }

          cell.data.hProperties.style = style;
        }
      });
    }
  } catch (error) {
    // 静默处理错误
  }
}

function processAdvancedCellMerging(tableNode: any) {
  try {
    if (!tableNode?.children || tableNode.children.length <= 1) return;

    const rows = tableNode.children;

    // 处理向上合并 (!mu, !m)
    processUpwardMerging(rows);

    // 处理向下合并 (!md)
    processDownwardMerging(rows);

    // 处理向左合并 (!ml)
    processLeftwardMerging(rows);

    // 处理向右合并 (!mr)
    processRightwardMerging(rows);

    // 最后删除所有合并标记单元格
    removeAllMergeCells(rows);
  } catch (error) {
    // 静默处理错误
  }
}

function addAlignmentToAllTableCells(tableNode: any, columnAlignments: string[]) {
  try {
    // 给表体的所有单元格添加对齐样式（从第二行开始，跳过表头）
    for (let rowIndex = 1; rowIndex < tableNode.children.length; rowIndex++) {
      const row = tableNode.children[rowIndex];
      if (!row?.children) continue;

      row.children.forEach((cell: any, colIndex: number) => {
        const alignment = columnAlignments[colIndex];
        if (alignment) {
          if (!cell.data) cell.data = {};
          if (!cell.data.hProperties) cell.data.hProperties = {};

          const existingStyle = cell.data.hProperties.style || '';
          const alignmentStyle = `text-align: ${alignment}`;
          cell.data.hProperties.style = existingStyle ?
            `${existingStyle}; ${alignmentStyle}` : alignmentStyle;
        }
      });
    }
  } catch (error) {
    // 静默处理错误
  }
}

function getColumnCount(row: any): number {
  if (!row?.children) return 0;
  return row.children.length;
}

// 删除旧的合并函数，已被新的多方向合并函数替代

function getCellText(cell: any): string {
  if (!cell?.children || !cell.children[0]) return '';
  const textNode = cell.children[0];
  return textNode.type === 'text' ? (textNode.value || '').trim() : '';
}

function getMergeType(cellText: string): string | null {
  const text = cellText.toLowerCase();
  if (text === '!mu' || text === '!m') return 'up';
  if (text === '!md') return 'down';
  if (text === '!ml') return 'left';
  if (text === '!mr') return 'right';
  // 兼容旧的 !merge 语法，默认为向上合并
  if (text === '!merge') return 'up';
  return null;
}

function processUpwardMerging(rows: any[]) {
  try {
    const columnCount = getColumnCount(rows[0]);

    for (let colIndex = 0; colIndex < columnCount; colIndex++) {
      let mergeStart = -1;
      let mergeCount = 0;

      for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        if (!row?.children || colIndex >= row.children.length) continue;

        const cell = row.children[colIndex];
        const cellText = getCellText(cell);
        const mergeType = getMergeType(cellText);

        if (mergeType === 'up') {
          if (mergeStart === -1) {
            mergeStart = rowIndex - 1;
            mergeCount = 2;
          } else {
            mergeCount++;
          }
        } else {
          if (mergeStart !== -1 && mergeCount > 1) {
            applyRowSpan(rows, mergeStart, colIndex, mergeCount);
          }
          mergeStart = -1;
          mergeCount = 0;
        }
      }

      if (mergeStart !== -1 && mergeCount > 1) {
        applyRowSpan(rows, mergeStart, colIndex, mergeCount);
      }
    }
  } catch (error) {
    // 静默处理错误
  }
}

function processDownwardMerging(rows: any[]) {
  try {
    const columnCount = getColumnCount(rows[0]);

    for (let colIndex = 0; colIndex < columnCount; colIndex++) {
      for (let rowIndex = 1; rowIndex < rows.length - 1; rowIndex++) {
        const row = rows[rowIndex];
        if (!row?.children || colIndex >= row.children.length) continue;

        const cell = row.children[colIndex];
        const cellText = getCellText(cell);
        const mergeType = getMergeType(cellText);

        if (mergeType === 'down') {
          // 向下合并：当前单元格与下面的单元格合并
          let mergeCount = 1;
          for (let nextRowIndex = rowIndex + 1; nextRowIndex < rows.length; nextRowIndex++) {
            const nextRow = rows[nextRowIndex];
            if (!nextRow?.children || colIndex >= nextRow.children.length) break;

            const nextCell = nextRow.children[colIndex];
            const nextCellText = getCellText(nextCell);
            const nextMergeType = getMergeType(nextCellText);

            if (nextMergeType === 'down' || nextMergeType === 'up') {
              mergeCount++;
            } else {
              break;
            }
          }

          if (mergeCount > 1) {
            applyRowSpan(rows, rowIndex, colIndex, mergeCount);
          }
        }
      }
    }
  } catch (error) {
    // 静默处理错误
  }
}

function processLeftwardMerging(rows: any[]) {
  try {
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      if (!row?.children) continue;

      for (let colIndex = 1; colIndex < row.children.length; colIndex++) {
        const cell = row.children[colIndex];
        const cellText = getCellText(cell);
        const mergeType = getMergeType(cellText);

        if (mergeType === 'left') {
          // 向左合并：找到左侧的起始单元格
          let mergeCount = 1;
          for (let prevColIndex = colIndex - 1; prevColIndex >= 0; prevColIndex--) {
            const prevCell = row.children[prevColIndex];
            const prevCellText = getCellText(prevCell);
            const prevMergeType = getMergeType(prevCellText);

            if (prevMergeType === 'left' || prevMergeType === 'right') {
              mergeCount++;
            } else {
              applyColSpan(row, prevColIndex, mergeCount + 1);
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    // 静默处理错误
  }
}

function processRightwardMerging(rows: any[]) {
  try {
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      if (!row?.children) continue;

      for (let colIndex = 0; colIndex < row.children.length - 1; colIndex++) {
        const cell = row.children[colIndex];
        const cellText = getCellText(cell);
        const mergeType = getMergeType(cellText);

        if (mergeType === 'right') {
          // 向右合并：当前单元格与右侧单元格合并
          let mergeCount = 1;
          for (let nextColIndex = colIndex + 1; nextColIndex < row.children.length; nextColIndex++) {
            const nextCell = row.children[nextColIndex];
            const nextCellText = getCellText(nextCell);
            const nextMergeType = getMergeType(nextCellText);

            if (nextMergeType === 'right' || nextMergeType === 'left') {
              mergeCount++;
            } else {
              break;
            }
          }

          if (mergeCount > 1) {
            applyColSpan(row, colIndex, mergeCount);
          }
        }
      }
    }
  } catch (error) {
    // 静默处理错误
  }
}

function applyRowSpan(rows: any[], startRowIndex: number, colIndex: number, spanCount: number) {
  try {
    const startRow = rows[startRowIndex];
    if (!startRow?.children || colIndex >= startRow.children.length) return;

    const startCell = startRow.children[colIndex];
    if (!startCell.data) startCell.data = {};
    if (!startCell.data.hProperties) startCell.data.hProperties = {};

    startCell.data.hProperties.rowSpan = spanCount;
  } catch (error) {
    // 静默处理错误
  }
}

function applyColSpan(row: any, startColIndex: number, spanCount: number) {
  try {
    if (!row?.children || startColIndex >= row.children.length) return;

    const startCell = row.children[startColIndex];
    if (!startCell.data) startCell.data = {};
    if (!startCell.data.hProperties) startCell.data.hProperties = {};

    startCell.data.hProperties.colSpan = spanCount;
  } catch (error) {
    // 静默处理错误
  }
}

function removeAllMergeCells(rows: any[]) {
  try {
    // 从第二行开始（跳过表头），删除所有合并标记单元格
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      if (!row?.children) continue;

      // 从后往前删除，避免索引变化
      for (let colIndex = row.children.length - 1; colIndex >= 0; colIndex--) {
        const cell = row.children[colIndex];
        const cellText = getCellText(cell);
        const mergeType = getMergeType(cellText);

        if (mergeType) {
          row.children.splice(colIndex, 1);
        }
      }
    }
  } catch (error) {
    // 静默处理错误
  }
}
