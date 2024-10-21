// lib/components/auth/signup/ConfirmPasswordField/ConfirmPasswordField.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { ConfirmPasswordValidation } from "./ConfirmPasswordValidation";

interface ConfirmPasswordFieldProps {
  password: string;
  confirmPassword: string;
  onChange: (value: string) => void;
  showConfirmPassword: boolean;
  toggleConfirmPasswordVisibility: () => void;
  error?: string;
}

export default function ConfirmPasswordField({
  password,
  confirmPassword,
  onChange,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  error,
}: ConfirmPasswordFieldProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
    setHasInteracted(true); // Set interaction to true when the user starts typing
  };

  const handleFocus = () => {
    setHasInteracted(true); // Reset interaction on blur
  };

  const handleBlur = () => {
    setHasInteracted(false); // Reset interaction on blur
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="confirm-password">Confirm Password</Label>
      <div className="flex flex-col space-y-0">
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            className="text-sm border border-gray-300 rounded p-2"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showConfirmPassword ? (
              <LucideEyeOff className="w-4 h-4 text-gray-500" />
            ) : (
              <LucideEye className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
        <div className="pl-1">
          {confirmPassword && (
              <ConfirmPasswordValidation
                password={password}
                confirmPassword={confirmPassword}
                hasInteracted={hasInteracted}
              />
            )}
        </div>
      </div>
    </div>
  );
}
