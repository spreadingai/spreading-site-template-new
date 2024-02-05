import { AppProps } from "next/app";
import "@/styles/index.scss";
import "@/assets/fonts/fonts.scss";
import "@/styles/editor.scss";
import "@/styles/docsearch.scss";
import "@/styles/tailwind.css";
import "@/tailwind.config";
import "@/styles/prism.token.scss";
import { ThemeProvider } from "@/components/Theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </ThemeProvider>
  );
}
