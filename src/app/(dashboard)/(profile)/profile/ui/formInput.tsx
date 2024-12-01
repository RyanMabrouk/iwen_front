import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[] | null;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  icon,
  placeholder = "",
  defaultValue = "",
  required = false,
  disabled = false,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full space-y-2">
      <Label
        htmlFor={name}
        className="block text-right text-lg font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          className={`${icon ? "pr-10" : "pr-3"} w-full text-[1rem] ring-0 placeholder:text-[1rem] focus:ring-0`}
        />
      </div>
      {errors &&
        errors.map((error, index) => (
          <div key={index} className="text-right text-sm text-destructive">
            {error}
          </div>
        ))}
    </div>
  );
};

export default FormInput;
