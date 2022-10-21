declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module 'downloadjs';
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

/// <reference types="vite/client" />

/* deck gl 相关 暂时hack */
// declare module 'deck.gl';
// declare module '@deck.gl'
// declare module '@deck.gl/layers'
// declare module '@deck.gl/aggregation-layers'
// declare module '@deck.gl/react'
// declare module "@deck.gl/extensions"
/* deck gl 相关 暂时hack end */
