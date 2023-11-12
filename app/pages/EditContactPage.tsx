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

interface EditContactPageProps {}

const EditContactPage: React.FC<EditContactPageProps> = ({}) => {
  const { editContact, setPage } = useContext(PageWrapperContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter the contact's name"],
  ]);

  const phoneInput = useInputField((phone) => [
    [!phone, "Please Enter the contact's phone number"],
    [!/^[0-9+]*$/.test(phone!), "Phone number must only contain digits or '+'"],
  ]);

  const [photoURLUpdated, setPhotoURLUpdated] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  const [updatingContact, setUpdatingContact] = useState(false);

  const hasUpdates = photoURLUpdated || nameUpdated || phoneUpdated;

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!editContact) return;
    nameInput.setValue(editContact.name);
    phoneInput.setValue(editContact.phone);
  }, [editContact]);

  //! UPDATE CONTACT
  const updateContact: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!editContact) return;
    if (!nameInput.verify()) return;
    if (!phoneInput.verify()) return;

    setUpdatingContact(true);
    try {
      //! Save image in firebase storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FirebaseHelper.Contact.Picture.create(
          editContact.id,
          selectedImage
        );
        photoURL = await FirebaseHelper.Contact.Picture.get(editContact.id);
      }

      const myContactUpdates: Partial<Contact> = {};

      if (photoURLUpdated) {
        myContactUpdates.photoURL = photoURL;
      }
      if (nameUpdated) {
        myContactUpdates.name = nameInput.getValue()!;
      }
      if (phoneUpdated) {
        myContactUpdates.phone = phoneInput.getValue()!;
      }

      await FirebaseHelper.Contact.update(editContact, myContactUpdates);
      notify("Contact updated", { type: "success" });
      setPhotoURLUpdated(false);
      setNameUpdated(false);
      setPhoneUpdated(false);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setUpdatingContact(false);
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
          <p className="font-semibold text-white">Edit Contact</p>
          <BackAndroidIcon size={25} hidden />
        </div>
      </div>
      <div className="-translate-y-1/2">
        <EditableAvatar
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          photoURL={editContact?.photoURL}
          onChooseImage={() => setPhotoURLUpdated(true)}
          size={120}
          withBackground
          bgClassName="bg-bg"
        />
      </div>
      <form
        className="flex flex-col w-full px-10 justify-center gap-10"
        onSubmit={updateContact}
      >
        <div className="flex flex-col gap-1">
          <p className="text font-semibold">Name</p>
          <MyInput
            placeholder="Name"
            className="bg-transparent"
            inputField={nameInput}
            onChange={() => setNameUpdated(true)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text font-semibold">Phone Number</p>
          <MyInput
            placeholder="Phone Number"
            className="bg-transparent"
            inputField={phoneInput}
            onChange={() => setPhoneUpdated(true)}
          />
        </div>

        <MyButton
          type="submit"
          label="Update"
          disabled={!hasUpdates || updatingContact}
        />
      </form>
    </div>
  );
};

export default EditContactPage;
