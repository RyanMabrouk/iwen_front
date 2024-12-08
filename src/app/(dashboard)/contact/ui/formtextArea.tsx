import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string[] | null;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder = "",
  defaultValue = "",
  required = false,
  disabled = false,
  rows = 3,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full space-y-2">
      <Label
        htmlFor={name}
        className="block text-right text-base font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          rows={rows}
          onChange={onChange}
          className="w-full text-[1rem] ring-0 placeholder:text-[1rem] focus:ring-0"
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

export default FormTextarea;

