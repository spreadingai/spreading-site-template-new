import classNames from "classnames";
import styles from "./mobile.module.scss";
import IconArrowRight from "@/assets/icons/iconArrowDown.svg";
import DocuoAnchor from "./index";
import { createPortal } from "react-dom";
import { useMediaQuery } from "usehooks-ts";

import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useMemo,
} from "react";
import AnchorNode from "./Anchor";

interface AnchorNodeProps {
  tocFormatData: AnchorNode[];
}

const AnchorNodeMobile: FC<AnchorNodeProps> = ({ tocFormatData }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [openToc, setOpenToc] = React.useState(false);

  const isShowMobile = useMediaQuery(`(max-width: 1024px)`);
  const iconStyles = useMemo(() => {
    return openToc
      ? {
          fontSize: 24,
          color: "#8f939d",
          transition: "transform 0.3s",
          transform: "rotate(-180deg)",
        }
      : {
          fontSize: 24,
          color: "#8f939d",
          transition: "transform 0.3s",
        };
  }, [openToc]);
  useEffect(() => {
    setIsMobile(isShowMobile);
  }, [isShowMobile]);

  return (
    <div
      onClick={() => {
        setOpenToc((value) => !value);
      }}
      style={{ paddingLeft: 14, paddingRight: 12 }}
      className={`w-full border bg-white border-gray-200/80 rounded-md toc flex items-center justify-between  h-10 ${styles["toc-btn"]}`}
    >
      <span className={styles["toc-font"]}>On this page</span>
      <IconArrowRight style={iconStyles} />
      {openToc &&
        createPortal(
          <div>
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
