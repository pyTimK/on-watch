import BackAndroidIcon from "@/components/svg/icon/BackAndroidIcon";
import Avatar from "@/components/templates/Avatar";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { PageWrapperContext, Pages } from "../wrappers/PageWrapper";
import EditableAvatar from "@/components/templates/EditableAvatar";
import { useInputField } from "@/hooks/useInputField";
import FirebaseHelper from "@/classes/FirebaseHelper";
import notify from "@/myfunctions/notify";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import { MyUser } from "@/classes/MyUser";
import MyInput from "@/components/templates/MyInput";
import MyButton from "@/components/templates/MyButton";
import { Watch } from "@/classes/Watch";

interface EditWatchPageProps {}

const EditWatchPage: React.FC<EditWatchPageProps> = ({}) => {
  const { editWatch, setEditWatch, setPage } = useContext(PageWrapperContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter the wearer's name"],
  ]);

  const phoneInput = useInputField((phone) => [
    [!phone, "Please Enter the wearer's phone number"],
    [!/^[0-9+]*$/.test(phone!), "Phone number must only contain digits or '+'"],
  ]);

  const recipientInput = useInputField((recipient) => [
    [!recipient, "Please Enter the recipient's phone number"],
    [
      !/^[0-9+]*$/.test(recipient!),
      "Phone number must only contain digits or '+'",
    ],
    // must be 11 digits
    [recipient!.length !== 11, "Phone number must be 11 digits"],
    // must start with 09
    [!recipient!.startsWith("09"), "Phone number must start with 09"],
  ]);

  const [photoURLUpdated, setPhotoURLUpdated] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  const [recipientUpdated, setRecipientUpdated] = useState(false);
  const [updatingWatch, setUpdatingWatch] = useState(false);

  const [correctingWatchTime, setCorrectingWatchTime] = useState(false);

  const hasUpdates =
    photoURLUpdated || nameUpdated || phoneUpdated || recipientUpdated;

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!editWatch) return;
    nameInput.setValue(editWatch.name);
    phoneInput.setValue(editWatch.phone);
    recipientInput.setValue(editWatch.recipient);
  }, [editWatch]);

  //! UPDATE WATCH
  const updateWatch: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!editWatch) return;
    if (!nameInput.verify()) return;
    if (!phoneInput.verify()) return;
    if (!recipientInput.verify()) return;

    setUpdatingWatch(true);
    try {
      //! Save image in firebase storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FirebaseHelper.Watch.Picture.create(editWatch.id, selectedImage);
        photoURL = await FirebaseHelper.Watch.Picture.get(editWatch.id);
      }

      const myWatchUpdates: Partial<Watch> = {};

      if (photoURLUpdated) {
        myWatchUpdates.photoURL = photoURL;
      }
      if (nameUpdated) {
        myWatchUpdates.name = nameInput.getValue()!;
      }
      if (phoneUpdated) {
        myWatchUpdates.phone = phoneInput.getValue()!;
      }

      if (recipientUpdated) {
        myWatchUpdates.recipient = recipientInput.getValue()!;
      }

      await FirebaseHelper.Watch.update(editWatch, myWatchUpdates);
      notify("Watch Profile updated", { type: "success" });
      setPhotoURLUpdated(false);
      setNameUpdated(false);
      setPhoneUpdated(false);
      setRecipientUpdated(false);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setUpdatingWatch(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-52 bg-red pt-1 px-5">
        <div className="flex justify-between items-center">
          <BackAndroidIcon
            color="white"
            size={25}
            onClick={() => setPage(Pages.Watch)}
          />
          <p className="font-semibold text-white">Edit Watch Wearer Profile</p>
          <BackAndroidIcon size={25} hidden />
        </div>
      </div>
      <div className="-translate-y-1/2">
        <EditableAvatar
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          photoURL={editWatch?.photoURL}
          onChooseImage={() => setPhotoURLUpdated(true)}
          size={120}
          withBackground
          bgClassName="bg-bg"
        />
      </div>
      <form
        className="flex flex-col w-full px-10 justify-center gap-10"
        onSubmit={updateWatch}
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
        <div className="flex flex-col gap-1">
          <p className="text font-semibold">Recipient Phone Number</p>
          <MyInput
            placeholder="Recipient Phone Number"
            className="bg-transparent"
            inputField={recipientInput}
            onChange={() => setRecipientUpdated(true)}
          />
        </div>

        <MyButton
          type="submit"
          label="Update"
          disabled={!hasUpdates || updatingWatch}
        />
      </form>

      {editWatch && editWatch.id === "child1" && (
        <div className="mt-10 px-10">
          <MyButton
            type="button"
            label="Correct Time"
            className="bg-zinc-700"
            disabled={correctingWatchTime}
            onClick={() => {
              setCorrectingWatchTime(true);
              FirebaseHelper.Watch.update(editWatch, {
                will_correct_time: true,
              }).then((w) => {
                setCorrectingWatchTime(false);
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditWatchPage;
