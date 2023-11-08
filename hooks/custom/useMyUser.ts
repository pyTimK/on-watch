import FirebaseHelper from "@/classes/FirebaseHelper";
import { MyUser } from "@/classes/MyUser";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useMyUser = (user: User | null): [MyUser | null, boolean] => {
  const [myUser, setMyUser] = useState<MyUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      FirebaseHelper.MyUser.watch(user.uid, (data) => {
        setMyUser(data);
        setLoading(false);
      });
    }
  }, [user]);

  return [myUser, loading];
};
