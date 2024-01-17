import IconDiscord from "@/assets/icons/social/Discord.svg";
import IconFacebook from "@/assets/icons/social/Facebook.svg";
import IconGithub from "@/assets/icons/social/GitHub.svg";
import IconLinkedIn from "@/assets/icons/social/LinkedIn.svg";
import IconX from "@/assets/icons/social/X.svg";
import IconYoutube from "@/assets/icons/social/YouTube.svg";
import Image from "next/image";
const Social = {
  Discord: <IconDiscord />,
  Facebook: <IconFacebook />,
  Github: <IconGithub />,
  LinkedIn: <IconLinkedIn />,
  X: <IconX />,
  YouTube: <IconYoutube />,
  Twitter: <IconX />,
  DiscordLight: <IconDiscord />,
  FacebookLight: <IconFacebook />,
  GithubLight: <IconGithub />,
  LinkedInLight: <IconLinkedIn />,
  XLight: <IconX />,
  YouTubeLight: <IconYoutube />,
  TwitterLight: <IconX />,
  DiscordDark: <IconDiscord />,
  FacebookDark: <IconFacebook />,
  GithubDark: <IconGithub />,
  LinkedInDark: <IconLinkedIn />,
  XDark: <IconX />,
  YouTubeDark: <IconYoutube />,
  TwitterDark: <IconX />,
};
const getSocial = (
  logo: string | { dark: string; light: string },
  isDarkMode: boolean
) => {
  const mode = isDarkMode ? "dark" : "light";
  const current = typeof logo === "string" ? logo : logo[mode];
  return (
    Social[current] || (
      <img
        src={current.includes("http") ? current : `/${current}`}
        width={20}
        height={20}
        alt={"social"}
      />
    )
  );
};

export { getSocial };
