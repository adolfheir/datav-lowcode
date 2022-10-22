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
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className, ...config } = props;
  return (
    <ScrollRankingBoard
      config={{
        data: data,
        config,
      }}
    />
  );
};

Index.displayName = 'Index';

export default Index;
