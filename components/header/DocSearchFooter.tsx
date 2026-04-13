import React from "react";
import Link from "next/link";
import useLanguage from "@/components/hooks/useLanguage";
import { defaultLanguage } from "../context/languageContext";

interface DocSearchFooterProps {
  state: any;
}

/**
 * DocSearch 结果列表底部组件（传给 resultsFooterComponent）。
 *
 * 显示条件：有命中结果（nbHits > 0）
 * 内容：跳转到全站搜索页并带上当前查询词
 * 文案：根据当前语言切换中英文
 */
const DocSearchFooter = ({ state }: DocSearchFooterProps) => {
  const { currentLanguage } = useLanguage();
  const { query, context } = state;
  const nbHits = context?.nbHits as number | undefined;

  if (!nbHits) return null;

  return (
    <Link href={`/search?k=${query}`}>
      {currentLanguage === defaultLanguage
        ? `See all ${nbHits} results`
        : `查看全部 ${nbHits} 条结果`}
    </Link>
  );
};

export default DocSearchFooter;
