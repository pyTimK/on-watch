export interface MyUser {
  id: string;
  name: string;
  photoURL: string;
  email: string;
  phone: string;
  watch_id: string;
  watch_ids: string[];
  contact_ids: string[];
  emergency_notif: boolean;
}

export const constructEmptyMyUserData = (): MyUser => {
  return {
    id: "",
    name: "",
    photoURL: "",
    email: "",
    phone: "",
    watch_id: "",
    watch_ids: [],
    contact_ids: [],
    emergency_notif: false,
  } as MyUser;
};
