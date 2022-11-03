import react, { useRef, MutableRefObject } from "react"
import { useDebounceEffect, useLatest, useKeyPress } from 'ahooks';
import { cloneDeep, get } from "lodash"
import { nanoid } from "nanoid"
import { useEditorStore } from "./editorStore"

const useKeybound = () => {

  const {
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
    importData
  } = useEditorStore()

  useKeyPress(['backspace'], (e) => {
    if (selectPlugId) {
      setSelectPlugId(null);
      deletePlug(selectPlugId);
    }
  },);

  let corpIdRef = useRef<string | null>();
  useKeyPress(['ctrl.c', 'meta.c'], (e) => {
    corpIdRef.current = selectPlugId;
    //简单实现  //只保留一分钟
    setTimeout(() => {
      corpIdRef.current = null;
    }, 60 * 1000);
  },);
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
  },);

  /* ============================== 上下左右 =============================== */
  // useKeyPress(["uparrow"], (e) => {
  //   if (selectPlugId) {
  //     e.stopPropagation()
  //     changeSelectPlug("boxStyle.top", get(selectPlug?.boxStyle.top, 0) + 1)
  //   }
  // },);
  // useKeyPress(["rightarrow"], (e) => {
  //   if (selectPlugId) {
  //     e.stopPropagation()
  //     changeSelectPlug("boxStyle.left", get(selectPlug?.boxStyle.left, 0) + 1)
  //   }
  // },);
  // useKeyPress(["downarrow"], (e) => {
  //   if (selectPlugId) {
  //     e.stopPropagation()
  //     changeSelectPlug("boxStyle.top", get(selectPlug?.boxStyle.top, 0) - 1)
  //   }
  // },);
  // useKeyPress(["leftarrow"], (e) => {
  //   if (selectPlugId) {
  //     e.stopPropagation()
  //     changeSelectPlug("boxStyle.left", get(selectPlug?.boxStyle.left, 0) - 1)
  //   }
  // },);

}

export default useKeybound
