import { AppProps } from "next/app";
// Put it here on top, so as not to overwrite the docuo's existing style
import "@/styles/infima.scss";
import "@/styles/index.scss";
import "@/styles/theme.scss";
import "@/assets/fonts/fonts.scss";
import "@/styles/editor.scss";
import "@/styles/docsearch.scss";
import "@/styles/tailwind.css";
import "@/tailwind.config";
import "@/styles/prism.token.scss";
import { ThemeProvider } from "@/components/Theme";
import "@/components/docuoOpenapi/theme/styles.scss";
import "@/styles/openapi/cover.scss";
import "@/styles/openapi/theme.scss";
import "@/styles/openapi/callbacks.cover.scss";
import "@/styles/openapi/response.cover.scss";
import "@/styles/openapi/request.cover.scss";
import "@/styles/openapi/badge.cover.scss";
import "@/styles/openapi/schema.cover.scss";

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
