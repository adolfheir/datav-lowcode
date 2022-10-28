/* 还原对canvas的影响 */
import React, { ReactNode, useContext } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { FullScreenContainerContext } from './context';
import styles from './index.scss';

const componentName = 'restore-size';

export interface RestoreSizeProps {
  style?: CSSProperties;
  className?: string | string[];
  children: ReactNode;
}
export const RestoreSize: React.FC<RestoreSizeProps> = (props) => {
  const { style, className, children } = props;
  const { scale = 0 } = useContext(FullScreenContainerContext);

  return (
    <div
      className={cls(styles[componentName], className)}
      style={{
        width: `${100 * scale}%`,
        height: `${100 * scale}%`,
        transform: `scale(${1 / scale})`,
        transformOrigin: 'left top',
      }}
    >
      {children}
    </div>
  );
};

RestoreSize.displayName = 'RestoreSize';

export default RestoreSize;
