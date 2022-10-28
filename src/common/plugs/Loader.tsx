import React, { useMemo } from 'react';
import { createLoadable } from '@components/CreateLoadable';
import type { PlugIns } from './interface';

//简单实现loader
interface IProps {
  ins: PlugIns;
}

export const Loader = ({ ins }: IProps) => {
  const { loader, uuid } = ins;

  const Editor = useMemo(() => {
    return createLoadable(() => import(`./${loader}`));
  }, [loader]);

  return <Editor key={uuid} />;
};

export default Loader;
