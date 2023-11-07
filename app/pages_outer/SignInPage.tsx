import Title from "@/components/custom/Title";
import VisibilityIcon from "@/components/svg/icon_animated/visibility/VisibilityIcon";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import SizedBox from "@/components/templates/SizedBox";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { interFont, jsoFont } from "@/styles/fonts";
import { useState } from "react";

const SignInPage: React.FC = () => {
  const {
    type,
    emailRef,
    passwordRef,
    errorEmailInput,
    setErrorEmailInput,
    errorPasswordInput,
    setErrorPasswordInput,
    toggleType,
    login,
    signup,
    forgotPassword,
  } = useSignInPage();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div
        className={`flex flex-col items-ceter justify-center space-y-8 px-10`}
      >
        <SizedBox height={120} />
        <div className="m-auto w-60">
          <Title />
        </div>
        <SizedBox height={20} />
        <form
          className="flex flex-col justify-center space-y-10"
          onSubmit={type === SignInType.signIn ? login : signup}
        >
          <MyInput
            placeholder="Email"
            className="bg-transparent"
            error={errorEmailInput}
            innerRef={emailRef}
            onChange={() => setErrorEmailInput(false)}
          />
          <div className="relative">
            <MyInput
              placeholder="Password"
              className="bg-transparent"
              type={showPassword ? "text" : "password"}
              error={errorPasswordInput}
              innerRef={passwordRef}
              onChange={() => setErrorPasswordInput(false)}
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
