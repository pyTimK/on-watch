import { motion } from "framer-motion";
import HeaderSettings from "@/components/custom/HeaderSettings";
import ChevronRight from "@/components/svg/icon/ChevronRight";
import PhoneIcon from "@/components/svg/icon/PhoneIcon";
import { Watch } from "@/classes/Watch";
import Avatar from "@/components/templates/Avatar";
import MoreVerticalIcon from "@/components/svg/icon/MoreVerticalIcon";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import FirebaseHelper from "@/classes/FirebaseHelper";
import EditIcon from "@/components/svg/icon/EditIcon";
import DeleteIcon from "@/components/svg/icon/DeleteIcon";
import { useQr } from "@/hooks/custom/useQR";
import useModal from "@/hooks/useModal";
import MyModal from "@/components/templates/MyModal";
import BarcodeScanner from "@/components/templates/BarCodeScanner";
import notify from "@/myfunctions/notify";
import AddIcon from "@/components/svg/icon/AddIcon";
import { twMerge } from "tailwind-merge";
import { PageWrapperContext, Pages } from "../wrappers/PageWrapper";
import CheckCircleIcon from "@/components/svg/icon/CheckCircleIcon";

interface WatchPageProps {}

const WatchPage: React.FC<WatchPageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const [watches, setWatches] = useState<Watch[]>([]);

  //! MODAL
  const { isModalOpen, openModal, closeModal } = useModal();
  const { qr, isValidQr, setIsValidQR, verifyQR, errorQrInput, onQrScan } =
    useQr(closeModal);
  const [addingWatch, setAddingWatch] = useState(false);

  //! GET WATCHES
  async function getWatches(watchIds: string[]) {
    const watches: Watch[] = [];
    for (const id of watchIds) {
      const watch = await FirebaseHelper.Watch.get(id);
      if (watch) {
        watches.push(watch);
      }
    }
    return watches;
  }

  //! GET WATCHES
  useEffect(() => {
    const watchIds = myUser?.watch_ids;
    if (!watchIds) return;
    getWatches(watchIds).then((_watches) => setWatches(_watches.reverse()));
  }, [myUser?.watch_ids]);

  //! ADD WATCH
  useEffect(() => {
    if (!addingWatch && qr && isValidQr && myUser) {
      if (myUser.watch_ids.includes(qr)) {
        notify("Watch already added", { type: "warning" });
      } else {
        setAddingWatch(true);
        FirebaseHelper.Watch.addToUser(myUser, qr).then(() => {
          setAddingWatch(false);
        });
      }
      setIsValidQR(false);
      closeModal();
    }
  }, [qr, isValidQr, myUser, myUser?.watch_ids, addingWatch]);

  //! REMOVE WATCH

  return (
    <div className="flex flex-col px-5 pt-1">
      {/* //! HEADER */}
      <HeaderSettings title="Watch Settings" />

      <div className="flex flex-col gap-5 mt-5">
        {/* //! ADD WATCH */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="flex items-center px-3 py-3 bg-white rounded-xl"
        >
          <div className="flex gap-3 items-center">
            <AddIcon />
            <p className="text text-zinc-800">Add New</p>
          </div>
        </motion.div>

        {/* //! WATCHES */}
        {watches.map((watch) => (
          <SettingsRow key={watch.id} watch={watch} />
        ))}
      </div>
      <MyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Scan Device QR"
      >
        <BarcodeScanner onScan={onQrScan} />
      </MyModal>
    </div>
  );
};

interface SettingsRowProps {
  watch: Watch;
  onClick?: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ watch, onClick }) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage, setEditWatch } = useContext(PageWrapperContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const selected = watch.id === myUser?.watch_id && watch.id !== "";

  //! SELECT WATCH
  const selectWatch = async () => {
    if (!myUser) return;
    await FirebaseHelper.MyUser.update(myUser, { watch_id: watch.id });
  };

  //! DELETE WATCH
  const deleteWatch = async (watchId: string) => {
    if (!myUser || isDeleting) return;

    setIsDeleting(true);
    await FirebaseHelper.Watch.removeFromUser(myUser, watchId);
    setIsDeleting(false);
  };
  return (
    <motion.div
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-between px-3 py-3 bg-white rounded-xl border border-transparent",
        isDeleting && "opacity-50 select-none pointer-events-none",
        selected && " border-red_light"
      )}
    >
      <div className="flex gap-3 items-center">
        <div className="min-w-min w-10">
          <Avatar size={52} src={watch.photoURL} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text text-zinc-800">{watch.name}</p>
          <div className="flex flex-row gap-1 items-center">
            <PhoneIcon size={13} />
            <p className="text-xs text-zinc-400">{watch.phone}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {selected && <p className="text-xs text-red_light">Selected</p>}
        {!selected && <CheckCircleIcon onClick={selectWatch} />}

        <EditIcon
          onClick={() => {
            setEditWatch(watch);
            setPage(Pages.EditWatch);
          }}
        />
        {!selected && <DeleteIcon onClick={() => deleteWatch(watch.id)} />}
      </div>
    </motion.div>
  );
};

export default WatchPage;
