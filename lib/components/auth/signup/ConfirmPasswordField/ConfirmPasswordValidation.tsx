// lib\Interface\auth\signup\ConfirmPasswordValidation.tsx
import { useEffect, useState } from "react";
import { LucideCheckCircle, LucideXCircle } from "lucide-react";

interface ConfirmPasswordValidationProps {
  password: string;
  confirmPassword: string;
  hasInteracted: boolean;
}

export function ConfirmPasswordValidation({
  password,
  confirmPassword,
  hasInteracted,
}: ConfirmPasswordValidationProps) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    setIsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

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

  // Only show the validation if it fails or if the field has been interacted with
  return (
    <div className="mt-1 pl-1">
      {(!isMatch || hasInteracted) &&
        renderValidationItem(isMatch, isMatch ? "Password confirmed" : "Password did not match")}
    </div>
  );
}
