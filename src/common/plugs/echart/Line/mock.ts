import ReactECharts, { EChartsOption } from 'echarts-for-react';


export const data = [
  {
    "name": "苹果",
    "value": 1000879,
    "url": "http://www.baidu.com"
  },
  {
    "name": "三星",
    "value": 3400879,
    "url": "http://www.baidu.com"
  },
  {
    "name": "小米",
    "value": 2300879,
    "url": "http://www.baidu.com"
  },
  {
    "name": "oppo",
    "value": 5400879,
    "url": "http://www.baidu.com"
  },
  {
    "name": "大疆",
    "value": 3000,
    "url": "http://www.baidu.com"
  },
  {
    "name": "抖音",
    "value": 2000,
    "url": "http://www.baidu.com"
  }
]

export const mockOption: EChartsOption = {
  theme: "avue",
  xAxis: {
    type: 'category',
    data: ["7月",
      "8月",
      "9月",
      "10月",
      "11月"]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      "name": "上账资金走势",
      "data": [
        18100.09,
        28781.31,
        25654.2,
        30398.73,
        16560.39
      ]
    },
    {
      type: 'line',
      smooth: true,
      "name": "下账资金走势",
      "data": [
        20100.09,
        16281.31,
        18654.2,
        20021.73,
        31560.02
      ]
    }
  ]
};
