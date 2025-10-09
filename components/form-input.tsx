import React from "react";

interface FormInputProps {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
  required: boolean;
  name: string;
  defaultValue: string;
  errors?: string[];
}
export default function FormInput({
  type,
  placeholder,
  required,
  name,
  defaultValue,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete="off"
        className={`w-full rounded-2xl border-[1] border-gray-400 py-1 pl-7 text-sm text-gray-400 placeholder:font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none ${errors.length > 0 ? "border-red-400 focus:ring-red-400" : null}`}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-sm text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
