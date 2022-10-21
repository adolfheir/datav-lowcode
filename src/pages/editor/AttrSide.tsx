import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import styles from './index.scss';

const componentName = 'attr-side';

export interface AttrSideProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const AttrSide: React.FC<AttrSideProps> = (props) => {
  const { style, className } = props;
  return useMemo(() => <div className={cls(styles[componentName], className)} style={style}></div>, []);
};

AttrSide.displayName = 'AttrSide';

export default AttrSide;
