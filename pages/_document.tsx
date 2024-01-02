import { Html, Head, Main, NextScript } from "next/document";
import Meta from "@/components/meta";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Meta />
      </Head>
      <body>
        <Main />
        <NextScript />
        {
          process?.env?.mode === "preview" && (
            <>
              <Script strategy="beforeInteractive" src="/socket.io/socket.io.js"></Script>
              <Script strategy="afterInteractive" id="socket" dangerouslySetInnerHTML={{
                __html: `
                var socket = io();
                socket.on("reload", function() {
                  window.location.reload();
                });
                `
              }}></Script>
            </>
          )
        }
      </body>
    </Html>
  );
}
