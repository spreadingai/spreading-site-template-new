import IconDiscordDark from "@/assets/icons/social/Discord.svg";
import IconDiscordLight from "@/assets/icons/social/Discord_light.svg";
import IconFacebookDark from "@/assets/icons/social/Facebook.svg";
import IconFacebookLight from "@/assets/icons/social/Facebook_light.svg";
import IconGithubDark from "@/assets/icons/social/GitHub.svg";
import IconGithubLight from "@/assets/icons/social/GitHub_light.svg";
import IconLinkedInDark from "@/assets/icons/social/LinkedIn.svg";
import IconLinkedInLight from "@/assets/icons/social/LinkedIn_light.svg";
import IconXDark from "@/assets/icons/social/X.svg";
import IconXLight from "@/assets/icons/social/X_light.svg";
import IconYoutubeDark from "@/assets/icons/social/YouTube.svg";
import IconYoutubeLight from "@/assets/icons/social/YouTube_light.svg";

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
  console.log(mode, current);

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
