import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { get } from 'lodash';
import cls from 'classnames';
import { Radio, InputNumber, Input, Select, Divider, Button } from '@arco-design/web-react';
import ColorPicker from '@common/components/ColorPicker';
import EditorDialog from '@common/components/MonacoEditor/Dialog';
import openModal from '@common/utils/openModal';
import { animateList } from '@components/Animate';
import styles from './index.scss';
import { useEditorStore } from './editorStore';

const componentName = 'attr-side';

let tpl = `//注入3个变量
//getPrevProps：获取组件配置
//update：更新组件配置
//eventBus：全局事件总线
//@ts-ignore
const { getPrevProps, update, eventBus } = __inject__;
let prevProps = getPrevProps()
console.log("getPrevProps",getPrevProps)
update(prevProps)`;

export interface AttrSideProps {
  style?: CSSProperties;
  className?: string | string[];
}

export const AttrSide: React.FC<AttrSideProps> = (props) => {
  const { style, className } = props;

  const {
    pageSize,
    setPageSize,
    bgColor,
    setBgColor,
    bgImg,
    setBgImg,
    fullScreenType,
    setFullScreenType,

    plugList,
    setPlugList,
    selectPlug,
    selectPlugId,
    setSelectPlugId,
    changeSelectPlug,
  } = useEditorStore();

  const [selectTab, setSelectTab] = useState<string>('');
  const optionsList = !selectPlug ? ['页面'] : ['属性', '事件', '数据'];
  useEffect(() => {
    setSelectTab(!selectPlug ? '页面' : '属性');
    // setSelectTab('属性');
  }, [!!selectPlug]);

  return (
    <div className={cls(styles[componentName], className)} style={style}>
      <div className={cls(styles[`${componentName}-tab`])}>
        <Radio.Group
          value={selectTab}
          onChange={(value) => {
            setSelectTab(value);
          }}
          type="button"
          name="direction"
          options={optionsList}
        ></Radio.Group>
      </div>
      <div className={cls(styles[`${componentName}-content`])}>
        {selectTab === '页面' && (
          <div className={cls(styles[`${componentName}-page-setting`])}>
            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>页面尺寸:</div>
              <div className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-size`])}>
                <InputNumber
                  mode="button"
                  size={'small'}
                  style={{ width: 120 }}
                  value={pageSize.width}
                  onChange={(value) => {
                    setPageSize({
                      ...pageSize,
                      width: value,
                    });
                  }}
                />
                {/* <span style={{ width: '18' }}>x</span> */}
                <InputNumber
                  mode="button"
                  size={'small'}
                  style={{ width: 120 }}
                  value={pageSize.height}
                  onChange={(value) => {
                    setPageSize({
                      ...pageSize,
                      height: value,
                    });
                  }}
                />
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>背景颜色:</div>
              <div
                className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-bgcolor`])}
              >
                <div>
                  <ColorPicker
                    value={bgColor}
                    onChange={(value) => {
                      setBgColor(value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>背景图片:</div>
              <div
                className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-bgcolor`])}
              >
                <div>
                  <Input
                    allowClear
                    placeholder="请输入图片地址"
                    value={bgImg}
                    onChange={(value) => {
                      setBgImg(value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>预览方式:</div>
              <div
                className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-bgcolor`])}
              >
                <Radio.Group
                  direction="vertical"
                  value={fullScreenType}
                  onChange={(value) => {
                    setFullScreenType(value);
                  }}
                >
                  {['fit', 'x-first', 'y-first', 'resize'].map((key) => {
                    const mapping = {
                      ['fit']: '自适应比例展示,页面会有留白',
                      ['x-first']: 'x轴铺满，y轴自适应滚动',
                      ['y-first']: 'y轴铺满，x轴自适应滚动',
                      ['resize']: '强行拉伸画面，填充所有视图',
                    };
                    return (
                      <Radio key={key} value={key}>
                        {mapping[key as keyof typeof mapping]}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
          </div>
        )}

        {selectTab === '属性' && (
          <div className={cls(styles[`${componentName}-page-attr`])}>
            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>名称:</div>
              <div className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-size`])}>
                <Input
                  value={selectPlug?.name}
                  onChange={(value) => {
                    changeSelectPlug('name', value);
                  }}
                />
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>盒子尺寸:</div>
              <div className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-size`])}>
                <InputNumber
                  mode="button"
                  size={'small'}
                  style={{ width: 120 }}
                  value={selectPlug?.boxStyle.width}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.width', value);
                  }}
                />
                {/* <span style={{ width: '18' }}>x</span> */}
                <InputNumber
                  mode="button"
                  size={'small'}
                  style={{ width: 120 }}
                  value={selectPlug?.boxStyle.height}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.height', value);
                  }}
                />
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>盒子位置:</div>
              <div className={cls(styles[`${componentName}-page-value`], styles[`${componentName}-page-setting-size`])}>
                <InputNumber
                  prefix="top:"
                  size={'small'}
                  style={{ width: 120 }}
                  value={selectPlug?.boxStyle.top}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.top', value);
                  }}
                />
                <InputNumber
                  prefix="left:"
                  size={'small'}
                  style={{ width: 120 }}
                  value={selectPlug?.boxStyle.left}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.left', value);
                  }}
                />
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>旋转角度:</div>
              <div className={cls(styles[`${componentName}-page-value`])}>
                <InputNumber
                  size={'small'}
                  mode="button"
                  suffix="度"
                  value={selectPlug?.boxStyle.rotate}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.rotate', value);
                  }}
                />
              </div>
            </div>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>出场动画:</div>
              <div className={cls(styles[`${componentName}-page-value`])}>
                <Select
                  placeholder="无动画"
                  allowClear={true}
                  value={selectPlug?.boxStyle.animate!}
                  onChange={(value) => {
                    changeSelectPlug('boxStyle.animate', value);
                  }}
                >
                  {animateList.map(({ value, label }, index) => (
                    <Select.Option key={index} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>

            <Divider> </Divider>

            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>组件props:</div>
              <div className={cls(styles[`${componentName}-page-value`])}>
                <Button
                  type="secondary"
                  style={{
                    justifyContent: 'flex-start',
                  }}
                  onClick={() => {
                    let { destroy } = openModal(EditorDialog, {
                      onClose: (isOk, code) => {
                        if (isOk && code) {
                          changeSelectPlug('plugProps.__inject__', code?.trim());
                        }
                        destroy();
                      },
                      code: get(selectPlug, 'plugProps.__inject__', tpl),
                    });
                  }}
                >
                  设置
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectTab === '事件' && (
          <div className={cls(styles[`${componentName}-page-event`])}>
            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>组件props:</div>
              <div className={cls(styles[`${componentName}-page-value`])}>
                <Button type="secondary">设置</Button>
              </div>
            </div>
          </div>
        )}

        {selectTab === '数据' && (
          <div className={cls(styles[`${componentName}-page-data`])}>
            <div className={cls(styles[`${componentName}-page-item`])}>
              <div className={cls(styles[`${componentName}-page-label`])}>数据:</div>
              <div className={cls(styles[`${componentName}-page-value`])}>
                <Button type="secondary">设置</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AttrSide.displayName = 'AttrSide';

export default AttrSide;
