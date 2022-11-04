import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import '@common/plugs/echart/theme';
import styles from './index.scss';
import { mockOption } from './mock';

const componentName = 'Bar';

export interface BarProps {
  style?: CSSProperties;
  className?: string | string[];
  options?: EChartsOption;
}
export const Bar: React.FC<BarProps> = (props) => {
  const { style, className, options } = props;

  return <ReactECharts style={{ width: '100%', height: '100%' }} option={options} theme={options['theme']} />;
};

export const defaultProps = {
  options: mockOption,
};
Bar.defaultProps = defaultProps;

Bar.displayName = 'Bar';

export default Bar;
