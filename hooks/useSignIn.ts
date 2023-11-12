import { auth } from "@/app/firebase";
import isValidEmail from "@/myfunctions/is_valid_email";
import notify from "@/myfunctions/notify";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import { useInputField } from "./useInputField";

function useSignInPage() {
  const [type, setType] = useState(SignInType.signIn);
  const emailInput = useInputField((email) => [
    [!email, "Please Enter your full name"],
    [!isValidEmail(email!), "Invalid Email"],
  ]);

  const passwordInput = useInputField((password) => [
    [!password, "Please Enter a Password"],
    [password!.length < 6, "Password should be at least 6 characters long"],
  ]);

  function toggleType() {
    setType(type === SignInType.signIn ? SignInType.logIn : SignInType.signIn);
  }

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    signInWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
          return;
        }
        notify("Invalid Email or Password");
        emailInput.setError(true);
        passwordInput.setError(true);
      });
  };

  const signup: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    createUserWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
          return;
        }
        notify("Invalid Email or Password");
        emailInput.setError(true);
        passwordInput.setError(true);
      });
  };

  const forgotPassword: MouseEventHandler<HTMLParagraphElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    const email = emailInput.getValue()!;

    sendPasswordResetEmail(auth, email!)
      .then(() => {
        // Password reset email sent!
        // ..
        notify("Password Reset Email sent!", { type: "success" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);
        notify("Password Reset Error");
      });
  };

  return {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
  };
}

export enum SignInType {
  signIn,
  logIn,
}

export default useSignInPage;
