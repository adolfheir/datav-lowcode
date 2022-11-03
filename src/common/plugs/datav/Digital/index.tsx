import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
//@ts-ignore
import { DigitalFlop } from '@jiaminghi/data-view-react';
import styles from './index.scss';
import { data } from './mock';

const componentName = 'digital';

export interface IndexProps {
  style?: CSSProperties;
  className?: string;
  config?: Object;
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className, config = {} } = props;
  return (
    <div style={style} className={cls(componentName, className)}>
      <DigitalFlop
        //@ts-ignore
        config={{
          ...data,
          ...config,
        }}
      />
    </div>
  );
};

Index.displayName = 'Index';

export default Index;
