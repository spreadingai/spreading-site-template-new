import { DisplayInstance } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type InstanceContentType = {
  instanceIDs: string[];
  currentInstanceLabels: string[];
  displayInstances: DisplayInstance[];
  setInstanceIDs?: Dispatch<SetStateAction<string[]>>;
  setCurrentInstanceLabels?: Dispatch<SetStateAction<string[]>>;
  setDisplayInstances?: Dispatch<SetStateAction<DisplayInstance[]>>;
};

export const defaultInstanceIDs: string[] = [];
export const defaultInstanceLabels: string[] = [];
export const defaultDisplayInstances: [] = [];

export const InstanceContext = createContext<InstanceContentType>({
  instanceIDs: defaultInstanceIDs,
  currentInstanceLabels: defaultInstanceLabels,
  displayInstances: defaultDisplayInstances,
  setInstanceIDs: (instanceIDs) => instanceIDs,
  setCurrentInstanceLabels: (instanceLabels) => instanceLabels,
  setDisplayInstances: (instances) => instances,
});
