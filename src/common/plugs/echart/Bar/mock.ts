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
  xAxis: {
    type: 'category',
    data: ['7月', '8月', '9月', '10月', '11月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [12, 16, 13, 20, 24],
      type: 'bar',
    },
    {
      data: [28, 24, 25, 13, 12],
      type: 'bar',
    },
    {
      data: [34, 22, 32, 34, 40],
      type: 'bar',
    },
    {
      data: [26, 38, 30, 28, 16],
      type: 'bar',
    },
  ],
};
