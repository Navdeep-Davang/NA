// lib\Interface\auth\request-otp\types.ts

export interface resetPasswordFormProps {
  email: string; 
  reset_key: string;
}

export interface resetPasswordFormData {
  email: string,
  reset_key: string;
  newPassword: string;
  confirmPassword: string;
}

export interface resetPasswordFormErrors {
  email?: string,
  reset_key?: string;
  new_password: string;
}


export interface ApiErrorResponse {
    status: string;
    error: string;
    message: string;
    statusCode: number;    
}
