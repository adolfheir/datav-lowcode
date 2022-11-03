import { get } from 'lodash';
import { transform as _transform } from 'buble';

export const _poly = { assign: Object.assign };

export const transform = (code: string, transpileOptions = {}) => {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '');
  const opts = {
    ...transpileOptions,
    objectAssign: '_poly.assign',
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
      ...get(transpileOptions, 'transforms', {}),
    },
  };

  return _transform(codeTrimmed, opts).code;
};

export const evalCode = (code: string, scope: any) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  const res = new Function('_poly', ...scopeKeys, code);
  return res(_poly, ...scopeValues);
};
