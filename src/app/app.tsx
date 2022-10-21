import React, { ReactNode, useMemo } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';
import { HoxRoot } from 'hox';
import { createLoadable } from '@components/CreateLoadable';
import styles from './index.scss';

const componentName = 'app';

export interface AppProps {
  style?: CSSProperties;
  className?: string | string[];
}

const Editor = createLoadable(() => import(/* webpackChunkName: "algorithm-config" */ '@pages/editor'));
const routerList = [
  {
    path: '/editor',
    page: Editor,
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

        <Route path="*" element={<Navigate replace to={'/editor'} />} />
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
