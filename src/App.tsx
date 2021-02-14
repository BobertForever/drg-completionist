import { Row, Col, PageHeader, Tabs, Layout } from "antd";
import "antd/dist/antd.dark.css";
import { useHistory, useLocation, Switch, Route } from "react-router-dom";
import Overclocks from "pages/overclocks/Overclocks";

const { Content } = Layout;
const { TabPane } = Tabs;

type TabName =
  | "overclocks"
  | "frameworks"
  | "skins"
  | "accessories"
  | "pickaxe";

const DEFAULT_TAB: TabName = "overclocks";

const TABS: Array<{ title: string; key: TabName; content: JSX.Element }> = [
  {
    title: "Overclocks",
    key: "overclocks",
    content: <Overclocks />,
  },
  {
    title: "Weapon Frameworks",
    key: "frameworks",
    content: <></>,
  },
  {
    title: "Weapon Skins",
    key: "skins",
    content: <></>,
  },
  {
    title: "Miner Accessories",
    key: "accessories",
    content: <></>,
  },
  {
    title: "Pickaxe Components",
    key: "pickaxe",
    content: <></>,
  },
];

export default function App() {
  const history = useHistory();
  const location = useLocation();
  return (
    <Layout>
      <Content>
        <Row>
          <Col span={18} offset={3}>
            <PageHeader
              title="DRG Completionist"
              subTitle="Rock and Stone!"
              footer={
                <Tabs
                  activeKey={location.pathname.substring(1) || DEFAULT_TAB}
                  onChange={history.push}
                >
                  {TABS.map((tab) => (
                    <TabPane tab={tab.title} key={tab.key} />
                  ))}
                </Tabs>
              }
            />
          </Col>
          <Col span={18} offset={3}>
            <Switch>
              {TABS.map((tab) => (
                <Route
                  exact
                  path={
                    [
                      `/${tab.key}`,
                      tab.key === DEFAULT_TAB ? "/" : undefined,
                    ].filter((x) => x !== undefined) as string[]
                  }
                  key={tab.key}
                >
                  {tab.content}
                </Route>
              ))}
            </Switch>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
