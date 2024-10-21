// lib/components/auth/signup/EmailField/EmailField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideAsterisk } from "lucide-react";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  clearError: () => void;
  onBlur: () => void;
  error?: string;
}

export default function EmailField({
  value,
  onChange,
  clearError,
  onBlur,
  error,
}: EmailFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <div className="flex flex-col space-y-1">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={value}
          onChange={(e) => {
            onChange(e.target.value); 
            clearError(); 
          }}
          onBlur={onBlur}
          required
          className="text-sm border border-gray-300 rounded p-2"
        />
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
