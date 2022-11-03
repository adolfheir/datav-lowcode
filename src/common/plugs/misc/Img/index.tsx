import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import styles from './index.scss';

const componentName = 'Index';

export interface IndexProps extends HTMLImageElement {
  // style?: CSSProperties;
  // className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;
  return <image {...(props as any)} />;
};

Index.displayName = 'Index';

export default Index;
