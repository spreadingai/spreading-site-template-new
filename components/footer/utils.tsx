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

const Social = {
  Discord: { dark: <IconDiscordDark />, light: <IconDiscordLight /> },
  Facebook: { dark: <IconFacebookDark />, light: <IconFacebookLight /> },
  GitHub: { dark: <IconGithubDark />, light: <IconGithubLight /> },
  LinkedIn: { dark: <IconLinkedInDark />, light: <IconLinkedInLight /> },
  Twitter: { dark: <IconXDark />, light: <IconXLight /> },
  X: { dark: <IconXDark />, light: <IconXLight /> },
  YouTube: { dark: <IconYoutubeDark />, light: <IconYoutubeLight /> },
};
const getSocial = (
  logo: string | { dark: string; light: string },
  isDarkMode: boolean
) => {
  const mode = isDarkMode ? "dark" : "light";
  const current = typeof logo === "string" ? logo : logo?.[mode];

  return Social[current] ? (
    Social[current][mode]
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
