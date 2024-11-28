import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  options: string[]; // Array of options for the dropdown
  value: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onChange: (value: string) => void; 
  errors?: string[] | null;

}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder = "اختر خيارًا",
  options,
  value,
  required = false,
  disabled = false,
  onChange,
  errors,
}) => {
    
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="block text-right text-lg font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Select
        dir="rtl"
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors &&
        errors.map((error, index) => (
          <div key={index} className="text-right text-sm text-destructive">
            {error}
          </div>
        ))}
    </div>
  );
};

export default FormSelect;
