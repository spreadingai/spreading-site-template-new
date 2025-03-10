import { useRouter } from "next/router";
import SlugControllerImpl from "@/lib/slug-help";
interface Props {
  slug: string[];
}

export const getStaticProps = async () => {
  const allSlugs = SlugControllerImpl.generateAllSlugs();
  return {
    props: {
      slug: allSlugs[0] ? allSlugs[0].params.slug : [],
      fallback: true,
    },
  };
};

export default function Index({ slug }: Props) {
  if (!slug || slug.length === 0) {
    return <div>loading...</div>;
  }
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace(`/${slug.join("/")}`);
  }

  return <div />;
}
