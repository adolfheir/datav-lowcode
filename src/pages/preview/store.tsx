import { useState, useMemo, useEffect } from 'react';
import { set } from 'lodash';
import { ChromePicker, Color, ColorResult, RGBColor } from 'react-color';
import { Message } from '@arco-design/web-react';
import { useDebounceEffect, useLatest } from 'ahooks';
import { createStore } from 'hox';
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
  const [fullScreenType, setFullScreenType] = useState<'contain' | 'cover' | 'fill' | 'x-first' | 'y-first'>('contain');

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

  /* ============================== 获取开始值 =============================== */
  useEffect(() => {
    let { page = '' } = qs.parse(location.search);
    const LOCAL_KEY = `PAGE_CONFIG_${page}`;

    try {
      let str = localStorage.getItem(LOCAL_KEY);
      let data = JSON.parse(str!);
      setPageSize(data['pageSize']);
      setBgColor(data['bgColor']);
      setBgImg(data['bgImg']);
      setFullScreenType(data['fullScreenType']);
      setPlugList(data['plugList']);
    } catch (error) {}
  }, []);

  const latestData = useLatest({
    pageSize,
    bgColor,
    bgImg,
    fullScreenType,
    plugList,
  });

  const save = () => {
    let { page = '' } = qs.parse(location.search);
    const LOCAL_KEY = `PAGE_CONFIG_${page}`;

    const { pageSize, bgColor, bgImg, fullScreenType, plugList } = latestData.current;
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        pageSize,
        bgColor,
        bgImg,
        fullScreenType,
        plugList,
      }),
    );
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
  };
});
