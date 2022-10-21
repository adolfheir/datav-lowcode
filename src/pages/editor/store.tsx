import { useState } from 'react';
import { createStore } from 'hox';
import { useImmer } from 'use-immer';
import { Cmp } from './interface';

export const [useEditorStore, EditorStoreProvider] = createStore(() => {
  const [cmpList, setCmpList] = useImmer<Cmp[]>([]);

  return {
    cmpList,
    setCmpList,
  };
});
