import React from "react";
import styles from "./index.module.scss";

// _self - Default. Opens the document in the same window/tab as it was clicked
// _blank - Opens the document in a new window or tab
// _parent - Opens the document in the parent frame
// _top - Opens the document in the full body of the window

enum Target {
  Self = "_self",
  Blank = "_blank",
  Parent = "_parent",
  Top = "_top",
}

enum ColorTheme {
  "DarkGray" = "darkGray",
  "NavyBlue" = "navyBlue",
  "Orange" = "orange",
  "Tangerine" = "tangerine",
  "Red" = "red",
  "Magenta" = "magenta",
  "Purple" = "purple",
  "LightBlue" = "lightBlue",
  "Turquoise" = "turquoise",
  "Green" = "green",
  "Lime" = "lime",
  "Gray" = "gray",
  "White" = "white",
}

interface Props {
  children?: React.ReactNode;
  href?: string;
  "primary-color"?: ColorTheme | string;
  target?: Target | string;
  style?: any;
  className?: string;
  icon?: string | React.ReactNode;
  circular?: boolean;
  tip?: string | React.ReactNode;
}

// const colorTheme = {
//   DarkGray: {
//     name: "DarkGray",
//     background: "#171717",
//     color: "#FFFFFF",
//   },
//   NavyBlue: {
//     name: "NavyBlue",
//     background: "#587FFF",
//     color: "#FFFFFF",
//   },
//   Orange: {
//     name: "Orange",
//     background: "#FF9D00",
//     color: "#FFFFFF",
//   },
//   Tangerine: {
//     name: "Tangerine",
//     background: "#FF4400",
//     color: "#FFFFFF",
//   },
//   Red: {
//     name: "Red",
//     background: "#FF0014",
//     color: "#FFFFFF",
//   },
//   Magenta: {
//     name: "Magenta",
//     background: "#FF00FF",
//     color: "#FFFFFF",
//   },
//   Purple: {
//     name: "Purple",
//     background: "#8163F6",
//     color: "#FFFFFF",
//   },
//   LightBlue: {
//     name: "LightBlue",
//     background: "#00B5FF",
//     color: "#FFFFFF",
//   },
//   Turquoise: {
//     name: "Turquoise",
//     background: "#00CAE4",
//     color: "#FFFFFF",
//   },
//   Green: {
//     name: "Green",
//     background: "#00BD46",
//     color: "#FFFFFF",
//   },
//   Lime: {
//     name: "Lime",
//     background: "#00A900",
//     color: "#FFFFFF",
//   },
//   Gray: {
//     name: "Gray",
//     background: "#777381",
//     color: "#FFFFFF",
//   },
//   White: {
//     name: "White",
//     background: "#FFFFFF",
//     color: "#171717",
//     borderColor: "#b5b5b5",
//   },
// };

export const Button = (props: Props) => {
  const { href, target, children, style, className, icon, circular, tip } = props;
  const primaryColor =
    ColorTheme[props["primary-color"] || ""] || ColorTheme.DarkGray;

  const renderIcon = () => {
    if (icon && React.isValidElement(icon)) {
      return <span className={styles.buttonIcon}>{icon}</span>; // svg
    }

    if (icon && typeof icon === "string") {
      // Treat as image URL
      return (
        <span className={styles.buttonIcon}>
          <img src={icon} alt="Button icon" />
        </span>
      );
    }

    return null;
  };

  if (href) {
    return (
      <a
        href={href}
        target={target || Target.Self}
        rel={target === Target.Blank ? "noopener noreferrer" : undefined}
        className={`${styles.customBtn} ${styles[primaryColor]} ${
          circular ? styles.circular : ""
        } ${className || ""}`}
        style={style || null}
      >
        {renderIcon()}
        {children && <span className={styles.buttonText}>{children}</span>}
        {tip ? <div className={styles.tooltip}>{tip}</div> : null}
      </a>
    );
  }

  return (
    <div
      className={`${styles.customBtn} ${styles[primaryColor]} ${
        circular ? styles.circular : ""
      } ${className || ""}`}
      style={style || null}
    >
      {renderIcon()}
      {children && <span className={styles.buttonText}>{children}</span>}
      {tip ? <div className={styles.tooltip}>{tip}</div> : null}
    </div>
  );
};
