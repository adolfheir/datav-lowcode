import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconSend, IconExport, IconImport, IconSave } from '@arco-design/web-react/icon';
import qs from 'query-string';
import styles from './index.scss';
import { useEditorStore } from './store';

const ButtonGroup = Button.Group;

const componentName = 'left-btn-group';

export interface LeftBtnGroupProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const LeftBtnGroup: React.FC<LeftBtnGroupProps> = (props) => {
  const { style, className } = props;

  const { save } = useEditorStore();
  const navigator = useNavigate();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <ButtonGroup>
        <Tooltip content="导入">
          <Button
            type="primary"
            icon={<IconImport />}
            onClick={() => {
              save();
            }}
          />
        </Tooltip>
        <Tooltip content="导出">
          <Button
            type="primary"
            icon={<IconExport />}
            onClick={() => {
              save();
            }}
          />
        </Tooltip>
        <Tooltip content="保存">
          <Button
            type="primary"
            icon={<IconSave />}
            onClick={() => {
              save();
            }}
          />
        </Tooltip>
        <Tooltip content="预览">
          <Button
            type="primary"
            icon={<IconSend />}
            onClick={() => {
              let { page = '' } = qs.parse(location.search);
              navigator(`/preview?page=${page}`, {});
            }}
          />
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

LeftBtnGroup.displayName = 'LeftBtnGroup';

export default LeftBtnGroup;
