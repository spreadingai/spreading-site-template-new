import { useRouter } from "next/router";
import CommonControllerImpl from "@/lib/optimize/common";

interface Props {
  slug: string[];
}

export const getStaticProps = async () => {
  const allSlugs = CommonControllerImpl.readAllSlugsByFile();
  return {
    props: {
      slug: allSlugs[0] ? allSlugs[0].params.slug : ["404"],
    },
  };
};

export default function Index({ slug }: Props) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace(`/${slug.join("/")}`);
  }

  return <div />;
}
