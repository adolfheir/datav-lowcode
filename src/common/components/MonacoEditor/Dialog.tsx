import React, { useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { Form, Input, Modal, Select } from '@arco-design/web-react';
import type { ModalProps } from '@arco-design/web-react';
import { useKeyPress } from 'ahooks';
import Editor from './index';
import styles from './index.scss';

const componentName = 'monaco-editor-dialog';

export interface MonacoEditorDialogProps {
  visible: boolean;
  onClose: (isOk: boolean, code?: string) => void;
  afterClose: () => void;
  unmountOnExit?: boolean;

  code: string;
}
export const MonacoEditorDialog: React.FC<MonacoEditorDialogProps> = (props) => {
  const { visible = true, onClose, afterClose, unmountOnExit = false } = props;

  const [code, setCode] = useState(props.code);
  const editorRef = useRef<any>();

  useKeyPress(
    ['meta.s', 'ctrl.s'],
    (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      console.log('das');
      // onClose(true, code);
    },
    {
      target: window,
      // exactMatch: true,
    },
  );

  return (
    <Modal
      title={<div style={{ textAlign: 'left' }}>代码编辑器</div>}
      visible={visible}
      onOk={async () => {
        onClose(true, code);
      }}
      onCancel={() => {
        onClose(false);
      }}
      autoFocus={false}
      focusLock={true}
      mountOnEnter={false}
      afterClose={afterClose}
      unmountOnExit={unmountOnExit}
      className={cls(styles[`${componentName}`])}
    >
      <div className={cls(styles[`${componentName}__body`])}>
        <Editor
          language="typescript"
          theme="vs-dark"
          value={code}
          // height={'100%'}
          onChange={(code) => {
            setCode(code as unknown as string);
            // setCode(code);
          }}
          options={{
            selectOnLineNumbers: true,
            matchBrackets: 'near',
            automaticLayout: true,
            folding: true,
            foldingImportsByDefault: true,
          }}
          onMount={(editor) => {
            //@ts-ignore
            editorRef.current = editor;
          }}
        />
      </div>
    </Modal>
  );
};
MonacoEditorDialog.displayName = 'MonacoEditorDialog';

export default MonacoEditorDialog;
