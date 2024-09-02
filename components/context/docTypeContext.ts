import { Dispatch, SetStateAction, createContext } from "react";

export interface DocType {
  en_key: string;
  zh_key: string;
  en_label: string;
  zh_label: string;
}

type DocTypeContentType = {
  currentDocType: string;
  setCurrentDocType: Dispatch<SetStateAction<string>>;
};

export const allDocTypeItem = {
  en_key: "All Sections",
  zh_key: "全部文档",
  en_label: "All Sections",
  zh_label: "全部文档",
};
export const defaultDocType: string = allDocTypeItem.en_key;
export const defaultDocTypes: DocType[] = [
  { ...allDocTypeItem },
  {
    en_key: "Docs",
    zh_key: "技术文档",
    en_label: "Docs",
    zh_label: "技术文档",
  },
  {
    en_key: "API",
    zh_key: "API 文档",
    en_label: "API",
    zh_label: "API 文档",
  },
];

export const DocTypeContext = createContext<DocTypeContentType>({
  currentDocType: defaultDocType,
  setCurrentDocType: (docType) => docType,
});
