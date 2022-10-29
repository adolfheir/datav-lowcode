import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import AttrSide from './AttrSide';
import LeftBtnGroup from './LeftBtnGroup';
import Playground from './Playgroud';
import PlugStoreSide from './PlugStoreSide';
import styles from './index.scss';
import { EditorStoreProvider } from './store';

const componentName = 'editor';

export interface EditorProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Editor: React.FC<EditorProps> = (props) => {
  const { style, className } = props;

  return (
    <EditorStoreProvider>
      <div className={cls(styles[componentName], className)} style={style}>
        <div className={cls(styles[`${componentName}-toolbar`])}>
          xx大屏管理系统
          <LeftBtnGroup />
        </div>
        <div className={cls(styles[`${componentName}-wrapper`])}>
          <div className={cls(styles[`${componentName}-left`])}>
            <PlugStoreSide />
          </div>
          <div className={cls(styles[`${componentName}-view`])}>
            <Playground />
          </div>
          <div className={cls(styles[`${componentName}-right`])}>
            <AttrSide />
          </div>
        </div>
      </div>
    </EditorStoreProvider>
  );
};

Editor.displayName = 'Editor';

export default Editor;
