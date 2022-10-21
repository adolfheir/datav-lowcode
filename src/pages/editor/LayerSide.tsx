import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import styles from './index.scss';

const componentName = 'layer-side';

export interface LayerSideProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const LayerSide: React.FC<LayerSideProps> = (props) => {
  const { style, className } = props;
  return useMemo(() => <div className={cls(styles[componentName], className)} style={style}></div>, []);
};

LayerSide.displayName = 'LayerSide';

export default LayerSide;
