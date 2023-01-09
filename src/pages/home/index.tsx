import React, { useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Modal } from '@arco-design/web-react';
import { IconFolderAdd, IconOrderedList, IconApps, IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useLocalStorageState } from 'ahooks';
import { nanoid } from 'nanoid';
import openModal from '@common/utils/openModal';
import CreatModal from './CreatModal';
import img404 from './img/image-404.png';
import styles from './index.scss';
import { Page } from './interface';
import mock from './mock.json';

const Row = Grid.Row;
const Col = Grid.Col;

const componentName = 'home';

const LOCAL_KEY = 'LOWCODE-PAGE';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;

  const [_pageList, setPageList] = useLocalStorageState<Page[]>(LOCAL_KEY, {
    defaultValue: [],
  });
  const pageList = useMemo(() => {
    return [
      ..._pageList.filter((v) => v['uuid'] !== 'test-jGo1N3PaVoYVaDBWueDMj'),
      {
        uuid: 'test-jGo1N3PaVoYVaDBWueDMj',
        name: '测试页面',
        img: '',
      },
    ];
  }, []);
  useEffect(() => {
    localStorage.setItem(`PAGE_CONFIG_${'test-jGo1N3PaVoYVaDBWueDMj'}`, JSON.stringify(mock));
  }, []);

  const navigator = useNavigate();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-left`])}>
        <div className={cls(styles[`${componentName}-left-creat`])}>
          <Button
            type="outline"
            onClick={() => {
              let { destroy } = openModal(CreatModal, {
                onClose: (isOk, name) => {
                  if (isOk && name) {
                    setPageList([
                      ...pageList,
                      {
                        uuid: nanoid(),
                        name: name,
                        img: '',
                      },
                    ]);
                  }
                  destroy();
                },
              });
            }}
          >
            <IconFolderAdd />
            新建
          </Button>
        </div>
        <div className={cls(styles[`${componentName}-left-menu`])}>
          <div
            className={cls(
              styles[`${componentName}-left-menu-item`],
              styles[`${componentName}-left-menu-item--active`],
            )}
          >
            <IconOrderedList />
            项目
          </div>
          <div className={cls(styles[`${componentName}-left-menu-item`])} style={{ cursor: 'not-allowed' }}>
            <IconApps />
            物料管理
          </div>
        </div>
      </div>

      <div className={cls(styles[`${componentName}-list`])}>
        <Row gutter={[24, 12]}>
          {pageList.map(({ uuid, name, img }) => {
            return (
              <Col span={6} key={uuid}>
                <div className={cls(styles[`${componentName}-list-item`])}>
                  <div className={cls(styles[`${componentName}-list-item-img`])}>
                    <img src={img404} alt="" />
                  </div>
                  <div className={cls(styles[`${componentName}-list-item-info`])}>
                    <span>{name}</span>
                    <span>
                      <Button
                        shape="circle"
                        icon={<IconEdit />}
                        style={{ marginRight: '12px' }}
                        onClick={() => {
                          navigator(`/editor?page=${uuid}`, {});
                        }}
                      />
                      <Button
                        shape="circle"
                        icon={<IconDelete />}
                        onClick={() => {
                          Modal.confirm({
                            title: '确认删除？',
                            content: '删除后大屏数据不可恢复',
                            okButtonProps: {
                              status: 'danger',
                            },
                            onOk: () => {
                              setPageList(pageList.filter((v) => v['uuid'] !== uuid));
                            },
                          });
                        }}
                      />
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

Index.displayName = 'Index';

export default Index;
