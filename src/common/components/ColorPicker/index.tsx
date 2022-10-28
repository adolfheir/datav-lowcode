import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import cls from 'classnames';
import { ChromePicker, Color, ColorResult, RGBColor } from 'react-color';
import addEventlistener from '@common/utils/addEventListener';
import styles from './index.scss';

const componentName = 'color-picker';

export interface ColorPickerProps {
  style?: CSSProperties;
  className?: string | string[];
  value: RGBColor;
  onChange: (value: RGBColor) => void;
}
export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { style, className, value } = props;
  const [isDisplay, setisDisplay] = useState(false);
  return (
    <div
      className={styles[componentName]}
      onClick={(e) => {
        e.stopPropagation();
        setisDisplay(true);
      }}
    >
      rgba({`${value['r']}, ${value['g']}, ${value['b']}, ${value['a']}`})
      {isDisplay ? (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setisDisplay(false);
            }}
          />
          <ChromePicker
            color={value}
            onChangeComplete={(value: ColorResult) => {
              props?.onChange(value['rgb']);
              // setisDisplay(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
