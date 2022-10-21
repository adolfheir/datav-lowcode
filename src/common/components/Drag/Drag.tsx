import React, { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useDrag } from 'ahooks';
import styles from './index.scss';

const componentName = 'Drag';

export interface DragProps {
  data: Object;
  style?: CSSProperties;
  className?: string | string[];
  children?: React.ReactNode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}
export const Drag: React.FC<DragProps> = (props) => {
  const { data, children, style = {}, className } = props;
  const dragRef = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  useDrag(data, dragRef, {
    onDragStart: (data) => {
      setDragging(true);
      props?.onDragStart?.();
    },
    onDragEnd: () => {
      setDragging(false);
      props?.onDragEnd?.();
    },
  });
  const opacity = dragging ? 0.8 : 1;
  return (
    <div ref={dragRef} className={cls(styles[componentName], className)} style={{ ...style, opacity }}>
      {children}
    </div>
  );
};

Drag.displayName = 'Drag';

export default Drag;
