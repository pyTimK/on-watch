import {
  LocationData,
  constructEmptyLocationData,
} from "@/classes/LocationData";
import { MyUserData, constructEmptyMyUserData } from "@/classes/MyUserData";
import useFirestoreData, { FirestoreDataType } from "@/hooks/useFirestoreData";
import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import MainPage from "./MainPage";
import FirebaseHelper from "@/classes/FirebaseHelper";
import { useLocationData } from "@/hooks/custom/useLocationData";

export const PagesWrapperContext = createContext({
  user: {} as User,
  myUserData: {} as FirestoreDataType<MyUserData>,
  locationData: null as LocationData | null,
});

interface PagesWrapperProps {
  user: User;
}

const PagesWrapper: React.FC<PagesWrapperProps> = ({ user }) => {
  //! MyUser Data
  const myUserData = useFirestoreData(
    doc(db, "user", user.uid),
    constructEmptyMyUserData
  );

  //! Location Data
  const locationData = useLocationData(myUserData.watch_id);

  return (
    <PagesWrapperContext.Provider value={{ user, myUserData, locationData }}>
      <MainPage />
    </PagesWrapperContext.Provider>
  );
};

export default PagesWrapper;
