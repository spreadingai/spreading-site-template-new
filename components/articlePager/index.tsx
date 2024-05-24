import React, { FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import IconNext from "@/assets/icons/iconNext.svg";
import Link from "next/link";

export interface PaginationData {
  title: string;
  description?: string;
  href: string;
}
interface ArticlePagerProps {
  prev?: PaginationData;
  next?: PaginationData;
}
const ArticlePager: FC<ArticlePagerProps> = ({ prev, next }) => {
  return (
    <div className={styles["article-pager-container"]}>
      <Link
        href={prev.href}
        className={classNames(
          styles["article-pager"],
          styles[`article-pager-prev`]
        )}
      >
        <p className={styles["article-pager-icon"]}>
          <IconNext className={styles[`article-pager-icon-prev`]} />
        </p>
        <p className={styles["article-pager-title"]}>{prev.title}</p>
        <p className={styles["article-pager-description"]}>
          {prev.description}
        </p>
      </Link>
      <Link
        href={next.href}
        className={classNames(
          styles["article-pager"],
          styles[`article-pager-next`]
        )}
      >
        <p className={styles["article-pager-icon"]}>
          <IconNext className={styles[`article-pager-icon-next`]} />
        </p>
        <p
          className={classNames(
            styles["article-pager-title"],
            styles["article-pager-title-next"]
          )}
        >
          {next.title}
        </p>
        <p
          className={classNames(
            styles["article-pager-description"],
            styles["article-pager-description-next"]
          )}
        >
          {next.description}
        </p>
      </Link>
    </div>
  );
};

export default ArticlePager;
