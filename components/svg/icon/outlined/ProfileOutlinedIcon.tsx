import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ProfileOutlinedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const ProfileOutlinedIcon: React.FC<ProfileOutlinedIconProps> = ({
  onClick,
  size = 36,
}) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3375 17.0281C19.4363 17.0281 20.5104 16.7023 21.424 16.0918C22.3376 15.4814 23.0497 14.6137 23.4702 13.5986C23.8907 12.5834 24.0007 11.4664 23.7863 10.3887C23.572 9.31104 23.0429 8.32114 22.2659 7.54418C21.4889 6.76722 20.499 6.23811 19.4214 6.02374C18.3437 5.80938 17.2267 5.9194 16.2115 6.33989C15.1964 6.76037 14.3287 7.47244 13.7182 8.38605C13.1078 9.29966 12.782 10.3738 12.782 11.4726C12.7837 12.9454 13.3696 14.3575 14.4111 15.399C15.4526 16.4405 16.8646 17.0263 18.3375 17.0281ZM18.3375 8.13922C18.9968 8.13922 19.6413 8.33471 20.1894 8.70098C20.7376 9.06726 21.1648 9.58785 21.4171 10.1969C21.6694 10.806 21.7354 11.4762 21.6068 12.1229C21.4782 12.7695 21.1607 13.3634 20.6945 13.8296C20.2284 14.2957 19.6344 14.6132 18.9878 14.7418C18.3412 14.8705 17.671 14.8044 17.0619 14.5521C16.4528 14.2999 15.9322 13.8726 15.566 13.3245C15.1997 12.7763 15.0042 12.1318 15.0042 11.4726C15.0042 10.5885 15.3554 9.74065 15.9805 9.11553C16.6056 8.49041 17.4535 8.13922 18.3375 8.13922ZM8.33752 29.2503V24.8059C8.33929 23.333 8.92517 21.9209 9.96666 20.8795C11.0081 19.838 12.4202 19.2521 13.8931 19.2503H22.782C24.2549 19.2521 25.6669 19.838 26.7084 20.8795C27.7499 21.9209 28.3358 23.333 28.3375 24.8059V29.2503C28.3375 29.545 28.2205 29.8276 28.0121 30.036C27.8037 30.2444 27.5211 30.3614 27.2264 30.3614C26.9317 30.3614 26.6491 30.2444 26.4407 30.036C26.2324 29.8276 26.1153 29.545 26.1153 29.2503V24.8059C26.1153 23.9218 25.7641 23.074 25.139 22.4489C24.5139 21.8237 23.666 21.4726 22.782 21.4726H13.8931C13.009 21.4726 12.1612 21.8237 11.5361 22.4489C10.9109 23.074 10.5597 23.9218 10.5597 24.8059V29.2503C10.5597 29.545 10.4427 29.8276 10.2343 30.036C10.0259 30.2444 9.74332 30.3614 9.44864 30.3614C9.15395 30.3614 8.87134 30.2444 8.66296 30.036C8.45459 29.8276 8.33752 29.545 8.33752 29.2503Z"
      fill="#AAAAAA"
    />
  </motion.svg>
);

export default ProfileOutlinedIcon;