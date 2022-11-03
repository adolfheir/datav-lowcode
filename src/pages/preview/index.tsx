import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import qs from 'query-string';
import Loader from '@common/plugs/Loader';
import FullScreenContainer from '@components/FullScreenContainer';
import styles from './index.scss';
import { EditorStoreProvider, useEditorStore } from './store';

const componentName = 'preview';

export interface IndexProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;
  const { pageSize, bgColor, bgImg, fullScreenType, plugList } = useEditorStore();

  return (
    <FullScreenContainer
      designWidth={pageSize.width}
      designHeight={pageSize.height}
      style={{
        //@ts-ignore
        backgroundColor: bgColor,
      }}
    >
      <div
        className={cls(styles[componentName])}
        style={{
          // backgroundColor: `rgba(${bgColor?.['r']}, ${bgColor?.['g']}, ${bgColor?.['b']})`,
          backgroundImage: `url(${bgImg})`,
        }}
      >
        {plugList.map((plugIns) => {
          const { uuid, boxStyle } = plugIns;
          // let isSelect = uuid === selectPlugId;
          const { width, height, left, rotate, top } = boxStyle;

          return (
            <div
              key={uuid}
              className={cls(styles[`${componentName}-frame`])}
              ref={(el) => {
                // addToRefs(el, uuid);
              }}
              style={{
                width: width,
                height: height,
                position: 'absolute',
                transform: `translate(${left}px, ${top}px) rotate(${rotate}deg)`,
              }}
              // onClick={(e) => {
              //   e.stopPropagation();
              //   if (!isSelect) {
              //     setSelectPlugId(uuid);
              //   }
              // }}
            >
              <Loader ins={plugIns} />
            </div>
          );
        })}
      </div>
    </FullScreenContainer>
  );
};

Index.displayName = 'Index';

const Wrapper = (props: IndexProps) => (
  <EditorStoreProvider>
    <Index {...props} />
  </EditorStoreProvider>
);

export default Wrapper;
