// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState } from "react";

import { DocuoConfig } from "@/lib/types";
import ThemeContext, { Theme } from "@/components/header/Theme.context";
import useColors from "./hooks/useColors";
import useColorMode from "./hooks/useColorMode";

type Props = {
  children: React.ReactNode;
  docuoConfig: DocuoConfig;
};

const PreviewLayout = ({ docuoConfig, children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  useColorMode(docuoConfig.themeConfig?.colorMode, theme, setTheme);
  useColors(docuoConfig.themeConfig?.colors);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="">{children}</div>
    </ThemeContext.Provider>
  );
};

export default PreviewLayout;
