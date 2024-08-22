import React from "react";
import Head from "next/head";
// import useInstance from "@/components/hooks/useInstance";
import useGroup from "@/components/hooks/useGroup";
import useVersion from "@/components/hooks/useVersion";
import useLanguage from "@/components/hooks/useLanguage";
import usePlatform from "@/components/hooks/usePlatform";

const SearchMeta = () => {
  // const { instanceID } = useInstance();
  const { currentGroupLabel } = useGroup();
  const { docVersion } = useVersion();
  const { currentLanguageLabel } = useLanguage();
  const { currentPlatformLabel } = usePlatform();
  return (
    <Head>
      <meta name="docsearch:version" content={docVersion} />
      {/* The previous versions of navigationInfo */}
      {/* <meta name="docsearch:instance" content={instanceID} /> */}
      <meta name="docsearch:group" content={currentGroupLabel} />
      <meta name="docsearch:language" content={currentLanguageLabel} />
      <meta name="docsearch:platform" content={currentPlatformLabel} />
    </Head>
  );
};

export default SearchMeta;
