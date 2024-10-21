// lib/components/auth/signup/PasswordField/PasswordField.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideEye, LucideEyeOff } from "lucide-react";
import {PasswordValidation} from "./PasswordValidation";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export default function PasswordField({
  value,
  onChange,
  error,
  showPassword,
  togglePasswordVisibility,
}: PasswordFieldProps) {

    const [isTyping, setIsTyping] = useState(false);

    return (
        <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex flex-col space-y-0">
            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsTyping(true); 
                    }}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="text-sm border border-gray-300 rounded p-2"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    {showPassword ? (
                    <LucideEyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                    <LucideEye className="w-4 h-4 text-gray-500" />
                    )}
                </button>
            </div>
            {(isTyping || error) && ( 
            <div className="pl-1">
                <PasswordValidation password={value} />
            </div>      )}
        </div>
        </div>
    );
}
