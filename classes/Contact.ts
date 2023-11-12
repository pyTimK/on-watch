export interface Contact {
  id: string;
  name: string;
  phone: string;
  photoURL: string;
}

export const constructEmptyContact = (): Contact => {
  return {
    id: "",
    name: "",
    phone: "",
    photoURL: "",
  };
};
