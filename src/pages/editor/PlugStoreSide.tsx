import React, { useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useDrag } from 'ahooks';
import { plugListTree } from '@common/plugs/index';
import type { Plug } from '@common/plugs/interface';
import defauleImg from './img/default.png';
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

  const [selectMenu, setSelectMenu] = useState(0);

  let plugs = plugListTree?.[selectMenu]?.plugs ?? [];

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-menu`])}>
        {plugListTree.map(({ name }, index) => {
          const isActive = selectMenu === index;
          return (
            <div
              className={cls(
                styles[`${componentName}-menu-item`],
                isActive && styles[`${componentName}-menu-item--active`],
              )}
              onClick={() => {
                setSelectMenu(index);
              }}
              key={index}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className={cls(styles[`${componentName}-plugs`])}>
        {plugs.map((plug: Plug) => {
          const { name, img = defauleImg } = plug;
          return (
            <Drag key={plug['key']} className={cls(styles[`${componentName}-plugs-item`])} data={plug}>
              <div className={cls(styles[`${componentName}-plugs-item-span`])}>{name}</div>
              <img src={img} />
            </Drag>
          );
        })}
      </div>
    </div>
  );
};

MateriaSide.displayName = 'MateriaSide';

export default MateriaSide;
