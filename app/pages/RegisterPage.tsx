import FirebaseHelper from "@/classes/FirebaseHelper";
import { MyUser } from "@/classes/MyUser";
import Title from "@/components/custom/Title";
import CheckIcon from "@/components/svg/icon/CheckIcon";
import BarcodeScanner from "@/components/templates/BarCodeScanner";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import MyModal from "@/components/templates/MyModal";
import SizedBox from "@/components/templates/SizedBox";
import { useQr } from "@/hooks/custom/useQR";
import { useCheckboxField, useInputField } from "@/hooks/useInputField";
import useModal from "@/hooks/useModal";
import { User } from "firebase/auth";
import { FormEventHandler, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import notify from "@/myfunctions/notify";
import { LoadingContext } from "../wrappers/LoadingWrapper";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { setLoading } = useContext(LoadingContext);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your full name"],
  ]);

  const phoneInput = useInputField((phone) => [
    [!phone, "Please Enter your phone number"],
    [!/^[0-9+]*$/.test(phone!), "Phone number must only contain digits or '+'"],
  ]);

  const termsInput = useCheckboxField(
    "Please agree to the terms and conditions"
  );

  const { isModalOpen, openModal, closeModal } = useModal();
  const { qr, isValidQr, verifyQR, errorQrInput, onQrScan } = useQr(closeModal);

  //! REGISTER
  const register: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!nameInput.verify()) return;
    if (!phoneInput.verify()) return;
    if (!verifyQR()) return;
    if (!termsInput.verify()) return;

    // setLoading(true);
    try {
      //! Save image in storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FirebaseHelper.MyUser.Picture.create(user.uid, selectedImage);
        photoURL = await FirebaseHelper.MyUser.Picture.get(user.uid);
      }

      const myUser: MyUser = {
        id: user.uid,
        email: user.email!,
        name: nameInput.getValue()!,
        phone: phoneInput.getValue()!,
        photoURL: photoURL,
        watch_id: qr,
        watch_ids: [qr],
      };

      await FirebaseHelper.MyUser.create(myUser);
    } catch (error) {
      console.log(error);
      notify("An error occured while registering");
    }
    // setLoading(false);
  };

  return (
    <div className="px-10">
      {/* <img src={user.photoURL ?? undefined} alt="dsads" /> */}
      <Title />
      {/* <h1 className={`${jsoFont} text-5xl text-center mt-10`}>Register</h1> */}
      {/* <SizedBox height={80} /> */}
      <EditableAvatar
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <form
        className="flex flex-col justify-center space-y-10"
        onSubmit={register}
      >
        <MyInput
          placeholder="Full name"
          className="bg-transparent"
          inputField={nameInput}
        />
        <div className="relative">
          <MyInput
            placeholder="Phone Number"
            className="bg-transparent"
            inputField={phoneInput}
          />
        </div>
        {isValidQr ? (
          <div className="flex justify-center items-center gap-2 text-zinc-600">
            <CheckIcon />
            <p className="text-smooth_black">Device added</p>
          </div>
        ) : (
          <MyButton
            onClick={openModal}
            type="button"
            label="Add device"
            className={errorQrInput ? "border-red" : ""}
            outlined
            dashed
          />
        )}

        <div className="flex items-center gap-3 text-sm justify-center">
          <input
            ref={termsInput.ref}
            type="checkbox"
            name="terms"
            className={twMerge(
              "",
              true ? "border-red" : "border-darker_primary"
            )}
            id="checkbox-terms"
          />
          <p className="text-slate-500">
            I agree to the{" "}
            <span className="text-black font-semibold">
              <a
                target="_blank"
                href="https://www.termsandconditionsgenerator.com/live.php?token=lAUUkmNtpwEk6XTtdwA0wJe1XwbCM99W"
              >
                Terms & Conditions
              </a>
            </span>
          </p>
        </div>

        <MyButton type="submit" label="Create Account" />
      </form>
      <SizedBox height={10} />
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

export default RegisterPage;
