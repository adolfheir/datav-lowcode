import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
//@ts-ignore
import { ScrollRankingBoard } from '@jiaminghi/data-view-react';
import styles from './index.scss';
import { data } from './mock';

const componentName = 'Index';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
  config: {};
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className, config } = props;
  return <ScrollRankingBoard {...props} />;
};

export const defaultProps = {
  config: {
    data: data,
  },
};

Index.defaultProps = defaultProps;

Index.displayName = 'Index';

export default Index;
