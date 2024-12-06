import LibControllerImpl from "@/lib/index";

const Meta = () => {
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const favicon = docuoConfig.favicon
    ? docuoConfig.favicon.includes("http")
      ? docuoConfig.favicon
      : `${
          process.env.NEXT_PUBLIC_BASE_PATH || ""
        }/${docuoConfig.favicon.replace(/^\//, "")}`
    : "";
  return (
    <>
      <link
        rel="shortcut icon"
        href={
          favicon ||
          `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon/favicon.ico`
        }
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
      <meta
        http-equiv="Content-Security-Policy"
        content="frame-ancestors'self' https://docs.zegocloud.com"
      />
    </>
  );
};

export default Meta;
