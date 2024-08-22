import { DisplayVersion } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type VersionContentType = {
  docVersion: string;
  slugVersion?: string;
  displayVersions: DisplayVersion[];
  versions?: string[];
  setDocVersion?: Dispatch<SetStateAction<string>>;
  setSlugVersion?: Dispatch<SetStateAction<string>>;
  setDisplayVersions?: Dispatch<SetStateAction<DisplayVersion[]>>;
  setVersions?: Dispatch<SetStateAction<string[]>>;
};

export const defaultDocVersion: string = "";
export const defaultSlugVersion: string = "";
export const defaultDisplayVersions: [] = [];
export const defaultVersions: [] = [];

export const VersionContext = createContext<VersionContentType>({
  docVersion: defaultDocVersion,
  slugVersion: defaultSlugVersion,
  displayVersions: defaultDisplayVersions,
  versions: defaultVersions,
  setDocVersion: (docVersion) => docVersion,
  setSlugVersion: (slugVersion) => slugVersion,
  setDisplayVersions: (displayVersions) => displayVersions,
  setVersions: (versions) => versions,
});
