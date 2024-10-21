// lib\Interface\auth\login\types.ts

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  message?: string
}


export interface ApiErrorResponse {
    status: string;
    message: string;
    error: string;
    statusCode: number; 
  }
