import { useContext } from "react";
import { VersionContext } from "../context/versionContext";

const useVersion = () => {
  return useContext(VersionContext);
};

export default useVersion;
