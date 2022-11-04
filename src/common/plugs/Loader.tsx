import React, { useEffect, useMemo, useState } from 'react';
import { isFunction } from 'lodash';
import { Message } from '@arco-design/web-react';
import { useLatest } from 'ahooks';
import { createLoadable } from '@components/CreateLoadable';
import ErrorBoundary from '@components/ErrorBoundary';
import { evalCode, transform } from './code';
import eventBus from './event';
import type { PlugIns } from './interface';

//简单实现loader
interface IProps {
  ins: PlugIns;
}

export const Loader = ({ ins }: IProps) => {
  const { loader, uuid, name, plugProps, defaultProps } = ins;

  /* ============================== 实例 =============================== */
  const Editor = useMemo(() => {
    return createLoadable(() => import(`./${loader}`));
  }, [loader]);

  /* ============================== 编辑器属性 =============================== */
  const [isReady, setIsReady] = useState(false);
  const { __inject__ = '', ...otherProps } = plugProps || {};
  const [props, setProps] = useState(otherProps);
  const latestData = useLatest({ props });

  useEffect(() => {
    //执行inject逻辑
    const getPrevProps = () => {
      const { props } = latestData.current;
      return props;
    };
    const update = (newProps: any) => {
      setProps(newProps);
    };

    try {
      let scope = {
        __inject__: {
          getPrevProps,
          update,
          eventBus,
          defaultProps,
        },
      };
      evalCode(
        transform(__inject__, {
          transforms: { asyncAwait: false },
        }),
        scope,
      );
    } catch (error) {
      console.error(`${uuid} ${name}`, error);
      Message.error(`代码解析错误:${uuid} ${name}`);
    }
    setIsReady(true);
  }, [__inject__]);

  return useMemo(
    () =>
      isReady ? (
        <ErrorBoundary>
          <Editor key={uuid} {...props} />
        </ErrorBoundary>
      ) : null,
    [props, isReady],
  );
};

export default Loader;
