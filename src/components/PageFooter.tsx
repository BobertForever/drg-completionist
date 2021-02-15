import { Layout, Progress } from "antd";
import { DEFAULT_TAB, TabName, TABS } from "App";
import useStore from "data/useStore";
import { overclocks } from "pages/overclocks/OverclockData";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
const { Footer } = Layout;

export default function PageFooter() {
  const [store] = useStore();
  const location = useLocation();
  const currentTab = useMemo(
    () => (location.pathname.substring(1) || DEFAULT_TAB) as TabName,
    [location.pathname]
  );
  const currentTabPercentage = useMemo(() => {
    switch (currentTab) {
      case "overclocks":
        return Math.round(
          (Object.values(store.overclocks).flat().length /
            Object.values(overclocks)
              .flatMap((w) => Object.values(w))
              .flat().length) *
            100
        );
      case "frameworks":
      case "skins":
      case "accessories":
      case "pickaxe":
        return null;
    }
  }, [currentTab, store]);
  const currentTabDisplayName = useMemo(
    () => TABS.find((t) => t.key === currentTab)?.title,
    [currentTab]
  );
  if (currentTabPercentage === null) {
    return null;
  }
  return (
    <Footer
      style={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        backgroundColor: "#141414",
        borderTop: "1px solid #434343",
      }}
    >
      <div>
        {currentTabDisplayName} Progress
        <Progress percent={currentTabPercentage} />
      </div>
    </Footer>
  );
}