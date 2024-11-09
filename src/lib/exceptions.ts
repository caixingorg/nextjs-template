/**
 * Path: src/lib/exceptions.ts
 * Purpose: Custom error handling
 */

export class ApiError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      public errors?: Record<string, string[]>
    ) {
      super(message)
      this.name = 'ApiError'
    }
  }