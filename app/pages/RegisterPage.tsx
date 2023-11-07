import { FormEventHandler, useContext, useRef, useState } from "react";
import { User } from "firebase/auth";
import Title from "@/components/custom/Title";
import SizedBox from "@/components/templates/SizedBox";
import MyInput from "@/components/templates/MyInput";
import notify from "@/myfunctions/notify";
import { MyUser } from "@/classes/MyUser";
import MyButton from "@/components/templates/MyButton";
import AvatarGirl from "@/components/svg/icon/AvatarGirl";
import EditIcon from "@/components/svg/icon/EditIcon";
import EditRoundedIcon from "@/components/svg/icon/EditRoundedIcon";
import UploadAndDisplayImage from "@/components/templates/UploadAndDisplayImage";
import EditableAvatar from "@/components/templates/EditableAvatar";
import { jsoFont } from "@/styles/fonts";
import { twMerge } from "tailwind-merge";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const [errorNameInput, setErrorNameInput] = useState(false);
  const [errorPhoneInput, setErrorPhoneInput] = useState(false);

  const verifyName = (name: string | undefined) => {
    if (!name) {
      notify("Please Enter your full name");
      setErrorNameInput(true);
      return false;
    }
    return true;
  };

  const verifyPhone = (phone: string | undefined) => {
    if (!phone) {
      notify("Please Enter your phone number");
      setErrorPhoneInput(true);
      return false;
    }

    // phone number must only contain digits or "+"
    if (!/^[0-9+]*$/.test(phone)) {
      notify("Please Enter a valid phone number");
      setErrorPhoneInput(true);
      return false;
    }

    return true;
  };

  const verifyTerms = (terms: boolean | undefined) => {
    if (!terms) {
      notify("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const register: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    const terms = termsRef.current?.checked;

    if (!verifyName(name)) return;
    if (!verifyPhone(phone)) return;
    if (!verifyTerms(terms)) return;

    // const myUser: MyUser = {
    //   id: user.uid,
    //   email: user.email!,
    //   name: name!,
    //   phone: phone!,
    //   profile_pic: ,
    //   watch_id: ,
    //   watch_ids: ,
    // }
  };

  console.log(user.photoURL);

  return (
    <div className="px-10">
      {/* <img src={user.photoURL ?? undefined} alt="dsads" /> */}
      <Title />
      {/* <h1 className={`${jsoFont} text-5xl text-center mt-10`}>Register</h1> */}
      {/* <SizedBox height={80} /> */}
      <EditableAvatar />
      <form
        className="flex flex-col justify-center space-y-10"
        onSubmit={register}
      >
        <MyInput
          placeholder="Full name"
          className="bg-transparent"
          error={errorNameInput}
          innerRef={nameRef}
          onChange={() => setErrorNameInput(false)}
        />
        <div className="relative">
          <MyInput
            placeholder="Phone Number"
            className="bg-transparent"
            error={errorPhoneInput}
            innerRef={phoneRef}
            onChange={() => setErrorPhoneInput(false)}
          />
        </div>

        <div className="flex items-center gap-3 text-sm justify-center">
          <input
            ref={termsRef}
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
            <span className="text-black font-semibold">Terms & Conditions</span>
          </p>
        </div>

        <MyButton type="submit" label="Create Account" />
      </form>
      <SizedBox height={10} />
    </div>
  );
};

export default RegisterPage;
