import styles from "./index.module.scss";
import React, { FC, useMemo } from "react";

interface VideoProps {
  src: string;
  width?: string;
  height?: string;
  style?: any;
  className?: string;
}

function formatWH(val) {
  if (val.endsWith("%")) return val;
  const pxVal = parseInt(val);
  if (typeof pxVal === "number" && pxVal > 0) {
    return `${pxVal}px`;
  }
  return val;
}

export const Video: FC<VideoProps> = (props) => {
  const { src, width = "100%", height = "auto", style, className } = props;

  const realSrc = useMemo(() => {
    let embedSrc = src;
    if (
      /^https?:\/\/www\.youtube\.com/i.test(src) &&
      !/^https?:\/\/www\.youtube\.com\/embed/i.test(src)
    ) {
      const videoId = src.match(/youtube\.com\/watch\?v=([^&]+)/i)?.[1];
      if (videoId) {
        embedSrc = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (
      /^https?:\/\/vimeo\.com/i.test(src) &&
      !/^https?:\/\/player\.vimeo\.com\/video/i.test(src)
    ) {
      const videoId = src.match(/vimeo\.com\/([^\?]+)/i)?.[1];
      if (videoId) {
        embedSrc = `https://player.vimeo.com/video/${videoId}`;
      }
    }

    if (
      /^https?:\/\/www\.loom\.com/i.test(src) &&
      !/^https?:\/\/www\.loom\.com\/embed/i.test(src)
    ) {
      const videoId = src.match(/loom\.com\/share\/([^\?]+)/i)?.[1];
      if (videoId) {
        embedSrc = `https://www.loom.com/embed/${videoId}`;
      }
    }

    return embedSrc;
  }, [src]);

  const isEmbed = useMemo(() => /^(https?:)?\/\/(www\.youtube\.com\/embed|player\.vimeo\.com\/video|www\.loom\.com\/embed)/i.test(realSrc), [realSrc]);

  return (
    <div
      className={`${styles.video_wrapper} ${className}`}
      style={{
        width: formatWH(width),
        height: formatWH(height),
        // @ts-ignore
        ...(style || {}),
      }}
    >
      <div
        style={{
          position: "relative",
          // height === "auto" 表示没有设置 height
          paddingTop: height === "auto" ? "56.25%" : undefined,
          height: height === "auto" ? undefined : "100%",
        }}
      >
        {isEmbed ? (
          <iframe
            src={realSrc}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          ></iframe>
        ) : (
          <video
            src={realSrc}
            controls
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
};
