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

export const defaultPlatform: string = "";
export const defaultPlatformLabel: string = "";
export const defaultDisplayPlatforms: [] = [];

export const PlatformContext = createContext<PlatformContentType>({
  currentPlatform: defaultPlatform,
  currentPlatformLabel: defaultPlatformLabel,
  displayPlatforms: defaultDisplayPlatforms,
  setCurrentPlatform: (platform) => platform,
  setCurrentPlatformLabel: (platformLabel) => platformLabel,
  setDisplayPlatforms: (platforms) => platforms,
});
