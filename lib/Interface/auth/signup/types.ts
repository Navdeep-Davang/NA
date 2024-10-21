// lib/Interface/auth/signup/types.ts

export interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
export interface SignUpFormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }


export interface ApiErrorResponse {
    status: "error";
    message: string;
    errors: {
      [key: string]: string;
    };
    statusCode: number; 
  }
