import { db, storage } from "@/app/firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { Location } from "./Location";
import { MyUser, constructEmptyMyUserData } from "./MyUser";
import { AdminBackendSettingsData } from "./AdminBackendSettingsData";
import { ref } from "firebase/storage";

abstract class FirebaseHelper {
  //!--- QUASAR
  static Quasar = {
    //! Watch
    watch(callback: (data: AdminBackendSettingsData | null) => void) {
      const docRef = doc(db, "admin", "backend_settings");
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as AdminBackendSettingsData);
        } else {
          callback(null);
        }
      });
    },
  };
  //!--- LOCATION
  static Location = {
    //! Get
    async get(id: string) {
      if (!id) return null;
      const docRef = doc(db, "location", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Location;
      } else {
        return null;
      }
    },

    //! Watch
    watch(id: string, callback: (data: Location | null) => void) {
      const docRef = doc(db, "location", id);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as Location);
        } else {
          callback(null);
        }
      });
    },

    //! Update
    async update(id: string, new_fields: Partial<Location>) {
      const docRef = doc(db, "location", id);
      await updateDoc(docRef, { ...new_fields });
    },

    //! Add  to User
    async addToUser(uid: string, watchId: string) {
      const userDocRef = doc(db, "user", uid);
      await updateDoc(userDocRef, { watch_ids: arrayUnion(watchId) });
    },

    //! Remove  to User
    async removeFromUser(uid: string, watchId: string) {
      const userDocRef = doc(db, "user", uid);
      await updateDoc(userDocRef, { watch_ids: arrayRemove(watchId) });
    },

    //! Select  of User
    async selectOfUser(uid: string, watchId: string) {
      const userDocRef = doc(db, "user", uid);
      await updateDoc(userDocRef, { watch_id: watchId });
    },
  };

  //!--- MYUSER
  static MyUser = {
    //! Get
    async get(id: string) {
      if (!id) return null;
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as MyUser;
      } else {
        return null;
      }
    },

    //! Update
    async update(id: string, new_fields: Partial<MyUser>) {
      const docRef = doc(db, "user", id);
      await updateDoc(docRef, { ...new_fields });
    },

    //! Create
    async create(myUser: MyUser) {
      const docRef = doc(db, "user", myUser.id);
      await setDoc(docRef, myUser);
    },

    Picture: {
      //! Create
      async create() {
        const ppRef = ref(storage, "profile_pics");
      },
    },
  };
}

export default FirebaseHelper;
