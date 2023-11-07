import { jsoFont } from "@/styles/fonts";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface MyButtonProps {
  onClick?: MouseEventHandler;
  label: string;
  type?: "button" | "submit" | "reset";
  pX?: number;
  pY?: number;
  disabled?: boolean;
  className?: string;
  classNameText?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  type,
  pX = 1.2,
  pY = 0.7,
  disabled,
  className,
  classNameText,
}) => {
  return (
    <motion.div
      className="text-center w-full rounded-lg bg-darker_primary m-auto shadow-none outline-none select-none"
      onClick={onClick}
      whileTap={{ scale: disabled ? 1.0 : 0.8 }}
    >
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          "m-auto min-w-full min-h-full rounded-lg",
          className,
          disabled ? "cursor-default opacity-50" : "cursor-pointer opacity-100"
        )}
      >
        <p
          className={twMerge(
            "text-white font-light w-max m-auto",
            classNameText,
            jsoFont
          )}
          style={{ padding: `${pY}rem ${pX}rem` }}
        >
          {label}
        </p>
      </button>
    </motion.div>
  );
};

export default MyButton;
