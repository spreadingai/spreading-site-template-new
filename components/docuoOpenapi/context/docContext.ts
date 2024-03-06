import { DocuoConfig, TocItem } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

export interface DocContextType {
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
}

type DocContentType = {
  docData: DocContextType;
  setDocData: Dispatch<SetStateAction<DocContextType>>;
};

export const defaultDocValues: DocContextType = {
  toc: [],
  slug: [],
  docuoConfig: {} as DocuoConfig,
};

export const DocContext = createContext<DocContentType>({
  docData: defaultDocValues,
  setDocData: () => defaultDocValues,
});
