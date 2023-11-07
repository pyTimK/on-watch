import FirebaseHelper from "@/classes/FirebaseHelper";
import { useEffect, useState } from "react";

export const useQuasar = () => {
  const [quasar, setQuasar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return FirebaseHelper.Quasar.watch((quasar) => {
      setQuasar(quasar?.quasar ?? false);
      setLoading(false);
    });
  }, []);

  return [quasar, loading];
};
