import IconDiscordDark from "@/assets/icons/social/discord_dark.svg";
import IconDiscordLight from "@/assets/icons/social/discord_light.svg";
import IconFacebookDark from "@/assets/icons/social/facebook_dark.svg";
import IconFacebookLight from "@/assets/icons/social/facebook_light.svg";
import IconGithubDark from "@/assets/icons/social/github_dark.svg";
import IconGithubLight from "@/assets/icons/social/github_light.svg";
import IconLinkedInDark from "@/assets/icons/social/linkedin_dark.svg";
import IconLinkedInLight from "@/assets/icons/social/linkedin_light.svg";
import IconXDark from "@/assets/icons/social/x_dark.svg";
import IconXLight from "@/assets/icons/social/x_light.svg";
import IconYoutubeDark from "@/assets/icons/social/youtube_dark.svg";
import IconYoutubeLight from "@/assets/icons/social/youtube_light.svg";
import IconInstagramDark from "@/assets/icons/social/instagram_dark.svg";
import IconInstagramLight from "@/assets/icons/social/instagram_light.svg";
import IconDribbbleDark from "@/assets/icons/social/dribbble_dark.svg";
import IconDribbbleLight from "@/assets/icons/social/dribbble_light.svg";

const Social = {
  discord: { dark: <IconDiscordDark />, light: <IconDiscordLight /> },
  facebook: { dark: <IconFacebookDark />, light: <IconFacebookLight /> },
  github: { dark: <IconGithubDark />, light: <IconGithubLight /> },
  linkedin: { dark: <IconLinkedInDark />, light: <IconLinkedInLight /> },
  twitter: { dark: <IconXDark />, light: <IconXLight /> },
  x: { dark: <IconXDark />, light: <IconXLight /> },
  youtube: { dark: <IconYoutubeDark />, light: <IconYoutubeLight /> },
  instagram: { dark: <IconInstagramDark />, light: <IconInstagramLight /> },
  dribbble: { dark: <IconDribbbleDark />, light: <IconDribbbleLight /> },
};
const getSocial = (
  logo: string | { dark: string; light: string },
  isDarkMode: boolean
) => {
  const mode = isDarkMode ? "dark" : "light";
  const current = typeof logo === "string" ? logo : logo?.[mode] || "";

  return Social[current.toLowerCase()] ? (
    Social[current.toLowerCase()][mode]
  ) : (
    <img
      src={current.includes("http") ? current : `/${current}`}
      width={20}
      height={20}
      alt={"social"}
    />
  );
};

export { getSocial };
