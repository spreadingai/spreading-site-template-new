import { useContext } from "react";
import { DocTypeContext } from "../context/docTypeContext";

const useDocType = () => {
  return useContext(DocTypeContext);
};

export default useDocType;
