import FirebaseHelper from "@/classes/FirebaseHelper";
import { Proximity } from "@/classes/Proximity";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useProximity = (
  user: User | null
): [Proximity | null, boolean] => {
  const [proximity, setProximity] = useState<Proximity | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      FirebaseHelper.Proximity.watch(user.uid, (data) => {
        setProximity(data);
        setLoading(false);
      });
    }
  }, [user]);

  return [proximity, loading];
};
