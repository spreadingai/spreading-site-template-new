import { DisplayVersion } from "@/lib/types";
import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_CURRENT_SLUG_VERSION,
} from "@/lib/constants";
import { Dispatch, SetStateAction, createContext } from "react";

type VersionContentType = {
  docVersion: string;
  slugVersion: string;
  displayVersions: DisplayVersion[];
  versions?: string[];
  setDocVersion?: Dispatch<SetStateAction<string>>;
  setSlugVersion?: Dispatch<SetStateAction<string>>;
  setDisplayVersions?: Dispatch<SetStateAction<DisplayVersion[]>>;
  setVersions?: Dispatch<SetStateAction<string[]>>;
};

export const defaultDocVersion: string = DEFAULT_CURRENT_DOC_VERSION;
export const defaultSlugVersion: string = DEFAULT_CURRENT_SLUG_VERSION;
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
