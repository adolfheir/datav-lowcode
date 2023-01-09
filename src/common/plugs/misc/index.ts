import { nanoid } from 'nanoid';
import { defaultProps as ImgDefaultProps } from './Img';
import { defaultProps as TextDefaultProps } from './Text';

export default {
  name: 'misc',
  plugs: [
    {
      loader: 'misc/Text/index',
      name: 'Text',
      key: nanoid(),
      boxStyle: {},
      defaultProps: TextDefaultProps,
    },
    {
      loader: 'misc/Img/index',
      name: 'Img',
      key: nanoid(),
      boxStyle: {},
      defaultProps: ImgDefaultProps,
    },
  ],
};
