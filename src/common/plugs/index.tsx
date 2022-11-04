import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import datav from './datav';
import echart from './echart';
import './echart/theme';
import type { Plug } from './interface';
import misc from './misc';

export const plugListTree = [datav, echart, misc];

export default plugListTree;
