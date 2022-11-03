import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
//@ts-ignore
import { ScrollBoard } from '@jiaminghi/data-view-react';
import styles from './index.scss';
import { config as defaultConfig } from './mock';

const componentName = 'table';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
  config?: Object;
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className, config } = props;
  return (
    <ScrollBoard
      className={cls(styles[componentName])}
      config={{
        ...config,
        ...defaultConfig,
      }}
    />
  );
};

Index.displayName = 'Index';

export default Index;
