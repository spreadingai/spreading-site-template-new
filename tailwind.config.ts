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
          active: "#1ABD00",
          hover: "#1ABD00",
        },
      },
      borderColor: {
        sidebar: {
          hover: "#1ECE01",
          default: "#ECECEC",
          active: "#1ECE01",
        },
      },
    },
  },
  plugins: [],
};
export default config;
