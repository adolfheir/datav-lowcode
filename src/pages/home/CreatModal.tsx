import React, { useState } from 'react';
import cls from 'classnames';
import { Form, Input, Message, Modal, Select } from '@arco-design/web-react';
import type { ModalProps } from '@arco-design/web-react';
import styles from './index.scss';

const componentName = 'home-creat';

export interface CreatModalProps {
  visible: boolean;
  onClose: (isOk: boolean, name?: string) => void;
  afterClose: () => void;
  unmountOnExit?: boolean;
}
export const CreatModal: React.FC<CreatModalProps> = (props) => {
  const { visible = true, onClose, afterClose, unmountOnExit = false } = props;

  const [name, setName] = useState('');

  return (
    <Modal
      title={<div style={{ textAlign: 'left' }}>弹窗</div>}
      visible={visible}
      onOk={async () => {
        if (name.trim() === '') {
          Message.error('请输入名称');
          return;
        }
        onClose(true, name);
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
      <Input
        style={{ width: 350 }}
        allowClear
        placeholder="请输入名称"
        value={name}
        onChange={(value) => {
          setName(value);
        }}
      />
      ;
    </Modal>
  );
};
CreatModal.displayName = 'CreatModal';

export default CreatModal;
