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
  const { content = '请输入文本', ...others } = props;
  console.log('props1', props);

  return (
    <div className={cls(styles[componentName])} {...(others as any)}>
      {content}
    </div>
  );
};

Index.displayName = 'Index';

export default Index;
