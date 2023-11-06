export interface MyUserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  watch_id: string;
  watch_ids: string[];
  //TODO PROFILE PIC
}

export const constructEmptyMyUserData = (): MyUserData => {
  return {
    id: "",
    name: "",
    email: "",
    phone: "",
    watch_id: "",
    watch_ids: [],
  };
};
