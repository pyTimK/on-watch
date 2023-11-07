export interface Location {
  latitude: string;
  longitude: string;
  emergency: string;
}

export const constructEmptyLocation = (): Location => {
  return {
    latitude: "0",
    longitude: "0",
    emergency: "0",
  };
};
