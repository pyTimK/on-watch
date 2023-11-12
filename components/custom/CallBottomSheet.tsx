import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Avatar from "../templates/Avatar";
import MyButton from "../templates/MyButton";
import { dateFormatter } from "@/myfunctions/dateFormatter";
import { useAddress } from "@/hooks/custom/useAddress";
import PhoneIcon from "../svg/icon/PhoneIcon";
import { Constants, DefaultContacts } from "@/classes/constants";
import { GlobalContext } from "@/app/wrappers/GlobalWrapper";
import MyBottomSheet from "../templates/MyBottomSheet";
import { Contact } from "@/classes/Contact";
import FirebaseHelper from "@/classes/FirebaseHelper";
import { twMerge } from "tailwind-merge";

interface CallBottomSheetProps {
  open: boolean;
  onClose?: () => void;
}

const CallBottomSheet: React.FC<CallBottomSheetProps> = ({ open, onClose }) => {
  const { myUser } = useContext(GlobalContext);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  //! GET CONTACTS
  async function getContacts(contactIds: string[]) {
    const _contacts: Contact[] = [];
    for (const id of contactIds) {
      const contact = await FirebaseHelper.Contact.get(id);
      if (contact) {
        _contacts.push(contact);
      }
    }
    return _contacts;
  }

  //! GET CONTACTS
  useEffect(() => {
    const contactIds = myUser?.contact_ids;
    if (!contactIds) return;
    getContacts(contactIds).then((_contacts) => {
      setContacts(_contacts);
      setLoading(false);
    });
  }, [myUser?.contact_ids]);

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-5 px-5 pt-1 h-96 overflow-auto pb-10">
        <p className="text-center text-sm text-zinc-500">
          Select a contact to call
        </p>
        {/* //! CUSTOM CONTACTS */}
        {contacts.toReversed().map((contact) => (
          <SettingsRow key={contact.id} contact={contact} />
        ))}

        {/* //! DEFAULT CONTACTS */}
        {!loading &&
          DefaultContacts.map((contact) => (
            <SettingsRow key={contact.id} contact={contact} />
          ))}
      </div>
    </MyBottomSheet>
  );
};

interface SettingsRowProps {
  contact: Contact;
  isDefault?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ contact, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        "flex items-center justify-between px-3 py-3 bg-white rounded-xl drop-shadow-sm"
      )}
    >
      <a href={`tel:${contact.phone}`}>
        <div className="flex gap-3 items-center">
          <div className="min-w-min w-10">
            <Avatar size={52} src={contact.photoURL} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text text-zinc-800">{contact.name}</p>
            <div className="flex flex-row gap-1 items-center">
              <PhoneIcon size={13} />
              <p className="text-xs text-zinc-400">{contact.phone}</p>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default CallBottomSheet;
