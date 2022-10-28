import { createContext } from 'react';

export const FullScreenContainerContext = createContext<
  Partial<{
    scale: number;
    // scaleH: number;
  }>
>({ scale: 1 });
