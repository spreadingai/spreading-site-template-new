import { DisplayInstance } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type InstanceContentType = {
  instanceID: string;
  currentInstanceLabel: string;
  displayInstances: DisplayInstance[];
  setInstanceID?: Dispatch<SetStateAction<string>>;
  setCurrentInstanceLabel?: Dispatch<SetStateAction<string>>;
  setDisplayInstances?: Dispatch<SetStateAction<DisplayInstance[]>>;
};

export const defaultInstance: string = "";
export const defaultInstanceLabel: string = "";
export const defaultDisplayInstances: [] = [];

export const InstanceContext = createContext<InstanceContentType>({
  instanceID: defaultInstance,
  currentInstanceLabel: defaultInstanceLabel,
  displayInstances: defaultDisplayInstances,
  setInstanceID: (instanceID) => instanceID,
  setCurrentInstanceLabel: (instanceLabel) => instanceLabel,
  setDisplayInstances: (instances) => instances,
});
