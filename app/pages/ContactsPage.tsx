import { Contact } from "@/classes/Contact";
import FirebaseHelper from "@/classes/FirebaseHelper";
import { DefaultContacts } from "@/classes/constants";
import HeaderSettings from "@/components/custom/HeaderSettings";
import AddIcon from "@/components/svg/icon/AddIcon";
import DeleteIcon from "@/components/svg/icon/DeleteIcon";
import EditIcon from "@/components/svg/icon/EditIcon";
import PhoneIcon from "@/components/svg/icon/PhoneIcon";
import Avatar from "@/components/templates/Avatar";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import { PageWrapperContext, Pages } from "../wrappers/PageWrapper";

interface ContactsPageProps {}

const ContactsPage: React.FC<ContactsPageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage } = useContext(PageWrapperContext);
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
      setContacts(_contacts.reverse());
      setLoading(false);
    });
  }, [myUser?.contact_ids]);

  //! ADD CONTACT
  const addContact = () => {
    setPage(Pages.AddContact);
  };

  return (
    <div className="flex flex-col px-5 pt-1">
      {/* //! HEADER */}
      <HeaderSettings title="Contacts" page={Pages.Settings} />

      <div className="flex flex-col gap-5 mt-5">
        {/* //! ADD CONTACT */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={addContact}
          className="flex items-center px-3 py-3 bg-white rounded-xl"
        >
          <div className="flex gap-3 items-center">
            <AddIcon />
            <p className="text text-zinc-800">Add New</p>
          </div>
        </motion.div>

        {/* //! CUSTOM CONTACTS */}
        {contacts.map((contact) => (
          <SettingsRow key={contact.id} contact={contact} />
        ))}

        {/* //! DEFAULT CONTACTS */}
        {!loading &&
          DefaultContacts.map((contact) => (
            <SettingsRow key={contact.id} contact={contact} isDefault />
          ))}
      </div>
    </div>
  );
};

interface SettingsRowProps {
  contact: Contact;
  isDefault?: boolean;
  onClick?: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  contact,
  onClick,
  isDefault = false,
}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage, setEditContact } = useContext(PageWrapperContext);
  const [isDeleting, setIsDeleting] = useState(false);

  //! DELETE CONTACT
  const deleteContact = async (contactId: string) => {
    if (!myUser || isDeleting) return;

    setIsDeleting(true);
    await FirebaseHelper.Contact.removeFromUser(myUser, contactId);
    setIsDeleting(false);
  };
  return (
    <motion.div
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-between px-3 py-3 bg-white rounded-xl",
        isDeleting && "opacity-50 select-none pointer-events-none"
      )}
    >
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
      {!isDefault && (
        <div className="flex gap-4">
          <EditIcon
            onClick={() => {
              setEditContact(contact);
              setPage(Pages.EditContact);
            }}
          />
          <DeleteIcon onClick={() => deleteContact(contact.id)} />
        </div>
      )}
    </motion.div>
  );
};

export default ContactsPage;
