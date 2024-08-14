import { useContext } from "react";
import { PlatformContext } from "../context/platformContext";

const usePlatform = () => {
  return useContext(PlatformContext);
};

export default usePlatform;
