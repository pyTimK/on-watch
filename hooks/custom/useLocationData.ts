import FirebaseHelper from "@/classes/FirebaseHelper";
import { LocationData } from "@/classes/LocationData";
import { useEffect, useState } from "react";

export const useLocationData = (watch_id: string) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    FirebaseHelper.getLocationData(watch_id).then((data) => {
      setLocationData(data);
    });
  }, [watch_id]);

  return locationData;
};
