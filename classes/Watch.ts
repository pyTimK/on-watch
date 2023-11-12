export interface Watch {
  emergency: string;
  latitude: string;
  longitude: string;
  id: string;
  name: string;
  phone: string;
  photoURL: string;
  emergencyTimestamp: Date;
}

export const constructEmptyWatch = (): Watch => {
  return {
    emergency: "0",
    latitude: "0",
    longitude: "0",
    id: "0",
    name: "0",
    phone: "0",
    photoURL: "0",
    emergencyTimestamp: new Date(),
  };
};
