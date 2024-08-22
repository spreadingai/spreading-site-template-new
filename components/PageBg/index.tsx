import React from "react";
import Image from "next/image";
import gradientFixed from "@/assets/images/gradient_fixed.png";
import gradientFixedDark from "@/assets/images/gradient_fixed@dark.png";
import useTheme from "@/components/hooks/useTheme";

const PageBg = () => {
  const { theme } = useTheme();
  return (
    <div className="only_pc__show absolute z-0 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-[108rem] flex-none flex justify-end">
        <Image
          src={theme === "dark" ? gradientFixedDark : gradientFixed}
          alt=""
          className="w-[71.75rem] flex-none max-w-none"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default PageBg;
