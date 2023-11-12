export interface Proximity {
  id: string;
  distance_limit_km: number;
  lat: number;
  lng: number;
  proximity_alarm: boolean;
}

export const constructEmptyProximity = (): Proximity => {
  return {
    id: "",
    distance_limit_km: 1,
    lat: 14.610535,
    lng: 121.00488,
    proximity_alarm: true,
  };
};
