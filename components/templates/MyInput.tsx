import { InputField } from "@/hooks/useInputField";
import { interFont } from "@/styles/fonts";
import { ChangeEventHandler, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder?: string;
  inputField: InputField;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dark?: boolean;
  className?: string;
  defaultValue?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  inputField,
  onChange,
  className,
  defaultValue,
}) => {
  return (
    <div className="flex justify-center">
      <input
        ref={inputField.ref}
        step="any"
        className={twMerge(
          "w-full max-w-sm border rounded-lg bg-light_primary p-4",
          className,
          interFont,
          inputField.error ? "border-red" : "border-zinc-600"
        )}
        type={type}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
          inputField.setError(false);
        }}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
};

export default MyInput;
