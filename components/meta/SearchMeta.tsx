import React from "react";
import Head from "next/head";
import useInstance from "@/components/hooks/useInstance";
import useVersion from "@/components/hooks/useVersion";
import useLanguage from "@/components/hooks/useLanguage";
import usePlatform from "@/components/hooks/usePlatform";

const SearchMeta = () => {
  const { instanceID } = useInstance();
  const { docVersion } = useVersion();
  const { currentLanguageLabel } = useLanguage();
  const { currentPlatformLabel } = usePlatform();
  return (
    <Head>
      <meta name="docsearch:version" content={docVersion} />
      <meta name="docsearch:instance" content={instanceID} />
      <meta name="docsearch:language" content={currentLanguageLabel} />
      <meta name="docsearch:platform" content={currentPlatformLabel} />
    </Head>
  );
};

export default SearchMeta;
