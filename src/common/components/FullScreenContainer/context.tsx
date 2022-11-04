import { createContext } from 'react';

export const FullScreenContainerContext = createContext<
  Partial<{
    scalex: number;
    scaley: number;
  }>
>({ scalex: 1, scaley: 1 });
