export interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }