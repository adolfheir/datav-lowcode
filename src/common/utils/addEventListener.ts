// fork from https://github.com/react-component/util/blob/master/src/Dom/addEventListener.js
import ReactDOM from 'react-dom';

export default function addEventListenerWrap<K extends keyof HTMLElementEventMap>(
  target: any,
  eventType: K | string,
  cb: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  option?: boolean | AddEventListenerOptions,
): {
  remove: Function;
} {
  /* eslint camelcase: 2 */
  const callback = ReactDOM.unstable_batchedUpdates
    ? function run(e: HTMLElementEventMap[K]) {
        ReactDOM.unstable_batchedUpdates(cb, e);
      }
    : cb;
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }

  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback);
      }
    },
  };
}
