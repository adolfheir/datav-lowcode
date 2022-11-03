import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Message, Tooltip } from '@arco-design/web-react';
import { IconAlignRight, IconExport, IconAlignCenter, IconAlignLeft } from '@arco-design/web-react/icon';
import qs from 'query-string';
import Uploader from '@components/Uploader/index';
import styles from './index.scss';
import { useLayoutStore } from './layoutStore';
import { useEditorStore } from './editorStore';

const ButtonGroup = Button.Group;

const componentName = 'left-btn-group';

export interface LeftBtnGroupProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const LeftBtnGroup: React.FC<LeftBtnGroupProps> = (props) => {
  const { style, className } = props;

  const { isPlugsShow, isAttrShow, isLayerShow, setIsLayerShow, setIsAttrShow, setIsPlugsShow } = useLayoutStore();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <ButtonGroup>
        <Tooltip content="插件">
          <Button
            type={isPlugsShow ? 'primary' : 'default'}
            icon={<IconAlignLeft />}
            onClick={() => {
              setIsPlugsShow((prev) => !prev);
            }}
          />
        </Tooltip>
        <Tooltip content="图层">
          <Button
            type={isLayerShow ? 'primary' : 'default'}
            icon={<IconAlignCenter />}
            onClick={() => {
              setIsLayerShow((prev) => !prev);
            }}
          />
        </Tooltip>
        <Tooltip content="属性">
          <Button
            type={isAttrShow ? 'primary' : 'default'}
            icon={<IconAlignRight />}
            onClick={() => {
              setIsAttrShow((prev) => !prev);
            }}
          />
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

LeftBtnGroup.displayName = 'LeftBtnGroup';

export default LeftBtnGroup;
