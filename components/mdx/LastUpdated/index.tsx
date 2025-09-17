import React from "react";
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

export const LastUpdated: React.FC<LastUpdatedPropsInternal> = ({ date }) => {
  if (!date) return null;

  return (
    <div className={styles.lastUpdated}>
      <CalendarIcon />
      <span className={styles.dateText}>{date}</span>
    </div>
  );
};
