"use client";

import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { LastUpdatedProps } from "@/types/mdx";

interface LastUpdatedPropsInternal extends LastUpdatedProps {}

const CalendarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.calendarIcon}
  >
    <path d="M8 2v4"/>
    <path d="M16 2v4"/>
    <rect width="18" height="18" x="3" y="4" rx="2"/>
    <path d="M3 10h18"/>
    <path d="M8 14h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 18h.01"/>
    <path d="M12 18h.01"/>
    <path d="M16 18h.01"/>
  </svg>
);

/**
 * LastUpdated 组件
 *
 * 功能：
 * 1. 显示最后更新日期
 * 2. 实现单例模式 - 页面上只显示一个 LastUpdated 组件
 * 3. 如果页面上已有 LastUpdated 组件，直接更新其日期值
 * 4. 正常渲染当前组件（不渲染的情况通过样式处理）
 *
 * 实现原理：
 * - 使用 data-last-updated-instance 属性标记已存在的实例
 * - 通过 DOM 查询检测是否已有实例
 * - 如果已有实例，直接更新其日期文本内容
 */
export const LastUpdated: React.FC<LastUpdatedPropsInternal> = ({ date }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!date) return;

    // 检查是否在浏览器环境（客户端）
    if (typeof document === "undefined") return;

    // 查询页面上是否已有 LastUpdated 组件实例
    const existingInstance = document.querySelector(
      '[data-last-updated-instance="true"]'
    );

    if (existingInstance && existingInstance !== containerRef.current) {
      // 页面上已有其他 LastUpdated 实例
      // 直接更新已存在组件的日期值
      const dateSpan = existingInstance.querySelector(
        `.${styles.dateText}`
      );
      if (dateSpan) {
        dateSpan.textContent = date;
      }
      return;
    }

    // 这是第一个实例，标记为主实例
    const container = containerRef.current;
    if (container) {
      container.setAttribute("data-last-updated-instance", "true");
    }
  }, [date]);

  if (!date) return null;

  return (
    <div ref={containerRef} className={styles.lastUpdated}>
      <CalendarIcon />
      <span className={styles.dateText}>{date}</span>
    </div>
  );
};
