import { DocuoConfig, TocItem } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

export interface DocuoContextType {
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
}

type DocuoContentType = {
  docuoData: DocuoContextType;
  setDocuoData: Dispatch<SetStateAction<DocuoContextType>>;
};

export const defaultDocuoValues: DocuoContextType = {
  toc: [],
  slug: [],
  docuoConfig: {} as DocuoConfig,
};

export const DocuoContext = createContext<DocuoContentType>({
  docuoData: defaultDocuoValues,
  setDocuoData: () => defaultDocuoValues,
});
