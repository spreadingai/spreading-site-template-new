import { AppProps } from "next/app";
import "@/styles/index.scss";
import "@/assets/fonts/fonts.scss";
import "@/styles/editor.scss";
import "@/styles/docsearch.scss";
import "@/styles/tailwind.css";
import "@/tailwind.config";
import "@/styles/prism.token.scss";
import { ThemeProvider } from "@/components/Theme";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  //@ts-ignore
  useEffect(() => {
    const firstPageSeen = localStorage.getItem("FIRST_PAGE_SEEN");
    if (!firstPageSeen)
      localStorage.setItem("FIRST_PAGE_SEEN", window.location.href);
  }, []);
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </ThemeProvider>
  );
}
