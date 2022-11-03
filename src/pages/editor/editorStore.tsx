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

export const [useEditorStore, EditorStoreProvider] = createStore(() => {
  /* ============================== 页面信息 =============================== */
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: 1920,
    height: 1080,
  });
  const [bgColor, setBgColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });
  const [bgImg, setBgImg] = useState('');
  const [fullScreenType, setFullScreenType] = useState<'fit' | 'x-first' | 'y-first' | 'resize'>('fit');

  /* ============================== 组件 =============================== */
  const [plugList, setPlugList] = useImmer<PlugIns[]>([]);
  const [selectPlugId, setSelectPlugId] = useState<string | null>(null);
  const latestSelectPlugId = useLatest(selectPlugId);
  //目前只能单选
  const selectPlug = useMemo(() => {
    return plugList.find(({ uuid }) => uuid === selectPlugId);
  }, [selectPlugId, plugList]);
  const changeSelectPlug = (path: string, value: any) => {
    setPlugList((draft) => {
      const selectPlugId = latestSelectPlugId.current;
      const matchIndex = draft.findIndex(({ uuid }) => uuid === selectPlugId);
      if (matchIndex !== -1) {
        set(draft[matchIndex], path, value);
      }
    });
  };
  const deletePlug = async (id: string) => {
    setPlugList((pre) => {
      return pre.filter(({ uuid }) => uuid !== id);
    });
  };
  /* ============================== 快捷键 =============================== */
  useKeyPress(['backspace'], (e) => {
    if (selectPlugId) {
      setSelectPlugId(null);
      deletePlug(selectPlugId);
    }
  });

  let corpIdRef = useRef<string | null>();
  useKeyPress(['ctrl.c', 'meta.c'], (e) => {
    corpIdRef.current = selectPlugId;
    //简单实现  //只保留一分钟
    setTimeout(() => {
      corpIdRef.current = null;
    }, 60 * 1000);
  });
  useKeyPress(['ctrl.v', 'meta.v'], (e) => {
    let matchPlug = plugList.find(({ uuid }) => uuid === corpIdRef.current);
    if (matchPlug) {
      let newPlug = cloneDeep(matchPlug);
      newPlug['uuid'] = nanoid();
      newPlug['boxStyle']['top'] = newPlug['boxStyle']['top'] + 50;
      newPlug['boxStyle']['left'] = newPlug['boxStyle']['left'] + 50;
      setPlugList((pre) => {
        return [...pre, newPlug];
      });
      corpIdRef.current = null;
    }
  });

  /* ============================== 获取开始值 =============================== */
  const latestData = useLatest({
    pageSize,
    bgColor,
    bgImg,
    fullScreenType,
    plugList,
  });
  const json2state = (data: any) => {
    setPageSize(data['pageSize']);
    setBgColor(data['bgColor']);
    setBgImg(data['bgImg']);
    setFullScreenType(data['fullScreenType']);
    setPlugList(data['plugList']);
  };
  const state2json = () => {
    const { pageSize, bgColor, bgImg, fullScreenType, plugList } = latestData.current;
    let data = JSON.stringify({
      pageSize,
      bgColor,
      bgImg,
      fullScreenType,
      plugList,
    });
    return data;
  };
  useEffect(() => {
    let { page = '' } = qs.parse(location.search);
    const LOCAL_KEY = `PAGE_CONFIG_${page}`;
    try {
      let str = localStorage.getItem(LOCAL_KEY);
      let data = JSON.parse(str!);
      json2state(data);
    } catch (error) {}
  }, []);

  const save = () => {
    let { page = '' } = qs.parse(location.search);
    const LOCAL_KEY = `PAGE_CONFIG_${page}`;
    localStorage.setItem(LOCAL_KEY, state2json());
  };

  const exportData = () => {
    let { page = '' } = qs.parse(location.search);
    download(state2json(), `${page}.json`);
  };
  const importData = (data: any) => {
    json2state(data);
  };

  useDebounceEffect(
    () => {
      save();
    },
    [pageSize, bgColor, bgImg, fullScreenType, plugList],
    {
      wait: 200,
      maxWait: 1000,
    },
  );

  return {
    /* bgcolor */
    pageSize,
    setPageSize,
    bgColor,
    setBgColor,
    bgImg,
    setBgImg,
    fullScreenType,
    setFullScreenType,

    /* 插件 */
    plugList,
    setPlugList,

    selectPlugId,
    setSelectPlugId,
    selectPlug,
    changeSelectPlug,
    deletePlug,

    /* misc */
    save,
    exportData,
    importData,
  };
});
