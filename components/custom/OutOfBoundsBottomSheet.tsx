import { GlobalContext } from "@/app/wrappers/GlobalWrapper";
import { useAddress } from "@/hooks/custom/useAddress";
import { dateFormatter } from "@/myfunctions/dateFormatter";
import { useContext } from "react";
import Avatar from "../templates/Avatar";
import MyBottomSheet from "../templates/MyBottomSheet";

interface OutOfBoundsBottomSheetProps {
  open: boolean;
  onClose?: () => void;
}

const OutOfBoundsBottomSheet: React.FC<OutOfBoundsBottomSheetProps> = ({
  open,
  onClose,
}) => {
  const { watch } = useContext(GlobalContext);

  const address = useAddress(
    parseFloat(watch?.latitude ?? "0"),
    parseFloat(watch?.longitude ?? "0")
  );

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center px-5">
        {/*//! Child Info Card  */}
        <div className="bg-zinc-200 rounded-xl px-3 py-3 w-full flex items-center gap-4">
          <Avatar size={52} src={watch?.photoURL} />
          <div className="flex flex-col gap-1">
            <p className="text-sm">My Child</p>
            <div className="bg-red rounded-sm font-light px-2 py-1 opacity-50">
              <p className="text-xs text-white">Out of Boundary</p>
            </div>
          </div>
        </div>

        {/*//! Out Of Boundary */}
        <div className="flex flex-col items-center gap-3 mt-8 text-center mb-8">
          <p className="text-red font-semibold">Out of Boundary</p>
          <p className="text-zinc-700 text-sm font-semibold">{address}</p>
          <p className="text-zinc-400 text-xs">
            {watch && dateFormatter(new Date())}
          </p>
        </div>
      </div>
    </MyBottomSheet>
  );
};

export default OutOfBoundsBottomSheet;
