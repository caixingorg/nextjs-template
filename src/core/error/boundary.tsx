import React from 'react';
import { ErrorType } from './types';
import { ErrorHandler } from './handler';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: ErrorType) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: ErrorType;
}

/**
 * 错误边界组件
 * @description 捕获子组件中的 JavaScript 错误，记录错误并显示备用 UI
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorHandler: ErrorHandler;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.errorHandler = new ErrorHandler({
      onError: props.onError,
    });
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const standardError = this.errorHandler.handle(error);
    this.setState({ error: standardError });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          {this.state.error && (
            <details>
              <summary>Error details</summary>
              <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 错误边界 Hook
 * @description 用于函数组件的错误边界
 */
export function useErrorBoundary(options: {
  onError?: (error: ErrorType) => void;
} = {}) {
  const [error, setError] = React.useState<ErrorType | null>(null);
  const errorHandler = React.useMemo(
    () => new ErrorHandler({ onError: options.onError }),
    [options.onError]
  );

  const handleError = React.useCallback(
    (error: unknown) => {
      const standardError = errorHandler.handle(error);
      setError(standardError);
    },
    [errorHandler]
  );

  return {
    error,
    handleError,
  };
}
