// 将字符串转换为数字数组，例如：1-3,5,7-9 => [1,2,3,5,7,8,9]
export function parseRange(rangeString: string): number[] {
  const ranges = rangeString.split(",");
  const result: number[] = [];
  for (const range of ranges) {
    const [start, end] = range.split("-");
    if (end) {
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        result.push(i);
      }
    } else {
      result.push(parseInt(start));
    }
  }
  return result;
}
