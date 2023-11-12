export interface Contact {
  name: string;
  phone: string;
  photoURL: string;
}

export const constructEmptyContact = (): Contact => {
  return {
    name: "",
    phone: "",
    photoURL: "",
  };
};
