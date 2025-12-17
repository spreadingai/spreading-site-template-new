import React from "react";
import Head from "next/head";
import useInstance from "@/components/hooks/useInstance";
import useGroup from "@/components/hooks/useGroup";
import useVersion from "@/components/hooks/useVersion";
import useLanguage from "@/components/hooks/useLanguage";
import usePlatform from "@/components/hooks/usePlatform";

const SearchMeta = () => {
  const { instanceIDs } = useInstance();
  const { currentGroup, currentGroupLabel } = useGroup();
  const { docVersion } = useVersion();
  const { currentLanguage, currentLanguageLabel } = useLanguage();
  const { currentPlatform, currentPlatformLabel } = usePlatform();
  return (
    <Head>
      <meta name="docsearch:version" content={docVersion} />
      {/* The previous versions of instanceGroup */}
      <meta name="docsearch:instance" content={instanceIDs[0]} />
      {/* The later versions of instanceGroup */}
      <meta name="docsearch:group" content={currentGroup} />
      <meta name="docsearch:language" content={currentLanguage} />
      {/* The later versions of instanceGroup */}
      <meta name="docsearch:platform" content={currentPlatform} />
    </Head>
  );
};

export default SearchMeta;
