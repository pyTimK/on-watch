import FirebaseHelper from "@/classes/FirebaseHelper";
import BackAndroidIcon from "@/components/svg/icon/BackAndroidIcon";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import notify from "@/myfunctions/notify";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { PageWrapperContext, Pages } from "../wrappers/PageWrapper";
import { Contact } from "@/classes/Contact";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import firestoreAutoId from "@/myfunctions/firestoreAutoId";

interface AddContactPageProps {}

const AddContactPage: React.FC<AddContactPageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage } = useContext(PageWrapperContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter the contact's name"],
  ]);

  const phoneInput = useInputField((phone) => [
    [!phone, "Please Enter the contact's phone number"],
    [!/^[0-9+]*$/.test(phone!), "Phone number must only contain digits or '+'"],
  ]);

  const [registeringContact, setRegisteringContact] = useState(false);

  //! REGISTER
  const registerContact: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!myUser) return;
    if (!nameInput.verify()) return;
    if (!phoneInput.verify()) return;

    setRegisteringContact(true);
    try {
      //! Generate Contact ID
      const contactId = firestoreAutoId();

      //! Save image in firebase storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FirebaseHelper.Contact.Picture.create(contactId, selectedImage);
        photoURL = await FirebaseHelper.Contact.Picture.get(contactId);
      }

      //! Create Contact
      const newContact: Contact = {
        id: contactId,
        photoURL: photoURL,
        name: nameInput.getValue()!,
        phone: phoneInput.getValue()!,
      };
      await FirebaseHelper.Contact.create(newContact);

      //! Add contact to user
      await FirebaseHelper.Contact.addToUser(myUser, contactId);
      notify("Contact updated", { type: "success" });
      setPage(Pages.Contacts);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setRegisteringContact(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-52 bg-red pt-1 px-5">
        <div className="flex justify-between items-center">
          <BackAndroidIcon
            color="white"
            size={25}
            onClick={() => setPage(Pages.Contacts)}
          />
          <p className="font-semibold text-white">Add Contact</p>
          <BackAndroidIcon size={25} hidden />
        </div>
      </div>
      <div className="-translate-y-1/2">
        <EditableAvatar
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          size={120}
          withBackground
          bgClassName="bg-bg"
        />
      </div>
      <form
        className="flex flex-col w-full px-10 justify-center gap-10"
        onSubmit={registerContact}
      >
        <div className="flex flex-col gap-1">
          <p className="text font-semibold">Name</p>
          <MyInput
            placeholder="Name"
            className="bg-transparent"
            inputField={nameInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text font-semibold">Phone Number</p>
          <MyInput
            placeholder="Phone Number"
            className="bg-transparent"
            inputField={phoneInput}
          />
        </div>

        <MyButton type="submit" label="Create" disabled={registeringContact} />
      </form>
    </div>
  );
};

export default AddContactPage;
