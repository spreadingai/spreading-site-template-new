import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["LexendDeca", "sans-serif"],
        serif: ["RobotoMono", "serif"],
        "inter-regular": ["Inter-Regular", "sans-serif"],
        "inter-light": ["Inter-Light", "sans-serif"],
        "inter-medium": ["Inter-Medium", "sans-serif"],
        "inter-bold": ["Inter-SemiBold", "sans-serif"],
      },
      fontSize: {
        sm: ["0.875rem", "1.5rem"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#171717",
        secondary: "#515869",
        sidebar: {
          primary: "#171717",
          secondary: "#515869",
          active: "#0055FF",
          hover: "#0055FF",
          scrollbar: "rgba(81,88,105,0.2)",
        },
      },
      borderColor: {
        sidebar: {
          hover: "#1ECE01",
          default: "#ECECEC",
          active: "#1ECE01",
        },
        backtop: {
          hover: "#1ECE01",
          default: "#DDE3EB",
          active: "#1ECE01",
        },
      },
    },
  },
};
export default config;
