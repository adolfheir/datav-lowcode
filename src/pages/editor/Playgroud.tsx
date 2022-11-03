import React, { useContext, useEffect, useMemo, useRef, useState, MutableRefObject } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import Moveable from 'react-moveable';
import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import Guides from '@scena/react-guides';
import { useScroll, useDrop, useKeyPress, useLatest } from 'ahooks';
import { nanoid } from 'nanoid';
import Loader from '@common/plugs/Loader';
import { useEditorStore } from './editorStore';
import styles from './index.scss';
import { Plug, PlugIns } from './interface';
import useKeybound from './useKeybound';

const componentName = 'playground';

export interface PlaygroundProps {
  style?: CSSProperties;
  className?: string | string[];
}

//对标avue
const DEFAULT_SCROLL_TOP = 1450;
const DEFAULT_SCROLL_LEFT = 2490;

// const PAGE_WIDTH = 1920;
// const PAGE_HEIGHT = 1080;

const MARGIN = 40;

export const Playground: React.FC<PlaygroundProps> = (props) => {
  const { style, className } = props;
  const { pageSize, bgColor, bgImg, plugList, setPlugList, selectPlug, selectPlugId, setSelectPlugId, deletePlug } =
    useEditorStore();
  const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = pageSize;
  const view = useRef<HTMLDivElement>(null);
  /* ============================== 辅助线 =============================== */
  const [isGuideShow, setIsGuideShow] = useState(true);
  const [guideList, setGuideList] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });

  // const verticalGuidelines = useMemo(() => {
  //   return plugList.map((v) => v['boxStyle']['left']);
  // }, [plugList]);
  // const horizontalGuidelines = useMemo(() => {
  //   return plugList.map((v) => v['boxStyle']['top']);
  // }, [plugList]);

  /* ============================== transform =============================== */
  const [scale, setScale] = useState(0.5);

  const scroll = useScroll(view);
  let { offsetLeft, offsetTop } = useMemo(() => {
    let offsetLeft = DEFAULT_SCROLL_LEFT + PAGE_WIDTH / 2 - (PAGE_WIDTH / 2) * scale;
    let offsetTop = DEFAULT_SCROLL_TOP + PAGE_HEIGHT / 2 - (PAGE_HEIGHT / 2) * scale;
    return { offsetLeft, offsetTop };
  }, [scale]);
  const latestTransform = useLatest({
    scale,
    offsetLeft,
    offsetTop,
  });
  useKeyPress(['meta.uparrow'], (e) => {
    e.stopPropagation();
    e.preventDefault();
    setScale((pre) => pre + 0.02);
  });
  useKeyPress(['meta.downarrow'], (e) => {
    e.stopPropagation();
    e.preventDefault();
    setScale((pre) => pre - 0.02);
  });
  useEffect(() => {
    view.current?.scrollTo({
      left: offsetLeft - MARGIN,
      top: offsetTop - MARGIN,
    });
  }, []);
  /* ============================== drop拖拽进场 =============================== */
  const dropRef = useRef<HTMLDivElement | null>(null);
  useDrop(dropRef, {
    onDom: (plug: Plug, e: any) => {
      const { scale, offsetLeft, offsetTop } = latestTransform.current;
      const { width = 200, height = 200 } = plug?.boxStyle ?? {};
      const { x, y } = view.current!.getBoundingClientRect();
      let { pageX, pageY } = e;
      //处理坐标
      let left = (pageX - x + (view.current!.scrollLeft! - offsetLeft)) / scale - width / 2;
      let top = (pageY - y + (view.current!.scrollTop! - offsetTop)) / scale - height / 2;

      let newBoxStyle = {
        width,
        height,
        top,
        left,
        rotate: 0,
        animate: null,
      };

      setPlugList((draft) => {
        draft.push({ ...plug, boxStyle: newBoxStyle, selectAble: true, uuid: nanoid() });
      });
    },
  });
  /* ============================== moveable =============================== */
  const moveableRef = useRef<any>(null);

  //dom 引用
  const plugRefs = useRef<{ [key: string]: HTMLElement }>({});
  const addToRefs = (el: HTMLElement | null, key: string) => {
    if (el && !plugRefs.current?.key) {
      plugRefs.current[key] = el;
    }
  };
  const targetList = useMemo(() => {
    return selectPlugId ? [plugRefs.current?.[selectPlugId]] : [];
  }, [selectPlugId]);

  /* ============================== 快捷键 =============================== */
  useKeybound();

  return (
    <div
      className={cls(styles[componentName], className)}
      style={style}
      onClick={(e) => {
        setSelectPlugId(null);
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
            elementGuidelines={Object.values(plugRefs.current)}
            target={targetList}
            onDragStart={(e) => {
              e.set([selectPlug!.boxStyle.left, selectPlug!.boxStyle.top]);
            }}
            onDrag={(e) => {
              const { target, beforeTranslate } = e;
              (targetList[0] as unknown as any).position = {
                left: beforeTranslate[0],
                top: beforeTranslate[1],
              };
              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${
                selectPlug!.boxStyle.rotate
              }deg)`;
            }}
            onDragEnd={(e) => {
              const { target } = e;
              const position = (targetList[0] as unknown as any)?.position ?? {};
              setPlugList((draft) => {
                const matchIndex = draft.findIndex(({ uuid }) => uuid === selectPlugId);
                if (matchIndex !== -1) {
                  draft[matchIndex]['boxStyle'] = {
                    ...draft[matchIndex]['boxStyle'],
                    ...position,
                  };
                }
              });
            }}
            onResizeStart={({ set, setOrigin }) => {
              setOrigin(['%', '%']);
              // set([selectPlug!.left, selectPlug!.top]);
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
                selectPlug!.boxStyle.rotate
              }deg)`;
            }}
            onResizeEnd={({ target }) => {
              const position = (targetList[0] as unknown as any)?.position ?? {};
              setPlugList((draft) => {
                const matchIndex = draft.findIndex(({ uuid }) => uuid === selectPlugId);
                if (matchIndex !== -1) {
                  draft[matchIndex]['boxStyle'] = {
                    ...draft[matchIndex]['boxStyle'],
                    ...position,
                    width: parseFloat(target.style.width),
                    height: parseFloat(target.style.height),
                  };
                }
              });
            }}
            onRotateStart={({ set }) => {
              set(selectPlug!.boxStyle.rotate);
            }}
            onRotate={({ beforeRotation }) => {
              setPlugList((draft) => {
                const matchIndex = draft.findIndex(({ uuid }) => uuid === selectPlugId);
                if (matchIndex !== -1) {
                  draft[matchIndex]['boxStyle'] = {
                    ...draft[matchIndex]['boxStyle'],
                    rotate: Math.round(beforeRotation),
                  };
                }
              });
            }}
            onRenderEnd={({}) => {}}
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
            {/* 实现bg */}
            {bgImg && (
              <div className={cls(styles[`${componentName}-frame-bg`])} style={{ backgroundImage: `url(${bgImg})` }} />
            )}
            {plugList.map((plugIns) => {
              const { uuid, boxStyle, selectAble = true } = plugIns;
              let isSelect = uuid === selectPlugId;
              const { width, height, left, rotate, top } = boxStyle;

              return (
                <div
                  key={uuid}
                  className={cls(styles[`${componentName}-frame`])}
                  ref={(el) => {
                    addToRefs(el, uuid);
                  }}
                  style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    transform: `translate(${left}px, ${top}px) rotate(${rotate}deg)`,
                  }}
                  onClick={(e) => {
                    if (selectAble) {
                      e.stopPropagation();
                      if (!isSelect) {
                        setSelectPlugId(uuid);
                      }
                    }
                  }}
                >
                  <Loader ins={plugIns} />
                  <div className={cls(styles[`${componentName}-frame-mask`])}></div>
                </div>
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
