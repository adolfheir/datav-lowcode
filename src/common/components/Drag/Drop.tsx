import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useDrop } from 'ahooks';
import styles from './index.scss';

const componentName = 'drop';

export interface DropProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: React.ReactNode;
  onDom?: (content: any, e: any) => void;
}
export const Drop: React.FC<DropProps> = (props) => {
  const { style, className, children } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  let opacity = 1;

  useDrop(ref, {
    onText: (text, e) => {
      console.log(text);
    },
    onFiles: (files, e) => {
      console.log(e, files);
    },
    onUri: (uri, e) => {
      console.log(e);
    },
    onDom: (content: any, e: any) => {
      //处理坐标
    },
  });

  // if (isDrag) {
  //   opacity = 0.9;
  // }
  // if (isHovering) {
  //   opacity = 0.85;
  // }

  return (
    <div className={cls(styles[componentName], className)} style={{ ...(style ?? {}), opacity }}>
      <div className={cls(styles[`${componentName}-content`])} ref={ref}>
        {children}
      </div>
    </div>
  );
};

Drop.displayName = 'Drop';

export default Drop;
