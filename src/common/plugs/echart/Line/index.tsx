import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import '@common/plugs/echart/theme';
import styles from './index.scss';
import { mockOption } from './mock';

const componentName = 'Line';

export interface LineProps {
  style?: CSSProperties;
  className?: string | string[];
  options?: EChartsOption;
}
export const Line: React.FC<LineProps> = (props) => {
  const { style, className, options = mockOption } = props;
  return <ReactECharts style={{ width: '100%', height: '100%' }} option={options} theme={options['theme']} />;
};

Line.displayName = 'Line';

export default Line;
