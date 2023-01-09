// copy from https://github.com/alibaba-fusion/next/blob/master/src/upload/upload.jsx
// @ts-nocheck
import React from 'react';
import { noop } from 'lodash';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

interface HTMLAttributesWeak extends React.HTMLAttributes<HTMLElement> {
  onError?: any;
  onSelect?: any;
  defaultValue?: any;
  onChange?: any;
}

export interface SelecterProps extends HTMLAttributesWeak {
  /**
   * 是否禁用上传功能
   */
  disabled?: boolean;

  /**
   * 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
   */
  multiple?: boolean;

  /**
   * 是否支持拖拽上传，`ie10+` 支持。
   */
  dragable?: boolean;

  /**
   * 接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)
   */
  accept?: string;

  /**
   * 文件选择回调
   */
  onSelect?: (files: Array<File>, e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 拖拽经过回调
   */
  onDragOver?: () => void;

  /**
   * 拖拽离开回调
   */
  onDragLeave?: () => void;

  /**
   * 拖拽完成回调
   */
  onDrop?: (files: Array<File>) => void;

  /**
   * 是否支持上传文件夹，仅在 chorme 下生效
   */
  webkitdirectory?: boolean;
}

/**
 * Upload.Selecter
 * @description [底层能力] 可自定义样式的文件选择器
 */
export default class Selecter extends React.Component<SelecterProps> {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    /**
     * 是否禁用上传功能
     */
    disabled: PropTypes.bool,
    /**
     * 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
     */
    multiple: PropTypes.bool,
    /**
     * 是否支持上传文件夹，仅在 chorme 下生效
     */
    webkitdirectory: PropTypes.bool,
    /**
     * 调用系统设备媒体
     */
    capture: PropTypes.string,
    /**
     * 是否支持拖拽上传，`ie10+` 支持。
     */
    dragable: PropTypes.bool,
    /**
     * 接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)
     */
    accept: PropTypes.string,
    /**
     * 文件选择回调
     */
    onSelect: PropTypes.func,
    /**
     * 拖拽经过回调
     */
    onDragOver: PropTypes.func,
    /**
     * 拖拽离开回调
     */
    onDragLeave: PropTypes.func,
    /**
     * 拖拽完成回调
     */
    onDrop: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.string,
  };

  static defaultProps = {
    name: 'file',
    multiple: false,
    onSelect: noop,
    onDragOver: noop,
    onDragLeave: noop,
    onDrop: noop,
  };

  onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const filesArr = files?.length ? Array.prototype.slice.call(files) : [files];

    filesArr.forEach((file) => {
      file.uid = nanoid();
    });

    this.props.onSelect?.(filesArr as Array<File>, e);
  };

  /**
   * 点击上传按钮
   * @return {void}
   */
  onClick = () => {
    const el = this.fileRef;
    if (!el) {
      return;
    }
    // NOTE: 在 IE 下，el.value = '' 在 el.click() 之后，会触发 input[type=file] 两次 onChange
    el.value = '';
    el.click();
  };

  /**
   * 键盘事件
   * @param  {SyntheticEvent} e
   * @return {void}
   */
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onClick();
    }
  };

  /**
   * 拖拽
   * @param  {SyntheticEvent} e
   * @return {void}
   */
  onDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    const filesArr = Array.prototype.slice.call(files);

    this.props.onDrop(filesArr as Array<File>);
  };

  onDragOver = (e) => {
    e.preventDefault();
    this.props.onDragOver(e);
  };

  saveFileRef = (ref) => {
    this.fileRef = ref;
  };

  render() {
    const { accept, multiple, capture, webkitdirectory, children, id, disabled, dragable, style, className, name } =
      this.props;

    let events = {};
    if (!disabled) {
      events = Object.assign(
        {
          onClick: this.onClick,
          onKeyDown: this.onKeyDown,
          tabIndex: '0',
        },
        dragable
          ? {
              onDrop: this.onDrop,
              onDragOver: this.onDragOver,
              onDragLeave: this.props.onDragLeave,
            }
          : {},
      );
    }

    const otherProps = {};
    if (webkitdirectory) {
      otherProps.webkitdirectory = '';
    }
    if (capture) {
      otherProps.capture = capture;
    }

    return (
      <div role="application" style={style} className={className} {...events}>
        <input
          {...otherProps}
          type="file"
          name={name}
          id={id}
          ref={this.saveFileRef}
          style={{ display: 'none' }}
          accept={accept}
          aria-hidden
          multiple={multiple}
          onChange={this.onSelect}
          disabled={disabled}
        />
        {children}
      </div>
    );
  }
}
