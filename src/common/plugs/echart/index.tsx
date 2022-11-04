import { nanoid } from 'nanoid';
import { defaultProps as BarDefaultProps } from './Bar';
import { defaultProps as LineDefaultProps } from './Line';
import { defaultProps as PieDefaultProps } from './Pie';

export default {
  name: 'echart',
  plugs: [
    {
      loader: 'echart/Pie/index',
      name: 'Pie',
      key: nanoid(),
      boxStyle: {},
      defaultProps: PieDefaultProps,
    },
    {
      loader: 'echart/Line/index',
      name: 'Line',
      key: nanoid(),
      boxStyle: {},
      defaultProps: LineDefaultProps,
    },
    {
      loader: 'echart/Bar/index',
      name: 'Bar',
      key: nanoid(),
      boxStyle: {},
      defaultProps: BarDefaultProps,
    },
  ],
};
