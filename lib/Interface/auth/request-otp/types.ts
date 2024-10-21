// lib\Interface\auth\request-otp\types.ts

export interface requestOTPFormData {
  email: string;
}

export interface requestOTPFormErrors {
  email?: string;
}


export interface ApiErrorResponse {
    status: string;
    error: string;
    message: string;
    statusCode: number;     
  }
