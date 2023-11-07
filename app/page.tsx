"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth, db } from "./firebase";
import LoadingPage from "./pages_outer/LoadingPage";
import useFirestoreData from "@/hooks/useFirestoreData";
import { doc } from "firebase/firestore";
import { constructEmptyAdminBackendSettingsData } from "@/classes/AdminBackendSettingsData";
import QuasarPage from "@/components/templates/QuasarPage";
import SignInPage from "./pages_outer/SignInPage";
import FirebaseHelper from "@/classes/FirebaseHelper";
import { MyUser } from "@/classes/MyUser";
import { useLocation } from "@/hooks/custom/useLocationData";
import { Location } from "@/classes/Location";
import { useMyUser } from "@/hooks/custom/useMyUser";
import { useUser } from "@/hooks/useUser";
import RegisterPage from "./pages/RegisterPage";
import { createContext } from "vm";
import MainPage from "./pages/MainPage";
import { useQuasar } from "@/hooks/useQuasar";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <Wrapper />
      <ToastContainer
        className="toast-custom"
        theme="colored"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
}

export const GlobalContext = createContext({
  user: {} as User,
  myUser: {} as MyUser,
  location: {} as Location | null,
});

const Wrapper = () => {
  const [user, loadingUser] = useUser();
  const [myUser, loadingMyUser] = useMyUser(user);
  const location = useLocation(myUser);

  const [quasar, loadingQuasar] = useQuasar();

  if (loadingQuasar || loadingMyUser || loadingUser) return <LoadingPage />;
  if (quasar) return <QuasarPage />;
  if (user === null) return <SignInPage />;
  if (myUser === null) return <RegisterPage user={user} />;
  return (
    <GlobalContext.Provider value={{ user, myUser, location }}>
      <MainPage />
    </GlobalContext.Provider>
  );
};
