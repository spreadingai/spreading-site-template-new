import { useRouter } from "next/router";
import SlugControllerImpl from "@/lib/slug-help";

interface Props {
  slug: string[];
}

export const getStaticProps = async () => {
  const allSlugs = SlugControllerImpl.getAllSlugs();
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
