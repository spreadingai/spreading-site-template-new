import { DisplayPlatform } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type PlatformContentType = {
  currentPlatform: string;
  currentPlatformLabel: string;
  displayPlatforms: DisplayPlatform[];
  setCurrentPlatform?: Dispatch<SetStateAction<string>>;
  setCurrentPlatformLabel?: Dispatch<SetStateAction<string>>;
  setDisplayPlatforms?: Dispatch<SetStateAction<DisplayPlatform[]>>;
};

export const allPlatformItem = {
  platform: "all",
  platformLabel: "All platform",
  en_platformLabel: "All platform",
  zh_platformLabel: "所有平台",
};
export const addPlatformAllItem = (displayPlatforms) => {
  return displayPlatforms && displayPlatforms.length > 0
    ? [{ ...allPlatformItem }, ...displayPlatforms]
    : [];
};
export const defaultPlatform: string = allPlatformItem.platform;
export const defaultPlatformLabel: string = allPlatformItem.platformLabel;
export const defaultDisplayPlatforms: [] = [];

export const PlatformContext = createContext<PlatformContentType>({
  currentPlatform: defaultPlatform,
  currentPlatformLabel: defaultPlatformLabel,
  displayPlatforms: defaultDisplayPlatforms,
  setCurrentPlatform: (platform) => platform,
  setCurrentPlatformLabel: (platformLabel) => platformLabel,
  setDisplayPlatforms: (platforms) => platforms,
});
