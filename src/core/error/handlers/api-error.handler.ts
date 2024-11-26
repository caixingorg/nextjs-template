export class ApiError extends Error {
    constructor(
      public statusCode: number,
      public message: string,
      public data?: any
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  export const handleApiError = (error: any) => {
    if (error instanceof ApiError) {
      // 处理 API 错误
      console.error(`API Error: ${error.statusCode} - ${error.message}`);
    } else {
      // 处理其他错误
      console.error('Unexpected error:', error);
    }
  };