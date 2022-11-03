import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import '@common/plugs/echart/theme';
import styles from './index.scss';
import { mockOption } from './mock';

const componentName = 'Pie';

export interface PieProps {
  style?: CSSProperties;
  className?: string | string[];
  options?: EChartsOption;
}
export const Pie: React.FC<PieProps> = (props) => {
  const { style, className, options = mockOption } = props;

  return <ReactECharts style={{ width: '100%', height: '100%' }} option={options} theme={options['theme']} />;
};

Pie.displayName = 'Pie';

export default Pie;
