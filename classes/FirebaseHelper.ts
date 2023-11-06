import { db } from "@/app/firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { LocationData } from "./LocationData";
import { MyUserData } from "./MyUserData";

abstract class FirebaseHelper {
  //! Get LocationData
  static async getLocationData(id: string) {
    const docRef = doc(db, "location", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as LocationData;
    } else {
      return null;
    }
  }

  //! Update LocationData
  static async updateLocationData(
    id: string,
    new_fields: Partial<LocationData>
  ) {
    const docRef = doc(db, "location", id);
    await updateDoc(docRef, { ...new_fields });
  }

  //! Add LocationData to User
  static async addLocationDataToUser(uid: string, watchId: string) {
    const userDocRef = doc(db, "user", uid);
    await updateDoc(userDocRef, { watch_ids: arrayUnion(watchId) });
  }

  //! Remove LocationData to User
  static async removeLocationDataFromUser(uid: string, watchId: string) {
    const userDocRef = doc(db, "user", uid);
    await updateDoc(userDocRef, { watch_ids: arrayRemove(watchId) });
  }

  //! Select LocationData of User
  static async selectLocationDataOfUser(uid: string, watchId: string) {
    const userDocRef = doc(db, "user", uid);
    await updateDoc(userDocRef, { watch_id: watchId });
  }
}

export default FirebaseHelper;
