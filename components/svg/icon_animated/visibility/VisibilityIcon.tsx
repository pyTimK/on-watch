import { useState } from "react";
import "./visibilityIcon.css";
import { twMerge } from "tailwind-merge";

interface VisibilityIconProps {
  onClick?: () => void;
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({ onClick }) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  return (
    <div
      className={twMerge(
        "transition-container ",
        isEyeOpen ? "eye-open" : "eye-closed"
      )}
    >
      <span className="icon-eye js-transition">
        <svg
          onClick={() => {
            setIsEyeOpen(!isEyeOpen);
            if (onClick) {
              onClick();
            }
          }}
          className="cursor-pointer"
          viewBox="-20 -200 320 400"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="eye" strokeWidth="30" fill="none">
            <g id="eye-lashes" stroke="currentColor">
              <line x1="140" x2="140" y1="90" y2="180" />
              <line x1="70" x2="10" y1="60" y2="140" />
              <line x1="210" x2="270" y1="60" y2="140" />
            </g>
            <path
              id="eye-bottom"
              d="m0,0q140,190 280,0"
              stroke="currentColor"
            />
            <path id="eye-top" d="m0,0q140,190 280,0" stroke="currentColor" />
            <circle
              id="eye-pupil"
              cx="140"
              cy="0"
              r="50"
              fill="currentColor"
              stroke="none"
            />
          </g>
        </svg>
      </span>
    </div>
  );
};

export default VisibilityIcon;
