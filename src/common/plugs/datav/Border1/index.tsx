import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
//@ts-ignore
import { BorderBox1 } from '@jiaminghi/data-view-react';
import styles from './index.scss';

const componentName = 'loading';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;
  return <BorderBox1></BorderBox1>;
};

Index.displayName = 'Index';

export default Index;
