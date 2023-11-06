"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth, db } from "./firebase";
import PagesWrapper from "./pages/PagesWrapper";
import LoadingPage from "./pages_outer/LoadingPage";
import useFirestoreData from "@/hooks/useFirestoreData";
import { doc } from "firebase/firestore";
import { constructEmptyAdminBackendSettingsData } from "@/classes/AdminBackendSettingsData";
import QuasarPage from "@/components/templates/QuasarPage";
import SignInPage from "./pages_outer/SignInPage";

export default function Home() {
  return (
    <>
      <Wrapper />
      <ToastContainer theme="colored" autoClose={2} closeButton={false} />
    </>
  );
}

const Wrapper = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { quasar } = useFirestoreData(
    doc(db, "admin", "backend_settings"),
    constructEmptyAdminBackendSettingsData
  );

  // user changes
  useEffect(() => {
    onAuthStateChanged(auth, (new_user) => {
      setUser(new_user);
      setLoading(false);
    });
  }, []);

  if (quasar) return <QuasarPage />;
  if (loading) return <LoadingPage />;
  if (user === null) return <SignInPage />;
  return <PagesWrapper user={user} />;
};
