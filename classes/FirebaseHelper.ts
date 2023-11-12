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
import { Watch } from "./Watch";
import { MyUser, constructEmptyMyUserData } from "./MyUser";
import { AdminBackendSettingsData } from "./AdminBackendSettingsData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { timestampsToDate } from "@/myfunctions/timestampToDate";
import { Proximity, constructEmptyProximity } from "./Proximity";

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
  //!--- WATCH
  static Watch = {
    //! Get
    async get(id: string) {
      if (!id) return null;
      const docRef = doc(db, "location", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dataWithConvertedDates = timestampsToDate(docSnap.data());
        return dataWithConvertedDates as Watch;
      } else {
        return null;
      }
    },

    //! Watch
    watch(id: string, callback: (data: Watch | null) => void) {
      const docRef = doc(db, "location", id);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const dataWithConvertedDates = timestampsToDate(docSnap.data());
          callback(dataWithConvertedDates as Watch);
        } else {
          callback(null);
        }
      });
    },

    //! Update
    async update(id: string, new_fields: Partial<Watch>) {
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

    //! Watch
    watch(id: string, callback: (data: MyUser | null) => void) {
      const docRef = doc(db, "user", id);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as MyUser);
        } else {
          callback(null);
        }
      });
    },

    //! Update
    async update(myUser: MyUser | null, new_fields: Partial<MyUser>) {
      if (!myUser) return;
      const docRef = doc(db, "user", myUser.id);
      await updateDoc(docRef, { ...new_fields });
    },

    //! Create
    async create(myUser: MyUser) {
      const batch = writeBatch(db);

      // Create user
      const docRef = doc(db, "user", myUser.id);
      batch.set(docRef, myUser);

      // Create proximity
      const proximityDocRef = doc(db, "proximity", myUser.id);
      batch.set(proximityDocRef, {
        id: myUser.id,
        distance_limit_km: 1,
        lat: 14.610535,
        lng: 121.00488,
        proximity_alarm: true,
      });

      await batch.commit();
    },

    Picture: {
      //! Create
      async create(uid: string, imgFile: File) {
        const storageRef = ref(storage, `user/${uid}/profile_picture.jpg`);

        await uploadBytes(storageRef, imgFile, {
          contentType: "image/jpeg",
        });
      },

      //! Get
      async get(uid: string) {
        const storageRef = ref(storage, `user/${uid}/profile_picture.jpg`);
        const url = await getDownloadURL(storageRef);
        return url;
      },
    },
  };

  //!--- PROXIMITY
  static Proximity = {
    //! Get
    async get(id: string) {
      if (!id) return null;
      const docRef = doc(db, "proximity", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    },

    //! Watch
    watch(id: string, callback: (data: Proximity | null) => void) {
      const docRef = doc(db, "proximity", id);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as Proximity);
        } else {
          callback(null);
        }
      });
    },

    //! Update
    async update(proximity: Proximity | null, new_fields: Partial<Proximity>) {
      if (!proximity) return;
      const docRef = doc(db, "proximity", proximity.id);
      await updateDoc(docRef, { ...new_fields });
    },
  };
}

export default FirebaseHelper;
