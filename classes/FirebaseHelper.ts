import { Contact } from "@/classes/Contact";
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
    async update(watch: Watch | undefined, new_fields: Partial<Watch>) {
      if (!watch) return;
      const docRef = doc(db, "location", watch.id);
      await updateDoc(docRef, { ...new_fields });
    },

    //! Add  to User
    async addToUser(myUser: MyUser | null, watchId: string) {
      if (!myUser) return;
      const userDocRef = doc(db, "user", myUser.id);
      await updateDoc(userDocRef, { watch_ids: arrayUnion(watchId) });
    },

    //! Remove  to User
    async removeFromUser(myUser: MyUser | null, watchId: string) {
      if (!myUser) return;
      const userDocRef = doc(db, "user", myUser.id);
      await updateDoc(userDocRef, { watch_ids: arrayRemove(watchId) });
    },

    //! Select  of User
    async selectOfUser(uid: string, watchId: string) {
      const userDocRef = doc(db, "user", uid);
      await updateDoc(userDocRef, { watch_id: watchId });
    },

    Picture: {
      //! Create
      async create(watchId: string, imgFile: File) {
        const storageRef = ref(storage, `watch/${watchId}/profile_picture.jpg`);

        await uploadBytes(storageRef, imgFile, {
          contentType: "image/jpeg",
        });
      },

      //! Get
      async get(watchId: string) {
        const storageRef = ref(storage, `watch/${watchId}/profile_picture.jpg`);
        const url = await getDownloadURL(storageRef);
        return url;
      },
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
      const proximity: Proximity = {
        id: myUser.id,
        distance_limit_m: 50000,
        lat: 14.610535,
        lng: 121.00488,
        proximity_alarm: true,
        oob: false,
        oob_notified: false,
      };
      batch.set(proximityDocRef, proximity);

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

    //! Create
    async create(proximity: Proximity) {
      const docRef = doc(db, "proximity", proximity.id);
      await setDoc(docRef, proximity);
    },

    //! Delete
    async delete(proximity: Proximity) {
      const docRef = doc(db, "proximity", proximity.id);
      await deleteDoc(docRef);
    },
  };

  //!--- CONTACT
  static Contact = {
    //! Get
    async get(contactId: string) {
      if (!contactId) return null;
      const docRef = doc(db, "contact", contactId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Contact;
      } else {
        return null;
      }
    },

    //! Watch
    watch(contactId: string, callback: (data: Contact | null) => void) {
      const docRef = doc(db, "contact", contactId);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as Contact);
        } else {
          callback(null);
        }
      });
    },

    //! Update
    async update(contact: Contact | null, new_fields: Partial<Contact>) {
      if (!contact) return;
      const docRef = doc(db, "contact", contact.id);
      await updateDoc(docRef, { ...new_fields });
    },

    //! Add  to User
    async addToUser(myUser: MyUser | null, contactId: string) {
      if (!myUser) return;
      const userDocRef = doc(db, "user", myUser.id);
      await updateDoc(userDocRef, { contact_ids: arrayUnion(contactId) });
    },

    //! Remove  to User
    async removeFromUser(myUser: MyUser | null, contactId: string) {
      if (!myUser) return;
      const userDocRef = doc(db, "user", myUser.id);
      await updateDoc(userDocRef, { contact_ids: arrayRemove(contactId) });
    },

    Picture: {
      //! Create
      async create(contactId: string, imgFile: File) {
        const storageRef = ref(
          storage,
          `contact/${contactId}/profile_picture.jpg`
        );

        await uploadBytes(storageRef, imgFile, {
          contentType: "image/jpeg",
        });
      },

      //! Get
      async get(contactId: string) {
        const storageRef = ref(
          storage,
          `contact/${contactId}/profile_picture.jpg`
        );
        const url = await getDownloadURL(storageRef);
        return url;
      },
    },

    //! Create
    async create(contact: Contact) {
      const docRef = doc(db, "contact", contact.id);
      await setDoc(docRef, contact);
    },

    //! Delete
    async delete(contact: Contact) {
      const docRef = doc(db, "contact", contact.id);
      await deleteDoc(docRef);
    },
  };
}

export default FirebaseHelper;
