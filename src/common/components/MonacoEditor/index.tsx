import Editor from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';

const config = {
  paths: {
    vs: '/immutable/libs/monaco-editor/vs',
  },
};

loader.config(config);

export default Editor;
