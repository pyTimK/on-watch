import { useContext } from "react";
import Avatar from "../templates/Avatar";
import MyButton from "../templates/MyButton";
import { dateFormatter } from "@/myfunctions/dateFormatter";
import { useAddress } from "@/hooks/custom/useAddress";
import PhoneIcon from "../svg/icon/PhoneIcon";
import { Constants } from "@/classes/constants";
import { GlobalContext } from "@/app/wrappers/GlobalWrapper";
import ModifiedBottomSheet from "../edited_libraries/reactDraggableBottomSheet";

interface LocationBottomSheetProps {
  open: boolean;
  onClose?: () => void;
}

const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({
  open,
  onClose,
}) => {
  const { watch } = useContext(GlobalContext);

  const address = useAddress(watch?.latitude, watch?.longitude);

  return (
    <ModifiedBottomSheet open={open} onClose={onClose}>
      <div className="flex justify-between items-center px-5 pb-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-zinc-700 font-semibold">{`${watch?.name}'s Position`}</p>
          <p className="text-xs text-zinc-500">{address}</p>
        </div>
        <img src="/images/marker_without_pulse.svg" className="w-8 h-8" />
      </div>
    </ModifiedBottomSheet>
  );
};

export default LocationBottomSheet;
