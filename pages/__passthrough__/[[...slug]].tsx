import type { GetServerSideProps } from "next";

type Props = {
  originalPath: string;
};

function getOriginalPath(resolvedUrl: string) {
  // 由于 rewrites destination 形如 /__passthrough__/unique-api/xxx
  // 这里还原成原始请求：/unique-api/xxx
  const original = resolvedUrl.replace(/^\/__passthrough__/, "");
  return original || "/";
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      originalPath: getOriginalPath(ctx.resolvedUrl || "/"),
    },
  };
};

/**
 * 统一兜底页：配合 next.config.mjs rewrites + docuo.config.passthroughPrefixes 使用。
 * 目的：这些前缀路径通常由 Nginx/外部系统接管；即使请求落到 Next，也不要被 docs 的 slug 白名单拦截成 404。
 */
export default function PassthroughPage({ originalPath }: Props) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        passthrough 路径已放行（由 Nginx 接管）
      </div>
      <div style={{ opacity: 0.8 }}>
        当前请求：<code>{originalPath}</code>
      </div>
    </div>
  );
}


