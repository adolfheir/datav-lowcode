import React, { ReactNode, useRef } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useSize } from 'ahooks';
import { FullScreenContainerContext } from './context';
import styles from './index.scss';

const componentName = 'full-screen-container';

export interface FullScreenContainerProps {
  style?: CSSProperties;
  resizeStyle?: CSSProperties;
  designWidth?: number;
  designHeight?: number;
  children?: ReactNode;
}

export const FullScreenContainer: React.FC<FullScreenContainerProps> = (props) => {
  const { style, resizeStyle, designWidth = 1920, designHeight = 1080, children } = props;

  // const { ref: containerRef, width: containerW = 0 } = useResizeObserver<HTMLElement>({});
  const containerRef = useRef(null);
  const size = useSize(containerRef);

  const scale = (size?.width ?? 0) / designWidth;

  return (
    <FullScreenContainerContext.Provider
      value={{
        scale: scale,
      }}
    >
      <div className={cls(styles[componentName])} style={style} ref={containerRef}>
        <div
          className={cls(styles[`${componentName}-screen`])}
          style={{
            width: designWidth,
            height: designHeight,
            transform: `scale(${scale})`,
            ...(resizeStyle || {}),
          }}
        >
          {children}
        </div>
      </div>
    </FullScreenContainerContext.Provider>
  );
};

FullScreenContainer.displayName = 'FullScreenContainer';

export default FullScreenContainer;
