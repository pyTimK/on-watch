import Modal from "react-modal";
import MyButton from "./MyButton";
import { twMerge } from "tailwind-merge";
import CrossCircleIcon from "../svg/icon/CrossCircleIcon";
import { jsoFont } from "@/styles/fonts";

interface MyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  hideLine?: boolean;
}

const MyModal: React.FC<MyModalProps> = ({
  isOpen,
  closeModal,
  title,
  children,
  height,
  width,
  className,
  classNameInner,
  classNameContent,
  hideLine = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className={twMerge(
        "absolute inset-0 px-5 py-5 text-zinc-600 -translate-x-1/2 -translate-y-1/2 rounded-xl w-fit h-fit top-1/2 left-1/2",
        className,
        jsoFont
      )}
      onRequestClose={closeModal}
      // style={customStyles}
    >
      <div
        className={twMerge("relative m-auto w-64 h-64", classNameInner)}
        style={{ height, width }}
      >
        {/* BACKGROUND LINE */}
        <div
          className={twMerge(
            "absolute w-full h-full rotate-[-3deg] border-2 border-white rounded-xl",
            hideLine && "hidden"
          )}
        ></div>

        {/* MAIN CONTENT */}
        <div
          className={twMerge(
            "absolute w-full h-full bg-white px-5 py-5 rounded-xl ",
            classNameContent
          )}
        >
          <p className="text-2xl font-bold text-center text-smooth_black mb-3">
            {title}
          </p>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
