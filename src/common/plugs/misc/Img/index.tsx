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

export const defaultProps = {
  src: 'https://imgsa.baidu.com/forum/pic/item/aa64034f78f0f736a4a890f80955b319eac413f0.jpg',
};

Index.defaultProps = defaultProps;

Index.displayName = 'Index';

export default Index;
