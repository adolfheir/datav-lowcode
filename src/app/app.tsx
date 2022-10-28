import React, { ReactNode, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';
import { HoxRoot } from 'hox';
import { createLoadable } from '@components/CreateLoadable';
import './index.global.scss';

const componentName = 'app';

export interface AppProps {
  style?: CSSProperties;
  className?: string | string[];
}

const Editor = createLoadable(() => import('@pages/editor'));
const Home = createLoadable(() => import('@pages/home'));
const Preview = createLoadable(() => import('@pages/preview'));
const routerList = [
  {
    path: '/home',
    page: Home,
  },
  {
    path: '/editor',
    page: Editor,
  },
  {
    path: '/preview',
    page: Preview,
  },
];

export const App: React.FC<AppProps> = (props) => {
  const { style, className } = props;

  return (
    <BrowserRouter>
      <Routes>
        {routerList.map(({ path, page: Page }) => {
          return <Route key={path} path={path} element={<Page />} />;
        })}

        <Route path="*" element={<Navigate replace to={'/home'} />} />
      </Routes>
    </BrowserRouter>
  );
};

let root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <HoxRoot>
      <App></App>
    </HoxRoot>
  </React.StrictMode>,
);
