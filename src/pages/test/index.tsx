import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { helper } from 'echarts';
import Digital from '@common/plugs/datav/Digital';
import Table from '@common/plugs/datav/Table';
import Bar from '@common/plugs/echart/Bar';
import Line from '@common/plugs/echart/Line';
import Pie from '@common/plugs/echart/Pie';
import Text from '@common/plugs/misc/Text';
import styles from './index.scss';

const componentName = 'test';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;
  return (
    <div
      className={cls(styles[componentName], className)}
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '592px',
          height: '310px',
        }}
      >
        <Table />
      </div>
      <div
        style={{
          width: '500px',
          height: '500px',
        }}
      >
        <Text content="123" style={{ color: 'red' }} />
        <Digital />
      </div>
      <div
        style={{
          width: '500px',
          height: '500px',
        }}
      >
        <Bar />
      </div>
      <div
        style={{
          width: '500px',
          height: '500px',
        }}
      >
        <Line />
      </div>
      <div
        style={{
          width: '500px',
          height: '500px',
        }}
      >
        <Pie />
      </div>
    </div>
  );
};

Index.displayName = 'Index';

export default Index;
