import * as echarts from 'echarts';
import avueTheme from './avue.theme';
import macaronsTheme from './macarons.theme';
import wonderlandTheme from './wonderland.theme';

echarts.registerTheme(avueTheme.themeName, avueTheme.theme);
echarts.registerTheme(macaronsTheme.themeName, macaronsTheme.theme);
echarts.registerTheme(wonderlandTheme.themeName, wonderlandTheme.theme);
