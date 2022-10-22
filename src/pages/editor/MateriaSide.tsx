import React, { useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useDrag } from 'ahooks';
import { plugList } from '@common/plugs/index';
import styles from './index.scss';

const componentName = 'materia-side';

interface BoxProps {
  data: Object;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string | string[];
}

const Drag = ({ data, children, style = {}, className }: BoxProps) => {
  const dragRef = useRef(null);
  const [dragging, setDragging] = useState<string | null>(null);
  // const [isDrag, dragActions] = appStore.useModel('drag')
  // const [isDrag] = store.useModelState('drag');
  // const dragActions = appStore.useModelDispatchers('drag')
  useDrag(data, dragRef, {
    onDragStart: (data) => {},
    onDragEnd: () => {
      setDragging(null);
    },
  });
  const opacity = dragging ? 0.8 : 1;
  return (
    <div ref={dragRef} className={cls(styles[componentName], className)} style={{ ...style, opacity }}>
      {children}
    </div>
  );
};

export interface MateriaSideProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const MateriaSide: React.FC<MateriaSideProps> = (props) => {
  const { style, className } = props;

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      {plugList.map((data) => {
        return (
          <Drag key={data['key']} className={cls(styles[`${componentName}-item`])} data={data}>
            <img src={data['img']} />
          </Drag>
        );
      })}
    </div>
  );
};

MateriaSide.displayName = 'MateriaSide';

export default MateriaSide;
