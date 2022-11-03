import { useState, useMemo, useEffect, useRef } from 'react';
import { set, cloneDeep } from 'lodash';
import { ChromePicker, Color, ColorResult, RGBColor } from 'react-color';
import { Message } from '@arco-design/web-react';
import { useDebounceEffect, useLatest, useKeyPress } from 'ahooks';
import download from 'downloadjs';
import { createStore } from 'hox';
import { nanoid } from 'nanoid';
import qs from 'query-string';
import { useImmer } from 'use-immer';
import { PlugIns } from './interface';

export const [useLayoutStore, LayoutStoreStore] = createStore(() => {
  const [isPlugsShow, setIsPlugsShow] = useState(true);
  const [isLayerShow, setIsLayerShow] = useState(true);
  const [isAttrShow, setIsAttrShow] = useState(true);

  return {
    isPlugsShow,
    isLayerShow,
    isAttrShow,
    setIsPlugsShow,
    setIsAttrShow,
    setIsLayerShow,
  };
});
