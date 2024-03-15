import { DocFrontMatter } from "@/components/docuoOpenapi/types";
import { Dispatch, SetStateAction, createContext } from "react";

export interface DocContextType {
  frontMatter: DocFrontMatter;
}

type DocContentType = {
  docData: DocContextType;
  setDocData: Dispatch<SetStateAction<DocContextType>>;
};

export const defaultDocuoValues: DocContextType = {
  frontMatter: {} as DocFrontMatter,
};

export const DocContext = createContext<DocContentType>({
  docData: defaultDocuoValues,
  setDocData: () => defaultDocuoValues,
});
