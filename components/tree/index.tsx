import { FC, useState } from "react";
import TreeNode from "./TreeNode";
import classNames from "classnames";
import IconClose from "@/assets/icons/tree/m_navclose.svg";
import LogoGrey from "@/assets/images/logo_grey.png";
import Image from "next/image";
import { DocuoConfig, Plan } from "@/lib/types";

interface TreeProps {
  className?: string;
  docuoConfig: DocuoConfig;
  data: TreeNode[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  titleRender?: (node: TreeNode) => React.ReactNode;
  defaultExpandAll?: boolean;
  setDrawerOpen: (value: boolean) => void;
}

const DocuoTree: FC<TreeProps> = ({
  className,
  docuoConfig,
  data = [],
  selectedKeys,
  titleRender,
  onSelect,
  defaultExpandAll = false,
  setDrawerOpen,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const isHideWaterMark =
    Number(process.env.NEXT_PUBLIC_PLAN) !== Plan.Free && docuoConfig?.themeConfig?.removeWatermark === true;
  return (
    <div className={classNames("pt-[28px] pb-10 pl-8 pr-6", className)}>
      <span onClick={handleClose} className="w-6 absolute right-5 top-2 cursor-pointer z-10 preview-side-close-btn">
        <IconClose />
      </span>
      {data.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          showLines={true}
          selectedKeys={selectedKeys || expandedKeys}
          onSelect={onSelect || onExpand}
          titleRender={titleRender}
          defaultExpandAll={defaultExpandAll}
        />
      ))}
      {!isHideWaterMark && (
        <div className="powered-by">
          <span>Powered By</span>
          <a href="https://www.spreading.ai/" target="_blank">
            <Image src={LogoGrey} alt={"spreading"} />
          </a>
        </div>
      )}
    </div>
  );
};

export default DocuoTree;
