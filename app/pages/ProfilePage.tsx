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
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage } = useContext(PageWrapperContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your name"],
  ]);

  const phoneInput = useInputField((phone) => [
    [!phone, "Please Enter your phone number"],
    [!/^[0-9+]*$/.test(phone!), "Phone number must only contain digits or '+'"],
  ]);

  const [photoURLUpdated, setPhotoURLUpdated] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  const [updatingMyUser, setUpdatingMyUser] = useState(false);

  const hasUpdates = photoURLUpdated || nameUpdated || phoneUpdated;

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!myUser) return;
    nameInput.setValue(myUser.name);
    phoneInput.setValue(myUser.phone);
  }, [myUser]);

  //! REGISTER
  const updateMyUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!myUser) return;
    if (!nameInput.verify()) return;
    if (!phoneInput.verify()) return;

    setUpdatingMyUser(true);
    try {
      //! Save image in firebase storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FirebaseHelper.MyUser.Picture.create(myUser.id, selectedImage);
        photoURL = await FirebaseHelper.MyUser.Picture.get(myUser.id);
      }

      const myUserUpdates: Partial<MyUser> = {};

      if (photoURLUpdated) {
        myUserUpdates.photoURL = photoURL;
      }
      if (nameUpdated) {
        myUserUpdates.name = nameInput.getValue()!;
      }
      if (phoneUpdated) {
        myUserUpdates.phone = phoneInput.getValue()!;
      }

      await FirebaseHelper.MyUser.update(myUser, myUserUpdates);
      notify("Profile updated", { type: "success" });
      setPhotoURLUpdated(false);
      setNameUpdated(false);
      setPhoneUpdated(false);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setUpdatingMyUser(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-52 bg-red pt-1 px-5">
        <div className="flex justify-between items-center">
          <BackAndroidIcon
            color="white"
            size={25}
            onClick={() => setPage(Pages.Main)}
          />
          <p className="font-semibold text-white">Edit Profile</p>
          <BackAndroidIcon size={25} hidden />
        </div>
      </div>
      <div className="-translate-y-1/2">
        <EditableAvatar
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          photoURL={myUser?.photoURL}
          onChooseImage={() => setPhotoURLUpdated(true)}
          size={120}
          withBackground
          bgClassName="bg-bg"
        />
      </div>
      <form
        className="flex w-full px-10 flex-col justify-center gap-10 mb-10"
        onSubmit={updateMyUser}
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
          disabled={!hasUpdates || updatingMyUser}
        />
      </form>
      <div className="w-min px-10 mt-10">
        <MyButton
          type="button"
          label="Sign Out"
          outlined
          className="rounded-full"
          pY={0.2}
          onClick={() => signOut(auth)}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
