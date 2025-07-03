import { DisplayTab } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type TabContentType = {
  currentTab: string;
  currentTabLabel: string;
  displayTabs: DisplayTab[];
  shouldShowTabs: boolean;
  setCurrentTab?: Dispatch<SetStateAction<string>>;
  setCurrentTabLabel?: Dispatch<SetStateAction<string>>;
  setDisplayTabs?: Dispatch<SetStateAction<DisplayTab[]>>;
  setShouldShowTabs?: Dispatch<SetStateAction<boolean>>;
};

export const defaultTab: string = "";
export const defaultTabLabel: string = "";
export const defaultDisplayTabs: DisplayTab[] = [];
export const defaultShouldShowTabs: boolean = false;

export const TabContext = createContext<TabContentType>({
  currentTab: defaultTab,
  currentTabLabel: defaultTabLabel,
  displayTabs: defaultDisplayTabs,
  shouldShowTabs: defaultShouldShowTabs,
  setCurrentTab: (tab) => tab,
  setCurrentTabLabel: (tabLabel) => tabLabel,
  setDisplayTabs: (tabs) => tabs,
  setShouldShowTabs: (shouldShow) => shouldShow,
});
