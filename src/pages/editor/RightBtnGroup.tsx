import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Message, Tooltip } from '@arco-design/web-react';
import { IconSend, IconExport, IconImport, IconSave } from '@arco-design/web-react/icon';
import qs from 'query-string';
import Uploader from '@components/Uploader/index';
import styles from './index.scss';
import { useEditorStore } from './editorStore';

const ButtonGroup = Button.Group;

const componentName = 'right-btn-group';

export interface RightBtnGroupProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const RightBtnGroup: React.FC<RightBtnGroupProps> = (props) => {
  const { style, className } = props;

  const { save, exportData, importData } = useEditorStore();
  const navigator = useNavigate();

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <ButtonGroup>
        <Uploader
          style={{ display: 'inline' }}
          onSelect={async (files) => {
            if (files[0]) {
              //获取文件
              const reader = new FileReader();
              reader.onload = () => {
                const text = reader.result;
                try {
                  let json = JSON.parse(text as string);
                  importData(json);
                } catch (error) {
                  Message.error('非法文件');
                }

                console.log('text', text);
              };
              reader.onerror = () => {
                Message.error('非法文件');
              };
              reader.readAsText(files[0]);
            }
          }}
        >
          <Tooltip content="导入">
            <Button type="primary" icon={<IconImport />} />
          </Tooltip>
        </Uploader>
        <Tooltip content="导出">
          <Button
            type="primary"
            icon={<IconExport />}
            onClick={() => {
              exportData();
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
              save()
              let { page = '' } = qs.parse(location.search);
              navigator(`/preview?page=${page}`, {});
            }}
          />
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

RightBtnGroup.displayName = 'RightBtnGroup';

export default RightBtnGroup;
