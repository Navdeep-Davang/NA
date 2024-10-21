// lib\Interface\auth\signup\PasswordValidation.tsx
import { useEffect, useState } from "react";
import { LucideCheckCircle, LucideXCircle } from "lucide-react"; // Assuming Lucid icon import

interface PasswordValidationProps {
  password: string;
}

export function PasswordValidation({ password }: PasswordValidationProps) {
  const [validations, setValidations] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    noSpaces: false,
  });

  useEffect(() => {
    setValidations({
      minLength: password.length >= 8,
      maxLength: password.length <= 48,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+~]/.test(password),
      noSpaces: !/\s/.test(password), // Ensures no spaces
    });
  }, [password]);

  // Check if there are any invalid validations
  const hasInvalidValidation = Object.values(validations).includes(false);

  const renderValidationItem = (isValid: boolean, text: string) => (
    <p className={`text-xs flex items-center gap-2 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
      {isValid ? (
        <LucideCheckCircle className="w-3 h-3 text-green-500" />
      ) : (
        <LucideXCircle className="w-3 h-3 text-red-500" />
      )}
      <span>{text}</span>
    </p>
  );

  return (
    hasInvalidValidation && (
      <div className="mt-1 pl-1">
        {renderValidationItem(validations.minLength, "Password must be at least 8 characters long")}
        {renderValidationItem(validations.maxLength, "Password must not exceed 48 characters")}
        {renderValidationItem(validations.uppercase, "Password must contain at least one uppercase letter")}
        {renderValidationItem(validations.lowercase, "Password must contain at least one lowercase letter")}
        {renderValidationItem(validations.number, "Password must contain at least one number")}
        {renderValidationItem(validations.specialChar, "Password must contain at least one special character")}
        {renderValidationItem(validations.noSpaces, "Password must not contain any spaces")}
      </div>
    )
  );
}
