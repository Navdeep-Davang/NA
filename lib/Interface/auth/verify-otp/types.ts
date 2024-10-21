// lib\Interface\auth\request-otp\types.ts

export interface VerifyOTPFormProps {
  email: string; 
}

export interface verifyOTPFormData {
  email: string,
  otp: string;
}

export interface verifyOTPFormErrors {
  email?: string,
  otp?: string;
}


export interface ApiErrorResponse {
    status: string;
    error: string;
    message: string; 
    statusCode: number;    
  }
