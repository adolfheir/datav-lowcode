import React, { ComponentType, ReactElement } from 'react';

let LoadingComponent: ReactElement | null = null;

export function setLoadingComponent(cmp: ReactElement): void {
  LoadingComponent = cmp;
}

export function createLoadable(loader: () => Promise<{ default: ComponentType<any> }>, loading?: ReactElement | null) {
  let _LoadingComponent = loading ?? LoadingComponent;
  const LazyComponet = React.lazy(loader);
  return () => (
    <React.Suspense fallback={_LoadingComponent}>
      <LazyComponet />
    </React.Suspense>
  );
}
