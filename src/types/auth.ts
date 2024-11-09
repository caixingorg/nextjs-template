/**
 * Path: src/types/auth.ts
 * Purpose: Authentication type definitions
 */

export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string
  }
  
  export interface AuthError {
    message: string
    errors?: Record<string, string[]>
  }