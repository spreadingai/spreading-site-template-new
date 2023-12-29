import { useRouter } from "next/router";
import DocsControllerImpl from "@/lib/docs-help";

interface Props {
  slug: string[];
}

export const getStaticProps = async () => {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] Home getStaticProps:"
  );
  const allSlugs = DocsControllerImpl.getAllSlugs();
  return {
    props: {
      slug: allSlugs[0].params.slug,
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
