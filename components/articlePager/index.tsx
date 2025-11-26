import React, { FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import IconNext from "@/assets/icons/icon_arrow_right.svg";
import IconLeft from "@/assets/icons/icon_arrow_left.svg";
import Link from "next/link";
import { copywriting } from "@/components/constant/language";
import useLanguage from "@/components/hooks/useLanguage";

export interface PaginationData {
  description?: string;
  href: string;
}
interface ArticlePagerProps {
  prev?: PaginationData;
  next?: PaginationData;
}
const ArticlePager: FC<ArticlePagerProps> = ({ prev, next }) => {
  const { currentLanguage } = useLanguage();
  const articlePager = copywriting[currentLanguage].articlePager;

  return (
    <div className={styles["article-pager-container"]}>
      {prev.href ? (
        <Link
          href={prev.href}
          className={classNames(
            styles["article-pager"],
            styles[`article-pager-prev`]
          )}
        >
          <IconLeft className={styles[`article-pager-icon-prev`]} />
          <p className={styles["article-pager-title"]}>{articlePager.previous}</p>
          <p className={styles["article-pager-description"]}>
            {prev.description}
          </p>
        </Link>
      ) : null}

      <div className={styles["pager-separator"]}></div>
      {next.href ? (
        <Link
          href={next.href}
          className={classNames(
            styles["article-pager"],
            styles[`article-pager-next`]
          )}
        >
          <IconNext className={styles[`article-pager-icon-next`]} />
          <p
            className={classNames(
              styles["article-pager-title"],
              styles["article-pager-title-next"]
            )}
          >
            {articlePager.next}
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
      ) : null}
    </div>
  );
};

export default ArticlePager;
