import styles from "./mobile.module.scss";
import IconArrowRight from "@/assets/icons/iconArrowDown.svg";
import DocuoAnchor from "./index";
import { createPortal } from "react-dom";
import { useMediaQuery } from "usehooks-ts";
import { copywriting } from "@/components/constant/language";

import React, { FC, useEffect, useMemo } from "react";
import AnchorNode from "./Anchor";
import useLanguage from "@/components/hooks/useLanguage";

interface AnchorNodeProps {
  tocFormatData: AnchorNode[];
}

const AnchorNodeMobile: FC<AnchorNodeProps> = ({ tocFormatData }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [openToc, setOpenToc] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const { currentLanguage } = useLanguage();

  const isShowMobile = useMediaQuery(`(max-width: 1024px)`);
  const iconStyles = useMemo(() => {
    return openToc
      ? {
          fontSize: 24,
          transition: "transform 0.3s",
          transform: "rotate(-180deg)",
        }
      : {
          fontSize: 24,
          transition: "transform 0.3s",
        };
  }, [openToc]);
  useEffect(() => {
    setIsMobile(isShowMobile);
    setLoaded(true);
  }, [isShowMobile]);

  return (
    <div
      onClick={() => {
        setOpenToc((value) => !value);
      }}
      style={{ paddingLeft: 14, paddingRight: 12 }}
      className={`anchor-mobile-container w-full rounded-md toc flex items-center justify-between  h-10 ${styles["toc-btn"]}`}
    >
      <span className={styles["toc-font"]}>
        {copywriting[currentLanguage]
          ? copywriting[currentLanguage].toc.title
          : copywriting.en.toc.title}
      </span>
      <IconArrowRight style={iconStyles} className={styles["toc-icon"]} />
      {loaded &&
        createPortal(
          <div style={{ display: openToc ? "block" : "none" }}>
            <div className={styles["mobile-toc-mask"]}></div>
            <div className={styles["mobile-toc-container"]}>
              <DocuoAnchor data={tocFormatData} offsetTop={68} />
            </div>
          </div>,
          isMobile ? document.body : document.querySelector(".middle__show"),
          "mobile-menu-container"
        )}
    </div>
  );
};

export default AnchorNodeMobile;
