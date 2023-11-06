export interface LocationData {
  latitude: string;
  longitude: string;
  emergency: string;
}

export const constructEmptyLocationData = (): LocationData => {
  return {
    latitude: "0",
    longitude: "0",
    emergency: "0",
  };
};
