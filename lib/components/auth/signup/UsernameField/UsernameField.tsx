// lib/Interface/auth/signup/UsernameField/UsernameField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideAsterisk } from "lucide-react";

interface UsernameFieldProps {
  value: string;
  onChange: (value: string) => void;
  clearError: () => void;
  onBlur: () => void;
  error?: string;
}

export default function UsernameField({
  value,
  onChange,
  clearError,
  onBlur,
  error,
}: UsernameFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="username">Username</Label>

      <div className="flex flex-col space-y-1">
        <div className="relative">
            <Input
              id="username"
              placeholder="Username"
              value={value}
              onChange={(e) => {
                onChange(e.target.value); 
                clearError(); 
              }}
              onBlur={onBlur}
              required
              className="text-sm border border-gray-300 rounded p-2"
            />          
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-xs pl-2 mt-1">
              <LucideAsterisk className="w-3 h-3 mr-1" />
              <span>{error}</span>
            </div>
          )}
       </div>
       
    </div>
  );
}
