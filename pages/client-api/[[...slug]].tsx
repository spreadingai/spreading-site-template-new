import type { GetServerSideProps } from "next";

type Props = { requestedPath: string };

/**
 * 目的：只要存在这个页面文件，Next 就不会把 /client-api/* 落到 pages/[[...slug]].tsx 去做 slug 白名单校验；
 * 这里永远返回 200，方便你在 Nginx 侧单独接管这些路径。
 */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      requestedPath: ctx.resolvedUrl || "/client-api",
    },
  };
};

export default function ClientApiPassthroughPage({ requestedPath }: Props) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        /client-api/* 已放行（由 Nginx 接管）
      </div>
      <div style={{ opacity: 0.8 }}>
        当前请求：<code>{requestedPath}</code>
      </div>
    </div>
  );
}


