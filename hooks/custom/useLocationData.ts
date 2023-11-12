import FirebaseHelper from "@/classes/FirebaseHelper";
import { Watch } from "@/classes/Watch";
import { MyUser } from "@/classes/MyUser";
import { useEffect, useState } from "react";

export const useWatch = (myUser: MyUser | null) => {
  const [watch, setWatch] = useState<Watch | null>(null);

  useEffect(() => {
    if (!myUser) return;

    return FirebaseHelper.Watch.watch(myUser.watch_id, setWatch);
  }, [myUser]);

  return watch;
};
