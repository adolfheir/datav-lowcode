import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import styles from './index.scss';

const componentName = 'error-cmp';

export interface ErrorCmpProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const ErrorCmp: React.FC<ErrorCmpProps> = (props) => {
  const { style, className } = props;
  return useMemo(
    () => (
      <div className={cls(styles[componentName], className)} style={style}>
        {'组件渲染出错'}
      </div>
    ),
    [],
  );
};

ErrorCmp.displayName = 'error-cmp';

export default ErrorCmp;
