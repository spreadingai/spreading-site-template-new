import { useContext } from "react";
import { InstanceContext } from "../context/instanceContext";

const useInstance = () => {
  return useContext(InstanceContext);
};

export default useInstance;
