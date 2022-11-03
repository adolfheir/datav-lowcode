import React from 'react';
import { get } from 'lodash';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

//注销分2级
export const globalDestory: Array<() => void> = [];
export const pageDestroyFns: Array<() => void> = [];

export const destroyAll = (isGlobal = false) => {
  let destroyFns = isGlobal ? globalDestory : pageDestroyFns;
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      try {
        close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export interface ModalProps {
  /* 限制这3个参数必须 */
  visible: boolean;
  onClose: any;
  afterClose: () => void;
  unmountOnExit: boolean;
  [key: string]: any;
}
type ConfigUpdate = ModalProps | ((prevConfig: ModalProps) => ModalProps);

export default function openModal<TModalProps = ModalProps>(
  DialogComponent: React.ComponentType<TModalProps>,
  config: Omit<TModalProps, 'visible' | 'afterClose' | 'unmountOnExit'>,
  /* 打开弹窗的交互 */
  openModalConfig?: {
    isGlobal?: boolean; //默认false
  },
): {
  destroy: (args?: { triggerCancel: boolean }) => void;
  update: (configUpdate: Partial<TModalProps> | ((prevConfig: ModalProps) => ModalProps)) => void;
} {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let reactRoot = ReactDOMClient.createRoot(div!);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = {
    ...(config || {}),
    close,
    visible: true,
    //通过openmodal 方式打开的加这个属性 防止内部mask动画问题
    unmountOnExit: true,
  } as any;

  let isGlobal = get(openModalConfig, 'isGlobal', false);
  let destroyFns = isGlobal ? globalDestory : pageDestroyFns;

  function destroy(...args: any[]) {
    // const triggerCancel = args.some((param) => param && param.triggerCancel);
    // if (config.onClose && triggerCancel) {
    //   config.onClose(false, args);
    // }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
    Promise.resolve().then(() => {
      reactRoot?.unmount();
    });
  }

  let timer: NodeJS.Timeout | null;

  function render({ ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    timer && clearTimeout(timer);
    //@ts-ignore
    timer = setTimeout(() => {
      reactRoot.render(<DialogComponent {...props} />);
      // ReactDOM.render(<DialogComponent {...props} />, div);
    });
  }

  function close(...args: any[]) {
    //3min后强制清理组件 防止有未调用afterclose的组件
    let timer = setTimeout(() => {
      destroy();
    }, 3 * 60 * 1000);

    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        //@ts-ignore
        if (typeof config.afterClose === 'function') {
          //@ts-ignore
          config.afterClose();
        }
        clearTimeout(timer);
        //@ts-ignore
        destroy.apply(this, args);
      },
    };

    render(currentConfig);
  }

  function update(configUpdate: Function | object) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return { destroy: close, update };
}
