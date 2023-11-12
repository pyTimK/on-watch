import { useContext } from "react";
import Avatar from "../templates/Avatar";
import MyButton from "../templates/MyButton";
import { dateFormatter } from "@/myfunctions/dateFormatter";
import { useAddress } from "@/hooks/custom/useAddress";
import PhoneIcon from "../svg/icon/PhoneIcon";
import { Constants } from "@/classes/constants";
import { GlobalContext } from "@/app/wrappers/GlobalWrapper";
import MyBottomSheet from "../templates/MyBottomSheet";

interface EmergencyBottomSheetProps {
  open: boolean;
  onClose?: () => void;
}

const EmergencyBottomSheet: React.FC<EmergencyBottomSheetProps> = ({
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
            <div className="bg-red rounded-sm font-light px-2 py-1">
              <p className="text-xs text-white">Need Help</p>
            </div>
          </div>
        </div>

        {/*//! Need Help */}
        <div className="flex flex-col items-center gap-3 mt-8 text-center">
          <p className="text-red font-semibold">Need Help</p>
          <p className="text-zinc-700 text-sm font-semibold">{address}</p>
          <p className="text-zinc-400 text-xs">
            {watch && dateFormatter(watch?.emergencyTimestamp)}
          </p>
        </div>

        {/*//! Call Police */}
        <div className="flex justify-between w-full mt-10 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-zinc-400">Phone Number</p>
            <div className="flex items-center gap-1">
              <PhoneIcon size={12} />
              <p className="text-xs text-zinc-400">
                {Constants.Contacts.PNP.phone}
              </p>
            </div>
          </div>
          <a href={`tel:${Constants.Contacts.PNP.phone}`}>
            <MyButton
              label="Call Police"
              className="bg-red rounded-full"
              classNameText="text-sm"
              pX={3.0}
            />
          </a>
        </div>
      </div>
    </MyBottomSheet>
  );
};

export default EmergencyBottomSheet;
