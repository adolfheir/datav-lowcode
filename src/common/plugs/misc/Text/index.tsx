import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import styles from './index.scss';

const componentName = 'test';

export interface IndexProps {
  content?: string;
  style?: CSSProperties;
  className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { content, ...others } = props;

  return (
    <div className={cls(styles[componentName])} {...(others as any)}>
      {content}
    </div>
  );
};

export const defaultProps = {
  content: '请输入文本',
};

Index.defaultProps = defaultProps;

Index.displayName = 'Index';

export default Index;
