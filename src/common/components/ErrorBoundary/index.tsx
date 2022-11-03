import * as React from 'react';
import ErrorCmp from './ErrorCmp';

// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;

// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// 出错显示组件的 renderer
export declare function FallbackRender(props: FallbackProps): FallbackElement;

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  fallbackRender?: typeof FallbackRender;
  onError?: (error: Error, info: string) => void;
  onReset?: () => void;
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (prevResetKey: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
  error: Error | null;
}

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
};

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state = initialState;
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>) {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;

    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys);
      }

      this.reset();
    }
  }

  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.reset();
  };

  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallbackRender === 'function') {
        return (fallbackRender as typeof FallbackRender)(fallbackProps);
      }
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      //默认值
      return <ErrorCmp />;

      // throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个');
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
