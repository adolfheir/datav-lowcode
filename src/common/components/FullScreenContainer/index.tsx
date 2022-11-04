import React, { ReactNode, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import cls from 'classnames';
import Scrollbars from 'react-custom-scrollbars';
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
  objectFit?: 'contain' | 'cover' | 'fill' | 'x-first' | 'y-first';
}

export const FullScreenContainer: React.FC<FullScreenContainerProps> = (props) => {
  const { style, resizeStyle, designWidth = 1920, designHeight = 1080, objectFit = 'contain', children } = props;

  const containerRef = useRef(null);
  const size = useSize(containerRef);

  const [scalex, scaley] = useMemo(() => {
    let scalex = (size?.width ?? 0) / designWidth;
    let scaley = (size?.height ?? 0) / designHeight;

    if (objectFit == 'contain') {
      if (scalex > scaley) {
        scalex = scaley;
      } else {
        scaley = scalex;
      }
    }

    if (objectFit === 'cover') {
      if (scalex < scaley) {
        scalex = scaley;
      } else {
        scaley = scalex;
      }
    }

    if (objectFit === 'fill') {
    }

    if (objectFit === 'x-first') {
      scaley = scalex;
    }

    if (objectFit === 'y-first') {
      scalex = scaley;
    }

    return [scalex, scaley];
  }, [size]);

  return (
    <FullScreenContainerContext.Provider
      value={{
        scalex,
        scaley,
      }}
    >
      <div
        className={cls(styles[componentName])}
        style={{
          ...(style ?? {}),
          overflow: 'scroll',
        }}
        ref={containerRef}
      >
        <Scrollbars>
          <div
            className={cls(styles[`${componentName}-box`])}
            style={{
              width: scalex * designWidth,
              height: scaley * designHeight,
            }}
          >
            <div
              className={cls(styles[`${componentName}-screen`])}
              style={{
                width: designWidth,
                height: designHeight,
                transform: `scaleX(${scalex}) scaleY(${scaley})`,
                ...(resizeStyle || {}),
              }}
            >
              {children}
            </div>
          </div>
        </Scrollbars>
      </div>
    </FullScreenContainerContext.Provider>
  );
};

FullScreenContainer.displayName = 'FullScreenContainer';

export default FullScreenContainer;
