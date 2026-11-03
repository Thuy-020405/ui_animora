import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200">
          <h2 className="text-lg font-bold">Đã xảy ra lỗi giao diện</h2>
          <p className="text-sm mt-1">{this.state.error?.message || 'Có sự cố xảy ra khi tải phần này.'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
