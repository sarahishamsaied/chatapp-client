import React from "react";
import { Tabs as AntTabs } from "antd";

interface Props {
  items: Array<{
    label: string;
    key: string;
    children: React.ReactNode;
  }>;
  onTabClick?: (key: string) => void;
  defaultActiveKey?: string;
  currentTab?: string;
}

const Tabs: React.FC<Props> = ({
  items,
  onTabClick,
  defaultActiveKey,
  currentTab,
}: Props) => (
  <AntTabs
    activeKey={currentTab}
    className="text-white w-full"
    defaultActiveKey={defaultActiveKey}
    centered
    onChange={onTabClick}
    items={items.map((item) => ({
      label: item.label,
      key: item.key,
      children: item.children,
    }))}
  />
);

export default Tabs;
