import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { set } from 'lodash';
import cls from 'classnames';
import { IconLock, IconUnlock } from '@arco-design/web-react/icon';
import { useEditorStore } from './editorStore';
import styles from './index.scss';

const componentName = 'layer-side';

export interface LayerSideProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const LayerSide: React.FC<LayerSideProps> = (props) => {
  const { style, className } = props;

  const { plugList, selectPlugId, setSelectPlugId, setPlugList } = useEditorStore();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-header`])}>图层列表:</div>
      <div className={cls(styles[`${componentName}-content`])}>
        {plugList.map(({ uuid, name, selectAble = true }, index) => {
          const isSelect = selectPlugId === uuid;
          return (
            <div
              key={uuid}
              className={cls(
                styles[`${componentName}-content-item`],
                isSelect && styles[`${componentName}-content-item--active`],
              )}
              onClick={() => {
                if (selectAble) {
                  setSelectPlugId(uuid);
                }
              }}
            >
              {index + 1}.{name}
              <div
                className={cls(styles[`${componentName}-content-item-lock`])}
                onClick={(e) => {
                  e.stopPropagation();

                  setPlugList((draft) => {
                    const matchIndex = draft.findIndex(({ uuid: _uuid }) => uuid === _uuid);
                    if (matchIndex !== -1) {
                      set(draft[matchIndex], 'selectAble', !selectAble);
                    }
                  });
                  if (isSelect && selectAble) {
                    setSelectPlugId(null);
                  }
                }}
              >
                {!selectAble ? <IconLock /> : <IconUnlock />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

LayerSide.displayName = 'LayerSide';

export default LayerSide;
