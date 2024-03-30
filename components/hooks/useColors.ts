import { useEffect } from "react";

const useColors = (colors) => {
  useEffect(() => {
    const styleElId = "themeColor";
    if (!colors || document.getElementById(styleElId)) return;

    const styleEl = document.createElement("style");
    styleEl.id = styleElId;
    let innerHTML = "";
    let lightStyleText = "";
    if (colors.primaryLight) {
      lightStyleText += `
          --docuo-color-primary-hover: ${colors.primaryLight} !important;
          --docuo-color-primary-active: ${colors.primaryLight} !important;
          --docuo-code-group-active: ${colors.primaryLight} !important;
        `;
    }
    let darkStyleText = "";
    if (colors.primaryDark) {
      darkStyleText += `
          --docuo-color-primary-hover: ${colors.primaryDark} !important;
          --docuo-color-primary-active: ${colors.primaryDark} !important;
          --docuo-code-group-active: ${colors.primaryDark} !important;
        `;
    }
    if (lightStyleText !== "") {
      innerHTML += `
        html {
          ${lightStyleText}
        }
      `;
    }
    if (darkStyleText !== "") {
      innerHTML += `
        html[data-theme=dark] {
          ${darkStyleText}
        }
      `;
    }
    // remove blank lines
    styleEl.innerHTML = innerHTML.replaceAll(/^[\s]*\n/mg, "");
    document.documentElement.firstChild.appendChild(styleEl);
  }, [colors]);
}

export default useColors;