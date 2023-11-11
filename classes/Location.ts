export interface Location {
  emergency: string;
  latitude: string;
  longitude: string;
  id: string;
  name: string;
  phone: string;
}

export const constructEmptyLocation = (): Location => {
  return {
    emergency: "0",
    latitude: "0",
    longitude: "0",
    id: "0",
    name: "0",
    phone: "0",
  };
};
