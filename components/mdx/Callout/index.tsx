import React from "react";
import styles from "./index.module.scss";

type CalloutType = "check" | "tips" | "note" | "warning" | "failure";

interface CalloutProps {
  type: CalloutType;
  title: string;
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export const Callout = (props: CalloutProps) => {
  const { type, title, children, style, className } = props;
  return (
    <div
      className={`${styles.wrapper} ${styles[type]} ${className || ""}`}
      style={style || null}
    >
      <i className={styles.callout_icon} />
      <div className={styles.main}>
        {!!title && <div className={styles.header}>{title}</div>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

Callout.Check = (props) => <Callout type="check" {...props} />;
Callout.Tip = (props) => <Callout type="tips" {...props} />;
Callout.Note = (props) => <Callout type="note" {...props} />;
Callout.Warning = (props) => <Callout type="warning" {...props} />;
Callout.Error = (props) => <Callout type="failure" {...props} />;
