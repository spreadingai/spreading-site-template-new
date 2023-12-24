import { ConfigProvider } from "antd";
import { FC, PropsWithChildren, useMemo } from "react";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useMemo(
    () => ({
      token: {
        fontFamily: "LexendDeca",
        colorText: "#171717",
      },
      components: {
        Breadcrumb: {
          fontSize: 13,
          fontFamily: "LexendDeca-Light, LexendDeca",
          itemColor: "#999999",
          lastItemColor: "#000000",
          separatorColor: "#D0D0D0",
          separatorMargin: 7,
        },
        Anchor: {
          fontSize: 13,
          fontFamily: "LexendDeca-Light, LexendDeca",
          colorText: "#444444",
          linkPaddingBlock: 6,
          linkPaddingInlineStart: 18,
        },
        Tree: {
          fontFamily: "LexendDeca-Light, LexendDeca",
          directoryNodeSelectedBg: "transparent",
          directoryNodeSelectedColor: "#171717",
          nodeHoverBg: "transparent",
          nodeSelectedBg: "transparent",
          controlItemBgActive: "transparent",
          controlItemBgHover: "transparent",
          titleHeight: 32,
          controlHeightSM: 32,
          borderRadius: 0,
          colorBorder: "#d2d2d2",
        },
      },
    }),
    []
  );

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};
export default ThemeProvider;
