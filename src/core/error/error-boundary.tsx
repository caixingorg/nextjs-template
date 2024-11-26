import React from 'react';
import { useLogger } from '../logger/hooks/use-logger';
import { AppError } from './error';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const logger = useLogger();
    
    // 记录错误
    logger.error('React Error Boundary caught an error:', {
      error: error instanceof AppError ? error.toJSON() : error,
      componentStack: errorInfo.componentStack,
    });

    // 调用自定义错误处理
    this.props.onError?.(error);
  }

  render() {
    if (this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error);
      }
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error.message}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  props?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WithErrorBoundary(componentProps: P) {
    return (
      <ErrorBoundary {...props}>
        <Component {...componentProps} />
      </ErrorBoundary>
    );
  };
}
