import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import AttrSide from './AttrSide';
import LayerSide from './LayerSide';
import LeftBtnGroup from './LeftBtnGroup';
import Playground from './Playgroud';
import PlugStoreSide from './PlugStoreSide';
import RightBtnGroup from './RightBtnGroup';
import styles from './index.scss';
import { LayoutStoreStore, useLayoutStore } from './layoutStore';
import { EditorStoreProvider } from './editorStore';

const componentName = 'editor';

export interface EditorProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Editor: React.FC<EditorProps> = (props) => {
  const { style, className } = props;

  const { isPlugsShow, isAttrShow, isLayerShow } = useLayoutStore();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-toolbar`])}>
        xx大屏管理系统
        <LeftBtnGroup />
        <RightBtnGroup />
      </div>
      <div className={cls(styles[`${componentName}-wrapper`])}>
        <div className={cls(styles[`${componentName}-left`])}>
          {isPlugsShow && <PlugStoreSide />}
          {isLayerShow && <LayerSide />}
        </div>
        <div className={cls(styles[`${componentName}-view`])}>
          <Playground />
        </div>
        <div className={cls(styles[`${componentName}-right`])}>{isAttrShow && <AttrSide />}</div>
      </div>
    </div>
  );
};

Editor.displayName = 'Editor';

export default () => (
  <LayoutStoreStore>
    <EditorStoreProvider>
      <Editor />
    </EditorStoreProvider>
  </LayoutStoreStore>
);
