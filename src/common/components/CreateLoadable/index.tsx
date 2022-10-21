import React, { ComponentType, ReactElement } from 'react';

let LoadingComponent: ReactElement | null = null;

export function setLoadingComponent(cmp: ReactElement): void {
  LoadingComponent = cmp;
}

export function createLoadable(loader: () => Promise<{ default: ComponentType<any> }>) {
  const LazyComponet = React.lazy(loader);
  return () => (
    <React.Suspense fallback={LoadingComponent}>
      <LazyComponet />
    </React.Suspense>
  );
}
