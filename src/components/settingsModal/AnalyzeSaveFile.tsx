import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import { Button, Typography, Space, Row, Upload, Col } from 'antd';
import { useCallback, useState } from 'react';
import useStore from 'data/useStore';
import { Miner } from 'utils/miner';
import parseSaveFile from 'utils/parseSaveFile';
import { MinerWeapon } from 'utils/weapons';

const { Title, Text } = Typography;

export default function AnalyzeSaveFile(props: { hide: () => void }) {
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStore();

  const setOverclocks = useCallback(
    (saveFileOverclocks: { weapon: string; name: string }[]) => {
      let overclocks = new Map<string, Set<string>>();
      saveFileOverclocks.forEach((oc) => {
        let weaponOverclocks = overclocks.get(oc.weapon);
        if (weaponOverclocks === undefined) {
          weaponOverclocks = new Set();
        }
        weaponOverclocks.add(oc.name);
        overclocks = overclocks.set(oc.weapon, weaponOverclocks);
      });
      dispatch({
        type: 'SET_OVERCLOCKS',
        payload: {
          overclocks: overclocks as ReadonlyMap<
            MinerWeapon<Miner>,
            ReadonlySet<string>
          >,
        },
      });
    },
    []
  );

  return (
    <Row justify={'center'}>
      <Space size={'middle'} direction={'vertical'}>
        <Row justify={'center'}>
          <Title level={5}>Analyze Save File</Title>
        </Row>
        <Row justify={'start'}>
          <Col span={18} offset={3}>
            <Space direction={'vertical'}>
              <Text>
                {
                  'Tired of all that clicking around just to input your current progress? Upload your save file and let Bosco do all the hard work for you!'
                }
              </Text>
              <Text>
                {'The file is located in your Steam folder by default:'}
              </Text>
              <Text code>
                {
                  'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Deep Rock Galactic\\FSD\\Saved\\SaveGames\\<steam_ID>_Player.sav'
                }
              </Text>
            </Space>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Upload
            accept=".sav"
            fileList={[]}
            beforeUpload={(f) => {
              setLoading(true);
              parseSaveFile(f)
                .then((res) => {
                  setOverclocks(res.overclocks);
                })
                .finally(() => {
                  setLoading(false);
                  props.hide();
                });
              return false;
            }}
          >
            {loading ? (
              <Button disabled size={'large'} icon={<LoadingOutlined />}>
                Analyzing...
              </Button>
            ) : (
                <Button type={'primary'} size={'large'} icon={<UploadOutlined />}>
                  Select Save File
                </Button>
              )}
          </Upload>
        </Row>
        <Row>
          <Col span={18} offset={3}>
            <Text type={'secondary'}>
              <Text strong>{'Note: '}</Text>
              {
                'The save file is analyzed locally in your browser to keep it safe from pointy-eared leaf-lovers.'
              }
            </Text>
          </Col>
        </Row>
      </Space>
    </Row>
  );
}