"use client";

import { Location } from "@/classes/Location";
import { MyUser } from "@/classes/MyUser";
import QuasarPage from "@/components/templates/QuasarPage";
import { useLocation } from "@/hooks/custom/useLocationData";
import { useMyUser } from "@/hooks/custom/useMyUser";
import { useQuasar } from "@/hooks/useQuasar";
import { useUser } from "@/hooks/useUser";
import { User } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoadingPage from "./pages_outer/LoadingPage";
import SignInPage from "./pages_outer/SignInPage";
import { createContext, useContext, useEffect, useState } from "react";
import PageWrapper from "./pages/PageWrapper";

export const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Wrapper />
      </LoadingContext.Provider>
      {loading && <LoadingPage />}

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
  const { setLoading } = useContext(LoadingContext);
  const [user, loadingUser] = useUser();
  const [myUser, loadingMyUser] = useMyUser(user);
  const location = useLocation(myUser);

  const [quasar, loadingQuasar] = useQuasar();

  useEffect(() => {
    setLoading(loadingUser || loadingMyUser || loadingQuasar);
  }, [loadingUser, loadingMyUser, loadingQuasar]);

  if (loadingQuasar || loadingMyUser || loadingUser) return <></>;
  if (quasar) return <QuasarPage />;
  if (user === null) return <SignInPage />;
  if (myUser === null) return <RegisterPage user={user} />;
  return (
    <GlobalContext.Provider value={{ user, myUser, location }}>
      <PageWrapper />
    </GlobalContext.Provider>
  );
};
