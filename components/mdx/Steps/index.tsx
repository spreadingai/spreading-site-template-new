import React, { useEffect } from "react";
import styles from "./index.module.scss";

interface StepsProps {
  children?: React.ReactNode;
  titleSize?: "p" | "h2" | "h3" | "h4" | "h5";
}

export const Steps = (props: StepsProps) => {
  const { children, titleSize } = props;

  const finalTitleSize = (titleSize || "p") as StepsProps["titleSize"];

  // 当Steps组件挂载或titleSize变化时，触发TOC更新
  useEffect(() => {
    // 只有当titleSize不是"p"时才需要触发TOC更新（因为只有heading才会出现在TOC中）
    if (finalTitleSize !== "p") {
      // 延迟触发，确保DOM已经更新
      const timer = setTimeout(() => {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
          document.dispatchEvent(new CustomEvent('toc-update'));
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    return () => {}; // 空的清理函数
  }, [finalTitleSize, children]);

  return (
    <div className={styles.stepsWrapper}>
      {React.Children.map(
        (children as any)?.filter?.((child: any) => {
          return (
            !child?.props?.style ||
            !child.props.style.display ||
            (child.props.style &&
              child.props.style.display &&
              child.props.style.display !== "none")
          );
        }),
        (child: any, index: number) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as any, {
              defaultNumber: index + 1,
              defaultTitleSize: finalTitleSize,
            } as any);
          }
          return child;
        },
      )}
    </div>
  );
};
