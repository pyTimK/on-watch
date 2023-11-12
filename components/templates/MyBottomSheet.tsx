"use client";
import ModifiedBottomSheet from "../edited_libraries/reactDraggableBottomSheet";

interface MyBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const MyBottomSheet: React.FC<MyBottomSheetProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <ModifiedBottomSheet
      classNames={{ draggable: "rounded-t-3xl" }}
      isOpen={open}
      close={() => {
        if (onClose) {
          onClose();
        }
      }}
    >
      {children}
    </ModifiedBottomSheet>
  );
};

export default MyBottomSheet;
