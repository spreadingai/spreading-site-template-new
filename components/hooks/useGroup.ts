import { useContext } from "react";
import { GroupContext } from "../context/groupContext";

const useGroup = () => {
  return useContext(GroupContext);
};

export default useGroup;
