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

export const defaultGroup: string = "";
export const defaultGroupLabel: string = "";
export const defaultDisplayGroups: [] = [];

export const GroupContext = createContext<GroupContentType>({
  currentGroup: defaultGroup,
  currentGroupLabel: defaultGroupLabel,
  displayGroups: defaultDisplayGroups,
  setCurrentGroup: (group) => group,
  setCurrentGroupLabel: (groupLabel) => groupLabel,
  setDisplayGroups: (groups) => groups,
});
