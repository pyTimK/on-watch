export interface Proximity {
  id: string;
  distance_limit_m: number;
  lat: number;
  lng: number;
  proximity_alarm: boolean;
  oob: boolean;
  oob_notified: boolean;
}

export const constructEmptyProximity = (): Proximity => {
  return {
    id: "",
    distance_limit_m: 50000,
    lat: 14.610535,
    lng: 121.00488,
    proximity_alarm: true,
    oob: true,
    oob_notified: false,
  };
};
