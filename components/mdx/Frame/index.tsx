import React from "react";
import styles from "./index.module.scss";
import { IconClose } from "../Icon/IconClose";

interface FrameProps {
  children?: React.ReactNode;
  caption?: string;
  width?: string;
  height?: string;
  style?: any;
  className?: string;
}

function formatWH(val) {
  if (val === "auto" || val.includes("%")) return val;
  const pxVal = parseInt(val);
  if (typeof pxVal === "number" && pxVal > 0) {
    return `${pxVal}px`;
  }
  return "auto";
}

export const Frame = (props: FrameProps) => {
  const {
    children,
    width = "auto",
    height = "auto",
    caption,
    style,
    className,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleShowModal = (e) => {
    if (e.target?.tagName === "IMG") {
      setOpen(() => true);
    }
  };

  const handleCloseModal = () => {
    setOpen(() => false);
  };

  return (
    <>
      <div
        className={`${styles.image_wrapper} ${className || ""}`}
        style={{
          // @ts-ignore
          "--imgWidth": formatWH(width),
          "--imgHeight": formatWH(height),
          // @ts-ignore
          ...(style || {}),
        }}
        onClick={handleShowModal}
      >
        {children}
        {!!caption && <p className={styles.image_desc}>{caption}</p>}
      </div>
      {/* 弹框 */}
      {open && (
        <div className={styles.imageModal} onClick={handleCloseModal}>
          <div className={styles.imageModalClose}>
            <IconClose style={{ color: "#FFF" }} />
          </div>
          <div className={styles.imageModalContents}>{children}</div>
        </div>
      )}
    </>
  );
};
