import { useContext } from "react";
import { DocContext } from "../context/docContext";

const useDoc = () => {
  return useContext(DocContext);
};

export default useDoc;
