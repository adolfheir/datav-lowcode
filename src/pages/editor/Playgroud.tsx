import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import Moveable from 'react-moveable';
import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import Guides from '@scena/react-guides';
import { useScroll, useDrop, useKeyPress, useLatest } from 'ahooks';
//@ts-ignore
// import AlloyFinger from 'alloyfinger';
import { nanoid } from 'nanoid';
import styles from './index.scss';
import { Cmp } from './interface';
import { useEditorStore } from './store';

const componentName = 'playground';

export interface PlaygroundProps {
  style?: CSSProperties;
  className?: string | string[];
}

//对标avue
const DEFAULT_SCROLL_TOP = 1450;
const DEFAULT_SCROLL_LEFT = 2490;

const PAGE_WIDTH = 1920;
const PAGE_HEIGHT = 1080;

const MARGIN = 40;

export const Playground: React.FC<PlaygroundProps> = (props) => {
  const { style, className } = props;
  const { cmpList, setCmpList } = useEditorStore((store) => [store.cmpList]);

  /* ============================== 选中 =============================== */
  const [selectCmpKeyList, setSelectCmpKeyList] = useState<string[]>([]);
  const selectCmp = useMemo(() => {
    return cmpList.find(({ key }) => key === selectCmpKeyList[0]);
  }, [selectCmpKeyList, cmpList]);

  /* ============================== 辅助线 =============================== */
  const [isGuideShow, setIsGuideShow] = useState(true);
  const [guideList, setGuideList] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });

  /* ============================== transform =============================== */
  const [scale, setScale] = useState(0.5);
  const view = useRef<HTMLDivElement | null>(null);
  const scroll = useScroll(view);
  let offsetLeft = useMemo(() => {
    return DEFAULT_SCROLL_LEFT + PAGE_WIDTH / 2 - (PAGE_WIDTH / 2) * scale;
  }, [scale]);
  let offsetTop = useMemo(() => {
    return DEFAULT_SCROLL_TOP + PAGE_HEIGHT / 2 - (PAGE_HEIGHT / 2) * scale;
  }, [scale]);
  const latestTransform = useLatest({
    scale,
    offsetLeft,
    offsetTop,
  });
  useKeyPress(['meta.uparrow'], (e) => {
    e.stopPropagation();
    e.preventDefault();
    setScale((pre) => pre + 0.01);
  });
  useKeyPress(['meta.downarrow'], (e) => {
    e.stopPropagation();
    e.preventDefault();
    setScale((pre) => pre - 0.01);
  });
  useEffect(() => {
    // const fitScale =
    view.current?.scrollTo({
      left: offsetLeft - MARGIN,
      top: offsetTop - MARGIN,
    });
  }, []);
  /* ============================== drop拖拽进场 =============================== */
  const dropRef = useRef<HTMLDivElement | null>(null);
  useDrop(dropRef, {
    onDom: (data: any, e: any) => {
      const { scale, offsetLeft, offsetTop } = latestTransform.current;
      const { width = 200, height = 200 } = data;
      const { x, y } = view.current!.getBoundingClientRect();
      let { pageX, pageY } = e;
      //处理坐标
      let left = (pageX - x + (view.current!.scrollLeft! - offsetLeft)) / scale - width / 2;
      let top = (pageY - y + (view.current!.scrollTop! - offsetTop)) / scale - height / 2;
      let newCmp = {
        width: width,
        height: height,
        top: top,
        left: left,
        rotate: 0,
        key: nanoid(),
      };
      setCmpList((draft) => {
        draft.push(newCmp);
      });
    },
  });
  /* ============================== moveable =============================== */
  const moveableRef = useRef<any>(null);

  //dom 引用
  const cmpRefs = useRef<{ [key: string]: HTMLElement }>({});
  const addToRefs = (el: HTMLElement | null, key: string) => {
    if (el && !cmpRefs.current?.key) {
      cmpRefs.current[key] = el;
    }
  };
  const targetList = useMemo(() => {
    return selectCmpKeyList.map((key) => cmpRefs.current?.[key]).filter((ref) => !!ref);
  }, [selectCmpKeyList]);

  return (
    <div
      className={cls(styles[componentName], className)}
      style={style}
      onClick={(e) => {
        setSelectCmpKeyList([]);
      }}
    >
      <div className={cls(styles[`${componentName}-rule`])}>
        <div
          className={cls(styles[`${componentName}-rule-eye`])}
          onClick={() => {
            setIsGuideShow((prev) => !prev);
          }}
        >
          {!isGuideShow ? <IconEyeInvisible /> : <IconEye />}
        </div>
        <div className={cls(styles[`${componentName}-rule-w`])}>
          <Guides
            zoom={scale}
            unit={100}
            showGuides={isGuideShow}
            type="horizontal"
            negativeRuler={true}
            textAlign={'left'}
            direction="start"
            font={'10px sans-serif'}
            height={28}
            backgroundColor={'#171c28'}
            // scrollPos={0}
            lockGuides={['remove']}
            scrollPos={((scroll?.left ?? 0) - offsetLeft) / scale}
            onChangeGuides={({ guides }) => {
              setGuideList((prev) => {
                return { x: prev.x, y: guides };
              });
            }}
          />
        </div>
        <div className={cls(styles[`${componentName}-rule-h`])}>
          <Guides
            zoom={scale}
            unit={100}
            showGuides={isGuideShow}
            type="vertical"
            // negativeRuler={true}
            textAlign={'right'}
            direction="start"
            font={'10px sans-serif'}
            backgroundColor={'#171c28'}
            scrollPos={((scroll?.top ?? 0) - offsetTop) / scale}
            onChangeGuides={({ guides }) => {
              setGuideList((prev) => {
                return { x: guides, y: prev.y };
              });
            }}
          />
        </div>
      </div>
      <div className={cls(styles[`${componentName}-view`])} ref={view}>
        <div className={cls(styles[`${componentName}-scroll-area`])}>
          <Moveable
            ref={moveableRef}
            origin={false}
            draggable={true}
            resizable={true}
            rotatable={true}
            snappable={true} //是否可以将目标对齐
            snapThreshold={5} //吸附
            isDisplaySnapDigit={true}
            target={targetList}
            onDragStart={(e) => {
              e.set([selectCmp!.left, selectCmp!.top]);
            }}
            onDrag={(e) => {
              const { target, beforeTranslate } = e;
              (targetList[0] as unknown as any).position = {
                left: beforeTranslate[0],
                top: beforeTranslate[1],
              };
              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${
                selectCmp!.rotate
              }deg)`;
            }}
            onDragEnd={(e) => {
              const { target } = e;
              const position = (targetList[0] as unknown as any)?.position ?? {};
              setCmpList((draft) => {
                const matchIndex = draft.findIndex(({ key }) => key === selectCmpKeyList[0]);
                if (matchIndex !== -1) {
                  draft[matchIndex] = {
                    ...draft[matchIndex],
                    ...position,
                  };
                }
              });
            }}
            onResizeStart={({ set, setOrigin }) => {
              setOrigin(['%', '%']);
              // set([selectCmp!.left, selectCmp!.top]);
            }}
            onResize={({ target, width, height, drag }) => {
              const beforeTranslate = drag.beforeTranslate;
              (targetList[0] as unknown as any).position = {
                left: beforeTranslate[0],
                top: beforeTranslate[1],
              };
              target.style.width = `${width}px`;
              target.style.height = `${height}px`;
              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${
                selectCmp!.rotate
              }deg)`;
            }}
            onResizeEnd={({ target }) => {
              const position = (targetList[0] as unknown as any)?.position ?? {};
              setCmpList((draft) => {
                const matchIndex = draft.findIndex(({ key }) => key === selectCmpKeyList[0]);
                if (matchIndex !== -1) {
                  draft[matchIndex] = {
                    ...draft[matchIndex],
                    ...position,
                    width: target.style.width,
                    height: target.style.height,
                  };
                }
              });
            }}
            onRotateStart={({ set }) => {
              set(selectCmp!.rotate);
            }}
            onRotate={({ beforeRotation }) => {
              setCmpList((draft) => {
                const matchIndex = draft.findIndex(({ key }) => key === selectCmpKeyList[0]);
                if (matchIndex !== -1) {
                  draft[matchIndex] = {
                    ...draft[matchIndex],
                    rotate: beforeRotation,
                  };
                }
              });
            }}
            onRenderEnd={({}) => {

            }}
          />
          <div
            ref={dropRef}
            className={cls(styles[`${componentName}-canvas`])}
            style={{
              position: 'absolute',
              top: DEFAULT_SCROLL_TOP,
              left: DEFAULT_SCROLL_LEFT,
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: '50% 50% 0',
            }}
          >
            {cmpList.map(({ key, width, height, left, top, rotate }) => {
              let isSelect = selectCmpKeyList.includes(key);
              return (
                <div
                  key={key}
                  className={cls(styles[`${componentName}-frame`])}
                  ref={(el) => {
                    addToRefs(el, key);
                  }}
                  style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    transform: `translate(${left}px, ${top}px) rotate(${rotate}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelect) {
                      setSelectCmpKeyList([key]);
                      // setSelectCmpKeyList((prev) => [...prev, key]);
                    }
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Playground.displayName = 'Playground';

export default Playground;
