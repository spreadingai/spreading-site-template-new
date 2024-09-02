import { DisplayGroup } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type GroupContentType = {
  currentGroup: string;
  currentGroupLabel: string;
  displayGroups: DisplayGroup[];
  setCurrentGroup?: Dispatch<SetStateAction<string>>;
  setCurrentGroupLabel?: Dispatch<SetStateAction<string>>;
  setDisplayGroups?: Dispatch<SetStateAction<DisplayGroup[]>>;
};

export const allGroupItem = {
  group: "all",
  groupLabel: "All product",
  en_groupLabel: "All product",
  zh_groupLabel: "所有产品",
};
export const addGroupAllItem = (displayGroups) => {
  return displayGroups && displayGroups.length > 0
    ? [{ ...allGroupItem }, ...displayGroups]
    : [];
};
export const defaultGroup: string = allGroupItem.group;
export const defaultGroupLabel: string = allGroupItem.groupLabel;
export const defaultDisplayGroups: [] = [];

export const GroupContext = createContext<GroupContentType>({
  currentGroup: defaultGroup,
  currentGroupLabel: defaultGroupLabel,
  displayGroups: defaultDisplayGroups,
  setCurrentGroup: (group) => group,
  setCurrentGroupLabel: (groupLabel) => groupLabel,
  setDisplayGroups: (groups) => groups,
});
