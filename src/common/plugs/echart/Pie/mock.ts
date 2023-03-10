import ReactECharts, { EChartsOption } from 'echarts-for-react';

export const data = [
  {
    name: '苹果',
    value: 1000879,
    url: 'http://www.baidu.com',
  },
  {
    name: '三星',
    value: 3400879,
    url: 'http://www.baidu.com',
  },
  {
    name: '小米',
    value: 2300879,
    url: 'http://www.baidu.com',
  },
  {
    name: 'oppo',
    value: 5400879,
    url: 'http://www.baidu.com',
  },
  {
    name: '大疆',
    value: 3000,
    url: 'http://www.baidu.com',
  },
  {
    name: '抖音',
    value: 2000,
    url: 'http://www.baidu.com',
  },
];

export const mockOption: EChartsOption = {
  theme: 'avue',
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: data,
    },
  ],
};
