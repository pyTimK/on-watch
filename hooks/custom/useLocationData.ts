import FirebaseHelper from "@/classes/FirebaseHelper";
import { Location } from "@/classes/Location";
import { MyUser } from "@/classes/MyUser";
import { useEffect, useState } from "react";

export const useLocation = (myUser: MyUser | null) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!myUser) return;

    return FirebaseHelper.Location.watch(myUser.watch_id, setLocation);
  }, [myUser]);

  return location;
};
