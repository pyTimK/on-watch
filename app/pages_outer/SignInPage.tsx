import Title from "@/components/custom/Title";
import VisibilityIcon from "@/components/svg/icon_animated/visibility/VisibilityIcon";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import SizedBox from "@/components/templates/SizedBox";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { interFont } from "@/styles/fonts";
import { useState } from "react";

const SignInPage: React.FC = () => {
  const {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
  } = useSignInPage();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div
        className={`flex flex-col items-ceter justify-center space-y-8 px-10`}
      >
        <Title />
        <form
          className="flex flex-col justify-center space-y-10"
          onSubmit={type === SignInType.signIn ? login : signup}
        >
          <MyInput
            placeholder="Email"
            inputField={emailInput}
            className="bg-transparent"
          />
          <div className="relative">
            <MyInput
              placeholder="Password"
              className="bg-transparent"
              type={showPassword ? "text" : "password"}
              inputField={passwordInput}
            />
            <div className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2">
              <VisibilityIcon
                isOpen={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <MyButton
            type="submit"
            label={type === SignInType.signIn ? "LOGIN" : "SIGN UP"}
          />
        </form>
        <SizedBox height={10} />

        <div className="h-10 flex items-end">
          {type == SignInType.signIn && (
            <p
              className={`${interFont} text-xs text-darkest_primary fit-content m-auto select-none cursor-pointer`}
              onClick={forgotPassword}
            >
              FORGOT PASSWORD&#63;
            </p>
          )}
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className={`${interFont} text-text_gray fit-content m-0 text-xs`}>
            {type == SignInType.signIn
              ? "DON'T HAVE AN ACOUNT?"
              : "ALREADY HAVE AN ACCOUNT?"}
          </p>
          <SizedBox width={10} />
          <p
            onClick={toggleType}
            className={`${interFont} text-darkest_primary fit-content m-0 text-xs`}
          >
            {type == SignInType.signIn ? "CREATE ONE" : "LOGIN"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
