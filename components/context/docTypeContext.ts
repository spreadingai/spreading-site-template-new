import { Dispatch, SetStateAction, createContext } from "react";

export interface DocType {
  key: string;
  label: string;
}

type DocTypeContentType = {
  currentDocType: string;
  currentDocTypeLabel: string;
  docTypes: DocType[];
  setCurrentDocType: Dispatch<SetStateAction<string>>;
  setCurrentDocTypeLabel: Dispatch<SetStateAction<string>>;
};

export const allDocTypeItem = {
  key: "all",
  label: "All",
};

export const defaultDocTypes = [
  {
    key: "docs",
    label: "Docs",
  },
  {
    key: "api",
    label: "API",
  },
];
export const defaultDocType: string = defaultDocTypes[0].key;
export const defaultDocTypeLabel: string = defaultDocTypes[0].label;

export const DocTypeContext = createContext<DocTypeContentType>({
  currentDocType: defaultDocType,
  currentDocTypeLabel: defaultDocTypeLabel,
  docTypes: defaultDocTypes,
  setCurrentDocType: (docType) => docType,
  setCurrentDocTypeLabel: (currentDocTypeLabel) => currentDocTypeLabel,
});
