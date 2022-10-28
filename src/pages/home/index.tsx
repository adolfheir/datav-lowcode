import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@arco-design/web-react';
import { IconFolderAdd, IconOrderedList, IconApps, IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useLocalStorageState } from 'ahooks';
import { nanoid } from 'nanoid';
import styles from './index.scss';
import { Page } from './interface';

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

  const [pageList, setPageList] = useLocalStorageState<Page[]>(LOCAL_KEY, {
    defaultValue: [],
  });

  const navigator = useNavigate();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-left`])}>
        <div className={cls(styles[`${componentName}-left-creat`])}>
          <Button
            type="outline"
            onClick={() => {
              setPageList([
                ...pageList,
                {
                  uuid: nanoid(),
                  name: `大图`,
                  img: '',
                },
              ]);
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
                    <img src="" alt="" />
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
                      <Button shape="circle" icon={<IconDelete />} />
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
