import OverclockIcon from "./OverclockIcon";
import { Overclock } from "./OverclockData";
import { Card, Col, Divider, Image, Row, Tooltip, Typography } from "antd";
import { MinerWeaponOutlines } from "assets/weapons";
import { Miner } from "utils/miner";
import { MinerWeapon } from "utils/weapons";
import Meta from "antd/lib/card/Meta";
import OverclockPrice from "./OverclockPrice";

const { Paragraph, Text, Title } = Typography;

export default function OverclockCardPopover(props: {
  overclock: Overclock;
  weapon: MinerWeapon<Miner>;
}) {
  return (
    <Card bordered={false} style={{ width: 400 }}>
      <Meta
        style={{}}
        description={
          <Row align={"middle"} justify={"space-around"}>
            <Col span={18}>
              <Title level={4}>{props.overclock.name}</Title>
            </Col>
            <Col span={6}>
              <Tooltip placement={"bottomRight"} title={props.weapon}>
                <Image
                  src={MinerWeaponOutlines[props.weapon]}
                  preview={false}
                  style={{ height: 50, width: "auto" }}
                />
              </Tooltip>
            </Col>
          </Row>
        }
      />
      <Divider style={{ marginTop: "12px", marginBottom: "24px" }} />
      <OverclockIcon overclock={props.overclock} />
      <Divider dashed />
      {props.overclock.effects.buffs.map((buff) => (
        <Row key={buff} justify={"center"}>
          <Col>
            <Text strong type={"success"}>
              {buff}
            </Text>
          </Col>
        </Row>
      ))}
      {props.overclock.effects.nerfs.map((nerf) => (
        <Row key={nerf} justify={"center"}>
          <Col>
            <Text strong type={"danger"}>
              {nerf}
            </Text>
          </Col>
        </Row>
      ))}
      <Divider dashed />
      <Paragraph>{props.overclock.description}</Paragraph>
      <Divider dashed />
      <OverclockPrice overclock={props.overclock} />
    </Card>
  );
}
